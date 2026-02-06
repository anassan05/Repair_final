import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 10000, suffix: "+", label: "Happy Customers" },
  { value: 15000, suffix: "+", label: "Devices Repaired" },
  { value: 50, suffix: "+", label: "Expert Technicians" },
  { value: 4.8, suffix: "", label: "Average Rating", isDecimal: true },
];

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s`, opacity: isVisible ? 1 : 0 }}
            >
              <div className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-2">
                {isVisible ? (
                  <CountUp 
                    end={stat.value} 
                    suffix={stat.suffix} 
                    isDecimal={stat.isDecimal}
                  />
                ) : (
                  "0"
                )}
              </div>
              <p className="text-sm md:text-base text-primary-foreground/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface CountUpProps {
  end: number;
  suffix: string;
  isDecimal?: boolean;
}

const CountUp = ({ end, suffix, isDecimal }: CountUpProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <>
      {isDecimal ? count.toFixed(1) : Math.floor(count).toLocaleString()}
      {suffix}
    </>
  );
};

export default StatsSection;
