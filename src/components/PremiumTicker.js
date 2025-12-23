import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/PremiumTicker.tsx
import Marquee from "react-fast-marquee";
const premiumAds = [
    { title: "Tesla Model Y", views: "82K", emoji: "🚗", tag: "Top Spot" },
    { title: "McDonald's", views: "112K", emoji: "🍔", tag: "Featured Today" },
    { title: "Nike React", views: "2.5M", emoji: "👟", tag: "Trending" },
    { title: "CryptoX Exchange", views: "195K", emoji: "🪙", tag: "-0% Fee" },
    { title: "PlayStation 6", views: "700K", emoji: "🎮", tag: "New Release" },
];
export default function PremiumTicker() {
    return (_jsx("div", { className: "relative z-0 bg-black/30 py-2 backdrop-blur-sm text-white overflow-hidden border-t border-b border-pink-500", children: _jsx(Marquee, { speed: 50, pauseOnHover: true, gradient: false, children: premiumAds.map((ad, index) => (_jsxs("div", { className: "mx-10 whitespace-nowrap flex items-center gap-2 text-sm", children: [_jsx("span", { className: "text-pink-400", children: ad.emoji }), _jsx("span", { className: "font-semibold", children: ad.title }), _jsxs("span", { className: "text-gray-300", children: ["| ", ad.views, " views"] }), _jsx("span", { className: "ml-2 px-2 py-0.5 bg-yellow-500/30 text-yellow-300 rounded text-xs", children: ad.tag })] }, index))) }) }));
}
