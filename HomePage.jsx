
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Scissors, Sparkles, CalendarDays, MapPin } from "lucide-react";

const serviceHighlights = [
  {
    icon: <Scissors className="h-10 w-10 text-primary" />,
    title: "Precision Haircuts",
    description: "Modern styles and classic cuts tailored to you by our expert stylists.",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: "Vibrant Coloring",
    description: "From subtle highlights to bold transformations, using premium quality products.",
  },
  {
    icon: <CalendarDays className="h-10 w-10 text-primary" />,
    title: "Easy Online Booking",
    description: "Schedule your appointment anytime, anywhere with our simple booking system.",
  },
];

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <motion.section
        className="relative hero-gradient text-white py-20 md:py-32 flex items-center justify-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover Your Perfect Style
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Experience luxury hair care and styling at Glamour Cuts. Our talented team is dedicated to making you look and feel your best.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/book-appointment">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3">
                Book Your Appointment
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Service Highlights Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-center mb-4 text-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Signature Services
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-center text-lg mb-12 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay:0.1 }}
          >
            Indulge in a range of services designed to enhance your natural beauty and express your unique style.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceHighlights.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="text-center h-full shadow-lg hover:shadow-primary/20 transition-shadow duration-300 service-card-hover">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                      {service.icon}
                    </div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-md">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
           <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline" size="lg">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 lg:py-24 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-6 text-primary"
             initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready for a Transformation?
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Let our skilled stylists bring your vision to life. Book your appointment today and step into a world of beauty and confidence.
          </motion.p>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/book-appointment">
              <Button size="lg" className="text-lg px-10 py-3">
                Schedule Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section (Placeholder) */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-primary">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">"Absolutely love my new haircut! The stylist listened to exactly what I wanted and delivered perfectly. The salon has such a relaxing atmosphere too."</p>
                  <p className="font-semibold text-primary">- Sarah L.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
            <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">"Best balayage I've ever had! The color is stunning and looks so natural. Highly recommend Glamour Cuts for any color services."</p>
                  <p className="font-semibold text-primary">- Jessica M.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Section */}
       <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Visit Our Salon</h2>
            <p className="text-lg text-muted-foreground">123 Glamour Street, Style City, ST 12345</p>
          </div>
          <motion.div 
            className="rounded-lg overflow-hidden shadow-2xl aspect-video max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img  class="w-full h-full object-cover" alt="Map showing salon location" src="https://images.unsplash.com/photo-1623474769376-87682a78c0fe" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
