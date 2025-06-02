// components/sections/home/WhyChooseUs.tsx

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { features } from "@/data/features";

const WhyChoose = () => {
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
              Why Choose ALTAF BUILDER
            </h2>
            <p className="text-muted-foreground mb-8">
              With over 25 years of experience in luxury real estate
              development, we've established ourselves as a leader in creating
              exceptional living spaces that combine innovative design, premium
              materials, and unparalleled craftsmanship.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-lg overflow-hidden shadow-xl"
          >
            <Image
              src="/images/avi-waxman-f9qZuKoZYoY-unsplash.jpg"
              alt="ALTAF BUILDER Office"
              className="w-full h-full object-cover"
              fill
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
