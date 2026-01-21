import { useState } from "react";
import { useProducts, useCategories } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  
  const { data: products, isLoading: productsLoading } = useProducts({ 
    search: search || undefined,
    categoryId: category !== "all" ? category : undefined
  });
  
  const { data: categories } = useCategories();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">Our Collections</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Explore our range of premium office furniture, designed for comfort, durability, and style.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="container mx-auto px-4 py-8 sticky top-20 z-30 bg-background/95 backdrop-blur border-b border-border/50">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search products..." 
              className="pl-9 bg-secondary/50 border-transparent focus:bg-background"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filters - Desktop */}
          <div className="hidden md:flex gap-2">
            <Button 
              variant={category === "all" ? "default" : "ghost"} 
              onClick={() => setCategory("all")}
            >
              All
            </Button>
            {categories?.map((cat) => (
              <Button
                key={cat.id}
                variant={category === String(cat.id) ? "default" : "ghost"}
                onClick={() => setCategory(String(cat.id))}
              >
                {cat.name}
              </Button>
            ))}
          </div>

          {/* Mobile Filter */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden w-full flex gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Categories</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 mt-6">
                <Button 
                  variant={category === "all" ? "default" : "ghost"} 
                  className="justify-start"
                  onClick={() => setCategory("all")}
                >
                  All Products
                </Button>
                {categories?.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={category === String(cat.id) ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setCategory(String(cat.id))}
                  >
                    {cat.name}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 py-12">
        {productsLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : products?.length === 0 ? (
          <div className="text-center py-24">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
