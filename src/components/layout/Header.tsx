import { useState, useEffect, useMemo } from "react";
import { Menu, X, Phone, Laptop, User, LogOut, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  onBookRepair?: () => void;
}

const Header = ({ onBookRepair }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navLinks = useMemo(() => [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Membership", href: "#membership" },
    { label: "Contact", href: "#contact" },
  ], []);

  useEffect(() => {
    // Only track active section when on home page
    if (!isHomePage) {
      setActiveSection(""); // Clear active section on other pages
      return;
    }

    // Track active section on scroll
    const handleScroll = () => {
      const sections = navLinks.map(link => ({
        id: link.href,
        element: document.querySelector(link.href)
      }));

      let currentSection = "#home";
      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150) {
            currentSection = section.id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks, isHomePage]);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      setActiveSection(href);
      // If we're not on the home page, navigate to it with hash first
      if (location.pathname !== '/') {
        // Ensure any scroll lock is cleared when switching routes
        document.body.classList.remove('is-scrolling');
        navigate('/' + href);
        return;
      }

      const element = document.querySelector(href);
      if (element) {
        // Add scrolling class to body for visual feedback
        document.body.classList.add('is-scrolling');

        const targetPosition = element.getBoundingClientRect().top + window.scrollY - 80;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 800; // Faster: 0.8 seconds
        let start: number | null = null;

        // Enhanced easing function for snappier, more dynamic animation
        const easeInOutQuart = (t: number): number => {
          return t < 0.5
            ? 8 * t * t * t * t
            : 1 - Math.pow(-2 * t + 2, 4) / 2;
        };

        const animation = (currentTime: number) => {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const progress = Math.min(timeElapsed / duration, 1);
          const ease = easeInOutQuart(progress);

          window.scrollTo(0, startPosition + distance * ease);

          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          } else {
            // Remove scrolling class and add highlight when done
            document.body.classList.remove('is-scrolling');
            element.classList.add('highlight-scroll', 'active-section', 'section-flash');
            setTimeout(() => {
              element.classList.remove('highlight-scroll', 'section-flash');
            }, 1000);
          }
        };

        requestAnimationFrame(animation);
      }
    } else {
      navigate(href);
    }
  };

  // Clear any scroll lock when the route/hash changes
  useEffect(() => {
    document.body.classList.remove('is-scrolling');
  }, [location.pathname, location.hash]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#10151b] border-b border-gray-200 dark:border-gray-800 shadow-lg animate-slide-down">
      <div className="container mx-auto px-3 lg:px-4">
        <div className="flex items-center justify-between h-14 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-1.5 lg:gap-2 group cursor-pointer flex-shrink-0">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg">
              <Laptop className="w-4 h-4 lg:w-5 lg:h-5 text-white transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="text-lg lg:text-xl font-display font-bold text-gray-900 dark:text-white transition-all duration-300 group-hover:tracking-wide hidden sm:inline">
              CareMyLap<span className="text-blue-500 dark:text-blue-400">.com</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`text-sm font-medium transition-all duration-300 cursor-pointer relative group transform hover:scale-110 ${
                  isHomePage && activeSection === link.href 
                    ? 'text-blue-500 dark:text-blue-400 font-semibold' 
                    : 'text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 rounded-full ${
                  isHomePage && activeSection === link.href 
                    ? 'w-full bg-blue-500 dark:bg-blue-400 shadow-lg shadow-blue-200/50 dark:shadow-blue-900/50' 
                    : 'w-0 bg-blue-500 dark:bg-blue-400 group-hover:w-full group-hover:shadow-md group-hover:shadow-blue-200/30 dark:group-hover:shadow-blue-900/30'
                }`}></span>
                <span className="absolute inset-0 -z-10 bg-cyan-400/5 dark:bg-cyan-900/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2 lg:gap-3">
            <a href="tel:+919876543210" className="hidden md:flex items-center gap-2 text-xs lg:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-cyan-400 dark:hover:text-cyan-300 transition-all duration-300 hover:scale-105 group">
              <Phone className="w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              <span className="hidden lg:inline">+1 (800) TECH-FIX</span>
            </a>
            <Button variant="outline" size="sm" onClick={() => navigate('/profile')} className="hidden lg:flex p-2 lg:p-3 border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-800 hover:text-white dark:hover:bg-slate-700 dark:hover:text-white">
              <User className="w-4 h-4 lg:w-5 lg:h-5" />
            </Button>
            <Button variant="hero" size="sm" onClick={onBookRepair} data-book-button className="text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-600/30 dark:from-blue-700 dark:to-blue-900 dark:hover:from-blue-800 dark:hover:to-blue-950">
              Book Now
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => {
                localStorage.clear();
                window.location.href = '/';
              }}
              className="border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-800 hover:text-white dark:hover:bg-slate-700 dark:hover:text-white"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white h-10 w-10 flex items-center justify-center"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-3 border-t border-gray-800 dark:border-gray-700 animate-fade-in bg-gray-900/95 dark:bg-[#10151b]/95">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                    setIsMenuOpen(false);
                  }}
                  className="px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-800 dark:hover:bg-slate-700 hover:text-cyan-400 dark:hover:text-cyan-300 rounded-lg transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 px-3 flex flex-col gap-2">
                <a href="tel:+18007324849" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 py-2">
                  <Phone className="w-4 h-4 text-cyan-400 dark:text-cyan-300" />
                  +1 (800) TECH-FIX
                </a>
                <Button variant="outline" size="sm" className="w-full justify-start text-sm border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-800 hover:text-white dark:hover:bg-slate-700 dark:hover:text-white" onClick={() => { setIsMenuOpen(false); navigate('/profile'); }}>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button variant="hero" size="sm" className="w-full justify-start text-sm bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-900 text-white" onClick={() => { setIsMenuOpen(false); onBookRepair?.(); }}>
                  <Wrench className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-sm border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-800 hover:text-white dark:hover:bg-slate-700 dark:hover:text-white"
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = '/';
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
