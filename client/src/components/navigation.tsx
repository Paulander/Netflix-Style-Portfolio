import { Search, Bell, User } from "lucide-react";
import { useState, useEffect } from "react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-netflix-black/90 backdrop-blur-sm" 
          : "bg-gradient-to-b from-netflix-black to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4 md:px-16">
        <div className="flex items-center space-x-8">
          <h1 className="text-netflix-red text-2xl font-bold">PORTFOLIO</h1>
          <ul className="hidden md:flex space-x-6 text-sm">
            <li><a href="#home" className="hover:text-netflix-light-gray transition-colors">Home</a></li>
            <li><a href="#experience" className="hover:text-netflix-light-gray transition-colors">Experience</a></li>
            <li><a href="#projects" className="hover:text-netflix-light-gray transition-colors">Projects</a></li>
            <li><a href="#research" className="hover:text-netflix-light-gray transition-colors">Research</a></li>
            <li><a href="#about" className="hover:text-netflix-light-gray transition-colors">About</a></li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5 hover:text-netflix-light-gray cursor-pointer transition-colors" />
          <Bell className="w-5 h-5 hover:text-netflix-light-gray cursor-pointer transition-colors" />
          <div className="w-8 h-8 bg-netflix-red rounded-sm flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </nav>
  );
}
