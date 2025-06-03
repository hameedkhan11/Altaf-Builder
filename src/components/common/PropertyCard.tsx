"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bed, Bath, Ruler } from 'lucide-react'
import { Property } from '@/lib/types'

interface PropertyCardProps {
  property: Property;
  index: number;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.25, 0, 1]
      }}
      whileHover={{ y: -8 }}
    >
      <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-500 dark:bg-gray-900">
        <motion.div 
          className="relative h-64"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image 
            src={property.image}
            alt={property.title}
            fill
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <Badge className={`absolute top-4 right-4 bg-[#8B2131] text-white shadow-lg`}>
              {property.badge}
            </Badge>
          </motion.div>
        </motion.div>
             
        <CardContent className="p-6">
          <motion.h3 
            className="text-xl font-bold mb-2 text-gray-900 dark:text-white"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            {property.title}
          </motion.h3>
          
          <motion.p 
            className="text-muted-foreground mb-4 text-sm"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            📍 {property.location}
          </motion.p>
                 
          <motion.div 
            className="flex items-center justify-between mb-4 text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.6 }}
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Bed className="h-4 w-4 text-muted-foreground mr-1" />
                <span>{property.beds} Beds</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Bath className="h-4 w-4 text-muted-foreground mr-1" />
                <span>{property.baths} Baths</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Ruler className="h-4 w-4 text-muted-foreground mr-1" />
                <span>{property.sqft} sqft</span>
              </div>
            </div>
          </motion.div>
                 
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.7 }}
          >
            <div className="text-lg font-bold text-[#8B2131] dark:text-red-400">
              {property.price}
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-[#8B2131] hover:bg-[#7A1C2A] text-white transition-colors">
                View Details
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}