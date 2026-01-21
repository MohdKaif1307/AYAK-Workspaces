import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Grid3X3, TrendingUp, Shield, Zap, Users, Leaf } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Grid3X3,
      title: "Modular Design",
      description: "Flexible, scalable configurations that adapt to your changing workspace needs.",
    },
    {
      icon: TrendingUp,
      title: "Performance Optimized",
      description: "Furniture engineered for durability, comfort, and long-term value.",
    },
    {
      icon: Shield,
      title: "Premium Quality",
      description: "Only the finest materials and craftsmanship in every piece.",
    },
    {
      icon: Zap,
      title: "Smart Integration",
      description: "Seamless integration with modern technology and power solutions.",
    },
    {
      icon: Users,
      title: "Ergonomic Design",
      description: "Scientifically designed for comfort, health, and productivity.",
    },
    {
      icon: Leaf,
      title: "Sustainable Materials",
      description: "Eco-friendly options without compromising on style or quality.",
    }
  ];

  const highlights = [
    {
      category: "Innovation",
      items: ["Active Workspaces", "Height Adjustable Desks", "Sound Management", "Air Quality Systems"]
    },
    {
      category: "Aesthetics",
      items: ["Modern Minimalist", "Contemporary Design", "Color Customization", "Brand Integration"]
    },
    {
      category: "Sustainability",
      items: ["Recycled Materials", "Carbon Neutral", "Energy Efficient", "Circular Economy"]
    },
    {
      category: "Support",
      items: ["24/7 Assistance", "Warranty Coverage", "Maintenance Plans", "Upgrades Available"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[650px] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <img 
            src="/images/hero-features.jpg" 
            alt="Features Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="font-display font-bold text-5xl md:text-7xl leading-tight mb-6">
              Exceptional Features, Every Time
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
              Discover what sets AYAK furniture apart in innovation, design, and quality.
            </p>
            <Link href="/products">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-lg">
                Explore Collections <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl mb-4">Why Our Customers Love Us</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every piece of AYAK furniture combines aesthetic excellence with functional innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-gradient-to-br from-secondary/50 to-secondary/20 p-8 rounded-xl border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl mb-4">Feature Categories</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive benefits across every aspect of your workspace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-background p-8 rounded-xl border border-border/50 hover:border-primary/50 transition-all"
              >
                <h3 className="font-bold text-lg mb-4 text-primary">{highlight.category}</h3>
                <ul className="space-y-3">
                  {highlight.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl mb-4">Standard vs. Premium AYAK</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See why our premium collections are worth the investment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Standard */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-secondary/30 p-8 rounded-xl border border-border"
            >
              <h3 className="font-bold text-2xl mb-6">Standard Collection</h3>
              <ul className="space-y-3">
                {[
                  "Quality wood construction",
                  "Basic ergonomic support",
                  "Standard finishes",
                  "1 year warranty",
                  "Local delivery available",
                  "Assembly included"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-8" variant="outline">Learn More</Button>
            </motion.div>

            {/* Premium */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-xl border-2 border-primary/50 relative"
            >
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg text-xs font-bold">
                RECOMMENDED
              </div>
              <h3 className="font-bold text-2xl mb-6">Premium AYAK</h3>
              <ul className="space-y-3">
                {[
                  "Premium sustainably-sourced wood",
                  "Advanced ergonomic technology",
                  "Custom color & finish options",
                  "5 year comprehensive warranty",
                  "Free national delivery & setup",
                  "Professional installation + training",
                  "Maintenance & support included",
                  "Upgrade guarantee available"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
                Browse Premium Collection
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl mb-4">What Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "CEO, Tech Startup",
                quote: "The attention to detail in every piece is remarkable. Our team feels the difference every day.",
                rating: 5
              },
              {
                name: "Michael Rodriguez",
                role: "Facilities Manager",
                quote: "Best investment we've made in our workspace. Quality and durability exceeded expectations.",
                rating: 5
              },
              {
                name: "Jennifer Park",
                role: "Workplace Designer",
                quote: "AYAK's flexibility in customization combined with premium quality makes them my top choice.",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-background p-6 rounded-lg border border-border/50 hover:border-primary/50 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-primary/10 to-primary/5 border-y border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">Experience Premium Quality Today</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Discover why thousands of companies choose AYAK for their workspace needs.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/products">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-10 py-6 text-lg">
                  View Collections <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="font-bold px-10 py-6 text-lg">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
