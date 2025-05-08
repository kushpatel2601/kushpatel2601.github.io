
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Scissors } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Book Appointment", path: "/book-appointment" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const linkVariants = {
    hover: {
      scale: 1.1,
      color: "hsl(var(--primary))",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.nav 
      className="bg-background/80 backdrop-blur-md shadow-md sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
            <Scissors className="h-8 w-8" />
            <span>Glamour Cuts</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `text-foreground hover:text-primary transition-colors duration-300 font-medium pb-1 border-b-2 ${
                    isActive ? "border-primary" : "border-transparent"
                  }`
                }
              >
                <motion.span variants={linkVariants} whileHover="hover" whileTap="tap">
                  {item.name}
                </motion.span>
              </NavLink>
            ))}
            <Link to="/book-appointment">
              <Button>Book Now</Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto", transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
          closed: { opacity: 0, height: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } }
        }}
        className="md:hidden bg-background shadow-lg overflow-hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                  isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary hover:text-secondary-foreground"
                }`
              }
            >
              <motion.div variants={{ open: { y: 0, opacity: 1 }, closed: { y: 20, opacity: 0 } }}>
                {item.name}
              </motion.div>
            </NavLink>
          ))}
          <Link to="/book-appointment" className="block w-full pt-2">
             <motion.div variants={{ open: { y: 0, opacity: 1 }, closed: { y: 20, opacity: 0 } }}>
              <Button className="w-full" onClick={() => setIsOpen(false)}>Book Now</Button>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
