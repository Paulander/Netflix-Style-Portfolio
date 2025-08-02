import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const displaySubtitle = project.company || project.venue || project.year;

  return (
    <div 
      className="min-w-[200px] md:min-w-[300px] group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-netflix-gray rounded-lg overflow-hidden transform transition-all duration-300 group-hover:scale-105 card-shadow">
        <img 
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-sm mb-1 line-clamp-2">
            {project.title}
          </h3>
          <p className="text-netflix-light-gray text-xs mb-2">
            {displaySubtitle} {project.company && project.year && "•"} {project.year}
          </p>
          <p className="text-xs text-netflix-light-gray line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
}
