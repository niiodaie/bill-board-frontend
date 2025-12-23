import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/navigation';
import { Calendar, TrendingUp, MapPin, Clock, Star, Heart, Share2, ExternalLink, Sparkles, Gift, ShoppingBag, Zap, Sun, Moon, Coffee, Sunset } from 'lucide-react';
import { useTranslation } from 'react-i18next';
const SAMPLE_HIGHLIGHTS = [
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
    const [highlights, setHighlights] = useState(SAMPLE_HIGHLIGHTS);
    const [selectedPeriod, setSelectedPeriod] = useState('morning');
    const [weather, setWeather] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        // Update current time every minute
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        // Set initial time period based on current time
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 12)
            setSelectedPeriod('morning');
        else if (hour >= 12 && hour < 18)
            setSelectedPeriod('afternoon');
        else if (hour >= 18 && hour < 22)
            setSelectedPeriod('evening');
        else
            setSelectedPeriod('night');
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
    const getTypeIcon = (type) => {
        switch (type) {
            case 'deal': return ShoppingBag;
            case 'surprise': return Gift;
            case 'event': return Calendar;
            case 'trending': return TrendingUp;
            case 'local': return MapPin;
            default: return Star;
        }
    };
    const getTypeColor = (type) => {
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
        if (hour >= 6 && hour < 12)
            return Coffee;
        if (hour >= 12 && hour < 18)
            return Sun;
        if (hour >= 18 && hour < 22)
            return Sunset;
        return Moon;
    };
    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour >= 5 && hour < 12)
            return t('today.goodMorning', 'Good Morning');
        if (hour >= 12 && hour < 17)
            return t('today.goodAfternoon', 'Good Afternoon');
        if (hour >= 17 && hour < 22)
            return t('today.goodEvening', 'Good Evening');
        return t('today.goodNight', 'Good Night');
    };
    const shareHighlight = (highlight) => {
        const text = `${highlight.title}\n\n${highlight.description}\n\nFound on Billboard Today! 🌟`;
        if (navigator.share) {
            navigator.share({
                title: highlight.title,
                text: text,
                url: window.location.href,
            });
        }
        else {
            navigator.clipboard.writeText(text);
        }
    };
    const filteredHighlights = highlights.filter(highlight => {
        // Filter by time relevance if needed
        return true;
    });
    const CurrentPeriodIcon = getCurrentPeriodIcon();
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900", children: [_jsx(Navigation, {}), _jsx("div", { className: "pt-20 pb-12", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsxs("div", { className: "flex justify-center items-center gap-4 mb-6", children: [_jsx("div", { className: "p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full", children: _jsx(CurrentPeriodIcon, { className: "w-12 h-12 text-white" }) }), _jsxs("div", { className: "text-left", children: [_jsx("h1", { className: "text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent", children: getGreeting() }), _jsx("p", { className: "text-xl text-gray-300", children: currentTime.toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    }) })] })] }), _jsx("p", { className: "text-lg text-gray-300 max-w-3xl mx-auto", children: t('today.subtitle', 'Your personalized daily digest of deals, surprises, events, and trending content.') })] }), weather && (_jsx(Card, { className: "mb-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30", children: _jsx(CardContent, { className: "py-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("span", { className: "text-4xl", children: weather.icon }), _jsxs("div", { children: [_jsxs("h3", { className: "text-white text-xl font-semibold", children: [weather.temperature, "\u00B0F - ", weather.condition] }), _jsxs("p", { className: "text-gray-300 flex items-center gap-1", children: [_jsx(MapPin, { className: "w-4 h-4" }), weather.location] })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-cyan-300 font-medium", children: weather.suggestion }), _jsxs("p", { className: "text-gray-400 text-sm", children: ["Updated ", currentTime.toLocaleTimeString()] })] })] }) }) })), _jsx("div", { className: "mb-8", children: _jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-2 flex gap-2", children: TIME_PERIODS.map((period) => {
                                        const Icon = period.icon;
                                        return (_jsxs("button", { onClick: () => setSelectedPeriod(period.id), className: `flex items-center gap-2 px-4 py-2 rounded-md transition-all ${selectedPeriod === period.id
                                                ? 'bg-white/20 text-white'
                                                : 'text-gray-300 hover:bg-white/10'}`, children: [_jsx(Icon, { className: "w-4 h-4" }), _jsx("span", { className: "font-medium", children: period.label })] }, period.id));
                                    }) }) }) }), _jsxs("div", { className: "mb-12", children: [_jsxs("h2", { className: "text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-2", children: [_jsx(Sparkles, { className: "w-8 h-8" }), t('today.highlights', 'Today\'s Highlights')] }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: filteredHighlights.map((highlight) => {
                                        const TypeIcon = getTypeIcon(highlight.type);
                                        return (_jsxs(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-200", children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsxs(Badge, { className: getTypeColor(highlight.type), children: [_jsx(TypeIcon, { className: "w-3 h-3 mr-1" }), highlight.type.toUpperCase()] }), _jsxs("div", { className: "flex gap-1", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => shareHighlight(highlight), className: "text-gray-400 hover:text-white p-1", children: _jsx(Share2, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", className: "text-gray-400 hover:text-red-400 p-1", children: _jsx(Heart, { className: "w-4 h-4" }) })] })] }), _jsx(CardTitle, { className: "text-white text-xl", children: highlight.title }), _jsx(CardDescription, { className: "text-gray-300", children: highlight.description })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between text-sm text-gray-400", children: [highlight.timeRelevant && (_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "w-3 h-3" }), highlight.timeRelevant] })), highlight.location && (_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "w-3 h-3" }), highlight.location] })), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(TrendingUp, { className: "w-3 h-3" }), highlight.popularity, "% popular"] })] }), _jsx("div", { className: "flex flex-wrap gap-1", children: highlight.tags.map((tag, index) => (_jsx(Badge, { variant: "outline", className: "text-xs border-white/30 text-gray-300", children: tag }, index))) }), highlight.actionText && (_jsxs(Button, { className: "w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700", onClick: () => {
                                                                if (highlight.actionUrl) {
                                                                    window.open(highlight.actionUrl, '_blank');
                                                                }
                                                            }, children: [_jsx(ExternalLink, { className: "w-4 h-4 mr-2" }), highlight.actionText] }))] })] }, highlight.id));
                                    }) })] }), _jsxs(Card, { className: "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white text-2xl text-center", children: t('today.quickActions', 'Quick Actions') }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs(Button, { variant: "outline", className: "h-20 border-white/30 text-white hover:bg-white/10 flex flex-col gap-2", onClick: () => window.location.href = '/deals', children: [_jsx(ShoppingBag, { className: "w-6 h-6" }), _jsx("span", { children: t('today.browseDeals', 'Browse Deals') })] }), _jsxs(Button, { variant: "outline", className: "h-20 border-white/30 text-white hover:bg-white/10 flex flex-col gap-2", onClick: () => window.location.href = '/surprises', children: [_jsx(Gift, { className: "w-6 h-6" }), _jsx("span", { children: t('today.getSurprises', 'Get Surprise Ideas') })] }), _jsxs(Button, { variant: "outline", className: "h-20 border-white/30 text-white hover:bg-white/10 flex flex-col gap-2", onClick: () => window.location.href = '/booking', children: [_jsx(Zap, { className: "w-6 h-6" }), _jsx("span", { children: t('today.bookAd', 'Book Ad Slot') })] })] }) })] })] }) })] }));
}
