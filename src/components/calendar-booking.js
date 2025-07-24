import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { MapPin, Clock, DollarSign, Zap, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
const AD_SLOTS = [
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
    const [selectedDates, setSelectedDates] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('US');
    const [selectedFormat, setSelectedFormat] = useState('IMAGE');
    const [duration, setDuration] = useState([7]);
    const [isAiGenerated, setIsAiGenerated] = useState(false);
    const [pricing, setPricing] = useState(null);
    // Calculate pricing when parameters change
    useEffect(() => {
        if (selectedSlot && selectedDates.length > 0) {
            calculatePricing();
        }
    }, [selectedSlot, selectedCountry, selectedFormat, duration, isAiGenerated, selectedDates]);
    const calculatePricing = async () => {
        if (!selectedSlot || selectedDates.length === 0)
            return;
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
        }
        catch (error) {
            console.error('Failed to calculate pricing:', error);
        }
    };
    const handleSlotSelect = (slot) => {
        if (slot.isAvailable) {
            setSelectedSlot(slot);
        }
    };
    const handleDateSelect = (date) => {
        if (date) {
            setSelectedDates([date]);
        }
    };
    const getTierColor = (tier) => {
        switch (tier) {
            case 'TOP': return 'bg-gradient-to-r from-yellow-400 to-orange-500';
            case 'MID': return 'bg-gradient-to-r from-blue-400 to-purple-500';
            case 'BOTTOM': return 'bg-gradient-to-r from-green-400 to-teal-500';
            default: return 'bg-gray-400';
        }
    };
    const getPopularityIcon = (popularity) => {
        if (popularity >= 80)
            return _jsx(TrendingUp, { className: "w-4 h-4 text-red-500" });
        if (popularity >= 60)
            return _jsx(Zap, { className: "w-4 h-4 text-yellow-500" });
        return _jsx(Clock, { className: "w-4 h-4 text-green-500" });
    };
    return (_jsxs("div", { className: "max-w-7xl mx-auto p-6 space-y-8", children: [_jsxs("div", { className: "text-center space-y-4", children: [_jsx("h1", { className: "text-4xl font-bold bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent", children: t('booking.title', 'Book Your Billboard Slot') }), _jsx("p", { className: "text-xl text-gray-600 dark:text-gray-300", children: t('booking.subtitle', 'Select your preferred slot, dates, and targeting options') })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs(Card, { className: "lg:col-span-2", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "w-5 h-5" }), t('booking.selectSlot', 'Select Ad Slot')] }), _jsx(CardDescription, { children: t('booking.slotDescription', 'Choose your billboard placement position') })] }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", children: AD_SLOTS.map((slot) => (_jsxs("div", { className: `relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedSlot?.id === slot.id
                                            ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                                            : slot.isAvailable
                                                ? 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                                                : 'border-gray-100 bg-gray-50 dark:bg-gray-800 cursor-not-allowed opacity-50'}`, onClick: () => handleSlotSelect(slot), children: [_jsx("div", { className: `w-full h-2 rounded-full mb-3 ${getTierColor(slot.tier)}` }), _jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h3", { className: "font-semibold text-lg", children: slot.name }), getPopularityIcon(slot.popularity)] }), _jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 mb-3", children: slot.position }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(Badge, { variant: slot.tier === 'TOP' ? 'default' : slot.tier === 'MID' ? 'secondary' : 'outline', children: [slot.tier, " TIER"] }), _jsxs("span", { className: "font-bold text-lg", children: ["$", slot.basePrice, "/day"] })] }), _jsxs("div", { className: "mt-2 flex items-center justify-between text-xs", children: [_jsxs("span", { className: "text-gray-500", children: ["Popularity: ", slot.popularity, "%"] }), _jsx("span", { className: `font-medium ${slot.isAvailable ? 'text-green-600' : 'text-red-600'}`, children: slot.isAvailable ? 'Available' : 'Booked' })] })] }, slot.id))) }) })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "w-5 h-5" }), t('booking.selectDate', 'Select Start Date')] }) }), _jsx(CardContent, { children: _jsx(Calendar, { mode: "single", selected: selectedDates[0], onSelect: handleDateSelect, disabled: (date) => date < new Date(), className: "rounded-md border" }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: t('booking.duration', 'Campaign Duration') }) }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: t('booking.days', 'Days') }), _jsxs("span", { className: "font-bold", children: [duration[0], " days"] })] }), _jsx(Slider, { value: duration, onValueChange: setDuration, max: 30, min: 1, step: 1, className: "w-full" }), _jsxs("div", { className: "flex justify-between text-xs text-gray-500", children: [_jsx("span", { children: "1 day" }), _jsx("span", { children: "30 days" })] })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: t('booking.targeting', 'Targeting Options') }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: t('booking.country', 'Target Country') }), _jsxs(Select, { value: selectedCountry, onValueChange: setSelectedCountry, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: COUNTRIES.map((country) => (_jsxs(SelectItem, { value: country.code, children: [country.name, " (", country.multiplier, "x)"] }, country.code))) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: t('booking.format', 'Ad Format') }), _jsxs(Select, { value: selectedFormat, onValueChange: setSelectedFormat, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: AD_FORMATS.map((format) => (_jsxs(SelectItem, { value: format.value, children: [format.label, " (", format.multiplier, "x)"] }, format.value))) })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "checkbox", id: "ai-generated", checked: isAiGenerated, onChange: (e) => setIsAiGenerated(e.target.checked), className: "rounded" }), _jsx("label", { htmlFor: "ai-generated", className: "text-sm", children: t('booking.aiGenerated', 'AI-Generated Content (+$10)') })] })] })] })] })] }), pricing && selectedSlot && (_jsxs(Card, { className: "border-2 border-pink-500", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(DollarSign, { className: "w-5 h-5" }), t('booking.pricingSummary', 'Pricing Summary')] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-semibold text-lg mb-3", children: t('booking.breakdown', 'Price Breakdown') }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsxs("span", { children: ["Base Rate (", selectedSlot.tier, " Tier):"] }), _jsxs("span", { children: ["$", pricing.baseRate, "/day"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Slot Multiplier:" }), _jsxs("span", { children: [pricing.slotMultiplier, "x"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Geographic Multiplier:" }), _jsxs("span", { children: [pricing.geoMultiplier, "x"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Time Multiplier:" }), _jsxs("span", { children: [pricing.timeMultiplier, "x"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Format Multiplier:" }), _jsxs("span", { children: [pricing.formatMultiplier, "x"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Duration Discount:" }), _jsxs("span", { children: [pricing.durationDiscount, "x"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Demand Multiplier:" }), _jsxs("span", { children: [pricing.demandMultiplier, "x"] })] }), isAiGenerated && (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "AI Generated Bonus:" }), _jsxs("span", { children: ["+$", pricing.aiGeneratedBonus] })] }))] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "bg-gradient-to-r from-pink-500 to-cyan-500 p-6 rounded-lg text-white", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-sm opacity-90 mb-1", children: t('booking.totalCost', 'Total Campaign Cost') }), _jsxs("p", { className: "text-3xl font-bold", children: ["$", pricing.total.toFixed(2)] }), _jsxs("p", { className: "text-sm opacity-90 mt-1", children: ["$", pricing.dailyRate.toFixed(2), "/day \u00D7 ", duration[0], " days"] })] }) }), _jsx(Button, { className: "w-full bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600", size: "lg", disabled: !selectedSlot || selectedDates.length === 0, children: t('booking.proceedToCheckout', 'Proceed to Checkout') })] })] }) })] }))] }));
}
