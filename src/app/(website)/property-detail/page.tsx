"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  // X,
  Bed,
  Bath,
  Square,
  // MapPin,
  Calendar,
  DollarSign,
  Home,
  // Shield,
  // Wifi,
  // Car,
  // Droplets,
  // Zap,
} from "lucide-react";
import { CldImage } from "next-cloudinary";
// React Icons imports
import {
  FaHome,
  FaDumbbell,
  FaChild,
  FaCouch,
  FaUtensils,
  FaSwimmingPool,
  FaComments,
  FaUsers,
} from "react-icons/fa";
import { Hero } from "@/components/common/Hero";
import { RegisterHero } from "@/components/register-form/hero-section";

// Types
interface Property {
  name: string;
  size: number;
  rate: number;
  totalPrice: string;
  downPayment: number;
  quarterlyInstallment: number;
  bedrooms: number;
  bathrooms: number;
  type: string;
}

type PropertyKey = "1bed" | "2bed" | "5bed";

interface PropertyData {
  [key: string]: Property;
}

const PropertyDetailSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedProperty] = useState<PropertyKey>("1bed");

  // Sample images - replace with actual property images
  const propertyImages: string[] = [
    "imgi_78_dfb9ac_34468846da884feead85444c7f67109e_mv2_gpojmi",
    "imgi_74_dfb9ac_bf45c2213f714183ac8e5cb546522fbe_mv2_b1wr5x",
    "imgi_79_dfb9ac_2d546b3c53224f6f90915724bb5d43aa_mv2_azmxnx",
    "imgi_71_dfb9ac_5369d7dae3ed4aa9a06786810dc0246c_mv2_u6lj56",
    "imgi_63_dfb9ac_9a8bef4f20f746ce8b139ed6799e07f7_mv2_exinou",
    "imgi_73_dfb9ac_9cbdb4a986e242eea82476253ff63fea_mv2_jirbqo",
  ];

  const properties: PropertyData = {
    "1bed": {
      name: "1 Bedroom Apartment",
      size: 850,
      rate: 16500,
      totalPrice: "14,000,000",
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
      totalPrice: "26,400,000",
      downPayment: 6600000,
      quarterlyInstallment: 1200000,
      bedrooms: 2,
      bathrooms: 2,
      type: "Apartment",
    },
  };

  const currentProperty: Property = properties[selectedProperty];

  const nextImage = (): void => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length);
  };

  const prevImage = (): void => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + propertyImages.length) % propertyImages.length
    );
  };

  const toggleFullscreen = (): void => {
    setIsFullscreen(!isFullscreen);
  };

  //   const formatPrice = (price: number): string => {
  //     if (price >= 1000000) {
  //       return `${(price / 1000000).toFixed(1)}M`;
  //     } else if (price >= 1000) {
  //       return `${(price / 1000).toFixed(0)}K`;
  //     }
  //     return `${price.toLocaleString()}`;
  //   };

  const formatPriceFull = (price: number): string => {
    return `PKR ${price.toLocaleString()}`;
  };

  // Property amenities data
  const propertyAmenities = [
    {
      icon: <FaHome className="w-8 h-8 text-[rgb(140,46,71)]" />,
      label: "CLUB HOUSE",
    },
    {
      icon: <FaDumbbell className="w-8 h-8 text-[rgb(140,46,71)]" />,
      label: "FULLY EQUIPPED GYM",
    },
    {
      icon: <FaChild className="w-8 h-8 text-[rgb(140,46,71)]" />,
      label: "KID'S PLAY GROUND",
    },
    {
      icon: <FaCouch className="w-8 h-8 text-[rgb(140,46,71)]" />,
      label: "SITTING AREA",
    },
    {
      icon: <FaUtensils className="w-8 h-8 text-[rgb(140,46,71)]" />,
      label: "BBQ AREA",
    },
    {
      icon: <FaSwimmingPool className="w-8 h-8 text-[rgb(140,46,71)]" />,
      label: "ROOFTOP INFINITY POOL",
    },
    {
      icon: <FaComments className="w-8 h-8 text-[rgb(140,46,71)]" />,
      label: "OUTDOOR DINING",
    },
    {
      icon: <FaUsers className="w-8 h-8 text-[rgb(140,46,71)]" />,
      label: "MEETING AREA",
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero
        backgroundType="image"
        backgroundSrc="Booking1_rg1bhs"
        fallbackImage="luxury-apartment-hero-gallery"
        height="half"
        overlay="gradient"
        contentAlignment="center"
        enableParallax={true}
        parallaxSpeed={0.3}
        title="Property Detail"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Property Detail", href: "/property-detail" },
        ]}
      />
      <div className="mx-auto mt-24 px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Image Gallery - 60% width */}
          <div className="lg:col-span-3 space-y-4">
            {/* Main Image */}
            <div className="relative group min-h-1/3">
              <div className="relative overflow-hidden rounded-lg bg-white shadow-lg cursor-pointer">
                <CldImage
                  width={800}
                  height={600}
                  src={propertyImages[currentImageIndex]}
                  alt={`Property view ${currentImageIndex + 1}`}
                  className="w-full object-cover"
                  onClick={toggleFullscreen}
                />

                {/* Navigation Arrows */}
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {propertyImages.length}
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {propertyImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                    index === currentImageIndex
                      ? "border-blue-500"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <CldImage
                    width={200}
                    height={150}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Property Details - 40% width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl mb-2">{currentProperty.name}</h1>
              <p className="text-lg mb-4">Starting from</p>
              <div className="text-4xl font-bold text-gray-900 mb-6">
                {currentProperty.totalPrice}
              </div>
            </div>

            {/* Property Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="mb-1 font-optima">Bedrooms</div>
                <div className="text-2xl flex items-center justify-center gap-1 font-optima">
                  <Bed className="w-5 h-5" />
                  {currentProperty.bedrooms}
                </div>
              </div>
              <div className="text-center">
                <div className="font-optima mb-1">Bathrooms</div>
                <div className="text-2xl flex items-center justify-center gap-1 font-optima">
                  <Bath className="w-5 h-5" />
                  {currentProperty.bathrooms}
                </div>
              </div>
              <div className="text-center">
                <div className="font-optima mb-1">SQFT</div>
                <div className="text-2xl flex items-center justify-center gap-1">
                  <Square className="w-5 h-5" />
                  {currentProperty.size}
                </div>
              </div>
            </div>

            {/* Key Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg mb-4">Key Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-gray-500" />
                    <span className="px-2 py-1 bg-gray-100 rounded-full">
                      {currentProperty.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="px-2 py-1 bg-gray-100 rounded-full">
                      Newly Built
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="px-2 py-1 bg-gray-100 rounded-full">
                      Rate: PKR {currentProperty.rate}/sqft
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square className="w-4 h-4 text-gray-500" />
                    <span className="px-2 py-1 bg-gray-100 rounded-full">
                      Open Plan
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl  mb-4">Pricing Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-optima">Size</span>
                    <span className="font-optima font-semibold">
                      {currentProperty.size} sqft
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-optima">Rate per sqft</span>
                    <span className="font-semibold font-optima">
                      PKR {currentProperty.rate.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-3">
                    <span className="font-optima">Total Price</span>
                    <span className="font-semibold text-lg font-optima">
                      {currentProperty.totalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className=" font-optima">Down Payment (25%)</span>
                    <span className="font-semibold font-optima text-lg">
                      {formatPriceFull(currentProperty.downPayment)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-optima">
                      Each Quarterly Installment
                    </span>
                    <span className="font-optima text-lg font-semibold">
                      {formatPriceFull(currentProperty.quarterlyInstallment)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <Button className="flex-1 bg-[] hover:bg-[#8B2131] text-white py-6">
                Schedule a Tour
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-[#B91C1C] text-[#B91C1C] hover:bg-[#B91C1C] hover:text-white py-3"
              >
                Get More Info
              </Button>
            </div>
          </div>
        </div>

        {/* What this property offers - Full Width */}
        <div className="mt-24">
          <div className="text-center mb-8">
            <h3 className="text-3xl mb-4">What this property offers</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 gap-y-8  mx-auto mt-12">
            {propertyAmenities.map((amenity, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full border-2 border-[rgb(140,46,71)] flex items-center justify-center mb-4">
                  {amenity.icon}
                </div>
                <span className="text-sm font-medium  font-optima leading-tight">
                  {amenity.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Overview Section */}
        <div className="mt-12">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl mb-4">Overview</h2>
              <p className="font-optimaleading-relaxed">
                Designed for larger families or those who desire the utmost in
                space and sophistication. These{" "}
                {currentProperty.name.toLowerCase()}s offer extensive amenities
                and room for both relaxation and entertainment. Located in the
                heart of New Mount Hampden City, Altaf Development provides a
                premium living experience with state-of-the-art facilities,
                smart home technology, and sustainable design principles. Each
                unit is thoughtfully designed with high-end finishes, spacious
                layouts, and modern conveniences that cater to contemporary
                lifestyle needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <RegisterHero />
    </div>
  );
};

export default PropertyDetailSection;
