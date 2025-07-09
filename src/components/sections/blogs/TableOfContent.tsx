// components/blog-detail/TableOfContents.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";

interface TableOfContentsProps {
  sections: { heading: string; id: string }[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = React.useState<string>('');

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
      className="bg-white rounded-lg shadow-lg p-4 border sticky top-8 z-10"
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