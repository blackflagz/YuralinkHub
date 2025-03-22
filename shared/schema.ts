import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const influencers = pgTable("influencers", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  socialHandles: text("social_handles").notNull(),
  primaryPlatform: text("primary_platform").notNull(),
  followerCount: text("follower_count").notNull(),
  contentNiche: text("content_niche").notNull(),
  additionalInfo: text("additional_info"),
});

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  contactPerson: text("contact_person").notNull(),
  email: text("email").notNull(),
  campaignGoal: text("campaign_goal").notNull(),
  campaignBudget: text("campaign_budget").notNull(),
  preferredPlatforms: text("preferred_platforms").notNull(),
  additionalNotes: text("additional_notes"),
});

export const insertInfluencerSchema = createInsertSchema(influencers).pick({
  fullName: true,
  email: true,
  socialHandles: true,
  primaryPlatform: true,
  followerCount: true,
  contentNiche: true,
  additionalInfo: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
});

export const insertCompanySchema = createInsertSchema(companies).pick({
  companyName: true,
  contactPerson: true,
  email: true,
  campaignGoal: true,
  campaignBudget: true,
  preferredPlatforms: true,
  additionalNotes: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
});

export type InsertInfluencer = z.infer<typeof insertInfluencerSchema>;
export type Influencer = typeof influencers.$inferSelect;

export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Company = typeof companies.$inferSelect;
