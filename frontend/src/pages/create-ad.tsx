import { useState } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { AIAdCreator } from "@/components/ai-ad-creator";
import { ManualAdUpload } from "@/components/manual-ad-upload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";

interface GeneratedAd {
  title: string;
  description: string;
  callToAction: string;
  imageUrl?: string;
}

interface PlacementOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedViews: string;
}

const placementOptions: PlacementOption[] = [
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
  const [currentAd, setCurrentAd] = useState<GeneratedAd | null>(null);
  const [selectedPlacement, setSelectedPlacement] = useState<string>("featured");

  if (isLoading) {
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

  const handleAdGenerated = (ad: GeneratedAd) => {
    setCurrentAd(ad);
  };

  const handleAdUploaded = (ad: any) => {
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

  return (
    <div className="min-h-screen bg-darker-bg">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-orbitron font-bold mb-4 text-neon-pink neon-text">
            AD CREATION STUDIO
          </h1>
          <p className="text-xl text-gray-300">Create stunning ads with AI or upload your own</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* AI-Powered Creation */}
            <AIAdCreator onAdGenerated={handleAdGenerated} />

            {/* Manual Upload */}
            <ManualAdUpload onAdUploaded={handleAdUploaded} />
          </div>

          {/* Preview & Placement Section */}
          {currentAd && (
            <Card className="bg-dark-bg border-neon-gold">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-neon-gold flex items-center">
                  <i className="fas fa-eye mr-3"></i>
                  Preview & Placement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Preview */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Ad Preview</h4>
                    <div className="bg-gray-800 p-6 rounded-lg border-2 border-neon-gold">
                      {currentAd.imageUrl && (
                        <div className="relative mb-4">
                          <img
                            src={currentAd.imageUrl}
                            alt={currentAd.title}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}
                      
                      <div>
                        <h5 className="font-bold text-lg text-white mb-2">{currentAd.title}</h5>
                        <p className="text-gray-300 mb-3">{currentAd.description}</p>
                        <Button
                          size="sm"
                          className="bg-neon-cyan text-black hover:bg-cyan-400"
                        >
                          {currentAd.callToAction}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white"
                        onClick={() => setCurrentAd(null)}
                      >
                        <i className="fas fa-edit mr-1"></i>
                        Edit
                      </Button>
                    </div>
                  </div>

                  {/* Placement Options */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Select Placement</h4>
                    <div className="space-y-3">
                      {placementOptions.map((option) => (
                        <div
                          key={option.id}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedPlacement === option.id
                              ? "border-neon-gold bg-neon-gold bg-opacity-10"
                              : "border-gray-700 bg-gray-800 hover:border-neon-gold"
                          }`}
                          onClick={() => setSelectedPlacement(option.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-semibold flex items-center">
                                {option.name}
                                {option.id === "featured" && (
                                  <Badge className="ml-2 bg-neon-pink text-white">
                                    POPULAR
                                  </Badge>
                                )}
                              </h5>
                              <p className="text-sm text-gray-400">{option.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-neon-gold">
                                ${option.price}/day
                              </div>
                              <div className="text-xs text-gray-400">{option.estimatedViews}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      className="w-full bg-neon-gold text-black py-3 text-lg font-bold mt-6 hover:bg-yellow-500"
                      onClick={handleProceedToPayment}
                    >
                      <i className="fas fa-credit-card mr-2"></i>
                      Proceed to Payment - ${placementOptions.find(o => o.id === selectedPlacement)?.price}/day
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
