const { db } = require("./lib/db");
const { users } = require("./lib/schema");
const bcrypt = require("bcryptjs");

async function seedUser() {
  try {
    const username = "jaya";
    const email = "jaya@gmail.com";
    const plainPassword = "jaya@123";
    
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    await db.insert(users).values({
      username,
      email,
      password: hashedPassword
    });
    
    console.log("User seeded successfully!");
  } catch (error) {
    console.error("Error seeding user:", error);
  } finally {
    process.exit();
  }
}

seedUser();