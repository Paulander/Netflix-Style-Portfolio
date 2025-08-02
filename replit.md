# Overview

This is a Netflix-inspired portfolio website built as a full-stack TypeScript application. The project showcases professional experience, side projects, and research work through an interactive, streaming-service-style interface. The application features a hero section with a featured project, horizontal scrolling project rows organized by category, and detailed project modals with rich information display.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom Netflix-themed color variables and responsive design
- **State Management**: TanStack Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation resolvers

## Backend Architecture  
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Data Storage**: In-memory storage implementation with seeded project data
- **API Design**: RESTful endpoints for project CRUD operations with category-based filtering
- **Development Tools**: tsx for TypeScript execution, esbuild for production builds

## Database & Schema
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe database operations
- **Schema**: Projects table with JSON fields for technologies and features arrays
- **Database**: Configured for Neon PostgreSQL (currently using in-memory storage)
- **Migrations**: Drizzle Kit for schema migrations and database management

## Styling & Design System
- **Design Language**: Netflix-inspired dark theme with red accent colors
- **Component Library**: shadcn/ui with customized variants for Netflix aesthetics
- **Responsive Design**: Mobile-first approach with horizontal scrolling interfaces
- **Animations**: CSS transitions and hover effects for interactive elements
- **Typography**: Custom font weights and sizing for hierarchy

## Project Structure
- **Monorepo Layout**: Client, server, and shared code organization
- **Shared Types**: Common TypeScript interfaces and Zod schemas
- **Asset Management**: Vite-based asset handling with proper aliases
- **Path Mapping**: TypeScript path aliases for clean imports across the application

# External Dependencies

## Frontend Dependencies
- **UI Components**: Radix UI primitives for accessible component foundations
- **Styling**: Tailwind CSS with PostCSS for utility-first styling
- **State Management**: TanStack Query for server state and API interaction
- **Form Management**: React Hook Form with Hookform Resolvers for validation
- **Utilities**: clsx, class-variance-authority for conditional styling
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation and formatting

## Backend Dependencies
- **Web Framework**: Express.js for API routes and middleware
- **Database**: Neon Database serverless PostgreSQL adapter
- **ORM**: Drizzle ORM with Drizzle Zod for type-safe database operations
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Development**: tsx for TypeScript execution, esbuild for bundling

## Development Tools
- **Build System**: Vite with React plugin and custom configuration
- **TypeScript**: Configured with strict mode and path mapping
- **Replit Integration**: Cartographer plugin and runtime error overlay for Replit environment
- **Database Tools**: Drizzle Kit for migrations and schema management
- **Code Quality**: ESLint and TypeScript for code validation