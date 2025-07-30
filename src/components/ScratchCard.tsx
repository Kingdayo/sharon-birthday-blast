import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

export const ScratchCard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [revealPercentage, setRevealPercentage] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 300;

    // Create initial scratch surface
    ctx.fillStyle = "#E5E7EB";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add scratch-off pattern
    ctx.fillStyle = "#9CA3AF";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("🎈 Scratch Here! 🎈", canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillText("Use your mouse or finger", canvas.width / 2, canvas.height / 2 + 20);

    ctx.globalCompositeOperation = "destination-out";
  }, []);

  const scratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.arc(x, y, 25, 0, 2 * Math.PI);
    ctx.fill();

    // Calculate reveal percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }

    const percentage = (transparentPixels / (pixels.length / 4)) * 100;
    setRevealPercentage(percentage);
  };

  const handleMouseDown = () => setIsScratching(true);
  const handleMouseUp = () => setIsScratching(false);

  return (
    <Card className="relative w-full max-w-md mx-auto shadow-party overflow-hidden">
      <div className="absolute inset-0 bg-gradient-magic p-6 flex flex-col justify-center items-center text-white">
        <div className="text-6xl mb-4 animate-wiggle">🎉</div>
        <h3 className="text-2xl font-bold text-center mb-2">
          Surprise Photo!
        </h3>
        <p className="text-center opacity-90">
          A special memory just for you! ✨
        </p>
        {revealPercentage > 70 && (
          <div className="mt-4 animate-bounce-gentle">
            <div className="w-32 h-32 bg-white/20 rounded-lg flex items-center justify-center text-4xl">
              📸
            </div>
          </div>
        )}
      </div>
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={isScratching ? scratch : undefined}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchMove={scratch}
        style={{ width: '100%', height: '300px' }}
      />
    </Card>
  );
};