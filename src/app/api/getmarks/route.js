import { eq } from "drizzle-orm";
import { db } from "../../../../lib/db";
import { results } from "../../../../lib/schema";

import { cookies } from "next/headers";
export async function GET(req) {
  try {
    const userId = cookies().get("userId")?.value;

    // Fetch all quizzes from the database
    const allQuizzes = await db
      .select()
      .from(results)
      .where(eq(results.userId, userId));

    // Return the quizzes in the response
    return new Response(JSON.stringify(allQuizzes), {
      status: 200,
    });
  } catch (error) {
    // console.error("Error fetching quizzes:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
