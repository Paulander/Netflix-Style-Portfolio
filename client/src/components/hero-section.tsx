import { Play, Info } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import type { Project } from "@shared/schema";

interface HeroSectionProps {
  onProjectSelect: (project: Project) => void;
}

export function HeroSection({ onProjectSelect }: HeroSectionProps) {
  const { data: featuredProject, isLoading } = useQuery<Project>({
    queryKey: ["/api/projects/featured"],
  });

  if (isLoading || !featuredProject) {
    return (
      <section className="relative h-screen flex items-center bg-netflix-gray animate-pulse">
        <div className="relative z-10 px-4 md:px-16 max-w-2xl">
          <div className="h-12 bg-netflix-gray rounded mb-4"></div>
          <div className="h-24 bg-netflix-gray rounded mb-6"></div>
          <div className="flex gap-4">
            <div className="h-12 w-48 bg-netflix-gray rounded"></div>
            <div className="h-12 w-32 bg-netflix-gray rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative h-screen flex items-center">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-netflix-black to-netflix-gray">
        <img 
          src={featuredProject.imageUrl}
          alt={featuredProject.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      
      <div className="relative z-10 px-4 md:px-16 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {featuredProject.title}
        </h1>
        <p className="text-lg md:text-xl mb-6 text-netflix-light-gray leading-relaxed">
          {featuredProject.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button 
            className="bg-white text-netflix-black px-8 py-3 hover:bg-netflix-light-gray transition-colors flex items-center gap-2"
            onClick={() => onProjectSelect(featuredProject)}
          >
            <Play className="w-4 h-4" />
            View Featured Project
          </Button>
          <Button 
            variant="secondary"
            className="bg-netflix-gray/70 text-white px-8 py-3 hover:bg-netflix-gray/40 transition-all flex items-center gap-2"
            onClick={() => onProjectSelect(featuredProject)}
          >
            <Info className="w-4 h-4" />
            More Info
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {featuredProject.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="px-3 py-1 bg-netflix-red text-xs rounded">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
