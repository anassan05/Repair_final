import { useEffect, useRef } from "react";

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  alpha: number;
}

const RedFloatingBubbles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initBubbles = () => {
      const count = Math.min(30, Math.floor(window.innerWidth / 60));
      bubblesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 4 + Math.random() * 16,
        speedY: 0.2 + Math.random() * 0.8,
        alpha: 0.08 + Math.random() * 0.18,
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      bubblesRef.current.forEach((bubble) => {
        bubble.y -= bubble.speedY;

        if (bubble.y + bubble.radius < 0) {
          bubble.y = canvas.height + bubble.radius;
          bubble.x = Math.random() * canvas.width;
        }

        context.beginPath();
        context.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(239, 68, 68, ${bubble.alpha})`;
        context.fill();
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    setSize();
    initBubbles();
    draw();

    const handleResize = () => {
      setSize();
      initBubbles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default RedFloatingBubbles;
