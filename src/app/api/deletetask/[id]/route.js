import { db } from "../../../../../lib/db";

import { eq } from "drizzle-orm";
import { quizzes } from "../../../../../lib/schema";

export async function DELETE(req, { params }) {
  const { id } = params; // id from URL

  try {
    await db.delete(quizzes).where(eq(quizzes.id, Number(id)));

    return new Response(null, { status: 204 }); // 204 = No Content
  } catch (error) {
    // console.error("Error deleting quiz:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
