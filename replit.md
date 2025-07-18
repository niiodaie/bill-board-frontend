# Billboard - Digital Advertising Platform

## Overview

Billboard is a digital advertising platform designed to be "The Times Square of the internet." It allows users to create, display, and manage advertisements on a vibrant digital billboard interface. The platform combines AI-powered ad creation with traditional manual upload capabilities, featuring real-time billboard displays, campaign management, and integrated payment processing through Stripe.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Framework**: Radix UI components with Tailwind CSS styling
- **Design System**: Custom shadcn/ui components with a neon/cyberpunk aesthetic
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with session-based authentication
- **Authentication**: Passport.js with local strategy and bcryptjs for password hashing
- **File Handling**: Multer for image/video uploads with 10MB size limits

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (via Neon serverless)
- **Migrations**: Drizzle Kit for schema management
- **Connection**: Connection pooling via @neondatabase/serverless

## Key Components

### Core Entities
1. **Users**: Authentication and user management with Stripe customer integration
2. **Ads**: Advertisement content with support for image, video, and text formats
3. **Campaigns**: Campaign management with placement options, budgets, and analytics
4. **Payments**: Stripe payment integration for campaign funding
5. **Deals**: Content aggregation for billboard display

### Frontend Components
- **Billboard**: Real-time advertisement display with cycling content
- **AI Ad Creator**: OpenAI integration for automated ad generation
- **Manual Ad Upload**: Traditional file upload with drag-and-drop support
- **Dashboard**: Campaign analytics and management interface
- **Authentication**: Login/register forms with session management

### Backend Services
- **OpenAI Integration**: GPT-4 for ad text generation and DALL-E 3 for image creation
- **Stripe Integration**: Payment processing and customer management
- **File Storage**: Local file system storage for uploaded assets
- **Session Management**: Express sessions with secure cookie handling

## Data Flow

### Advertisement Creation Flow
1. User selects AI generation or manual upload
2. For AI: OpenAI generates text and images based on prompts
3. For manual: User uploads assets and provides metadata
4. Ad is stored with pending status awaiting approval
5. Approved ads become available for campaign creation

### Campaign Management Flow
1. User creates campaign with selected ad and placement tier
2. Payment intent created via Stripe for campaign budget
3. Successful payment activates campaign
4. Campaign appears in live billboard rotation
5. Analytics track impressions, clicks, and spend

### Billboard Display Flow
1. Active campaigns fetched from database
2. Content rotated in real-time based on placement priority
3. User interactions tracked for analytics
4. Live countdown and engagement features enhance user experience

## External Dependencies

### Payment Processing
- **Stripe**: Payment intents, customer management, and subscription handling
- **Integration**: Server-side Stripe SDK with client-side Elements for secure payment forms

### AI Services
- **OpenAI GPT-4**: Text generation for ad copy including titles, descriptions, and CTAs
- **OpenAI DALL-E 3**: Image generation for visual ad content
- **Configuration**: API key authentication with error handling

### Database Infrastructure
- **Neon Database**: Serverless PostgreSQL with WebSocket connections
- **Connection Management**: Pool-based connections with automatic scaling

### UI/UX Libraries
- **Radix UI**: Headless component primitives for accessibility
- **Tailwind CSS**: Utility-first styling with custom neon color palette
- **Lucide React**: Icon library for consistent visual elements

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express API proxy
- **Hot Reload**: Vite HMR for frontend changes
- **Database**: Local or cloud PostgreSQL instance
- **Environment Variables**: Stripe keys, OpenAI API key, database URL

### Production Build
- **Frontend**: Vite production build with optimized assets
- **Backend**: esbuild compilation to ES modules
- **Static Serving**: Express serves built frontend assets
- **Process Management**: Single Node.js process handling both API and static files

### Database Management
- **Schema Migrations**: Drizzle Kit push for schema updates
- **Connection Pooling**: Neon serverless with WebSocket fallback
- **Environment Separation**: Separate databases for development and production

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### July 02, 2025 - Internationalization & Location Detection Added
- **Multi-language Support**: Added complete i18n system with 10 major languages:
  - English, Spanish, French, German, Portuguese
  - Chinese, Japanese, Russian, Arabic, Hindi
- **Location Detection**: Implemented browser geolocation with IP fallback using geoip-lite
- **Language Switcher**: Added dropdown component with flag indicators in navigation
- **Location Display**: Shows user's detected city and country in navigation
- **Translation Coverage**: All major UI elements now support translations
- **Auto-detection**: Browser language automatically detected on first visit
- **Persistence**: Language preference saved in localStorage

## Changelog

Changelog:
- July 02, 2025. Initial setup
- July 02, 2025. Added internationalization and location detection features