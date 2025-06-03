"use client";
import React from "react";
import { motion } from "framer-motion";
import { PropertyCard } from "@/components/common/PropertyCard";
import { properties } from "@/data/properties";
import { delays, viewportOnce } from "@/lib/constants";

export const LatestProperties: React.FC = () => {
  return (
    <section className="py-24 px-4 ">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl dark:text-white mb-2">
              LATEST PROPERTIES
            </h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-[#8B2131] to-[#B91C1C] rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.8,
                delay: delays.medium,
                ease: "easeOut",
              }}
              style={{ transformOrigin: "left" }}
            />{" "}
          </motion.div>

          <motion.button
            className="px-8 py-3 bg-[#8B2131] text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-transparent hover:border-2 hover:text-black dark:text-white hover:border-[#8B2131]  font-medium cursor-pointer"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.medium }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            SEE ALL PROPERTIES
          </motion.button>
        </motion.div>

        {/* Properties Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {properties.slice(0, 6).map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {[
            { label: "Properties Sold", value: "500+" },
            { label: "Happy Clients", value: "1000+" },
            { label: "Years Experience", value: "15+" },
            { label: "Awards Won", value: "25+" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
            >
              <div className="text-3xl font-bold text-[#8B2131] dark:text-red-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
