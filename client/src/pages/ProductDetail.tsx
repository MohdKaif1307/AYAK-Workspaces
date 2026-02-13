import { useRoute, Link } from "wouter";
import { useProduct, useCreateQuote } from "@/hooks/use-products";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2, Star, ShoppingBag, Heart, ChevronRight, CheckCircle2, ArrowRight, Shield, Truck, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function ProductDetail() {
  const [, params] = useRoute("/products/:id");
  const { data: product, isLoading, error } = useProduct(Number(params?.id));
  const { mutate: createQuote } = useCreateQuote();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Track when main CTA scrolls out of view
  useEffect(() => {
    if (!ctaRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, [product]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display font-bold text-3xl mb-3">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button className="rounded-lg">Back to Collections</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToQuote = () => {
    createQuote(
      { items: [{ productId: product.id, quantity }] },
      {
        onSuccess: () => {
          toast({ title: "Added to Quote!", description: `${product.name} has been added to your quote request.` });
        },
        onError: () => {
          toast({ title: "Error", description: "Failed to add to quote. Please try again.", variant: "destructive" });
        },
      }
    );
  };

  const rating = 4;
  const specs = product.specifications as Record<string, string> | null;

  // Build gallery array from product image + generate variations
  const galleryImages = [
    product.imageUrl,
    product.imageUrl,
    product.imageUrl,
    product.imageUrl,
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-5">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm"
        >
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
          <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">Collections</Link>
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
          <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
        </motion.nav>
      </div>

      {/* Product Main */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-2xl bg-secondary shadow-xl relative group mb-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={galleryImages[selectedImage]}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </AnimatePresence>

              {/* Zoom indicator */}
              <div className="absolute bottom-4 left-4 glass px-3 py-1.5 rounded-lg text-xs font-medium text-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity">
                Hover to zoom
              </div>

              {/* Save Button */}
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.preventDefault(); setIsSaved(!isSaved); }}
                className={`absolute top-4 right-4 w-11 h-11 rounded-full glass flex items-center justify-center transition-all ${isSaved ? 'text-red-500' : 'text-foreground/50 hover:text-red-500'
                  }`}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500' : ''}`} />
              </motion.button>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${selectedImage === idx
                      ? 'border-primary shadow-md scale-105'
                      : 'border-border/30 hover:border-primary/50 opacity-60 hover:opacity-100'
                    }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Material Badge */}
            {product.material && (
              <span className="inline-flex w-fit items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                {product.material}
              </span>
            )}

            <h1 className="font-display font-bold text-3xl md:text-4xl mb-4 leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-border'}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.0 — 12 Reviews</span>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">{product.description}</p>

            {/* Price */}
            {product.price && (
              <div className="mb-8 p-6 bg-secondary/50 rounded-xl border border-border/50">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Starting from</span>
                <div className="text-4xl font-bold text-primary mt-1">
                  ${(product.price / 100).toLocaleString()}
                </div>
                <span className="text-xs text-muted-foreground mt-1 block">Custom pricing available for bulk orders</span>
              </div>
            )}

            {/* Quantity and Actions */}
            <div ref={ctaRef} className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">Quantity:</span>
                <div className="flex items-center gap-0 border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors text-lg"
                  >−</button>
                  <span className="w-12 h-10 flex items-center justify-center font-semibold border-x border-border">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors text-lg"
                  >+</button>
                </div>
              </div>

              <div className="flex gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6 text-base rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      <ShoppingBag className="w-5 h-5 mr-2" /> Add to Quote
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-2xl">
                    <DialogHeader>
                      <DialogTitle className="font-display text-2xl">Request a Quote</DialogTitle>
                      <DialogDescription>
                        Add {product.name} (×{quantity}) to your quote request.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl mt-2">
                      <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {quantity}</p>
                      </div>
                    </div>
                    <Button onClick={handleAddToQuote} className="w-full mt-4 py-6 rounded-xl font-semibold">
                      Confirm & Add to Quote
                    </Button>
                  </DialogContent>
                </Dialog>

                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="py-6 rounded-xl border-primary/30 hover:bg-primary/10 hover:border-primary"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: "Free Shipping" },
                { icon: Shield, label: "5-Year Warranty" },
                { icon: RefreshCw, label: "Easy Returns" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                  <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Specifications Section */}
        {specs && Object.keys(specs).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h2 className="font-display font-bold text-3xl mb-8">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(specs).map(([key, value], idx) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border/30"
                >
                  <span className="text-sm text-muted-foreground font-medium">{key}</span>
                  <span className="text-sm font-semibold text-foreground">{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="font-display font-bold text-3xl mb-8">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "Ergonomic design for all-day comfort",
              "Premium materials with lasting durability",
              "Fully customizable to your specifications",
              "Professional installation included",
              "Eco-friendly and sustainable manufacturing",
              "Backed by our 5-year quality guarantee",
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-xl hover:bg-secondary/30 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sticky Bottom CTA */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border/50 shadow-2xl"
          >
            <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0 hidden sm:block" />
                <div className="min-w-0">
                  <h4 className="font-semibold text-sm truncate">{product.name}</h4>
                  {product.price && (
                    <p className="text-primary font-bold text-lg leading-tight">${(product.price / 100).toLocaleString()}</p>
                  )}
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-xl px-8 py-5 font-semibold shadow-lg flex-shrink-0">
                    <ShoppingBag className="w-4 h-4 mr-2" /> Add to Quote
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="font-display text-2xl">Request a Quote</DialogTitle>
                    <DialogDescription>Add {product.name} (×{quantity}) to your quote request.</DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl mt-2">
                    <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {quantity}</p>
                    </div>
                  </div>
                  <Button onClick={handleAddToQuote} className="w-full mt-4 py-6 rounded-xl font-semibold">
                    Confirm & Add to Quote
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
