// lib/utils/propertyUtils.ts

import { Property, PropertyFilters, PropertyStats } from '@/lib/types';

/**
 * Format price with currency
 */
export const formatPrice = (price: string): string => {
  // Remove existing currency and format
  const numericPrice = price.replace(/[^\d,]/g, '');
  return `AED ${numericPrice}`;
};

/**
 * Generate optimized Unsplash image URL
 */
export const getOptimizedImageUrl = (
  imageId: string, 
  width: number = 800, 
  height: number = 600
): string => {
  return `https://images.unsplash.com/${imageId}?w=${width}&h=${height}&fit=crop&crop=entropy&auto=format&q=80`;
};

/**
 * Get badge color classes based on badge type
 */
export const getBadgeColorClass = (badge: string): string => {
  const badgeColors: Record<string, string> = {
    'NEW': 'bg-green-600',
    'HOT': 'bg-red-600',
    'LUXURY': 'bg-purple-600',
    'FEATURED': 'bg-blue-600',
    'SOLD OUT': 'bg-gray-600',
    'EXCLUSIVE': 'bg-indigo-600',
    'PREMIUM': 'bg-yellow-600',
    'LAUNCHING SOON': 'bg-orange-600'
  };
  
  return badgeColors[badge.toUpperCase()] || 'bg-gray-600';
};

/**
 * Filter properties based on criteria
 */
export const filterProperties = (
  properties: Property[], 
  filters: PropertyFilters
): Property[] => {
  return properties.filter(property => {
    // Price range filter
    if (filters.priceRange) {
      const price = parseInt(property.price.replace(/[^\d]/g, ''));
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        return false;
      }
    }

    // Bedrooms filter
    if (filters.bedrooms && filters.bedrooms.length > 0) {
      if (!filters.bedrooms.includes(property.beds)) {
        return false;
      }
    }

    // Location filter
    if (filters.location && filters.location.length > 0) {
      const matches = filters.location.some(location => 
        property.location.toLowerCase().includes(location.toLowerCase())
      );
      if (!matches) return false;
    }

    return true;
  });
};

/**
 * Sort properties by different criteria
 */
export const sortProperties = (
  properties: Property[], 
  sortBy: string
): Property[] => {
  const sorted = [...properties];
  
  switch (sortBy) {
    case 'price_asc':
      return sorted.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
        const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
        return priceA - priceB;
      });
    
    case 'price_desc':
      return sorted.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
        const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
        return priceB - priceA;
      });
    
    case 'beds_asc':
      return sorted.sort((a, b) => a.beds - b.beds);
    
    case 'beds_desc':
      return sorted.sort((a, b) => b.beds - a.beds);
    
    default:
      return sorted;
  }
};

/**
 * Calculate property statistics
 */
export const calculatePropertyStats = (properties: Property[]): PropertyStats => {
  const totalProperties = properties.length;
  const soldProperties = properties.filter(p => p.badge === 'SOLD OUT').length;
  const availableProperties = totalProperties - soldProperties;
  
  // Calculate average price
  const totalPrice = properties.reduce((sum, property) => {
    const price = parseInt(property.price.replace(/[^\d]/g, ''));
    return sum + price;
  }, 0);
  const averagePrice = totalPrice / totalProperties;
  
  // Find top location
  const locationCounts: Record<string, number> = {};
  properties.forEach(property => {
    const location = property.location.split(',')[0].trim();
    locationCounts[location] = (locationCounts[location] || 0) + 1;
  });
  
  const topLocation = Object.entries(locationCounts)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || '';

  return {
    totalProperties,
    soldProperties,
    availableProperties,
    averagePrice,
    topLocation
  };
};

/**
 * Get featured properties
 */
export const getFeaturedProperties = (
  properties: Property[], 
  count: number = 6
): Property[] => {
  return properties
    .filter(property => property.featured || property.badge === 'FEATURED')
    .slice(0, count);
};

/**
 * Get similar properties based on price and location
 */
export const getSimilarProperties = (
  targetProperty: Property,
  allProperties: Property[],
  count: number = 3
): Property[] => {
  const targetPrice = parseInt(targetProperty.price.replace(/[^\d]/g, ''));
  const priceRange = targetPrice * 0.3; // 30% price tolerance
  
  return allProperties
    .filter(property => 
      property.id !== targetProperty.id &&
      property.location === targetProperty.location
    )
    .filter(property => {
      const price = parseInt(property.price.replace(/[^\d]/g, ''));
      return Math.abs(price - targetPrice) <= priceRange;
    })
    .slice(0, count);
};

/**
 * Generate property URL slug
 */
export const generatePropertySlug = (property: Property): string => {
  return `${property.title.toLowerCase().replace(/\s+/g, '-')}-${property.id}`;
};

/**
 * Parse property slug to get ID
 */
export const parsePropertySlug = (slug: string): string => {
  return slug.split('-').pop() || '';
};

/**
 * Validate property data
 */
export const validateProperty = (property: Partial<Property>): boolean => {
  return !!(
    property.title &&
    property.location &&
    property.price &&
    property.beds &&
    property.baths &&
    property.image
  );
};