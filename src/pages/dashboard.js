import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { apiRequest } from "@/lib/queryClient";
export default function Dashboard() {
    const [, setLocation] = useLocation();
    const { data: auth, isLoading: authLoading } = useAuth();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { data: campaigns = [], isLoading: campaignsLoading } = useQuery({
        queryKey: ["/api/campaigns"],
        enabled: !!auth?.user,
    });
    const { data: ads = [], isLoading: adsLoading } = useQuery({
        queryKey: ["/api/ads"],
        enabled: !!auth?.user,
    });
    const updateCampaignStatus = useMutation({
        mutationFn: async ({ campaignId, status }) => {
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
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        },
    });
    const updateAdStatus = useMutation({
        mutationFn: async ({ adId, status }) => {
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
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        },
    });
    if (authLoading) {
        return (_jsx("div", { className: "min-h-screen bg-darker-bg flex items-center justify-center", children: _jsx("div", { className: "w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin" }) }));
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
    const getStatusBadge = (status) => {
        const statusConfig = {
            active: { className: "bg-green-500 text-white", label: "Active" },
            pending: { className: "bg-yellow-500 text-black", label: "Pending" },
            paused: { className: "bg-gray-500 text-white", label: "Paused" },
            approved: { className: "bg-green-500 text-white", label: "Approved" },
            rejected: { className: "bg-red-500 text-white", label: "Rejected" },
            completed: { className: "bg-blue-500 text-white", label: "Completed" },
        };
        const config = statusConfig[status] || { className: "bg-gray-500 text-white", label: status };
        return _jsx(Badge, { className: config.className, children: config.label });
    };
    const getPlacementIcon = (placement) => {
        const icons = {
            premium: "👑",
            featured: "⭐",
            standard: "📍",
        };
        return icons[placement] || "📍";
    };
    return (_jsxs("div", { className: "min-h-screen bg-darker-bg", children: [_jsx(Navigation, {}), _jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h1", { className: "text-4xl font-orbitron font-bold mb-4 text-neon-cyan neon-text", children: "CAMPAIGN DASHBOARD" }), _jsx("p", { className: "text-xl text-gray-300", children: "Monitor and manage your advertising campaigns" })] }), _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8", children: [_jsx(Card, { className: "bg-gradient-to-br from-neon-pink to-pink-600 text-white border-0", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm opacity-80", children: "Total Impressions" }), _jsx("p", { className: "text-2xl font-bold", children: totalImpressions >= 1000000
                                                                        ? `${(totalImpressions / 1000000).toFixed(1)}M`
                                                                        : totalImpressions >= 1000
                                                                            ? `${(totalImpressions / 1000).toFixed(1)}K`
                                                                            : totalImpressions.toLocaleString() })] }), _jsx("i", { className: "fas fa-eye text-3xl opacity-80" })] }), _jsxs("div", { className: "mt-2 text-sm opacity-80", children: [_jsx("i", { className: "fas fa-arrow-up mr-1" }), activeCampaigns, " active campaigns"] })] }) }), _jsx(Card, { className: "bg-gradient-to-br from-neon-cyan to-blue-600 text-white border-0", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm opacity-80", children: "Click-through Rate" }), _jsxs("p", { className: "text-2xl font-bold", children: [ctr, "%"] })] }), _jsx("i", { className: "fas fa-mouse-pointer text-3xl opacity-80" })] }), _jsxs("div", { className: "mt-2 text-sm opacity-80", children: [_jsx("i", { className: "fas fa-chart-line mr-1" }), totalClicks.toLocaleString(), " total clicks"] })] }) }), _jsx(Card, { className: "bg-gradient-to-br from-neon-gold to-yellow-600 text-black border-0", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm opacity-80", children: "Total Spend" }), _jsxs("p", { className: "text-2xl font-bold", children: ["$", totalSpend.toFixed(2)] })] }), _jsx("i", { className: "fas fa-dollar-sign text-3xl opacity-80" })] }), _jsxs("div", { className: "mt-2 text-sm opacity-80", children: [_jsx("i", { className: "fas fa-wallet mr-1" }), "Across ", campaigns.length, " campaigns"] })] }) }), _jsx(Card, { className: "bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm opacity-80", children: "Active Ads" }), _jsx("p", { className: "text-2xl font-bold", children: ads.filter(ad => ad.status === "approved").length })] }), _jsx("i", { className: "fas fa-bullhorn text-3xl opacity-80" })] }), _jsxs("div", { className: "mt-2 text-sm opacity-80", children: [_jsx("i", { className: "fas fa-clock mr-1" }), ads.filter(ad => ad.status === "pending").length, " pending approval"] })] }) })] }), _jsxs(Card, { className: "bg-darker-bg border-gray-700 mb-8", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-2xl font-bold text-white", children: "Active Campaigns" }), _jsxs(Button, { onClick: () => setLocation("/create-ad"), className: "bg-neon-pink text-white hover:bg-pink-600", children: [_jsx("i", { className: "fas fa-plus mr-2" }), "New Campaign"] })] }) }), _jsx(CardContent, { children: campaignsLoading ? (_jsx("div", { className: "flex items-center justify-center py-8", children: _jsx("div", { className: "w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" }) })) : campaigns.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx("i", { className: "fas fa-bullhorn text-4xl text-gray-400 mb-4" }), _jsx("p", { className: "text-gray-400 mb-4", children: "No campaigns yet" }), _jsx(Button, { onClick: () => setLocation("/create-ad"), className: "bg-neon-cyan text-black hover:bg-cyan-400", children: "Create Your First Campaign" })] })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-gray-700", children: [_jsx("th", { className: "text-left py-3 px-4 text-gray-300", children: "Campaign" }), _jsx("th", { className: "text-left py-3 px-4 text-gray-300", children: "Status" }), _jsx("th", { className: "text-left py-3 px-4 text-gray-300", children: "Impressions" }), _jsx("th", { className: "text-left py-3 px-4 text-gray-300", children: "CTR" }), _jsx("th", { className: "text-left py-3 px-4 text-gray-300", children: "Spend" }), _jsx("th", { className: "text-left py-3 px-4 text-gray-300", children: "Actions" })] }) }), _jsx("tbody", { children: campaigns.map((campaign) => {
                                                            const campaignCtr = campaign.impressions > 0
                                                                ? ((campaign.clicks / campaign.impressions) * 100).toFixed(1)
                                                                : "0.0";
                                                            return (_jsxs("tr", { className: "border-b border-gray-800 hover:bg-gray-800 transition-colors", children: [_jsx("td", { className: "py-4 px-4", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-neon-pink to-neon-orange rounded-lg flex items-center justify-center text-2xl", children: getPlacementIcon(campaign.placement) }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold text-white", children: campaign.name }), _jsxs("div", { className: "text-sm text-gray-400 capitalize", children: [campaign.placement, " \u2022 ", campaign.ad?.type] })] })] }) }), _jsx("td", { className: "py-4 px-4", children: getStatusBadge(campaign.status) }), _jsx("td", { className: "py-4 px-4 text-white", children: campaign.impressions?.toLocaleString() || "0" }), _jsxs("td", { className: "py-4 px-4 text-white", children: [campaignCtr, "%"] }), _jsxs("td", { className: "py-4 px-4 text-white", children: ["$", campaign.totalSpend || "0"] }), _jsx("td", { className: "py-4 px-4", children: _jsxs("div", { className: "flex space-x-2", children: [campaign.status === "active" && (_jsx(Button, { size: "sm", variant: "outline", onClick: () => updateCampaignStatus.mutate({ campaignId: campaign.id, status: "paused" }), className: "text-gray-400 hover:text-gray-300 border-gray-600", children: _jsx("i", { className: "fas fa-pause" }) })), campaign.status === "paused" && (_jsx(Button, { size: "sm", variant: "outline", onClick: () => updateCampaignStatus.mutate({ campaignId: campaign.id, status: "active" }), className: "text-green-400 hover:text-green-300 border-gray-600", children: _jsx("i", { className: "fas fa-play" }) })), _jsx(Button, { size: "sm", variant: "outline", className: "text-neon-cyan hover:text-cyan-400 border-gray-600", children: _jsx("i", { className: "fas fa-edit" }) })] }) })] }, campaign.id));
                                                        }) })] }) })) })] }), _jsxs(Card, { className: "bg-darker-bg border-gray-700", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-2xl font-bold text-white", children: "Recent Ads" }) }), _jsx(CardContent, { children: adsLoading ? (_jsx("div", { className: "flex items-center justify-center py-8", children: _jsx("div", { className: "w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" }) })) : ads.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx("i", { className: "fas fa-image text-4xl text-gray-400 mb-4" }), _jsx("p", { className: "text-gray-400 mb-4", children: "No ads created yet" }), _jsx(Button, { onClick: () => setLocation("/create-ad"), className: "bg-neon-pink text-white hover:bg-pink-600", children: "Create Your First Ad" })] })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: ads.slice(0, 6).map((ad) => (_jsx(Card, { className: "bg-gray-800 border-gray-700", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsx("h3", { className: "font-semibold text-white truncate", children: ad.title }), getStatusBadge(ad.status)] }), ad.content?.assetUrl && (_jsx("div", { className: "mb-3", children: _jsx("img", { src: ad.content.assetUrl, alt: ad.title, className: "w-full h-32 object-cover rounded-lg" }) })), _jsxs("div", { className: "flex items-center justify-between text-sm text-gray-400", children: [_jsx("span", { className: "capitalize", children: ad.type }), _jsx("span", { children: new Date(ad.createdAt).toLocaleDateString() })] }), ad.status === "pending" && (_jsxs("div", { className: "flex space-x-2 mt-3", children: [_jsx(Button, { size: "sm", variant: "outline", onClick: () => updateAdStatus.mutate({ adId: ad.id, status: "approved" }), className: "text-green-400 hover:text-green-300 border-gray-600 flex-1", children: "Approve" }), _jsx(Button, { size: "sm", variant: "outline", onClick: () => updateAdStatus.mutate({ adId: ad.id, status: "rejected" }), className: "text-red-400 hover:text-red-300 border-gray-600 flex-1", children: "Reject" })] }))] }) }, ad.id))) })) })] })] })] })] }));
}
