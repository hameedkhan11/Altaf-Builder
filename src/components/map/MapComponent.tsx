// components/map/MapComponent.tsx
'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapConfig, MapLocation } from '@/lib/mapConstants/types';
import { CustomMarker } from './MapMarker';
import L from 'leaflet';

interface MapComponentProps {
  center: [number, number];
  mapConfig: MapConfig;
  locations: MapLocation[];
  showControls: boolean;
  height: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  center,
  mapConfig,
  locations,
  showControls,
  height,
}) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Fix for default markers in Leaflet - use CDN icons
    if (typeof window !== 'undefined') {
      // Fix the default icon issue with webpack
      delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });
    }
  }, []);

  return (
    <>
      <MapContainer
        ref={mapRef}
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
    </>
  );
};

export default MapComponent;