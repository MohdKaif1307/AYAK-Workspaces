import { useState } from "react";
import { useProducts, useCategories } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Loader2, Star, Truck, Filter, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  
  const { data: products, isLoading: productsLoading } = useProducts({ 
    search: search || undefined,
    categoryId: category !== "all" ? category : undefined
  });
  
  const { data: categories } = useCategories();

  // Sort products based on selected option
  const sortedProducts = products ? [...products].sort((a, b) => {
    if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
    if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  }) : [];

  const isFiltered = search.length > 0 || category !== "all";

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[650px] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="/images/hero-products.jpg" 
            alt="Collections Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="font-display font-bold text-5xl md:text-6xl leading-tight mb-6">
              Premium Furniture Collections
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light">
              Meticulously curated office furniture designed for elegance, functionality, and lasting impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
              Explore our complete range of premium office furniture, each piece handpicked for superior craftsmanship, timeless design, and exceptional value. From executive desks to collaborative spaces, find exactly what your workspace needs.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Controls - Advanced Filters */}
      <div className="container mx-auto px-4 py-8 sticky top-20 z-30 bg-background/95 backdrop-blur-md border-b border-border/50 rounded-b-xl shadow-lg">
        <div className="space-y-4">
          {/* Main Controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Search */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative flex-1 md:max-w-md"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search products by name..." 
                className="pl-9 bg-secondary/50 border-border/50 focus:bg-background focus:border-primary transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </motion.div>

            {/* Sort - Desktop */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex gap-2"
            >
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-44 bg-secondary/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Mobile Sort & Filter */}
            <div className="md:hidden flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="flex-1 bg-secondary/50 border-border/50 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low</SelectItem>
                  <SelectItem value="price-high">Price: High</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                category === "all"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary/50 text-foreground hover:bg-secondary border border-border/50"
              }`}
              onClick={() => setCategory("all")}
            >
              All Products
            </motion.button>
            
            {categories?.map((cat, idx) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                  category === String(cat.id)
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary/50 text-foreground hover:bg-secondary border border-border/50"
                }`}
                onClick={() => setCategory(String(cat.id))}
              >
                {cat.name}
              </motion.button>
            ))}
          </div>

          {/* Active Filters Display */}
          {isFiltered && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex items-center gap-2 pt-2 border-t border-border/50"
            >
              <span className="text-xs font-medium text-muted-foreground">Filters Active:</span>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  {search}
                  <X className="w-3 h-3" />
                </button>
              )}
              {category !== "all" && (
                <button
                  onClick={() => setCategory("all")}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  {categories?.find(c => c.id.toString() === category)?.name}
                  <X className="w-3 h-3" />
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Grid or Empty State */}
      <div className="container mx-auto px-4 py-12">
        {productsLoading ? (
          <motion.div 
            className="flex flex-col items-center justify-center h-64 gap-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading premium collections...</p>
          </motion.div>
        ) : sortedProducts?.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="mb-6 text-6xl">🎨</div>
            <h3 className="text-2xl font-display font-bold mb-3">No Products Found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
              {isFiltered 
                ? "We couldn't find any products matching your filters. Try adjusting your search or category."
                : "Our collections are currently being curated. Check back soon for premium selections!"}
            </p>
            {isFiltered && (
              <Button 
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                }}
              >
                Clear Filters
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {sortedProducts?.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Results Count */}
        {sortedProducts && sortedProducts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center text-muted-foreground"
          >
            <p className="text-sm">
              Showing <span className="font-semibold text-foreground">{sortedProducts.length}</span> premium products
            </p>
          </motion.div>
        )}
      </div>

      {/* Info Section */}
      <section className="bg-gradient-to-r from-primary/5 via-secondary/30 to-primary/5 py-16 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-lg mb-4">
                <Star className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
              <p className="text-muted-foreground text-sm">
                All products meet rigorous quality standards and are built to last for years.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-6"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-lg mb-4">
                <Truck className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
              <p className="text-muted-foreground text-sm">
                Complimentary delivery and installation for orders over $5,000.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-6"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-lg mb-4">
                <div className="text-2xl font-bold">✓</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">5-Year Warranty</h3>
              <p className="text-muted-foreground text-sm">
                Complete peace of mind with comprehensive warranty coverage.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
