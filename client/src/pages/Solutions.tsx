import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Zap, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function Solutions() {
  const solutions = [
    {
      title: "Corporate Offices",
      description: "Scale your operations with professional layouts designed for large teams. Focus on hierarchy, privacy, and impressive executive suites.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      features: ["Executive Suites", "Open Plan Workstations", "Boardrooms"],
      stats: { companies: "500+", satisfaction: "98%", years: "15+" }
    },
    {
      title: "Startups & Tech",
      description: "Agile furniture for agile teams. Flexible, modular systems that can grow and change as fast as your company does.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
      features: ["Modular Desks", "Collaboration Hubs", "Phone Booths"],
      stats: { startups: "200+", flexibility: "100%", growth: "250%" }
    },
    {
      title: "Co-working Spaces",
      description: "Maximize density without sacrificing comfort. Durable, versatile furniture built for high-traffic environments.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
      features: ["Hot Desking", "Lounge Areas", "Lockers & Storage"],
      stats: { locations: "300+", members: "50k+", efficiency: "40%" }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[650px] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <img 
            src="/images/hero-solutions.jpeg" 
            alt="Solutions Background" 
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
              Industry-Leading Solutions
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
              Tailored furniture strategies for every type of business, from startups to enterprises.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-lg">
                Discuss Your Needs <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <div className="container mx-auto px-4 py-24 space-y-32">
        {solutions.map((solution, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-16 items-center`}
          >
            <div className="flex-1">
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow">
                <img src={solution.image} alt={solution.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            </div>
            
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="font-display font-bold text-4xl mb-4">{solution.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {solution.description}
                </p>
              </div>
              
              {/* Features */}
              <div className="space-y-3 py-6 border-y border-border">
                {solution.features.map(f => (
                  <div key={f} className="flex items-center gap-3 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              <Link href="/contact">
                <Button size="lg" className="mt-4">
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-4xl text-center mb-16">Proven Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Active Clients", value: "1,000+" },
              { label: "Projects Completed", value: "2,500+" },
              { label: "Workspaces Transformed", value: "5,000+" },
              { label: "Employee Satisfaction", value: "97%" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <p className="opacity-90 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl mb-4">Our Process</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We follow a proven methodology to ensure your project succeeds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "We listen to understand your vision, goals, and budget constraints."
              },
              {
                step: "02",
                title: "Strategy",
                description: "We develop a comprehensive design strategy tailored to your needs."
              },
              {
                step: "03",
                title: "Design",
                description: "Our team creates detailed designs and 3D visualizations for approval."
              },
              {
                step: "04",
                title: "Implementation",
                description: "We manage delivery, installation, and ensure a smooth transition."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <div className="bg-secondary/50 p-8 rounded-lg border border-border/50 h-full hover:border-primary/50 transition-all">
                  <div className="text-3xl font-bold text-primary mb-4">{item.step}</div>
                  <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-primary/30" />
                  </div>
                )}
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
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">Ready to Transform Your Workspace?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Let's discuss how AYAK can create the perfect solution for your organization.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-10 py-6 text-lg">
                Schedule a Consultation <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
