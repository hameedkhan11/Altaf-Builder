"use client";
import React from "react";
import { motion } from "framer-motion";
import { MissionVision } from "@/lib/about-us/types";
import { MissionVisionCard } from "@/components/cards/VisionCard";


interface MissionVisionSectionProps {
  missionVision: MissionVision[];
}

export const MissionVisionSection: React.FC<MissionVisionSectionProps> = ({
  missionVision,
}) => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,<svg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'><g fill=\'none\' fill-rule=\'evenodd\'><g fill=\'%23f3f4f6\' fill-opacity=\'0.4\'><circle cx=\'20\' cy=\'20\' r=\'1\'/></g></g></svg>\')] opacity-30" />

      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-12 xl:px-24">
        <div className="mb-12 sm:mb-16 flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 w-full">
          <motion.h1 
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl text-[rgb(140,46,71)] mb-4 w-full lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Real luxury is time well spent in peace, not things well owned in
            noise.
          </motion.h1>
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
              Altaf Developments was founded in the UAE in October 2014, with
              our construction division operating in the region for nearly 20
              years. We believe that the future of real estate lies not just in
              building spaces but in creating immersive experiences that
              inspire, transform, and integrate communities. At the heart of our
              philosophy is a steadfast commitment to delivering lasting value
              to our customers and stakeholders. We strive for the
              extraordinary, with a mission to revolutionise the real estate
              industry by setting new benchmarks in design, functionality, and
              sustainability. Driven by a relentless pursuit of innovation and
              excellence, we continue to push the boundaries of what&apos;s possible,
              reshaping the future of real estate, one project at a time. Join
              us as we embark on A Journey to Perfection, enriching lives along
              the way.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {missionVision.map((item, index) => (
            <MissionVisionCard key={index} data={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};