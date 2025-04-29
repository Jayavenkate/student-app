import { eq } from "drizzle-orm";
import { db } from "../../../../lib/db";
import { users } from "../../../../lib/schema";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    // 1. Check if email already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return new Response(
        JSON.stringify({ error: "Email already registered" }),
        { status: 400 }
      );
    }

    // 3. Insert user with hashed password
    await db.insert(users).values({
      username,
      email,
      password,
    });

    return new Response(
      JSON.stringify({ message: "User added successfully" }),
      { status: 201 }
    );
  } catch (error) {
    // console.error("Error creating user:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
