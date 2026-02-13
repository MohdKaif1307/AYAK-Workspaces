import { motion } from "framer-motion";

interface MarqueeProps {
    items: { text: string; icon?: string }[];
    speed?: number;
    direction?: "left" | "right";
    className?: string;
}

export function Marquee({ items, speed = 30, direction = "left", className = "" }: MarqueeProps) {
    // Double the items for seamless loop
    const duplicated = [...items, ...items];

    return (
        <div className={`overflow-hidden relative ${className}`}>
            {/* Edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex items-center gap-12 whitespace-nowrap"
                animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: speed,
                        ease: "linear",
                    },
                }}
            >
                {duplicated.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-3 px-8 py-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-colors cursor-default select-none"
                    >
                        {item.icon && <span className="text-xl">{item.icon}</span>}
                        <span className="text-sm font-semibold text-muted-foreground tracking-wide">{item.text}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

// Pre-built trust marquee
export function TrustMarquee() {
    const brands = [
        { text: "Google", icon: "🏢" },
        { text: "Microsoft", icon: "💼" },
        { text: "Apple", icon: "🍎" },
        { text: "Amazon", icon: "📦" },
        { text: "Meta", icon: "🌐" },
        { text: "Spotify", icon: "🎵" },
        { text: "Netflix", icon: "🎬" },
        { text: "Airbnb", icon: "🏠" },
        { text: "Uber", icon: "🚗" },
        { text: "Stripe", icon: "💳" },
        { text: "Slack", icon: "💬" },
        { text: "Figma", icon: "🎨" },
    ];

    return (
        <div className="py-16 bg-background">
            <div className="container mx-auto px-4 mb-8">
                <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                    Trusted by industry leaders worldwide
                </p>
            </div>
            <Marquee items={brands} speed={40} />
        </div>
    );
}
