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
        const volume = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
        
        // If volume exceeds threshold, blow out candles
        if (volume > 50 && candlesLit.some(candle => candle)) {
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
    <Card className="w-full max-w-md mx-auto p-6 bg-gradient-cake shadow-cake">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-6">
          🎂 Birthday Cake 🎂
        </h3>
        
        <div className="relative mb-6">
          {/* Cake Container with Shadow */}
          <div className="relative mx-auto" style={{ width: '280px', height: '200px' }}>
            
            {/* Cake Plate */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-72 h-6 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 rounded-full shadow-lg"></div>
            
            {/* Bottom Cake Layer */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-56 h-20 bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 rounded-lg"></div>
              {/* Bottom layer decorative border */}
              <div className="absolute bottom-2 left-2 right-2 h-1 bg-primary rounded-full"></div>
              <div className="absolute bottom-4 left-4 right-4 h-px bg-primary/50"></div>
            </div>
            
            {/* Top Cake Layer */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-44 h-16 bg-gradient-to-b from-pink-100 to-pink-200 rounded-lg shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200 rounded-lg"></div>
              {/* Top layer decorative swirls */}
              <div className="absolute top-2 left-3 text-xs text-primary">🌸</div>
              <div className="absolute top-3 right-4 text-xs text-secondary">🌟</div>
              <div className="absolute bottom-3 left-6 text-xs text-accent">✨</div>
              <div className="absolute bottom-2 right-6 text-xs text-primary">💫</div>
            </div>
            
            {/* Candles with realistic design */}
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex gap-3">
              {candlesLit.map((isLit, index) => (
                <div key={index} className="flex flex-col items-center">
                  {/* Flame with glow effect */}
                  {isLit && (
                    <div className="relative mb-1">
                      <div className="w-3 h-4 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full animate-candle-flicker shadow-glow" />
                      <div className="absolute inset-0 w-3 h-4 bg-yellow-300 rounded-full opacity-60 animate-pulse" />
                    </div>
                  )}
                  {/* Candle with wax drips */}
                  <div className="relative">
                    <div className="w-2 h-10 bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-sm shadow-md" />
                    <div className="absolute top-2 -left-px w-1 h-3 bg-yellow-100 rounded-full opacity-70" />
                    <div className="absolute top-5 -right-px w-1 h-2 bg-yellow-100 rounded-full opacity-70" />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Decorative elements */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white font-bold text-sm bg-primary/80 px-3 py-1 rounded-full shadow-lg">
              Happy Birthday! 🎂
            </div>
            
            {/* Sparkles around cake */}
            <div className="absolute top-4 left-4 text-yellow-300 animate-bounce-gentle">✨</div>
            <div className="absolute top-8 right-6 text-pink-300 animate-float">🌟</div>
            <div className="absolute bottom-32 left-2 text-purple-300 animate-wiggle">💫</div>
            <div className="absolute bottom-24 right-2 text-blue-300 animate-bounce-gentle">⭐</div>
          </div>
        </div>

        {hasBlownCandles ? (
          <div className="text-center">
            <div className="text-4xl mb-4 animate-bounce-gentle">🎉</div>
            <p className="text-white mb-4">
              🌟 Wish granted! 🌟<br />
              Hope all your dreams come true!
            </p>
            <Button onClick={relightCandles} variant="secondary">
              Light Candles Again
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-white mb-4">
              Make a wish and blow out the candles!
            </p>
            <Button
              onClick={isListening ? stopListening : startListening}
              variant={isListening ? "destructive" : "secondary"}
              className="flex items-center gap-2"
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              {isListening ? "Stop Listening" : "Enable Microphone"}
            </Button>
            <p className="text-xs text-white/80 mt-2">
              {isListening ? "Speak or blow to extinguish candles!" : "Click to enable voice control"}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};