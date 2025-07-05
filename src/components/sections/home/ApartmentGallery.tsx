'use client';

import { PropertyCard2 } from "@/components/cards/PropertyCard2";
import { propertySections } from "@/data/properties";



export const ApartmentGallery = () => {
  return (
    <section className="py-24 px-4 sm:px-8 lg:px-16">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light  tracking-wide">
          Luxury Living Spaces
        </h2>
      </div>
      <div className="h-[60vh] sm:h-[70vh] lg:h-[80vh] flex flex-col sm:flex-row gap-1">
        {propertySections.map((section, index) => (
          <PropertyCard2 
            key={section.id} 
            section={section} 
            index={index}
          />
        ))}
      </div>
    </section>
  );
};