// components/sections/ProjectsSection.tsx
"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/common/ProjectCard';
import { 
  fadeInUp, 
  fadeInLeft, 
  fadeInRight, 
  scaleOnHover, 
  cardHover,
  staggerContainer,
  viewportOnce,
  delays 
} from '@/lib/constants';

// Unsplash images for better visual appeal
const unsplashImages = [
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', // Modern building
  'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80', // Luxury apartment
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80', // Beautiful home
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', // Modern house
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', // Residential complex
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', // Luxury villa
];

const ProjectsSection = () => {
  // Debug: Log projects data
  console.log('Projects data:', projects);
  console.log('Projects length:', projects?.length);

  // Add error boundary
  if (!projects) {
    console.error('Projects data is undefined');
    return (
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-500">Error: Projects data not found</p>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    console.log('Projects array is empty');
    return (
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6"
            {...fadeInUp}
            viewport={viewportOnce}
          >
            <motion.div
              {...fadeInLeft}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: delays.short }}
            >
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-gray-900 dark:text-white mb-2">
                LATEST PROJECTS
              </h2>
              <motion.div 
                className="w-20 h-1 bg-gradient-to-r from-[#8B2131] to-[#B91C1C] rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
            <motion.button 
              className="px-8 py-3 bg-[#8B2131] text-white rounded-lg hover:bg-[#7A1C2A] transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              {...fadeInRight}
              {...scaleOnHover}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: delays.medium }}
            >
              SEE ALL PROJECTS
            </motion.button>
          </motion.div>
          <p className="text-yellow-600">No projects to display</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with enhanced animations */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.short }}
          >
            <h2 className="text-3xl sm:text-4xl dark:text-white mb-2">
              LATEST PROJECTS
            </h2>
            <motion.div 
              className="w-20 h-1 bg-gradient-to-r from-[#8B2131] to-[#B91C1C] rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: delays.medium, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
          
          <motion.button 
            className="px-8 py-3 bg-[#8B2131] text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-transparent hover:border-2 hover:border-[#8B2131] hover:text-black font-medium cursor-pointer"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.medium }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            SEE ALL PROJECTS
          </motion.button>
        </motion.div>

        {/* Projects Grid with staggered animations */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: delays.medium, staggerChildren: 0.1 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.6,
                delay: delays.stagger(index),
                ease: [0.25, 0.25, 0, 1]
              }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <ProjectCard
                image={unsplashImages[index % unsplashImages.length]}
                title={project.title}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;