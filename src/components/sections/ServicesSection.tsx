import { 
  Monitor, 
  Battery, 
  Keyboard, 
  HardDrive, 
  Cpu, 
  Wifi,
  Zap,
  ArrowRight,
  Laptop,
  PcCase
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const laptopServices = [
  {
    icon: Monitor,
    title: "Screen Replacement",
    description: "Cracked or damaged screen? We replace with genuine LCD/LED panels.",
    price: "₹2,499",
    warranty: "90 Days",
  },
  {
    icon: Battery,
    title: "Battery Replacement",
    description: "Restore your laptop's battery life with original capacity batteries.",
    price: "₹1,999",
    warranty: "180 Days",
  },
  {
    icon: Keyboard,
    title: "Keyboard Repair",
    description: "Fix broken keys or full keyboard replacement with exact matches.",
    price: "₹999",
    warranty: "90 Days",
  },
  {
    icon: HardDrive,
    title: "SSD/HDD Upgrade",
    description: "Boost speed with SSD upgrade or recover data from failed drives.",
    price: "₹1,499",
    warranty: "1 Year",
  },
  {
    icon: Cpu,
    title: "Motherboard Repair",
    description: "Expert chip-level repair for all motherboard issues.",
    price: "₹2,999",
    warranty: "90 Days",
  },
  {
    icon: Wifi,
    title: "WiFi/Network Fix",
    description: "Resolve connectivity issues and WiFi card replacements.",
    price: "₹799",
    warranty: "60 Days",
  },
];

const pcServices = [
  {
    icon: Monitor,
    title: "Display/Monitor Fix",
    description: "Fix display issues, graphics card problems, and monitor connections.",
    price: "₹1,999",
    warranty: "90 Days",
  },
  {
    icon: Cpu,
    title: "CPU Upgrade/Repair",
    description: "Upgrade processors or fix overheating and performance issues.",
    price: "₹2,499",
    warranty: "180 Days",
  },
  {
    icon: HardDrive,
    title: "Storage Solutions",
    description: "SSD/HDD installation, upgrades, and data recovery services.",
    price: "₹1,499",
    warranty: "1 Year",
  },
  {
    icon: Cpu,
    title: "Motherboard Service",
    description: "Professional motherboard repair and component replacements.",
    price: "₹3,499",
    warranty: "90 Days",
  },
  {
    icon: Wifi,
    title: "Network Card Fix",
    description: "Repair or replace network cards, fix connectivity issues.",
    price: "₹999",
    warranty: "60 Days",
  },
  {
    icon: Monitor,
    title: "Graphics Card",
    description: "GPU repair, upgrade, and performance optimization services.",
    price: "₹2,999",
    warranty: "120 Days",
  },
];

const ServicesSection = () => {
  const [selectedType, setSelectedType] = useState<"laptop" | "pc">("laptop");
  const navigate = useNavigate();
  const services = selectedType === "laptop" ? laptopServices : pcServices;

  return (
    <section id="services" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
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

        {/* Device Type Toggle */}
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

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {service.description}
              </p>

              {/* Price & Warranty */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="text-xl font-display font-bold text-foreground">{service.price}</p>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium">
                  {service.warranty} Warranty
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
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

export default ServicesSection;
