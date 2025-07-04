// components/map/LuxuryMap.tsx
'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { MapConfig, MapProps } from '@/lib/mapConstants/types';

// Dynamically import the map component with no SSR
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading luxury map...</p>
      </div>
    </div>
  ),
});

const defaultConfig: MapConfig = {
  center: [40.7128, -74.0060], // Default to NYC
  zoom: 12,
  maxZoom: 18,
  minZoom: 3,
};

export const LuxuryMap: React.FC<MapProps> = ({
  locations,
  config = {},
  height = '500px',
  className = '',
  showControls = true,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const mapConfig = { ...defaultConfig, ...config };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate center based on locations if not provided
  const calculateCenter = (): [number, number] => {
    if (config.center) return config.center;
    if (locations.length === 0) return defaultConfig.center;
    
    const lat = locations.reduce((sum, loc) => sum + loc.coordinates[0], 0) / locations.length;
    const lng = locations.reduce((sum, loc) => sum + loc.coordinates[1], 0) / locations.length;
    return [lat, lng];
  };

  const center = calculateCenter();

  if (!isMounted) {
    return (
      <div 
        className={`flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl ${className}`}
        style={{ height }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading luxury map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-xl overflow-hidden shadow-2xl ${className}`} style={{ height }}>
      {/* Map Header */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800">Premium Locations</h3>
        <p className="text-sm text-gray-600">{locations.length} locations available</p>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center">
            <span className="text-base mr-2">🏢</span>
            <span className="text-gray-700">Office</span>
          </div>
          <div className="flex items-center">
            <span className="text-base mr-2">🏡</span>
            <span className="text-gray-700">Property</span>
          </div>
          <div className="flex items-center">
            <span className="text-base mr-2">📍</span>
            <span className="text-gray-700">Landmark</span>
          </div>
        </div>
      </div>

      <MapComponent
        center={center}
        mapConfig={mapConfig}
        locations={locations}
        showControls={showControls}
        height={height}
      />
    </div>
  );
};