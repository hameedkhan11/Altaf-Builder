// app/map/page.tsx or components/MapPage.tsx
'use client';

import { LuxuryMap } from '@/components/map/LuxuryMap';
import { MapLocation } from '@/lib/mapConstants/types';

const MapPage = () => {
  // Sample data - replace with your actual office location and properties
  const locations: MapLocation[] = [
    {
      id: 'office-1',
      name: 'Luxury Realty Office',
      address: '123 Park Avenue, New York, NY 10001',
      coordinates: [40.7505, -73.9934], // Park Avenue, NYC
      type: 'office',
      description: 'Our flagship office in the heart of Manhattan, serving luxury real estate clients since 2010.',
      phone: '+1 (555) 123-4567',
      email: 'info@luxuryrealty.com',
      website: 'https://luxuryrealty.com',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop'
    },
    {
      id: 'property-1',
      name: 'Central Park Penthouse',
      address: '15 Central Park West, New York, NY',
      coordinates: [40.7677, -73.9812],
      type: 'property',
      description: 'Stunning penthouse with panoramic Central Park views. Premium luxury living.',
      price: '$12,500,000',
      bedrooms: 4,
      bathrooms: 5,
      sqft: 3500,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=200&fit=crop'
    },
    {
      id: 'property-2',
      name: 'Tribeca Loft',
      address: '456 Broadway, New York, NY',
      coordinates: [40.7195, -74.0089],
      type: 'property',
      description: 'Historic loft conversion in prime Tribeca location. Modern luxury meets classic charm.',
      price: '$8,750,000',
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2800,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=200&fit=crop'
    },
    {
      id: 'property-3',
      name: 'Upper East Side Townhouse',
      address: '789 Madison Avenue, New York, NY',
      coordinates: [40.7736, -73.9566],
      type: 'property',
      description: 'Elegant pre-war townhouse with private garden. Perfect for discerning buyers.',
      price: '$15,200,000',
      bedrooms: 5,
      bathrooms: 6,
      sqft: 4200,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=200&fit=crop'
    },
    {
      id: 'landmark-1',
      name: 'Empire State Building',
      address: '350 5th Ave, New York, NY',
      coordinates: [40.7484, -73.9857],
      type: 'landmark',
      description: 'Iconic NYC landmark and neighborhood reference point.',
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header Section */}
      {/* <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Premium Locations
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover our exclusive portfolio of luxury properties and visit our prestigious office locations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg">
                Schedule Viewing
              </button>
              <button className="border border-yellow-400 text-yellow-400 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Map Section */}
      <div className="mx-auto px-4 sm:px-6 lg:px-16 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-7xl mb-4">
            Explore Our HEAD OFFICE
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Interactive map showcasing our office locations and exclusive property listings 
            in Manhattan&apos;s most desirable neighborhoods
          </p>
        </div>

        <LuxuryMap
          locations={locations}
          config={{
            center: [40.7505, -73.9834], // Centered on Manhattan
            zoom: 13,
          }}
          height="600px"
          className="mb-12"
          showControls={true}
        />
      </div>

    </div>
  );
};

export default MapPage;