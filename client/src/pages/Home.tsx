import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, Award, Users, Zap, Sparkles } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { TrustMarquee } from "@/components/Marquee";
import { AnimatedHeading } from "@/components/AnimatedText";

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
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax: image moves slower, content moves faster
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-[90vh] min-h-[700px] flex items-center bg-foreground overflow-hidden">
        {/* Parallax Background Image */}
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <img
            src="/images/hero-home.webp"
            alt="Modern Office Background"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-float pointer-events-none" style={{ animationDelay: "3s" }} />

        {/* Content with parallax */}
        <motion.div
          className="container mx-auto px-4 relative z-10 text-white"
          style={{ y: heroContentY, opacity: heroOpacity }}
        >
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block text-primary font-semibold tracking-widest text-sm uppercase mb-4 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full"
            >
              <Sparkles className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
              Premium Workspace Design
            </motion.span>

            {/* Animated Text Reveal */}
            <h1 className="font-display font-bold text-5xl md:text-7xl leading-[1.1] mb-6 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text">
              <AnimatedHeading text="Creating smart, stylish, and productive office environments." delay={0.4} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="text-lg md:text-xl text-white/70 mb-10 max-w-xl font-light leading-relaxed"
            >
              Premium custom furniture solutions tailored for modern businesses and innovative workspaces.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/products">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-6 text-base rounded-lg shadow-lg hover:shadow-xl transition-all">
                  Explore Collections <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-base rounded-lg">
                  Get a Quote
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Trust Marquee */}
      <TrustMarquee />

      {/* Intro Section */}
      <section className="py-28 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-primary font-semibold tracking-widest text-xs uppercase">About AYAK</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 mt-2 text-foreground leading-tight">
                We design spaces that work as hard as you do.
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                At AYAK, we believe that the environment shapes the experience. Our furniture isn't just about aesthetics; it's about ergonomic precision, sustainable materials, and layouts that foster collaboration.
              </p>
              <ul className="space-y-4 mb-8">
                {['Ergonomic Excellence', 'Sustainable Materials', 'Custom Configurations'].map((item, idx) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 text-foreground font-medium"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
              <Link href="/about">
                <Button variant="ghost" className="text-primary p-0 h-auto font-semibold text-base hover:text-primary/80 group">
                  More about us <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-secondary rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/featured-section.png"
                  alt="Modern Workspace Design"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary/5 rounded-full -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-28 bg-secondary/20 relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-14">
            <div>
              <span className="text-primary font-semibold tracking-widest text-xs uppercase">Curated Selection</span>
              <h2 className="font-display font-bold text-4xl mt-2">Featured Categories</h2>
            </div>
            <Link href="/products">
              <Button variant="outline" className="hidden md:flex rounded-lg">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Executive Desks", img: "/images/category-desks.jpg", link: "/products?category=desks" },
              { title: "Ergonomic Seating", img: "/images/category-chairs.jpg", link: "/products?category=chairs" },
              { title: "Collaborative Spaces", img: "/images/category-collaborative.jpg", link: "/products?category=collaborative" }
            ].map((cat, idx) => (
              <Link key={idx} href={cat.link}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg"
                >
                  <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-white font-display font-bold text-2xl mb-2">{cat.title}</h3>
                    <div className="flex items-center gap-2 text-white/70 text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Explore Collection <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 15, suffix: "+", label: "Years Experience" },
              { value: 5000, suffix: "+", label: "Projects Delivered" },
              { value: 1000, suffix: "+", label: "Happy Clients" },
              { value: 98, suffix: "%", label: "Client Satisfaction" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground font-medium text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-4xl md:text-6xl mb-6">Ready to transform your workspace?</h2>
            <p className="text-xl opacity-80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Get a customized quote for your office project today. Our design team is ready to help.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 font-bold px-10 py-6 text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all">
                Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-widest text-xs uppercase">Why AYAK</span>
            <h2 className="font-display font-bold text-4xl mt-2 mb-4">Experience the Difference</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We combine sophisticated design with practical functionality to create workspaces that inspire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: "Award-Winning Design", desc: "Recognized by leading design institutions for innovation and aesthetic excellence." },
              { icon: Users, title: "Expert Consultants", desc: "Our design team works closely with you to deliver tailored solutions that exceed expectations." },
              { icon: Zap, title: "Premium Quality", desc: "Crafted with meticulous attention to detail using sustainable materials and proven techniques." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="premium-card p-8 text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-28 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-widest text-xs uppercase">Client Success</span>
            <h2 className="font-display font-bold text-4xl mt-2">Trusted by Leading Companies</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Mitchell",
                role: "CEO, TechStart Innovation",
                quote: "AYAK transformed our office into a space that truly reflects our brand. The attention to detail is exceptional.",
                image: "/images/testimonial-1.jpg"
              },
              {
                name: "James Cooper",
                role: "Operations Director, Global Finance",
                quote: "Professional, creative, and deeply attentive to our needs. The project was completed on time and within budget.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
              },
              {
                name: "Emma Rodriguez",
                role: "HR Manager, Enterprise Solutions",
                quote: "Our team loved the new workspace. Employee satisfaction increased significantly after the redesign.",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="premium-card p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20" />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic leading-relaxed">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
