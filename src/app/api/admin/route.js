import bcrypt from "bcryptjs";
import { db } from "../../../../lib/db";
import { users } from "../../../../lib/schema";

export async function POST(request) {
  try {
    const { username, password, email } = await request.json();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [newUser] = await db
      .insert(users)
      .values({
        username,
        email,
        password: hashedPassword,
      })
      .returning();

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
      }),
      { status: 201 }
    );
  } catch (error) {
    // console.error("Registration Error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message.includes("unique")
          ? "User already exists"
          : "Registration failed",
      }),
      { status: 500 }
    );
  }
}
