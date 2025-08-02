import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Github, ExternalLink } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  const displaySubtitle = project.company || project.venue;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-netflix-dark border-netflix-gray p-0">
        <DialogTitle className="sr-only">{project.title}</DialogTitle>
        <DialogDescription className="sr-only">
          {project.description}
        </DialogDescription>
        <div className="relative">
          <Button
            variant="ghost" 
            size="icon"
            className="absolute top-4 right-4 text-2xl hover:text-netflix-light-gray z-10 text-white"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </Button>
          
          <div className="aspect-video bg-netflix-gray relative overflow-hidden rounded-t-lg">
            <img 
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-netflix-red text-xs rounded">
                  {project.category.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                <span className="px-3 py-1 bg-netflix-gray text-xs rounded">
                  {project.year}
                </span>
                {displaySubtitle && (
                  <span className="px-3 py-1 bg-netflix-gray text-xs rounded">
                    {displaySubtitle}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-white">Description</h3>
                <p className="text-netflix-light-gray text-sm mb-4">
                  {project.description}
                </p>
                <h3 className="font-semibold mb-2 text-white">Technologies</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-netflix-red text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-white">Key Features</h3>
                <ul className="text-netflix-light-gray text-sm space-y-1 mb-4">
                  {project.features.map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  {project.githubUrl && (
                    <Button asChild className="bg-netflix-red hover:bg-red-700">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button variant="secondary" asChild className="bg-netflix-gray hover:bg-gray-600">
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
