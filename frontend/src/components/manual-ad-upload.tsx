import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ManualAdUploadProps {
  onAdUploaded: (ad: any) => void;
}

export function ManualAdUpload({ onAdUploaded }: ManualAdUploadProps) {
  const [formData, setFormData] = useState({
    title: "",
    callToAction: "",
    targetUrl: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const uploadAd = useMutation({
    mutationFn: async (data: FormData) => {
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
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
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

  const handleSubmit = (e: React.FormEvent) => {
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

  return (
    <Card className="bg-dark-bg border-neon-cyan">
      <CardHeader>
        <CardTitle className="flex items-center text-neon-cyan">
          <i className="fas fa-upload text-3xl mr-4"></i>
          Manual Upload
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-3">Upload Your Asset</label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                dragActive
                  ? "border-neon-cyan bg-cyan-500/10"
                  : "border-gray-600 hover:border-neon-cyan"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*,video/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
              />
              
              {selectedFile ? (
                <div>
                  <i className="fas fa-check-circle text-4xl text-green-400 mb-4"></i>
                  <p className="text-green-400 mb-2">File selected: {selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                  >
                    Remove File
                  </Button>
                </div>
              ) : (
                <div>
                  <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                  <p className="text-gray-400 mb-2">Drag & drop your file here</p>
                  <p className="text-sm text-gray-500">PNG, JPG, MP4, GIF up to 10MB</p>
                  <Button
                    type="button"
                    className="mt-4 bg-neon-cyan text-black hover:bg-cyan-400"
                  >
                    Browse Files
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Ad Details */}
          <div>
            <label className="block text-sm font-medium mb-3">Ad Title</label>
            <Input
              className="bg-gray-800 border-gray-600 text-white focus:border-neon-cyan"
              placeholder="Enter your ad title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Call to Action</label>
            <Input
              className="bg-gray-800 border-gray-600 text-white focus:border-neon-cyan"
              placeholder="E.g., 'Shop Now', 'Learn More', 'Sign Up'"
              value={formData.callToAction}
              onChange={(e) => setFormData({ ...formData, callToAction: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Target URL</label>
            <Input
              type="url"
              className="bg-gray-800 border-gray-600 text-white focus:border-neon-cyan"
              placeholder="https://yourwebsite.com"
              value={formData.targetUrl}
              onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
            />
          </div>

          {/* Upload Button */}
          <Button
            type="submit"
            disabled={uploadAd.isPending}
            className="w-full bg-gradient-to-r from-neon-cyan to-blue-500 text-black py-4 text-lg font-bold hover:from-cyan-400 hover:to-blue-400"
          >
            {uploadAd.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <i className="fas fa-check mr-2"></i>
                Upload & Continue
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
