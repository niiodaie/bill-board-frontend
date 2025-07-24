import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
export function AIAdCreator({ onAdGenerated }) {
    const [formData, setFormData] = useState({
        adType: "image",
        goal: "brand_awareness",
        description: "",
        targetAudience: "",
    });
    const [generatedAd, setGeneratedAd] = useState(null);
    const { toast } = useToast();
    const generateText = useMutation({
        mutationFn: async (data) => {
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
            }
            else {
                const ad = { ...textData };
                setGeneratedAd(ad);
                onAdGenerated(ad);
            }
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        },
    });
    const generateImage = useMutation({
        mutationFn: async (data) => {
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
        onError: (error) => {
            toast({
                title: "Image Generation Failed",
                description: error.message,
                variant: "destructive",
            });
        },
    });
    const handleSubmit = (e) => {
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
    return (_jsxs(Card, { className: "bg-dark-bg border-neon-pink", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center text-neon-pink", children: [_jsx("i", { className: "fas fa-robot text-3xl mr-4" }), "AI-Powered Creation"] }) }), _jsxs(CardContent, { children: [_jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-3", children: "Ad Type" }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs(Button, { type: "button", variant: formData.adType === "image" ? "default" : "outline", className: `p-4 h-auto flex flex-col ${formData.adType === "image"
                                                    ? "bg-neon-pink text-white"
                                                    : "border-gray-600 hover:border-neon-pink"}`, onClick: () => setFormData({ ...formData, adType: "image" }), children: [_jsx("i", { className: "fas fa-image text-2xl mb-2 text-neon-cyan" }), _jsx("span", { className: "font-medium", children: "Image" })] }), _jsxs(Button, { type: "button", variant: formData.adType === "video" ? "default" : "outline", className: `p-4 h-auto flex flex-col ${formData.adType === "video"
                                                    ? "bg-neon-pink text-white"
                                                    : "border-gray-600 hover:border-neon-pink"}`, onClick: () => setFormData({ ...formData, adType: "video" }), children: [_jsx("i", { className: "fas fa-video text-2xl mb-2 text-neon-pink" }), _jsx("span", { className: "font-medium", children: "Video" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-3", children: "Campaign Goal" }), _jsxs(Select, { value: formData.goal, onValueChange: (value) => setFormData({ ...formData, goal: value }), children: [_jsx(SelectTrigger, { className: "bg-gray-800 border-gray-600 text-white", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "brand_awareness", children: "Brand Awareness" }), _jsx(SelectItem, { value: "lead_generation", children: "Lead Generation" }), _jsx(SelectItem, { value: "sales_promotion", children: "Sales Promotion" }), _jsx(SelectItem, { value: "event_promotion", children: "Event Promotion" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-3", children: "Describe Your Ad" }), _jsx(Textarea, { className: "bg-gray-800 border-gray-600 text-white focus:border-neon-cyan h-32 resize-none", placeholder: "E.g., 'A vibrant ad for a summer sale featuring outdoor gear with bold typography and energetic colors'", value: formData.description, onChange: (e) => setFormData({ ...formData, description: e.target.value }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-3", children: "Target Audience" }), _jsx(Input, { className: "bg-gray-800 border-gray-600 text-white focus:border-neon-cyan", placeholder: "E.g., 'Young professionals aged 25-35'", value: formData.targetAudience, onChange: (e) => setFormData({ ...formData, targetAudience: e.target.value }) })] }), _jsx(Button, { type: "submit", disabled: generateText.isPending || generateImage.isPending, className: "w-full bg-gradient-to-r from-neon-pink to-neon-orange text-white py-4 text-lg font-bold hover:from-pink-600 hover:to-red-500 animate-pulse-glow", children: generateText.isPending || generateImage.isPending ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" }), "Generating..."] })) : (_jsxs(_Fragment, { children: [_jsx("i", { className: "fas fa-magic mr-2" }), "Generate Ad with AI"] })) })] }), generatedAd && (_jsxs("div", { className: "mt-8 p-6 bg-gray-800 rounded-lg border border-neon-gold", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h4", { className: "text-lg font-semibold text-neon-gold", children: "Generated Ad Preview" }), _jsxs(Button, { variant: "outline", size: "sm", onClick: handleRegenerate, disabled: generateText.isPending || generateImage.isPending, className: "border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white", children: [_jsx("i", { className: "fas fa-redo mr-1" }), "Regenerate"] })] }), _jsxs("div", { className: "space-y-4", children: [generatedAd.imageUrl && (_jsx("div", { className: "relative", children: _jsx("img", { src: generatedAd.imageUrl, alt: generatedAd.title, className: "w-full h-48 object-cover rounded-lg" }) })), _jsxs("div", { children: [_jsx("h5", { className: "font-bold text-lg text-white mb-2", children: generatedAd.title }), _jsx("p", { className: "text-gray-300 mb-3", children: generatedAd.description }), _jsx(Button, { size: "sm", className: "bg-neon-cyan text-black hover:bg-cyan-400", children: generatedAd.callToAction })] })] })] }))] })] }));
}
