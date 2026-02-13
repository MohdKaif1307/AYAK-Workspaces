import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Compass, Hammer, Settings, Lightbulb, ArrowRight,
  CheckCircle2, ClipboardList, Palette, Wrench, HeadphonesIcon
} from "lucide-react";

export default function Services() {
  const services = [
    { icon: Compass, title: "Space Planning", desc: "Strategic layout design that maximizes efficiency and flow, tailored to your team's unique dynamics.", features: ["Floor plan optimization", "Traffic flow analysis", "Zone allocation", "Growth forecasting"] },
    { icon: Hammer, title: "Custom Installation", desc: "Expert, white-glove furniture installation ensuring every piece is perfectly positioned and secured.", features: ["Certified installation teams", "Minimal disruption", "Post-install cleanup", "Configuration verification"] },
    { icon: Settings, title: "Design Consultation", desc: "One-on-one collaboration with our award-winning designers to bring your vision to life.", features: ["Brand-aligned design", "Material selection", "3D visualization", "Budget planning"] },
    { icon: Lightbulb, title: "Innovation Lab", desc: "Stay ahead of the curve with cutting-edge workspace tech and furniture innovations.", features: ["Standing desk integration", "Smart lighting", "Cable management", "Acoustic solutions"] },
  ];

  const process = [
    { step: "01", title: "Discovery", desc: "We immerse ourselves in understanding your needs, brand, and team culture." },
    { step: "02", title: "Design", desc: "Our creative team develops tailored concepts with 3D visualizations." },
    { step: "03", title: "Deliver", desc: "Professional installation and setup, on time and within budget." },
    { step: "04", title: "Support", desc: "Ongoing maintenance, adjustments, and long-term partnership." },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[450px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero-services.jpeg" alt="Services" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <span className="text-primary font-semibold tracking-widest text-xs uppercase mb-3 block">What We Offer</span>
            <h1 className="font-display font-bold text-5xl md:text-6xl leading-tight mb-4">Comprehensive Workspace Services</h1>
            <p className="text-lg text-white/70 max-w-xl font-light">End-to-end solutions from concept to completion, designed for lasting impact.</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Services Grid */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-widest text-xs uppercase">Our Expertise</span>
            <h2 className="font-display font-bold text-4xl mt-2 mb-4">Core Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Every service is built on decades of expertise and a deep commitment to quality.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="premium-card p-8 group"
              >
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl mb-2">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                  </div>
                </div>
                <ul className="grid grid-cols-2 gap-3">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-28 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-widest text-xs uppercase">How We Work</span>
            <h2 className="font-display font-bold text-4xl mt-2">Our Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-border" />

            {process.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="text-center relative"
              >
                <div className="w-20 h-20 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center mx-auto mb-5 relative z-10">
                  <span className="text-2xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="font-display font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-primary font-semibold tracking-widest text-xs uppercase">Why AYAK</span>
              <h2 className="font-display font-bold text-4xl mt-2 mb-6">Why Companies Choose Us</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                We don't just furnish offices — we transform them into environments that drive results.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Palette, text: "Award-winning design approach" },
                  { icon: Wrench, text: "Certified installation professionals" },
                  { icon: HeadphonesIcon, text: "Dedicated post-project support" },
                  { icon: ClipboardList, text: "Transparent timelines and budgets" },
                ].map((item, idx) => (
                  <motion.li key={idx} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img src="/images/services-team.jpg" alt="Our Team" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">Let's Build Something Remarkable</h2>
            <p className="text-xl opacity-80 mb-10 max-w-2xl mx-auto">Ready to transform your workspace? Let's discuss your project.</p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 font-bold px-10 py-6 text-lg rounded-lg shadow-xl">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
