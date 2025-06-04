// components/sections/ProjectsSection.tsx
//@typescript-eslint/no-explicit-any
"use client"
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/common/ProjectCard';
import { 
  batchStagger,
  shouldAnimate,
  viewportOnce,
  delays,
  fadeInUp,
  fadeInLeft,
  fadeInRight
} from '@/lib/constants';

// Memoized constants
const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 
  'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80', 
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', 
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', 
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', 
];

const DISPLAY_COUNT = 6;

// Memoized components for better performance
const StaticHeader = React.memo(() => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
    <div>
      <h2 className="text-3xl sm:text-4xl dark:text-white mb-2">
        LATEST PROJECTS
      </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-[#8B2131] to-[#B91C1C] rounded-full" />
    </div>
    <button className="px-8 py-3 bg-[#B91C1C] text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-transparent hover:border-2 hover:border-[#8B2131] dark:text-white hover:text-black font-medium cursor-pointer">
      SEE ALL PROJECTS
    </button>
  </div>
));

const StaticGrid = React.memo(({ projectsData }: { projectsData: any[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {projectsData.map((project, index) => (
      <div 
        key={project.id} 
        className="hover:transform hover:-translate-y-1 transition-transform duration-200"
      >
        <ProjectCard
          image={UNSPLASH_IMAGES[index % UNSPLASH_IMAGES.length]}
          title={project.title}
        />
      </div>
    ))}
  </div>
));

const AnimatedHeader = React.memo(({ canAnimate }: { canAnimate: boolean }) => (
  <motion.div
    className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6"
    {...fadeInUp}
    viewport={viewportOnce}
  >
    <motion.div
      {...fadeInLeft}
      viewport={viewportOnce}
      transition={{ duration: 0.2, delay: delays.short }}
    >
      <h2 className="text-3xl sm:text-4xl dark:text-white mb-2">
        LATEST PROJECTS
      </h2>
      <motion.div 
        className="w-20 h-1 bg-gradient-to-r from-[#8B2131] to-[#B91C1C] rounded-full"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.3, delay: delays.short, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
    
    <motion.button 
      className="px-8 py-3 bg-[#B91C1C] text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-transparent hover:border-2 hover:border-[#8B2131] dark:text-white hover:text-black font-medium cursor-pointer"
      {...fadeInRight}
      viewport={viewportOnce}
      whileHover={canAnimate ? { scale: 1.01 } : {}}
      whileTap={canAnimate ? { scale: 0.99 } : {}}
      transition={{ duration: 0.2, delay: delays.medium }}
    >
      SEE ALL PROJECTS
    </motion.button>
  </motion.div>
));

const AnimatedGrid = React.memo(({ projectsData, canAnimate }: { projectsData: any[], canAnimate: boolean }) => (
  <motion.div 
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    variants={batchStagger.container}
    initial="initial"
    whileInView="animate"
    viewport={viewportOnce}
  >
    {projectsData.map((project, index) => (
      <motion.div
        key={project.id}
        variants={batchStagger.item}
        whileHover={canAnimate ? { 
          y: -3, 
          scale: 1.005,
          transition: { duration: 0.15, ease: "easeOut" }
        } : {}}
      >
        <ProjectCard
          image={UNSPLASH_IMAGES[index % UNSPLASH_IMAGES.length]}
          title={project.title}
        />
      </motion.div>
    ))}
  </motion.div>
));

const BackgroundDecoration = React.memo(() => (
  <div className="absolute top-0 left-0 w-full h-full opacity-5">
    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
  </div>
));

const ProjectsSection = () => {
  const [isClient, setIsClient] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);

  // Memoize projects data processing
  const projectsData = useMemo(() => {
    if (!projects || !Array.isArray(projects)) {
      console.error('Projects data is invalid:', projects);
      return [];
    }
    return projects.slice(0, DISPLAY_COUNT);
  }, []);

  // Memoize animation check
  const animationEnabled = useMemo(() => shouldAnimate(), []);

  const initializeClient = useCallback(() => {
    setIsClient(true);
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      setCanAnimate(animationEnabled);
    });
  }, [animationEnabled]);

  useEffect(() => {
    initializeClient();
  }, [initializeClient]);

  // Early return for SSR with optimized static content
  if (!isClient) {
    return (
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <StaticHeader />
          <StaticGrid projectsData={projectsData} />
        </div>
      </section>
    );
  }

  // Error handling
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

  if (projectsData.length === 0) {
    console.log('No projects to display');
    return (
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {canAnimate ? <AnimatedHeader canAnimate={canAnimate} /> : <StaticHeader />}
          <p className="text-yellow-600">No projects to display</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration - only render when animations are enabled */}
      {canAnimate && <BackgroundDecoration />}
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Conditional rendering based on animation capability */}
        {canAnimate ? (
          <AnimatedHeader canAnimate={canAnimate} />
        ) : (
          <StaticHeader />
        )}

        {/* Projects Grid */}
        {canAnimate ? (
          <AnimatedGrid projectsData={projectsData} canAnimate={canAnimate} />
        ) : (
          <StaticGrid projectsData={projectsData} />
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;