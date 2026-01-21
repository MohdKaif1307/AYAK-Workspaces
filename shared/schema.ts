import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export * from "./models/auth";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price"), // Stored in cents or just raw number. "Starting from"
  categoryId: integer("category_id").references(() => categories.id),
  imageUrl: text("image_url").notNull(),
  gallery: jsonb("gallery").$type<string[]>(), // Array of image URLs
  specifications: jsonb("specifications").$type<Record<string, string>>(),
  isCustomizable: boolean("is_customizable").default(true),
  material: text("material"),
  seatingCapacity: text("seating_capacity"),
  createdAt: timestamp("created_at").defaultNow(),
});

// We need to link quotes to the Auth users table which uses string IDs
import { users } from "./models/auth";

export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id), // Auth user ID is string
  status: text("status").default("pending"), // pending, approved, rejected, converted
  createdAt: timestamp("created_at").defaultNow(),
});

export const quoteItems = pgTable("quote_items", {
  id: serial("id").primaryKey(),
  quoteId: integer("quote_id").references(() => quotes.id),
  productId: integer("product_id").references(() => products.id),
  quantity: integer("quantity").default(1),
  customizationNotes: text("customization_notes"),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  message: text("message").notNull(),
  type: text("type").default("general"), // general, solution_request
  createdAt: timestamp("created_at").defaultNow(),
});

// RELATIONS
export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const quotesRelations = relations(quotes, ({ one, many }) => ({
  user: one(users, {
    fields: [quotes.userId],
    references: [users.id],
  }),
  items: many(quoteItems),
}));

export const quoteItemsRelations = relations(quoteItems, ({ one }) => ({
  quote: one(quotes, {
    fields: [quoteItems.quoteId],
    references: [quotes.id],
  }),
  product: one(products, {
    fields: [quoteItems.productId],
    references: [products.id],
  }),
}));

// SCHEMAS
export const insertProductSchema = createInsertSchema(products).omit({ id: true, createdAt: true });
export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export const insertQuoteSchema = createInsertSchema(quotes).omit({ id: true, createdAt: true, status: true });
export const insertQuoteItemSchema = createInsertSchema(quoteItems).omit({ id: true });
export const insertInquirySchema = createInsertSchema(inquiries).omit({ id: true, createdAt: true });

// TYPES
export type Product = typeof products.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Quote = typeof quotes.$inferSelect;
export type QuoteItem = typeof quoteItems.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertQuoteItem = z.infer<typeof insertQuoteItemSchema>;
