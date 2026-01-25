import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ScrollIndicator = () => {
  const [showIndicator, setShowIndicator] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      
      setScrollProgress(progress);
      setShowIndicator(scrolled < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Down Indicator */}
      {showIndicator && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-primary animate-pulse-soft">
            <span className="text-sm font-medium">Scroll Down</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </div>
        </div>
      )}

      {/* Scroll Progress Circle */}
      <div className="fixed bottom-8 right-8 z-40 group cursor-pointer" 
           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg className="w-12 h-12 transform -rotate-90 transition-opacity duration-300"
             style={{ opacity: scrollProgress > 5 ? 1 : 0 }}>
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 20}`}
            strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`}
            className="text-primary transition-all duration-300"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default ScrollIndicator;
