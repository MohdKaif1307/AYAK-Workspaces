import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { insertInquirySchema, insertProductSchema } from "@shared/schema";
import { z } from "zod";
import { setupAuth, registerAuthRoutes } from "./auth";

// Augment Express Request for Passport
declare module "express-serve-static-core" {
  interface Request {
    isAuthenticated(): boolean;
    user?: any;
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Setup Auth
  await setupAuth(app);
  registerAuthRoutes(app);

  // --- Debug Route ---
  app.get("/api/debug", async (_req, res) => {
    try {
      const categoriesCount = (await storage.getCategories()).length;
      const productsCount = (await storage.getProducts()).length;
      res.json({
        status: "ok",
        dbConnected: !!storage,
        isDatabaseStorage: storage instanceof (await import("./storage")).DatabaseStorage,
        counts: { categories: categoriesCount, products: productsCount },
        env: process.env.NODE_ENV,
        hasDbUrl: !!process.env.DATABASE_URL,
      });
    } catch (err: any) {
      console.error("Debug Route Error:", err);
      res.status(500).json({
        status: "error",
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        env: process.env.NODE_ENV,
        hasDbUrl: !!process.env.DATABASE_URL,
      });
    }
  });

  // --- API Routes ---

  // Products
  app.get(api.products.list.path, async (req, res) => {
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;
    const products = await storage.getProducts(categoryId);
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  });

  app.post(api.products.create.path, async (req, res) => {
    try {
      const input = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(input);
      res.status(201).json(product);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Categories
  app.get(api.categories.list.path, async (req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  // Quotes
  app.post(api.quotes.create.path, async (req, res) => {
    // Check auth
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const input = z.object({
        items: z.array(z.object({
          productId: z.number(),
          quantity: z.number(),
          customizationNotes: z.string().optional()
        }))
      }).parse(req.body);

      const userId = (req.user as any).claims.sub;
      const quote = await storage.createQuote(userId, input.items);
      res.status(201).json(quote);
    } catch (err) {
      console.error(err);
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get(api.quotes.list.path, async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = (req.user as any).claims.sub;
    const quotes = await storage.getQuotes(userId);
    res.json(quotes);
  });

  // Inquiries
  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(input as any); // Type cast if needed due to omitted fields in schema vs inferred
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Seed Data (non-blocking in development/production)
  seedDatabase().catch(err => {
    console.error("Database seeding failed:", err);
  });

  return httpServer;
}

async function seedDatabase() {
  const existingCategories = await storage.getCategories();

  const cats = [
    { name: "Workstations", slug: "workstations", imageUrl: "https://www.officefurniturecenter.com/media/wysiwyg/components-of-a-workstaton.jpg" },
    { name: "Office Chairs", slug: "office-chairs", imageUrl: "https://cxl.com/wp-content/uploads/2023/09/Office-chair-1024x595.jpg" },
    { name: "Executive & MD Furniture", slug: "executive", imageUrl: "https://cdn.dribbble.com/userupload/32922234/file/original-02d0ac6da863f0278ae68bda9b65191c.png?format=webp&resize=400x300&vertical=center" },
    { name: "Storage & Cabinets", slug: "storage", imageUrl: "https://www.studiofoxdesign.com/wp-content/uploads/2021/12/Cube-1024x492.jpg" },
    { name: "Conference & Reception", slug: "conference", imageUrl: "https://cdn.dribbble.com/userupload/45293418/file/977134ef4c94cba16953b8d48aed4525.png?format=webp&resize=400x300&vertical=center" },
    { name: "Sofas", slug: "sofas", imageUrl: "https://www.ecomva.com/wp-content/uploads/2024/04/furniture-service-banner-1.png" },
  ];

  // Sync categories
  for (const c of cats) {
    if (!existingCategories.find(ec => ec.slug === c.slug)) {
      console.log(`Seeding category: ${c.name}`);
      await storage.createCategory(c as any);
    }
  }

  // Get fresh list of categories with IDs
  const allCategories = await storage.getCategories();

  // Add some products
  const products = [
    {
      name: "ErgoOne Task Chair",
      description: "High-performance ergonomic chair with mesh back and adjustable lumbar support.",
      price: 1500000, // 15,000.00
      categoryId: allCategories.find(c => c.slug === "office-chairs")?.id,
      imageUrl: "https://cxl.com/wp-content/uploads/2023/09/Office-chair-1024x595.jpg",
      isCustomizable: true,
      specifications: { "Backrest": "Mesh", "Base": "Nylon", "Warranty": "5 Years" }
    },
    {
      name: "Modular Workstation 4-Person",
      description: "Scalable workstation system designed for collaborative teams.",
      price: 4500000,
      categoryId: allCategories.find(c => c.slug === "workstations")?.id,
      imageUrl: "https://www.officefurniturecenter.com/media/wysiwyg/components-of-a-workstaton.jpg",
      isCustomizable: true,
      specifications: { "Dimensions": "1200x600mm per seat", "Material": "Engineered Wood" }
    },
    {
      name: "Executive Desk Elite",
      description: "Premium executive desk with integrated cable management and leather pad.",
      price: 8500000,
      categoryId: allCategories.find(c => c.slug === "executive")?.id,
      imageUrl: "https://cdn.dribbble.com/userupload/32922234/file/original-02d0ac6da863f0278ae68bda9b65191c.png?format=webp&resize=400x300&vertical=center",
      isCustomizable: true,
      specifications: { "Finish": "Walnut Veneer", "Width": "1800mm" }
    }
  ];

  const existingProducts = await storage.getProducts();

  for (const p of products) {
    if (!existingProducts.find(ep => ep.name === p.name) && p.categoryId) {
      console.log(`Seeding product: ${p.name}`);
      await storage.createProduct(p as any);
    }
  }

  console.log("Database seeding completed.");
}
