import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Mail, Phone, MapPin, Github, Linkedin, Twitter, ExternalLink } from "lucide-react";

interface PersonalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PersonalInfoModal({ isOpen, onClose }: PersonalInfoModalProps) {
  const personalInfo = {
    name: "Alex Johnson",
    title: "Senior Software Engineer & Researcher",
    location: "San Francisco, CA",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    bio: "Passionate software engineer with 8+ years of experience building scalable systems and conducting cutting-edge research. I specialize in full-stack development, machine learning, and distributed systems architecture.",
    skills: [
      "Full-Stack Development", "Machine Learning", "Cloud Architecture", 
      "DevOps", "Research & Publications", "Team Leadership",
      "System Design", "Mobile Development"
    ],
    social: {
      github: "https://github.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
      twitter: "https://twitter.com/alexjohnson",
      website: "https://alexjohnson.dev"
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-netflix-dark border-netflix-gray">
        <DialogTitle className="sr-only">Personal Information</DialogTitle>
        <DialogDescription className="sr-only">
          Contact information and professional details
        </DialogDescription>
        
        <div className="relative">
          <Button
            variant="ghost" 
            size="icon"
            className="absolute top-0 right-0 text-2xl hover:text-netflix-light-gray z-10 text-white"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </Button>
          
          <div className="pt-8">
            {/* Profile Header */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-netflix-red rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">AJ</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{personalInfo.name}</h2>
              <p className="text-netflix-light-gray text-lg">{personalInfo.title}</p>
              <div className="flex items-center justify-center gap-2 mt-2 text-netflix-light-gray">
                <MapPin className="w-4 h-4" />
                <span>{personalInfo.location}</span>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">About</h3>
              <p className="text-netflix-light-gray leading-relaxed">
                {personalInfo.bio}
              </p>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">Core Skills</h3>
              <div className="flex flex-wrap gap-2">
                {personalInfo.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-netflix-red text-white text-sm rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-netflix-light-gray">
                  <Mail className="w-5 h-5" />
                  <a href={`mailto:${personalInfo.email}`} className="hover:text-white transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-netflix-light-gray">
                  <Phone className="w-5 h-5" />
                  <a href={`tel:${personalInfo.phone}`} className="hover:text-white transition-colors">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
              <div className="flex gap-4">
                <Button asChild className="bg-netflix-gray hover:bg-gray-600">
                  <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button asChild className="bg-netflix-gray hover:bg-gray-600">
                  <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                <Button asChild className="bg-netflix-gray hover:bg-gray-600">
                  <a href={personalInfo.social.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </a>
                </Button>
                <Button asChild className="bg-netflix-red hover:bg-red-700">
                  <a href={personalInfo.social.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Website
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}