import type { LucideIcon } from "lucide-react"

export interface Property {
  id: number
  title: string
  location: string
  price: string
  beds: number
  baths: number
  sqft: string
  image: string
  badge: string
  badgeColor: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
}

export interface Project {
  id: string
  title: string
  location: string
  status: string
  launch: string
  description: string
  image: string
  badgeColor: string
}

export interface NavigationItem {
  name: string
  href: string
}

export interface Features {
  icon: LucideIcon
  title: string
  desc: string
}

export interface NewsItem {
  title: string
  description: string
  date: string
}

// lib/types/index.ts

// export interface Property {
//   id: number;
//   image: string;
//   title: string;
//   location: string;
//   beds: number;
//   baths: number;
//   sqft: string;
//   price: string;
//   badge: string;
//   badgeColor: string;
//   description?: string;
//   amenities?: string[];
//   yearBuilt?: number;
//   propertyType?: 'apartment' | 'villa' | 'townhouse' | 'penthouse';
//   status?: 'available' | 'sold' | 'reserved' | 'launching_soon';
//   featured?: boolean;
//   coordinates?: [number, number];
//   agent?: {
//     name: string;
//     phone: string;
//     email: string;
//   }
// }

export interface PropertyCardProps {
  property: Property;
  index: number;
  variant?: 'default' | 'compact' | 'featured';
  showStats?: boolean;
}

export interface PropertySectionProps {
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  maxItems?: number;
  variant?: 'grid' | 'carousel' | 'list';
}

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string | number[];
  stagger?: number;
}

export interface BadgeConfig {
  text: string;
  color: string;
  variant?: 'solid' | 'outline' | 'soft';
}

export interface PropertyFilters {
  priceRange?: [number, number];
  bedrooms?: number[];
  bathrooms?: number[];
  location?: string[];
  propertyType?: string[];
  status?: string[];
}

export interface PropertyStats {
  totalProperties: number;
  soldProperties: number;
  availableProperties: number;
  averagePrice: number;
  topLocation: string;
}

// API Response types
export interface PropertyResponse {
  data: Property[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface PropertyDetailsResponse {
  property: Property;
  similarProperties: Property[];
  agent: {
    id: string;
    name: string;
    phone: string;
    email: string;
    avatar: string;
  };
}

// Form types
export interface PropertyInquiryForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId: string;
  interestedIn: 'buying' | 'renting' | 'investment';
}

export interface PropertySearchForm {
  location: string;
  propertyType: string;
  bedrooms: number;
  minPrice: number;
  maxPrice: number;
  sortBy: 'price_asc' | 'price_desc' | 'date_new' | 'date_old';
}

export interface Agent {
  name: string;
  phone: string;
  email: string;
}

export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  coordinates?: [number, number]; // [lat, lng] for Leaflet
  badge: string;
  agent: Agent;
}

export interface MapLayer {
  name: string;
  url: string;
  attribution: string;
}

export interface MapLayers {
  [key: string]: MapLayer;
}

export interface Delays {
  small: number;
  medium: number;
  large: number;
}

export interface ViewportOnce {
  once: boolean;
}