// app/contact/page.tsx
"use client";

import { ContactForm } from "@/components/sections/contact/ContactForm";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import the MapPage component with no SSR
const MapPage = dynamic(() => import("@/components/sections/contact/HeadOfficeMap"), {
  ssr: false,
  loading: () => (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="mb-12 text-center">
          <h2 className="text-7xl mb-4">
            Explore Our HEAD OFFICE
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Interactive map showcasing our office locations and exclusive property listings 
            in Manhattan&apos;s most desirable neighborhoods
          </p>
        </div>
        <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading interactive map...</p>
          </div>
        </div>
      </div>
    </div>
  ),
});

export default function ContactPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <ContactForm />
      {isMounted && <MapPage />}
    </>
  );
}