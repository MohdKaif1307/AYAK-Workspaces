import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export interface QuoteItem {
    product: Product;
    quantity: number;
}

interface QuoteContextType {
    items: QuoteItem[];
    addToQuote: (product: Product, quantity: number) => void;
    removeFromQuote: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearQuote: () => void;
    itemCount: number;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<QuoteItem[]>([]);
    const { toast } = useToast();

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem("ayak_quote_cart");
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse quote cart", e);
            }
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem("ayak_quote_cart", JSON.stringify(items));
    }, [items]);

    const addToQuote = (product: Product, quantity: number) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { product, quantity }];
        });
        toast({
            title: "Added to Quote",
            description: `${quantity}x ${product.name} added to your quote list.`,
        });
    };

    const removeFromQuote = (productId: number) => {
        setItems((prev) => prev.filter((item) => item.product.id !== productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity < 1) return;
        setItems((prev) =>
            prev.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearQuote = () => {
        setItems([]);
    };

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <QuoteContext.Provider
            value={{ items, addToQuote, removeFromQuote, updateQuantity, clearQuote, itemCount }}
        >
            {children}
        </QuoteContext.Provider>
    );
}

export function useQuote() {
    const context = useContext(QuoteContext);
    if (context === undefined) {
        throw new Error("useQuote must be used within a QuoteProvider");
    }
    return context;
}
