"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects"; // Assuming this exports an array of objects
import { ProjectCard } from "@/components/common/ProjectCard"; // Your ProjectCard component
import {
  batchStagger,
  shouldAnimate,
  viewportOnce,
  delays,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "../../../../public/icons/ArrowIcon";

// --- Define the Project data structure ---
// Adjust this interface if your actual project data in projects.ts
// has more properties than just id and title.
interface Project {
  id: string | number; // Assuming id can be a string or number
  title: string;
  // Add other properties from your projects data here, e.g.:
  // description: string;
  // imageUrl?: string; // If your data has an image URL (though you use Unsplash here)
  // category: string;
}

// Memoized constants
const UNSPLASH_IMAGES = [
  "/images/apartment1.jpeg",
  "/images/apartment2.jpeg",
  "/images/apartment3.jpg",
];

const DISPLAY_COUNT = 6;

// Memoized components for better performance
// const StaticHeader = React.memo(() => (
//   <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
//     <div>
//       <h2 className="text-3xl sm:text-4xl dark:text-white mb-2">
//         LATEST PROJECTS
//       </h2>
//       <div className="w-20 h-1 bg-gradient-to-r from-[#8B2131] to-[#B91C1C] rounded-full" />
//     </div>
//     <button className="px-8 py-3 bg-[#B91C1C] text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-transparent hover:border-2 hover:border-[#8B2131] dark:text-white hover:text-black font-medium cursor-pointer">
//       SEE ALL PROJECTS
//     </button>
//   </div>
// ));
// StaticHeader.displayName = 'StaticHeader';

// Fixed type from any[] to Project[]
const StaticGrid = React.memo(
  ({ projectsData }: { projectsData: Project[] }) => (
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
  )
);
StaticGrid.displayName = "StaticGrid";

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
AnimatedHeader.displayName = "AnimatedHeader";

// Fixed type from any[] to Project[]
const AnimatedGrid = React.memo(
  ({
    projectsData,
    canAnimate,
  }: {
    projectsData: Project[];
    canAnimate: boolean;
  }) => (
    <motion.div
      className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={batchStagger.container}
      initial="initial"
      whileInView="animate"
      viewport={viewportOnce}
    >
      {projectsData.map((project, index) => (
        <motion.div
          key={project.id}
          variants={batchStagger.item}
          whileHover={
            canAnimate
              ? {
                  y: -3,
                  scale: 1.005,
                  transition: { duration: 0.15, ease: "easeOut" },
                }
              : {}
          }
        >
          <ProjectCard
            image={UNSPLASH_IMAGES[index % UNSPLASH_IMAGES.length]}
            title={project.title}
          />
        </motion.div>
      ))}
    </motion.div>
  )
);
AnimatedGrid.displayName = "AnimatedGrid";

const BackgroundDecoration = React.memo(() => (
  <div className="absolute top-0 left-0 w-full h-full opacity-5">
    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
  </div>
));
BackgroundDecoration.displayName = "BackgroundDecoration";

const ProjectsSection = () => {
  const [isClient, setIsClient] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);

  // Memoize projects data processing and ensure type
  const projectsData = useMemo<Project[]>(() => {
    // Ensure projects is an array before slicing
    if (!Array.isArray(projects)) {
      console.error("Projects data is not a valid array:", projects);
      return [];
    }

    // Add a basic check for object structure if possible/needed
    const validProjects = projects.filter(
      (p) => typeof p === "object" && p !== null && "id" in p && "title" in p
    );
    if (validProjects.length !== projects.length) {
      console.warn(
        "Some projects data objects are missing id or title",
        projects
      );
    }

    return validProjects.slice(0, DISPLAY_COUNT) as Project[];
  }, []);

  // Memoize animation check
  const animationEnabled = useMemo(() => shouldAnimate(), []);

  // Initialize client state and animation capability using useCallback
  const initializeClient = useCallback(() => {
    setIsClient(true);
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      setCanAnimate(animationEnabled);
    });
  }, [animationEnabled]);

  useEffect(() => {
    // Only initialize client state and animation detection once on mount
    initializeClient();
  }, [initializeClient]);

  // Early return for SSR with optimized static content
  if (!isClient) {
    return (
      <section className="py-24 px-16">
        <div className="max-w-8xl mx-auto  z-10">
          {/* <StaticHeader /> */}
          <StaticGrid projectsData={projectsData} />
        </div>
      </section>
    );
  }

  // Basic error handling if projects import is null/undefined after client hydration
  if (!projects) {
    console.error("Projects data is null or undefined after client hydration");
    return (
      <section className="py-24 px-16">
        <div className="max-w-8xl mx-auto">
          <p className="text-red-500">Error loading projects data.</p>
        </div>
      </section>
    );
  }

  // Handle case where projects data array is empty or becomes empty after filtering
  if (projectsData.length === 0) {
    console.log("No projects to display after processing data");
    return (
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* {canAnimate ? <AnimatedHeader canAnimate={canAnimate} /> : <StaticHeader />} */}
          <p className="text-yellow-600">
            No projects to display in this section.
          </p>
        </div>
      </section>
    );
  }

  // Render section with animations if enabled on the client
  return (
    <section className="py-24 px-16 overflow-hidden">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportOnce}
        className="text-3xl md:text-4xl lg:text-7xl font-medium flex gap-24 items-center justify-between pb-28"
      >
        <motion.h1 className="text-3xl md:text-5xl lg:text-8xl w-[40%]">
          EXPLORE APARTMENTS
        </motion.h1>

        <div className="flex flex-col gap-4 w-[40%]">
          <motion.p
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            className="text-lg"
          >
            Welcome to Altaf Development, a premier development strategically
            located in the vibrant New Mount Hampden City. As the first smart
            and sustainable mixed-use private development by Altaf & Co, Altaf
            Development stands as a flagship project within the city, featuring
            upscale apartments and villas, a luxurious duty-free mall, and
            state-of-the-art commercial facilities.
          </motion.p>
          <Button className="uiverse-btn-cta">
            <span className="span font-bold text-lg">VIEW ALL APARTMENTS</span>
            <span className="second mb-0.5">
              <ArrowIcon />
            </span>
          </Button>
        </div>
      </motion.div>
      {/* Background decoration - only render when animations are enabled and on client */}
      {canAnimate && <BackgroundDecoration />}

      <div className="max-w-8xl mx-auto relative z-10">
        {/* Conditional rendering of Header based on animation capability */}
        {/* {canAnimate ? (
          <AnimatedHeader canAnimate={canAnimate} />
        ) : (
          <StaticHeader />
        )} */}

        {/* Conditional rendering of Grid based on animation capability */}
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
