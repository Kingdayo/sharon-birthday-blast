import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface ScrambleTextProps {
  text: string;
  isRevealed: boolean;
}

const ScrambleText = ({ text, isRevealed }: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isRevealed) {
      setDisplayText("");
      setCurrentIndex(0);
      return;
    }

    const scrambleChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    let interval: NodeJS.Timeout;

    const revealText = () => {
      if (currentIndex < text.length) {
        // Faster scramble phase
        let scrambleCount = 0;
        const scrambleInterval = setInterval(() => {
          const scrambled = text
            .split("")
            .map((char, index) => {
              if (index < currentIndex) return char;
              if (index === currentIndex && scrambleCount > 2) return char; // Reduced from 5 to 2
              return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            })
            .join("");
          
          setDisplayText(scrambled);
          scrambleCount++;

          if (scrambleCount > 4) { // Reduced from 8 to 4
            clearInterval(scrambleInterval);
            setCurrentIndex(prev => prev + 1);
          }
        }, 25); // Reduced from 50ms to 25ms for faster scrambling
      }
    };

    interval = setInterval(revealText, 40); // Reduced from 100ms to 40ms for faster character reveal

    return () => {
      clearInterval(interval);
    };
  }, [text, isRevealed, currentIndex]);

  return <span className="font-mono">{displayText}</span>;
};

export const BirthdayCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(true);
    setTimeout(() => setShowMessage(true), 600);
  };

  const message = "Happy Birthday Sharon! 🎉 Today is all about celebrating the amazing person you are. May this special day be filled with joy, laughter, and wonderful surprises! 🎂✨";

  return (
    <div className="perspective-1000 w-full max-w-md mx-auto">
      <Card 
        className={`relative h-64 cursor-pointer transition-transform duration-700 transform-style-preserve-3d shadow-party ${
          isFlipped ? 'rotate-y-180' : 'hover:rotate-y-12'
        }`}
        onClick={handleCardClick}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-gradient-party rounded-lg p-6 flex flex-col justify-center items-center text-white">
          <div className="text-6xl mb-4 animate-bounce-gentle">🎁</div>
          <h2 className="text-2xl font-bold text-center">
            Special Birthday Card
          </h2>
          <p className="text-sm opacity-90 text-center mt-2">
            Click to reveal your message!
          </p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-card rounded-lg p-6 flex flex-col justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">🎂</div>
            <div className="text-foreground leading-relaxed">
              <ScrambleText text={message} isRevealed={showMessage} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};