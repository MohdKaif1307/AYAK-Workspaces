import { Product } from "@shared/schema";
import { Link } from "wouter";
import { ArrowRight, Star, Badge } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isNew = Math.random() > 0.7; // Random "New" badge for demo
  const rating = Math.floor(Math.random() * 2) + 4; // Random rating 4-5 for demo
  
  return (
    <Link href={`/products/${product.id}`}>
      <motion.div 
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="group cursor-pointer h-full"
      >
        <div className="bg-background border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col hover:border-primary/50">
          {/* Image Container */}
          <div className="aspect-[4/3] overflow-hidden bg-secondary relative flex-shrink-0">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            
            {/* Overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Badges */}
            <div className="absolute top-3 right-3 flex gap-2">
              {isNew && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  New
                </motion.span>
              )}
            </div>
            
            {/* Material Badge */}
            {product.material && (
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 text-foreground px-2.5 py-1 rounded-full text-xs font-semibold">
                  {product.material}
                </span>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-5 flex flex-col flex-grow">
            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3.5 h-3.5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground font-medium">({rating})</span>
            </div>
            
            {/* Title and Price */}
            <div className="space-y-2 mb-3 flex-grow">
              <h3 className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {product.name}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            </div>
            
            {/* Price and CTA */}
            <div className="flex justify-between items-end gap-2 pt-3 border-t border-border/50">
              {product.price && (
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Starting at</span>
                  <span className="font-bold text-lg text-primary">
                    ${(product.price / 100).toLocaleString()}
                  </span>
                </div>
              )}
              
              <motion.div 
                className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
