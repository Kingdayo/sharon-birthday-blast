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
          {/* Cake */}
          <div className="w-48 h-32 mx-auto bg-accent rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-accent to-amber-600"></div>
            
            {/* Candles */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {candlesLit.map((isLit, index) => (
                <div key={index} className="flex flex-col items-center">
                  {/* Flame */}
                  {isLit && (
                    <div className="w-2 h-3 bg-orange-500 rounded-full animate-candle-flicker mb-1" />
                  )}
                  {/* Candle */}
                  <div className="w-1 h-8 bg-yellow-200 rounded-sm" />
                </div>
              ))}
            </div>
            
            {/* Decorations */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-sm">
              Happy Birthday!
            </div>
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