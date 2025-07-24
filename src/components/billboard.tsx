import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Ad {
  id: number;
  title: string;
  content: {
    assetUrl?: string;
    imageUrl?: string;
    text?: string;
    backgroundColor?: string;
  };
  callToAction: string;
  targetUrl?: string;
  type: string;
}

export function Billboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPaused, setIsPaused] = useState(false);

  const { data: ads = [], isLoading } = useQuery<Ad[]>({
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
    return (
      <div className="bg-black p-6 rounded-2xl border-4 border-neon-pink shadow-2xl">
        <div className="h-[600px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading billboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black p-6 rounded-2xl border-4 border-neon-pink shadow-2xl">
      <div className="grid grid-cols-12 gap-4 h-[600px]">
        {/* Premium Slot - Top Banner */}
        <div className="col-span-12 h-32 bg-gradient-to-r from-neon-pink to-neon-orange p-4 rounded-lg flex items-center justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white">🎮 SUMMER GAMING SALE</h3>
            <p className="text-lg text-white">Up to 70% OFF - Limited Time!</p>
          </div>
          <div className="relative z-10 text-right">
            <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold animate-pulse">
              <i className="fas fa-clock mr-2"></i>
              {formatCountdown()}
            </div>
          </div>
        </div>

        {/* Left Column - Medium Ads */}
        <div className="col-span-4 space-y-4">
          {ads.slice(0, 2).map((ad, index) => (
            <div
              key={ad.id}
              className={`p-4 rounded-lg h-40 flex flex-col justify-between bg-gradient-to-br ${
                index === 0 ? 'from-blue-600 to-purple-600' : 'from-green-600 to-teal-600'
              }`}
            >
              <div>
                <h4 className="font-bold text-lg text-white">{ad.title}</h4>
                <p className="text-sm opacity-90 text-white">
                  {ad.content.text || "Amazing offer!"}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <Badge className="bg-white text-black">
                  {index === 0 ? 'HOT 🔥' : 'NEW'}
                </Badge>
                <span className="text-xs text-white">
                  {Math.floor(Math.random() * 10)}K clicks
                </span>
              </div>
            </div>
          ))}
          
          {ads.length === 0 && (
            <>
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-lg h-40 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-lg">🏠 Real Estate</h4>
                  <p className="text-sm opacity-90">Dream homes await</p>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-white text-black">HOT 🔥</Badge>
                  <span className="text-xs">3.2K clicks</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-600 to-teal-600 p-4 rounded-lg h-40 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-lg">🍕 Food Delivery</h4>
                  <p className="text-sm opacity-90">Free delivery today!</p>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-yellow-400 text-black">NEW</Badge>
                  <span className="text-xs">8.7K clicks</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Center - Hero Ad */}
        <div className="col-span-4 bg-gradient-to-br from-neon-cyan to-blue-500 rounded-lg p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-billboard-scroll"></div>
          </div>
          <div className="relative z-10">
            {ads[0]?.content.assetUrl ? (
              <img 
                src={ads[0].content.assetUrl} 
                alt={ads[0].title}
                className="w-24 h-24 object-cover rounded-lg mb-4"
              />
            ) : (
              <i className="fas fa-car text-6xl mb-4 text-white"></i>
            )}
            <h3 className="text-2xl font-bold mb-2">
              {ads[0]?.title || "Tesla Model Y"}
            </h3>
            <p className="text-lg mb-4">
              {ads[0]?.content.text || "Experience the future"}
            </p>
            <Button 
              className="bg-white text-black hover:bg-gray-200"
              onClick={() => {
                if (ads[0]?.targetUrl) {
                  window.open(ads[0].targetUrl, '_blank');
                }
              }}
            >
              {ads[0]?.callToAction || "Learn More"}
            </Button>
          </div>
        </div>

        {/* Right Column - Small Ads */}
        <div className="col-span-4 space-y-4">
          {Array.from({ length: 4 }, (_, index) => {
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

            return (
              <div 
                key={index}
                className={`bg-gradient-to-r ${gradients[index]} p-3 rounded-lg h-20 flex items-center justify-between`}
              >
                <div>
                  <h5 className="font-bold text-sm">
                    {icons[index]} {ad?.title || titles[index]}
                  </h5>
                  <p className="text-xs opacity-90">
                    {ad?.content.text || descriptions[index]}
                  </p>
                </div>
                <span className="text-xs bg-black text-white px-2 py-1 rounded">
                  {Math.floor(Math.random() * 5000)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom Row - Scrolling Banner */}
        <div className="col-span-12 h-16 bg-dark-bg rounded-lg flex items-center overflow-hidden relative">
          <div className="flex animate-billboard-scroll whitespace-nowrap">
            <span className="mx-8 text-neon-gold font-bold">
              🎯 Premium slot available • 📊 Analytics included • 🚀 Boost your brand
            </span>
            <span className="mx-8 text-neon-cyan font-bold">
              💎 Featured placement • 🔥 Hot deals section • ⚡ Instant approval
            </span>
            <span className="mx-8 text-neon-pink font-bold">
              🌟 VIP advertising • 📈 Real-time stats • 🎨 AI-powered creation
            </span>
          </div>
        </div>
      </div>

      {/* Billboard Controls */}
      <div className="flex justify-center mt-8 space-x-4">
        <Button
          variant="outline"
          onClick={() => setIsPaused(!isPaused)}
          className="bg-gray-700 hover:bg-gray-600 border-gray-600"
        >
          <i className={`fas ${isPaused ? 'fa-play' : 'fa-pause'} mr-2`}></i>
          {isPaused ? 'Play' : 'Pause'}
        </Button>
        <Button
          variant="outline"
          className="bg-neon-cyan text-black hover:bg-cyan-400 border-neon-cyan"
        >
          <i className="fas fa-expand mr-2"></i>
          Fullscreen
        </Button>
        <Button
          variant="outline"
          className="bg-gray-700 hover:bg-gray-600 border-gray-600"
        >
          <i className="fas fa-share mr-2"></i>
          Share
        </Button>
      </div>
    </div>
  );
}
