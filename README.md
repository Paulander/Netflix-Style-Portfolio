
# Netflix-Inspired Portfolio Website

A full-stack TypeScript portfolio website built with a Netflix-style interface featuring a hero section, horizontal scrolling project rows, and detailed project modals.
<img width="2580" height="1184" alt="Skärmbild 2025-08-05 100850" src="https://github.com/user-attachments/assets/fa16c2d8-24c1-4f5e-9138-ba93f1b22d59" />

## 🚀 Features

- **Netflix-Style UI**: Dark theme with red accent colors and horizontal scrolling interfaces
- **Project Showcase**: Organized by categories (Experience, Research, Side Projects)
- **Interactive Modals**: Detailed project information with links to GitHub and live demos
- **Responsive Design**: Mobile-first approach with smooth animations
- **Type-Safe**: Full TypeScript implementation with Zod validation

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** components built on Radix UI
- **TanStack Query** for server state management
- **Wouter** for lightweight routing

### Backend
- **Node.js** with Express.js
- **TypeScript** with ES modules
- **In-memory storage** with seeded project data
- **RESTful API** with category-based filtering

## 🏃‍♂️ Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd netflix-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000`

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and configurations
├── server/                # Backend Express application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   └── storage.ts        # Data storage and seeding
├── shared/               # Shared TypeScript types and schemas
└── package.json         # Dependencies and scripts
```

## 🎨 Customization

### Adding Your Projects

Edit `server/storage.ts` to add your own projects. Each project should include:

```typescript
{
  title: "Your Project Title",
  description: "Project description",
  category: "experience" | "research" | "side-projects",
  year: "2024",
  technologies: ["React", "TypeScript", "Node.js"],
  features: ["Feature 1", "Feature 2"],
  imageUrl: "https://your-image-url.com",
  githubUrl: "https://github.com/your-username/project",
  demoUrl: "https://your-demo-url.com"
}
```

### Styling

The project uses Tailwind CSS with custom Netflix-themed variables defined in `client/src/index.css`. Modify the CSS variables to change the color scheme:

```css
:root {
  --netflix-red: #e50914;
  --netflix-black: #141414;
  --netflix-gray: #2f2f2f;
}
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type check with TypeScript

## 🚀 Deployment

This project is optimized for deployment on Replit. The server is configured to run on port 5000 which is automatically forwarded in production.

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Fork the project
- Create a feature branch
- Make your changes
- Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Template Usage**: Feel free to use this as a template for your own portfolio website. Just replace the project data in `server/storage.ts` with your own information!
