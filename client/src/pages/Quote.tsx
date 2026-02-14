import { useQuote } from "@/context/QuoteContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Send, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useCreateQuote } from "@/hooks/use-products";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const inquirySchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    company: z.string().optional(),
    message: z.string().optional(),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

export default function Quote() {
    const { items, removeFromQuote, updateQuantity, clearQuote, itemCount } = useQuote();
    const { toast } = useToast();
    const { mutate: submitQuote, isPending } = useCreateQuote();

    const form = useForm<InquiryFormValues>({
        resolver: zodResolver(inquirySchema),
        defaultValues: {
            name: "",
            email: "",
            company: "",
            message: "",
        },
    });

    const onSubmit = (data: InquiryFormValues) => {
        if (items.length === 0) {
            toast({ title: "Empty Quote", description: "Please add items to your quote first.", variant: "destructive" });
            return;
        }

        // Prepare payload. 
        // Since the backend 'api/quotes' expects just items and assumes logged-in user, 
        // AND we want to support guests tailored to this specific user request ("show on quote page"),
        // we might need to adjust the backend or just send the data as is if we have auth.
        // 
        // However, for a public "Request Quote" form, we usually send contact details too.
        // The current `useCreateQuote` mutation sends `items` array.
        // The backend `server/routes.ts` checks `req.isAuthenticated()`.
        // 
        // If the user IS NOT logged in, the current backend will reject it (401).
        // Reviewing implementation plan: we didn't explicitly say we'd fix the backend auth requirement.
        // But for a generic website "Get a Quote", widely usually doesn't require login.
        // 
        // Let's try to send it. If it fails due to 401, we might need to hit the Inquiry endpoint instead 
        // or modify the backend to accept guest quotes.
        // 
        // Actually, `api/inquiries` is a better fit for guest quotes, but `api/quotes` is structural.
        // Let's assume for now we might be hitting `api/inquiries` if we aren't using the auth flow, 
        // OR we just use the existing `api/quotes` and if it fails, prompts login.
        // 
        // Given the user flow "add to quote -> quote page", it feels like a "Cart".
        // Let's implement the UI. The submit logic will use `useCreateQuote` which connects to `api/quotes`.
        // If that requires Auth, we should probably redirect to Auth or handle it.
        //
        // Wait, the schema for `createQuote` in `use-products` only takes `items`. 
        // It doesn't take contact info.
        //
        // I'll implement the UI. If the user submits, I'll try to call `createQuote`. 
        // If it requires auth, I'll use the Contact Info form to create an "Inquiry" instead, 
        // which includes the item details in the message body. This is a common pattern for guest quotes.

        // Construct a message with item details
        const itemsList = items.map(i => `- ${i.product.name} (Qty: ${i.quantity})`).join("\n");
        const fullMessage = `Quote Request:\n\n${itemsList}\n\nAdditional Notes:\n${data.message || "None"}`;

        // Ideally we'd hit an endpoint that accepts both items and user details.
        // For now, let's use the Inquiry endpoint which is open to public.
        // We'll need `useCreateInquiry` hook.

        // Let's dynamically import or usage `fetch` to `api/inquiries` if we don't have the hook ready-exported 
        // or just assume we should use the existing infrastructure.

        // Let's use stringified items in the message for now to ensure it works without backend changes 
        // (unless we want to change backend too, but keeping it simple first).

        fetch("/api/inquiries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                company: data.company,
                message: fullMessage,
                type: "solution_request" // or general
            })
        })
            .then(res => {
                if (res.ok) {
                    toast({ title: "Quote Request Sent", description: "We'll get back to you shortly." });
                    clearQuote();
                    form.reset();
                } else {
                    throw new Error("Failed");
                }
            })
            .catch(() => {
                toast({ title: "Error", description: "Failed to send request.", variant: "destructive" });
            });
    };

    return (
        <div className="min-h-screen bg-background pb-24 pt-10">
            <div className="container mx-auto px-4">
                <h1 className="font-display font-bold text-4xl mb-2">Your Quote Request</h1>
                <p className="text-muted-foreground mb-10">Review your selected items and submit your request.</p>

                {items.length === 0 ? (
                    <div className="text-center py-20 bg-secondary/20 rounded-2xl">
                        <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <h2 className="text-xl font-semibold mb-2">Your quote list is empty</h2>
                        <p className="text-muted-foreground mb-6">Browse our collections to find products you like.</p>
                        <Link href="/products">
                            <Button size="lg" className="rounded-xl">Browse Collections</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <motion.div
                                    layout
                                    key={item.product.id}
                                    className="flex gap-4 p-4 bg-secondary/30 rounded-xl border border-border/50 items-center"
                                >
                                    <img
                                        src={item.product.imageUrl}
                                        alt={item.product.name}
                                        className="w-24 h-24 object-cover rounded-lg bg-secondary"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-lg truncate">{item.product.name}</h3>
                                        <p className="text-muted-foreground text-sm mb-2">{item.product.material || "Standard Finish"}</p>
                                        <div className="text-primary font-bold">
                                            {item.product.price ? `$${(item.product.price / 100).toLocaleString()}` : "Price upon request"}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-3">
                                        <div className="flex items-center gap-0 border border-border rounded-lg overflow-hidden bg-background">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors"
                                            >−</button>
                                            <span className="w-8 h-8 flex items-center justify-center text-sm font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors"
                                            >+</button>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeFromQuote(item.product.id)}
                                            className="text-muted-foreground hover:text-destructive h-auto p-0"
                                        >
                                            <Trash2 className="w-4 h-4 mr-1.5" /> Remove
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Submission Form */}
                        <div className="lg:col-span-1">
                            <div className="bg-secondary/20 p-6 rounded-2xl sticky top-24">
                                <h3 className="font-display font-bold text-xl mb-4">Contact Information</h3>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="John Doe" {...field} className="bg-background" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="john@company.com" {...field} className="bg-background" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="company"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Company (Optional)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Acme Inc." {...field} className="bg-background" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Additional Notes</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Any specific requirements..." {...field} className="bg-background resize-none min-h-[100px]" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="pt-2">
                                            <div className="flex justify-between text-sm mb-4">
                                                <span className="text-muted-foreground">Total Items:</span>
                                                <span className="font-semibold">{itemCount}</span>
                                            </div>
                                            <Button type="submit" className="w-full py-6 text-lg font-semibold rounded-xl shadow-lg" disabled={form.formState.isSubmitting}>
                                                {form.formState.isSubmitting ? "Sending..." : (
                                                    <>Submit Quote Request <Send className="w-4 h-4 ml-2" /></>
                                                )}
                                            </Button>
                                            <p className="text-xs text-muted-foreground text-center mt-3">
                                                We'll review your request and send a detailed proposal within 24 hours.
                                            </p>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
