"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import Confetti from "react-confetti";
import { Upload, CheckCircle2, X, Play, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  country: z.string().min(2, "Country is required"),
  xHandle: z.string().min(2, "X handle is required").regex(/^@/, "X handle must start with @"),
  shortStory: z.string().min(10, "Story must be at least 10 characters").max(400, "Story must be max 400 characters"),
  whyHappiness: z.string().min(10, "Please explain why you need happiness"),
  video: z.instanceof(File, { message: "Video is required" }),
  agreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function ApplyPage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [shareLink, setShareLink] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const agreement = watch("agreement");

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 50MB - Supabase Free Plan limit)
      if (file.size > 50 * 1024 * 1024) {
        alert("Video file is too large. Maximum size is 50MB. Please compress your video or make it shorter.");
        return;
      }

      // Check if it's a video file
      if (!file.type.startsWith("video/")) {
        alert("Please upload a video file.");
        return;
      }

      setVideoFile(file);
      setValue("video", file, { shouldValidate: true }); // Register file in form
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 200);
    }
  };

  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    setUploadProgress(0);
    setValue("video", undefined as any);
  };

  const onSubmit = async (data: FormData) => {
    if (!videoFile) {
      alert("Please upload a video file");
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);
    
    try {
      // 1. Upload video to Supabase Storage
      const fileExt = videoFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName; // Upload directly to bucket root (no subfolder)

      // Upload with progress tracking
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('videos')
        .upload(filePath, videoFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('Upload error details:', uploadError);
        // More helpful error message
        if (uploadError.message?.includes('Bucket not found') || uploadError.message?.includes('not found')) {
          throw new Error(`Bucket 'videos' not found. Please create it in Supabase Dashboard → Storage → New Bucket. Also make sure to run SUPABASE_STORAGE_POLICIES.sql to set up permissions.`);
        }
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      setUploadProgress(50);

      // 2. Get public URL
      const { data: urlData } = supabase.storage
        .from('videos')
        .getPublicUrl(filePath);

      const videoUrl = urlData.publicUrl;
      setUploadProgress(75);

      // 3. Insert candidate into database
      const { data: candidateData, error: insertError } = await supabase
        .from('candidates')
        .insert({
          name: data.name,
          country: data.country,
          x_handle: data.xHandle,
          story: data.shortStory,
          why_happiness: data.whyHappiness,
          video_url: videoUrl,
          status: 'pending',
        })
        .select()
        .single();

      if (insertError) {
        throw new Error(`Database insert failed: ${insertError.message}`);
      }

      setUploadProgress(100);
      
      setIsSubmitting(false);
      setShowConfetti(true);
      setSubmitted(true);
      
      // Generate share link with candidate ID (use production domain)
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://projecthappiness.xyz';
      const link = `${baseUrl}/vote?candidate=${candidateData.id}`;
      setShareLink(link);
      
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (error: any) {
      console.error('Submission error:', error);
      alert(`Error submitting application: ${error.message}`);
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const shareText = "You can't buy happiness, but you CAN buy $HAPPINESS! 🎉\n\nHelp me win today's charity show and save real lives!\n\nVote now: [link]\n\n#HAPPINESS #Solana #Memecoin";
  const shareUrl = shareLink || 'https://projecthappiness.xyz/vote';

  const handleShareOnX = () => {
    const text = shareText.replace("[link]", shareUrl);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, "_blank");
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
        {showConfetti && (
          <Confetti
            width={typeof window !== "undefined" ? window.innerWidth : 0}
            height={typeof window !== "undefined" ? window.innerHeight : 0}
            recycle={false}
            numberOfPieces={500}
          />
        )}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center space-y-8"
        >
          <div className="space-y-4">
            <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto" />
            <h1 className="text-4xl font-bold">Application Submitted!</h1>
            <p className="text-lg text-muted-foreground">
              Your story has been submitted successfully. We&apos;ll verify you via X DM soon!
            </p>
          </div>
          
          <Card className="p-8">
            <CardContent className="space-y-6">
              <p className="text-lg font-semibold">Share your story on X:</p>
              <ShimmerButton
                onClick={handleShareOnX}
                className="w-full py-6 text-lg"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share on X
              </ShimmerButton>
              <p className="text-sm text-muted-foreground">
                {shareText.replace("[link]", shareUrl)}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {showConfetti && (
        <Confetti
          width={typeof window !== "undefined" ? window.innerWidth : 0}
          height={typeof window !== "undefined" ? window.innerHeight : 0}
          recycle={false}
        />
      )}

      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Submit Your Story</h1>
          <p className="text-muted-foreground text-lg">
            Join the daily live charity shows and make real impact
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Application Form</CardTitle>
              <CardDescription>
                Fill in all fields to submit your story for verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  {...register("country")}
                  placeholder="United States"
                />
                {errors.country && (
                  <p className="text-sm text-destructive">{errors.country.message}</p>
                )}
              </div>

              {/* X Handle */}
              <div className="space-y-2">
                <Label htmlFor="xHandle">X Handle *</Label>
                <Input
                  id="xHandle"
                  {...register("xHandle")}
                  placeholder="@username"
                />
                {errors.xHandle && (
                  <p className="text-sm text-destructive">{errors.xHandle.message}</p>
                )}
              </div>

              {/* Short Story */}
              <div className="space-y-2">
                <Label htmlFor="shortStory">Short Story (max 400 chars) *</Label>
                <textarea
                  id="shortStory"
                  {...register("shortStory")}
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="Tell us your story..."
                  maxLength={400}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{errors.shortStory?.message}</span>
                  <span>{watch("shortStory")?.length || 0}/400</span>
                </div>
              </div>

              {/* Why Happiness */}
              <div className="space-y-2">
                <Label htmlFor="whyHappiness">Why do you need happiness? *</Label>
                <textarea
                  id="whyHappiness"
                  {...register("whyHappiness")}
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="Explain why you need happiness..."
                />
                {errors.whyHappiness && (
                  <p className="text-sm text-destructive">{errors.whyHappiness.message}</p>
                )}
              </div>

              {/* Video Upload */}
              <div className="space-y-2">
                <Label htmlFor="video">Video Upload (max 60 sec) *</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <AnimatePresence mode="wait">
                    {!videoPreview ? (
                      <motion.div
                        key="upload"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                        <div>
                          <Label
                            htmlFor="video-input"
                            className="cursor-pointer text-primary hover:underline"
                          >
                            Click to upload or drag and drop
                          </Label>
                          <Input
                            id="video-input"
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={handleVideoChange}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          MP4, MOV, AVI up to 50MB
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="preview"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        <div className="relative">
                          <video
                            src={videoPreview}
                            controls
                            className="w-full max-h-64 rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={removeVideo}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        {uploadProgress < 100 && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Uploading...</span>
                              <span>{uploadProgress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                          </div>
                        )}
                        {uploadProgress >= 100 && (
                          <p className="text-sm text-green-600 flex items-center justify-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            Video uploaded successfully
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {errors.video && (
                  <p className="text-sm text-destructive">{errors.video.message}</p>
                )}
              </div>

              {/* Agreement Checkbox */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreement"
                    {...register("agreement")}
                    className="mt-1 h-4 w-4"
                  />
                  <Label htmlFor="agreement" className="text-sm cursor-pointer">
                    I agree to be contacted and verified via X DM and to appear live on the daily Pump.fun stream if selected. *
                  </Label>
                </div>
                {errors.agreement && (
                  <p className="text-sm text-destructive">{errors.agreement.message}</p>
                )}
              </div>

              <ShimmerButton
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </ShimmerButton>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
