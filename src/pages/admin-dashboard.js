import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Navigation } from '@/components/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Users, DollarSign, Eye, Search, Filter, Download, RefreshCw, UserCheck, UserX, Flag, Target, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
const SAMPLE_STATS = {
    totalUsers: 12450,
    activeUsers: 8920,
    totalRevenue: 245680,
    monthlyRevenue: 45230,
    totalAds: 3420,
    activeAds: 1890,
    totalImpressions: 15600000,
    totalClicks: 468000,
    averageCTR: 3.0,
    conversionRate: 2.4,
};
const REVENUE_DATA = [
    { month: 'Jan', revenue: 35000, users: 1200, ads: 450 },
    { month: 'Feb', revenue: 42000, users: 1450, ads: 520 },
    { month: 'Mar', revenue: 38000, users: 1380, ads: 480 },
    { month: 'Apr', revenue: 45000, users: 1620, ads: 580 },
    { month: 'May', revenue: 52000, users: 1890, ads: 650 },
    { month: 'Jun', revenue: 48000, users: 1750, ads: 620 },
];
const USER_ACTIVITY_DATA = [
    { date: 'Mon', newUsers: 45, activeUsers: 1200, adCreations: 23 },
    { date: 'Tue', newUsers: 52, activeUsers: 1350, adCreations: 28 },
    { date: 'Wed', newUsers: 38, activeUsers: 1180, adCreations: 19 },
    { date: 'Thu', newUsers: 61, activeUsers: 1420, adCreations: 31 },
    { date: 'Fri', newUsers: 55, activeUsers: 1380, adCreations: 27 },
    { date: 'Sat', newUsers: 42, activeUsers: 1150, adCreations: 21 },
    { date: 'Sun', newUsers: 38, activeUsers: 1080, adCreations: 18 },
];
const GEOGRAPHIC_DATA = [
    { country: 'United States', users: 4200, revenue: 98500, color: '#8B5CF6' },
    { country: 'United Kingdom', users: 1800, revenue: 42300, color: '#06B6D4' },
    { country: 'Canada', users: 1200, revenue: 28900, color: '#10B981' },
    { country: 'Australia', users: 950, revenue: 22100, color: '#F59E0B' },
    { country: 'Germany', users: 850, revenue: 19800, color: '#EF4444' },
    { country: 'Others', users: 3450, revenue: 33080, color: '#6B7280' },
];
const SAMPLE_USERS = [
    {
        id: '1',
        username: 'john_advertiser',
        email: 'john@example.com',
        status: 'active',
        joinDate: new Date('2024-01-15'),
        totalSpent: 2450,
        adsCreated: 12,
        lastActive: new Date(),
        country: 'United States',
    },
    {
        id: '2',
        username: 'sarah_marketing',
        email: 'sarah@company.com',
        status: 'active',
        joinDate: new Date('2024-01-10'),
        totalSpent: 1890,
        adsCreated: 8,
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
        country: 'United Kingdom',
    },
];
const SAMPLE_ADS = [
    {
        id: '1',
        title: 'Summer Sale - 50% Off Everything',
        advertiser: 'john_advertiser',
        status: 'pending',
        submittedAt: new Date(),
        category: 'Retail',
    },
    {
        id: '2',
        title: 'New Product Launch Event',
        advertiser: 'sarah_marketing',
        status: 'approved',
        submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        category: 'Technology',
    },
];
export function AdminDashboard() {
    const { t } = useTranslation();
    const [stats, setStats] = useState(SAMPLE_STATS);
    const [users, setUsers] = useState(SAMPLE_USERS);
    const [ads, setAds] = useState(SAMPLE_ADS);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState('30d');
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-500/20 text-green-300 border-green-500/30';
            case 'suspended': return 'bg-red-500/20 text-red-300 border-red-500/30';
            case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
            case 'approved': return 'bg-green-500/20 text-green-300 border-green-500/30';
            case 'rejected': return 'bg-red-500/20 text-red-300 border-red-500/30';
            default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900", children: [_jsx(Navigation, {}), _jsx("div", { className: "pt-20 pb-12", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent", children: "Admin Dashboard" }), _jsx("p", { className: "text-gray-300 mt-2", children: "Platform overview and management tools" })] }), _jsxs("div", { className: "flex gap-3", children: [_jsxs(Button, { variant: "outline", className: "border-white/30 text-white hover:bg-white/10", children: [_jsx(RefreshCw, { className: "w-4 h-4 mr-2" }), "Refresh"] }), _jsxs(Button, { variant: "outline", className: "border-white/30 text-white hover:bg-white/10", children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Export"] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8", children: [_jsx(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-400 text-sm", children: "Total Users" }), _jsx("p", { className: "text-2xl font-bold text-white", children: stats.totalUsers.toLocaleString() })] }), _jsx(Users, { className: "w-8 h-8 text-blue-400" })] }), _jsx("p", { className: "text-blue-400 text-sm mt-2", children: "+12% this month" })] }) }), _jsx(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-400 text-sm", children: "Revenue" }), _jsxs("p", { className: "text-2xl font-bold text-white", children: ["$", stats.totalRevenue.toLocaleString()] })] }), _jsx(DollarSign, { className: "w-8 h-8 text-green-400" })] }), _jsx("p", { className: "text-green-400 text-sm mt-2", children: "+18% this month" })] }) }), _jsx(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-400 text-sm", children: "Active Ads" }), _jsx("p", { className: "text-2xl font-bold text-white", children: stats.activeAds.toLocaleString() })] }), _jsx(Zap, { className: "w-8 h-8 text-yellow-400" })] }), _jsx("p", { className: "text-yellow-400 text-sm mt-2", children: "+8% this month" })] }) }), _jsx(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-400 text-sm", children: "Impressions" }), _jsxs("p", { className: "text-2xl font-bold text-white", children: [(stats.totalImpressions / 1000000).toFixed(1), "M"] })] }), _jsx(Eye, { className: "w-8 h-8 text-purple-400" })] }), _jsx("p", { className: "text-purple-400 text-sm mt-2", children: "+15% this month" })] }) }), _jsx(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-400 text-sm", children: "Avg CTR" }), _jsxs("p", { className: "text-2xl font-bold text-white", children: [stats.averageCTR, "%"] })] }), _jsx(Target, { className: "w-8 h-8 text-cyan-400" })] }), _jsx("p", { className: "text-cyan-400 text-sm mt-2", children: "+0.3% this month" })] }) })] }), _jsxs(Tabs, { defaultValue: "overview", className: "space-y-6", children: [_jsxs(TabsList, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: [_jsx(TabsTrigger, { value: "overview", className: "data-[state=active]:bg-white/20", children: "Overview" }), _jsx(TabsTrigger, { value: "users", className: "data-[state=active]:bg-white/20", children: "Users" }), _jsx(TabsTrigger, { value: "moderation", className: "data-[state=active]:bg-white/20", children: "Moderation" }), _jsx(TabsTrigger, { value: "analytics", className: "data-[state=active]:bg-white/20", children: "Analytics" }), _jsx(TabsTrigger, { value: "settings", className: "data-[state=active]:bg-white/20", children: "Settings" })] }), _jsxs(TabsContent, { value: "overview", className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Revenue Trends" }) }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(AreaChart, { data: REVENUE_DATA, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#374151" }), _jsx(XAxis, { dataKey: "month", stroke: "#9CA3AF" }), _jsx(YAxis, { stroke: "#9CA3AF" }), _jsx(Tooltip, { contentStyle: {
                                                                                backgroundColor: '#1F2937',
                                                                                border: '1px solid #374151',
                                                                                borderRadius: '8px'
                                                                            } }), _jsx(Area, { type: "monotone", dataKey: "revenue", stroke: "#8B5CF6", fill: "#8B5CF6", fillOpacity: 0.3 })] }) }) })] }), _jsxs(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "User Activity" }) }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: USER_ACTIVITY_DATA, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#374151" }), _jsx(XAxis, { dataKey: "date", stroke: "#9CA3AF" }), _jsx(YAxis, { stroke: "#9CA3AF" }), _jsx(Tooltip, { contentStyle: {
                                                                                backgroundColor: '#1F2937',
                                                                                border: '1px solid #374151',
                                                                                borderRadius: '8px'
                                                                            } }), _jsx(Line, { type: "monotone", dataKey: "newUsers", stroke: "#10B981", strokeWidth: 2 }), _jsx(Line, { type: "monotone", dataKey: "activeUsers", stroke: "#06B6D4", strokeWidth: 2 }), _jsx(Line, { type: "monotone", dataKey: "adCreations", stroke: "#F59E0B", strokeWidth: 2 })] }) }) })] })] }), _jsxs(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Geographic Distribution" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: GEOGRAPHIC_DATA, cx: "50%", cy: "50%", outerRadius: 80, fill: "#8884d8", dataKey: "users", label: ({ country, percent }) => `${country} ${(percent * 100).toFixed(0)}%`, children: GEOGRAPHIC_DATA.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, {})] }) }), _jsx("div", { className: "space-y-3", children: GEOGRAPHIC_DATA.map((country, index) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-white/5 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-4 h-4 rounded-full", style: { backgroundColor: country.color } }), _jsx("span", { className: "text-white", children: country.country })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "text-white font-medium", children: [country.users.toLocaleString(), " users"] }), _jsxs("p", { className: "text-gray-400 text-sm", children: ["$", country.revenue.toLocaleString()] })] })] }, index))) })] }) })] })] }), _jsx(TabsContent, { value: "users", className: "space-y-6", children: _jsxs(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-white", children: "User Management" }), _jsx(CardDescription, { className: "text-gray-300", children: "Manage platform users and their activities" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" }), _jsx(Input, { placeholder: "Search users...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400" })] }), _jsx(Button, { variant: "outline", className: "border-white/30 text-white hover:bg-white/10", children: _jsx(Filter, { className: "w-4 h-4" }) })] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: users.map((user) => (_jsx("div", { className: "p-4 bg-white/5 rounded-lg border border-white/10", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-white font-bold", children: user.username.charAt(0).toUpperCase() }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-white font-semibold", children: user.username }), _jsx("p", { className: "text-gray-400 text-sm", children: user.email })] }), _jsx(Badge, { className: getStatusColor(user.status), children: user.status })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "text-right text-sm", children: [_jsxs("p", { className: "text-white", children: ["Spent: $", user.totalSpent] }), _jsxs("p", { className: "text-gray-400", children: ["Ads: ", user.adsCreated] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", variant: "ghost", className: "text-gray-400 hover:text-green-400", children: _jsx(UserCheck, { className: "w-4 h-4" }) }), _jsx(Button, { size: "sm", variant: "ghost", className: "text-gray-400 hover:text-red-400", children: _jsx(UserX, { className: "w-4 h-4" }) })] })] })] }) }, user.id))) }) })] }) }), _jsx(TabsContent, { value: "moderation", className: "space-y-6", children: _jsxs(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Ad Moderation Queue" }), _jsx(CardDescription, { className: "text-gray-300", children: "Review and approve submitted advertisements" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: ads.map((ad) => (_jsx("div", { className: "p-4 bg-white/5 rounded-lg border border-white/10", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("h3", { className: "text-white font-semibold", children: ad.title }), _jsx(Badge, { className: getStatusColor(ad.status), children: ad.status })] }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-gray-400", children: [_jsxs("span", { children: ["By: ", ad.advertiser] }), _jsxs("span", { children: ["Category: ", ad.category] }), _jsxs("span", { children: ["Submitted: ", ad.submittedAt.toLocaleDateString()] })] }), ad.flagReason && (_jsxs("div", { className: "mt-2 flex items-center gap-2 text-red-400 text-sm", children: [_jsx(Flag, { className: "w-4 h-4" }), ad.flagReason] }))] }), ad.status === 'pending' && (_jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { size: "sm", className: "bg-green-600 hover:bg-green-700", children: [_jsx(UserCheck, { className: "w-4 h-4 mr-1" }), "Approve"] }), _jsxs(Button, { size: "sm", variant: "destructive", children: [_jsx(UserX, { className: "w-4 h-4 mr-1" }), "Reject"] })] }))] }) }, ad.id))) }) })] }) }), _jsx(TabsContent, { value: "analytics", className: "space-y-6", children: _jsxs(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Platform Performance" }) }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 400, children: _jsxs(BarChart, { data: REVENUE_DATA, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#374151" }), _jsx(XAxis, { dataKey: "month", stroke: "#9CA3AF" }), _jsx(YAxis, { stroke: "#9CA3AF" }), _jsx(Tooltip, { contentStyle: {
                                                                    backgroundColor: '#1F2937',
                                                                    border: '1px solid #374151',
                                                                    borderRadius: '8px'
                                                                } }), _jsx(Bar, { dataKey: "revenue", fill: "#8B5CF6" }), _jsx(Bar, { dataKey: "users", fill: "#06B6D4" }), _jsx(Bar, { dataKey: "ads", fill: "#10B981" })] }) }) })] }) }), _jsx(TabsContent, { value: "settings", className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Platform Settings" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-white", children: "Auto-approve ads" }), _jsx(Button, { variant: "outline", size: "sm", className: "border-white/30 text-white", children: "Disabled" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-white", children: "Maintenance mode" }), _jsx(Button, { variant: "outline", size: "sm", className: "border-white/30 text-white", children: "Off" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-white", children: "New user registrations" }), _jsx(Button, { variant: "outline", size: "sm", className: "border-white/30 text-white", children: "Enabled" })] })] })] }), _jsxs(Card, { className: "bg-white/10 backdrop-blur-sm border-white/20", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "System Health" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-white", children: "Database" }), _jsx(Badge, { className: "bg-green-500/20 text-green-300 border-green-500/30", children: "Healthy" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-white", children: "API Response" }), _jsx(Badge, { className: "bg-green-500/20 text-green-300 border-green-500/30", children: "Fast" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-white", children: "Storage" }), _jsx(Badge, { className: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30", children: "75% Used" })] })] })] })] }) })] })] }) })] }));
}
