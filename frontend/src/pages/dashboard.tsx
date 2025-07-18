import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { apiRequest } from "@/lib/queryClient";

interface Campaign {
  id: number;
  name: string;
  placement: string;
  status: string;
  impressions: number;
  clicks: number;
  totalSpend: string;
  dailyBudget: string;
  startDate: string;
  endDate: string;
  ad: {
    title: string;
    type: string;
    content: any;
  };
}

interface Ad {
  id: number;
  title: string;
  type: string;
  status: string;
  content: any;
  createdAt: string;
}

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { data: auth, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: campaigns = [], isLoading: campaignsLoading } = useQuery<Campaign[]>({
    queryKey: ["/api/campaigns"],
    enabled: !!auth?.user,
  });

  const { data: ads = [], isLoading: adsLoading } = useQuery<Ad[]>({
    queryKey: ["/api/ads"],
    enabled: !!auth?.user,
  });

  const updateCampaignStatus = useMutation({
    mutationFn: async ({ campaignId, status }: { campaignId: number; status: string }) => {
      const res = await apiRequest("PATCH", `/api/campaigns/${campaignId}/status`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/campaigns"] });
      toast({
        title: "Success",
        description: "Campaign status updated",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateAdStatus = useMutation({
    mutationFn: async ({ adId, status }: { adId: number; status: string }) => {
      const res = await apiRequest("PATCH", `/api/ads/${adId}/status`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ads"] });
      toast({
        title: "Success",
        description: "Ad status updated",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-darker-bg flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!auth?.user) {
    setLocation("/auth");
    return null;
  }

  // Calculate dashboard stats
  const totalImpressions = campaigns.reduce((sum, campaign) => sum + (campaign.impressions || 0), 0);
  const totalClicks = campaigns.reduce((sum, campaign) => sum + (campaign.clicks || 0), 0);
  const totalSpend = campaigns.reduce((sum, campaign) => sum + parseFloat(campaign.totalSpend || "0"), 0);
  const ctr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(1) : "0.0";
  const activeCampaigns = campaigns.filter(c => c.status === "active").length;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { className: "bg-green-500 text-white", label: "Active" },
      pending: { className: "bg-yellow-500 text-black", label: "Pending" },
      paused: { className: "bg-gray-500 text-white", label: "Paused" },
      approved: { className: "bg-green-500 text-white", label: "Approved" },
      rejected: { className: "bg-red-500 text-white", label: "Rejected" },
      completed: { className: "bg-blue-500 text-white", label: "Completed" },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { className: "bg-gray-500 text-white", label: status };
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPlacementIcon = (placement: string) => {
    const icons = {
      premium: "👑",
      featured: "⭐",
      standard: "📍",
    };
    return icons[placement as keyof typeof icons] || "📍";
  };

  return (
    <div className="min-h-screen bg-darker-bg">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-orbitron font-bold mb-4 text-neon-cyan neon-text">
            CAMPAIGN DASHBOARD
          </h1>
          <p className="text-xl text-gray-300">Monitor and manage your advertising campaigns</p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-neon-pink to-pink-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Total Impressions</p>
                    <p className="text-2xl font-bold">
                      {totalImpressions >= 1000000 
                        ? `${(totalImpressions / 1000000).toFixed(1)}M`
                        : totalImpressions >= 1000
                        ? `${(totalImpressions / 1000).toFixed(1)}K`
                        : totalImpressions.toLocaleString()
                      }
                    </p>
                  </div>
                  <i className="fas fa-eye text-3xl opacity-80"></i>
                </div>
                <div className="mt-2 text-sm opacity-80">
                  <i className="fas fa-arrow-up mr-1"></i>
                  {activeCampaigns} active campaigns
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-neon-cyan to-blue-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Click-through Rate</p>
                    <p className="text-2xl font-bold">{ctr}%</p>
                  </div>
                  <i className="fas fa-mouse-pointer text-3xl opacity-80"></i>
                </div>
                <div className="mt-2 text-sm opacity-80">
                  <i className="fas fa-chart-line mr-1"></i>
                  {totalClicks.toLocaleString()} total clicks
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-neon-gold to-yellow-600 text-black border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Total Spend</p>
                    <p className="text-2xl font-bold">${totalSpend.toFixed(2)}</p>
                  </div>
                  <i className="fas fa-dollar-sign text-3xl opacity-80"></i>
                </div>
                <div className="mt-2 text-sm opacity-80">
                  <i className="fas fa-wallet mr-1"></i>
                  Across {campaigns.length} campaigns
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Active Ads</p>
                    <p className="text-2xl font-bold">
                      {ads.filter(ad => ad.status === "approved").length}
                    </p>
                  </div>
                  <i className="fas fa-bullhorn text-3xl opacity-80"></i>
                </div>
                <div className="mt-2 text-sm opacity-80">
                  <i className="fas fa-clock mr-1"></i>
                  {ads.filter(ad => ad.status === "pending").length} pending approval
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Campaigns */}
          <Card className="bg-darker-bg border-gray-700 mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-white">Active Campaigns</CardTitle>
                <Button
                  onClick={() => setLocation("/create-ad")}
                  className="bg-neon-pink text-white hover:bg-pink-600"
                >
                  <i className="fas fa-plus mr-2"></i>
                  New Campaign
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {campaignsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
                </div>
              ) : campaigns.length === 0 ? (
                <div className="text-center py-8">
                  <i className="fas fa-bullhorn text-4xl text-gray-400 mb-4"></i>
                  <p className="text-gray-400 mb-4">No campaigns yet</p>
                  <Button
                    onClick={() => setLocation("/create-ad")}
                    className="bg-neon-cyan text-black hover:bg-cyan-400"
                  >
                    Create Your First Campaign
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-300">Campaign</th>
                        <th className="text-left py-3 px-4 text-gray-300">Status</th>
                        <th className="text-left py-3 px-4 text-gray-300">Impressions</th>
                        <th className="text-left py-3 px-4 text-gray-300">CTR</th>
                        <th className="text-left py-3 px-4 text-gray-300">Spend</th>
                        <th className="text-left py-3 px-4 text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.map((campaign) => {
                        const campaignCtr = campaign.impressions > 0 
                          ? ((campaign.clicks / campaign.impressions) * 100).toFixed(1)
                          : "0.0";
                        
                        return (
                          <tr key={campaign.id} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-neon-pink to-neon-orange rounded-lg flex items-center justify-center text-2xl">
                                  {getPlacementIcon(campaign.placement)}
                                </div>
                                <div>
                                  <div className="font-semibold text-white">{campaign.name}</div>
                                  <div className="text-sm text-gray-400 capitalize">
                                    {campaign.placement} • {campaign.ad?.type}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              {getStatusBadge(campaign.status)}
                            </td>
                            <td className="py-4 px-4 text-white">
                              {campaign.impressions?.toLocaleString() || "0"}
                            </td>
                            <td className="py-4 px-4 text-white">{campaignCtr}%</td>
                            <td className="py-4 px-4 text-white">${campaign.totalSpend || "0"}</td>
                            <td className="py-4 px-4">
                              <div className="flex space-x-2">
                                {campaign.status === "active" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateCampaignStatus.mutate({ campaignId: campaign.id, status: "paused" })}
                                    className="text-gray-400 hover:text-gray-300 border-gray-600"
                                  >
                                    <i className="fas fa-pause"></i>
                                  </Button>
                                )}
                                {campaign.status === "paused" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateCampaignStatus.mutate({ campaignId: campaign.id, status: "active" })}
                                    className="text-green-400 hover:text-green-300 border-gray-600"
                                  >
                                    <i className="fas fa-play"></i>
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-neon-cyan hover:text-cyan-400 border-gray-600"
                                >
                                  <i className="fas fa-edit"></i>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Ads */}
          <Card className="bg-darker-bg border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Recent Ads</CardTitle>
            </CardHeader>
            <CardContent>
              {adsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
                </div>
              ) : ads.length === 0 ? (
                <div className="text-center py-8">
                  <i className="fas fa-image text-4xl text-gray-400 mb-4"></i>
                  <p className="text-gray-400 mb-4">No ads created yet</p>
                  <Button
                    onClick={() => setLocation("/create-ad")}
                    className="bg-neon-pink text-white hover:bg-pink-600"
                  >
                    Create Your First Ad
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ads.slice(0, 6).map((ad) => (
                    <Card key={ad.id} className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-white truncate">{ad.title}</h3>
                          {getStatusBadge(ad.status)}
                        </div>
                        
                        {ad.content?.assetUrl && (
                          <div className="mb-3">
                            <img
                              src={ad.content.assetUrl}
                              alt={ad.title}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span className="capitalize">{ad.type}</span>
                          <span>{new Date(ad.createdAt).toLocaleDateString()}</span>
                        </div>
                        
                        {ad.status === "pending" && (
                          <div className="flex space-x-2 mt-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateAdStatus.mutate({ adId: ad.id, status: "approved" })}
                              className="text-green-400 hover:text-green-300 border-gray-600 flex-1"
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateAdStatus.mutate({ adId: ad.id, status: "rejected" })}
                              className="text-red-400 hover:text-red-300 border-gray-600 flex-1"
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
