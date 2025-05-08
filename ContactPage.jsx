
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all fields.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the form data to a backend
    // For this example, we'll just show a success toast
    console.log("Form data submitted:", formData);
    toast({
      title: "Message Sent!",
      description: `Thanks, ${formData.name}! We've received your message and will get back to you soon.`,
      variant: "default",
    });
    setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
  };

  const contactInfo = [
    { icon: <Phone className="h-6 w-6 text-primary" />, text: "(123) 456-7890", href: "tel:1234567890" },
    { icon: <Mail className="h-6 w-6 text-primary" />, text: "info@glamourcuts.com", href: "mailto:info@glamourcuts.com" },
    { icon: <MapPin className="h-6 w-6 text-primary" />, text: "123 Glamour Street, Style City, ST 12345", href: "#" },
  ];

  return (
    <div className="py-12 sm:py-16 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4">Get In Touch</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            We'd love to hear from you! Whether you have a question, feedback, or want to book a special service, feel free to reach out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Card className="shadow-xl border-primary/10">
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center">
                  <Send className="mr-3 h-6 w-6" /> Send Us a Message
                </CardTitle>
                <CardDescription>Our team will respond to your inquiry as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" placeholder="Question about services" value={formData.subject} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" placeholder="Your message here..." rows={5} value={formData.message} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Button type="submit" size="lg" className="w-full">
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <Card className="shadow-xl border-primary/10">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Contact Details</CardTitle>
                <CardDescription>Find us or reach out directly via phone or email.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a key={index} href={info.href} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group">
                    <span className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">{info.icon}</span>
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">{info.text}</span>
                  </a>
                ))}
              </CardContent>
            </Card>
            
            <Card className="shadow-xl border-primary/10">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Our Location</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="aspect-video rounded-md overflow-hidden">
                   <img  class="w-full h-full object-cover" alt="Map showing salon location" src="https://images.unsplash.com/photo-1564479893852-180ac6065b2b" />
                 </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
