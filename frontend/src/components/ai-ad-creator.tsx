import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface GeneratedAd {
  title: string;
  description: string;
  callToAction: string;
  imageUrl?: string;
}

interface AIAdCreatorProps {
  onAdGenerated: (ad: GeneratedAd) => void;
}

export function AIAdCreator({ onAdGenerated }: AIAdCreatorProps) {
  const [formData, setFormData] = useState({
    adType: "image",
    goal: "brand_awareness",
    description: "",
    targetAudience: "",
  });
  const [generatedAd, setGeneratedAd] = useState<GeneratedAd | null>(null);
  const { toast } = useToast();

  const generateText = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await apiRequest("POST", "/api/generate-ad-text", {
        prompt: data.description,
        adType: data.adType,
        goal: data.goal,
        targetAudience: data.targetAudience,
      });
      return res.json();
    },
    onSuccess: async (textData) => {
      // If it's an image ad, also generate image
      if (formData.adType === "image") {
        generateImage.mutate({
          prompt: formData.description,
          adType: formData.adType,
          targetAudience: formData.targetAudience,
          textData,
        });
      } else {
        const ad = { ...textData };
        setGeneratedAd(ad);
        onAdGenerated(ad);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const generateImage = useMutation({
    mutationFn: async (data: { prompt: string; adType: string; targetAudience: string; textData: any }) => {
      const res = await apiRequest("POST", "/api/generate-ad-image", {
        prompt: `${data.prompt}. Ad title: ${data.textData.title}. Description: ${data.textData.description}`,
        adType: data.adType,
        targetAudience: data.targetAudience,
      });
      return res.json();
    },
    onSuccess: (imageData, variables) => {
      const ad = {
        ...variables.textData,
        imageUrl: imageData.url,
      };
      setGeneratedAd(ad);
      onAdGenerated(ad);
    },
    onError: (error: any) => {
      toast({
        title: "Image Generation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description.trim()) {
      toast({
        title: "Error",
        description: "Please describe your ad",
        variant: "destructive",
      });
      return;
    }
    generateText.mutate(formData);
  };

  const handleRegenerate = () => {
    generateText.mutate(formData);
  };

  return (
    <Card className="bg-dark-bg border-neon-pink">
      <CardHeader>
        <CardTitle className="flex items-center text-neon-pink">
          <i className="fas fa-robot text-3xl mr-4"></i>
          AI-Powered Creation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Ad Type Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">Ad Type</label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={formData.adType === "image" ? "default" : "outline"}
                className={`p-4 h-auto flex flex-col ${
                  formData.adType === "image" 
                    ? "bg-neon-pink text-white" 
                    : "border-gray-600 hover:border-neon-pink"
                }`}
                onClick={() => setFormData({ ...formData, adType: "image" })}
              >
                <i className="fas fa-image text-2xl mb-2 text-neon-cyan"></i>
                <span className="font-medium">Image</span>
              </Button>
              <Button
                type="button"
                variant={formData.adType === "video" ? "default" : "outline"}
                className={`p-4 h-auto flex flex-col ${
                  formData.adType === "video" 
                    ? "bg-neon-pink text-white" 
                    : "border-gray-600 hover:border-neon-pink"
                }`}
                onClick={() => setFormData({ ...formData, adType: "video" })}
              >
                <i className="fas fa-video text-2xl mb-2 text-neon-pink"></i>
                <span className="font-medium">Video</span>
              </Button>
            </div>
          </div>

          {/* Ad Goal */}
          <div>
            <label className="block text-sm font-medium mb-3">Campaign Goal</label>
            <Select
              value={formData.goal}
              onValueChange={(value) => setFormData({ ...formData, goal: value })}
            >
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brand_awareness">Brand Awareness</SelectItem>
                <SelectItem value="lead_generation">Lead Generation</SelectItem>
                <SelectItem value="sales_promotion">Sales Promotion</SelectItem>
                <SelectItem value="event_promotion">Event Promotion</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-3">Describe Your Ad</label>
            <Textarea
              className="bg-gray-800 border-gray-600 text-white focus:border-neon-cyan h-32 resize-none"
              placeholder="E.g., 'A vibrant ad for a summer sale featuring outdoor gear with bold typography and energetic colors'"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-sm font-medium mb-3">Target Audience</label>
            <Input
              className="bg-gray-800 border-gray-600 text-white focus:border-neon-cyan"
              placeholder="E.g., 'Young professionals aged 25-35'"
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
            />
          </div>

          {/* Generate Button */}
          <Button
            type="submit"
            disabled={generateText.isPending || generateImage.isPending}
            className="w-full bg-gradient-to-r from-neon-pink to-neon-orange text-white py-4 text-lg font-bold hover:from-pink-600 hover:to-red-500 animate-pulse-glow"
          >
            {generateText.isPending || generateImage.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <i className="fas fa-magic mr-2"></i>
                Generate Ad with AI
              </>
            )}
          </Button>
        </form>

        {/* Generated Ad Preview */}
        {generatedAd && (
          <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-neon-gold">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-neon-gold">Generated Ad Preview</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRegenerate}
                disabled={generateText.isPending || generateImage.isPending}
                className="border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white"
              >
                <i className="fas fa-redo mr-1"></i>
                Regenerate
              </Button>
            </div>
            
            <div className="space-y-4">
              {generatedAd.imageUrl && (
                <div className="relative">
                  <img
                    src={generatedAd.imageUrl}
                    alt={generatedAd.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div>
                <h5 className="font-bold text-lg text-white mb-2">{generatedAd.title}</h5>
                <p className="text-gray-300 mb-3">{generatedAd.description}</p>
                <Button
                  size="sm"
                  className="bg-neon-cyan text-black hover:bg-cyan-400"
                >
                  {generatedAd.callToAction}
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
