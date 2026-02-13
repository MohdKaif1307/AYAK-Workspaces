import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateInquiry } from "@/hooks/use-products";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema } from "@shared/schema";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, ArrowRight } from "lucide-react";
import { z } from "zod";

const contactSchema = insertInquirySchema;
type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const { mutate: createInquiry, isPending } = useCreateInquiry();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactForm) => {
    createInquiry(data, {
      onSuccess: () => {
        toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
        reset();
      },
      onError: () => {
        toast({ title: "Error", description: "Failed to send. Please try again.", variant: "destructive" });
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[450px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero-contact.jpg" alt="Contact Us" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <span className="text-primary font-semibold tracking-widest text-xs uppercase mb-3 block">Get in Touch</span>
            <h1 className="font-display font-bold text-5xl md:text-6xl leading-tight mb-4">Let's Start a Conversation</h1>
            <p className="text-lg text-white/70 max-w-xl font-light">Have a project in mind? We'd love to hear from you.</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Quick Contact Info */}
      <section className="py-12 bg-background relative -mt-8 z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { icon: Phone, title: "Call Us", value: "+1 (555) 123-4567", sub: "Mon-Fri 9am-6pm" },
              { icon: Mail, title: "Email Us", value: "hello@ayakworkspaces.com", sub: "We reply within 24hrs" },
              { icon: MapPin, title: "Visit Us", value: "123 Design Avenue", sub: "New York, NY 10001" },
              { icon: Clock, title: "Hours", value: "Mon – Friday", sub: "9:00 AM – 6:00 PM" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="premium-card p-6 text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-sm font-medium text-foreground">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="glass rounded-2xl p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-2xl">Send Us a Message</h2>
                    <p className="text-sm text-muted-foreground">Fill out the form and we'll get back to you shortly.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name *</label>
                      <Input
                        {...register("name")}
                        placeholder="John Doe"
                        className="rounded-xl bg-background/50 border-border/50 focus:bg-background h-12"
                      />
                      {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email *</label>
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="john@company.com"
                        className="rounded-xl bg-background/50 border-border/50 focus:bg-background h-12"
                      />
                      {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Company</label>
                      <Input
                        {...register("company")}
                        placeholder="Company Name"
                        className="rounded-xl bg-background/50 border-border/50 focus:bg-background h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Select onValueChange={(val) => setValue("type", val)}>
                        <SelectTrigger className="rounded-xl bg-background/50 border-border/50 h-12">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="quote">Request a Quote</SelectItem>
                          <SelectItem value="project">Project Consultation</SelectItem>
                          <SelectItem value="support">Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message *</label>
                    <Textarea
                      {...register("message")}
                      placeholder="Tell us about your project or question..."
                      rows={5}
                      className="rounded-xl bg-background/50 border-border/50 focus:bg-background resize-none"
                    />
                    {errors.message && <p className="text-destructive text-xs">{errors.message.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isPending}
                    className="w-full py-6 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all"
                  >
                    {isPending ? (
                      <>Sending...</>
                    ) : (
                      <>Send Message <Send className="ml-2 w-4 h-4" /></>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="premium-card p-8">
                <h3 className="font-display font-bold text-xl mb-4">Why Work With Us?</h3>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {[
                    "Free design consultation for your workspace",
                    "Custom solutions tailored to your brand",
                    "Transparent pricing with no hidden costs",
                    "Professional installation and setup included",
                    "Ongoing support and maintenance",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ArrowRight className="w-3 h-3 text-primary" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary text-primary-foreground rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
                <h3 className="font-display font-bold text-xl mb-3 relative z-10">Need Urgent Help?</h3>
                <p className="text-sm opacity-80 mb-6 relative z-10">
                  For time-sensitive projects, call us directly and we'll prioritize your request.
                </p>
                <a href="tel:+15551234567" className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-5 py-3 rounded-xl font-semibold text-sm transition-colors relative z-10">
                  <Phone className="w-4 h-4" /> Call Now
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
