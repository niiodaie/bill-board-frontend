import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { MapPin, Clock, DollarSign, Zap, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface AdSlot {
  id: string;
  name: string;
  tier: 'TOP' | 'MID' | 'BOTTOM';
  position: string;
  basePrice: number;
  popularity: number;
  isAvailable: boolean;
}

interface PricingBreakdown {
  baseRate: number;
  slotMultiplier: number;
  geoMultiplier: number;
  timeMultiplier: number;
  formatMultiplier: number;
  durationDiscount: number;
  demandMultiplier: number;
  aiGeneratedBonus: number;
  total: number;
  dailyRate: number;
}

const AD_SLOTS: AdSlot[] = [
  { id: 'top_center', name: 'Top Center', tier: 'TOP', position: 'Premium Billboard Center', basePrice: 15, popularity: 95, isAvailable: true },
  { id: 'top_left', name: 'Top Left', tier: 'TOP', position: 'Premium Left Banner', basePrice: 15, popularity: 85, isAvailable: true },
  { id: 'top_right', name: 'Top Right', tier: 'TOP', position: 'Premium Right Banner', basePrice: 15, popularity: 85, isAvailable: true },
  { id: 'mid_center', name: 'Mid Center', tier: 'MID', position: 'Featured Center Display', basePrice: 10, popularity: 75, isAvailable: true },
  { id: 'mid_left', name: 'Mid Left', tier: 'MID', position: 'Side Panel Left', basePrice: 10, popularity: 65, isAvailable: true },
  { id: 'mid_right', name: 'Mid Right', tier: 'MID', position: 'Side Panel Right', basePrice: 10, popularity: 65, isAvailable: true },
  { id: 'bottom_center', name: 'Bottom Center', tier: 'BOTTOM', position: 'Footer Banner', basePrice: 5, popularity: 45, isAvailable: true },
  { id: 'bottom_left', name: 'Bottom Left', tier: 'BOTTOM', position: 'Footer Left', basePrice: 5, popularity: 35, isAvailable: false },
  { id: 'bottom_right', name: 'Bottom Right', tier: 'BOTTOM', position: 'Footer Right', basePrice: 5, popularity: 35, isAvailable: true },
];

const COUNTRIES = [
  { code: 'US', name: 'United States', multiplier: 1.5 },
  { code: 'UK', name: 'United Kingdom', multiplier: 1.5 },
  { code: 'DE', name: 'Germany', multiplier: 1.5 },
  { code: 'CA', name: 'Canada', multiplier: 1.4 },
  { code: 'AU', name: 'Australia', multiplier: 1.4 },
  { code: 'IN', name: 'India', multiplier: 1.2 },
  { code: 'BR', name: 'Brazil', multiplier: 1.2 },
  { code: 'FR', name: 'France', multiplier: 1.3 },
  { code: 'IT', name: 'Italy', multiplier: 1.3 },
  { code: 'ES', name: 'Spain', multiplier: 1.2 },
];

const AD_FORMATS = [
  { value: 'IMAGE', label: 'Image', multiplier: 1.0 },
  { value: 'VIDEO', label: 'Video', multiplier: 1.5 },
  { value: 'TEXT', label: 'Text Only', multiplier: 0.8 },
];

export function CalendarBooking() {
  const { t } = useTranslation();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<AdSlot | null>(null);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedFormat, setSelectedFormat] = useState('IMAGE');
  const [duration, setDuration] = useState([7]);
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [pricing, setPricing] = useState<PricingBreakdown | null>(null);

  // Calculate pricing when parameters change
  useEffect(() => {
    if (selectedSlot && selectedDates.length > 0) {
      calculatePricing();
    }
  }, [selectedSlot, selectedCountry, selectedFormat, duration, isAiGenerated, selectedDates]);

  const calculatePricing = async () => {
    if (!selectedSlot || selectedDates.length === 0) return;

    try {
      const response = await fetch('/api/pricing/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotType: selectedSlot.id,
          duration: duration[0],
          countryCode: selectedCountry,
          startDate: selectedDates[0],
          adFormat: selectedFormat,
          isAiGenerated,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setPricing(result.breakdown);
      }
    } catch (error) {
      console.error('Failed to calculate pricing:', error);
    }
  };

  const handleSlotSelect = (slot: AdSlot) => {
    if (slot.isAvailable) {
      setSelectedSlot(slot);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDates([date]);
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'TOP': return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'MID': return 'bg-gradient-to-r from-blue-400 to-purple-500';
      case 'BOTTOM': return 'bg-gradient-to-r from-green-400 to-teal-500';
      default: return 'bg-gray-400';
    }
  };

  const getPopularityIcon = (popularity: number) => {
    if (popularity >= 80) return <TrendingUp className="w-4 h-4 text-red-500" />;
    if (popularity >= 60) return <Zap className="w-4 h-4 text-yellow-500" />;
    return <Clock className="w-4 h-4 text-green-500" />;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">
          {t('booking.title', 'Book Your Billboard Slot')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {t('booking.subtitle', 'Select your preferred slot, dates, and targeting options')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Slot Selection */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {t('booking.selectSlot', 'Select Ad Slot')}
            </CardTitle>
            <CardDescription>
              {t('booking.slotDescription', 'Choose your billboard placement position')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {AD_SLOTS.map((slot) => (
                <div
                  key={slot.id}
                  className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedSlot?.id === slot.id
                      ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                      : slot.isAvailable
                      ? 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                      : 'border-gray-100 bg-gray-50 dark:bg-gray-800 cursor-not-allowed opacity-50'
                  }`}
                  onClick={() => handleSlotSelect(slot)}
                >
                  <div className={`w-full h-2 rounded-full mb-3 ${getTierColor(slot.tier)}`} />
                  
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{slot.name}</h3>
                    {getPopularityIcon(slot.popularity)}
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {slot.position}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant={slot.tier === 'TOP' ? 'default' : slot.tier === 'MID' ? 'secondary' : 'outline'}>
                      {slot.tier} TIER
                    </Badge>
                    <span className="font-bold text-lg">
                      ${slot.basePrice}/day
                    </span>
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-gray-500">
                      Popularity: {slot.popularity}%
                    </span>
                    <span className={`font-medium ${slot.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                      {slot.isAvailable ? 'Available' : 'Booked'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calendar and Options */}
        <div className="space-y-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {t('booking.selectDate', 'Select Start Date')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDates[0]}
                onSelect={handleDateSelect}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Duration */}
          <Card>
            <CardHeader>
              <CardTitle>{t('booking.duration', 'Campaign Duration')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{t('booking.days', 'Days')}</span>
                  <span className="font-bold">{duration[0]} days</span>
                </div>
                <Slider
                  value={duration}
                  onValueChange={setDuration}
                  max={30}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 day</span>
                  <span>30 days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Targeting Options */}
          <Card>
            <CardHeader>
              <CardTitle>{t('booking.targeting', 'Targeting Options')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('booking.country', 'Target Country')}
                </label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name} ({country.multiplier}x)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('booking.format', 'Ad Format')}
                </label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AD_FORMATS.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label} ({format.multiplier}x)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="ai-generated"
                  checked={isAiGenerated}
                  onChange={(e) => setIsAiGenerated(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="ai-generated" className="text-sm">
                  {t('booking.aiGenerated', 'AI-Generated Content (+$10)')}
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pricing Summary */}
      {pricing && selectedSlot && (
        <Card className="border-2 border-pink-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              {t('booking.pricingSummary', 'Pricing Summary')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-lg mb-3">
                  {t('booking.breakdown', 'Price Breakdown')}
                </h4>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Base Rate ({selectedSlot.tier} Tier):</span>
                    <span>${pricing.baseRate}/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Slot Multiplier:</span>
                    <span>{pricing.slotMultiplier}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Geographic Multiplier:</span>
                    <span>{pricing.geoMultiplier}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Multiplier:</span>
                    <span>{pricing.timeMultiplier}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format Multiplier:</span>
                    <span>{pricing.formatMultiplier}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration Discount:</span>
                    <span>{pricing.durationDiscount}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Demand Multiplier:</span>
                    <span>{pricing.demandMultiplier}x</span>
                  </div>
                  {isAiGenerated && (
                    <div className="flex justify-between">
                      <span>AI Generated Bonus:</span>
                      <span>+${pricing.aiGeneratedBonus}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-pink-500 to-cyan-500 p-6 rounded-lg text-white">
                  <div className="text-center">
                    <p className="text-sm opacity-90 mb-1">
                      {t('booking.totalCost', 'Total Campaign Cost')}
                    </p>
                    <p className="text-3xl font-bold">
                      ${pricing.total.toFixed(2)}
                    </p>
                    <p className="text-sm opacity-90 mt-1">
                      ${pricing.dailyRate.toFixed(2)}/day × {duration[0]} days
                    </p>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600"
                  size="lg"
                  disabled={!selectedSlot || selectedDates.length === 0}
                >
                  {t('booking.proceedToCheckout', 'Proceed to Checkout')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

