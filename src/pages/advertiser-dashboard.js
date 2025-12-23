import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navigation } from '@/components/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Eye, MousePointer, TrendingUp, Users, Target, Plus, Edit, Trash2, Play, Pause, Download, Share2, Gift, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
const SAMPLE_CAMPAIGNS = [
    {
        id: '1',
        name: 'Summer Sale Campaign',
        status: 'active',
        slotType: 'premium',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-02-15'),
        budget: 1000,
        spent: 750,
        impressions: 45000,
        clicks: 1350,
        ctr: 3.0,
        cpc: 0.56,
        conversions: 67,
    },
    {
        id: '2',
        name: 'Product Launch',
        status: 'paused',
        slotType: 'featured',
        startDate: new Date('2024-01-10'),
        endDate: new Date('2024-01-25'),
        budget: 500,
        spent: 320,
        impressions: 28000,
        clicks: 840,
        ctr: 3.0,
        cpc: 0.38,
        conversions: 42,
    },
];
const PERFORMANCE_DATA = [
    { date: 'Jan 1', impressions: 4000, clicks: 120, conversions: 6 },
    { date: 'Jan 2', impressions: 3000, clicks: 90, conversions: 4 },
    { date: 'Jan 3', impressions: 5000, clicks: 150, conversions: 8 },
    { date: 'Jan 4', impressions: 4500, clicks: 135, conversions: 7 },
    { date: 'Jan 5', impressions: 6000, clicks: 180, conversions: 9 },
    { date: 'Jan 6', impressions: 5500, clicks: 165, conversions: 8 },
    { date: 'Jan 7', impressions: 7000, clicks: 210, conversions: 11 },
];
const SLOT_DISTRIBUTION = [
    { name: 'Premium', value: 40, color: '#8b5cf6' },
    { name: 'Featured', value: 35, color: '#06b6d4' },
    { name: 'Standard', value: 25, color: '#10b981' },
];
export function AdvertiserDashboard() {
    const { t } = useTranslation();
    const [campaigns, setCampaigns] = useState(SAMPLE_CAMPAIGNS);
    const [analytics, setAnalytics] = useState({
        totalSpent: 1070,
        totalImpressions: 73000,
        totalClicks: 2190,
        averageCTR: 3.0,
        averageCPC: 0.49,
        totalConversions: 109,
        roi: 245,
    });
    const [selectedPeriod, setSelectedPeriod] = useState('7d');
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-500/20 text-green-300 border-green-500/30';
            case 'paused': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
            case 'completed': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
            case 'draft': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
            default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
        }
    };
    const getSlotTypeColor = (slotType) => {
        switch (slotType) {
            case 'premium': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
            case 'featured': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
            case 'standard': return 'bg-green-500/20 text-green-300 border-green-500/30';
            default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900", children: [_jsx(Navigation, {}), _jsx("div", { className: "pt-20 pb-12", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent", children: "Advertiser Dashboard" }), _jsx("p", { className: "text-gray-300 mt-2", children: "Manage your campaigns and track performance" })] }), _jsxs("div", { className: "flex gap-3", children: [_jsxs(Button, { className: "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "New Campaign"] }), _jsxs(Button, { variant: "outline", className: "border-white/30 text-white hover:bg-white/10", children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Export Data"] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [_jsx(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-400 text-sm", children: "Total Spent" }), _jsxs("p", { className: "text-2xl font-bold text-white", children: ["$", analytics.totalSpent] })] }), _jsx(DollarSign, { className: "w-8 h-8 text-green-400" })] }), _jsx("p", { className: "text-green-400 text-sm mt-2", children: "+12% from last month" })] }) }), _jsx(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-400 text-sm", children: "Impressions" }), _jsx("p", { className: "text-2xl font-bold text-white", children: analytics.totalImpressions.toLocaleString() })] }), _jsx(Eye, { className: "w-8 h-8 text-blue-400" })] }), _jsx("p", { className: "text-blue-400 text-sm mt-2", children: "+8% from last month" })] }) }), _jsx(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-400 text-sm", children: "Clicks" }), _jsx("p", { className: "text-2xl font-bold text-white", children: analytics.totalClicks.toLocaleString() })] }), _jsx(MousePointer, { className: "w-8 h-8 text-purple-400" })] }), _jsx("p", { className: "text-purple-400 text-sm mt-2", children: "+15% from last month" })] }) }), _jsx(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-400 text-sm", children: "ROI" }), _jsxs("p", { className: "text-2xl font-bold text-white", children: [analytics.roi, "%"] })] }), _jsx(TrendingUp, { className: "w-8 h-8 text-yellow-400" })] }), _jsx("p", { className: "text-yellow-400 text-sm mt-2", children: "+5% from last month" })] }) })] }), _jsxs(Tabs, { defaultValue: "campaigns", className: "space-y-6", children: [_jsxs(TabsList, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: [_jsx(TabsTrigger, { value: "campaigns", className: "data-[state=active]:bg-white/20", children: "Campaigns" }), _jsx(TabsTrigger, { value: "analytics", className: "data-[state=active]:bg-white/20", children: "Analytics" }), _jsx(TabsTrigger, { value: "referrals", className: "data-[state=active]:bg-white/20", children: "Referrals" }), _jsx(TabsTrigger, { value: "billing", className: "data-[state=active]:bg-white/20", children: "Billing" })] }), _jsx(TabsContent, { value: "campaigns", className: "space-y-6", children: _jsxs(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Active Campaigns" }), _jsx(CardDescription, { className: "text-gray-300", children: "Manage and monitor your advertising campaigns" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: campaigns.map((campaign) => (_jsxs("div", { className: "p-4 bg-white/5 rounded-lg border border-white/10", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("h3", { className: "text-white font-semibold", children: campaign.name }), _jsx(Badge, { className: getStatusColor(campaign.status), children: campaign.status }), _jsx(Badge, { className: getSlotTypeColor(campaign.slotType), children: campaign.slotType })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", variant: "ghost", className: "text-gray-400 hover:text-white", children: _jsx(Edit, { className: "w-4 h-4" }) }), _jsx(Button, { size: "sm", variant: "ghost", className: "text-gray-400 hover:text-white", children: campaign.status === 'active' ? _jsx(Pause, { className: "w-4 h-4" }) : _jsx(Play, { className: "w-4 h-4" }) }), _jsx(Button, { size: "sm", variant: "ghost", className: "text-gray-400 hover:text-red-400", children: _jsx(Trash2, { className: "w-4 h-4" }) })] })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-400", children: "Budget" }), _jsxs("p", { className: "text-white font-medium", children: ["$", campaign.budget] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-gray-400", children: "Spent" }), _jsxs("p", { className: "text-white font-medium", children: ["$", campaign.spent] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-gray-400", children: "Impressions" }), _jsx("p", { className: "text-white font-medium", children: campaign.impressions.toLocaleString() })] }), _jsxs("div", { children: [_jsx("p", { className: "text-gray-400", children: "Clicks" }), _jsx("p", { className: "text-white font-medium", children: campaign.clicks.toLocaleString() })] }), _jsxs("div", { children: [_jsx("p", { className: "text-gray-400", children: "CTR" }), _jsxs("p", { className: "text-white font-medium", children: [campaign.ctr, "%"] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-gray-400", children: "CPC" }), _jsxs("p", { className: "text-white font-medium", children: ["$", campaign.cpc] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-gray-400", children: "Conversions" }), _jsx("p", { className: "text-white font-medium", children: campaign.conversions })] })] }), _jsx("div", { className: "mt-4 bg-white/5 rounded-full h-2", children: _jsx("div", { className: "bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full", style: { width: `${(campaign.spent / campaign.budget) * 100}%` } }) }), _jsxs("p", { className: "text-gray-400 text-xs mt-1", children: [Math.round((campaign.spent / campaign.budget) * 100), "% of budget used"] })] }, campaign.id))) }) })] }) }), _jsxs(TabsContent, { value: "analytics", className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Performance Trends" }) }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: PERFORMANCE_DATA, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#374151" }), _jsx(XAxis, { dataKey: "date", stroke: "#9CA3AF" }), _jsx(YAxis, { stroke: "#9CA3AF" }), _jsx(Tooltip, { contentStyle: {
                                                                                backgroundColor: '#1F2937',
                                                                                border: '1px solid #374151',
                                                                                borderRadius: '8px'
                                                                            } }), _jsx(Line, { type: "monotone", dataKey: "impressions", stroke: "#8B5CF6", strokeWidth: 2 }), _jsx(Line, { type: "monotone", dataKey: "clicks", stroke: "#06B6D4", strokeWidth: 2 }), _jsx(Line, { type: "monotone", dataKey: "conversions", stroke: "#10B981", strokeWidth: 2 })] }) }) })] }), _jsxs(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Slot Distribution" }) }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: SLOT_DISTRIBUTION, cx: "50%", cy: "50%", outerRadius: 80, fill: "#8884d8", dataKey: "value", label: ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`, children: SLOT_DISTRIBUTION.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, {})] }) }) })] })] }), _jsxs(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Daily Performance" }) }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 400, children: _jsxs(BarChart, { data: PERFORMANCE_DATA, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#374151" }), _jsx(XAxis, { dataKey: "date", stroke: "#9CA3AF" }), _jsx(YAxis, { stroke: "#9CA3AF" }), _jsx(Tooltip, { contentStyle: {
                                                                        backgroundColor: '#1F2937',
                                                                        border: '1px solid #374151',
                                                                        borderRadius: '8px'
                                                                    } }), _jsx(Bar, { dataKey: "impressions", fill: "#8B5CF6" }), _jsx(Bar, { dataKey: "clicks", fill: "#06B6D4" })] }) }) })] })] }), _jsxs(TabsContent, { value: "referrals", className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-400 text-sm", children: "Total Referrals" }), _jsx("p", { className: "text-2xl font-bold text-white", children: "23" })] }), _jsx(Users, { className: "w-8 h-8 text-blue-400" })] }) }) }), _jsx(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-400 text-sm", children: "Earnings" }), _jsx("p", { className: "text-2xl font-bold text-white", children: "$230" })] }), _jsx(Gift, { className: "w-8 h-8 text-green-400" })] }) }) }), _jsx(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-400 text-sm", children: "Conversion Rate" }), _jsx("p", { className: "text-2xl font-bold text-white", children: "78%" })] }), _jsx(Target, { className: "w-8 h-8 text-purple-400" })] }) }) })] }), _jsxs(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Your Referral Code" }), _jsx(CardDescription, { className: "text-gray-300", children: "Share your code and earn $10 for each successful referral" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10", children: [_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-gray-400 text-sm", children: "Your Code" }), _jsx("p", { className: "text-2xl font-bold text-white font-mono", children: "BILLBOARD10" })] }), _jsxs(Button, { className: "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700", children: [_jsx(Share2, { className: "w-4 h-4 mr-2" }), "Share"] })] }) })] })] }), _jsxs(TabsContent, { value: "billing", className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Current Balance" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "text-center py-6", children: [_jsx("p", { className: "text-4xl font-bold text-white mb-2", children: "$150.00" }), _jsx("p", { className: "text-gray-400", children: "Available Credit" }), _jsxs(Button, { className: "mt-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700", children: [_jsx(CreditCard, { className: "w-4 h-4 mr-2" }), "Add Funds"] })] }) })] }), _jsxs(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Payment Methods" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between p-3 bg-white/5 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center", children: "VISA" }), _jsx("span", { className: "text-white", children: "\u2022\u2022\u2022\u2022 4242" })] }), _jsx(Badge, { className: "bg-green-500/20 text-green-300 border-green-500/30", children: "Default" })] }), _jsxs(Button, { variant: "outline", className: "w-full border-white/30 text-white hover:bg-white/10", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Add Payment Method"] })] }) })] })] }), _jsxs(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Recent Transactions" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: [
                                                            { date: '2024-01-15', description: 'Premium Slot - Summer Sale', amount: -299.00 },
                                                            { date: '2024-01-10', description: 'Featured Slot - Product Launch', amount: -199.00 },
                                                            { date: '2024-01-05', description: 'Referral Bonus', amount: +10.00 },
                                                        ].map((transaction, index) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-white/5 rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "text-white font-medium", children: transaction.description }), _jsx("p", { className: "text-gray-400 text-sm", children: transaction.date })] }), _jsxs("p", { className: `font-bold ${transaction.amount > 0 ? 'text-green-400' : 'text-white'}`, children: [transaction.amount > 0 ? '+' : '', "$", Math.abs(transaction.amount).toFixed(2)] })] }, index))) }) })] })] })] })] }) })] }));
}
