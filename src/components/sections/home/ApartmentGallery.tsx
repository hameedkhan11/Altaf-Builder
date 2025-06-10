// "use client";
// import React, { useState } from 'react';
// import Image from 'next/image';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const PropertyGallery = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Property data matching the reference design
//   const properties = [
//     {
//       id: 1,
//       type: "Townhouses",
//       title: "Townhouses",
//       image: "/images/apartment1.jpeg",
//       startingPrice: "$200,000",
//       description: "Modern townhouses with contemporary design"
//     },
//     {
//       id: 2,
//       type: "Apartments",
//       title: "Apartments", 
//       image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
//       startingPrice: "$120,000",
//       description: "Luxury apartments with premium amenities"
//     },
//     {
//       id: 3,
//       type: "Townhouses",
//       title: "Townhouses",
//       image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
//       startingPrice: "$250,000",
//       description: "Spacious family townhouses"
//     },
//     {
//       id: 4,
//       type: "Apartments",
//       title: "Apartments",
//       image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
//       startingPrice: "$150,000",
//       description: "Contemporary apartment living"
//     }
//   ];

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev + 2) % properties.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev - 2 + properties.length) % properties.length);
//   };

//   const visibleProperties = [
//     properties[currentIndex],
//     properties[(currentIndex + 1) % properties.length]
//   ];

//   return (
//     <div className="min-h-screen bg-white py-16 px-16 relative">
//       <div className="max-w-8xl mx-auto relative z-10">
//         {/* Navigation Buttons */}
//         <div className="flex justify-center gap-4 mb-12">
//           <Button
//             onClick={prevSlide}
//             variant="outline"
//             size="icon"
//             className="rounded-full h-12 w-12 shadow-lg hover:shadow-xl transition-all duration-300"
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </Button>
          
//           <Button
//             onClick={nextSlide}
//             variant="outline"
//             size="icon"
//             className="rounded-full h-12 w-12 shadow-lg hover:shadow-xl transition-all duration-300"
//           >
//             <ChevronRight className="w-6 h-6" />
//           </Button>
//         </div>

//         {/* Property Cards Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
//           {visibleProperties.map((property) => (
//             <Card key={property.id} className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 border-0">
//               {/* Image Container */}
//               <div className="relative h-80 overflow-hidden rounded-3xl">
//                 <Image
//                   src={property.image}
//                   alt={property.title}
//                   fill
//                   className="object-cover transition-all duration-700 group-hover:scale-105"
//                   sizes="(max-width: 1024px) 100vw, 50vw"
//                 />
                
//                 {/* Subtle overlay for better text readability */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//               </div>

//               {/* Card Content */}
//               <CardContent className="p-8">
//                 {/* Starting Price */}
//                 <p className="text-gray-600 text-lg mb-2 font-medium">
//                   Starting from {property.startingPrice}
//                 </p>
                
//                 {/* Property Type Title */}
//                 <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 group-hover:text-gray-700 transition-colors duration-300">
//                   {property.title}
//                 </h2>
                
//                 {/* Description */}
//                 <p className="text-gray-600 text-base leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-200">
//                   {property.description}
//                 </p>
//               </CardContent>

//               {/* Hover Effects */}
//               <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-gray-200 transition-all duration-500 pointer-events-none"></div>
//             </Card>
//           ))}
//         </div>

//         {/* Slide Indicators */}
//         <div className="flex justify-center gap-3 mt-12">
//           {Array.from({ length: Math.ceil(properties.length / 2) }).map((_, index) => (
//             <Button
//               key={index}
//               onClick={() => setCurrentIndex(index * 2)}
//               variant="ghost"
//               size="sm"
//               className={`w-3 h-3 rounded-full p-0 transition-all duration-300 ${
//                 Math.floor(currentIndex / 2) === index
//                   ? 'bg-gray-800 scale-110'
//                   : 'bg-gray-300 hover:bg-gray-400'
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyGallery;