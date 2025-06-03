"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Search,
  Filter,
  X,
  Bed,
  Bath,
  Ruler,
  Phone,
  Mail,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Property } from "@/lib/mapConstants/types";
import { properties, delays, viewportOnce, mapLayers } from "@/data/properties";
import { GlobalStyles } from "./styles";

declare global {
  interface Window {
    L: any;
    selectProperty: (propertyId: number) => void;
  }
}

const RealEstateLeafletMap: React.FC = () => {
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mapStyle, setMapStyle] = useState<string>("street");
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadLeaflet = async () => {
      if (typeof window !== "undefined" && !window.L) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
        document.head.appendChild(link);

        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
        script.onload = initializeMap;
        document.head.appendChild(script);
      } else if (window.L) {
        initializeMap();
      }
    };

    loadLeaflet();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setUserLocation(userPos);
          if (map) {
            map.setView(userPos, 13);

            const userIcon = window.L.divIcon({
              className: "user-location-marker",
              html: `
                <div style="
                  width: 20px; 
                  height: 20px; 
                  background: #3B82F6; 
                  border: 3px solid white; 
                  border-radius: 50%; 
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                "></div>
              `,
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            });

            window.L.marker(userPos, { icon: userIcon })
              .addTo(map)
              .bindPopup("Your Location")
              .openPopup();
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  };

  const initializeMap = () => {
    if (!mapRef.current || !window.L) return;

    const defaultCenter: [number, number] = userLocation || [40.758, -73.9855];

    const leafletMap = window.L.map(mapRef.current, {
      center: defaultCenter,
      zoom: 12,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    window.L.tileLayer(mapLayers[mapStyle].url, {
      attribution: mapLayers[mapStyle].attribution,
      maxZoom: 19,
    }).addTo(leafletMap);

    setMap(leafletMap);
    addPropertyMarkers(leafletMap);
    setIsLoading(false);
  };

  const addPropertyMarkers = (leafletMap: any) => {
    const newMarkers = properties.map((property) => {
      const propertyIcon = window.L.divIcon({
        className: "property-marker",
        html: `
          <div style="
            position: relative;
            width: 40px;
            height: 40px;
            background: #8B2131;
            border: 3px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(139, 33, 49, 0.4);
            cursor: pointer;
            transform: scale(1);
            transition: transform 0.2s ease;
          ">
            <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <div style="
              position: absolute;
              top: -8px;
              right: -8px;
              background: #DC2626;
              color: white;
              border-radius: 10px;
              padding: 2px 6px;
              font-size: 10px;
              font-weight: bold;
              min-width: 16px;
              text-align: center;
            ">${
              property.badge === "New Listing"
                ? "NEW"
                : property.badge === "Premium"
                ? "VIP"
                : "HOT"
            }</div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -35],
      });

      const marker = window.L.marker(property.coordinates, {
        icon: propertyIcon,
      }).addTo(leafletMap);

      const popupContent = `
        <div style="max-width: 280px; font-family: system-ui; padding: 8px;">
          <img src="${property.image}" alt="${property.title}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;"/>
          <div style="background: #8B2131; color: white; padding: 2px 8px; border-radius: 12px; font-size: 10px; font-weight: bold; display: inline-block; margin-bottom: 8px;">
            ${property.badge}
          </div>
          <h3 style="margin: 0 0 6px 0; color: #8B2131; font-size: 16px; font-weight: bold; line-height: 1.2;">${property.title}</h3>
          <p style="margin: 0 0 8px 0; color: #666; font-size: 13px;">📍 ${property.location}</p>
          <div style="display: flex; gap: 12px; margin-bottom: 8px; font-size: 11px; color: #666;">
            <span style="display: flex; align-items: center; gap: 2px;">🛏️ ${property.beds} Beds</span>
            <span style="display: flex; align-items: center; gap: 2px;">🛁 ${property.baths} Baths</span>
            <span style="display: flex; align-items: center; gap: 2px;">📐 ${property.sqft} sqft</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
            <span style="font-size: 18px; font-weight: bold; color: #8B2131;">${property.price}</span>
            <button onclick="window.selectProperty(${property.id})" style="
              background: #8B2131; 
              color: white; 
              border: none; 
              padding: 6px 12px; 
              border-radius: 6px; 
              cursor: pointer; 
              font-size: 11px; 
              font-weight: 500;
              transition: background 0.2s;
            " onmouseover="this.style.background='#7A1C2A'" onmouseout="this.style.background='#8B2131'">
              View Details
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: "custom-popup",
      });

      marker.on("click", () => {
        setSelectedProperty(property as Property);
      });

      return marker;
    });

    setMarkers(newMarkers);
  };

  useEffect(() => {
    window.selectProperty = (propertyId: number) => {
      const property = properties.find((p) => p.id === propertyId);
      if (property) {
        setSelectedProperty(property as Property);
      }
    };

    return () => {
      if ("selectProperty" in window) {
        delete (window as any).selectProperty;
      }
    };
  }, []);

  useEffect(() => {
    if (map) {
      map.eachLayer((layer: any) => {
        if (layer._url) {
          map.removeLayer(layer);
        }
      });

      window.L.tileLayer(mapLayers[mapStyle].url, {
        attribution: mapLayers[mapStyle].attribution,
        maxZoom: 19,
      }).addTo(map);

      markers.forEach((marker) => marker.addTo(map));
    }
  }, [mapStyle, map, markers]);

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      property.location.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <GlobalStyles />

      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: delays.medium }}
            >
              <h2 className="text-3xl sm:text-4xl dark:text-white mb-2">
                EXPLORE PROPERTIES
              </h2>
              <motion.div
                className="w-20 h-1 bg-gradient-to-r from-[#8B2131] to-[#B91C1C] rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.8,
                  delay: delays.medium,
                  ease: "easeOut",
                }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>

            <motion.div
              className="flex gap-3 flex-wrap"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: delays.medium }}
            >
              <Button
                onClick={getUserLocation}
                className="bg-[#8B2131] hover:bg-[#7A1C2A] text-white"
              >
                <MapPin className="h-4 w-4 mr-2" />
                My Location
              </Button>

              <select
                value={mapStyle}
                onChange={(e) => setMapStyle(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2131] dark:bg-gray-900 dark:border-gray-600 dark:text-white"
              >
                {Object.entries(mapLayers).map(([key, layer]) => (
                  <option key={key} value={key}>
                    {layer.name}
                  </option>
                ))}
              </select>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-[#8B2131] dark:bg-gray-900 hover:bg-[#8B2131] hover:text-white"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.small }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search properties by name or location..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2131] focus:border-transparent dark:bg-gray-900 dark:border-gray-600 dark:text-white"
              />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              className="lg:col-span-2 h-[600px] rounded-xl overflow-hidden shadow-lg relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: delays.medium }}
            >
              {isLoading && (
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B2131] mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Loading map...
                    </p>
                  </div>
                </div>
              )}
              <div ref={mapRef} className="w-full h-full" />
            </motion.div>

            <motion.div
              className="space-y-4 max-h-[600px] overflow-y-auto"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: delays.large }}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Properties ({filteredProperties.length})
              </h3>

              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedProperty(property as Property);
                    if (map) {
                      map.setView(property.coordinates, 15);
                    }
                  }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 dark:bg-gray-900">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={property.image}
                            alt={property.title}
                            fill
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <Badge className="absolute -top-2 -right-2 bg-[#8B2131] text-white text-xs">
                            {property.badge === "New Listing"
                              ? "NEW"
                              : property.badge === "Premium"
                              ? "VIP"
                              : "HOT"}
                          </Badge>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">
                            {property.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 text-xs mb-2">
                            📍 {property.location}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
                            <span className="flex items-center">
                              <Bed className="h-3 w-3 mr-1" />
                              {property.beds}
                            </span>
                            <span className="flex items-center">
                              <Bath className="h-3 w-3 mr-1" />
                              {property.baths}
                            </span>
                            <span className="flex items-center">
                              <Ruler className="h-3 w-3 mr-1" />
                              {property.sqft}
                            </span>
                          </div>
                          <div className="font-bold text-[#8B2131] dark:text-red-400 text-sm">
                            {property.price}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {selectedProperty && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden dark:bg-gray-900">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedProperty.title}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedProperty(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Image
                        src={selectedProperty.image}
                        alt={selectedProperty.title}
                        width={400}
                        height={256}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                      <div className="flex items-center gap-4 dark:text-white mb-4">
                        <span className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          {selectedProperty.beds} Beds
                        </span>
                        <span className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          {selectedProperty.baths} Baths
                        </span>
                        <span className="flex items-center">
                          <Ruler className="h-4 w-4 mr-1" />
                          {selectedProperty.sqft} sqft
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-[#8B2131] dark:text-red-400">
                        {selectedProperty.price}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Contact Agent
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-[#8B2131] rounded-full flex items-center justify-center text-white font-bold">
                            {selectedProperty.agent.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {selectedProperty.agent.name}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              Real Estate Agent
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <a
                            href={`tel:${selectedProperty.agent.phone}`}
                            className="flex items-center gap-2 text-[#8B2131] hover:underline"
                          >
                            <Phone className="h-4 w-4" />
                            {selectedProperty.agent.phone}
                          </a>
                          <a
                            href={`mailto:${selectedProperty.agent.email}`}
                            className="flex items-center gap-2 text-[#8B2131] hover:underline"
                          >
                            <Mail className="h-4 w-4" />
                            {selectedProperty.agent.email}
                          </a>
                        </div>

                        <div className="flex gap-2 pt-4">
                          <Button className="flex-1 bg-[#8B2131] text-white hover:bg-[#7A1C2A] cursor-pointer">
                            Schedule Tour
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 border-[#8B2131] hover:bg-[#8B2131] hover:text-white cursor-pointer"
                          >
                            Contact Agent
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default RealEstateLeafletMap;
