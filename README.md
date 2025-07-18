# Billboard Platform

> The Times Square of the Internet - A global, AI-powered advertising platform

Billboard is a revolutionary digital advertising platform that replicates the vibrant Times Square billboard experience on the web. Users worldwide can view, create, and interact with dynamic, location-based digital ads powered by AI and real-time analytics.

## 🌟 Features

### Core Platform
- **Live Digital Billboard** - Dynamic, rotating ad display with Times Square aesthetics
- **AI-Powered Ad Creation** - Generate text, images, and video ads using OpenAI
- **Smart Pricing Engine** - Dynamic pricing based on time, location, demand, and slot tier
- **Calendar-Based Booking** - Interactive booking system with real-time availability
- **Geo-Personalization** - Location-based ad feeds and pricing
- **Multi-Language Support** - Full i18n with 10 languages

### Content-Driven Features
- **Surprise Ideas Generator** (`/surprises`) - AI-powered personalized surprise suggestions
- **Daily Deals Hub** (`/deals`) - Aggregated deals with filtering and search
- **Today's Highlights** (`/today`) - Personalized daily digest with weather integration
- **Interactive Calendar** (`/calendar`) - Event-based ad scheduling

### Business Features
- **Stripe Payment Integration** - Secure payment processing with subscriptions
- **Referral System** - Viral growth with reward mechanisms
- **Advertiser Dashboard** - Campaign management and analytics
- **Admin Dashboard** - Platform analytics and user management
- **Real-Time Analytics** - Performance tracking and reporting

## 🏗️ Architecture

```
billboard-platform/
├── frontend/             # Vercel deployment
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── i18n/
│   │   └── styles/
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── README.md

├── backend/              # Render deployment
│   ├── api/
│   ├── services/
│   ├── routes/
│   ├── cron/
│   ├── utils/
│   ├── .env.example
│   ├── index.ts
│   └── package.json

├── shared/               # Cross-use logic
│   ├── types/
│   └── constants/

├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL
- Stripe Account (for payments)
- OpenAI API Key (for AI features)

### Frontend Setup (Vercel)

```bash
cd frontend
npm install
cp .env.example .env
# Configure environment variables
npm run dev
```

**Required Environment Variables:**
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### Backend Setup (Render)

```bash
cd backend
npm install
cp .env.example .env
# Configure environment variables
npm run dev
```

**Required Environment Variables:**
```env
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
STRIPE_SECRET_KEY=your_stripe_secret_key
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=your_postgresql_url
SESSION_SECRET=your_session_secret
```

## 📦 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Configure environment variables in Vercel dashboard

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Configure environment variables in Render dashboard
5. Set up cron jobs for dynamic pricing and email digest

## 🎯 Key Features Breakdown

### Smart Pricing Engine
- **Dynamic Multipliers**: Time, location, demand, slot tier
- **Real-Time Calculations**: Instant pricing updates
- **Bulk Pricing**: Multi-slot and duration discounts
- **AI Bonus**: Additional value for AI-generated content

### AI-Powered Content
- **Ad Generation**: Text, image, and video creation
- **Surprise Ideas**: Personalized suggestions with filters
- **Deal Aggregation**: AI-curated daily deals
- **Multi-Language**: Automatic translation and localization

### Viral Growth Mechanisms
- **Referral System**: Unique codes with rewards
- **Social Sharing**: Integrated sharing for all content
- **Gamification**: Leaderboards and achievement systems
- **Content Marketing**: SEO-optimized pages for organic traffic

## 🌍 Internationalization

Supported Languages:
- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Portuguese (pt)
- Russian (ru)
- Chinese (zh)
- Japanese (ja)
- Korean (ko)

## 📊 Analytics & Reporting

### Advertiser Dashboard
- Campaign performance metrics
- Real-time click tracking
- ROI calculations
- Geographic distribution
- A/B testing results

### Admin Dashboard
- Platform-wide analytics
- User management
- Revenue tracking
- Content moderation
- System health monitoring

## 🔧 Development

### Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Payments**: Stripe
- **AI**: OpenAI GPT-4
- **Deployment**: Vercel (Frontend) + Render (Backend)

### API Endpoints

#### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/user` - Get current user

#### Ads & Campaigns
- `POST /api/ads` - Create ad
- `GET /api/ads` - Get user ads
- `GET /api/ads/active` - Get active ads
- `POST /api/campaigns` - Create campaign

#### AI Services
- `POST /api/generate-ad-text` - Generate ad text
- `POST /api/generate-ad-image` - Generate ad image
- `POST /api/surprises/generate` - Generate surprise ideas
- `GET /api/deals` - Get daily deals

#### Pricing & Payments
- `POST /api/pricing/calculate` - Calculate pricing
- `GET /api/pricing/slots` - Get available slots
- `POST /api/payments/create-session` - Create payment session
- `POST /api/referrals/apply` - Apply referral code

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@billboard-platform.com or join our Discord community.

---

**Built with ❤️ for the future of digital advertising**

