import { useEffect, useRef } from "react";

/* ─── Green floating bubbles for Worker module ─── */

interface Bubble {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  opacity: number;
  speedX: number;
  speedY: number;
  phase: number;
  hue: number;
}

const BUBBLE_COUNT = 8;

const GreenFloatingBubbles = () => {
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
          radius: 150 + Math.random() * 250,
          opacity: 0.12 + Math.random() * 0.1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          phase: Math.random() * Math.PI * 2,
          hue: 130 + Math.random() * 30, // green range 130–160
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
      const globalAlpha = isMobile ? 0.55 : 1;

      for (const b of bubblesRef.current) {
        b.x = b.baseX + Math.sin(t * 0.15 + b.phase) * 60;
        b.y = b.baseY + Math.cos(t * 0.12 + b.phase * 1.3) * 50;

        b.baseX += b.speedX;
        b.baseY += b.speedY;

        if (b.baseX < -b.radius) b.baseX = w + b.radius;
        if (b.baseX > w + b.radius) b.baseX = -b.radius;
        if (b.baseY < -b.radius) b.baseY = h + b.radius;
        if (b.baseY > h + b.radius) b.baseY = -b.radius;

        const breathe = 1 + Math.sin(t * 0.5 + b.phase) * 0.08;
        const r = b.radius * breathe;

        const alpha = b.opacity * globalAlpha;
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
        grad.addColorStop(0, `hsla(${b.hue}, 80%, 55%, ${alpha})`);
        grad.addColorStop(0.4, `hsla(${b.hue}, 70%, 55%, ${alpha * 0.6})`);
        grad.addColorStop(0.7, `hsla(${b.hue}, 60%, 60%, ${alpha * 0.25})`);
        grad.addColorStop(1, `hsla(${b.hue}, 50%, 65%, 0)`);

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

export default GreenFloatingBubbles;
