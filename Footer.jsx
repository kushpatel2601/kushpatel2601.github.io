
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Scissors } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const iconVariants = {
    hover: { scale: 1.2, rotate: 5, color: "hsl(var(--primary))" },
    tap: { scale: 0.9 }
  };

  return (
    <motion.footer 
      className="bg-gradient-to-r from-secondary via-background to-secondary/30 text-foreground py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Salon Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-primary">
              <Scissors className="h-7 w-7" />
              <span>Glamour Cuts</span>
            </Link>
            <p className="text-muted-foreground">
              Your premier destination for stylish haircuts, vibrant colors, and relaxing beauty treatments.
            </p>
            <div className="flex space-x-4">
              <motion.a href="#" variants={iconVariants} whileHover="hover" whileTap="tap" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={24} />
              </motion.a>
              <motion.a href="#" variants={iconVariants} whileHover="hover" whileTap="tap" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={24} />
              </motion.a>
              <motion.a href="#" variants={iconVariants} whileHover="hover" whileTap="tap" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={24} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold mb-4 text-primary">Quick Links</h5>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/book-appointment" className="text-muted-foreground hover:text-primary transition-colors">Book Online</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-lg font-semibold mb-4 text-primary">Get In Touch</h5>
            <ul className="space-y-2 text-muted-foreground">
              <li>123 Glamour Street, Style City, ST 12345</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@glamourcuts.com</li>
              <li className="pt-2">
                <p className="font-semibold">Opening Hours:</p>
                <p>Mon - Fri: 9am - 7pm</p>
                <p>Sat: 10am - 6pm</p>
                <p>Sun: Closed</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} Glamour Cuts. All rights reserved. Designed with love.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
