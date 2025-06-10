import { Property, Delays, MapLayers, ViewportOnce } from "@/lib/types";

export const properties: Property[] = [
  {
    id: 1,
    title: "Modern Downtown Loft",
    location: "Downtown District",
    price: "$850,000",
    beds: 3,
    baths: 2,
    sqft: "1,450",
    badgeColor: "bg-indigo-600",
    image: "/images/property1.jpg",
    coordinates: [40.758, -73.9855],
    badge: "New Listing",
    agent: {
      name: "Sarah Johnson",
      phone: "(555) 123-4567",
      email: "sarah@realestate.com",
    },
  },
  {
    id: 2,
    title: "Luxury Penthouse Suite",
    location: "Upper East Side",
    price: "$1,250,000",
    beds: 4,
    baths: 3,
    sqft: "2,100",
    badgeColor: "bg-indigo-600",
    image: "/images/image2.jpg",
    coordinates: [40.7736, -73.9566],
    badge: "Premium",
    agent: {
      name: "Michael Chen",
      phone: "(555) 987-6543",
      email: "michael@realestate.com",
    },
  },
  {
    id: 3,
    title: "Cozy Family Home",
    location: "Brooklyn Heights",
    price: "$675,000",
    badgeColor: "bg-indigo-600",
    beds: 2,
    baths: 2,
    sqft: "1,200",
    image: "/images/property.PNG",
    coordinates: [40.6962, -73.9969],
    badge: "Hot Deal",
    agent: {
      name: "Emily Rodriguez",
      phone: "(555) 456-7890",
      email: "emily@realestate.com",
    },
  },
];

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

export const delays: Delays = {
  small: 0.1,
  medium: 0.2,
  large: 0.3,
};

export const viewportOnce: ViewportOnce = {
  once: true,
};
