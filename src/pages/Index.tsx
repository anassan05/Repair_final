import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BookingModal from "@/components/BookingModal";
import ScrollIndicator from "@/components/ScrollIndicator";
import { useScrollReveal } from "@/hooks/useScrollReveal";
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
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface IndexProps {
  currentUser: { name: string; phone: string } | null;
}

const Index = ({ currentUser }: IndexProps) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const location = useLocation();
  const homeRef = useScrollReveal('zoom-in');
  const statsRef = useScrollReveal('fade-up', 100);
  const servicesRef = useScrollReveal('fade-left', 150);
  const brandsRef = useScrollReveal('fade-right', 200);
  const howItWorksRef = useScrollReveal('fade-up', 250);
  const membershipRef = useScrollReveal('flip', 300);
  const testimonialsRef = useScrollReveal('bounce', 350);
  const contactRef = useScrollReveal('zoom-in', 400);

  const openBooking = () => setIsBookingOpen(true);

  // When navigated with a hash (e.g., '/#services'), auto-scroll to that section
  useEffect(() => {
    if (location.hash) {
      const doScroll = () => {
        const element = document.querySelector(location.hash);
        if (!element) return;
        // Visual feedback
        document.body.classList.add('is-scrolling');
        const target = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: target, behavior: 'smooth' });
        element.classList.add('highlight-scroll', 'active-section', 'section-flash');
        setTimeout(() => {
          document.body.classList.remove('is-scrolling');
          element.classList.remove('highlight-scroll', 'section-flash');
        }, 1000);
      };
      // Delay slightly to ensure sections are mounted
      setTimeout(doScroll, 50);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-white dark:bg-background overflow-hidden">
      <Header onBookRepair={openBooking} />
      <ScrollIndicator />
      <main className="page-enter">
        <section id="home" ref={homeRef} className="opacity-0 transition-all duration-1000 transform">
          <HeroSection onBookRepair={openBooking} />
        </section>
        <div ref={statsRef} className="opacity-0 transition-all duration-1000 transform">
          <StatsSection />
        </div>
        <section id="services" ref={servicesRef} className="opacity-0 transition-all duration-1000 transform">
          <ServicesSection />
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
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        currentUser={currentUser}
      />
    </div>
  );
};

