import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bed,
  Bath,
  Square,
  Calendar,
  DollarSign,
  Home,
} from "lucide-react";
import { PropertyDetail } from "@/lib/types"; // Changed from Property to PropertyDetail

interface PropertyDetailInfoProps {
  property: PropertyDetail; // Changed from Property to PropertyDetail
}

export const PropertyDetailInfo: React.FC<PropertyDetailInfoProps> = ({ property }) => {
  const formatPriceFull = (price: number): string => {
    return `PKR ${price.toLocaleString()}`;
  };

  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">{property.name}</h1>
        <p className="text-lg mb-4">Starting from</p>
        <div className="text-4xl font-bold text-gray-900 mb-6">
          {property.totalPrice}
        </div>
      </div>

      {/* Property Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="mb-1 ">Bedrooms</div>
          <div className="text-2xl flex items-center justify-center gap-1 ">
            <Bed className="w-5 h-5" />
            {property.bedrooms}
          </div>
        </div>
        <div className="text-center">
          <div className=" mb-1">Bathrooms</div>
          <div className="text-2xl flex items-center justify-center gap-1 ">
            <Bath className="w-5 h-5" />
            {property.bathrooms}
          </div>
        </div>
        <div className="text-center">
          <div className=" mb-1">SQFT</div>
          <div className="text-2xl flex items-center justify-center gap-1">
            <Square className="w-5 h-5" />
            {property.size}
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
                {property.type}
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
                Rate: PKR {property.rate}/sqft
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
              <span className="">Size</span>
              <span className=" font-semibold">
                {property.size} sqft
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="">Rate per sqft</span>
              <span className="font-semibold ">
                PKR {property.rate.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center border-t pt-3">
              <span className="">Total Price</span>
              <span className="font-semibold text-lg ">
                {property.totalPrice}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className=" ">Down Payment (25%)</span>
              <span className="font-semibold  text-lg">
                {formatPriceFull(property.downPayment)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="">
                Each Quarterly Installment
              </span>
              <span className=" text-lg font-semibold">
                {formatPriceFull(property.quarterlyInstallment)}
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
  );
};