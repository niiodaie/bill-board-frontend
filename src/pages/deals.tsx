import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navigation } from '@/components/navigation';
import { 
  ShoppingBag, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Search,
  Filter,
  ExternalLink,
  Star,
  Percent,
  Calendar,
  RefreshCw,
  Heart,
  Share2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Deal {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  category: string;
  merchant: string;
  expiryDate: Date;
  location?: string;
  isLocal: boolean;
  dealUrl: string;
  imageUrl?: string;
  tags: string[];
  popularity: number;
  isAffiliate: boolean;
  affiliateUrl?: string;
}

interface DealResponse {
  deals: Deal[];
  location: string;
  totalDeals: number;
  categories: string[];
  lastUpdated: Date;
}

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
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showLocalOnly, setShowLocalOnly] = useState(false);
  const [dealOfTheDay, setDealOfTheDay] = useState<Deal | null>(null);
  const [location, setLocation] = useState('Global');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

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
        const data: DealResponse = await response.json();
        setDeals(data.deals);
        setLocation(data.location);
        setLastUpdated(new Date(data.lastUpdated));
      }
    } catch (error) {
      console.error('Failed to load deals:', error);
    } finally {
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
    } catch (error) {
      console.error('Failed to load deal of the day:', error);
    }
  };

  const filterDeals = () => {
    let filtered = deals;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(deal =>
        deal.title.toLowerCase().includes(query) ||
        deal.description.toLowerCase().includes(query) ||
        deal.merchant.toLowerCase().includes(query) ||
        deal.tags.some(tag => tag.toLowerCase().includes(query))
      );
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

  const formatTimeRemaining = (expiryDate: Date) => {
    const now = new Date();
    const diff = new Date(expiryDate).getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const getUrgencyColor = (expiryDate: Date) => {
    const now = new Date();
    const diff = new Date(expiryDate).getTime() - now.getTime();
    const hours = diff / (1000 * 60 * 60);
    
    if (hours <= 2) return 'text-red-500';
    if (hours <= 6) return 'text-orange-500';
    if (hours <= 24) return 'text-yellow-500';
    return 'text-green-500';
  };

  const shareDeal = (deal: Deal) => {
    const text = `🔥 Amazing Deal Alert! 🔥\n\n${deal.title}\n💰 ${deal.discountPercentage}% OFF - Only $${deal.discountedPrice} (was $${deal.originalPrice})\n⏰ Limited time offer!\n\nFound on Billboard Deals 🛍️`;
    
    if (navigator.share) {
      navigator.share({
        title: deal.title,
        text: text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <ShoppingBag className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              {t('deals.title', 'Daily Deals Hub')}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              {t('deals.subtitle', 'Discover the best deals from around the web, updated daily with exclusive discounts and limited-time offers.')}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={loadDeals}
                className="text-gray-400 hover:text-white"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Deal of the Day */}
          {dealOfTheDay && (
            <Card className="mb-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <CardTitle className="text-white text-2xl">
                    {t('deals.dealOfTheDay', 'Deal of the Day')}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  <div className="lg:col-span-2">
                    <h3 className="text-white text-xl font-bold mb-2">{dealOfTheDay.title}</h3>
                    <p className="text-gray-300 mb-4">{dealOfTheDay.description}</p>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-green-400">
                          ${dealOfTheDay.discountedPrice}
                        </span>
                        <span className="text-lg text-gray-400 line-through">
                          ${dealOfTheDay.originalPrice}
                        </span>
                      </div>
                      <Badge className="bg-red-500 text-white text-lg px-3 py-1">
                        {dealOfTheDay.discountPercentage}% OFF
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{dealOfTheDay.merchant}</span>
                      <span className={getUrgencyColor(dealOfTheDay.expiryDate)}>
                        ⏰ {formatTimeRemaining(dealOfTheDay.expiryDate)} left
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button 
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold"
                      onClick={() => window.open(dealOfTheDay.dealUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t('deals.getDeal', 'Get This Deal')}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => shareDeal(dealOfTheDay)}
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      {t('deals.share', 'Share')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filters */}
          <Card className="mb-8 bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder={t('deals.searchPlaceholder', 'Search deals...')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                  />
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.icon} {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Local Filter */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="local-only"
                    checked={showLocalOnly}
                    onChange={(e) => setShowLocalOnly(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="local-only" className="text-white text-sm">
                    {t('deals.localOnly', 'Local deals only')}
                  </label>
                </div>

                {/* Results Count */}
                <div className="flex items-center text-white text-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  {filteredDeals.length} {t('deals.results', 'results')}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deals Grid */}
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin text-white mx-auto mb-4" />
              <p className="text-white">{t('deals.loading', 'Loading amazing deals...')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDeals.map((deal) => (
                <Card key={deal.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-200">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge 
                        variant="secondary" 
                        className="bg-blue-500/20 text-blue-300 border-blue-500/30"
                      >
                        {deal.category}
                      </Badge>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => shareDeal(deal)}
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
                    <CardTitle className="text-white text-lg line-clamp-2">
                      {deal.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300 line-clamp-2">
                      {deal.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Pricing */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-400">
                          ${deal.discountedPrice}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          ${deal.originalPrice}
                        </span>
                      </div>
                      <Badge className="bg-red-500 text-white">
                        <Percent className="w-3 h-3 mr-1" />
                        {deal.discountPercentage}% OFF
                      </Badge>
                    </div>

                    {/* Merchant and Location */}
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{deal.merchant}</span>
                      {deal.isLocal && deal.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          Local
                        </span>
                      )}
                    </div>

                    {/* Expiry and Popularity */}
                    <div className="flex items-center justify-between text-xs">
                      <span className={`flex items-center gap-1 ${getUrgencyColor(deal.expiryDate)}`}>
                        <Clock className="w-3 h-3" />
                        {formatTimeRemaining(deal.expiryDate)}
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <TrendingUp className="w-3 h-3" />
                        {deal.popularity}% popular
                      </span>
                    </div>

                    {/* Tags */}
                    {deal.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {deal.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-white/30 text-gray-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Action Button */}
                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      onClick={() => window.open(deal.affiliateUrl || deal.dealUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t('deals.getDeal', 'Get This Deal')}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && filteredDeals.length === 0 && (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-white text-xl font-semibold mb-2">
                {t('deals.noResults', 'No deals found')}
              </h3>
              <p className="text-gray-400 mb-4">
                {t('deals.noResultsDescription', 'Try adjusting your filters or search terms')}
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setShowLocalOnly(false);
                }}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                {t('deals.clearFilters', 'Clear Filters')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

