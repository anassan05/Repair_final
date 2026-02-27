import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BookingModal from "@/components/BookingModal";
import ServiceCardGallery, { type ServiceItem } from "@/components/ServiceCardGallery";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useToast } from "@/hooks/use-toast";
import gsap from "gsap";
import {
  ArrowRight,
  Shield,
  Clock,
  CheckCircle2,
  Award,
  Monitor,
  Battery,
  Keyboard,
  AlertTriangle,
  Check,
  Star,
  Crown,
  Zap,
  HardDrive,
  Cpu,
  Wifi,
  Laptop,
  PcCase,
  Smartphone,
  ClipboardList,
  Wrench,
  Quote,
  Phone,
  MessageCircle,
  CreditCard,
  Building2,
  X
} from "lucide-react";
// React Icons imports for brand logos
import {
  SiDell, SiHp, SiLenovo, SiAsus, SiAcer, SiApple,
  SiMsi, SiSamsung
} from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface IndexProps {
  currentUser: { name: string; phone: string } | null;
}

const Index = ({ currentUser }: IndexProps) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<{ title: string; type: "laptop" | "pc" } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const homeRef = useScrollReveal('zoom-in');
  const statsRef = useScrollReveal('fade-up', 100);
  const servicesRef = useScrollReveal('fade-left', 150);
  const brandsRef = useScrollReveal('fade-right', 200);
  const howItWorksRef = useScrollReveal('fade-up', 250);
  const membershipRef = useScrollReveal('flip', 300);
  const testimonialsRef = useScrollReveal('bounce', 350);
  const contactRef = useScrollReveal('zoom-in', 400);

  const openBooking = () => {
    setPreselectedService(null);
    setIsBookingOpen(true);
  };

  const handleServiceBooking = (service: { title: string; type: "laptop" | "pc" }) => {
    setPreselectedService(service);
    setIsBookingOpen(true);
  };

  useEffect(() => {
    if (location.hash) {
      const doScroll = () => {
        const element = document.querySelector(location.hash);
        if (!element) return;
        document.body.classList.add('is-scrolling');
        const target = (element as HTMLElement).getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: target, behavior: 'smooth' });
        element.classList.add('highlight-scroll', 'active-section', 'section-flash');
        setTimeout(() => {
          document.body.classList.remove('is-scrolling');
          element.classList.remove('highlight-scroll', 'section-flash');
        }, 1000);
      };
      setTimeout(doScroll, 50);
    }
  }, [location.hash]);

  return (
    <>
      <div className="min-h-screen relative z-[1] overflow-hidden">
        <Header onBookRepair={openBooking} />
        <main className="page-enter">
          <div id="home-dots-exclude">
            <section id="home" ref={homeRef} className="opacity-0 transition-all duration-1000 transform">
              <HeroSection onBookRepair={openBooking} />
            </section>
            <div ref={statsRef} className="opacity-0 transition-all duration-1000 transform">
              <StatsSection />
            </div>
          </div>
          <section id="services" ref={servicesRef} className="opacity-0 transition-all duration-1000 transform">
            <ServicesSection onBookService={handleServiceBooking} />
          </section>
          <div ref={brandsRef} className="opacity-0 transition-all duration-1000 transform">
            <BrandsSection />
          </div>
          <div ref={howItWorksRef} className="opacity-0 transition-all duration-1000 transform">
            <HowItWorksSection />
          </div>
          <section id="membership" ref={membershipRef} className="opacity-0 transition-all duration-1000 transform">
            <MembershipSection />
          </section>
          <div ref={testimonialsRef} className="opacity-0 transition-all duration-1000 transform">
            <TestimonialsSection />
          </div>
          <section id="contact" ref={contactRef} className="opacity-0 transition-all duration-1000 transform">
            <CTASection onBookRepair={openBooking} />
          </section>
        </main>
        <Footer />
      </div>
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setPreselectedService(null);
        }}
        currentUser={currentUser}
        preselectedService={preselectedService}
      />
    </>
  );
};

