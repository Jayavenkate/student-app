import { db } from "../../../../lib/db";
import { users } from "../../../../lib/schema";
import { ne } from "drizzle-orm"; // <-- import ne

export async function GET(req) {
  try {
    // Fetch all users who are NOT admins
    const allUsers = await db
      .select()
      .from(users)
      .where(ne(users.role, "admin")); // <-- use ne() here

    return new Response(JSON.stringify(allUsers), {
      status: 200,
    });
  } catch (error) {
    // console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
