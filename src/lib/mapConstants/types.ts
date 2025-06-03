// constants/mapConstants.ts
import { MapLayers, AnimationDelays, ViewportOptions } from "../types";

// Map tile layers
export const mapLayers: MapLayers = {
  street: {
    name: "Street",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "© OpenStreetMap contributors",
  },
  satellite: {
    name: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "© Esri",
  },
  terrain: {
    name: "Terrain",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: "© OpenTopoMap",
  },
};

// Animation constants
export const delays: AnimationDelays = {
  small: 0.1,
  medium: 0.2,
  large: 0.3,
};

export const viewportOnce: ViewportOptions = { once: true };

// Default map settings
export const DEFAULT_MAP_CENTER: [number, number] = [40.758, -73.9855]; // NYC
export const DEFAULT_MAP_ZOOM = 12;
export const PROPERTY_VIEW_ZOOM = 15;

// Leaflet CDN URLs
export const LEAFLET_CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
export const LEAFLET_JS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
