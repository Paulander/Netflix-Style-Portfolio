import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ProjectRow } from "@/components/project-row";
import { ProjectModal } from "@/components/project-modal";
import { PersonalInfoModal } from "@/components/personal-info-modal";
import { useState } from "react";
import type { Project } from "@shared/schema";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Navigation onProfileClick={() => setShowPersonalInfo(true)} />
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
      
      <PersonalInfoModal 
        isOpen={showPersonalInfo}
        onClose={() => setShowPersonalInfo(false)}
      />
    </div>
  );
}
