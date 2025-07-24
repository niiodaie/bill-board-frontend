import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/navigation';
import { 
  Calendar,
  TrendingUp,
  MapPin,
  Clock,
  Star,
  Heart,
  Share2,
  ExternalLink,
  Sparkles,
  Gift,
  ShoppingBag,
  Users,
  Zap,
  Sun,
  Moon,
  Coffee,
  Sunset
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TodayHighlight {
  id: string;
  type: 'deal' | 'surprise' | 'event' | 'trending' | 'local';
  title: string;
  description: string;
  imageUrl?: string;
  actionUrl?: string;
  actionText?: string;
  timeRelevant?: string;
  location?: string;
  popularity: number;
  tags: string[];
  expiryTime?: Date;
}

interface WeatherInfo {
  location: string;
  temperature: number;
  condition: string;
  icon: string;
  suggestion: string;
}

const SAMPLE_HIGHLIGHTS: TodayHighlight[] = [
  {
    id: '1',
    type: 'deal',
    title: '⚡ Flash Sale: 70% Off Premium Headphones',
    description: 'Limited time offer on noise-canceling wireless headphones. Perfect for work or travel.',
    actionUrl: '/deals',
    actionText: 'Shop Now',
    timeRelevant: 'Ends in 4 hours',
    popularity: 95,
    tags: ['electronics', 'audio', 'sale'],
    expiryTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
  },
  {
    id: '2',
    type: 'surprise',
    title: '💝 Surprise Idea: Sunrise Picnic Date',
    description: 'Create magical memories with a surprise sunrise picnic. Perfect for couples who love adventure.',
    actionUrl: '/surprises',
    actionText: 'Get Ideas',
    timeRelevant: 'Perfect for this weekend',
    popularity: 88,
    tags: ['romantic', 'outdoor', 'date'],
  },
  {
    id: '3',
    type: 'local',
    title: '🎭 Local Event: Art Gallery Opening Tonight',
    description: 'Contemporary art exhibition featuring local artists. Free wine and appetizers.',
    location: 'Downtown Gallery District',
    actionText: 'Learn More',
    timeRelevant: '7:00 PM - 10:00 PM',
    popularity: 76,
    tags: ['art', 'culture', 'free'],
  },
  {
    id: '4',
    type: 'trending',
    title: '🔥 Trending: DIY Home Office Makeover',
    description: 'Transform your workspace with these budget-friendly tips trending on social media.',
    actionText: 'See Trends',
    popularity: 92,
    tags: ['home', 'diy', 'productivity'],
  },
];

const TIME_PERIODS = [
  { id: 'morning', label: 'Morning', icon: Coffee, time: '6:00 AM - 12:00 PM' },
  { id: 'afternoon', label: 'Afternoon', icon: Sun, time: '12:00 PM - 6:00 PM' },
  { id: 'evening', label: 'Evening', icon: Sunset, time: '6:00 PM - 10:00 PM' },
  { id: 'night', label: 'Night', icon: Moon, time: '10:00 PM - 6:00 AM' },
];

export function TodayPage() {
  const { t } = useTranslation();
  const [highlights, setHighlights] = useState<TodayHighlight[]>(SAMPLE_HIGHLIGHTS);
  const [selectedPeriod, setSelectedPeriod] = useState('morning');
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Set initial time period based on current time
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) setSelectedPeriod('morning');
    else if (hour >= 12 && hour < 18) setSelectedPeriod('afternoon');
    else if (hour >= 18 && hour < 22) setSelectedPeriod('evening');
    else setSelectedPeriod('night');

    // Load weather info
    loadWeatherInfo();

    return () => clearInterval(timer);
  }, []);

  const loadWeatherInfo = async () => {
    // Mock weather data - in production, integrate with weather API
    setWeather({
      location: 'New York, NY',
      temperature: 72,
      condition: 'Partly Cloudy',
      icon: '⛅',
      suggestion: 'Perfect weather for outdoor activities!',
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deal': return ShoppingBag;
      case 'surprise': return Gift;
      case 'event': return Calendar;
      case 'trending': return TrendingUp;
      case 'local': return MapPin;
      default: return Star;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deal': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'surprise': return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
      case 'event': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'trending': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'local': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getCurrentPeriodIcon = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 12) return Coffee;
    if (hour >= 12 && hour < 18) return Sun;
    if (hour >= 18 && hour < 22) return Sunset;
    return Moon;
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) return t('today.goodMorning', 'Good Morning');
    if (hour >= 12 && hour < 17) return t('today.goodAfternoon', 'Good Afternoon');
    if (hour >= 17 && hour < 22) return t('today.goodEvening', 'Good Evening');
    return t('today.goodNight', 'Good Night');
  };

  const shareHighlight = (highlight: TodayHighlight) => {
    const text = `${highlight.title}\n\n${highlight.description}\n\nFound on Billboard Today! 🌟`;
    
    if (navigator.share) {
      navigator.share({
        title: highlight.title,
        text: text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  const filteredHighlights = highlights.filter(highlight => {
    // Filter by time relevance if needed
    return true;
  });

  const CurrentPeriodIcon = getCurrentPeriodIcon();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full">
                <CurrentPeriodIcon className="w-12 h-12 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {getGreeting()}
                </h1>
                <p className="text-xl text-gray-300">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {t('today.subtitle', 'Your personalized daily digest of deals, surprises, events, and trending content.')}
            </p>
          </div>

          {/* Weather Card */}
          {weather && (
            <Card className="mb-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30">
              <CardContent className="py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{weather.icon}</span>
                    <div>
                      <h3 className="text-white text-xl font-semibold">
                        {weather.temperature}°F - {weather.condition}
                      </h3>
                      <p className="text-gray-300 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {weather.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-cyan-300 font-medium">{weather.suggestion}</p>
                    <p className="text-gray-400 text-sm">
                      Updated {currentTime.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Time Period Selector */}
          <div className="mb-8">
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 flex gap-2">
                {TIME_PERIODS.map((period) => {
                  const Icon = period.icon;
                  return (
                    <button
                      key={period.id}
                      onClick={() => setSelectedPeriod(period.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                        selectedPeriod === period.id
                          ? 'bg-white/20 text-white'
                          : 'text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{period.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Today's Highlights */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8" />
              {t('today.highlights', 'Today\'s Highlights')}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredHighlights.map((highlight) => {
                const TypeIcon = getTypeIcon(highlight.type);
                return (
                  <Card key={highlight.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-200">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className={getTypeColor(highlight.type)}>
                          <TypeIcon className="w-3 h-3 mr-1" />
                          {highlight.type.toUpperCase()}
                        </Badge>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => shareHighlight(highlight)}
                            className="text-gray-400 hover:text-white p-1"
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-red-400 p-1"
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <CardTitle className="text-white text-xl">
                        {highlight.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        {highlight.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Time and Location Info */}
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        {highlight.timeRelevant && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {highlight.timeRelevant}
                          </span>
                        )}
                        {highlight.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {highlight.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {highlight.popularity}% popular
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {highlight.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-white/30 text-gray-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Action Button */}
                      {highlight.actionText && (
                        <Button
                          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                          onClick={() => {
                            if (highlight.actionUrl) {
                              window.open(highlight.actionUrl, '_blank');
                            }
                          }}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {highlight.actionText}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center">
                {t('today.quickActions', 'Quick Actions')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-20 border-white/30 text-white hover:bg-white/10 flex flex-col gap-2"
                  onClick={() => window.location.href = '/deals'}
                >
                  <ShoppingBag className="w-6 h-6" />
                  <span>{t('today.browseDeals', 'Browse Deals')}</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 border-white/30 text-white hover:bg-white/10 flex flex-col gap-2"
                  onClick={() => window.location.href = '/surprises'}
                >
                  <Gift className="w-6 h-6" />
                  <span>{t('today.getSurprises', 'Get Surprise Ideas')}</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 border-white/30 text-white hover:bg-white/10 flex flex-col gap-2"
                  onClick={() => window.location.href = '/booking'}
                >
                  <Zap className="w-6 h-6" />
                  <span>{t('today.bookAd', 'Book Ad Slot')}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

