import {
  mysqlTable,
  varchar,
  datetime,
  int,
  boolean,
  text,
  json,
  foreignKey,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  role: varchar("role", { length: 20 }).notNull().default("user"),
  status: boolean("status").notNull().default(false),
  createdAt: datetime("created_at").default(new Date()),
});

export const quizzes = mysqlTable("quizzes", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  question: varchar("question", { length: 255 }).notNull(),
  answer1: varchar("answer1", { length: 255 }).notNull(),
  answer2: varchar("answer2", { length: 255 }).notNull(),
  answer3: varchar("answer3", { length: 255 }).notNull(),
  answer4: varchar("answer4", { length: 255 }).notNull(),
  correctAnswer: varchar("correctAnswer", { length: 255 }).notNull(),
  createdAt: datetime("created_at").default(new Date()).notNull(),
});

// export const results = mysqlTable("results", {
//   id: int("id").autoincrement().primaryKey(),
//   userId: int("userId").autoincrement(),
//   username: varchar("username", { length: 50 }).notNull().unique(),
//   score: json("score").notNull(),
//   topic: json("topic").notNull(),

//   createdAt: datetime("created_at").default(new Date()).notNull(),
//   completed: text("completed").notNull().default("[]"),
// });

export const results = mysqlTable(
  "results",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId")
      .notNull()
      .references(() => users.id), // Foreign key
    username: varchar("username", { length: 50 }).notNull().unique(),
    score: json("score").notNull(),
    topic: json("topic").notNull(),
    createdAt: datetime("created_at").default(new Date()).notNull(),
    completed: text("completed").notNull().default("[]"),
  },
  (table) => ({
    // Additional foreign key configuration (optional)
    fk: foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_results_user",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  })
);
