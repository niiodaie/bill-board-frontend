import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Navigation } from '@/components/navigation';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  Users,
  DollarSign,
  Eye,
  TrendingUp,
  AlertTriangle,
  Shield,
  Settings,
  Search,
  Filter,
  Download,
  RefreshCw,
  UserCheck,
  UserX,
  Flag,
  BarChart3,
  Globe,
  Calendar,
  CreditCard,
  Gift,
  Target,
  Zap,
  Activity
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PlatformStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalAds: number;
  activeAds: number;
  totalImpressions: number;
  totalClicks: number;
  averageCTR: number;
  conversionRate: number;
}

interface User {
  id: string;
  username: string;
  email: string;
  status: 'active' | 'suspended' | 'pending';
  joinDate: Date;
  totalSpent: number;
  adsCreated: number;
  lastActive: Date;
  country: string;
}

interface AdModeration {
  id: string;
  title: string;
  advertiser: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  category: string;
  flagReason?: string;
}

const SAMPLE_STATS: PlatformStats = {
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

const SAMPLE_USERS: User[] = [
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

const SAMPLE_ADS: AdModeration[] = [
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
  const [stats, setStats] = useState<PlatformStats>(SAMPLE_STATS);
  const [users, setUsers] = useState<User[]>(SAMPLE_USERS);
  const [ads, setAds] = useState<AdModeration[]>(SAMPLE_ADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'suspended': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'approved': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-300 mt-2">
                Platform overview and management tools
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Users</p>
                    <p className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <p className="text-blue-400 text-sm mt-2">+12% this month</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Revenue</p>
                    <p className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-green-400 text-sm mt-2">+18% this month</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Ads</p>
                    <p className="text-2xl font-bold text-white">{stats.activeAds.toLocaleString()}</p>
                  </div>
                  <Zap className="w-8 h-8 text-yellow-400" />
                </div>
                <p className="text-yellow-400 text-sm mt-2">+8% this month</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Impressions</p>
                    <p className="text-2xl font-bold text-white">{(stats.totalImpressions / 1000000).toFixed(1)}M</p>
                  </div>
                  <Eye className="w-8 h-8 text-purple-400" />
                </div>
                <p className="text-purple-400 text-sm mt-2">+15% this month</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Avg CTR</p>
                    <p className="text-2xl font-bold text-white">{stats.averageCTR}%</p>
                  </div>
                  <Target className="w-8 h-8 text-cyan-400" />
                </div>
                <p className="text-cyan-400 text-sm mt-2">+0.3% this month</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-white/10 backdrop-blur-sm border-white/20">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white/20">
                Overview
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-white/20">
                Users
              </TabsTrigger>
              <TabsTrigger value="moderation" className="data-[state=active]:bg-white/20">
                Moderation
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-white/20">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-white/20">
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Revenue Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={REVENUE_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }} 
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">User Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={USER_ACTIVITY_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="date" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }} 
                        />
                        <Line type="monotone" dataKey="newUsers" stroke="#10B981" strokeWidth={2} />
                        <Line type="monotone" dataKey="activeUsers" stroke="#06B6D4" strokeWidth={2} />
                        <Line type="monotone" dataKey="adCreations" stroke="#F59E0B" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Geographic Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={GEOGRAPHIC_DATA}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="users"
                          label={({ country, percent }) => `${country} ${(percent * 100).toFixed(0)}%`}
                        >
                          {GEOGRAPHIC_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>

                    <div className="space-y-3">
                      {GEOGRAPHIC_DATA.map((country, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: country.color }}
                            />
                            <span className="text-white">{country.country}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-medium">{country.users.toLocaleString()} users</p>
                            <p className="text-gray-400 text-sm">${country.revenue.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-white">User Management</CardTitle>
                      <CardDescription className="text-gray-300">
                        Manage platform users and their activities
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search users..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                        />
                      </div>
                      <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <Filter className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold">
                                {user.username.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-white font-semibold">{user.username}</h3>
                              <p className="text-gray-400 text-sm">{user.email}</p>
                            </div>
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right text-sm">
                              <p className="text-white">Spent: ${user.totalSpent}</p>
                              <p className="text-gray-400">Ads: {user.adsCreated}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-green-400">
                                <UserCheck className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400">
                                <UserX className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Moderation Tab */}
            <TabsContent value="moderation" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Ad Moderation Queue</CardTitle>
                  <CardDescription className="text-gray-300">
                    Review and approve submitted advertisements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ads.map((ad) => (
                      <div key={ad.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-white font-semibold">{ad.title}</h3>
                              <Badge className={getStatusColor(ad.status)}>
                                {ad.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span>By: {ad.advertiser}</span>
                              <span>Category: {ad.category}</span>
                              <span>Submitted: {ad.submittedAt.toLocaleDateString()}</span>
                            </div>
                            {ad.flagReason && (
                              <div className="mt-2 flex items-center gap-2 text-red-400 text-sm">
                                <Flag className="w-4 h-4" />
                                {ad.flagReason}
                              </div>
                            )}
                          </div>
                          {ad.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <UserCheck className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button size="sm" variant="destructive">
                                <UserX className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Platform Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={REVENUE_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }} 
                      />
                      <Bar dataKey="revenue" fill="#8B5CF6" />
                      <Bar dataKey="users" fill="#06B6D4" />
                      <Bar dataKey="ads" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Platform Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Auto-approve ads</span>
                      <Button variant="outline" size="sm" className="border-white/30 text-white">
                        Disabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Maintenance mode</span>
                      <Button variant="outline" size="sm" className="border-white/30 text-white">
                        Off
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">New user registrations</span>
                      <Button variant="outline" size="sm" className="border-white/30 text-white">
                        Enabled
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">System Health</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Database</span>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        Healthy
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">API Response</span>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        Fast
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Storage</span>
                      <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                        75% Used
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

