"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Hero } from "@/components/common/Hero";
import { RegisterHero } from "@/components/register-form/hero-section";
import { properties, propertyImagesPlaceholder } from "@/data/properties";
import { PropertySelector } from "@/components/property-detail/PropertySelector";
import { ImageGallery } from "@/components/property-detail/ImageDetailGallery";
import { PropertyDetailInfo } from "@/components/property-detail/PropertyDetailInfo";
import { PropertyDetailAmenities } from "@/components/property-detail/PropertyDetailAmenities";
// import { PropertyOverview } from "@/components/property-detail/PropertyDetailOverview";
import { PropertyKey } from "@/lib/types";

// Separate component that uses useSearchParams
const PropertyDetailContent: React.FC = () => {
  const searchParams = useSearchParams();
  const propertyParam = searchParams.get("property") as PropertyKey;
  
  // Set initial state based on URL parameter, fallback to "1bed"
  const [selectedProperty, setSelectedProperty] = useState<PropertyKey>(
    propertyParam && (propertyParam === "1bed" || propertyParam === "2bed") 
      ? propertyParam 
      : "1bed"
  );

  // Update state when URL parameter changes
  useEffect(() => {
    if (propertyParam && (propertyParam === "1bed" || propertyParam === "2bed")) {
      setSelectedProperty(propertyParam);
    }
  }, [propertyParam]);

  const currentProperty = properties[selectedProperty];

  return (
    <>
      <Hero
        backgroundType="image"
        backgroundSrc="Booking1_rg1bhs"
        fallbackImage="luxury-apartment-hero-gallery"
        height="half"
        overlay="gradient"
        contentAlignment="center"
        enableParallax={true}
        parallaxSpeed={0.3}
        title="Property Detail"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Property Detail", href: "/property-detail" },
        ]}
      />
      <div className="mx-auto mt-24 px-8 md:px-12 lg:px-16">
        <PropertySelector
          selectedProperty={selectedProperty}
          onPropertyChange={setSelectedProperty}
        />
                
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
          <ImageGallery images={propertyImagesPlaceholder[selectedProperty]} />
          <PropertyDetailInfo property={currentProperty} />
        </div>

        <PropertyDetailAmenities />
        {/* <PropertyOverview property={currentProperty} /> */}
      </div>
      <RegisterHero />
    </>
  );
};

// Loading component
const PropertyDetailLoading: React.FC = () => (
  <div className="min-h-screen">
    <Hero
      backgroundType="image"
      backgroundSrc="Booking1_rg1bhs"
      fallbackImage="luxury-apartment-hero-gallery"
      height="half"
      overlay="gradient"
      contentAlignment="center"
      enableParallax={true}
      parallaxSpeed={0.3}
      title="Property Detail"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Property Detail", href: "/property-detail" },
      ]}
    />
    <div className="mx-auto mt-24 px-8 md:px-12 lg:px-16">
      <div className="animate-pulse">
        <div className="h-12 bg-gray-200 rounded mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 h-96 bg-gray-200 rounded"></div>
          <div className="lg:col-span-2 space-y-4">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Main component wrapped with Suspense
const PropertyDetailSection: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<PropertyDetailLoading />}>
        <PropertyDetailContent />
      </Suspense>
    </div>
  );
};

export default PropertyDetailSection;