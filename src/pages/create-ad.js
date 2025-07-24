import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { AIAdCreator } from "@/components/ai-ad-creator";
import { ManualAdUpload } from "@/components/manual-ad-upload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
const placementOptions = [
    {
        id: "premium",
        name: "Premium Banner",
        description: "Top billboard placement",
        price: 299,
        estimatedViews: "~50K views",
    },
    {
        id: "featured",
        name: "Featured Slot",
        description: "Center billboard placement",
        price: 199,
        estimatedViews: "~30K views",
    },
    {
        id: "standard",
        name: "Standard Slot",
        description: "Side billboard placement",
        price: 99,
        estimatedViews: "~15K views",
    },
];
export default function CreateAd() {
    const [, setLocation] = useLocation();
    const { data: auth, isLoading } = useAuth();
    const [currentAd, setCurrentAd] = useState(null);
    const [selectedPlacement, setSelectedPlacement] = useState("featured");
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-darker-bg flex items-center justify-center", children: _jsx("div", { className: "w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin" }) }));
    }
    if (!auth?.user) {
        setLocation("/auth");
        return null;
    }
    const handleAdGenerated = (ad) => {
        setCurrentAd(ad);
    };
    const handleAdUploaded = (ad) => {
        setCurrentAd({
            title: ad.title,
            description: ad.description || "",
            callToAction: ad.callToAction || "Learn More",
            imageUrl: ad.content?.assetUrl,
        });
    };
    const handleProceedToPayment = () => {
        const selectedOption = placementOptions.find(option => option.id === selectedPlacement);
        if (selectedOption && currentAd) {
            setLocation(`/checkout?placement=${selectedPlacement}&amount=${selectedOption.price}`);
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-darker-bg", children: [_jsx(Navigation, {}), _jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h1", { className: "text-4xl font-orbitron font-bold mb-4 text-neon-pink neon-text", children: "AD CREATION STUDIO" }), _jsx("p", { className: "text-xl text-gray-300", children: "Create stunning ads with AI or upload your own" })] }), _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12", children: [_jsx(AIAdCreator, { onAdGenerated: handleAdGenerated }), _jsx(ManualAdUpload, { onAdUploaded: handleAdUploaded })] }), currentAd && (_jsxs(Card, { className: "bg-dark-bg border-neon-gold", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-2xl font-bold text-neon-gold flex items-center", children: [_jsx("i", { className: "fas fa-eye mr-3" }), "Preview & Placement"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-lg font-semibold mb-4", children: "Ad Preview" }), _jsxs("div", { className: "bg-gray-800 p-6 rounded-lg border-2 border-neon-gold", children: [currentAd.imageUrl && (_jsx("div", { className: "relative mb-4", children: _jsx("img", { src: currentAd.imageUrl, alt: currentAd.title, className: "w-full h-48 object-cover rounded-lg" }) })), _jsxs("div", { children: [_jsx("h5", { className: "font-bold text-lg text-white mb-2", children: currentAd.title }), _jsx("p", { className: "text-gray-300 mb-3", children: currentAd.description }), _jsx(Button, { size: "sm", className: "bg-neon-cyan text-black hover:bg-cyan-400", children: currentAd.callToAction })] })] }), _jsx("div", { className: "flex space-x-2 mt-4", children: _jsxs(Button, { variant: "outline", size: "sm", className: "border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white", onClick: () => setCurrentAd(null), children: [_jsx("i", { className: "fas fa-edit mr-1" }), "Edit"] }) })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-lg font-semibold mb-4", children: "Select Placement" }), _jsx("div", { className: "space-y-3", children: placementOptions.map((option) => (_jsx("div", { className: `p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedPlacement === option.id
                                                                    ? "border-neon-gold bg-neon-gold bg-opacity-10"
                                                                    : "border-gray-700 bg-gray-800 hover:border-neon-gold"}`, onClick: () => setSelectedPlacement(option.id), children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h5", { className: "font-semibold flex items-center", children: [option.name, option.id === "featured" && (_jsx(Badge, { className: "ml-2 bg-neon-pink text-white", children: "POPULAR" }))] }), _jsx("p", { className: "text-sm text-gray-400", children: option.description })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-lg font-bold text-neon-gold", children: ["$", option.price, "/day"] }), _jsx("div", { className: "text-xs text-gray-400", children: option.estimatedViews })] })] }) }, option.id))) }), _jsxs(Button, { className: "w-full bg-neon-gold text-black py-3 text-lg font-bold mt-6 hover:bg-yellow-500", onClick: handleProceedToPayment, children: [_jsx("i", { className: "fas fa-credit-card mr-2" }), "Proceed to Payment - $", placementOptions.find(o => o.id === selectedPlacement)?.price, "/day"] })] })] }) })] }))] })] })] }));
}
