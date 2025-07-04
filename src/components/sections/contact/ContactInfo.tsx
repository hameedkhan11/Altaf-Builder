// components/ContactInfoCard.tsx
"use client";

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    title: 'Sales & Inquiries',
    primary: '+971 4 XXX XXXX',
    secondary: 'sales@altafdevelopment.ae',
    description: 'Available 9 AM - 8 PM, 7 days a week'
  },
  {
    icon: Mail,
    title: 'Customer Support',
    primary: 'support@altafdevelopment.ae',
    secondary: '+971 4 XXX XXXX',
    description: 'Dedicated support for residents'
  },
  {
    icon: MapPin,
    title: 'Visit Our Showroom',
    primary: 'Level 42, Emirates Towers',
    secondary: 'Sheikh Zayed Road, Dubai, UAE',
    description: 'By appointment only'
  },
  {
    icon: Clock,
    title: 'Operating Hours',
    primary: 'Mon - Sat: 9:00 AM - 8:00 PM',
    secondary: 'Sunday: 10:00 AM - 6:00 PM',
    description: 'Extended hours by appointment'
  }
];

export const ContactInfoCard = () => {
  return (
    <motion.div 
      className=" rounded-2xl p-8 text-black  relative overflow-hidden shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10">
        <div className="mb-8">
          <h2 className="text-3xl mt-4">
            Get in Touch
          </h2>
          <p className="leading-relaxed font-optima">
            Experience luxury living redefined. Our expert team is ready to help you 
            discover your perfect home in our premium residential developments.
          </p>
        </div>

        <div className="space-y-6">
          {contactInfo.map((info, index) => (
            <motion.div 
              key={index}
              className="flex items-start space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl flex-shrink-0">
                <info.icon className="w-5 h-5 text-[rgb(140,46,71)]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-1">
                  {info.title}
                </h3>
                <p className="mb-1">{info.primary}</p>
                {info.secondary && (
                  <p className="mb-1">{info.secondary}</p>
                )}
                {info.description && (
                  <p className="text-sm">{info.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};