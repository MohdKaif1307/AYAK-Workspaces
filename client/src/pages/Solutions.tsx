import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Solutions() {
  const solutions = [
    {
      title: "Corporate Offices",
      description: "Scale your operations with professional layouts designed for large teams. Focus on hierarchy, privacy, and impressive executive suites.",
      image: "https://www.krofficeinteriors.com/pictures/carousel/KR-Office-Solutions-Bozeman-Office.jpg",
      features: ["Executive Suites", "Open Plan Workstations", "Boardrooms"]
    },
    {
      title: "Startups & Tech",
      description: "Agile furniture for agile teams. Flexible, modular systems that can grow and change as fast as your company does.",
      image: "https://cdn.dribbble.com/userupload/38207835/file/original-a180b3c38d6ec63c79696c899e4a4f9d.png?resize=800x600",
      features: ["Modular Desks", "Collaboration Hubs", "Phone Booths"]
    },
    {
      title: "Co-working Spaces",
      description: "Maximize density without sacrificing comfort. Durable, versatile furniture built for high-traffic environments.",
      image: "https://images.squarespace-cdn.com/content/v1/58cfd41c17bffcb09bd654f0/1711029298421-HILV7HAUJBJZNDNEMF3Z/Coworking%2B1.png",
      features: ["Hot Desking", "Lounge Areas", "Lockers & Storage"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-24 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">Industry Solutions</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Tailored furniture strategies for every type of business.
          </p>
        </div>
      </div>

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
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <img src={solution.image} alt={solution.title} className="w-full h-full object-cover" />
              </div>
            </div>
            
            <div className="flex-1 space-y-6">
              <h2 className="font-display font-bold text-4xl">{solution.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {solution.description}
              </p>
              
              <ul className="space-y-3 py-4">
                {solution.features.map(f => (
                  <li key={f} className="flex items-center gap-3 font-medium">
                    <div className="w-2 h-2 bg-primary rounded-full" /> {f}
                  </li>
                ))}
              </ul>

              <Link href="/contact">
                <Button size="lg" className="mt-4">
                  Discuss Your Project <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
