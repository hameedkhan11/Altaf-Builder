// components/sections/ProjectsSection.tsx

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { projects } from '@/data/projects';

const ProjectsSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Latest Projects</h2>
          <Button className="bg-red-800 hover:bg-red-900">
            See All Projects
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="opacity-0 animate-fade-in-up"
              style={{ 
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-500">
                {index === 0 ? (
                  <div className="relative h-96">
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      fill
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <Badge className={`${project.badgeColor} text-white mb-2`}>
                        {project.status}
                      </Badge>
                      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    </div>
                    <Button
                      size="icon"
                      className="absolute bottom-4 right-4 rounded-full"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="relative h-64">
                      <Image 
                        src={project.image} 
                        alt={project.title}
                        fill
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <Badge className={`${project.badgeColor} text-white mb-2`}>
                          {project.status}
                        </Badge>
                        <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-muted-foreground">{project.location}</p>
                        <p className="text-sm text-indigo-600 font-medium">Launch: {project.launch}</p>
                      </div>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <Button className="w-full">
                        {project.status === 'Launching Soon' ? 'Register Interest' : 'Learn More'}
                      </Button>
                    </CardContent>
                  </>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;