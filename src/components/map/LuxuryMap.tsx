// components/map/LuxuryMap.tsx
'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapConfig, MapProps } from '@/lib/mapConstants/types';
import { CustomMarker } from './MapMarker';

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
  const [isClient, setIsClient] = useState(false);
  const mapConfig = { ...defaultConfig, ...config };

  useEffect(() => {
    setIsClient(true);
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

  if (!isClient) {
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
    <div className={`relative rounded-xl overflow-hidden shadow-2xl ${className}`}>
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

      <MapContainer
        center={center}
        zoom={mapConfig.zoom}
        maxZoom={mapConfig.maxZoom}
        minZoom={mapConfig.minZoom}
        style={{ height, width: '100%' }}
        zoomControl={false}
        className="luxury-map"
      >
        {/* Custom tile layer with luxury styling */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles"
        />

        {/* Custom zoom control positioning */}
        {showControls && <ZoomControl position="bottomright" />}

        {/* Render all markers */}
        {locations.map((location) => (
          <CustomMarker key={location.id} location={location} />
        ))}
      </MapContainer>

      {/* Custom CSS styles */}
      <style jsx global>{`
        .luxury-map {
          border-radius: 0.75rem;
        }
        
        .map-tiles {
          filter: contrast(1.1) saturate(1.2) brightness(1.05);
        }
        
        .custom-marker {
          background: none !important;
          border: none !important;
        }
        
        .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 0.75rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .leaflet-popup-tip {
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        }
        
        .leaflet-control-zoom a {
          background: white !important;
          border: 1px solid rgba(0, 0, 0, 0.1) !important;
          color: #374151 !important;
          font-weight: bold !important;
          transition: all 0.2s ease !important;
        }
        
        .leaflet-control-zoom a:hover {
          background: #f9fafb !important;
          border-color: #d4af37 !important;
          color: #d4af37 !important;
        }
        
        .leaflet-popup-close-button {
          color: #6b7280 !important;
          font-size: 18px !important;
          font-weight: bold !important;
          padding: 8px !important;
        }
        
        .leaflet-popup-close-button:hover {
          color: #374151 !important;
          background: rgba(0, 0, 0, 0.1) !important;
          border-radius: 50% !important;
        }
      `}</style>
    </div>
  );
};