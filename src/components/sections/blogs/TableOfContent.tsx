// components/blog-detail/TableOfContents.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";

interface TableOfContentsProps {
  sections: { heading: string; id: string }[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = React.useState<string>('');
  const [isSticky, setIsSticky] = React.useState<boolean>(false);
  const [sidebarOffset, setSidebarOffset] = React.useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const tocRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0.1
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Only calculate horizontal position once when first becoming sticky
      if (scrolled > viewportHeight && !isSticky && tocRef.current) {
        const rect = tocRef.current.getBoundingClientRect();
        setSidebarOffset({
          left: rect.left + window.scrollX,
          width: rect.width
        });
        setIsSticky(true);
      } else if (scrolled <= viewportHeight && isSticky) {
        // Only reset when going back above 100vh
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSticky]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      ref={tocRef}
      className={`bg-white rounded-lg shadow-lg p-4 border transition-all duration-300 ${
        isSticky ? 'fixed z-50' : 'sticky top-8'
      }`}
      style={isSticky ? { 
        left: `${sidebarOffset.left}px`, 
        width: `${sidebarOffset.width}px`,
        top: '2rem' // Direct 2rem from top when fixed
      } : {}}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      role="navigation"
      aria-label="Table of contents"
    >
      <h3 className="text-sm font-semibold mb-4 text-gray-800">
        Table of Contents
      </h3>
      <ul className="space-y-2">
        {sections.map(({ heading, id }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`text-sm block py-1 px-2 rounded transition-colors ${
                activeSection === id
                  ? 'bg-[#8B2131] text-white'
                  : 'text-gray-600 hover:text-[#8B2131] hover:bg-gray-50'
              }`}
              onClick={(e) => handleClick(e, id)}
              aria-current={activeSection === id ? 'location' : undefined}
            >
              {heading}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default TableOfContents;