"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { projectsData } from "@/data/projects";

// Simplified project data structure

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const ProjectsSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 xl:gap-24 items-start lg:items-center justify-between pb-16 sm:pb-20 md:pb-24 lg:pb-28"
      >
        <motion.h1 className="text-3xl md:text-4xl lg:text-5xl w-full lg:w-[40%]">
          EXPLORE APARTMENTS
        </motion.h1>

        <div className="flex flex-col gap-3 sm:gap-4 w-full lg:w-[40%]">
          <motion.p
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-sm leading-relaxed"
          >
            Welcome to Altaf Development, a premier development strategically
            located in the vibrant New Mount Hampden City. As the first smart
            and sustainable mixed-use private development by Altaf & Co, Altaf
            Development stands as a flagship project within the city, featuring
            upscale apartments and villas, a luxurious duty-free mall, and
            state-of-the-art commercial facilities.
          </motion.p>
          <Button className="bg-[rgb(140,46,71)] text-white hover:bg-transparent hover:text-[rgb(140,46,71)] py-6 px-8 w-full rounded-full text-lg transition-all duration-300 ease-in transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-transparent cursor-pointer hover:border-[rgb(140,46,71)]">
            View All Apartments
          </Button>
        </div>
      </motion.div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto relative z-10">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                y: -3,
                scale: 1.005,
                transition: { duration: 0.15, ease: "easeOut" },
              }}
            >
              <ProjectCard
                key={project.id}
                image={project.image}
                title={project.title}
                price={project.price}
                bedrooms={project.bedrooms}
                bathrooms={project.bathrooms}
                propertyType={project.propertyType} // Pass the propertyType
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
