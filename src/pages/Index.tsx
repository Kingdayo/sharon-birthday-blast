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
    // Hide confetti after 12 seconds for longer celebration
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);
  return <div className="min-h-screen relative overflow-hidden">
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

        {/* Interactive Components Grid - Enhanced for wider screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-8 xl:gap-12 mb-8 sm:mb-12 max-w-7xl mx-auto">
          {/* Birthday Card */}
          <div className="space-y-3 sm:space-y-4 order-1 flex flex-col items-center">
            <h2 className="text-lg sm:text-xl font-semibold text-center text-foreground">
              🎁 Special Message
            </h2>
            <div className="w-full max-w-md">
              <BirthdayCard />
            </div>
          </div>

          {/* Interactive Cake */}
          <div className="space-y-3 sm:space-y-4 order-2 lg:order-2 2xl:order-2 flex flex-col items-center">
            <h2 className="text-lg sm:text-xl font-semibold text-center text-foreground">
              🕯️ Make a Wish
            </h2>
            <div className="w-full max-w-md">
              <InteractiveCake />
            </div>
          </div>

          {/* Sharon Avatar - Show on wider screens as third column */}
          <div className="hidden 2xl:flex space-y-3 sm:space-y-4 order-3 flex-col items-center">
            <h2 className="text-lg sm:text-xl font-semibold text-center text-foreground">
              👋 Say Hi to Sharon!
            </h2>
            <div className="w-full max-w-md">
              <SharonAvatar />
            </div>
          </div>
        </div>

        {/* Sharon Avatar - Show on smaller screens below content */}
        <div className="flex justify-center 2xl:hidden">
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
    </div>;
};
export default Index;