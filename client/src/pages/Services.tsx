import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Palette, Hammer, Users, Lightbulb } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Palette,
      title: "Space Planning & Design",
      description: "Our expert designers analyze your space and create custom layouts that maximize functionality while reflecting your brand identity.",
      features: ["3D Renderings", "Space Optimization", "Brand Integration"]
    },
    {
      icon: Hammer,
      title: "Installation & Setup",
      description: "Professional installation and setup of all furniture and fixtures, ensuring everything is configured perfectly for day-one productivity.",
      features: ["Expert Installation", "Testing & QA", "Staff Training"]
    },
    {
      icon: Users,
      title: "Consultation & Strategy",
      description: "Work with our experienced consultants to develop a comprehensive workspace strategy aligned with your company's goals and culture.",
      features: ["Needs Assessment", "Roadmap Development", "Budget Planning"]
    },
    {
      icon: Lightbulb,
      title: "Innovation & Trends",
      description: "Stay ahead with cutting-edge designs and solutions that incorporate the latest workplace trends and innovative technologies.",
      features: ["Trend Forecasting", "Technology Integration", "Future Proofing"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[650px] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <img 
            src="/images/hero-services.jpeg" 
            alt="Services Background" 
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
              Complete Workspace Solutions
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
              From concept to completion, we handle every aspect of your workspace transformation.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-lg">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl mb-4">Our Core Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              End-to-end solutions designed to transform your workspace and empower your team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-secondary/50 to-secondary/20 p-8 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <service.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-semibold text-2xl mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                
                <div className="space-y-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl mb-4">Our Process</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A structured approach to ensure every project exceeds expectations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "We meet with you to understand your vision, goals, space constraints, and budget."
              },
              {
                step: "02",
                title: "Analysis",
                description: "Our team analyzes your space, workflow, and requirements to identify opportunities."
              },
              {
                step: "03",
                title: "Design",
                description: "We create detailed designs, 3D renderings, and present solutions for your approval."
              },
              {
                step: "04",
                title: "Execution",
                description: "Professional implementation from ordering to installation and final handover."
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
                <div className="bg-background p-8 rounded-lg border border-border/50 h-full hover:border-primary/50 transition-all">
                  <div className="text-4xl font-bold text-primary mb-4">{item.step}</div>
                  <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-4xl mb-6">Why Choose AYAK?</h2>
              <div className="space-y-4">
                {[
                  "15+ years of experience in workspace design",
                  "Partnerships with leading furniture brands",
                  "Expert in-house design team",
                  "Commitment to sustainability",
                  "Full project management support",
                  "Post-installation support and optimization"
                ].map((reason, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    <p className="text-lg">{reason}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-secondary rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/services-team.jpg" 
                  alt="Why Choose AYAK" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
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
              Let's discuss how AYAK's comprehensive services can help you create the perfect work environment.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-10 py-6 text-lg">
                  Schedule Consultation <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="font-bold px-10 py-6 text-lg">
                  Browse Collections
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
