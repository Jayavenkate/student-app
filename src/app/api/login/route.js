import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { db } from "../../../../lib/db";
import { users } from "../../../../lib/schema";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Find active user in DB
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    // .where(eq(users.status, true))
    // .where(eq(users.password, password));

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 401 });
    }
    // if (!user && user.status !== true) {
    //   return Response.json(
    //     { error: "Unauthorized: Invalid role or inactive account" },
    //     { status: 401 }
    //   );
    // }
    if (!user.status) {
      return Response.json(
        {
          error:
            "Account is inactive. Please wait until admin accepts your request and activates your account.",
        },
        { status: 403 }
      );
    }

    if (user.password !== password) {
      return Response.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }
    // // ✅ Plain password checking without bcrypt
    // if (password !== user.password) {
    //   return Response.json({ error: "Invalid password" }, { status: 401 });
    // }

    // Generate JWT token with id and role
    const token = jwt.sign(
      { id: user.id, role: user.role }, // include role
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("Generated JWT Token:", token);
    // Set token as HttpOnly cookie
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
      path: "/",
    });

    // Remove password before sending user data
    const { password: _, ...userWithoutPassword } = user;

    return Response.json({
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    // console.error("Login error:", error);
    return Response.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

// import { eq } from "drizzle-orm";
// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";
// import { db } from "../../../../lib/db";
// import { users } from "../../../../lib/schema";

// export async function POST(request) {
//   try {
//     const { username, password } = await request.json();

//     const [user] = await db
//       .select()
//       .from(users)
//       .where(eq(users.username, username))
//       .where(eq(users.status, true))
//       .where(eq(users.password, password));

//     if (!user) {
//       return Response.json({ error: "User not found" }, { status: 404 });
//     }
//     if (user.role === "user" && user.status !== true) {
//       return Response.json(
//         { error: "Unauthorized: Invalid role or inactive account" },
//         { status: 401 }
//       );
//     }

//     const token = jwt.sign(
//       { id: user.id, role: user.role, username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     console.log("Generated JWT Token:", token);

//     const cookieStore = cookies();

//     // Set token cookie
//     cookieStore.set("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 3600,
//       path: "/",
//     });

//     // Optionally set other cookies (non-httpOnly if needed on client)
//     cookieStore.set("username", user.username);
//     cookieStore.set("role", user.role);
//     cookieStore.set("userId", String(user.id));

//     const { password: _, ...userWithoutPassword } = user;

//     return Response.json({
//       message: "Login successful",
//       user: userWithoutPassword,
//     });
//   } catch (error) {
//     return Response.json(
//       { error: "Internal server error", details: error.message },
//       { status: 500 }
//     );
//   }
// }

// app/api/auth/login/route.ts (or .js based on your setup)
