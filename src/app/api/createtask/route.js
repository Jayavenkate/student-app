import { eq } from "drizzle-orm";
import { db } from "../../../../lib/db";
import { quizzes } from "../../../../lib/schema";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      question,
      answer1,
      answer2,
      answer3,
      answer4,
      correctAnswer,
    } = body;

    // 2. Insert new quiz
    await db.insert(quizzes).values({
      title,
      description,
      question,
      correctAnswer,
      answer1,
      answer2,
      answer3,
      answer4,
    });

    return new Response(
      JSON.stringify({ message: "Quiz created successfully" }),
      { status: 201 }
    );
  } catch (error) {
    // console.error("Error creating quiz:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
