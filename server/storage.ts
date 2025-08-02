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
        title: "Senior Software Engineer",
        description: "Led a team of 8 developers in building a microservices architecture that handles over 10 million requests per day. Implemented CI/CD pipelines, reduced deployment time by 75%, and improved system reliability to 99.9% uptime.",
        category: "experience",
        company: "TechCorp Inc.",
        year: "2022-Present",
        technologies: ["Node.js", "React", "Docker", "Kubernetes", "AWS", "PostgreSQL"],
        features: ["Microservices Architecture", "Auto-scaling Infrastructure", "Real-time Monitoring", "CI/CD Pipeline"],
        imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/example/microservices",
        demoUrl: "https://demo.techcorp.com",
        isFeatured: "true",
      },
      {
        title: "Full Stack Developer",
        description: "Built responsive e-commerce platform with React & Django serving 50K+ monthly active users. Implemented payment processing, inventory management, and real-time analytics dashboard.",
        category: "experience",
        company: "E-Commerce Solutions",
        year: "2020-2022",
        technologies: ["React", "Django", "PostgreSQL", "Redis", "Stripe API"],
        features: ["Payment Processing", "Inventory Management", "Analytics Dashboard", "Mobile Responsive"],
        imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/example/ecommerce",
        demoUrl: "https://ecommerce-demo.com"
      },
      {
        title: "Software Engineering Intern",
        description: "Developed Azure cloud monitoring tools and dashboards used by 200+ enterprise clients. Created automated testing frameworks that reduced bug reports by 40%.",
        category: "experience",
        company: "Microsoft",
        year: "Summer 2019",
        technologies: ["C#", ".NET", "Azure", "Angular", "TypeScript"],
        features: ["Cloud Monitoring", "Automated Testing", "Enterprise Dashboard", "Performance Metrics"],
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/example/azure-tools",
        demoUrl: "https://azure-demo.microsoft.com"
      },
      {
        title: "DevOps Engineer",
        description: "Automated CI/CD pipelines reducing deployment time by 80%. Managed AWS infrastructure serving 1M+ daily active users with 99.95% uptime.",
        category: "experience",
        company: "CloudTech Solutions",
        year: "2021-2022",
        technologies: ["AWS", "Docker", "Jenkins", "Terraform", "Python"],
        features: ["Infrastructure as Code", "Automated Deployments", "Monitoring & Alerting", "Cost Optimization"],
        imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/example/devops-tools",
        demoUrl: "https://cloudtech-demo.com"
      }
    ];

    // Side projects
    const sideProjects: InsertProject[] = [
      {
        title: "FitTracker Mobile App",
        description: "Cross-platform mobile application for fitness tracking with real-time workout monitoring, social features, and personalized training plans. Built with React Native for iOS and Android.",
        category: "side-projects",
        year: "2023",
        technologies: ["React Native", "Firebase", "Redux", "AsyncStorage", "Expo"],
        features: ["Real-time Workout Tracking", "Social Feed", "Custom Training Plans", "Progress Analytics"],
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/example/fittracker",
        demoUrl: "https://fittracker-demo.com"
      },
      {
        title: "Analytics Dashboard",
        description: "Real-time data visualization platform for business metrics with customizable widgets and automated reporting. Processes over 100K data points per minute.",
        category: "side-projects",
        year: "2023",
        technologies: ["Vue.js", "D3.js", "Node.js", "WebSocket", "MongoDB"],
        features: ["Real-time Visualization", "Custom Widgets", "Automated Reports", "Data Export"],
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/example/analytics-dashboard",
        demoUrl: "https://analytics-demo.com"
      },
      {
        title: "Crypto Portfolio Tracker",
        description: "Track cryptocurrency investments with real-time price updates, portfolio analytics, and profit/loss calculations. Supports 100+ cryptocurrencies.",
        category: "side-projects",
        year: "2022",
        technologies: ["React", "REST APIs", "Chart.js", "LocalStorage", "CoinGecko API"],
        features: ["Real-time Prices", "Portfolio Analytics", "P&L Tracking", "Price Alerts"],
        imageUrl: "https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/example/crypto-tracker",
        demoUrl: "https://crypto-demo.com"
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
        title: "Deep Learning for Natural Language Processing",
        description: "Research paper published in ACM Conference presenting a novel approach to sentiment analysis using transformer models. Achieved 94.2% accuracy on standard benchmarks, improving upon previous state-of-the-art by 3.1%.",
        category: "research",
        venue: "ACM Conference",
        year: "2023",
        technologies: ["Python", "PyTorch", "Transformers", "BERT", "GPU Computing"],
        features: ["Novel Architecture", "Benchmark Results", "Open Source Code", "Peer Reviewed"],
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/example/nlp-research",
        demoUrl: "https://research-demo.com"
      },
      {
        title: "Computer Vision Research",
        description: "Object detection improvements using attention mechanisms published in IEEE Journal. Developed novel architecture that reduces computational cost by 30% while maintaining accuracy.",
        category: "research",
        venue: "IEEE Journal",
        year: "2022",
        technologies: ["Python", "TensorFlow", "OpenCV", "CUDA", "Computer Vision"],
        features: ["Attention Mechanisms", "Performance Optimization", "Real-time Processing", "Open Dataset"],
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        githubUrl: "https://github.com/example/cv-research",
        demoUrl: "https://cv-demo.com"
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

    // Add all projects to storage
    [...experienceProjects, ...sideProjects, ...researchProjects].forEach(projectData => {
      const id = randomUUID();
      const project: Project = { ...projectData, id };
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
