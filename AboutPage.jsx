
import React from "react";
import { motion } from "framer-motion";
import { Users, Heart, Leaf, Sparkles } from "lucide-react";

const teamMembers = [
  {
    name: "Alice Wonderland",
    role: "Lead Stylist & Founder",
    bio: "With over 15 years of experience, Alice brings passion and artistry to every cut and color. She founded Glamour Cuts to create a haven of style and relaxation.",
    imageKey: "Stylist Alice" 
  },
  {
    name: "Bob The Hairstyler",
    role: "Senior Colorist",
    bio: "Bob is a master of color, specializing in balayage and vibrant transformations. He believes hair color is a form of self-expression.",
    imageKey: "Stylist Bob"
  },
  {
    name: "Carol Shears",
    role: "Expert Stylist",
    bio: "Carol's precision cuts and attention to detail are renowned. She loves creating styles that perfectly suit her clients' personalities and lifestyles.",
    imageKey: "Stylist Carol"
  }
];

const AboutPage = () => {
  return (
    <div className="py-12 sm:py-16 bg-gradient-to-bl from-background via-secondary/10 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Our Story Section */}
        <motion.section 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Sparkles className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-6">Our Story</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
            Welcome to Glamour Cuts, where your hair dreams come to life! Founded in 2010, our salon was born from a passion for transformative hairstyling and a desire to create a welcoming space where clients can unwind and discover their best selves.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We believe that a great hairstyle is more than just a look – it's an expression of individuality and confidence. Our team of dedicated professionals is committed to providing exceptional service, using top-quality products, and staying ahead of the latest trends to ensure you leave feeling refreshed, beautiful, and empowered.
          </p>
        </motion.section>

        {/* Our Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-primary">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center p-6 bg-card shadow-lg rounded-xl border border-primary/10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Heart className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Client-Centered Care</h3>
              <p className="text-muted-foreground">Your satisfaction is our priority. We listen, advise, and tailor every service to your unique needs and desires.</p>
            </motion.div>
            <motion.div 
              className="text-center p-6 bg-card shadow-lg rounded-xl border border-primary/10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Leaf className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Quality & Craftsmanship</h3>
              <p className="text-muted-foreground">We use only premium products and continuous training to deliver outstanding results with artistry and precision.</p>
            </motion.div>
            <motion.div 
              className="text-center p-6 bg-card shadow-lg rounded-xl border border-primary/10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Users className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Welcoming Atmosphere</h3>
              <p className="text-muted-foreground">Experience a friendly, inclusive, and relaxing environment where you can feel comfortable and pampered.</p>
            </motion.div>
          </div>
        </section>

        {/* Meet Our Team Section */}
        <section>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-primary">Meet Our Talented Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name} 
                className="text-center bg-card shadow-xl rounded-lg p-6 transform transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-primary"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden mb-4 border-4 border-primary/30">
                  <img  
                    className="w-full h-full object-cover" 
                    alt={member.name}
                   src="https://images.unsplash.com/photo-1599856413870-40540dd55110" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
