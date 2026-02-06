import { useState } from "react";
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
  Phone
} from "lucide-react";
import laptopRepairImage from "../assets/lap1.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BookingModal from "@/components/BookingModal";

interface ServicesProps {
  currentUser: { name: string; phone: string } | null;
}

interface ServiceIssue {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
}

const commonIssues: ServiceIssue[] = [
  {
    icon: Monitor,
    title: "Screen Damage",
  },
  {
    icon: Battery,
    title: "Battery Replacement",
  },
  {
    icon: Keyboard,
    title: "Keyboard Fix",
  },
  {
    icon: AlertTriangle,
    title: "System Lag",
  },
];

const Services = ({ currentUser }: ServicesProps) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookRepair = () => {
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-background text-foreground page-enter">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image - Positioned to show model in right corner */}
        <img 
          src={laptopRepairImage}
          alt="Laptop repair technician"
          className="absolute top-0 right-0 w-full h-full object-cover object-[85%_center] z-0"
          onError={(e) => {
            console.error('Image failed to load:', e);
            console.error('Image src:', laptopRepairImage);
            (e.target as HTMLImageElement).style.display = 'none';
          }}
          onLoad={(e) => {
            console.log('Image loaded successfully!');
            console.log('Image src:', laptopRepairImage);
            console.log('Image element:', e.target);
          }}
          style={{
            display: 'block',
            minHeight: '100%',
            width: '100%'
          }}
        />
        
        {/* Fallback background for debugging */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
          style={{ 
            backgroundImage: `url(${laptopRepairImage})`,
            backgroundPosition: '85% center'
          }}
        />
        
        {/* Gradient Overlay - Strong left, transparent right to show model */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1419]/98 via-[#1a2332]/85 via-[#1a2332]/40 to-transparent z-10"></div>
        
        <div className="max-w-7xl mx-auto w-full relative z-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-300 text-sm font-medium">Certified Apple & PC Specialists</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Premium<br />
                  Laptop<br />
                  Repair <span className="text-cyan-400">at Your</span><br />
                  <span className="text-blue-400">Doorstep</span>
                </h1>
                
                <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
                  Experience white-glove technical service. Our expert engineers resolve your hardware and software issues on-site with unparalleled precision.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleBookRepair}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  Book a Repair
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Membership Plans
                </Button>
              </div>

              {/* Common Hardware Issues - Positioned below buttons */}
              <div className="mt-12">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">COMMON HARDWARE ISSUES</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {commonIssues.map((issue) => (
                    <button
                      key={issue.title}
                      onClick={handleBookRepair}
                      className="flex flex-col items-center p-4 rounded-xl bg-[#1a2332]/80 border border-blue-400/30 hover:border-cyan-400/60 hover:bg-[#1a2332]/90 transition-all duration-300 group backdrop-blur-sm"
                    >
                      <issue.icon className="w-6 h-6 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-white text-xs font-semibold text-center">{issue.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - let background show through */}
            <div className="hidden lg:block"></div>
          </div>

          {/* Bottom Features */}
          <div className="mt-20 grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center space-y-5">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border-2 border-cyan-400/40 flex items-center justify-center mx-auto backdrop-blur-sm">
                <Shield className="w-10 h-10 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">90 Days</h3>
                <p className="text-cyan-300 font-bold text-lg tracking-wide">PREMIUM WARRANTY</p>
              </div>
            </div>

            <div className="text-center space-y-5">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-2 border-blue-400/40 flex items-center justify-center mx-auto backdrop-blur-sm">
                <Award className="w-10 h-10 text-blue-400" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">Certified</h3>
                <p className="text-blue-300 font-bold text-lg tracking-wide">TOP TIER TECHS</p>
              </div>
            </div>

            <div className="text-center space-y-5">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/10 border-2 border-green-400/40 flex items-center justify-center mx-auto backdrop-blur-sm">
                <Clock className="w-10 h-10 text-green-400" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">Express</h3>
                <p className="text-green-300 font-bold text-lg tracking-wide">SAME DAY SERVICE</p>
                <p className="text-slate-400 text-base font-medium">MORE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)}
        currentUser={currentUser}
      />
    </div>
  );
};

export default Services;
