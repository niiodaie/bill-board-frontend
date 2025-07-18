import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Cell
} from 'recharts';
import { 
  DollarSign,
  Eye,
  MousePointer,
  TrendingUp,
  Calendar,
  Users,
  Target,
  Settings,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  BarChart3,
  Download,
  Share2,
  Gift,
  CreditCard
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  slotType: 'premium' | 'featured' | 'standard';
  startDate: Date;
  endDate: Date;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  conversions: number;
}

interface Analytics {
  totalSpent: number;
  totalImpressions: number;
  totalClicks: number;
  averageCTR: number;
  averageCPC: number;
  totalConversions: number;
  roi: number;
}

const SAMPLE_CAMPAIGNS: Campaign[] = [
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
  const [campaigns, setCampaigns] = useState<Campaign[]>(SAMPLE_CAMPAIGNS);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalSpent: 1070,
    totalImpressions: 73000,
    totalClicks: 2190,
    averageCTR: 3.0,
    averageCPC: 0.49,
    totalConversions: 109,
    roi: 245,
  });
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'paused': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'draft': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getSlotTypeColor = (slotType: string) => {
    switch (slotType) {
      case 'premium': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'featured': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'standard': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Advertiser Dashboard
              </h1>
              <p className="text-gray-300 mt-2">
                Manage your campaigns and track performance
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>

          {/* Analytics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Spent</p>
                    <p className="text-2xl font-bold text-white">${analytics.totalSpent}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-green-400 text-sm mt-2">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Impressions</p>
                    <p className="text-2xl font-bold text-white">{analytics.totalImpressions.toLocaleString()}</p>
                  </div>
                  <Eye className="w-8 h-8 text-blue-400" />
                </div>
                <p className="text-blue-400 text-sm mt-2">+8% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Clicks</p>
                    <p className="text-2xl font-bold text-white">{analytics.totalClicks.toLocaleString()}</p>
                  </div>
                  <MousePointer className="w-8 h-8 text-purple-400" />
                </div>
                <p className="text-purple-400 text-sm mt-2">+15% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">ROI</p>
                    <p className="text-2xl font-bold text-white">{analytics.roi}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-yellow-400" />
                </div>
                <p className="text-yellow-400 text-sm mt-2">+5% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="campaigns" className="space-y-6">
            <TabsList className="bg-white/10 backdrop-blur-sm border-white/20">
              <TabsTrigger value="campaigns" className="data-[state=active]:bg-white/20">
                Campaigns
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-white/20">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="referrals" className="data-[state=active]:bg-white/20">
                Referrals
              </TabsTrigger>
              <TabsTrigger value="billing" className="data-[state=active]:bg-white/20">
                Billing
              </TabsTrigger>
            </TabsList>

            {/* Campaigns Tab */}
            <TabsContent value="campaigns" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Active Campaigns</CardTitle>
                  <CardDescription className="text-gray-300">
                    Manage and monitor your advertising campaigns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaigns.map((campaign) => (
                      <div key={campaign.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <h3 className="text-white font-semibold">{campaign.name}</h3>
                            <Badge className={getStatusColor(campaign.status)}>
                              {campaign.status}
                            </Badge>
                            <Badge className={getSlotTypeColor(campaign.slotType)}>
                              {campaign.slotType}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                              {campaign.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </Button>
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Budget</p>
                            <p className="text-white font-medium">${campaign.budget}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Spent</p>
                            <p className="text-white font-medium">${campaign.spent}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Impressions</p>
                            <p className="text-white font-medium">{campaign.impressions.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Clicks</p>
                            <p className="text-white font-medium">{campaign.clicks.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">CTR</p>
                            <p className="text-white font-medium">{campaign.ctr}%</p>
                          </div>
                          <div>
                            <p className="text-gray-400">CPC</p>
                            <p className="text-white font-medium">${campaign.cpc}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Conversions</p>
                            <p className="text-white font-medium">{campaign.conversions}</p>
                          </div>
                        </div>

                        <div className="mt-4 bg-white/5 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                            style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                          />
                        </div>
                        <p className="text-gray-400 text-xs mt-1">
                          {Math.round((campaign.spent / campaign.budget) * 100)}% of budget used
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Performance Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={PERFORMANCE_DATA}>
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
                        <Line type="monotone" dataKey="impressions" stroke="#8B5CF6" strokeWidth={2} />
                        <Line type="monotone" dataKey="clicks" stroke="#06B6D4" strokeWidth={2} />
                        <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Slot Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={SLOT_DISTRIBUTION}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {SLOT_DISTRIBUTION.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Daily Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={PERFORMANCE_DATA}>
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
                      <Bar dataKey="impressions" fill="#8B5CF6" />
                      <Bar dataKey="clicks" fill="#06B6D4" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Referrals Tab */}
            <TabsContent value="referrals" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Total Referrals</p>
                        <p className="text-2xl font-bold text-white">23</p>
                      </div>
                      <Users className="w-8 h-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Earnings</p>
                        <p className="text-2xl font-bold text-white">$230</p>
                      </div>
                      <Gift className="w-8 h-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Conversion Rate</p>
                        <p className="text-2xl font-bold text-white">78%</p>
                      </div>
                      <Target className="w-8 h-8 text-purple-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Your Referral Code</CardTitle>
                  <CardDescription className="text-gray-300">
                    Share your code and earn $10 for each successful referral
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm">Your Code</p>
                      <p className="text-2xl font-bold text-white font-mono">BILLBOARD10</p>
                    </div>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Current Balance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-6">
                      <p className="text-4xl font-bold text-white mb-2">$150.00</p>
                      <p className="text-gray-400">Available Credit</p>
                      <Button className="mt-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Add Funds
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                            VISA
                          </div>
                          <span className="text-white">•••• 4242</span>
                        </div>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          Default
                        </Badge>
                      </div>
                      <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { date: '2024-01-15', description: 'Premium Slot - Summer Sale', amount: -299.00 },
                      { date: '2024-01-10', description: 'Featured Slot - Product Launch', amount: -199.00 },
                      { date: '2024-01-05', description: 'Referral Bonus', amount: +10.00 },
                    ].map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{transaction.description}</p>
                          <p className="text-gray-400 text-sm">{transaction.date}</p>
                        </div>
                        <p className={`font-bold ${transaction.amount > 0 ? 'text-green-400' : 'text-white'}`}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

