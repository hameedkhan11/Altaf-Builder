// hooks/useMap.ts
import { useState, useEffect, useRef, useCallback } from "react";
import { MapStyle, Property, LeafletMap, LeafletMarker } from "@/lib/types";
import {
  mapLayers,
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  PROPERTY_VIEW_ZOOM,
} from "../lib/mapConstants/types";
import {
  loadLeaflet,
  createPropertyIcon,
  createPopupContent,
} from "../lib/utils/mapUtils";

interface UseMapProps {
  properties: Property[];
  userLocation: [number, number] | null;
  mapStyle: MapStyle;
  onPropertySelect: (property: Property) => void;
}

interface UseMapReturn {
  mapRef: React.RefObject<HTMLDivElement>;
  map: LeafletMap | null;
  markers: LeafletMarker[];
  isLoading: boolean;
  initializeMap: () => void;
  addPropertyMarkers: (leafletMap: LeafletMap) => void;
  updateMapStyle: () => void;
  centerOnProperty: (property: Property) => void;
}

export const useMap = ({
  properties,
  userLocation,
  mapStyle,
  onPropertySelect,
}: UseMapProps): UseMapReturn => {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const [markers, setMarkers] = useState<LeafletMarker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);

  // Initialize Leaflet Map
  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.L) return;

    const defaultCenter = userLocation || DEFAULT_MAP_CENTER;

    const leafletMap = window.L.map(mapRef.current, {
      center: defaultCenter,
      zoom: DEFAULT_MAP_ZOOM,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    // Add tile layer
    window.L.tileLayer(mapLayers[mapStyle].url, {
      attribution: mapLayers[mapStyle].attribution,
      maxZoom: 19,
    }).addTo(leafletMap);

    setMap(leafletMap);
    addPropertyMarkers(leafletMap);
    setIsLoading(false);
  }, [userLocation, mapStyle]);

  // Add markers for properties
  const addPropertyMarkers = useCallback(
    (leafletMap: LeafletMap) => {
      const newMarkers = properties.map((property) => {
        const propertyIcon = createPropertyIcon(property);
        const popupContent = createPopupContent(property);

        const marker = window.L.marker(property.coordinates, {
          icon: propertyIcon,
        }).addTo(leafletMap);

        marker.bindPopup(popupContent, {
          maxWidth: 300,
          className: "custom-popup",
        });

        marker.on("click", () => {
          onPropertySelect(property);
        });

        return marker;
      });

      setMarkers(newMarkers);
    },
    [properties, onPropertySelect]
  );

  // Update map tiles when style changes
  const updateMapStyle = useCallback(() => {
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

      // Re-add markers
      markers.forEach((marker) => marker.addTo(map));
    }
  }, [map, mapStyle, markers]);

  // Center map on specific property
  const centerOnProperty = useCallback(
    (property: Property) => {
      if (map && property.coordinates) {
        map.setView(property.coordinates, PROPERTY_VIEW_ZOOM);
      }
    },
    [map]
  );

  // Load Leaflet on component mount
  useEffect(() => {
    loadLeaflet(initializeMap);
  }, [initializeMap]);

  // Update map style when changed
  useEffect(() => {
    updateMapStyle();
  }, [updateMapStyle]);

  // Setup global selectProperty function
  useEffect(() => {
    window.selectProperty = (propertyId: number) => {
      const property = properties.find((p) => p.id === propertyId);
      if (property) {
        onPropertySelect(property);
      }
    };

   return () => {
  if ('selectProperty' in window) {
    delete (window as any)['selectProperty'];
  }
};
  }, [properties, onPropertySelect]);

  return {
    mapRef: mapRef as React.RefObject<HTMLDivElement>,
    map,
    markers,
    isLoading,
    initializeMap,
    addPropertyMarkers,
    updateMapStyle,
    centerOnProperty,
  };
};
