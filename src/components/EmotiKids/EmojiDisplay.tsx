import { useState, useEffect } from "react";

interface EmojiDisplayProps {
  emoji?: string;
  emotion?: string;
}

const EmojiDisplay = ({ emoji, emotion }: EmojiDisplayProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (emoji) {
      setIsVisible(true);
    }
  }, [emoji]);

  if (!emoji) return null;

  return (
    <div className="flex flex-col items-center space-y-4 mb-8">
      <div
        className={`
          relative transition-all duration-500 transform
          ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
        `}
      >
        <div className="text-8xl animate-bounce-in">
          {emoji}
        </div>
        
        <div className="absolute inset-0 rounded-full bg-accent/20 animate-pulse-glow blur-xl"></div>
      </div>
      
      {emotion && (
        <div className="bg-card/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-card">
          <p className="text-lg font-medium text-foreground capitalize">
            {emotion}
          </p>
        </div>
      )}
    </div>
  );
};

export default EmojiDisplay;