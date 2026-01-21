import { Product } from "@shared/schema";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <motion.div 
        whileHover={{ y: -5 }}
        className="group cursor-pointer"
      >
        <div className="aspect-[4/3] overflow-hidden rounded-md bg-secondary mb-4 relative">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            {product.price && (
              <span className="font-medium text-muted-foreground">
                ${(product.price / 100).toLocaleString()}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
          
          <div className="pt-2 flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            View Details <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
