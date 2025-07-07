import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

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
  price = "14,000,000",
  bedrooms = 1,
  bathrooms = 1,
  // location = "Faisal Hills",
}: ProjectCardProps) => {
  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Image Container */}
      <CardHeader className="p-0 relative group">
        <Link
          href={`/property-detail`}
          className="relative w-full h-[460px] overflow-hidden cursor-pointer rounded-xs"
        >
          <CldImage
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
              <span className="text-white text-xl font-bold font-optima">
                View Apartment
              </span>
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </Link>
      </CardHeader>

      {/* Content Container */}
      <CardContent className="p-6 space-y-4">
        {/* Property Details */}
        <div className="space-y-12 grid grid-cols-3">
          {/* Price */}
          <div>
            <p className="text-xl mb-1">Price</p>
            <span className="text-2xl ">{price}</span>
          </div>
          {/* Bedrooms */}
          <div className="flex flex-col items-center">
            <span className="font-optima text-xl">Bedrooms</span>
            <span className=" font-optima text-2xl">
              {bedrooms}
            </span>
          </div>

          {/* Bathrooms */}
          <div className="flex flex-col items-center">
            <span className=" font-optima text-xl">Bathrooms</span>
            <span className="text-2xl font-optima">{bathrooms}</span>
          </div>

          {/* Location */}
          {/* <div className="flex flex-col justify-between items-center">
            <span className="text-xl font-optima">Location</span>
            <span className="text-xl font-optima">{location}</span>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
};
