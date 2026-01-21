import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Award, Users, Zap } from "lucide-react";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[650px] flex items-center bg-black overflow-hidden">
        {/* Premium Background Image */}
        <div className="absolute inset-0 opacity-50">
          <img 
            src="/images/hero-home.webp" 
            alt="Modern Office Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="font-display font-bold text-5xl md:text-7xl leading-tight mb-6">
              Creating smart, stylish, and productive office environments.
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-xl font-light">
              Premium custom furniture solutions tailored for modern businesses and innovative workspaces.
            </p>
            <div className="flex gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-white text-black hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-none">
                  Explore Collections
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-none">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display font-bold text-4xl mb-6 text-foreground">
                We design spaces that work as hard as you do.
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                At AYAK, we believe that the environment shapes the experience. Our furniture isn't just about aesthetics; it's about ergonomic precision, sustainable materials, and layouts that foster collaboration.
              </p>
              <ul className="space-y-4 mb-8">
                {['Ergonomic Excellence', 'Sustainable Materials', 'Custom Configurations'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/about">
                <Button variant="link" className="text-primary p-0 h-auto font-semibold text-lg hover:no-underline hover:text-primary/80">
                  More about us <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-secondary rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop" 
                  alt="Modern Workspace Design" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary font-semibold tracking-wider text-sm uppercase">Curated Selection</span>
              <h2 className="font-display font-bold text-3xl mt-2">Featured Categories</h2>
            </div>
            <Link href="/products">
              <Button variant="outline" className="hidden md:flex">View All</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Executive Desks", img: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=2070&auto=format&fit=crop", link: "/products?category=desks" },
              { title: "Ergonomic Seating", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop", link: "/products?category=chairs" },
              { title: "Collaborative Spaces", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop", link: "/products?category=collaborative" }
            ].map((cat, idx) => (
              <Link key={idx} href={cat.link}>
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer relative aspect-[3/4] overflow-hidden rounded-lg"
                >
                  <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                    <h3 className="text-white font-display font-bold text-2xl">{cat.title}</h3>
                    <div className="h-0 group-hover:h-8 transition-all overflow-hidden">
                       <span className="text-white/80 text-sm mt-2 block">Explore Collection &rarr;</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {/* Texture or pattern here */}
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">Ready to transform your workspace?</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Get a customized quote for your office project today. Our design team is ready to help you plan the perfect layout.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 font-bold px-10 py-6 text-lg rounded-none">
              Start Your Project
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-wider text-sm uppercase">Why AYAK</span>
            <h2 className="font-display font-bold text-4xl mt-2 mb-4">Experience the Difference</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We combine sophisticated design with practical functionality to create workspaces that inspire productivity and elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-secondary/50 rounded-lg border border-border/50 hover:border-primary/50 transition-all"
            >
              <Award className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-display font-bold text-xl mb-3">Award-Winning Design</h3>
              <p className="text-muted-foreground">
                Our collections have been recognized by leading design institutions for innovation and aesthetic excellence.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-secondary/50 rounded-lg border border-border/50 hover:border-primary/50 transition-all"
            >
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-display font-bold text-xl mb-3">Expert Consultants</h3>
              <p className="text-muted-foreground">
                Our design team works closely with you to understand your vision and deliver tailored solutions that exceed expectations.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-secondary/50 rounded-lg border border-border/50 hover:border-primary/50 transition-all"
            >
              <Zap className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-display font-bold text-xl mb-3">Premium Quality</h3>
              <p className="text-muted-foreground">
                Every piece is crafted with meticulous attention to detail, using sustainable materials and proven manufacturing techniques.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-wider text-sm uppercase">Client Success</span>
            <h2 className="font-display font-bold text-4xl mt-2">Trusted by Leading Companies</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Mitchell",
                role: "CEO, TechStart Innovation",
                quote: "AYAK transformed our office into a space that truly reflects our brand. The attention to detail is exceptional.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
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
                className="bg-background p-8 rounded-lg border border-border shadow-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
