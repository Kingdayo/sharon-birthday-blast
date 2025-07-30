import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

export const InteractiveCake = () => {
  const [candlesLit, setCandlesLit] = useState(Array(5).fill(true));
  const [isListening, setIsListening] = useState(false);
  const [hasBlownCandles, setHasBlownCandles] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      
      microphone.connect(analyser);
      analyser.fftSize = 256;
      
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        
        // Enhanced blow detection - focus on mid-range frequencies typical of blowing
        const lowFreq = dataArray.slice(1, 8);
        const midFreq = dataArray.slice(8, 25);
        const highFreq = dataArray.slice(25, 50);
        
        const lowAvg = lowFreq.reduce((sum, value) => sum + value, 0) / lowFreq.length;
        const midAvg = midFreq.reduce((sum, value) => sum + value, 0) / midFreq.length;
        const highAvg = highFreq.reduce((sum, value) => sum + value, 0) / highFreq.length;
        
        // Detect blow pattern: strong low-mid frequencies with sudden spike
        const blowStrength = (lowAvg + midAvg * 1.5) / 2;
        const isBlowPattern = blowStrength > 30 && midAvg > lowAvg && midAvg > highAvg;
        
        // If blow pattern detected, blow out candles
        if (isBlowPattern && candlesLit.some(candle => candle)) {
          blowOutCandles();
          stopListening();
        }
        
        if (isListening) {
          requestAnimationFrame(checkVolume);
        }
      };

      setIsListening(true);
      checkVolume();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopListening = () => {
    setIsListening(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const blowOutCandles = () => {
    candlesLit.forEach((_, index) => {
      setTimeout(() => {
        setCandlesLit(prev => {
          const newCandles = [...prev];
          newCandles[index] = false;
          return newCandles;
        });
      }, index * 200);
    });
    setHasBlownCandles(true);
  };

  const relightCandles = () => {
    setCandlesLit(Array(5).fill(true));
    setHasBlownCandles(false);
  };

  return (
    <Card className="w-full max-w-sm sm:max-w-md mx-auto p-4 sm:p-6 bg-gradient-cake shadow-cake">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
          🎂 Birthday Cake 🎂
        </h3>
        
        <div className="relative mb-4 sm:mb-6">
          {/* Cake Container with Shadow - Responsive */}
          <div className="relative mx-auto w-64 h-44 sm:w-80 sm:h-52">
            
            {/* Cake Plate */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 sm:w-80 h-5 sm:h-6 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 rounded-full shadow-lg"></div>
            
            {/* Bottom Cake Layer */}
            <div className="absolute bottom-5 sm:bottom-6 left-1/2 transform -translate-x-1/2 w-48 sm:w-60 h-16 sm:h-20 bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 rounded-lg"></div>
              {/* Bottom layer decorative border */}
              <div className="absolute bottom-2 left-2 right-2 h-1 bg-primary rounded-full"></div>
              <div className="absolute bottom-4 left-4 right-4 h-px bg-primary/50"></div>
            </div>
            
            {/* Top Cake Layer */}
            <div className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 w-36 sm:w-44 h-12 sm:h-16 bg-gradient-to-b from-pink-100 to-pink-200 rounded-lg shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200 rounded-lg"></div>
              {/* Top layer decorative swirls */}
              <div className="absolute top-1 sm:top-2 left-2 sm:left-3 text-xs text-primary">🌸</div>
              <div className="absolute top-2 sm:top-3 right-3 sm:right-4 text-xs text-secondary">🌟</div>
              <div className="absolute bottom-2 sm:bottom-3 left-4 sm:left-6 text-xs text-accent">✨</div>
              <div className="absolute bottom-1 sm:bottom-2 right-4 sm:right-6 text-xs text-primary">💫</div>
            </div>
            
            {/* Candles with realistic design */}
            <div className="absolute bottom-24 sm:bottom-32 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3">
              {candlesLit.map((isLit, index) => (
                <div key={index} className="flex flex-col items-center">
                  {/* Flame with glow effect */}
                  {isLit && (
                    <div className="relative mb-1">
                      <div className="w-2 h-3 sm:w-3 sm:h-4 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full animate-candle-flicker shadow-glow" />
                      <div className="absolute inset-0 w-2 h-3 sm:w-3 sm:h-4 bg-yellow-300 rounded-full opacity-60 animate-pulse" />
                    </div>
                  )}
                  {/* Candle with wax drips */}
                  <div className="relative">
                    <div className="w-1.5 h-8 sm:w-2 sm:h-10 bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-sm shadow-md" />
                    <div className="absolute top-1 sm:top-2 -left-px w-1 h-2 sm:h-3 bg-yellow-100 rounded-full opacity-70" />
                    <div className="absolute top-3 sm:top-5 -right-px w-1 h-1 sm:h-2 bg-yellow-100 rounded-full opacity-70" />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Decorative elements */}
            <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 text-white font-bold text-xs sm:text-sm bg-primary/80 px-2 sm:px-3 py-1 rounded-full shadow-lg">
              Happy Birthday! 🎂
            </div>
            
            {/* Sparkles around cake */}
            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-yellow-300 animate-bounce-gentle">✨</div>
            <div className="absolute top-4 sm:top-8 right-4 sm:right-6 text-pink-300 animate-float">🌟</div>
            <div className="absolute bottom-24 sm:bottom-32 left-1 sm:left-2 text-purple-300 animate-wiggle">💫</div>
            <div className="absolute bottom-18 sm:bottom-24 right-1 sm:right-2 text-blue-300 animate-bounce-gentle">⭐</div>
          </div>
        </div>

        {hasBlownCandles ? (
          <div className="text-center">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 animate-bounce-gentle">🎉</div>
            <p className="text-white mb-3 sm:mb-4 text-sm sm:text-base">
              🌟 Wish granted! 🌟<br />
              Hope all your dreams come true!
            </p>
            <Button onClick={relightCandles} variant="secondary" className="text-sm sm:text-base">
              Light Candles Again
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-white mb-3 sm:mb-4 text-sm sm:text-base">
              Make a wish and blow out the candles!
            </p>
            <Button
              onClick={isListening ? stopListening : startListening}
              variant={isListening ? "destructive" : "secondary"}
              className="flex items-center gap-2 text-sm sm:text-base mx-auto"
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              {isListening ? "Stop Listening" : "Enable Microphone"}
            </Button>
            <p className="text-xs sm:text-sm text-white/80 mt-2">
              {isListening ? "Blow gently to extinguish candles!" : "Click to enable voice control"}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};