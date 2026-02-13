import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2, Building2, Rocket, Users2 } from "lucide-react";
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

export default function Solutions() {
  const solutions = [
    {
      icon: Building2, title: "Corporate Offices", desc: "Transform your corporate headquarters into a space that reflects your brand and empowers your teams.",
      image: "/images/solutions-corporate.png",
      features: ["Executive suites", "Conference rooms", "Open-plan layouts", "Reception areas", "Break rooms"],
      stats: [{ value: 500, suffix: "+", label: "Corporate projects" }],
    },
    {
      icon: Rocket, title: "Startups & Tech", desc: "Agile, flexible workspaces designed for fast-moving teams that need to adapt quickly.",
      image: "/images/solutions-startup.jpg",
      features: ["Hot desking", "Collaboration pods", "Standing desks", "Lounge areas", "Gaming corners"],
      stats: [{ value: 200, suffix: "+", label: "Startup spaces" }],
    },
    {
      icon: Users2, title: "Co-working Spaces", desc: "Multi-tenant environments that balance community with privacy and productivity.",
      image: "/images/solutions-coworking.jpg",
      features: ["Shared workstations", "Private offices", "Meeting rooms", "Phone booths", "Event spaces"],
      stats: [{ value: 100, suffix: "+", label: "Co-working hubs" }],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[450px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero-solutions.jpeg" alt="Solutions" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <span className="text-primary font-semibold tracking-widest text-xs uppercase mb-3 block">Industry Solutions</span>
            <h1 className="font-display font-bold text-5xl md:text-6xl leading-tight mb-4">Tailored for Your Industry</h1>
            <p className="text-lg text-white/70 max-w-xl font-light">Purpose-built workspace solutions that align with your industry's unique demands.</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Solutions */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4 space-y-24">
          {solutions.map((solution, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${idx % 2 !== 0 ? 'lg:direction-rtl' : ''}`}
            >
              <div className={`space-y-6 ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <solution.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-display font-bold text-3xl">{solution.title}</h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">{solution.desc}</p>

                <div className="grid grid-cols-2 gap-3">
                  {solution.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-foreground font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4">
                  {solution.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <div className="text-2xl font-bold text-primary">
                        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                      </div>
                      <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                    </div>
                  ))}
                  <Link href="/contact">
                    <Button className="rounded-lg px-6">
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className={idx % 2 !== 0 ? 'lg:order-1' : ''}>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl relative group">
                  <img src={solution.image} alt={solution.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl mb-4">Proven Results</h2>
            <p className="text-lg opacity-80">The numbers speak for themselves.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 800, suffix: "+", label: "Solutions Delivered" },
              { value: 95, suffix: "%", label: "On-Time Completion" },
              { value: 40, suffix: "%", label: "Avg. Efficiency Gain" },
              { value: 4.9, suffix: "/5", label: "Client Rating" },
            ].map((stat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.value % 1 !== 0 ? stat.value + stat.suffix : <AnimatedCounter target={stat.value} suffix={stat.suffix} />}
                </div>
                <p className="text-sm opacity-80 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display font-bold text-4xl mb-6">Find Your Perfect Solution</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">Let's discuss how we can tailor our solutions to your specific needs.</p>
            <Link href="/contact">
              <Button size="lg" className="px-10 py-6 text-base rounded-lg font-semibold">Schedule a Consultation <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
