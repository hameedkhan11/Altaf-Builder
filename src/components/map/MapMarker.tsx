// components/map/CustomMarker.tsx

import { Marker, Popup } from 'react-leaflet';
import { MapLocation } from '@/lib/mapConstants/types';
import L from "leaflet"

interface CustomMarkerProps {
  location: MapLocation;
}

// Custom marker icons
const createCustomIcon = (type: string, color: string = '#D4AF37') => {
  const svgIcon = `
    <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient-${type}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#B8860B;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow-${type}" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="rgba(0,0,0,0.3)"/>
        </filter>
      </defs>
      <path d="M20 0C12.268 0 6 6.268 6 14c0 10.5 14 36 14 36s14-25.5 14-36c0-7.732-6.268-14-14-14z" 
            fill="url(#gradient-${type})" 
            filter="url(#shadow-${type})" 
            stroke="#fff" 
            stroke-width="2"/>
      <circle cx="20" cy="14" r="6" fill="#fff"/>
      <text x="20" y="18" text-anchor="middle" fill="${color}" font-family="Arial" font-size="12" font-weight="bold">
        ${type === 'office' ? '🏢' : type === 'property' ? '🏡' : '📍'}
      </text>
    </svg>
  `;

  return new L.DivIcon({
    html: svgIcon,
    className: 'custom-marker',
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],
  });
};

export const CustomMarker: React.FC<CustomMarkerProps> = ({ location }) => {
  const icon = createCustomIcon(
    location.type,
    location.type === 'office' ? '#D4AF37' : location.type === 'property' ? '#8B4513' : '#4A90E2'
  );

  return (
    <Marker position={location.coordinates} icon={icon}>
      <Popup className="luxury-popup" minWidth={300}>
        <div className="p-4 bg-white rounded-lg shadow-lg">
          {location.image && (
            <img 
              src={location.image} 
              alt={location.name}
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
          )}
          <h3 className="text-xl font-bold text-gray-800 mb-2">{location.name}</h3>
          <p className="text-gray-600 mb-2">{location.address}</p>
          
          {location.description && (
            <p className="text-gray-700 mb-3">{location.description}</p>
          )}
          
          {location.type === 'property' && (
            <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
              {location.price && (
                <div className="bg-yellow-50 p-2 rounded">
                  <span className="font-semibold text-yellow-800">Price:</span>
                  <span className="ml-1 text-yellow-700">{location.price}</span>
                </div>
              )}
              {location.bedrooms && (
                <div className="bg-blue-50 p-2 rounded">
                  <span className="font-semibold text-blue-800">Beds:</span>
                  <span className="ml-1 text-blue-700">{location.bedrooms}</span>
                </div>
              )}
              {location.bathrooms && (
                <div className="bg-green-50 p-2 rounded">
                  <span className="font-semibold text-green-800">Baths:</span>
                  <span className="ml-1 text-green-700">{location.bathrooms}</span>
                </div>
              )}
              {location.sqft && (
                <div className="bg-purple-50 p-2 rounded">
                  <span className="font-semibold text-purple-800">Sq Ft:</span>
                  <span className="ml-1 text-purple-700">{location.sqft.toLocaleString()}</span>
                </div>
              )}
            </div>
          )}
          
          {location.type === 'office' && (
            <div className="space-y-2 text-sm">
              {location.phone && (
                <div className="flex items-center">
                  <span className="text-gray-600">📞</span>
                  <a href={`tel:${location.phone}`} className="ml-2 text-blue-600 hover:underline">
                    {location.phone}
                  </a>
                </div>
              )}
              {location.email && (
                <div className="flex items-center">
                  <span className="text-gray-600">📧</span>
                  <a href={`mailto:${location.email}`} className="ml-2 text-blue-600 hover:underline">
                    {location.email}
                  </a>
                </div>
              )}
              {location.website && (
                <div className="flex items-center">
                  <span className="text-gray-600">🌐</span>
                  <a href={location.website} target="_blank" rel="noopener noreferrer" 
                     className="ml-2 text-blue-600 hover:underline">
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-3 pt-3 border-t border-gray-200">
            <a 
              href={`https://maps.google.com/maps?q=${location.coordinates[0]},${location.coordinates[1]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-md"
            >
              Get Directions
            </a>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};