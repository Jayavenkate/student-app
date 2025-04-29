import { eq } from "drizzle-orm";
import { db } from "../../../../lib/db";
import { results } from "../../../../lib/schema";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const body = await req.json();
    const { user, marks, topic } = body;
    const userId = cookies().get("userId")?.value;

    if (!userId) {
      return new Response(JSON.stringify({ error: "User not authenticated" }), {
        status: 401,
      });
    }

    const existingUser = await db
      .select()
      .from(results)
      .where(eq(results.userId, userId));

    if (existingUser.length > 0) {
      const userData = existingUser[0];

      // Parse stringified arrays if needed
      const existingScore = Array.isArray(userData.score)
        ? userData.score
        : JSON.parse(userData.score);

      const existingTopic = Array.isArray(userData.topic)
        ? userData.topic
        : JSON.parse(userData.topic);

      // Append new values
      const updatedScore = [...existingScore, marks];
      const updatedTopic = [...existingTopic, topic];

      await db
        .update(results)
        .set({
          score: updatedScore,
          topic: updatedTopic,
          createdAt: new Date(),
        })
        .where(eq(results.userId, userId));

      return new Response(
        JSON.stringify({
          success: true,
          message: "Updated existing user",
          score: updatedScore,
          topic: updatedTopic,
          userId,
          username: user,
        }),
        { status: 200 }
      );
    } else {
      await db.insert(results).values({
        userId: userId,
        username: user,
        score: [marks],
        topic: [topic],
        createdAt: new Date(),
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: "Created new user entry",
          score: [marks],
          topic: [topic],
          userId,
          username: user,
        }),
        { status: 200 }
      );
    }
  } catch (error) {
    // console.error("Error saving marks:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to save marks",
        details: error.message,
      }),
      {
        status: 500,
      }
    );
  }
}
