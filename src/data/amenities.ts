// data/amenities.ts
import { AmenitiesData } from "@/lib/types";

export const amenitiesData: AmenitiesData = {
  'shopping-mall': {
    id: 'shopping-mall',
    name: 'Shopping Mall',
    title: 'Zim Cyber City Mall',
    description: 'Explore the Zim Cyber City Mall, where luxury meets convenience. Our mall offers a variety of high-end retail stores, dining options, and entertainment venues, creating a vibrant shopping experience. Discover the latest fashion, enjoy gourmet meals, and unwind with premium entertainment in Zimbabwe\'s premier smart city.',
    image: '/images/apartment1.jpeg',
    features: ['High-end retail stores', 'Gourmet dining options', 'Entertainment venues', 'Premium shopping experience']
  },
  'health-club': {
    id: 'health-club',
    name: 'Health Club',
    title: 'Premium Fitness Center',
    description: 'State-of-the-art fitness facilities equipped with modern equipment, personal trainers, spa services, and wellness programs. Maintain your health and fitness goals with our world-class amenities.',
    image: '/images/apartment4.jpeg',
    features: ['Modern gym equipment', 'Personal trainers', 'Spa services', 'Wellness programs']
  },
  'coworking-offices': {
    id: 'coworking-offices',
    name: 'Co-working & Private Offices',
    title: 'Modern Workspace Solutions',
    description: 'Flexible workspace solutions with high-speed internet, meeting rooms, private offices, and collaborative spaces. Perfect for entrepreneurs, freelancers, and businesses looking for premium office environments.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    features: ['High-speed internet', 'Private offices', 'Meeting rooms', 'Collaborative spaces']
  },
  'restaurants': {
    id: 'restaurants',
    name: 'Restaurants',
    title: 'Fine Dining Experience',
    description: 'Diverse culinary experiences featuring international and local cuisines, fine dining restaurants, casual eateries, and specialty food courts. Satisfy your taste buds with our premium dining options.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    features: ['International cuisine', 'Fine dining', 'Casual eateries', 'Specialty food courts']
  },
  'clubhouse': {
    id: 'clubhouse',
    name: 'Clubhouse',
    title: 'Exclusive Social Hub',
    description: 'Premium social and recreational facilities including event spaces, lounges, game rooms, and outdoor terraces. The perfect place to relax, socialize, and host private events.',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    features: ['Event spaces', 'Luxury lounges', 'Game rooms', 'Outdoor terraces']
  },
  'all-amenities': {
    id: 'all-amenities',
    name: 'All Amenities',
    title: 'Complete Lifestyle Package',
    description: 'Experience the full range of world-class amenities designed for modern living. From fitness and wellness to shopping and dining, everything you need is at your doorstep in Zimbabwe\'s premier smart city development.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    features: ['Comprehensive facilities', 'Smart city technology', 'Sustainable living', 'Premium lifestyle']
  }
};