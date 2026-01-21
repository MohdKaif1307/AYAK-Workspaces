import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateInquiry } from "@/hooks/use-products";
import { insertInquirySchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, MessageSquare, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Contact() {
  const { toast } = useToast();
  const createInquiry = useCreateInquiry();
  
  const form = useForm({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
      type: "general"
    }
  });

  const onSubmit = (data: any) => {
    createInquiry.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent",
          description: "We've received your inquiry and will contact you shortly.",
        });
        form.reset();
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[80vh] min-h-[650px] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <img 
            src="/images/hero-contact.jpg" 
            alt="Contact Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display font-bold text-5xl md:text-6xl mb-4">Let's Work Together</h1>
            <p className="text-xl md:text-2xl text-white/90">
              Have a project in mind? Our team is ready to bring your vision to life.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Quick Contact Options */}
      <section className="bg-secondary/50 py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 p-4"
            >
              <Phone className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Call us now</p>
                <p className="font-semibold">+1 (555) 123-4567</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4 p-4"
            >
              <Mail className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Email us</p>
                <p className="font-semibold">hello@ayakworkspaces.com</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 p-4"
            >
              <Clock className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Response time</p>
                <p className="font-semibold">Within 2 hours</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="bg-background shadow-2xl rounded-xl border border-border overflow-hidden grid grid-cols-1 lg:grid-cols-3">
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-primary text-primary-foreground p-12 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-display font-bold text-2xl mb-8">Contact Information</h3>
              <p className="mb-8 opacity-90 leading-relaxed">Fill out the form and our team will get back to you within 24 hours. We're excited to discuss your project!</p>
              
              <ul className="space-y-8">
                <li className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Office Location</p>
                    <span className="opacity-90">123 Design Avenue,<br/>Creative District,<br/>New York, NY 10001</span>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Phone</p>
                    <span className="opacity-90">+1 (555) 123-4567</span>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <span className="opacity-90">hello@ayakworkspaces.com</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Business Hours</p>
                    <span className="opacity-90">Monday - Friday: 9am - 6pm EST<br/>Saturday: 10am - 4pm EST<br/>Sunday: Closed</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/20">
               <p className="text-sm opacity-70 font-medium">Average Response Time: 2 hours</p>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 lg:p-12 lg:col-span-2"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-secondary/50 border-transparent focus:bg-background" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@company.com" className="bg-secondary/50 border-transparent focus:bg-background" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Company (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Company Ltd." className="bg-secondary/50 border-transparent focus:bg-background" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Tell Us About Your Project</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your workspace needs, budget, timeline, and any specific requirements..." 
                          className="min-h-[150px] bg-secondary/50 border-transparent focus:bg-background"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full md:w-auto font-semibold" disabled={createInquiry.isPending}>
                  {createInquiry.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>

      {/* Team Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our expert consultants have over 150 years of combined experience in office design and furniture solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alexandra Chen",
                role: "Chief Design Officer",
                bio: "Architect and design visionary with expertise in workplace strategy",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
              },
              {
                name: "Marcus Thompson",
                role: "Senior Project Manager",
                bio: "Expert in large-scale implementations and client relations",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
              },
              {
                name: "Sophie Laurent",
                role: "Sustainability Consultant",
                bio: "Focused on eco-friendly materials and sustainable office solutions",
                image: "/images/testimonial-3.jpg"
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
                <div className="mb-4 rounded-lg overflow-hidden w-full aspect-[3/4]">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
