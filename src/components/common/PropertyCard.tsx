import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bed, Bath, Ruler } from 'lucide-react'
import { Property } from '@/lib/types'

interface PropertyCardProps {
  property: Property
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-500">
      <div className="relative h-64">
        <Image 
          src={property.image} 
          alt={property.title}
          fill
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className={`absolute top-4 right-4 ${property.badgeColor} text-white`}>
          {property.badge}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{property.title}</h3>
        <p className="text-muted-foreground mb-4">{property.location}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Bed className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-sm">{property.beds} Beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-sm">{property.baths} Baths</span>
            </div>
            <div className="flex items-center">
              <Ruler className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-sm">{property.sqft} sqft</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">{property.price}</div>
          <Button>View Details</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default PropertyCard