// Hero Section Component
const HeroSection = ({ onBookRepair }: { onBookRepair?: () => void }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const animRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);
  const headingWords = ["Expert", "Laptop", "Repair", "\n", "at", "Your", "Doorstep"];

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;
    const wordSpans = heading.querySelectorAll<HTMLElement>('.hero-word');
    if (!wordSpans.length) return;
    animRef.current?.revert?.();
    animRef.current = gsap.from(wordSpans, {
      y: -100,
      opacity: 0,
      rotation: () => gsap.utils.random(-80, 80),
      duration: 0.7,
      ease: "back",
      stagger: 0.15,
    });

    return () => {
      animRef.current?.revert?.();
    };
  }, []);

  return (
    <section id="home" className="relative min-h-[68vh] lg:min-h-[78vh] flex items-center pt-16 sm:pt-20 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-4xl">

          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
            <h1
              ref={headingRef}
              className="text-3xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight"
            >
              {headingWords.map((word, idx) =>
                word === "\n" ? (
                  <br key={`br-${idx}`} />
                ) : (
                  <span
                    key={idx}
                    className={`hero-word inline-block me-2 ${word === "Doorstep" ? "text-blue-500 dark:text-blue-400" : ""}`}
                  >
                    {word}
                  </span>
                )
              )}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-xl max-w-2xl leading-relaxed animate-fade-up">
              Get your laptop fixed right in front of you. Transparent pricing, genuine parts, and 60-days warranty on all repair
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-10">
            <Button
              onClick={onBookRepair}
              className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold rounded-lg shadow-md transition-all duration-300 hover:scale-110 w-full sm:w-auto animate-pulse-soft"
            >
              Book a Repair
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto mt-6 sm:mt-8">
          <div className="text-center space-y-2 sm:space-y-3 animate-fade-up stagger-1">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/50 flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 dark:text-blue-400" />
            </div>
            <p className="text-gray-700 dark:text-gray-200 font-semibold text-xs sm:text-base">Guaranteed Warranty</p>
          </div>
          <div className="text-center space-y-2 sm:space-y-3 animate-fade-up stagger-2">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/50 flex items-center justify-center mx-auto">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 dark:text-blue-400" />
            </div>
            <p className="text-gray-700 dark:text-gray-200 font-semibold text-xs sm:text-base">Verified Technicians</p>
          </div>
          <div className="text-center space-y-2 sm:space-y-3 animate-fade-up stagger-3">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/50 flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 dark:text-blue-400" />
            </div>
            <p className="text-gray-700 dark:text-gray-200 font-semibold text-xs sm:text-base">Same Day Service</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Stats Section Component
const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: 10000, suffix: "+", label: "Happy Customers" },
    { value: 15000, suffix: "+", label: "Devices Repaired" },
    { value: 50, suffix: "+", label: "Expert Technicians" },
    { value: 4.8, suffix: "", label: "Average Rating", isDecimal: true },
  ];

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
    <section ref={sectionRef} className="py-10 sm:py-16 relative bg-blue-100 dark:bg-blue-950/40 rounded-2xl mx-2 sm:mx-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s`, opacity: isVisible ? 1 : 0 }}
            >
              <div className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">
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
              <p className="text-sm md:text-base text-blue-800/70 dark:text-blue-300/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CountUp = ({ end, suffix, isDecimal }: { end: number; suffix: string; isDecimal?: boolean }) => {
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

