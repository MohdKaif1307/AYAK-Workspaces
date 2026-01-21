import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center bg-black overflow-hidden">
        {/* Abstract Background Image */}
        <div className="absolute inset-0 opacity-60">
          <img 
            src="https://cdn.dribbble.com/userupload/40180972/file/original-0b2fff4cebc03df48f5fa407493d1d71.png?format=webp&resize=1600x1200" 
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
                  src="https://www.studiofoxdesign.com/wp-content/uploads/2021/12/Cube-1024x492.jpg" 
                  alt="Minimalist Furniture" 
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
              { title: "Executive Desks", img: "https://www.ecomva.com/wp-content/uploads/2024/04/furniture-service-banner-1.png", link: "/products?category=desks" },
              { title: "Ergonomic Seating", img: "https://cxl.com/wp-content/uploads/2023/09/Office-chair-1024x595.jpg", link: "/products?category=chairs" },
              { title: "Collaborative Spaces", img: "https://images.squarespace-cdn.com/content/v1/58cfd41c17bffcb09bd654f0/1711029298421-HILV7HAUJBJZNDNEMF3Z/Coworking%2B1.png", link: "/products?category=collaborative" }
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
    </div>
  );
}
