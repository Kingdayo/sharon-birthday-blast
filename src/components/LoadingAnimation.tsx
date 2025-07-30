import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative">
        {/* Main birthday cake with candles */}
        <div className="relative w-32 h-32 mx-auto">
          {/* Cake base */}
          <div className="absolute bottom-0 w-24 h-16 bg-gradient-cake rounded-lg mx-auto left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
            {/* Cake layers */}
            <div className="absolute inset-x-2 top-1 h-3 bg-accent/80 rounded-full"></div>
            <div className="absolute inset-x-2 top-4 h-3 bg-primary/60 rounded-full"></div>
            <div className="absolute inset-x-2 top-7 h-3 bg-secondary/60 rounded-full"></div>
          </div>
          
          {/* Floating candles */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1 h-8 bg-accent rounded-full relative animate-candle-flicker"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {/* Flame */}
                  <div 
                    className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-gradient-to-t from-party-orange to-accent rounded-full animate-candle-flicker opacity-90"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  ></div>
                  {/* Glow effect */}
                  <div 
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent/30 rounded-full blur-sm animate-pulse"
                    style={{ animationDelay: `${i * 0.4}s` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Floating confetti */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-confetti-realistic"
                style={{
                  backgroundColor: [
                    'hsl(var(--primary))',
                    'hsl(var(--secondary))', 
                    'hsl(var(--accent))',
                    'hsl(var(--party-blue))',
                    'hsl(var(--party-green))',
                    'hsl(var(--party-orange))'
                  ][i % 6],
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                  '--drift': `${(Math.random() - 0.5) * 200}px`
                } as React.CSSProperties}
              />
            ))}
          </div>
        </div>

        {/* Loading text with magical effect */}
        <div className="mt-8 text-center">
          <div className="text-2xl font-bold bg-gradient-party bg-clip-text text-transparent animate-pulse mb-2">
            Preparing the Party
          </div>
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Magical sparkles around the cake */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-accent rounded-full animate-ping"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;