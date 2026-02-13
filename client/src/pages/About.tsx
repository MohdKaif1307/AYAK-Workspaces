import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import {
  Award, Users, Heart, Target, Shield, Lightbulb,
  ArrowRight, Building2, Globe, Leaf
} from "lucide-react";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function About() {
  const values = [
    { icon: Heart, title: "Passion", desc: "Every piece is designed with love for craftsmanship and an obsession with quality." },
    { icon: Target, title: "Innovation", desc: "We push boundaries with cutting-edge design and sustainable manufacturing." },
    { icon: Users, title: "Collaboration", desc: "We work as an extension of your team, deeply understanding your unique needs." },
    { icon: Shield, title: "Integrity", desc: "Transparent pricing, honest timelines, and commitments we always keep." },
    { icon: Lightbulb, title: "Creativity", desc: "Unique solutions that transform ordinary spaces into inspiring environments." },
    { icon: Leaf, title: "Sustainability", desc: "Responsibly sourced materials and eco-conscious processes at every step." },
  ];

  const team = [
    { name: "Alexandra Chen", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop" },
    { name: "Marcus Rivera", role: "Head of Design", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" },
    { name: "Sarah Kim", role: "Operations Director", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop" },
    { name: "David Thompson", role: "Head of Engineering", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero-about.jpg" alt="About AYAK" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <span className="text-primary font-semibold tracking-widest text-xs uppercase mb-3 block">Our Story</span>
            <h1 className="font-display font-bold text-5xl md:text-7xl leading-tight mb-4">
              Designing the Future of Work
            </h1>
            <p className="text-lg text-white/70 max-w-xl font-light">
              Since 2009, we've been transforming workspaces into inspiring environments that drive success.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Story */}
      <section className="py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-primary font-semibold tracking-widest text-xs uppercase">Our Journey</span>
              <h2 className="font-display font-bold text-4xl mt-2 mb-6 leading-tight">
                From a Vision to an Industry Leader
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  AYAK was founded with a simple belief: the spaces where people work should inspire their best thinking. What started as a small design studio has grown into a leading workspace solutions company serving businesses across the globe.
                </p>
                <p>
                  Today, we combine timeless craftsmanship with modern innovation, creating furniture that's as functional as it is beautiful. Every piece we create tells a story of quality, sustainability, and thoughtful design.
                </p>
              </div>
              <Link href="/contact" className="inline-block mt-8">
                <Button className="rounded-lg px-8 py-6">
                  Work With Us <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img src="/images/about-team.jpg" alt="AYAK Team" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 15, suffix: "+", label: "Years Experience", icon: Award },
              { value: 5000, suffix: "+", label: "Projects Completed", icon: Building2 },
              { value: 30, suffix: "+", label: "Countries Served", icon: Globe },
              { value: 98, suffix: "%", label: "Client Satisfaction", icon: Heart },
            ].map((stat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-3 opacity-80" />
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm opacity-80 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-widest text-xs uppercase">What Drives Us</span>
            <h2 className="font-display font-bold text-4xl mt-2">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="premium-card p-8 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-28 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-widest text-xs uppercase">Meet the Experts</span>
            <h2 className="font-display font-bold text-4xl mt-2">Leadership Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="group">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-5 shadow-lg relative">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display font-bold text-4xl mb-6">Ready to Get Started?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">Let our team help you design the perfect workspace for your business.</p>
            <Link href="/contact"><Button size="lg" className="px-10 py-6 text-base rounded-lg font-semibold">Start a Conversation <ArrowRight className="ml-2 w-5 h-5" /></Button></Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
