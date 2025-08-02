import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // "experience", "side-projects", "research"
  company: text("company"),
  venue: text("venue"), // for research papers
  year: text("year").notNull(),
  technologies: jsonb("technologies").$type<string[]>().notNull(),
  features: jsonb("features").$type<string[]>().notNull(),
  imageUrl: text("image_url").notNull(),
  githubUrl: text("github_url"),
  demoUrl: text("demo_url"),
  isFeatured: text("is_featured").default("false"),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
