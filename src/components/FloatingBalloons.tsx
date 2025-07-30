export const FloatingBalloons = () => {
  const balloons = [
    { color: 'primary', delay: '0s', left: '10%' },
    { color: 'secondary', delay: '1s', left: '20%' },
    { color: 'accent', delay: '2s', left: '80%' },
    { color: 'party-blue', delay: '0.5s', left: '90%' },
    { color: 'party-green', delay: '1.5s', left: '70%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {balloons.map((balloon, index) => (
        <div
          key={index}
          className="absolute bottom-0 animate-float"
          style={{
            left: balloon.left,
            animationDelay: balloon.delay,
          }}
        >
          <div className="relative">
            <div
              className={`w-16 h-20 rounded-full shadow-glow balloon-${balloon.color}`}
              style={{
                background: `hsl(var(--${balloon.color}))`,
              }}
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-16 bg-foreground/30" />
          </div>
        </div>
      ))}
    </div>
  );
};