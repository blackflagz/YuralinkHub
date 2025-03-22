import { ReactNode } from "react";
import { Link } from "wouter";
import GlassCard from "./GlassCard";

interface OptionCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  icon: ReactNode;
}

const OptionCard = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink, 
  icon 
}: OptionCardProps) => {
  return (
    <GlassCard className="p-8 transition-all duration-300 hover:translate-y-[-8px] flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-zinc-400 mb-8">
        {description}
      </p>
      <Link 
        href={buttonLink}
        className="btn-hover-effect bg-gradient-to-r from-[#4f46e5] to-[#6366f1] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300">
        {buttonText}
      </Link>
    </GlassCard>
  );
};

export default OptionCard;
