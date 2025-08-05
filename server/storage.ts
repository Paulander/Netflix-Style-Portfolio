import { type Project, type InsertProject } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getProject(id: string): Promise<Project | undefined>;
  getAllProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getFeaturedProject(): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
}

export class MemStorage implements IStorage {
  private projects: Map<string, Project>;

  constructor() {
    this.projects = new Map();
    this.seedData();
  }

  private seedData() {
    // Experience projects
    const experienceProjects: InsertProject[] = [
      {
        title: "Founder & Consultant",
        description: "Founded consulting company specializing in embedded development. Working with Micropower Group on ARM Cortex development for industrial battery chargers, modernizing build tools and updating bootloaders from hardware to REST API.",
        category: "experience",
        company: "Gullbrandstorp Ingenjörsbyrå AB",
        year: "2023-Present",
        technologies: ["C/C++", "ARM Cortex", "REST API", "Embedded Systems"],
        features: ["Hardware to Software Integration", "Build Tool Modernization", "Bootloader Updates", "Industrial Applications"],
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/oskarpaulander",
        demoUrl: "https://gullbrandstorp.com",
        isFeatured: "true",
      },
      {
        title: "Solo Developer - NutriSnap",
        description: "Built full-stack AI nutrition tracking PWA that analyzes food photos using multi-model inference (OpenAI, Gemini, Grok). Developed FastAPI backend with Stripe billing, usage quotas, and multilingual support.",
        category: "experience",
        company: "NutriSnap",
        year: "2025-Present",
        technologies: ["FastAPI", "React", "TypeScript", "OpenAI", "Gemini", "Stripe", "PWA"],
        features: ["AI Photo Analysis", "Multi-Model Inference", "Tiered Billing", "Multilingual Support"],
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/oskarpaulander/nutrisnap",
        demoUrl: "https://nutrisnap.app"
      },
      {
        title: "Battery & Propulsion Engineer",
        description: "Responsible for implementation and testing of battery/propulsion features for high-performance vehicles. Main responsible for integration and release pipelines, working with CI/DevOps in modern C++ and AutoSAR.",
        category: "experience",
        company: "Polestar AB",
        year: "2022-2024",
        technologies: ["C++", "AutoSAR", "CI/CD", "Embedded Systems", "Battery Management"],
        features: ["Battery System Design", "Propulsion Features", "Release Pipelines", "Performance Optimization"],
        imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/oskarpaulander",
        demoUrl: "https://polestar.com"
      },
      {
        title: "Scrum Master & Developer",
        description: "Organized scrum events for agile team of diverse developers. Developed Adaptive AutoSAR platform for automotive industry (BMW, GM, Volvo) with ASIL certification according to ISO 26262.",
        category: "experience",
        company: "Vector GmbH",
        year: "2021-2022",
        technologies: ["C++", "AutoSAR", "ASIL", "ISO 26262", "Automotive"],
        features: ["Scrum Leadership", "Safety Certification", "Automotive Platform", "Team Management"],
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/oskarpaulander",
        demoUrl: "https://vector.com"
      },
      {
        title: "Embedded Systems Developer",
        description: "Development and testing of MiniLink products (microwave radio for 5G infrastructure). Implemented IPv6 Gateway support and Layer 2 features from hardware to user interface in agile scrum team.",
        category: "experience",
        company: "Ericsson AB",
        year: "2018-2021",
        technologies: ["C/C++", "IPv6", "Layer 2", "5G", "Microwave Radio"],
        features: ["5G Infrastructure", "IPv6 Gateway", "Hardware Integration", "Layer 2 Features"],
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/oskarpaulander",
        demoUrl: "https://ericsson.com"
      }
    ];

    // Side projects
    const sideProjects: InsertProject[] = [
      {
        title: "MancerAI - Autonomous Development Team",
        description: "Building a team of autonomous AI agents that automates Jira planning and feature breakdown, plus automatic readme creation and maintenance. Utilizing RAG and graph search on Greptile platform.",
        category: "side-projects",
        year: "2024-Present",
        technologies: ["Python", "FastAPI", "Claude 3.5", "RAG", "Greptile", "Jira API"],
        features: ["Autonomous Planning", "Feature Breakdown", "Auto Documentation", "Graph Search"],
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/oskarpaulander/mancerai",
        demoUrl: "https://mancerai.dev"
      },
      {
        title: "Raylyze - Handheld Raman Spectrometer",
        description: "Founded company developing handheld Raman Spectrometer for ultra-sensitive detection of unknown substances. Drove down hardware costs using powerful ML software based on Convolutional Neural Networks.",
        category: "side-projects",
        year: "2020-2021",
        technologies: ["Python", "CNN", "Machine Learning", "Raman Spectroscopy", "Hardware"],
        features: ["Ultra-sensitive Detection", "Cost Reduction", "CNN Analysis", "Hardware Integration"],
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/oskarpaulander/raylyze",
        demoUrl: "https://raylyze.com"
      },
      {
        title: "Smartnoise - ADHD Cognitive Enhancement",
        description: "Developed iOS app, Chrome plugin and webapp improving children with ADHD's cognitive performance using stochastic resonance via auditory stimuli. Later found to benefit dyslexic users via visual stimuli.",
        category: "side-projects",
        year: "2014-Present",
        technologies: ["iOS", "Chrome Extension", "JavaScript", "Stochastic Resonance", "Audio Processing"],
        features: ["Cognitive Enhancement", "ADHD Support", "Auditory Stimuli", "Visual Stimuli"],
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/oskarpaulander/smartnoise",
        demoUrl: "https://smartnoise.com"
      },
      {
        title: "Open Source Contributions",
        description: "Contributing to popular open-source projects and libraries including React Router, Express.js middleware, and developer tools used by thousands of developers.",
        category: "side-projects",
        year: "2020-Present",
        technologies: ["JavaScript", "TypeScript", "React", "Node.js", "Git"],
        features: ["Bug Fixes", "Feature Development", "Documentation", "Community Support"],
        imageUrl: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/example",
        demoUrl: "https://opensource-contributions.com"
      }
    ];

    // Research projects
    const researchProjects: InsertProject[] = [
      {
        title: "Total Light Annihilation for SERS",
        description: "Master's thesis research on Surface-Enhanced Raman Spectroscopy (SERS) focusing on total light annihilation techniques for enhanced detection sensitivity. Applied advanced optics and nanotechnology principles.",
        category: "research",
        venue: "Chalmers University",
        year: "2015",
        technologies: ["SERS", "Optics", "Nanotechnology", "MATLAB", "Spectroscopy"],
        features: ["Enhanced Detection", "Light Annihilation", "SERS Optimization", "Nanotechnology"],
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/oskarpaulander/sers-research",
        demoUrl: "https://chalmers.se"
      },
      {
        title: "Cognitive Neuroscience with Smartnoise",
        description: "Co-authored published article in cognitive neuroscience exploring stochastic resonance effects on cognitive performance. Research demonstrated measurable improvements in ADHD patients using auditory stimuli protocols.",
        category: "research",
        venue: "Cognitive Neuroscience Journal",
        year: "2013-Present",
        technologies: ["MATLAB", "Statistical Analysis", "Audio Processing", "Neuroscience"],
        features: ["Stochastic Resonance", "ADHD Research", "Cognitive Enhancement", "Published Article"],
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/oskarpaulander/cognitive-research",
        demoUrl: "https://lunduniversity.lu.se"
      },
      {
        title: "Distributed Systems Study",
        description: "Scalability improvements in microservices architecture published in SIGCOMM. Introduced new load balancing algorithm that improves throughput by 45%.",
        category: "research",
        venue: "SIGCOMM",
        year: "2022",
        technologies: ["Go", "Kubernetes", "gRPC", "Prometheus", "Distributed Systems"],
        features: ["Load Balancing Algorithm", "Performance Analysis", "Scalability Testing", "Production Deployment"],
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/example/distributed-systems",
        demoUrl: "https://distributed-demo.com"
      },
      {
        title: "Blockchain Security Paper",
        description: "Security vulnerabilities in smart contract implementations published in CCS Conference. Identified 12 new vulnerability patterns and proposed automated detection methods.",
        category: "research",
        venue: "CCS Conference",
        year: "2021",
        technologies: ["Solidity", "Web3", "Security Analysis", "Blockchain", "Smart Contracts"],
        features: ["Vulnerability Detection", "Automated Analysis", "Security Framework", "Industry Impact"],
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/example/blockchain-security",
        demoUrl: "https://blockchain-demo.com"
      }
    ];

    // Add more experience projects for horizontal scrolling
    const moreExperienceProjects: InsertProject[] = [
      {
        title: "Technical Lead",
        description: "Led technical architecture decisions for a fintech platform processing $100M+ in transactions. Built scalable APIs, implemented fraud detection, and managed a team of 12 engineers.",
        category: "experience",
        company: "FinTech Corp",
        year: "2019-2020",
        technologies: ["Python", "FastAPI", "Kafka", "Redis", "PostgreSQL", "ML"],
        features: ["Fraud Detection", "High-frequency Trading", "Real-time Analytics", "Risk Management"],
        imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/example/fintech-platform",
        demoUrl: "https://fintech-demo.com"
      },
      {
        title: "Mobile App Developer",
        description: "Built cross-platform mobile applications for 2M+ users. Implemented real-time messaging, push notifications, and offline-first architecture with seamless sync.",
        category: "experience",
        company: "Mobile Solutions Inc",
        year: "2018-2019",
        technologies: ["React Native", "TypeScript", "GraphQL", "Apollo", "Firebase"],
        features: ["Real-time Messaging", "Offline Support", "Push Notifications", "Cross-platform"],
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/example/mobile-app",
        demoUrl: "https://mobile-demo.com"
      },
      {
        title: "Frontend Architect",
        description: "Designed and implemented component library used across 15+ applications. Improved performance by 60% and reduced bundle size by 40% through code splitting and optimization.",
        category: "experience",
        company: "Design Systems Ltd",
        year: "2017-2018",
        technologies: ["React", "Storybook", "Webpack", "Jest", "Cypress"],
        features: ["Component Library", "Performance Optimization", "Automated Testing", "Documentation"],
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/example/component-library",
        demoUrl: "https://design-system-demo.com"
      }
    ];

    // Add more side projects for horizontal scrolling
    const moreSideProjects: InsertProject[] = [
      {
        title: "Recipe Sharing Platform",
        description: "Social platform for sharing and discovering recipes with AI-powered recommendations. Features photo sharing, meal planning, and shopping list generation.",
        category: "side-projects",
        year: "2023",
        technologies: ["Next.js", "Prisma", "OpenAI API", "Cloudinary", "Stripe"],
        features: ["AI Recommendations", "Photo Sharing", "Meal Planning", "Social Features"],
        imageUrl: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/example/recipe-platform",
        demoUrl: "https://recipe-demo.com"
      },
      {
        title: "Smart Home Dashboard",
        description: "IoT dashboard for managing smart home devices with real-time monitoring, automation rules, and energy usage analytics. Supports 50+ device types.",
        category: "side-projects",
        year: "2022",
        technologies: ["Python", "Raspberry Pi", "MQTT", "InfluxDB", "Grafana"],
        features: ["Device Control", "Automation Rules", "Energy Monitoring", "Custom Dashboards"],
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/example/smart-home",
        demoUrl: "https://smarthome-demo.com"
      },
      {
        title: "Weather Prediction App",
        description: "Machine learning-powered weather forecasting with hyperlocal predictions. Uses ensemble models and satellite data for 95% accuracy up to 7 days.",
        category: "side-projects",
        year: "2022",
        technologies: ["Python", "Scikit-Learn", "Flask", "Weather APIs", "Docker"],
        features: ["ML Predictions", "Hyperlocal Forecasts", "Satellite Data", "API Integration"],
        imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/example/weather-ml",
        demoUrl: "https://weather-demo.com"
      },
      {
        title: "Language Learning Game",
        description: "Gamified language learning platform with spaced repetition, voice recognition, and social competitions. Supports 12 languages with native speaker audio.",
        category: "side-projects",
        year: "2021",
        technologies: ["Vue.js", "Web Speech API", "Firebase", "PWA", "WebRTC"],
        features: ["Voice Recognition", "Spaced Repetition", "Social Features", "Offline Mode"],
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/example/language-game",
        demoUrl: "https://language-demo.com"
      }
    ];

    // Add more research projects for horizontal scrolling
    const moreResearchProjects: InsertProject[] = [
      {
        title: "Quantum Computing Algorithms",
        description: "Novel quantum algorithms for optimization problems published in Nature Quantum Information. Achieved 1000x speedup over classical methods for specific NP-hard problems.",
        category: "research",
        venue: "Nature Quantum Information",
        year: "2023",
        technologies: ["Qiskit", "Python", "Quantum Circuits", "IBM Quantum", "Linear Algebra"],
        features: ["Quantum Speedup", "Algorithm Design", "Experimental Validation", "Open Source"],
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/example/quantum-algorithms",
        demoUrl: "https://quantum-demo.com"
      },
      {
        title: "Edge Computing Research",
        description: "Efficient resource allocation in edge computing networks published in IEEE INFOCOM. Proposed algorithms reduce latency by 45% while improving energy efficiency.",
        category: "research",
        venue: "IEEE INFOCOM",
        year: "2022",
        technologies: ["C++", "Network Simulation", "Optimization", "Edge Computing", "5G"],
        features: ["Resource Optimization", "Latency Reduction", "Energy Efficiency", "5G Integration"],
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/example/edge-computing",
        demoUrl: "https://edge-demo.com"
      },
      {
        title: "Bioinformatics ML Pipeline",
        description: "Machine learning pipeline for genomic data analysis published in Bioinformatics Journal. Identifies disease markers with 98.5% accuracy using multi-modal data.",
        category: "research",
        venue: "Bioinformatics Journal",
        year: "2021",
        technologies: ["R", "Bioconductor", "TensorFlow", "Docker", "AWS"],
        features: ["Genomic Analysis", "Disease Prediction", "Multi-modal ML", "Cloud Pipeline"],
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/example/bioinformatics-ml",
        demoUrl: "https://bio-demo.com"
      }
    ];

    // Add all projects to storage
    [...experienceProjects, ...moreExperienceProjects, ...sideProjects, ...moreSideProjects, ...researchProjects, ...moreResearchProjects].forEach(projectData => {
      const id = randomUUID();
      const project: Project = { 
        ...projectData, 
        id,
        company: projectData.company ?? null,
        venue: projectData.venue ?? null,
        githubUrl: projectData.githubUrl ?? null,
        demoUrl: projectData.demoUrl ?? null,
        isFeatured: projectData.isFeatured ?? null
      };
      this.projects.set(id, project);
    });
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      (project) => project.category === category,
    );
  }

  async getFeaturedProject(): Promise<Project | undefined> {
    return Array.from(this.projects.values()).find(
      (project) => project.isFeatured === "true",
    );
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }
}

export const storage = new MemStorage();
