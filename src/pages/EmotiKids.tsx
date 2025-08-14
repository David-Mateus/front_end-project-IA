import { useState } from "react";
import Mascot from "@/components/EmotiKids/Mascot";
import EmojiDisplay from "@/components/EmotiKids/EmojiDisplay";
import ChatInput from "@/components/EmotiKids/ChatInput";
import EmojiHistory, { EmojiHistoryItem } from "@/components/EmotiKids/EmojiHistory";

const EmotiKids = () => {
  const [currentEmoji, setCurrentEmoji] = useState<string>("");
  const [currentEmotion, setCurrentEmotion] = useState<string>("");
  const [isListening, setIsListening] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [emojiHistory, setEmojiHistory] = useState<EmojiHistoryItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);


    const handleMessageSubmit = async (message: string) => {
    setIsProcessing(true);

    try {
      const response = await fetch("http://localhost:5000/emotions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }), // envia a frase para o backend
      });

      if (!response.ok) throw new Error("Erro ao processar a emoção");

      const data = await response.json(); 
      // O backend deve retornar algo como { emoji: "😊", emotion: "feliz" }

      setCurrentEmoji(data.emoji);
      setCurrentEmotion(data.emotion);

      // Adiciona ao histórico
      const newHistoryItem: EmojiHistoryItem = {
        id: Date.now().toString(),
        emoji: data.emoji,
        emotion: data.emotion,
        message,
        timestamp: new Date(),
      };
      setEmojiHistory(prev => [newHistoryItem, ...prev].slice(0, 20));
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // Mock voice recognition toggle
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000);
    }
  };

  const handleHistoryEmojiSelect = (item: EmojiHistoryItem) => {
    setCurrentEmoji(item.emoji);
    setCurrentEmotion(item.emotion);
    setIsHistoryOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 text-6xl animate-float">🎉🎈🧩</div>
        <div className="absolute top-40 right-20 text-6xl animate-float" style={{ animationDelay: '1s' }}>🧩🍭🍬</div>
        <div className="absolute bottom-40 left-20 text-6xl animate-float" style={{ animationDelay: '2s' }}>🌈🧩💌</div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="text-center py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-2">
            AutisIAKids
          </h1>
          <p className="text-lg text-muted-foreground">
            Descubra como você está se sentindo.
          </p>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 space-y-8">
          {/* Emoji display area */}
          <div className="text-center min-h-[200px] flex items-center justify-center">
            {currentEmoji ? (
              <EmojiDisplay emoji={currentEmoji} emotion={currentEmotion} />
            ) : (
              <div className="text-center space-y-4">
                <div className="text-6xl animate-float">👋</div>
                <p className="text-xl text-foreground font-medium">
                  Olá! Como você está se sentindo hoje?
                </p>
              </div>
            )}
          </div>

          {/* Chat input */}
          <ChatInput
            onSubmit={handleMessageSubmit}
            onVoiceToggle={handleVoiceToggle}
            onHistoryToggle={() => setIsHistoryOpen(!isHistoryOpen)}
            isListening={isListening}
            disabled={isProcessing}
          />

          {/* Processing indicator */}
          {isProcessing && (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent"></div>
              <span>Analisando suas emoções...</span>
            </div>
          )}
        </main>

        {/* Mascot */}
        <Mascot
          emotion={currentEmotion}
          isListening={isListening}
          className="fixed bottom-8 right-8"
        />

        {/* Emoji History */}
        <EmojiHistory
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          history={emojiHistory}
          onEmojiSelect={handleHistoryEmojiSelect}
        />
      </div>
    </div>
  );
};

export default EmotiKids;