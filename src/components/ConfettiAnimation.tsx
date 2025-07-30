import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  color: string;
  left: number;
  delay: number;
  size: number;
  shape: 'circle' | 'square' | 'triangle' | 'heart' | 'star';
  rotation: number;
  drift: number;
  opacity: number;
}

export const ConfettiAnimation = () => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = [
      'hsl(var(--primary))',
      'hsl(var(--secondary))',
      'hsl(var(--accent))',
      'hsl(var(--party-blue))',
      'hsl(var(--party-green))',
      'hsl(var(--party-orange))'
    ];

    const shapes: ConfettiPiece['shape'][] = ['circle', 'square', 'triangle', 'heart', 'star'];

    const pieces: ConfettiPiece[] = Array.from({ length: 120 }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 100,
      delay: Math.random() * 6,
      size: Math.random() * 15 + 4,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      rotation: Math.random() * 360,
      drift: (Math.random() - 0.5) * 80,
      opacity: 0.6 + Math.random() * 0.4,
    }));

    setConfetti(pieces);

    // Clean up after extended animation
    const timer = setTimeout(() => {
      setConfetti([]);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const getShapeElement = (piece: ConfettiPiece) => {
    const baseStyle = {
      width: `${piece.size}px`,
      height: `${piece.size}px`,
      backgroundColor: piece.color,
      opacity: piece.opacity,
    };

    switch (piece.shape) {
      case 'circle':
        return <div className="rounded-full" style={baseStyle} />;
      case 'square':
        return <div style={baseStyle} />;
      case 'triangle':
        return (
          <div 
            style={{
              width: 0,
              height: 0,
              borderLeft: `${piece.size / 2}px solid transparent`,
              borderRight: `${piece.size / 2}px solid transparent`,
              borderBottom: `${piece.size}px solid ${piece.color}`,
              opacity: piece.opacity,
            }}
          />
        );
      case 'heart':
        return (
          <div className="text-red-500" style={{ fontSize: `${piece.size}px`, opacity: piece.opacity }}>
            ❤️
          </div>
        );
      case 'star':
        return (
          <div className="text-yellow-400" style={{ fontSize: `${piece.size}px`, opacity: piece.opacity }}>
            ⭐
          </div>
        );
      default:
        return <div className="rounded-full" style={baseStyle} />;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.left}%`,
            animation: `confettiRealistic 6s linear infinite`,
            animationDelay: `${piece.delay}s`,
            transform: `rotate(${piece.rotation}deg)`,
            '--drift': `${piece.drift}px`,
          } as React.CSSProperties}
        >
          {getShapeElement(piece)}
        </div>
      ))}
    </div>
  );
};