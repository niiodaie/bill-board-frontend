import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  stripeCustomerId: text("stripe_customer_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const ads = pgTable("ads", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(), // 'image', 'video', 'text'
  content: jsonb("content").notNull(), // stores asset URLs, text content, etc.
  targetUrl: text("target_url"),
  callToAction: text("call_to_action"),
  status: text("status").notNull().default("pending"), // 'pending', 'approved', 'rejected', 'active', 'paused'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  adId: integer("ad_id").notNull(),
  name: text("name").notNull(),
  placement: text("placement").notNull(), // 'premium', 'featured', 'standard'
  dailyBudget: decimal("daily_budget", { precision: 10, scale: 2 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'active', 'paused', 'completed'
  impressions: integer("impressions").default(0),
  clicks: integer("clicks").default(0),
  totalSpend: decimal("total_spend", { precision: 10, scale: 2 }).default("0"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  campaignId: integer("campaign_id").notNull(),
  stripePaymentIntentId: text("stripe_payment_intent_id").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("usd"),
  status: text("status").notNull(), // 'pending', 'succeeded', 'failed'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const deals = pgTable("deals", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  discountPercentage: integer("discount_percentage"),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  discountedPrice: decimal("discounted_price", { precision: 10, scale: 2 }),
  affiliateUrl: text("affiliate_url").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(),
  expiresAt: timestamp("expires_at"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  ads: many(ads),
  campaigns: many(campaigns),
  payments: many(payments),
}));

export const adsRelations = relations(ads, ({ one, many }) => ({
  user: one(users, {
    fields: [ads.userId],
    references: [users.id],
  }),
  campaigns: many(campaigns),
}));

export const campaignsRelations = relations(campaigns, ({ one, many }) => ({
  user: one(users, {
    fields: [campaigns.userId],
    references: [users.id],
  }),
  ad: one(ads, {
    fields: [campaigns.adId],
    references: [ads.id],
  }),
  payments: many(payments),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(users, {
    fields: [payments.userId],
    references: [users.id],
  }),
  campaign: one(campaigns, {
    fields: [payments.campaignId],
    references: [campaigns.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
});

export const insertAdSchema = createInsertSchema(ads).pick({
  title: true,
  description: true,
  type: true,
  content: true,
  targetUrl: true,
  callToAction: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).pick({
  adId: true,
  name: true,
  placement: true,
  dailyBudget: true,
  startDate: true,
  endDate: true,
});

export const insertDealSchema = createInsertSchema(deals).pick({
  title: true,
  description: true,
  discountPercentage: true,
  originalPrice: true,
  discountedPrice: true,
  affiliateUrl: true,
  imageUrl: true,
  category: true,
  expiresAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Ad = typeof ads.$inferSelect;
export type InsertAd = z.infer<typeof insertAdSchema>;
export type Campaign = typeof campaigns.$inferSelect;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Payment = typeof payments.$inferSelect;
export type Deal = typeof deals.$inferSelect;
export type InsertDeal = z.infer<typeof insertDealSchema>;
