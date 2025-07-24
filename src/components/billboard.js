import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
export function Billboard() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isPaused, setIsPaused] = useState(false);
    const { data: ads = [], isLoading } = useQuery({
        queryKey: ["/api/ads/active"],
    });
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const formatCountdown = () => {
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const seconds = currentTime.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };
    if (isLoading) {
        return (_jsx("div", { className: "bg-black p-6 rounded-2xl border-4 border-neon-pink shadow-2xl", children: _jsx("div", { className: "h-[600px] flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" }), _jsx("p", { className: "text-gray-400", children: "Loading billboard..." })] }) }) }));
    }
    return (_jsxs("div", { className: "bg-black p-6 rounded-2xl border-4 border-neon-pink shadow-2xl", children: [_jsxs("div", { className: "grid grid-cols-12 gap-4 h-[600px]", children: [_jsxs("div", { className: "col-span-12 h-32 bg-gradient-to-r from-neon-pink to-neon-orange p-4 rounded-lg flex items-center justify-between relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-black opacity-20" }), _jsxs("div", { className: "relative z-10", children: [_jsx("h3", { className: "text-2xl font-bold text-white", children: "\uD83C\uDFAE SUMMER GAMING SALE" }), _jsx("p", { className: "text-lg text-white", children: "Up to 70% OFF - Limited Time!" })] }), _jsx("div", { className: "relative z-10 text-right", children: _jsxs("div", { className: "bg-red-500 text-white px-4 py-2 rounded-lg font-bold animate-pulse", children: [_jsx("i", { className: "fas fa-clock mr-2" }), formatCountdown()] }) })] }), _jsxs("div", { className: "col-span-4 space-y-4", children: [ads.slice(0, 2).map((ad, index) => (_jsxs("div", { className: `p-4 rounded-lg h-40 flex flex-col justify-between bg-gradient-to-br ${index === 0 ? 'from-blue-600 to-purple-600' : 'from-green-600 to-teal-600'}`, children: [_jsxs("div", { children: [_jsx("h4", { className: "font-bold text-lg text-white", children: ad.title }), _jsx("p", { className: "text-sm opacity-90 text-white", children: ad.content.text || "Amazing offer!" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Badge, { className: "bg-white text-black", children: index === 0 ? 'HOT 🔥' : 'NEW' }), _jsxs("span", { className: "text-xs text-white", children: [Math.floor(Math.random() * 10), "K clicks"] })] })] }, ad.id))), ads.length === 0 && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-lg h-40 flex flex-col justify-between", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-bold text-lg", children: "\uD83C\uDFE0 Real Estate" }), _jsx("p", { className: "text-sm opacity-90", children: "Dream homes await" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Badge, { className: "bg-white text-black", children: "HOT \uD83D\uDD25" }), _jsx("span", { className: "text-xs", children: "3.2K clicks" })] })] }), _jsxs("div", { className: "bg-gradient-to-br from-green-600 to-teal-600 p-4 rounded-lg h-40 flex flex-col justify-between", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-bold text-lg", children: "\uD83C\uDF55 Food Delivery" }), _jsx("p", { className: "text-sm opacity-90", children: "Free delivery today!" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Badge, { className: "bg-yellow-400 text-black", children: "NEW" }), _jsx("span", { className: "text-xs", children: "8.7K clicks" })] })] })] }))] }), _jsxs("div", { className: "col-span-4 bg-gradient-to-br from-neon-cyan to-blue-500 rounded-lg p-6 flex flex-col justify-center items-center text-center relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 opacity-10", children: _jsx("div", { className: "w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-billboard-scroll" }) }), _jsxs("div", { className: "relative z-10", children: [ads[0]?.content.assetUrl ? (_jsx("img", { src: ads[0].content.assetUrl, alt: ads[0].title, className: "w-24 h-24 object-cover rounded-lg mb-4" })) : (_jsx("i", { className: "fas fa-car text-6xl mb-4 text-white" })), _jsx("h3", { className: "text-2xl font-bold mb-2", children: ads[0]?.title || "Tesla Model Y" }), _jsx("p", { className: "text-lg mb-4", children: ads[0]?.content.text || "Experience the future" }), _jsx(Button, { className: "bg-white text-black hover:bg-gray-200", onClick: () => {
                                            if (ads[0]?.targetUrl) {
                                                window.open(ads[0].targetUrl, '_blank');
                                            }
                                        }, children: ads[0]?.callToAction || "Learn More" })] })] }), _jsx("div", { className: "col-span-4 space-y-4", children: Array.from({ length: 4 }, (_, index) => {
                            const ad = ads[index + 1];
                            const gradients = [
                                'from-yellow-500 to-orange-500',
                                'from-purple-500 to-pink-500',
                                'from-red-500 to-pink-500',
                                'from-indigo-500 to-blue-500'
                            ];
                            const icons = ['💰', '🎵', '📱', '🏋️'];
                            const titles = ['Crypto Exchange', 'Music App', 'Phone Deal', 'Fitness App'];
                            const descriptions = ['0% fees', '3 months free', '50% off today', 'Join now'];
                            return (_jsxs("div", { className: `bg-gradient-to-r ${gradients[index]} p-3 rounded-lg h-20 flex items-center justify-between`, children: [_jsxs("div", { children: [_jsxs("h5", { className: "font-bold text-sm", children: [icons[index], " ", ad?.title || titles[index]] }), _jsx("p", { className: "text-xs opacity-90", children: ad?.content.text || descriptions[index] })] }), _jsx("span", { className: "text-xs bg-black text-white px-2 py-1 rounded", children: Math.floor(Math.random() * 5000) })] }, index));
                        }) }), _jsx("div", { className: "col-span-12 h-16 bg-dark-bg rounded-lg flex items-center overflow-hidden relative", children: _jsxs("div", { className: "flex animate-billboard-scroll whitespace-nowrap", children: [_jsx("span", { className: "mx-8 text-neon-gold font-bold", children: "\uD83C\uDFAF Premium slot available \u2022 \uD83D\uDCCA Analytics included \u2022 \uD83D\uDE80 Boost your brand" }), _jsx("span", { className: "mx-8 text-neon-cyan font-bold", children: "\uD83D\uDC8E Featured placement \u2022 \uD83D\uDD25 Hot deals section \u2022 \u26A1 Instant approval" }), _jsx("span", { className: "mx-8 text-neon-pink font-bold", children: "\uD83C\uDF1F VIP advertising \u2022 \uD83D\uDCC8 Real-time stats \u2022 \uD83C\uDFA8 AI-powered creation" })] }) })] }), _jsxs("div", { className: "flex justify-center mt-8 space-x-4", children: [_jsxs(Button, { variant: "outline", onClick: () => setIsPaused(!isPaused), className: "bg-gray-700 hover:bg-gray-600 border-gray-600", children: [_jsx("i", { className: `fas ${isPaused ? 'fa-play' : 'fa-pause'} mr-2` }), isPaused ? 'Play' : 'Pause'] }), _jsxs(Button, { variant: "outline", className: "bg-neon-cyan text-black hover:bg-cyan-400 border-neon-cyan", children: [_jsx("i", { className: "fas fa-expand mr-2" }), "Fullscreen"] }), _jsxs(Button, { variant: "outline", className: "bg-gray-700 hover:bg-gray-600 border-gray-600", children: [_jsx("i", { className: "fas fa-share mr-2" }), "Share"] })] })] }));
}
