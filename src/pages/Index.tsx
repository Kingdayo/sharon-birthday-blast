import { useEffect, useState } from "react";
import { ConfettiAnimation } from "@/components/ConfettiAnimation";
import { FloatingBalloons } from "@/components/FloatingBalloons";
import { BirthdayCard } from "@/components/BirthdayCard";
import { ScratchCard } from "@/components/ScratchCard";
import { InteractiveCake } from "@/components/InteractiveCake";
import { SharonAvatar } from "@/components/SharonAvatar";

const Index = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti after 6 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      {showConfetti && <ConfettiAnimation />}
      <FloatingBalloons />
      
      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-party bg-clip-text text-transparent mb-4 animate-bounce-gentle">
            🎉 Happy Birthday Sharon! 🎉
          </h1>
          <p className="text-2xl text-foreground/80 mb-2">
            A magical celebration just for you! ✨
          </p>
          <p className="text-lg text-muted-foreground">
            Get ready for some birthday surprises below! 🎂
          </p>
        </div>

        {/* Interactive Components Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Birthday Card */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center text-foreground">
              🎁 Special Message
            </h2>
            <BirthdayCard />
          </div>

          {/* Scratch Card */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center text-foreground">
              🔍 Hidden Surprise
            </h2>
            <ScratchCard />
          </div>

          {/* Interactive Cake */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center text-foreground">
              🕯️ Make a Wish
            </h2>
            <InteractiveCake />
          </div>
        </div>

        {/* Sharon Avatar */}
        <div className="flex justify-center">
          <SharonAvatar />
        </div>

        {/* Footer Message */}
        <div className="text-center mt-12 p-6 bg-card/50 rounded-2xl backdrop-blur-sm shadow-party">
          <p className="text-lg text-foreground leading-relaxed">
            🌟 <strong>Sharon</strong>, today is all about celebrating the incredible person you are! 🌟
            <br />
            <span className="text-muted-foreground">
              May your special day be filled with joy, laughter, and endless happiness! 🎈
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
