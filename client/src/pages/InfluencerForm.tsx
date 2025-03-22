import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInfluencerSchema } from "@shared/schema";
import type { InsertInfluencer } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

const InfluencerForm = () => {
  const { toast } = useToast();
  const [success, setSuccess] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<InsertInfluencer>({
    resolver: zodResolver(insertInfluencerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      socialHandles: "",
      primaryPlatform: "",
      followerCount: "",
      contentNiche: "",
      additionalInfo: ""
    }
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (data: InsertInfluencer) => {
      const response = await apiRequest("POST", "/api/influencers", data);
      return response.json();
    },
    onSuccess: () => {
      setSuccess(true);
      reset();
      toast({
        title: "Application Submitted",
        description: "Thank you for applying! We'll review your application and get in touch soon.",
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    },
  });

  const onSubmit = (data: InsertInfluencer) => {
    mutate(data);
  };

  return (
    <section className="page-transition py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Influencer Application</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>
        
        <GlassCard className="p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Join Our Network</h3>
          
          {success && (
            <Alert className="mb-6 bg-green-900/30 border-green-500 text-green-100">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Thank you for applying! We'll review your application and get in touch soon.
              </AlertDescription>
            </Alert>
          )}
          
          {isError && (
            <Alert className="mb-6 bg-red-900/30 border-red-500 text-red-100">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error instanceof Error ? error.message : "An error occurred. Please try again."}
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-zinc-400 mb-2">Full Name</label>
              <Input
                id="fullName"
                placeholder="Your full name"
                {...register("fullName")}
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-400">{errors.fullName.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-zinc-400 mb-2">Email Address</label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="socialHandles" className="block text-zinc-400 mb-2">Social Media Handles</label>
              <Input
                id="socialHandles"
                placeholder="@username (separate multiple handles with commas)"
                {...register("socialHandles")}
                className={errors.socialHandles ? "border-red-500" : ""}
              />
              {errors.socialHandles && (
                <p className="mt-1 text-sm text-red-400">{errors.socialHandles.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="primaryPlatform" className="block text-zinc-400 mb-2">Primary Platform</label>
              <Input
                id="primaryPlatform"
                placeholder="Instagram, TikTok, YouTube, etc."
                {...register("primaryPlatform")}
                className={errors.primaryPlatform ? "border-red-500" : ""}
              />
              {errors.primaryPlatform && (
                <p className="mt-1 text-sm text-red-400">{errors.primaryPlatform.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="followerCount" className="block text-zinc-400 mb-2">Follower Count</label>
              <Input
                id="followerCount"
                placeholder="Approximate number of followers"
                {...register("followerCount")}
                className={errors.followerCount ? "border-red-500" : ""}
              />
              {errors.followerCount && (
                <p className="mt-1 text-sm text-red-400">{errors.followerCount.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="contentNiche" className="block text-zinc-400 mb-2">Content Niche</label>
              <Textarea
                id="contentNiche"
                placeholder="What type of content do you create? (e.g., Beauty, Tech, Fitness)"
                rows={3}
                {...register("contentNiche")}
                className={errors.contentNiche ? "border-red-500" : ""}
              />
              {errors.contentNiche && (
                <p className="mt-1 text-sm text-red-400">{errors.contentNiche.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="additionalInfo" className="block text-zinc-400 mb-2">Additional Information</label>
              <Textarea
                id="additionalInfo"
                placeholder="Tell us more about your content, audience, and previous brand collaborations"
                rows={3}
                {...register("additionalInfo")}
                className={errors.additionalInfo ? "border-red-500" : ""}
              />
              {errors.additionalInfo && (
                <p className="mt-1 text-sm text-red-400">{errors.additionalInfo.message}</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="btn-hover-effect w-full bg-gradient-to-r from-[#10b981] to-[#1db954] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex justify-center items-center"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : "Submit Application"}
            </Button>
          </form>
        </GlassCard>
      </div>
    </section>
  );
};

export default InfluencerForm;
