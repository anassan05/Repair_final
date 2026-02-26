import { useRef, useCallback, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────── */

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  warranty: string;
}

interface ServiceCardGalleryProps {
  services: ServiceItem[];
  onServiceClick: (service: ServiceItem) => void;
}

/* ─── Responsive-size hook ───────────────────────────────────────────── */

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
}

/* ─── Component ──────────────────────────────────────────────────────── */

const ServiceCardGallery = ({
  services,
  onServiceClick,
}: ServiceCardGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartRef = useRef(0);
  const count = services.length;
  const vw = useWindowWidth();

  // Responsive breakpoints
  const isMobile = vw < 640;    // phones
  const isTablet = vw < 1024;   // tablets

  // Responsive card dimensions
  const CARD_WIDTH = isMobile ? Math.min(vw - 48, 260) : isTablet ? 270 : 300;
  const CARD_GAP = isMobile ? 16 : isTablet ? 22 : 28;
  const CARD_MIN_H = isMobile ? "340px" : isTablet ? "380px" : "420px";
  const ICON_SIZE = isMobile ? 56 : 72;
  const ICON_INNER = isMobile ? 26 : 32;
  const ICON_RADIUS = isMobile ? "12px" : "16px";
  const TRACK_MIN_H = isMobile ? "26rem" : isTablet ? "30rem" : "34rem";
  const TRACK_PADDING_Y = isMobile ? "1.5rem" : "2.75rem";
  const CARD_PADDING = isMobile ? "1.5rem 1rem" : "2rem 1.25rem";
  const TITLE_SIZE = isMobile ? "1rem" : "1.1rem";
  const DESC_SIZE = isMobile ? "0.78rem" : "0.82rem";
  const PRICE_SIZE = isMobile ? "1rem" : "1.1rem";
  const NAV_SIZE = isMobile ? "38px" : "44px";

  // Reset when services array changes (laptop ↔ pc toggle)
  useEffect(() => {
    setActiveIndex(0);
  }, [services]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Touch/pointer swipe handling
  const onPointerDown = (e: React.PointerEvent) => {
    touchStartRef.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const delta = touchStartRef.current - e.clientX;
    const threshold = isMobile ? 30 : 40;
    if (Math.abs(delta) > threshold) {
      if (delta > 0) goNext();
      else goPrev();
    }
  };

  // Native touch events for reliable mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 30) {
      if (delta > 0) goNext();
      else goPrev();
    }
  };

  // Keyboard controls: arrows to navigate, Enter/Space to activate
  const onKeyDown = (e: React.KeyboardEvent) => {
    // stop bubbling so the global listener doesn't double-trigger
    e.stopPropagation();
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
      return;
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const active = services[activeIndex];
      if (active) {
        onServiceClick(active);
      }
    }
  };

  // Global key listener so arrows work without focusing the carousel
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      const target = e.target as HTMLElement | null;
      if (target && target.closest('input, textarea, select, button, [role="textbox"]')) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const active = services[activeIndex];
        if (active) onServiceClick(active);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, services, activeIndex, onServiceClick]);

  // Slide the whole flex row so the active card lands in the centre
  const CARD_STEP = CARD_WIDTH + CARD_GAP;
  const trackShift = -activeIndex * CARD_STEP;

  /* ─── MOBILE: simple single-card slider ─── */
  if (isMobile) {
    const activeSvc = services[activeIndex];
    const ActiveIcon = activeSvc.icon;

    return (
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Service carousel"
        style={{ width: "100%", position: "relative", outline: "none", touchAction: "pan-y" }}
      >
        {/* Single active card */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "1.5rem 1rem 2rem",
          }}
        >
          <div
            key={`${activeSvc.title}-${activeIndex}`}
            onClick={() => onServiceClick(activeSvc)}
            style={{
              width: `${CARD_WIDTH}px`,
              maxWidth: "90vw",
              borderRadius: "16px",
              overflow: "hidden",
              cursor: "pointer",
              background: "linear-gradient(145deg, rgba(59,130,246,0.12), rgba(99,102,241,0.08))",
              border: "2px solid rgba(59,130,246,0.4)",
              boxShadow: "0 14px 50px rgba(59,130,246,0.20)",
              animation: "mobileCardIn 0.35s ease-out",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: CARD_PADDING,
                gap: "0.7rem",
                minHeight: CARD_MIN_H,
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: `${ICON_SIZE}px`,
                  height: `${ICON_SIZE}px`,
                  borderRadius: ICON_RADIUS,
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  border: "1px solid rgba(100,116,139,0.2)",
                }}
              >
                <ActiveIcon style={{ width: `${ICON_INNER}px`, height: `${ICON_INNER}px`, color: "black" }} />
              </div>

              <h3 style={{ fontWeight: 700, fontSize: TITLE_SIZE, color: "var(--foreground, #e2e8f0)", lineHeight: 1.3, margin: 0 }}>
                {activeSvc.title}
              </h3>

              <p style={{
                fontSize: DESC_SIZE, lineHeight: 1.55, color: "var(--muted-foreground, #94a3b8)", margin: 0,
                overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const,
              }}>
                {activeSvc.description}
              </p>

              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", paddingTop: "0.5rem", marginTop: "auto",
                borderTop: "1px solid var(--border, rgba(100,100,255,0.12))",
              }}>
                <div>
                  <span style={{ display: "block", fontSize: "0.7rem", color: "var(--muted-foreground, #94a3b8)" }}>From</span>
                  <span style={{ fontWeight: 700, fontSize: PRICE_SIZE, color: "var(--foreground, #e2e8f0)" }}>{activeSvc.price}</span>
                </div>
                <span style={{
                  fontSize: "0.72rem", fontWeight: 600, padding: "0.25rem 0.6rem",
                  borderRadius: "9999px", background: "rgba(59,130,246,0.12)", color: "#60a5fa", whiteSpace: "nowrap",
                }}>
                  {activeSvc.warranty}
                </span>
              </div>

              <Button variant="hero" size="sm" className="w-full mt-1 text-sm py-2"
                onClick={(e) => { e.stopPropagation(); onServiceClick(activeSvc); }}>
                Book Service →
              </Button>
            </div>
          </div>
        </div>

        {/* Dots + arrows */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
          <button onClick={goPrev} aria-label="Previous" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: NAV_SIZE, height: NAV_SIZE, borderRadius: "9999px",
            border: "1.5px solid var(--border, rgba(100,100,255,0.2))",
            background: "var(--card, #1c1c2e)", color: "var(--foreground, #e2e8f0)", cursor: "pointer",
          }}>
            <ChevronLeft style={{ width: "18px", height: "18px" }} />
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            {services.map((_, i) => (
              <span key={i} onClick={() => setActiveIndex(i)} style={{
                display: "inline-block",
                width: i === activeIndex ? "20px" : "7px", height: "7px",
                borderRadius: i === activeIndex ? "4px" : "50%",
                background: i === activeIndex ? "#3b82f6" : "rgba(148,163,184,0.3)",
                transition: "all 0.3s ease", cursor: "pointer",
              }} />
            ))}
          </div>

          <button onClick={goNext} aria-label="Next" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: NAV_SIZE, height: NAV_SIZE, borderRadius: "9999px",
            border: "1.5px solid var(--border, rgba(100,100,255,0.2))",
            background: "var(--card, #1c1c2e)", color: "var(--foreground, #e2e8f0)", cursor: "pointer",
          }}>
            <ChevronRight style={{ width: "18px", height: "18px" }} />
          </button>
        </div>

        {/* Swipe hint text */}
        <p style={{ textAlign: "center", fontSize: "0.7rem", color: "var(--muted-foreground, #94a3b8)", marginTop: "0.75rem", opacity: 0.7 }}>
          Swipe or tap arrows to browse
        </p>

        {/* Animation keyframes */}
        <style>{`
          @keyframes mobileCardIn {
            from { opacity: 0; transform: scale(0.95) translateY(8px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  /* ─── DESKTOP / TABLET: original carousel ─── */
  return (
    <div
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Service carousel"
      style={{
        width: "100%",
        overflowX: "clip",
        overflowY: "visible",
        position: "relative",
        outline: "none",
      }}
    >
      {/* ── Flex track that slides horizontally ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          transform: `translateX(${trackShift}px)`,
          transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
          paddingTop: TRACK_PADDING_Y,
          paddingBottom: "3rem",
          minHeight: TRACK_MIN_H,
          paddingLeft: `calc(50% - ${CARD_WIDTH / 2}px)`,
          paddingRight: `calc(50% - ${CARD_WIDTH / 2}px)`,
          columnGap: `${CARD_GAP}px`,
        }}
      >
        {services.map((svc, i) => {
          const Icon = svc.icon;
          const isActive = i === activeIndex;

          let off = i - activeIndex;
          if (off > count / 2) off -= count;
          if (off < -count / 2) off += count;
          const absOff = Math.abs(off);

          const scale = isActive ? 1 : Math.max(0.75, 1 - absOff * 0.1);
          const opacity = isActive ? 1 : Math.max(0.35, 1 - absOff * 0.16);
          const rotateY = off * -5;

          return (
            <div
              key={`${svc.title}-${i}`}
              onClick={() => {
                if (isActive) {
                  onServiceClick(svc);
                } else {
                  setActiveIndex(i);
                }
              }}
              style={{
                flex: "0 0 auto",
                width: `${CARD_WIDTH}px`,
                borderRadius: "20px",
                overflow: "hidden",
                cursor: "pointer",
                background: isActive
                  ? "linear-gradient(145deg, rgba(59,130,246,0.12), rgba(99,102,241,0.08))"
                  : "var(--card, #1c1c2e)",
                border: isActive
                  ? "2px solid rgba(59,130,246,0.4)"
                  : "1.25px solid rgba(100,116,139,0.22)",
                boxShadow: isActive
                  ? "0 14px 50px rgba(59,130,246,0.20)"
                  : "0 8px 30px rgba(0,0,0,0.12)",
                transform: `scale(${scale}) rotateY(${rotateY}deg)`,
                opacity,
                transition:
                  "transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease, box-shadow 0.3s ease, border 0.3s ease",
                transformStyle: "preserve-3d" as const,
                zIndex: isActive ? 10 : 5 - absOff,
                pointerEvents: "auto" as const,
              }}
            >
              {/* ── Card inner content ── */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column" as const,
                  alignItems: "center",
                  textAlign: "center" as const,
                  padding: CARD_PADDING,
                  gap: "0.9rem",
                  minHeight: CARD_MIN_H,
                  justifyContent: "center",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: `${ICON_SIZE}px`,
                    height: `${ICON_SIZE}px`,
                    borderRadius: ICON_RADIUS,
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    border: "1px solid rgba(100,116,139,0.2)",
                  }}
                >
                  <Icon
                    style={{
                      width: `${ICON_INNER}px`,
                      height: `${ICON_INNER}px`,
                      color: "black",
                    }}
                  />
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: TITLE_SIZE,
                    color: "var(--foreground, #e2e8f0)",
                    lineHeight: 1.3,
                    margin: 0,
                  }}
                >
                  {svc.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: DESC_SIZE,
                    lineHeight: 1.55,
                    color: "var(--muted-foreground, #94a3b8)",
                    margin: 0,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical" as const,
                  }}
                >
                  {svc.description}
                </p>

                {/* Price + Warranty */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingTop: "0.5rem",
                    marginTop: "auto",
                    borderTop:
                      "1px solid var(--border, rgba(100,100,255,0.12))",
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: "block",
                        fontSize: "0.7rem",
                        color: "var(--muted-foreground, #94a3b8)",
                      }}
                    >
                      From
                    </span>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: PRICE_SIZE,
                        color: "var(--foreground, #e2e8f0)",
                      }}
                    >
                      {svc.price}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      padding: "0.25rem 0.6rem",
                      borderRadius: "9999px",
                      background: "rgba(59,130,246,0.12)",
                      color: "#60a5fa",
                      whiteSpace: "nowrap" as const,
                    }}
                  >
                    {svc.warranty}
                  </span>
                </div>

                {/* CTA */}
                <Button
                  variant="hero"
                  size="sm"
                  className="w-full mt-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onServiceClick(svc);
                  }}
                >
                  Book Service →
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Controls: arrows + dots ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "0.5rem",
        }}
      >
        <button
          onClick={goPrev}
          aria-label="Previous"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: NAV_SIZE,
            height: NAV_SIZE,
            borderRadius: "9999px",
            border: "1.5px solid var(--border, rgba(100,100,255,0.2))",
            background: "var(--card, #1c1c2e)",
            color: "var(--foreground, #e2e8f0)",
            cursor: "pointer",
          }}
        >
          <ChevronLeft style={{ width: "20px", height: "20px" }} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {services.map((_, i) => (
            <span
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                display: "inline-block",
                width: i === activeIndex ? "24px" : "8px",
                height: "8px",
                borderRadius: i === activeIndex ? "4px" : "50%",
                background:
                  i === activeIndex ? "#3b82f6" : "rgba(148,163,184,0.3)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          aria-label="Next"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: NAV_SIZE,
            height: NAV_SIZE,
            borderRadius: "9999px",
            border: "1.5px solid var(--border, rgba(100,100,255,0.2))",
            background: "var(--card, #1c1c2e)",
            color: "var(--foreground, #e2e8f0)",
            cursor: "pointer",
          }}
        >
          <ChevronRight style={{ width: "20px", height: "20px" }} />
        </button>
      </div>
    </div>
  );
};

export default ServiceCardGallery;
