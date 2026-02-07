import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Monitor, 
  Battery, 
  Keyboard, 
  AlertTriangle,
  ArrowRight,
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

interface ServicesProps {
  currentUser: { name: string; phone: string } | null;
}

const Services = ({ currentUser }: ServicesProps) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const navigate = useNavigate();

  const handleBookRepair = () => {
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-background text-foreground page-enter">
      <Header />
      
      {/* Hero Section - Same as Home Page */}
      <section className="relative min-h-screen bg-[#f4faff] dark:bg-[#10151b] flex items-center pt-20 pb-20 px-4 sm:px-6 lg:px-8">
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
                onClick={handleBookRepair}
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

      {/* Services Section */}
      <ServicesSection />

      <Footer />
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)}
        currentUser={currentUser}
      />
    </div>
  );
};

// Services Section Component
const ServicesSection = () => {
  const [selectedType, setSelectedType] = useState<"laptop" | "pc">("laptop");
  
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
      </div>
    </section>
  );
};

export default Services;