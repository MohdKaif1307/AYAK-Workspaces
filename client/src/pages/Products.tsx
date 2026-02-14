import { useState } from "react";
import { useProducts, useCategories } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Star, Truck, X, Package } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
      <section className="relative h-[50vh] min-h-[500px] flex items-center bg-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-products.jpg"
            alt="Collections Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="text-primary font-semibold tracking-widest text-xs uppercase mb-3 block">Premium Collections</span>
            <h1 className="font-display font-bold text-5xl md:text-6xl leading-tight mb-4">
              Curated Office Furniture
            </h1>
            <p className="text-lg md:text-xl text-white/70 font-light max-w-xl">
              Meticulously selected pieces designed for elegance, functionality, and lasting impact.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Controls - Sticky Filter Bar */}
      <div className="container mx-auto px-4 py-6 sticky top-16 z-30">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-4 shadow-lg"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Search */}
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products..."
                className="pl-9 bg-background/50 border-border/50 focus:bg-background rounded-xl"
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
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-44 bg-background/50 border-border/50 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${category === "all"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-background/50 text-foreground hover:bg-background border border-border/50"
                }`}
              onClick={() => setCategory("all")}
            >
              All Products
            </motion.button>

            {categories?.map((cat, idx) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${category === String(cat.id)
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-background/50 text-foreground hover:bg-background border border-border/50"
                  }`}
                onClick={() => setCategory(String(cat.id))}
              >
                {cat.name}
              </motion.button>
            ))}
          </div>

          {/* Active Filters */}
          {isFiltered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex items-center gap-2 pt-3 border-t border-border/30"
            >
              <span className="text-xs font-medium text-muted-foreground">Active:</span>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  {search} <X className="w-3 h-3" />
                </button>
              )}
              {category !== "all" && (
                <button
                  onClick={() => setCategory("all")}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  {categories?.find(c => c.id.toString() === category)?.name}
                  <X className="w-3 h-3" />
                </button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 py-8">
        {productsLoading ? (
          <motion.div
            className="flex flex-col items-center justify-center h-64 gap-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading collections...</p>
          </motion.div>
        ) : sortedProducts?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-3">No Products Found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
              {isFiltered
                ? "We couldn't find any products matching your filters. Try adjusting your search."
                : "Our collections are being curated. Check back soon!"}
            </p>
            {isFiltered && (
              <Button
                variant="outline"
                className="rounded-lg"
                onClick={() => { setSearch(""); setCategory("all"); }}
              >
                Clear All Filters
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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

        {sortedProducts && sortedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{sortedProducts.length}</span> products
            </p>
          </motion.div>
        )}
      </div>

      {/* Info Section */}
      <section className="bg-secondary/20 py-16 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Star, title: "Premium Quality", desc: "Rigorous quality standards built to last for years." },
              { icon: Truck, title: "Free Shipping", desc: "Complimentary delivery for orders over $5,000." },
              { icon: Package, title: "5-Year Warranty", desc: "Comprehensive warranty coverage for peace of mind." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
