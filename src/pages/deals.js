import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navigation } from '@/components/navigation';
import { ShoppingBag, MapPin, Clock, TrendingUp, Search, Filter, ExternalLink, Star, Percent, RefreshCw, Heart, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
const CATEGORIES = [
    { value: 'all', label: 'All Categories', icon: '🛍️' },
    { value: 'Electronics', label: 'Electronics', icon: '📱' },
    { value: 'Fashion', label: 'Fashion', icon: '👕' },
    { value: 'Food', label: 'Food & Dining', icon: '🍕' },
    { value: 'Home', label: 'Home & Garden', icon: '🏠' },
    { value: 'Travel', label: 'Travel', icon: '✈️' },
    { value: 'Beauty', label: 'Beauty', icon: '💄' },
    { value: 'Sports', label: 'Sports', icon: '⚽' },
    { value: 'Books', label: 'Books', icon: '📚' },
];
export function DealsPage() {
    const { t } = useTranslation();
    const [deals, setDeals] = useState([]);
    const [filteredDeals, setFilteredDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showLocalOnly, setShowLocalOnly] = useState(false);
    const [dealOfTheDay, setDealOfTheDay] = useState(null);
    const [location, setLocation] = useState('Global');
    const [lastUpdated, setLastUpdated] = useState(new Date());
    useEffect(() => {
        loadDeals();
        loadDealOfTheDay();
    }, []);
    useEffect(() => {
        filterDeals();
    }, [deals, searchQuery, selectedCategory, showLocalOnly]);
    const loadDeals = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/deals/daily');
            if (response.ok) {
                const data = await response.json();
                setDeals(data.deals);
                setLocation(data.location);
                setLastUpdated(new Date(data.lastUpdated));
            }
        }
        catch (error) {
            console.error('Failed to load deals:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const loadDealOfTheDay = async () => {
        try {
            const response = await fetch('/api/deals/deal-of-the-day');
            if (response.ok) {
                const data = await response.json();
                setDealOfTheDay(data.deal);
            }
        }
        catch (error) {
            console.error('Failed to load deal of the day:', error);
        }
    };
    const filterDeals = () => {
        let filtered = deals;
        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(deal => deal.title.toLowerCase().includes(query) ||
                deal.description.toLowerCase().includes(query) ||
                deal.merchant.toLowerCase().includes(query) ||
                deal.tags.some(tag => tag.toLowerCase().includes(query)));
        }
        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(deal => deal.category === selectedCategory);
        }
        // Filter by local only
        if (showLocalOnly) {
            filtered = filtered.filter(deal => deal.isLocal);
        }
        setFilteredDeals(filtered);
    };
    const formatTimeRemaining = (expiryDate) => {
        const now = new Date();
        const diff = new Date(expiryDate).getTime() - now.getTime();
        if (diff <= 0)
            return 'Expired';
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        if (hours > 24) {
            const days = Math.floor(hours / 24);
            return `${days}d ${hours % 24}h`;
        }
        else if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        else {
            return `${minutes}m`;
        }
    };
    const getUrgencyColor = (expiryDate) => {
        const now = new Date();
        const diff = new Date(expiryDate).getTime() - now.getTime();
        const hours = diff / (1000 * 60 * 60);
        if (hours <= 2)
            return 'text-red-500';
        if (hours <= 6)
            return 'text-orange-500';
        if (hours <= 24)
            return 'text-yellow-500';
        return 'text-green-500';
    };
    const shareDeal = (deal) => {
        const text = `🔥 Amazing Deal Alert! 🔥\n\n${deal.title}\n💰 ${deal.discountPercentage}% OFF - Only $${deal.discountedPrice} (was $${deal.originalPrice})\n⏰ Limited time offer!\n\nFound on Billboard Deals 🛍️`;
        if (navigator.share) {
            navigator.share({
                title: deal.title,
                text: text,
                url: window.location.href,
            });
        }
        else {
            navigator.clipboard.writeText(text);
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900", children: [_jsx(Navigation, {}), _jsx("div", { className: "pt-20 pb-12", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("div", { className: "flex justify-center mb-6", children: _jsx("div", { className: "p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full", children: _jsx(ShoppingBag, { className: "w-12 h-12 text-white" }) }) }), _jsx("h1", { className: "text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4", children: t('deals.title', 'Daily Deals Hub') }), _jsx("p", { className: "text-xl text-gray-300 max-w-3xl mx-auto mb-6", children: t('deals.subtitle', 'Discover the best deals from around the web, updated daily with exclusive discounts and limited-time offers.') }), _jsxs("div", { className: "flex items-center justify-center gap-4 text-sm text-gray-400", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "w-4 h-4" }), location] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "w-4 h-4" }), "Updated ", lastUpdated.toLocaleTimeString()] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: loadDeals, className: "text-gray-400 hover:text-white", children: _jsx(RefreshCw, { className: "w-4 h-4" }) })] })] }), dealOfTheDay && (_jsxs(Card, { className: "mb-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Star, { className: "w-6 h-6 text-yellow-400" }), _jsx(CardTitle, { className: "text-white text-2xl", children: t('deals.dealOfTheDay', 'Deal of the Day') })] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 items-center", children: [_jsxs("div", { className: "lg:col-span-2", children: [_jsx("h3", { className: "text-white text-xl font-bold mb-2", children: dealOfTheDay.title }), _jsx("p", { className: "text-gray-300 mb-4", children: dealOfTheDay.description }), _jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "text-3xl font-bold text-green-400", children: ["$", dealOfTheDay.discountedPrice] }), _jsxs("span", { className: "text-lg text-gray-400 line-through", children: ["$", dealOfTheDay.originalPrice] })] }), _jsxs(Badge, { className: "bg-red-500 text-white text-lg px-3 py-1", children: [dealOfTheDay.discountPercentage, "% OFF"] })] }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-gray-400", children: [_jsx("span", { children: dealOfTheDay.merchant }), _jsxs("span", { className: getUrgencyColor(dealOfTheDay.expiryDate), children: ["\u23F0 ", formatTimeRemaining(dealOfTheDay.expiryDate), " left"] })] })] }), _jsxs("div", { className: "flex flex-col gap-3", children: [_jsxs(Button, { className: "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold", onClick: () => window.open(dealOfTheDay.dealUrl, '_blank'), children: [_jsx(ExternalLink, { className: "w-4 h-4 mr-2" }), t('deals.getDeal', 'Get This Deal')] }), _jsxs(Button, { variant: "outline", onClick: () => shareDeal(dealOfTheDay), className: "border-white/30 text-white hover:bg-white/10", children: [_jsx(Share2, { className: "w-4 h-4 mr-2" }), t('deals.share', 'Share')] })] })] }) })] })), _jsx(Card, { className: "mb-8 bg-white/10 backdrop-blur-sm border-white/20", children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" }), _jsx(Input, { placeholder: t('deals.searchPlaceholder', 'Search deals...'), value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400" })] }), _jsxs(Select, { value: selectedCategory, onValueChange: setSelectedCategory, children: [_jsx(SelectTrigger, { className: "bg-white/10 border-white/20 text-white", children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: CATEGORIES.map((category) => (_jsxs(SelectItem, { value: category.value, children: [category.icon, " ", category.label] }, category.value))) })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "checkbox", id: "local-only", checked: showLocalOnly, onChange: (e) => setShowLocalOnly(e.target.checked), className: "rounded" }), _jsx("label", { htmlFor: "local-only", className: "text-white text-sm", children: t('deals.localOnly', 'Local deals only') })] }), _jsxs("div", { className: "flex items-center text-white text-sm", children: [_jsx(Filter, { className: "w-4 h-4 mr-2" }), filteredDeals.length, " ", t('deals.results', 'results')] })] }) }) }), loading ? (_jsxs("div", { className: "text-center py-12", children: [_jsx(RefreshCw, { className: "w-8 h-8 animate-spin text-white mx-auto mb-4" }), _jsx("p", { className: "text-white", children: t('deals.loading', 'Loading amazing deals...') })] })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredDeals.map((deal) => (_jsxs(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-200", children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsx(Badge, { variant: "secondary", className: "bg-blue-500/20 text-blue-300 border-blue-500/30", children: deal.category }), _jsxs("div", { className: "flex gap-1", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => shareDeal(deal), className: "text-gray-400 hover:text-white p-1", children: _jsx(Share2, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", className: "text-gray-400 hover:text-red-400 p-1", children: _jsx(Heart, { className: "w-4 h-4" }) })] })] }), _jsx(CardTitle, { className: "text-white text-lg line-clamp-2", children: deal.title }), _jsx(CardDescription, { className: "text-gray-300 line-clamp-2", children: deal.description })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "text-2xl font-bold text-green-400", children: ["$", deal.discountedPrice] }), _jsxs("span", { className: "text-sm text-gray-400 line-through", children: ["$", deal.originalPrice] })] }), _jsxs(Badge, { className: "bg-red-500 text-white", children: [_jsx(Percent, { className: "w-3 h-3 mr-1" }), deal.discountPercentage, "% OFF"] })] }), _jsxs("div", { className: "flex items-center justify-between text-sm text-gray-400", children: [_jsx("span", { children: deal.merchant }), deal.isLocal && deal.location && (_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "w-3 h-3" }), "Local"] }))] }), _jsxs("div", { className: "flex items-center justify-between text-xs", children: [_jsxs("span", { className: `flex items-center gap-1 ${getUrgencyColor(deal.expiryDate)}`, children: [_jsx(Clock, { className: "w-3 h-3" }), formatTimeRemaining(deal.expiryDate)] }), _jsxs("span", { className: "flex items-center gap-1 text-gray-400", children: [_jsx(TrendingUp, { className: "w-3 h-3" }), deal.popularity, "% popular"] })] }), deal.tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-1", children: deal.tags.slice(0, 3).map((tag, index) => (_jsx(Badge, { variant: "outline", className: "text-xs border-white/30 text-gray-300", children: tag }, index))) })), _jsxs(Button, { className: "w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700", onClick: () => window.open(deal.affiliateUrl || deal.dealUrl, '_blank'), children: [_jsx(ExternalLink, { className: "w-4 h-4 mr-2" }), t('deals.getDeal', 'Get This Deal')] })] })] }, deal.id))) })), !loading && filteredDeals.length === 0 && (_jsxs("div", { className: "text-center py-12", children: [_jsx(ShoppingBag, { className: "w-16 h-16 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-white text-xl font-semibold mb-2", children: t('deals.noResults', 'No deals found') }), _jsx("p", { className: "text-gray-400 mb-4", children: t('deals.noResultsDescription', 'Try adjusting your filters or search terms') }), _jsx(Button, { onClick: () => {
                                        setSearchQuery('');
                                        setSelectedCategory('all');
                                        setShowLocalOnly(false);
                                    }, variant: "outline", className: "border-white/30 text-white hover:bg-white/10", children: t('deals.clearFilters', 'Clear Filters') })] }))] }) })] }));
}