// Services Section Component
const ServicesSection = ({ onBookService }: { onBookService?: (service: { title: string; type: "laptop" | "pc" }) => void }) => {
  const [selectedType, setSelectedType] = useState<"laptop" | "pc">("laptop");
  const navigate = useNavigate();

  const laptopServices: ServiceItem[] = [
    { icon: Monitor, title: "Screen Replacement", description: "Cracked or damaged screen? We replace with genuine LCD/LED panels.", price: "₹2,499", warranty: "90 Days" },
    { icon: Battery, title: "Battery Replacement", description: "Restore your laptop's battery life with original capacity batteries.", price: "₹1,999", warranty: "180 Days" },
    { icon: Keyboard, title: "Keyboard Repair", description: "Fix broken keys or full keyboard replacement with exact matches.", price: "₹999", warranty: "90 Days" },
    { icon: HardDrive, title: "SSD/HDD Upgrade", description: "Boost speed with SSD upgrade or recover data from failed drives.", price: "₹1,499", warranty: "1 Year" },
    { icon: Cpu, title: "Motherboard Repair", description: "Expert chip-level repair for all motherboard issues.", price: "₹2,999", warranty: "90 Days" },
    { icon: Wifi, title: "WiFi/Network Fix", description: "Resolve connectivity issues and WiFi card replacements.", price: "₹799", warranty: "60 Days" },
  ];

  const pcServices: ServiceItem[] = [
    { icon: Monitor, title: "Display/Monitor Fix", description: "Fix display issues, graphics card problems, and monitor connections.", price: "₹1,999", warranty: "90 Days" },
    { icon: Cpu, title: "CPU Upgrade/Repair", description: "Upgrade processors or fix overheating and performance issues.", price: "₹2,499", warranty: "180 Days" },
    { icon: HardDrive, title: "Storage Solutions", description: "SSD/HDD installation, upgrades, and data recovery services.", price: "₹1,499", warranty: "1 Year" },
    { icon: Cpu, title: "Motherboard Service", description: "Professional motherboard repair and component replacements.", price: "₹3,499", warranty: "90 Days" },
    { icon: Wifi, title: "Network Card Fix", description: "Repair or replace network cards, fix connectivity issues.", price: "₹999", warranty: "60 Days" },
    { icon: Monitor, title: "Graphics Card", description: "GPU repair, upgrade, and performance optimization services.", price: "₹2,999", warranty: "120 Days" },
  ];

  const services = selectedType === "laptop" ? laptopServices : pcServices;

  return (
    <section id="services" className="py-12 sm:py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Our Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Expert Repair for Every Issue
          </h2>
          <p className="text-lg text-muted-foreground">
            From simple fixes to complex repairs, our certified technicians handle it all
            with precision and care.
          </p>
        </div>
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-muted rounded-xl">
            <button
              onClick={() => setSelectedType("laptop")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all ${selectedType === "laptop"
                  ? "gradient-hero text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-white border border-border">
                <Laptop className="w-4 h-4 text-black" />
              </span>
              Laptop
              <span className="hidden sm:inline">Services</span>
            </button>
            <button
              onClick={() => setSelectedType("pc")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all ${selectedType === "pc"
                  ? "gradient-hero text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-white border border-border">
                <PcCase className="w-4 h-4 text-black" />
              </span>
              Desktop
              <span className="hidden sm:inline">PC Services</span>
            </button>
          </div>
        </div>
        <ServiceCardGallery
          services={services}
          onServiceClick={(svc: ServiceItem) => {
            if (onBookService) {
              onBookService({ title: svc.title, type: selectedType });
              return;
            }
            navigate('/services', {
              state: {
                selectedService: {
                  title: svc.title,
                  price: svc.price,
                  warranty: svc.warranty,
                },
                deviceType: selectedType,
              },
            });
          }}
        />
      </div>
    </section>
  );
};

// Brands Section Component
const BrandsSection = () => {
  const brandData = [
    { name: "Dell", icon: SiDell, color: "text-blue-600" },
    { name: "HP", icon: SiHp, color: "text-blue-700" },
    { name: "Lenovo", icon: SiLenovo, color: "text-red-600" },
    { name: "ASUS", icon: SiAsus, color: "text-slate-700" },
    { name: "Acer", icon: SiAcer, color: "text-green-600" },
    { name: "Apple", icon: SiApple, color: "text-gray-700" },
    { name: "MSI", icon: SiMsi, color: "text-red-500" },
    { name: "Samsung", icon: SiSamsung, color: "text-blue-800" },
  ];

  return (
    <section className="py-10 sm:py-16 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <p className="text-center text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
          We repair all major laptop brands
        </p>
        <div className="grid grid-cols-4 sm:flex sm:flex-wrap justify-center items-center gap-3 sm:gap-6 md:gap-8 lg:gap-12">
          {brandData.map((brand) => (
            <div
              key={brand.name}
              className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-4 rounded-xl hover:bg-muted/50 transition-all duration-300 cursor-default group"
            >
              <brand.icon
                className={`text-4xl md:text-5xl ${brand.color} group-hover:scale-110 transition-transform duration-300`}
              />
              <span className="text-xs sm:text-sm md:text-base font-medium text-muted-foreground group-hover:text-primary transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Section Component
const HowItWorksSection = () => {
  const steps = [
    { icon: Smartphone, step: "01", title: "Book Online", description: "Select your laptop brand and describe the issue. Get instant price estimate." },
    { icon: ClipboardList, step: "02", title: "Get Confirmed", description: "Our team confirms the booking and assigns a certified technician to you." },
    { icon: Wrench, step: "03", title: "Doorstep Repair", description: "Technician arrives at your location and repairs the device in front of you." },
    { icon: CheckCircle2, step: "04", title: "Pay & Warranty", description: "Pay only after satisfaction. Get warranty card for peace of mind." },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-sm font-semibold tracking-widest text-blue-500 uppercase mb-3">How It Works</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Repair in 4 Easy Steps
          </h2>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Getting your laptop repaired has never been easier. Follow these simple steps and we'll handle the rest.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative group flex">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gray-200 dark:bg-gray-700" />
              )}
              <div className="bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 w-full flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm sm:text-base font-bold mb-4">
                  {step.step}
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                  <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Membership Section Component
const MembershipSection = () => {
  const plans = [
    { id: "basic", name: "Basic", price: "₹999", period: "/year", description: "Perfect for occasional repairs", icon: Zap, features: ["1 Free Diagnostic", "10% Off on All Repairs", "Priority Booking", "60 Days Extended Warranty", "Email Support"], popular: false },
    { id: "pro", name: "Pro", price: "₹2,499", period: "/year", description: "Best value for regular users", icon: Star, features: ["3 Free Diagnostics", "20% Off on All Repairs", "Same Day Service", "180 Days Extended Warranty", "1 Free Cleaning Service", "24/7 Phone Support"], popular: true },
    { id: "enterprise", name: "Enterprise", price: "₹4,999", period: "/year", description: "For businesses & power users", icon: Crown, features: ["Unlimited Diagnostics", "30% Off on All Repairs", "Dedicated Technician", "1 Year Extended Warranty", "4 Free Cleaning Services", "On-site AMC Support", "Fleet Management Dashboard"], popular: false },
  ];

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "netbanking">("upi");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const selectedPlanDetails = plans.find(p => p.id === selectedPlan);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowPayment(true);
    setPaymentSuccess(false);
    setPaymentProcessing(false);
  };

  const handlePayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  return (
    <>
      <section id="membership" className="py-12 sm:py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/20 mb-4 sm:mb-6">
              <Crown className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium text-warning">Membership Plans</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Save More with Membership
            </h2>
            <p className="text-lg text-muted-foreground">
              Join our membership program for exclusive discounts, priority service,
              and extended warranty benefits.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-card rounded-2xl p-5 sm:p-6 lg:p-8 border ${plan.popular
                    ? "border-primary shadow-glow sm:scale-105"
                    : "border-border shadow-card"
                  } transition-all duration-300 hover:shadow-lg`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full gradient-hero text-primary-foreground text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className={`w-14 h-14 rounded-xl ${plan.popular ? "gradient-hero" : "bg-primary/10"} flex items-center justify-center mb-5`}>
                  <plan.icon className={`w-7 h-7 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-1">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-display font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? "hero" : "outline"}
                  className="w-full"
                  size="lg"
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {showPayment && selectedPlanDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setShowPayment(false); setSelectedPlan(null); }} />
          <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300 border border-border">
            <button
              onClick={() => { setShowPayment(false); setSelectedPlan(null); }}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-destructive hover:text-white transition-all z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {paymentSuccess ? (
              <div className="p-8 text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h2>
                  <p className="text-muted-foreground">
                    You're now a <span className="font-semibold text-primary">{selectedPlanDetails.name}</span> member.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-xl space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan</span>
                    <span className="font-semibold">{selectedPlanDetails.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount Paid</span>
                    <span className="font-semibold">{selectedPlanDetails.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Valid Until</span>
                    <span className="font-semibold">
                      {new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={() => { setShowPayment(false); setSelectedPlan(null); }}>
                  Close
                </Button>
              </div>
            ) : (
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Complete Payment</h2>
                  <p className="text-sm text-muted-foreground mt-1">Subscribe to {selectedPlanDetails.name} plan</p>
                </div>

                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${selectedPlanDetails.popular ? "gradient-hero" : "bg-primary/10"} flex items-center justify-center`}>
                      <selectedPlanDetails.icon className={`w-5 h-5 ${selectedPlanDetails.popular ? "text-primary-foreground" : "text-primary"}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{selectedPlanDetails.name} Plan</p>
                      <p className="text-xs text-muted-foreground">{selectedPlanDetails.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-foreground">{selectedPlanDetails.price}</p>
                    <p className="text-xs text-muted-foreground">{selectedPlanDetails.period}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Payment Method</p>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setPaymentMethod("upi")}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${paymentMethod === "upi" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        }`}
                    >
                      <Smartphone className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <span className="text-xs font-medium">UPI</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        }`}
                    >
                      <CreditCard className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <span className="text-xs font-medium">Card</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("netbanking")}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${paymentMethod === "netbanking" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        }`}
                    >
                      <Building2 className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <span className="text-xs font-medium">Net Banking</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {paymentMethod === "upi" && (
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">UPI ID</label>
                      <Input placeholder="yourname@upi" />
                    </div>
                  )}
                  {paymentMethod === "card" && (
                    <>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Card Number</label>
                        <Input placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1.5 block">Expiry</label>
                          <Input placeholder="MM/YY" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1.5 block">CVV</label>
                          <Input placeholder="123" type="password" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Name on Card</label>
                        <Input placeholder="Full name" />
                      </div>
                    </>
                  )}
                  {paymentMethod === "netbanking" && (
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Select Bank</label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="">Choose your bank</option>
                        <option>State Bank of India</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                        <option>Punjab National Bank</option>
                      </select>
                    </div>
                  )}
                </div>

                <Button
                  variant="hero"
                  className="w-full"
                  size="lg"
                  onClick={handlePayment}
                  disabled={paymentProcessing}
                >
                  {paymentProcessing ? "Processing..." : `Pay ${selectedPlanDetails.price}`}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  🔒 Secured by 256-bit SSL encryption. Your payment info is safe.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// Testimonials Section Component
const TestimonialsSection = () => {
  const testimonials = [
    { name: "Rahul Sharma", role: "Software Developer", avatar: "RS", rating: 5, content: "Amazing service! The technician arrived on time and fixed my laptop screen in just 30 minutes. Highly professional and transparent pricing." },
    { name: "Priya Patel", role: "Student", avatar: "PP", rating: 5, content: "My laptop battery was dying. They replaced it at my doorstep with a genuine part. The 180-day warranty gives me peace of mind." },
    { name: "Amit Kumar", role: "Business Owner", avatar: "AK", rating: 5, content: "We use their enterprise membership for our office. The dedicated technician and priority support has saved us so much time." },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-sm font-semibold tracking-widest text-blue-500 uppercase mb-3">Customer Reviews</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Don't just take our word for it. Here's what our customers have to say about their experience.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-gray-100 dark:border-gray-800">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section Component
const CTASection = ({ onBookRepair }: { onBookRepair?: () => void }) => {
  const { toast } = useToast();
  const [showContactModal, setShowContactModal] = useState(false);
  const phoneNumber = "+91 12345 67890";

  const handleCall = () => {
    window.open(`tel:${phoneNumber.replace(/[^\d]/g, "")}`);
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${phoneNumber.replace(/[^\d]/g, "")}`);
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(phoneNumber);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = phoneNumber;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      toast({
        title: "Number copied",
        description: `${phoneNumber} copied to clipboard.`,
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Please copy the number manually.",
      });
    }
  };

  return (
    <>
      <section id="contact" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-blue-100 dark:bg-blue-950/40">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-full px-4 py-1.5 mb-5">
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Get in Touch</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 tracking-tight">
              Ready to Get Your Laptop Fixed?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-10 leading-relaxed">
              Book a repair now and get your laptop working like new. Our experts are just a call away.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl border-gray-300 text-foreground hover:bg-gray-50 px-8"
                onClick={() => setShowContactModal(true)}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Us Now
              </Button>
              <Button
                size="lg"
                className="rounded-xl bg-primary hover:bg-primary/90 text-white px-8 shadow-lg shadow-primary/20"
                onClick={onBookRepair}
              >
                Book Repair Online
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-muted-foreground text-sm">
              <button
                type="button"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
                onClick={() => setShowContactModal(true)}
              >
                <Phone className="w-4 h-4" />
                {phoneNumber}
              </button>
              <span className="hidden sm:inline text-gray-300">&bull;</span>
              <button
                type="button"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
                onClick={() => setShowContactModal(true)}
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Support
              </button>
            </div>
          </div>
        </div>
      </section>

      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-xl p-6 w-[90vw] max-w-xs flex flex-col items-center gap-4">
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              aria-label="Close contact popup"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-500" />
              <span className="font-semibold text-lg">Contact TECH-FIX</span>
            </div>
            <div className="text-center text-sm text-muted-foreground">{phoneNumber}</div>
            <div className="flex gap-2 w-full">
              <Button variant="hero" size="sm" className="flex-1" onClick={handleCall}>Call</Button>
              <Button variant="outline" size="sm" className="flex-1" onClick={handleWhatsApp}>WhatsApp</Button>
              <Button variant="ghost" size="sm" className="flex-1" onClick={handleCopy}>Copy</Button>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => setShowContactModal(false)}>Close</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
