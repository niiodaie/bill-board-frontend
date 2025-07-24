import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
export function ManualAdUpload({ onAdUploaded }) {
    const [formData, setFormData] = useState({
        title: "",
        callToAction: "",
        targetUrl: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const { toast } = useToast();
    const uploadAd = useMutation({
        mutationFn: async (data) => {
            const res = await fetch("/api/ads", {
                method: "POST",
                body: data,
                credentials: "include",
            });
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }
            return res.json();
        },
        onSuccess: (data) => {
            toast({
                title: "Success",
                description: "Ad uploaded successfully!",
            });
            onAdUploaded(data);
            // Reset form
            setFormData({ title: "", callToAction: "", targetUrl: "" });
            setSelectedFile(null);
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        },
    });
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        }
        else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };
    const handleFileSelect = (file) => {
        if (file.size > 10 * 1024 * 1024) {
            toast({
                title: "File too large",
                description: "File must be under 10MB",
                variant: "destructive",
            });
            return;
        }
        if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
            toast({
                title: "Invalid file type",
                description: "Only image and video files are allowed",
                variant: "destructive",
            });
            return;
        }
        setSelectedFile(file);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedFile) {
            toast({
                title: "Error",
                description: "Please select a file to upload",
                variant: "destructive",
            });
            return;
        }
        if (!formData.title.trim()) {
            toast({
                title: "Error",
                description: "Please enter an ad title",
                variant: "destructive",
            });
            return;
        }
        const data = new FormData();
        data.append('file', selectedFile);
        data.append('title', formData.title);
        data.append('callToAction', formData.callToAction);
        data.append('targetUrl', formData.targetUrl);
        data.append('type', selectedFile.type.startsWith('image/') ? 'image' : 'video');
        uploadAd.mutate(data);
    };
    return (_jsxs(Card, { className: "bg-dark-bg border-neon-cyan", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center text-neon-cyan", children: [_jsx("i", { className: "fas fa-upload text-3xl mr-4" }), "Manual Upload"] }) }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-3", children: "Upload Your Asset" }), _jsxs("div", { className: `border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${dragActive
                                        ? "border-neon-cyan bg-cyan-500/10"
                                        : "border-gray-600 hover:border-neon-cyan"}`, onDragEnter: handleDrag, onDragLeave: handleDrag, onDragOver: handleDrag, onDrop: handleDrop, onClick: () => document.getElementById('file-upload')?.click(), children: [_jsx("input", { id: "file-upload", type: "file", className: "hidden", accept: "image/*,video/*", onChange: (e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    handleFileSelect(e.target.files[0]);
                                                }
                                            } }), selectedFile ? (_jsxs("div", { children: [_jsx("i", { className: "fas fa-check-circle text-4xl text-green-400 mb-4" }), _jsxs("p", { className: "text-green-400 mb-2", children: ["File selected: ", selectedFile.name] }), _jsxs("p", { className: "text-sm text-gray-500", children: [(selectedFile.size / 1024 / 1024).toFixed(2), " MB"] }), _jsx(Button, { type: "button", variant: "outline", size: "sm", className: "mt-4 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black", onClick: (e) => {
                                                        e.stopPropagation();
                                                        setSelectedFile(null);
                                                    }, children: "Remove File" })] })) : (_jsxs("div", { children: [_jsx("i", { className: "fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4" }), _jsx("p", { className: "text-gray-400 mb-2", children: "Drag & drop your file here" }), _jsx("p", { className: "text-sm text-gray-500", children: "PNG, JPG, MP4, GIF up to 10MB" }), _jsx(Button, { type: "button", className: "mt-4 bg-neon-cyan text-black hover:bg-cyan-400", children: "Browse Files" })] }))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-3", children: "Ad Title" }), _jsx(Input, { className: "bg-gray-800 border-gray-600 text-white focus:border-neon-cyan", placeholder: "Enter your ad title", value: formData.title, onChange: (e) => setFormData({ ...formData, title: e.target.value }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-3", children: "Call to Action" }), _jsx(Input, { className: "bg-gray-800 border-gray-600 text-white focus:border-neon-cyan", placeholder: "E.g., 'Shop Now', 'Learn More', 'Sign Up'", value: formData.callToAction, onChange: (e) => setFormData({ ...formData, callToAction: e.target.value }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-3", children: "Target URL" }), _jsx(Input, { type: "url", className: "bg-gray-800 border-gray-600 text-white focus:border-neon-cyan", placeholder: "https://yourwebsite.com", value: formData.targetUrl, onChange: (e) => setFormData({ ...formData, targetUrl: e.target.value }) })] }), _jsx(Button, { type: "submit", disabled: uploadAd.isPending, className: "w-full bg-gradient-to-r from-neon-cyan to-blue-500 text-black py-4 text-lg font-bold hover:from-cyan-400 hover:to-blue-400", children: uploadAd.isPending ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" }), "Uploading..."] })) : (_jsxs(_Fragment, { children: [_jsx("i", { className: "fas fa-check mr-2" }), "Upload & Continue"] })) })] }) })] }));
}
