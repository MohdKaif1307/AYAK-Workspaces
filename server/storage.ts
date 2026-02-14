import {
  products, categories, quotes, quoteItems, inquiries, blogPosts,
  type Product, type InsertProduct,
  type Category,
  type Quote,
  type QuoteItem, type InsertQuoteItem,
  type Inquiry,
  type BlogPost
} from "../shared/schema";
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
  createCategory(category: Category): Promise<Category>;

  // Quotes
  createQuote(userId: string | null, items: InsertQuoteItem[]): Promise<Quote>;
  getQuotes(userId: string): Promise<Quote[]>;
  getQuote(id: number): Promise<Quote | undefined>;

  // Inquiries
  createInquiry(inquiry: Inquiry): Promise<Inquiry>;

  // Blog
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: any): Promise<BlogPost>;
}

// In-memory storage for when database is not available
class InMemoryStorage implements IStorage {
  private productsList: Map<number, Product> = new Map();
  private categoriesList: Map<number, Category> = new Map();
  private quotesList: Map<number, Quote> = new Map();
  private quoteItemsList: Map<number, QuoteItem> = new Map();
  private inquiriesList: Map<number, Inquiry> = new Map();
  private blogPostsList: Map<number, BlogPost> = new Map();
  private nextProductId = 1;
  private nextCategoryId = 1;
  private nextQuoteId = 1;
  private nextQuoteItemId = 1;
  private nextInquiryId = 1;
  private nextBlogPostId = 1;

  async getProducts(categoryId?: number): Promise<Product[]> {
    const products = Array.from(this.productsList.values());
    if (categoryId) {
      return products.filter(p => p.categoryId === categoryId);
    }
    return products;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.productsList.get(id);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.nextProductId++;
    const newProduct: Product = {
      ...product,
      id,
      createdAt: new Date(),
    } as Product;
    this.productsList.set(id, newProduct);
    return newProduct;
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categoriesList.values());
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categoriesList.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    for (const category of Array.from(this.categoriesList.values())) {
      if (category.slug === slug) return category;
    }
    return undefined;
  }

  async createCategory(category: Category): Promise<Category> {
    const id = this.nextCategoryId++;
    const newCategory: Category = { ...category, id } as Category;
    this.categoriesList.set(id, newCategory);
    return newCategory;
  }

  async createQuote(userId: string | null, items: InsertQuoteItem[]): Promise<Quote> {
    const id = this.nextQuoteId++;
    const quote: Quote = {
      id,
      userId: userId || undefined,
      status: 'pending',
      createdAt: new Date(),
    } as Quote;
    this.quotesList.set(id, quote);

    for (const item of items) {
      const itemId = this.nextQuoteItemId++;
      const quoteItem: QuoteItem = {
        ...item,
        id: itemId,
        quoteId: id,
      } as QuoteItem;
      this.quoteItemsList.set(itemId, quoteItem);
    }

    return quote;
  }

  async getQuotes(userId: string): Promise<Quote[]> {
    const userQuotes = Array.from(this.quotesList.values())
      .filter(q => q.userId === userId)
      .sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      });
    return userQuotes;
  }

  async getQuote(id: number): Promise<Quote | undefined> {
    return this.quotesList.get(id);
  }

  async createInquiry(inquiry: Inquiry): Promise<Inquiry> {
    const id = this.nextInquiryId++;
    const newInquiry: Inquiry = {
      ...inquiry,
      id,
      createdAt: new Date(),
    } as Inquiry;
    this.inquiriesList.set(id, newInquiry);
    return newInquiry;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPostsList.values())
      .sort((a, b) => {
        const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return bTime - aTime;
      });
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    for (const post of Array.from(this.blogPostsList.values())) {
      if (post.slug === slug) return post;
    }
    return undefined;
  }

  async createBlogPost(post: any): Promise<BlogPost> {
    const id = this.nextBlogPostId++;
    const newPost: BlogPost = {
      ...post,
      id,
      publishedAt: new Date(),
    } as BlogPost;
    this.blogPostsList.set(id, newPost);
    return newPost;
  }
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

  async createCategory(category: any): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }

  async createQuote(userId: string | null, items: InsertQuoteItem[]): Promise<Quote> {
    const [quote] = await db.insert(quotes).values({
      userId: userId || undefined,
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

  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async createBlogPost(post: any): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }
}

export const storage = db ? new DatabaseStorage() : new InMemoryStorage();
