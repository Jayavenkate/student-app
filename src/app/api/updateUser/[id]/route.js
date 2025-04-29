// import { eq } from "drizzle-orm";
// import { db } from "../../../../../lib/db";
// import { users } from "../../../../../lib/schema";

// export async function PUT(req, { params }) {
//   try {
//     const { id } = params; // get id from URL
//     const userId = Number(id); // ensure it's a number

//     // Find the user first
//     const [user] = await db.select().from(users).where(eq(users.id, userId));

//     if (!user) {
//       return new Response(JSON.stringify({ error: "User not found" }), {
//         status: 404,
//       });
//     }

//     // Toggle the status
//     const updatedStatus = user.status === "true" ? "false" : "true";

//     // Update the user
//     await db
//       .update(users)
//       .set({ status: updatedStatus })
//       .where(eq(users.id, userId));

//     const allUsers = await db
//       .select()
//       .from(users)
//       .where(ne(users.role, "admin")); // <-- use ne() here

//     return new Response(JSON.stringify(allUsers), {
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return new Response(JSON.stringify({ error: "Internal server error" }), {
//       status: 500,
//     });
//   }
// }

import { eq, ne } from "drizzle-orm"; // ✅ added ne
import { db } from "../../../../../lib/db";
import { users } from "../../../../../lib/schema";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const userId = Number(id);

    const [user] = await db.select().from(users).where(eq(users.id, userId));

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const updatedStatus = user.status === "1" ? "0" : "1";
    // return new Response(JSON.stringify(updatedStatus), {
    //   status: 200,
    // });
    await db
      .update(users)
      .set({ status: updatedStatus })
      .where(eq(users.id, userId));

    const allUsers = await db
      .select()
      .from(users)
      .where(ne(users.role, "admin")); // ✅ now ne imported

    return new Response(JSON.stringify(allUsers), {
      status: 200,
    });
  } catch (error) {
    // console.error("Error updating user:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
