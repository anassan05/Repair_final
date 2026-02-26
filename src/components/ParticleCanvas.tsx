import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  speed: number;
}

interface ParticleCanvasProps {
  excludeSelector?: string;
}

const ParticleCanvas = ({ excludeSelector }: ParticleCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  const PARTICLE_COUNT = 60;       // reduced from 120 for performance
  const INTERACTION_RADIUS = 150;
  const RETURN_SPEED = 0.02;
  const DOT_COLOR = "100, 140, 220"; // visible blue dots
  const CONNECTION_DIST = 120;       // max distance for line connections

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 3 + 1.5,
        opacity: Math.random() * 0.5 + 0.25,
        speed: Math.random() * 0.5 + 0.15,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(window.innerWidth, window.innerHeight);
    };

    setCanvasSize();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setCanvasSize, 150);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const excludedElement = excludeSelector ? document.querySelector(excludeSelector) : null;
      const excludedRect = excludedElement ? excludedElement.getBoundingClientRect() : null;
      const isInExcludedZone = (x: number, y: number) => {
        if (!excludedRect) return false;
        return x >= excludedRect.left && x <= excludedRect.right && y >= excludedRect.top && y <= excludedRect.bottom;
      };

      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Distance from mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < INTERACTION_RADIUS && dist > 0) {
          // Pull towards cursor
          const force = (INTERACTION_RADIUS - dist) / INTERACTION_RADIUS;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 4;
          p.y += Math.sin(angle) * force * 4;
        } else {
          // Drift back
          p.x += (p.baseX - p.x) * RETURN_SPEED;
          p.y += (p.baseY - p.y) * RETURN_SPEED;
        }

        // Gentle floating
        const t = Date.now() * 0.001;
        p.x += Math.sin(t * 0.5 + i * 0.3) * p.speed * 0.2;
        p.y += Math.cos(t * 0.3 + i * 0.5) * p.speed * 0.2;

        // Wrap around screen edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const particleExcluded = isInExcludedZone(p.x, p.y);

        // Glow near cursor
        const glowBoost = dist < INTERACTION_RADIUS ? (1 - dist / INTERACTION_RADIUS) * 0.4 : 0;

        // Mobile & dark-mode aware opacity
        const mobileScale = window.innerWidth < 768 ? 0.15 : 1;
        const isDark = document.documentElement.classList.contains('dark');
        const themeScale = isDark ? 0.35 : 1;

        if (!particleExcluded) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${DOT_COLOR}, ${(p.opacity + glowBoost) * mobileScale * themeScale})`;
          ctx.fill();
        }

        // Connections – only check nearby particles to reduce work
        if (!particleExcluded) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const lx = p.x - p2.x;
            if (Math.abs(lx) > CONNECTION_DIST) continue; // fast skip
            const ly = p.y - p2.y;
            if (Math.abs(ly) > CONNECTION_DIST) continue;
            const ldSq = lx * lx + ly * ly;
            if (ldSq < CONNECTION_DIST * CONNECTION_DIST) {
              const ld = Math.sqrt(ldSq);
              const lineOpacity = 0.12 * (1 - ld / CONNECTION_DIST) * mobileScale * themeScale;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${DOT_COLOR}, ${lineOpacity})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animFrameRef.current);
      clearTimeout(resizeTimer);
    };
  }, [initParticles, excludeSelector]);

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

export default ParticleCanvas;
