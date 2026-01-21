import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Lightbulb, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[650px] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <img 
            src="/images/hero-about.jpg" 
            alt="Team Background" 
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
              Transforming Workspaces, Inspiring Excellence
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
              At AYAK Enterprises, we believe that the design of your workspace shapes the way your team works, thinks, and innovates.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
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
                Our Story
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Founded in 2009, AYAK Enterprises started with a simple mission: to revolutionize how companies approach office design. What began as a small furniture consultation firm has grown into a trusted partner for over 1,000 companies worldwide.
              </p>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                We've spent more than a decade understanding the intersection of design, functionality, and employee wellbeing. Every project taught us something new, and every client challenge pushed us to innovate further.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Today, we're proud to have transformed over 5,000 workspaces globally, each one reflecting the unique vision and values of its organization.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-[4/3] bg-secondary rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/images/about-team.jpg" 
                  alt="AYAK Workspace" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl mb-4">Our Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              These principles guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Lightbulb,
                title: "Innovation",
                description: "We constantly push boundaries to create furniture solutions that anticipate tomorrow's needs."
              },
              {
                icon: Award,
                title: "Excellence",
                description: "Every detail matters. We maintain the highest standards in design, materials, and craftsmanship."
              },
              {
                icon: Users,
                title: "Collaboration",
                description: "We work closely with our clients to understand their vision and bring it to life."
              },
              {
                icon: Globe,
                title: "Sustainability",
                description: "We're committed to eco-friendly materials and responsible business practices."
              }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-background p-8 rounded-lg border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all"
              >
                <value.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl mb-4">Leadership Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Visionary leaders with decades of combined experience in design and business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alexandra Chen",
                role: "Founder & Chief Design Officer",
                bio: "Architect with 20+ years of experience in workplace design and organizational development.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
              },
              {
                name: "Marcus Thompson",
                role: "CEO & Chief Operations Officer",
                bio: "Business leader specialized in scaling design firms and managing complex enterprise projects.",
                image: "/images/testimonial-2.jpg"
              },
              {
                name: "Sophie Laurent",
                role: "VP Sustainability & Innovation",
                bio: "Environmental scientist and designer focused on sustainable materials and ethical manufacturing.",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop"
              }
            ].map((member, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="mb-4 rounded-lg overflow-hidden w-full aspect-[3/4] shadow-lg">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-4xl text-center mb-16">By The Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Years in Business", value: "15+" },
              { label: "Workspaces Transformed", value: "5,000+" },
              { label: "Happy Clients", value: "1,000+" },
              { label: "Team Members", value: "150+" }
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

      {/* Commitment Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display font-bold text-4xl mb-6">Our Commitment to You</h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              We don't just sell furniture. We partner with you to create workspaces that inspire productivity, foster collaboration, and reflect your company's values. Every project is a conversation, every design is a solution, and every workspace is a masterpiece.
            </p>
            <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
              Your success is our success. When your team thrives in a thoughtfully designed space, we thrive too. That's the AYAK promise.
            </p>
            
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-10 py-6 text-lg">
                  Let's Work Together <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-4xl text-center mb-4">Trusted by Industry Leaders</h2>
          <p className="text-muted-foreground text-lg text-center max-w-2xl mx-auto mb-12">
            We're proud to work with companies of all sizes, from innovative startups to Fortune 500 enterprises.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {[
              { name: "TechCorp", logo: "TC" },
              { name: "Global Finance", logo: "GF" },
              { name: "Creative Co", logo: "CC" },
              { name: "Innovation Labs", logo: "IL" },
              { name: "Enterprise Pro", logo: "EP" },
              { name: "Future Systems", logo: "FS" },
              { name: "Design Hub", logo: "DH" },
              { name: "Digital First", logo: "DF" }
            ].map((client, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-center p-6 bg-background rounded-lg border border-border hover:border-primary/50 transition-all"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2 text-primary font-bold">
                    {client.logo}
                  </div>
                  <p className="text-sm font-medium text-foreground">{client.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
