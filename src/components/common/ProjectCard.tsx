import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  image: string;
  title: string;
  price?: string;
  bedrooms?: number;
  bathrooms?: number;
  location?: string;
}

export const ProjectCard = ({ 
  image, 
  title, 
  price = "$450,000",
  bedrooms = 4,
  bathrooms = 4,
  location = "Villa"
}: ProjectCardProps) => {
  return (
    <Card className="w-full bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Image Container */}
      <CardHeader className="p-0 relative group">
        <div className="relative w-full h-[360px] overflow-hidden cursor-pointer rounded-xl">
          <Image
            src={image}
            alt={title}
            width={800}
            height={400}
            className="w-full h-full object-cover transition-all duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={false}
          />
          
          {/* Overlay that appears on hover */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            {/* View Apartment text and icon at bottom */}
            <div className="flex justify-between items-center">
              <span className="text-white text-xl font-bold">View Apartment</span>
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Content Container */}
      <CardContent className="p-6 space-y-4">
        {/* Price */}
        <div>
          <p className="text-md font-bold mb-1">Price</p>
          <h3 className="text-2xl font-bold">{price}</h3>
        </div>

        {/* Property Details */}
        <div className="space-y-3">
          {/* Bedrooms */}
          <div className="flex justify-between items-center">
            <span className="font-bold">Bedrooms</span>
            <span className="font-bold ">{bedrooms}</span>
          </div>

          {/* Bathrooms */}
          <div className="flex justify-between items-center">
            <span className=" font-bold">Bathrooms</span>
            <span className="font-bold ">{bathrooms}</span>
          </div>

          {/* Location */}
          <div className="flex justify-between items-center">
            <span className=" font-bold">Location</span>
            <span className="font-bold">{location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};