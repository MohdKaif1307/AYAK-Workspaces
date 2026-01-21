import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useProduct, useCreateQuote } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowLeft, Check, ShoppingBag, Truck, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-secondary rounded-lg overflow-hidden">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {/* Gallery thumbnails would go here if available */}
          </div>

          {/* Info */}
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider mb-2 block">
              Premium Collection
            </span>
            <h1 className="font-display font-bold text-4xl mb-4">{product.name}</h1>
            
            {product.price && (
              <div className="text-2xl font-medium mb-6">
                ${(product.price / 100).toLocaleString()}
                <span className="text-sm text-muted-foreground ml-2 font-normal">per unit</span>
              </div>
            )}

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {product.material && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">Material: <span className="text-muted-foreground">{product.material}</span></span>
                </div>
              )}
              {product.seatingCapacity && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">Capacity: <span className="text-muted-foreground">{product.seatingCapacity}</span></span>
                </div>
              )}
              {product.isCustomizable && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">Fully Customizable</span>
                </div>
              )}
            </div>

            <div className="border-t border-b border-border py-6 mb-8 space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Truck className="w-5 h-5 text-primary" />
                <span>Professional delivery & installation available</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>5-year commercial warranty</span>
              </div>
            </div>

            {/* Action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg">
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
                        placeholder="Specify color preference, material changes, or dimensions..."
                        value={customNotes}
                        onChange={(e) => setCustomNotes(e.target.value)}
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
              
              <Link href="/contact">
                <Button size="lg" variant="outline" className="flex-1 py-6 text-lg">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
