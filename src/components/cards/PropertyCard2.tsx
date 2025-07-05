import { PropertySection } from '@/lib/types';
import { CldImage } from 'next-cloudinary';

interface PropertyCardProps {
  section: PropertySection;
  index: number;
}

export const PropertyCard2 = ({ section, index }: PropertyCardProps) => {
  return (
    <div className="group relative overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:flex-[1.7] flex-1 min-h-[200px]">
      <div className="h-full relative">
        <CldImage
          src={section.image}
          alt={section.alt}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />
        <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4 sm:p-6 lg:p-8">
          <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide text-center transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
            {section.title}
          </h3>
        </div>
      </div>
    </div>
  );
};