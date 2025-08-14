import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface EmojiHistoryItem {
  id: string;
  emoji: string;
  emotion: string;
  message: string;
  timestamp: Date;
}

interface EmojiHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  history: EmojiHistoryItem[];
  onEmojiSelect: (item: EmojiHistoryItem) => void;
}

const EmojiHistory = ({ isOpen, onClose, history, onEmojiSelect }: EmojiHistoryProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-in-bottom">
      <div className="bg-card/95 backdrop-blur-md border-t border-border/50 p-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Histórico de Emoções
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <ScrollArea className="h-32">
          <div className="flex space-x-2 pb-2">
            {history.length === 0 ? (
              <p className="text-muted-foreground text-center w-full py-4">
                Nenhuma emoção registrada ainda
              </p>
            ) : (
              history.map((item) => (
                <Button
                  key={item.id}
                  variant="outline"
                  onClick={() => onEmojiSelect(item)}
                  className="
                    flex-shrink-0 h-16 w-16 rounded-2xl border-border/50
                    hover:bg-accent/10 transition-all duration-200
                    hover:scale-110
                  "
                >
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.emotion}
                    </span>
                  </div>
                </Button>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default EmojiHistory;
export type { EmojiHistoryItem };