import { 
  products, categories, quotes, quoteItems, inquiries,
  type Product, type InsertProduct,
  type Category, 
  type Quote, 
  type QuoteItem, type InsertQuoteItem,
  type Inquiry
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Products
  getProducts(categoryId?: number): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: Category): Promise<Category>; // Seed mainly

  // Quotes
  createQuote(userId: string | null, items: InsertQuoteItem[]): Promise<Quote>;
  getQuotes(userId: string): Promise<Quote[]>;
  getQuote(id: number): Promise<Quote | undefined>;

  // Inquiries
  createInquiry(inquiry: Inquiry): Promise<Inquiry>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(categoryId?: number): Promise<Product[]> {
    if (categoryId) {
      return await db.select().from(products).where(eq(products.categoryId, categoryId));
    }
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategory(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category;
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category;
  }

  async createCategory(category: Category): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }

  async createQuote(userId: string | null, items: InsertQuoteItem[]): Promise<Quote> {
    // Start transaction if possible, but for now simple insert
    const [quote] = await db.insert(quotes).values({
      userId: userId || undefined, // undefined will result in null if allowed, but references enforce strict? userId is nullable in our schema? 
      // Schema says userId references auth users. If guest, maybe we need to handle differently or require auth.
      // For now, let's assume we require auth for quotes or handle null userId if we change schema.
      // My updated schema has userId: text("user_id").references(() => users.id).
      // If userId is null, it's a guest quote? FK might allow null.
      status: 'pending'
    }).returning();

    for (const item of items) {
      await db.insert(quoteItems).values({
        ...item,
        quoteId: quote.id
      });
    }

    return quote;
  }

  async getQuotes(userId: string): Promise<Quote[]> {
    return await db.select().from(quotes).where(eq(quotes.userId, userId)).orderBy(desc(quotes.createdAt));
  }

  async getQuote(id: number): Promise<Quote | undefined> {
    const [quote] = await db.select().from(quotes).where(eq(quotes.id, id));
    return quote;
  }

  async createInquiry(inquiry: Inquiry): Promise<Inquiry> {
    const [newInquiry] = await db.insert(inquiries).values(inquiry).returning();
    return newInquiry;
  }
}

export const storage = new DatabaseStorage();
