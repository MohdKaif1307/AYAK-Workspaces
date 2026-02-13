import { Product } from "@shared/schema";
import { Link } from "wouter";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isNew = Math.random() > 0.7;
  const rating = Math.floor(Math.random() * 2) + 4;
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setTilt({
      rotateX: (0.5 - y) * 12,
      rotateY: (x - 0.5) * 12,
    });
    setGlowPos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ perspective: 800, transformStyle: "preserve-3d" }}
        className="group cursor-pointer h-full"
      >
        <div className="premium-card h-full flex flex-col relative overflow-hidden">
          {/* Cursor glow effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
            style={{
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, hsl(32 45% 46% / 0.12) 0%, transparent 60%)`,
            }}
          />

          {/* Image Container */}
          <div className="aspect-[4/3] overflow-hidden bg-secondary relative flex-shrink-0">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Quick view */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <motion.span
                initial={{ y: 10 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/95 text-foreground px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg backdrop-blur-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
              >
                View Details
              </motion.span>
            </div>

            {/* Badges */}
            <div className="absolute top-3 right-3 flex gap-2">
              {isNew && (
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md">
                  New
                </span>
              )}
            </div>

            {/* Material Badge */}
            {product.material && (
              <div className="absolute top-3 left-3">
                <span className="glass px-3 py-1 rounded-full text-[11px] font-semibold text-foreground">
                  {product.material}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-grow relative">
            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-border fill-border'}`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-muted-foreground font-medium">({rating}.0)</span>
            </div>

            {/* Title and Description */}
            <div className="space-y-2 mb-4 flex-grow">
              <h3 className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
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
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Starting at</span>
                  <span className="font-bold text-lg text-primary leading-tight">
                    ${(product.price / 100).toLocaleString()}
                  </span>
                </div>
              )}

              <motion.div
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:shadow-md"
                whileHover={{ scale: 1.15 }}
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
