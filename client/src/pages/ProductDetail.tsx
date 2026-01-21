import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useProduct, useCreateQuote } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowLeft, Check, ShoppingBag, Truck, ShieldCheck, Heart, Share2, Star, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";

export default function ProductDetail() {
  const [, params] = useRoute("/products/:id");
  const id = parseInt(params?.id || "0");
  const { data: product, isLoading } = useProduct(id);
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [customNotes, setCustomNotes] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const createQuote = useCreateQuote();

  const handleAddToQuote = () => {
    createQuote.mutate({
      items: [{
        productId: id,
        quantity,
        customizationNotes: customNotes
      }]
    }, {
      onSuccess: () => {
        setIsDialogOpen(false);
        toast({
          title: "Added to Quote",
          description: "This item has been added to your quote request.",
        });
        setCustomNotes("");
        setQuantity(1);
      },
      onError: (err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive"
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link href="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="container mx-auto px-4 py-8">
        <Link href="/products" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          {/* Images */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div className="aspect-[4/3] bg-secondary rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            {/* Gallery thumbnails would go here if available */}
          </motion.div>

          {/* Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-sm font-medium text-primary uppercase tracking-wider mb-2 block">Premium Collection</span>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(47 reviews)</span>
            </div>

            {product.price && (
              <div className="text-3xl font-bold mb-6 text-foreground">
                ${(product.price / 100).toLocaleString()}
                <span className="text-lg text-muted-foreground font-normal ml-2">per unit</span>
              </div>
            )}

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Key Specifications */}
            <div className="mb-8 pb-8 border-b border-border">
              <h3 className="font-semibold text-lg mb-4">Key Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.material && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Material</p>
                      <p className="text-sm font-semibold">{product.material}</p>
                    </div>
                  </div>
                )}
                {product.seatingCapacity && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Capacity</p>
                      <p className="text-sm font-semibold">{product.seatingCapacity} people</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Warranty</p>
                    <p className="text-sm font-semibold">5 years</p>
                  </div>
                </div>
                {product.isCustomizable && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Customization</p>
                      <p className="text-sm font-semibold">Fully Available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-8 pb-8 border-b border-border space-y-4">
              <h3 className="font-semibold text-lg">Why Choose This Product</h3>
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Professional delivery & installation available</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
                <span>5-year commercial warranty included</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Award className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Award-winning design & craftsmanship</span>
              </div>
            </div>

            {/* Action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-semibold">
                    Add to Quote Request
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add to Quote Request</DialogTitle>
                    <DialogDescription>
                      Configure your request for {product.name}.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Quantity</label>
                      <input 
                        type="number" 
                        min="1" 
                        value={quantity} 
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="w-full border rounded-md px-3 py-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Customization Notes (Optional)</label>
                      <Textarea 
                        placeholder="Specify color preference, material changes, dimensions, or any special requirements..."
                        value={customNotes}
                        onChange={(e) => setCustomNotes(e.target.value)}
                        className="min-h-[120px]"
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddToQuote} disabled={createQuote.isPending}>
                      {createQuote.isPending ? "Adding..." : "Confirm & Add"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="py-6 text-lg"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? 'fill-primary text-primary' : ''}`} />
                {isWishlisted ? 'Saved' : 'Save'}
              </Button>
            </div>

            <Link href="/contact" className="block mt-4">
              <Button size="lg" variant="outline" className="w-full py-6 text-lg">
                Contact Sales Team
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Customer Reviews Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 py-12 border-t border-border"
        >
          <h2 className="font-display font-bold text-3xl mb-8">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Rebecca Mitchell",
                role: "Office Manager",
                rating: 5,
                text: "Exceptional quality and design. Our team loves the new furniture!"
              },
              {
                name: "David Chen",
                role: "Facilities Director",
                rating: 5,
                text: "Professional installation and outstanding after-sales support."
              }
            ].map((review, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-secondary/50 p-6 rounded-lg border border-border"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{review.text}"</p>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
