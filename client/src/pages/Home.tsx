import { Link } from "wouter";
import OptionCard from "@/components/OptionCard";
import { Building2, User } from "lucide-react";

const Home = () => {
  return (
    <section className="page-transition min-h-screen flex items-center justify-center py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Connect <span className="text-[#1db954]">Influencers</span> with <span className="text-[#1db954]">Companies</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            YURALINK bridges the gap between brands and content creators,
            enabling powerful collaborations that drive engagement and growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Company Card */}
          <OptionCard 
            title="I'm a Company"
            description="Find the perfect influencers to promote your brand and products to reach your target audience effectively."
            buttonText="Start a Campaign"
            buttonLink="/company-form"
            icon={<Building2 className="h-10 w-10 text-[#1db954]" />}
          />
          
          {/* Influencer Card */}
          <OptionCard 
            title="I'm an Influencer"
            description="Connect with brands that align with your content and audience, and turn your influence into profitable partnerships."
            buttonText="Join Our Network"
            buttonLink="/influencer-form"
            icon={<User className="h-10 w-10 text-[#1db954]" />}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
