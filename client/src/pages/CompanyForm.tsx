import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCompanySchema } from "@shared/schema";
import type { InsertCompany } from "@shared/schema";
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

const CompanyForm = () => {
  const { toast } = useToast();
  const [success, setSuccess] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<InsertCompany>({
    resolver: zodResolver(insertCompanySchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      email: "",
      campaignGoal: "",
      campaignBudget: "",
      preferredPlatforms: "",
      additionalNotes: ""
    }
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (data: InsertCompany) => {
      const response = await apiRequest("POST", "/api/companies", data);
      return response.json();
    },
    onSuccess: () => {
      setSuccess(true);
      reset();
      toast({
        title: "Campaign Inquiry Submitted",
        description: "Thank you for your inquiry! We'll reach out to discuss your campaign details soon.",
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    },
  });

  const onSubmit = (data: InsertCompany) => {
    mutate(data);
  };

  return (
    <section className="page-transition py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Company Campaign Inquiry</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>
        
        <GlassCard className="p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Start a Campaign</h3>
          
          {success && (
            <Alert className="mb-6 bg-green-900/30 border-green-500 text-green-100">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Thank you for your inquiry! We'll reach out to discuss your campaign details soon.
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
              <label htmlFor="companyName" className="block text-zinc-400 mb-2">Company Name</label>
              <Input
                id="companyName"
                placeholder="Your company name"
                {...register("companyName")}
                className={errors.companyName ? "border-red-500" : ""}
              />
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-400">{errors.companyName.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="contactPerson" className="block text-zinc-400 mb-2">Contact Person</label>
              <Input
                id="contactPerson"
                placeholder="Full name"
                {...register("contactPerson")}
                className={errors.contactPerson ? "border-red-500" : ""}
              />
              {errors.contactPerson && (
                <p className="mt-1 text-sm text-red-400">{errors.contactPerson.message}</p>
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
              <label htmlFor="campaignGoal" className="block text-zinc-400 mb-2">Campaign Goal</label>
              <Textarea
                id="campaignGoal"
                placeholder="What do you hope to achieve with this campaign?"
                rows={3}
                {...register("campaignGoal")}
                className={errors.campaignGoal ? "border-red-500" : ""}
              />
              {errors.campaignGoal && (
                <p className="mt-1 text-sm text-red-400">{errors.campaignGoal.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="campaignBudget" className="block text-zinc-400 mb-2">Campaign Budget</label>
              <Input
                id="campaignBudget"
                placeholder="Budget range (e.g., $5,000 - $10,000)"
                {...register("campaignBudget")}
                className={errors.campaignBudget ? "border-red-500" : ""}
              />
              {errors.campaignBudget && (
                <p className="mt-1 text-sm text-red-400">{errors.campaignBudget.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="preferredPlatforms" className="block text-zinc-400 mb-2">Preferred Platforms</label>
              <Input
                id="preferredPlatforms"
                placeholder="Instagram, TikTok, YouTube, etc."
                {...register("preferredPlatforms")}
                className={errors.preferredPlatforms ? "border-red-500" : ""}
              />
              {errors.preferredPlatforms && (
                <p className="mt-1 text-sm text-red-400">{errors.preferredPlatforms.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="additionalNotes" className="block text-zinc-400 mb-2">Additional Notes</label>
              <Textarea
                id="additionalNotes"
                placeholder="Any other information you'd like to share"
                rows={3}
                {...register("additionalNotes")}
                className={errors.additionalNotes ? "border-red-500" : ""}
              />
              {errors.additionalNotes && (
                <p className="mt-1 text-sm text-red-400">{errors.additionalNotes.message}</p>
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
              ) : "Submit Campaign Inquiry"}
            </Button>
          </form>
        </GlassCard>
      </div>
    </section>
  );
};

export default CompanyForm;
