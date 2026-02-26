import { useState, useEffect, useRef } from "react";

interface TypeWriterProps {
  /** Array of text segments to type sequentially */
  segments: { text: string; className?: string }[];
  /** Typing speed in ms per character */
  speed?: number;
  /** Delay before starting (ms) */
  startDelay?: number;
  /** Pause between segments (ms) */
  segmentPause?: number;
  /** Show blinking cursor */
  showCursor?: boolean;
  /** Wrapper className */
  className?: string;
}

const TypeWriter = ({
  segments,
  speed = 55,
  startDelay = 300,
  segmentPause = 200,
  showCursor = true,
  className = "",
}: TypeWriterProps) => {
  const [displayed, setDisplayed] = useState<{ text: string; className?: string }[]>([]);
  const [currentSegIdx, setCurrentSegIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Trigger start after delay + intersection
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setStarted(true), startDelay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startDelay]);

  // Typing engine
  useEffect(() => {
    if (!started || done) return;

    if (currentSegIdx >= segments.length) {
      setDone(true);
      return;
    }

    const seg = segments[currentSegIdx];

    if (currentCharIdx < seg.text.length) {
      const timer = setTimeout(() => {
        setDisplayed((prev) => {
          const copy = [...prev];
          if (copy.length <= currentSegIdx) {
            copy.push({ text: seg.text[0], className: seg.className });
          } else {
            copy[currentSegIdx] = {
              text: seg.text.slice(0, currentCharIdx + 1),
              className: seg.className,
            };
          }
          return copy;
        });
        setCurrentCharIdx((c) => c + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      // Move to next segment after pause
      const timer = setTimeout(() => {
        setCurrentSegIdx((s) => s + 1);
        setCurrentCharIdx(0);
      }, segmentPause);
      return () => clearTimeout(timer);
    }
  }, [started, done, currentSegIdx, currentCharIdx, segments, speed, segmentPause]);

  return (
    <span ref={containerRef} className={className}>
      {displayed.map((seg, i) => (
        <span key={i} className={seg.className}>
          {seg.text}
        </span>
      ))}
      {showCursor && !done && (
        <span
          className="inline-block w-[3px] h-[0.85em] bg-blue-500 ml-[2px] align-baseline animate-pulse"
          style={{ animationDuration: "0.8s" }}
        />
      )}
    </span>
  );
};

export default TypeWriter;
