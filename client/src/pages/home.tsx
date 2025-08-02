import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ProjectRow } from "@/components/project-row";
import { ProjectModal } from "@/components/project-modal";
import { useState } from "react";
import type { Project } from "@shared/schema";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Navigation />
      <HeroSection onProjectSelect={setSelectedProject} />
      
      <div className="space-y-8 pb-16">
        <ProjectRow 
          title="Professional Experience" 
          category="experience"
          onProjectSelect={setSelectedProject}
        />
        <ProjectRow 
          title="Side Projects" 
          category="side-projects"
          onProjectSelect={setSelectedProject}
        />
        <ProjectRow 
          title="Research & Academia" 
          category="research"
          onProjectSelect={setSelectedProject}
        />
      </div>

      <ProjectModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
