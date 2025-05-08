
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Scissors, Droplet, Wand2, Sun, Wind, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    category: "Haircuts & Styling",
    icon: <Scissors className="h-8 w-8 text-primary" />,
    items: [
      { name: "Women's Haircut & Style", price: "from $65", description: "Consultation, shampoo, cut, and blow-dry style." },
      { name: "Men's Haircut", price: "from $40", description: "Precision cut, shampoo, and style." },
      { name: "Blowout / Styling", price: "from $50", description: "Shampoo, blow-dry, and heat styling." },
      { name: "Updo / Special Occasion", price: "from $85", description: "Elegant styling for weddings, proms, or events." },
    ],
  },
  {
    category: "Color Services",
    icon: <Droplet className="h-8 w-8 text-primary" />,
    items: [
      { name: "All-Over Color", price: "from $120", description: "Single process color application from roots to ends." },
      { name: "Partial Highlights / Lowlights", price: "from $150", description: "Highlights or lowlights on part of your head." },
      { name: "Full Highlights / Lowlights", price: "from $200", description: "Highlights or lowlights throughout all your hair." },
      { name: "Balayage / Ombre", price: "from $250", description: "Hand-painted color for a natural, graduated effect." },
      { name: "Color Correction", price: "Consultation Required", description: "Corrective service to fix undesired color results." },
    ],
  },
  {
    category: "Treatments & Add-ons",
    icon: <Wand2 className="h-8 w-8 text-primary" />,
    items: [
      { name: "Deep Conditioning Treatment", price: "$45", description: "Intensive mask to restore moisture and shine." },
      { name: "Scalp Treatment", price: "$55", description: "Exfoliating and nourishing treatment for a healthy scalp." },
      { name: "Keratin Smoothing Treatment", price: "from $300", description: "Reduces frizz and curl for smoother, manageable hair." },
      { name: "Gloss / Toner", price: "$60", description: "Enhances shine and tone, perfect for refreshing color." },
    ],
  },
   {
    category: "Beauty & Wellness",
    icon: <Sun className="h-8 w-8 text-primary" />,
    items: [
      { name: "Eyebrow Shaping", price: "$25", description: "Waxing or tweezing to create the perfect brow shape." },
      { name: "Makeup Application", price: "from $75", description: "Professional makeup for any occasion." },
    ],
  },
];

const ServicesPage = () => {
  return (
    <div className="py-12 sm:py-16 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Indulge in a world of beauty and relaxation. We offer a comprehensive range of hair and beauty services tailored to your individual needs.
          </p>
        </motion.div>

        {services.map((category, categoryIndex) => (
          <motion.section 
            key={category.category} 
            className="mb-12"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            <div className="flex items-center mb-8">
              <span className="mr-4 p-2 bg-primary/10 rounded-full">{category.icon}</span>
              <h2 className="text-3xl font-bold text-foreground">{category.category}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((service, serviceIndex) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: serviceIndex * 0.1 }}
                  className="h-full"
                >
                  <Card className="flex flex-col justify-between h-full shadow-lg hover:shadow-primary/10 transition-all duration-300 service-card-hover border-transparent hover:border-primary">
                    <CardHeader>
                      <CardTitle className="text-xl text-primary">{service.name}</CardTitle>
                      <div className="flex items-center text-lg font-semibold text-accent">
                        <Tag className="h-5 w-5 mr-2" /> {service.price}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm text-muted-foreground">{service.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Link to="/book-appointment" className="w-full">
                        <Button className="w-full" variant="outline">Book This Service</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: services.length * 0.1 }}
        >
          <p className="text-muted-foreground mb-4">Prices are subject to change based on hair length, thickness, and complexity of service.</p>
          <p className="text-muted-foreground mb-6">For specific pricing or consultations, please contact us or book an appointment.</p>
          <Link to="/book-appointment">
            <Button size="lg" className="text-lg px-8 py-3">
              Book Your Appointment Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;
