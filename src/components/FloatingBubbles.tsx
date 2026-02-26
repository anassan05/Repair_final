import { useEffect, useRef } from "react";

/* ─── Large soft floating bubbles, Google-style ─── */

interface Bubble {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  opacity: number;
  speedX: number;
  speedY: number;
  phase: number; // unique phase offset for sine motion
  hue: number;   // color variation
}

const BUBBLE_COUNT = 5;  // reduced from 8 for better performance

const FloatingBubbles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initBubbles = (w: number, h: number) => {
      const bubbles: Bubble[] = [];
      for (let i = 0; i < BUBBLE_COUNT; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        bubbles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          radius: 120 + Math.random() * 220,     // 120–340px
          opacity: 0.025 + Math.random() * 0.035, // very subtle
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          phase: Math.random() * Math.PI * 2,
          hue: 210 + Math.random() * 30,          // blue range 210–240
        });
      }
      bubblesRef.current = bubbles;
    };

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initBubbles(window.innerWidth, window.innerHeight);
    };
    setSize();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setSize, 200);
    };

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const t = performance.now() * 0.001;
      const isMobile = w < 768;
      const isDark = document.documentElement.classList.contains("dark");
      const globalAlpha = isMobile ? 0.4 : 1;
      const darkBoost = isDark ? 0.6 : 1;

      for (const b of bubblesRef.current) {
        // Gentle sine/cosine drift
        b.x = b.baseX + Math.sin(t * 0.15 + b.phase) * 60;
        b.y = b.baseY + Math.cos(t * 0.12 + b.phase * 1.3) * 50;

        // Slow linear drift
        b.baseX += b.speedX;
        b.baseY += b.speedY;

        // Wrap around
        if (b.baseX < -b.radius) b.baseX = w + b.radius;
        if (b.baseX > w + b.radius) b.baseX = -b.radius;
        if (b.baseY < -b.radius) b.baseY = h + b.radius;
        if (b.baseY > h + b.radius) b.baseY = -b.radius;

        // Breathing scale
        const breathe = 1 + Math.sin(t * 0.5 + b.phase) * 0.08;
        const r = b.radius * breathe;

        // Radial gradient bubble
        const alpha = b.opacity * globalAlpha * darkBoost;
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
        grad.addColorStop(0, `hsla(${b.hue}, 70%, 65%, ${alpha * 1.2})`);
        grad.addColorStop(0.4, `hsla(${b.hue}, 60%, 70%, ${alpha * 0.7})`);
        grad.addColorStop(0.7, `hsla(${b.hue}, 50%, 75%, ${alpha * 0.3})`);
        grad.addColorStop(1, `hsla(${b.hue}, 40%, 80%, 0)`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", onResize);
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animFrameRef.current);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default FloatingBubbles;
