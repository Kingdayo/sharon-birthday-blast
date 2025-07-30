import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const SharonAvatar = () => {
  const [isDancing, setIsDancing] = useState(false);
  const [isWaving, setIsWaving] = useState(false);

  const startDancing = () => {
    setIsDancing(true);
    setTimeout(() => setIsDancing(false), 3000);
  };

  const startWaving = () => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 2000);
  };

  return (
    <Card className="w-full max-w-sm mx-auto p-6 bg-gradient-party shadow-party">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-4">
          Meet Birthday Girl Sharon! 🎭
        </h3>
        
        <div className="relative mb-6">
          <div 
            className={`text-8xl mx-auto transition-all duration-500 ${
              isDancing ? 'animate-dance' : ''
            } ${isWaving ? 'animate-wiggle' : ''}`}
          >
            👩‍🎤
          </div>
          
          {isDancing && (
            <div className="absolute -inset-4 bg-gradient-confetti rounded-full opacity-30 animate-pulse" />
          )}
          
          {isWaving && (
            <div className="absolute top-0 right-0 text-2xl animate-wiggle">
              👋
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={startDancing}
            disabled={isDancing}
            variant="secondary"
            className="w-full"
          >
            {isDancing ? "🕺 Dancing! 💃" : "Make Sharon Dance!"}
          </Button>
          
          <Button
            onClick={startWaving}
            disabled={isWaving}
            variant="secondary"
            className="w-full"
          >
            {isWaving ? "👋 Waving! 👋" : "Wave Hello!"}
          </Button>
        </div>

        <div className="mt-4 text-white/90 text-sm">
          🌟 The star of today's celebration! 🌟
        </div>
      </div>
    </Card>
  );
};