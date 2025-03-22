import GlassCard from "@/components/GlassCard";
import { Shield, Zap, BarChart3 } from "lucide-react";

const About = () => {
  return (
    <section className="page-transition py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">About YURALINK</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>
        
        <GlassCard className="p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-zinc-400 mb-6">
                YURALINK was founded with a clear mission: to revolutionize how brands and content creators collaborate in the digital space.
              </p>
              <p className="text-zinc-400">
                We believe in creating authentic partnerships that benefit both parties while delivering engaging content to audiences worldwide.
              </p>
            </div>
            <div className="glass rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Team collaboration" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Why Choose YURALINK?</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <GlassCard className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Verified Creators</h4>
                <p className="text-zinc-400">We thoroughly vet all influencers in our network to ensure quality and authenticity.</p>
              </GlassCard>
              
              <GlassCard className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Fast Matching</h4>
                <p className="text-zinc-400">Our proprietary algorithm quickly connects brands with the perfect influencers for their campaigns.</p>
              </GlassCard>
              
              <GlassCard className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Campaign Analytics</h4>
                <p className="text-zinc-400">Detailed performance metrics help you measure ROI and optimize your influencer marketing strategy.</p>
              </GlassCard>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default About;
