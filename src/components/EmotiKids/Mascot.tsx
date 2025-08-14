import { useState, useEffect } from "react";
import mascotImage from "@/assets/emotikids-mascot.png";

interface MascotProps {
  emotion?: string;
  isListening?: boolean;
  className?: string;
}

const Mascot = ({ emotion, isListening, className }: MascotProps) => {
  const [reaction, setReaction] = useState("");

  useEffect(() => {
    if (emotion) {
      setReaction(emotion);
      // Reset reaction after animation
      const timer = setTimeout(() => setReaction(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [emotion]);

  const getMascotAnimation = () => {
    if (isListening) return "animate-pulse-glow";
    if (reaction) return "animate-bounce-in";
    return "animate-float";
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          w-24 h-24 rounded-full bg-card shadow-card p-2
          transition-all duration-400 ${getMascotAnimation()}
        `}
      >
        <img
          src={mascotImage}
          alt="EmotiKids Mascot"
          className="w-full h-full object-contain"
        />
      </div>
      
      {reaction && (
        <div className="absolute -top-8 -right-4 animate-bounce-in">
          <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium shadow-soft">
            {getReactionText(emotion)}
          </div>
        </div>
      )}
    </div>
  );
};

const getReactionText = (emotion?: string) => {
  const reactions = {
    happy: "😊 Que alegria!",
    sad: "😔 Te entendo",
    angry: "😤 Vamos acalmar?",
    excited: "🎉 Incrível!",
    calm: "😌 Muito zen!",
    default: "👋 Olá!"
  };
  
  return reactions[emotion as keyof typeof reactions] || reactions.default;
};

export default Mascot;