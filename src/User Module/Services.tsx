import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Monitor, 
  Battery, 
  Keyboard, 
  AlertTriangle,
  Shield,
  Clock,
  CheckCircle2,
  Award,
  HardDrive,
  Cpu,
  Wifi,
  Zap,
  Laptop,
  PcCase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BookingModal from "@/components/BookingModal";
import ServiceCardGallery from "@/components/ServiceCardGallery";
import type { ServiceItem } from "@/components/ServiceCardGallery";

interface ServicesProps {
  currentUser?: { name: string; phone: string } | null;
}

const Services = ({ currentUser }: ServicesProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDeviceType, setSelectedDeviceType] = useState<"laptop" | "pc">("laptop");
  const [selectedService, setSelectedService] = useState<{title: string; price: string; warranty: string} | null>(null);

  // Auto-open booking modal if navigated from home page with a selected service
  useEffect(() => {
    const state = location.state as { selectedService?: { title: string; price: string; warranty: string }; deviceType?: "laptop" | "pc" } | null;
    if (state?.selectedService) {
      setSelectedService(state.selectedService);
      setSelectedDeviceType(state.deviceType || "laptop");
      setSelectedType(state.deviceType || "laptop");
      setIsBookingOpen(true);
      // Clear route state so refresh/back doesn't retrigger modal
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, location.pathname, navigate]);

  const handleBookRepair = () => {
    setSelectedService(null);
    setIsBookingOpen(true);
  };

  const handleServiceClick = (service: {title: string; price: string; warranty: string}, type: "laptop" | "pc") => {
    setSelectedService(service);
    setSelectedDeviceType(type);
    setIsBookingOpen(true);
  };
  
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
  
  const [selectedType, setSelectedType] = useState<"laptop" | "pc">("laptop");
  const services = selectedType === "laptop" ? laptopServices : pcServices;

  return (
    <>
    <div className="min-h-screen relative z-[1] text-foreground page-enter">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[68vh] lg:min-h-[78vh] bg-[#f4faff] dark:bg-[#10151b] flex items-center pt-16 sm:pt-20 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 mb-6 sm:mb-8">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 dark:text-blue-300" />
              <span className="text-blue-600 dark:text-blue-200 text-xs sm:text-sm font-medium">Certified Apple & PC Specialists</span>
            </div>
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                Expert Laptop Repair<br />
                at Your <span className="text-blue-500 dark:text-blue-400">Doorstep</span>
              </h1>
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-xl max-w-2xl leading-relaxed">
                Get your laptop fixed right in front of you. Transparent pricing, genuine parts, and 60-days warranty on all repair
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-16">
              <Button
                onClick={handleBookRepair}
                className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold rounded-lg shadow-md transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                Book a Repair
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto mt-6 sm:mt-8 bg-blue-100 dark:bg-blue-950/40 rounded-2xl p-4 sm:p-8">
            <div className="text-center space-y-2 sm:space-y-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-blue-800/70 dark:text-blue-300/70 font-semibold text-xs sm:text-base">Guaranteed Warranty</p>
            </div>
            <div className="text-center space-y-2 sm:space-y-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-blue-800/70 dark:text-blue-300/70 font-semibold text-xs sm:text-base">Verified Technicians</p>
            </div>
            <div className="text-center space-y-2 sm:space-y-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-blue-800/70 dark:text-blue-300/70 font-semibold text-xs sm:text-base">Same Day Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
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
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all ${
                  selectedType === "laptop"
                    ? "gradient-hero text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary/90">
                  <Laptop className="w-4 h-4 text-white" />
                </span>
                Laptop
                <span className="hidden sm:inline">Services</span>
              </button>
              <button
                onClick={() => setSelectedType("pc")}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all ${
                  selectedType === "pc"
                    ? "gradient-hero text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary/90">
                  <PcCase className="w-4 h-4 text-white" />
                </span>
                Desktop
                <span className="hidden sm:inline">PC Services</span>
              </button>
            </div>
          </div>
          <ServiceCardGallery
            services={services}
            onServiceClick={(svc: ServiceItem) => handleServiceClick(svc, selectedType)}
          />
        </div>
      </section>

      <Footer />
    </div>
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedService(null);
        }}
        currentUser={currentUser}
        preselectedService={selectedService ? {
          title: selectedService.title,
          type: selectedDeviceType
        } : null}
      />
    </>
  );
};

export default Services;
