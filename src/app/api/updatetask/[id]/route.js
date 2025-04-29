import { eq } from "drizzle-orm";
import { db } from "../../../../../lib/db";
import { quizzes } from "../../../../../lib/schema";

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const { title, description, question, answer1, answer2, answer3, answer4 } =
      body;
    const { id } = params; // 👈 get id from the URL params

    // Update quiz where id matches
    await db
      .update(quizzes)
      .set({
        title,
        description,
        question,
        answer1,
        answer2,
        answer3,
        answer4,
      })
      .where(eq(quizzes.id, Number(id))); // 👈 convert id to Number if it's string

    return new Response(
      JSON.stringify({ message: "Quiz updated successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    // console.error("Error updating quiz:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
