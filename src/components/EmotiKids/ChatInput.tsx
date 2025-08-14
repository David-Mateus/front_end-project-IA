import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, History } from "lucide-react";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  onVoiceToggle: () => void;
  onHistoryToggle: () => void;
  isListening?: boolean;
  disabled?: boolean;
}

const ChatInput = ({ 
  onSubmit, 
  onVoiceToggle, 
  onHistoryToggle,
  isListening = false,
  disabled = false 
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSubmit(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card rounded-2xl shadow-card p-6 border border-border/50">
        <div className="space-y-4">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Como você está se sentindo hoje? Conte para mim..."
            className="
              min-h-[120px] text-lg resize-none border-none bg-transparent
              placeholder:text-muted-foreground focus:ring-0 focus:ring-offset-0
            "
            disabled={disabled || isListening}
          />
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={onHistoryToggle}
                className="rounded-full border-border/50 hover:bg-accent/10"
              >
                <History className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={onVoiceToggle}
                className={`
                  rounded-full border-border/50
                  ${isListening 
                    ? 'bg-accent text-accent-foreground animate-pulse-glow' 
                    : 'hover:bg-accent/10'
                  }
                `}
                disabled={disabled}
              >
                <Mic className="h-4 w-4" />
              </Button>
              
              <Button
                onClick={handleSubmit}
                disabled={!message.trim() || disabled || isListening}
                className="
                  rounded-full bg-gradient-primary hover:scale-105 
                  transition-transform duration-200 shadow-soft
                "
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;