"use client";
import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NewsletterProps {
  onSubmit?: (email: string) => void;
}

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const socialIcons = [Facebook, Instagram, Twitter, Linkedin];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Updated with ALTAF BUILDER
            </h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter to receive the latest updates on our new projects, exclusive offers, and market insights.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow"
                  required
                />
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                  Subscribe Now
                </Button>
              </div>
            </form>
            
            <div className="flex items-center space-x-6">
              {socialIcons.map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="text-muted-foreground hover:text-indigo-600 transition-colors"
                  aria-label={`Social media link ${index + 1}`}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
          >
            <img 
              src="/images/avi-waxman-f9qZuKoZYoY-unsplash.jpg" 
              alt="ALTAF BUILDER Consultation"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;