import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle2, X, Zap, Shield, Palette, Leaf,
  Sparkles, Award, Settings, HeadphonesIcon
} from "lucide-react";

export default function Features() {
  const coreFeatures = [
    { icon: Zap, title: "Ergonomic Engineering", desc: "Backed by orthopedic research and tested for all-day comfort." },
    { icon: Shield, title: "5-Year Warranty", desc: "Comprehensive coverage that demonstrates our confidence in every product." },
    { icon: Palette, title: "Custom Finishes", desc: "Choose from 50+ materials and finishes to match your brand identity." },
    { icon: Leaf, title: "Sustainable Materials", desc: "FSC-certified wood, recycled metals, and eco-friendly fabrics." },
    { icon: Sparkles, title: "Smart Integration", desc: "Built-in cable management, wireless charging, and IoT-ready designs." },
    { icon: Settings, title: "Modular Design", desc: "Reconfigure and expand layouts as your team and needs evolve." },
  ];

  const categories = [
    { title: "Innovation", icon: Zap, items: ["Smart standing desks", "Integrated tech", "IoT-ready furniture", "Adaptive lighting"] },
    { title: "Aesthetics", icon: Palette, items: ["Custom finishes", "Designer collections", "Color matching", "Trend-forward styles"] },
    { title: "Sustainability", icon: Leaf, items: ["Recycled materials", "Carbon-neutral shipping", "Eco certifications", "Minimal waste process"] },
    { title: "Support", icon: HeadphonesIcon, items: ["24/7 helpline", "On-site maintenance", "Design updates", "Lifetime partnership"] },
  ];

  const comparison = [
    { feature: "Material Quality", standard: true, premium: true },
    { feature: "Custom Finishes", standard: false, premium: true },
    { feature: "Ergonomic Certification", standard: true, premium: true },
    { feature: "Smart Tech Integration", standard: false, premium: true },
    { feature: "Modular Reconfiguration", standard: false, premium: true },
    { feature: "5-Year Warranty", standard: true, premium: true },
    { feature: "White-Glove Installation", standard: false, premium: true },
    { feature: "Dedicated Design Consultant", standard: false, premium: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[450px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero-features.jpg" alt="Features" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <span className="text-primary font-semibold tracking-widest text-xs uppercase mb-3 block">Why We're Different</span>
            <h1 className="font-display font-bold text-5xl md:text-6xl leading-tight mb-4">Built for Excellence</h1>
            <p className="text-lg text-white/70 max-w-xl font-light">Every feature is designed with purpose. Every detail matters.</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Core Features Grid */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-widest text-xs uppercase">What Sets Us Apart</span>
            <h2 className="font-display font-bold text-4xl mt-2 mb-4">Core Product Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Quality, innovation, and sustainability built into every product.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="premium-card p-8 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-28 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-widest text-xs uppercase">Feature Categories</span>
            <h2 className="font-display font-bold text-4xl mt-2">Explore by Category</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="premium-card p-6 text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <cat.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-4">{cat.title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {cat.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-center gap-2 justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-widest text-xs uppercase">Collections</span>
            <h2 className="font-display font-bold text-4xl mt-2 mb-4">Standard vs. Premium</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Compare our collections to find the right fit for your needs.</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="premium-card overflow-hidden">
              <div className="grid grid-cols-3 bg-secondary/50 border-b border-border">
                <div className="p-5 font-semibold text-sm">Feature</div>
                <div className="p-5 text-center font-semibold text-sm">Standard</div>
                <div className="p-5 text-center font-semibold text-sm bg-primary/5 border-x border-primary/10">
                  <span className="text-primary">Premium</span>
                </div>
              </div>

              {comparison.map((row, idx) => (
                <div key={idx} className={`grid grid-cols-3 border-b border-border/50 ${idx % 2 === 0 ? 'bg-background' : 'bg-secondary/20'}`}>
                  <div className="p-5 text-sm font-medium">{row.feature}</div>
                  <div className="p-5 flex justify-center">
                    {row.standard ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground/30" />
                    )}
                  </div>
                  <div className="p-5 flex justify-center bg-primary/5 border-x border-primary/10">
                    {row.premium ? (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground/30" />
                    )}
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-3">
                <div className="p-5" />
                <div className="p-5 flex justify-center">
                  <Link href="/products">
                    <Button variant="outline" className="rounded-lg text-sm">View Standard</Button>
                  </Link>
                </div>
                <div className="p-5 flex justify-center bg-primary/5 border-x border-primary/10">
                  <Link href="/products">
                    <Button className="rounded-lg text-sm">View Premium</Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Award className="w-12 h-12 mx-auto mb-6 opacity-80" />
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">Experience the Premium Difference</h2>
            <p className="text-xl opacity-80 mb-10 max-w-2xl mx-auto">Discover why leading companies trust AYAK for their workspace needs.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 font-bold px-8 py-6 text-lg rounded-lg">
                  Explore Collections
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg">
                  Get a Quote <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
