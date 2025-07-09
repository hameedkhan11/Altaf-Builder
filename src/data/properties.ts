import { 
  Delays, 
  ViewportOnce, 
  PropertySection, 
  PropertyData, 
  PropertyImages, 
  Project // Add this import
} from "@/lib/types";

export const delays: Delays = {
  small: 0.1,
  medium: 0.2,
  large: 0.3,
};

export const viewportOnce: ViewportOnce = {
  once: true,
};

export const propertySections: PropertySection[] = [
  {
    id: 'properties',
    title: 'Our Properties',
    image: 'imgi_4_FRONT_EXTERIOR_VIEW_1_yivycn',
    alt: 'Luxury living room with modern furniture'
  },
  {
    id: 'transactions',
    title: 'Past Transactions',
    image: 'imgi_3_5_Bed_Villa_Revised_Front_Closeup_pkdtfq',
    alt: 'Modern room with fireplace and large windows'
  },
  {
    id: 'connect',
    title: "Let's Connect",
    image: 'imgi_2_EXTERIOR_FRONT_STREET_VIEW_REVISED_vajrlu',
    alt: 'Elegant dining area with natural lighting'
  }
];

// Property data configuration - now using PropertyDetail interface
export const properties: PropertyData = {
  "1bed": {
    name: "1 Bedroom Apartment",
    size: 850,
    rate: 16500,
    totalPrice: "PKR 14,000,000",
    downPayment: 3500000,
    quarterlyInstallment: 650000,
    bedrooms: 1,
    bathrooms: 1,
    type: "Apartment",
  },
  "2bed": {
    name: "2 Bedroom Apartment",
    size: 1600,
    rate: 16500,
    totalPrice: "PKR 26,400,000",
    downPayment: 6600000,
    quarterlyInstallment: 1200000,
    bedrooms: 2,
    bathrooms: 2,
    type: "Apartment",
  },
};

// Project data for listings - using Project interface
export const projectsData: Project[] = [
  {
    id: 1,
    title: "Modern Apartment",
    image: "imgi_2_EXTERIOR_FRONT_STREET_VIEW_REVISED_vajrlu",
    price: "PKR 14,000,000",
    bedrooms: 1,
    bathrooms: 1,
    propertyType: "1bed",
  },
  {
    id: 2,
    title: "Luxury Villa",
    image: "imgi_3_5_Bed_Villa_Revised_Front_Closeup_pkdtfq",
    price: "PKR 26,400,000",
    bedrooms: 2,
    bathrooms: 2,
    propertyType: "2bed",
  },
];

// Property images configuration - separate images for each property type
export const propertyImages: PropertyImages = {
  "1bed": [
    // 1 Bedroom specific images
    "1bed_living_room_main_view",
    "1bed_bedroom_interior",
    "1bed_kitchen_modern",
    "1bed_bathroom_luxury",
    "1bed_balcony_view",
    "1bed_full_apartment_layout",
  ],
  "2bed": [
    // 2 Bedroom specific images
    "2bed_living_room_spacious",
    "2bed_master_bedroom",
    "2bed_second_bedroom",
    "2bed_kitchen_large",
    "2bed_master_bathroom",
    "2bed_guest_bathroom",
    "2bed_dining_area",
    "2bed_balcony_extended",
  ],
};

// For now, using the same images as placeholders
// Replace these with actual property-specific images
export const propertyImagesPlaceholder: PropertyImages = {
  "1bed": [
    "imgi_78_dfb9ac_34468846da884feead85444c7f67109e_mv2_gpojmi",
    "imgi_74_dfb9ac_bf45c2213f714183ac8e5cb546522fbe_mv2_b1wr5x",
    "imgi_79_dfb9ac_2d546b3c53224f6f90915724bb5d43aa_mv2_azmxnx",
    "imgi_71_dfb9ac_5369d7dae3ed4aa9a06786810dc0246c_mv2_u6lj56",
    "imgi_63_dfb9ac_9a8bef4f20f746ce8b139ed6799e07f7_mv2_exinou",
    "imgi_73_dfb9ac_9cbdb4a986e242eea82476253ff63fea_mv2_jirbqo",
  ],
  "2bed": [
    "gallery1_vg6dir",
    "imgi_87_18jLYFnp8jmIsqpvfqRCg9ukDM_lvujpo",
    "imgi_89_e7vHmyk3naIt1aqkQMnTzkZ50_tjrfnt",
    "imgi_85_JgYj8FG9L6uiD6VOjPu5xjCB3Y_y4sjvl",
    "imgi_9_qgG1AP8AAn8GWNRnGRf5ntxEvLM_czejfu",
    "pexels-heyho-6283973_iw2mbg",
  ],
};