// Hero Section Component
const HeroSection = ({ onBookRepair }: { onBookRepair?: () => void }) => {
  const navigate = useNavigate();

  const commonIssues = [
    { icon: Monitor, title: "Screen Damage" },
    { icon: Battery, title: "Battery Replacement" },
    { icon: Keyboard, title: "Keyboard Fix" },
    { icon: AlertTriangle, title: "System Lag" }
  ];

  return (
    <section id="home" className="relative min-h-screen bg-[#f4faff] dark:bg-[#10151b] flex items-center pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 mb-8">
            <CheckCircle2 className="w-4 h-4 text-blue-500 dark:text-blue-300" />
            <span className="text-blue-600 dark:text-blue-200 text-sm font-medium">Certified Apple & PC Specialists</span>
          </div>
          <div className="space-y-6 mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              Expert Laptop Repair<br />
              at Your <span className="text-blue-500 dark:text-blue-400">Doorstep</span>
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-xl max-w-2xl leading-relaxed">
              Get your laptop fixed right in front of you. Transparent pricing, genuine parts, and 60-days warranty on all repair
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button
              onClick={onBookRepair}
              className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 hover:scale-105"
            >
              Book a Repair
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/membership')}
              className="border-2 border-blue-500 dark:border-blue-400 text-blue-500 dark:text-blue-300 hover:bg-blue-500 dark:hover:bg-blue-400 hover:text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            >
              View Membership
            </Button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-8">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-blue-500 dark:text-blue-400" />
            </div>
            <p className="text-gray-700 dark:text-gray-200 font-semibold">Guaranteed Warranty</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto">
              <Award className="w-8 h-8 text-blue-500 dark:text-blue-400" />
            </div>
            <p className="text-gray-700 dark:text-gray-200 font-semibold">Verified Technicians</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto">
              <Clock className="w-8 h-8 text-blue-500 dark:text-blue-400" />
            </div>
            <p className="text-gray-700 dark:text-gray-200 font-semibold">Same Day Service</p>
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
const ServicesSection = () => {
  const [selectedType, setSelectedType] = useState<"laptop" | "pc">("laptop");
  const navigate = useNavigate();
  
  const laptopServices = [
    { icon: Monitor, title: "Screen Replacement", description: "Cracked or damaged screen? We replace with genuine LCD/LED panels.", price: "₹2,499", warranty: "90 Days" },
    { icon: Battery, title: "Battery Replacement", description: "Restore your laptop's battery life with original capacity batteries.", price: "₹1,999", warranty: "180 Days" },
    { icon: Keyboard, title: "Keyboard Repair", description: "Fix broken keys or full keyboard replacement with exact matches.", price: "₹999", warranty: "90 Days" },
    { icon: HardDrive, title: "SSD/HDD Upgrade", description: "Boost speed with SSD upgrade or recover data from failed drives.", price: "₹1,499", warranty: "1 Year" },
    { icon: Cpu, title: "Motherboard Repair", description: "Expert chip-level repair for all motherboard issues.", price: "₹2,999", warranty: "90 Days" },
    { icon: Wifi, title: "WiFi/Network Fix", description: "Resolve connectivity issues and WiFi card replacements.", price: "₹799", warranty: "60 Days" },
  ];

  const pcServices = [
    { icon: Monitor, title: "Display/Monitor Fix", description: "Fix display issues, graphics card problems, and monitor connections.", price: "₹1,999", warranty: "90 Days" },
    { icon: Cpu, title: "CPU Upgrade/Repair", description: "Upgrade processors or fix overheating and performance issues.", price: "₹2,499", warranty: "180 Days" },
    { icon: HardDrive, title: "Storage Solutions", description: "SSD/HDD installation, upgrades, and data recovery services.", price: "₹1,499", warranty: "1 Year" },
    { icon: Cpu, title: "Motherboard Service", description: "Professional motherboard repair and component replacements.", price: "₹3,499", warranty: "90 Days" },
    { icon: Wifi, title: "Network Card Fix", description: "Repair or replace network cards, fix connectivity issues.", price: "₹999", warranty: "60 Days" },
    { icon: Monitor, title: "Graphics Card", description: "GPU repair, upgrade, and performance optimization services.", price: "₹2,999", warranty: "120 Days" },
  ];

  const services = selectedType === "laptop" ? laptopServices : pcServices;

  return (
    <section id="services" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
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
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 p-1.5 bg-muted rounded-xl">
            <button
              onClick={() => setSelectedType("laptop")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                selectedType === "laptop"
                  ? "gradient-hero text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Laptop className="w-4 h-4" />
              Laptop Services
            </button>
            <button
              onClick={() => setSelectedType("pc")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                selectedType === "pc"
                  ? "gradient-hero text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <PcCase className="w-4 h-4" />
              Desktop PC Services
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {service.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="text-xl font-display font-bold text-foreground">{service.price}</p>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium">
                  {service.warranty} Warranty
                </div>
              </div>
              <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="hero" size="lg" onClick={() => navigate('/services')}>
            View All Services
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

// Brands Section Component
const BrandsSection = () => {
  const brands = [
    "Dell", "HP", "Lenovo", "ASUS", "Acer", "Apple", "MSI", "Samsung",
  ];

  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <p className="text-center text-muted-foreground mb-8">
          We repair all major laptop brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {brands.map((brand) => (
            <div
              key={brand}
              className="text-2xl md:text-3xl font-display font-bold text-muted-foreground/50 hover:text-primary transition-colors cursor-default"
            >
              {brand}
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
    <section id="how-it-works" className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Wrench className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">How It Works</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Repair in 4 Easy Steps
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting your laptop repaired has never been easier. Follow these simple steps 
            and we'll handle the rest.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative group">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
                </div>
              )}
              <div className="relative bg-card rounded-2xl p-6 border border-border shadow-card group-hover:shadow-lg transition-all duration-300">
                <div className="absolute -top-4 left-6 px-3 py-1 rounded-full gradient-hero text-primary-foreground text-sm font-bold">
                  Step {step.step}
                </div>
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mt-4 mb-5 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
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
    { name: "Basic", price: "₹999", period: "/year", description: "Perfect for occasional repairs", icon: Zap, features: ["1 Free Diagnostic", "10% Off on All Repairs", "Priority Booking", "60 Days Extended Warranty", "Email Support"], popular: false },
    { name: "Pro", price: "₹2,499", period: "/year", description: "Best value for regular users", icon: Star, features: ["3 Free Diagnostics", "20% Off on All Repairs", "Same Day Service", "180 Days Extended Warranty", "1 Free Cleaning Service", "24/7 Phone Support"], popular: true },
    { name: "Enterprise", price: "₹4,999", period: "/year", description: "For businesses & power users", icon: Crown, features: ["Unlimited Diagnostics", "30% Off on All Repairs", "Dedicated Technician", "1 Year Extended Warranty", "4 Free Cleaning Services", "On-site AMC Support", "Fleet Management Dashboard"], popular: false },
  ];

  return (
    <section id="membership" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/20 mb-6">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-card rounded-2xl p-6 lg:p-8 border ${
                plan.popular 
                  ? "border-primary shadow-glow scale-105" 
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
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setTimeout(() => {
                    const bookButton = document.querySelector('[data-book-button]') as HTMLElement;
                    bookButton?.click();
                  }, 500);
                }}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
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
    <section className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-primary">Customer Reviews</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our customers have to say 
            about their experience.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-card hover:shadow-lg transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning fill-warning" />
                ))}
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
  return (
    <section id="contact" className="py-20 lg:py-28 gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
            Ready to Get Your Laptop Fixed?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10">
            Book a repair now and get your laptop working like new. 
            Our experts are just a call away.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="heroOutline" size="xl" asChild>
              <a href="tel:+919876543210">
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
            </Button>
            <Button 
              size="xl" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg"
              onClick={onBookRepair}
            >
              Book Repair Online
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
          <div className="mt-10 flex items-center justify-center gap-6 text-primary-foreground/70">
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Phone className="w-4 h-4" />
              +91 98765 43210
            </a>
            <span>•</span>
            <a href="#" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <MessageCircle className="w-4 h-4" />
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;