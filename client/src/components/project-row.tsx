import { useQuery } from "@tanstack/react-query";
import { ProjectCard } from "./project-card";
import type { Project } from "@shared/schema";

interface ProjectRowProps {
  title: string;
  category: string;
  onProjectSelect: (project: Project) => void;
}

export function ProjectRow({ title, category, onProjectSelect }: ProjectRowProps) {
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects/category", category],
  });

  if (isLoading) {
    return (
      <section className="py-8 px-4 md:px-16">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">{title}</h2>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="min-w-[200px] md:min-w-[300px]">
              <div className="bg-netflix-gray rounded-lg h-48 animate-pulse"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4 md:px-16">
      <h2 className="text-xl md:text-2xl font-semibold mb-6">{title}</h2>
      <div className="relative">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id}
              project={project}
              onClick={() => onProjectSelect(project)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
