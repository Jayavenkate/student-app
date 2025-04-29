import dotenv from "dotenv";
dotenv.config();

const config = {
  schema: "./lib/schema.js",
  out: "./drizzle/migrations",
  dialect: "mysql",
  dbCredentials: {
    connectionString: `mysql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`,
  },
};

export default config;
