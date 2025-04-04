import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  fullName: text("full_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Announcements model
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  date: timestamp("date").defaultNow(),
  isActive: boolean("is_active").default(true),
});

// Budget data model
export const budgetData = pgTable("budget_data", {
  id: serial("id").primaryKey(),
  year: text("year").notNull(),
  sector: text("sector").notNull(),
  amount: integer("amount").notNull(),
  percentage: integer("percentage").notNull(),
});

// Government projects model
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  sector: text("sector").notNull(),
  budget: text("budget").notNull(),
  timeline: text("timeline").notNull(),
  status: text("status").notNull(),
  progress: integer("progress").notNull(),
});

// Rights categories model
export const rightsCategories = pgTable("rights_categories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
});

// Policy updates model
export const policyUpdates = pgTable("policy_updates", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").defaultNow(),
  isNew: boolean("is_new").default(true),
});

// Schema for AI policy explanations
export const policyExplanations = pgTable("policy_explanations", {
  id: serial("id").primaryKey(),
  query: text("query").notNull(),
  explanation: text("explanation").notNull(),
  summary: text("summary").notNull(),
  keyPoints: json("key_points").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Schema for Feedback
export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  message: text("message").notNull(),
  category: text("category"),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
});

export const insertAnnouncementSchema = createInsertSchema(announcements).pick({
  title: true,
  content: true,
  isActive: true,
});

export const insertBudgetDataSchema = createInsertSchema(budgetData).pick({
  year: true,
  sector: true,
  amount: true,
  percentage: true,
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  name: true,
  sector: true,
  budget: true,
  timeline: true,
  status: true,
  progress: true,
});

export const insertRightsCategorySchema = createInsertSchema(rightsCategories).pick({
  title: true,
  description: true,
});

export const insertPolicyUpdateSchema = createInsertSchema(policyUpdates).pick({
  title: true,
  description: true,
  isNew: true,
});

export const insertPolicyExplanationSchema = createInsertSchema(policyExplanations).pick({
  query: true,
  explanation: true,
  summary: true,
  keyPoints: true,
});

export const insertFeedbackSchema = createInsertSchema(feedback).pick({
  userId: true,
  message: true,
  category: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;

export type BudgetData = typeof budgetData.$inferSelect;
export type InsertBudgetData = z.infer<typeof insertBudgetDataSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type RightsCategory = typeof rightsCategories.$inferSelect;
export type InsertRightsCategory = z.infer<typeof insertRightsCategorySchema>;

export type PolicyUpdate = typeof policyUpdates.$inferSelect;
export type InsertPolicyUpdate = z.infer<typeof insertPolicyUpdateSchema>;

export type PolicyExplanation = typeof policyExplanations.$inferSelect;
export type InsertPolicyExplanation = z.infer<typeof insertPolicyExplanationSchema>;

export type Feedback = typeof feedback.$inferSelect;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
