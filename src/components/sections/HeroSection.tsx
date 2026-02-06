import {
  ArrowRight,
  Shield,
  Clock,
  CheckCircle2,
  Award,
  Monitor,
  Battery,
  Keyboard,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  onBookRepair?: () => void;
}

interface ServiceIssue {
  icon: any;
  title: string;
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

const HeroSection = ({ onBookRepair }: HeroSectionProps) => {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative min-h-screen bg-[#f4faff] dark:bg-[#10151b] flex items-center pt-20 pb-20 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 mb-8">
            <CheckCircle2 className="w-4 h-4 text-blue-500 dark:text-blue-300" />
            <span className="text-blue-600 dark:text-blue-200 text-sm font-medium">Certified Apple & PC Specialists</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-6 mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              Expert Laptop Repair<br />
              at Your <span className="text-blue-500 dark:text-blue-400">Doorstep</span>
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-xl max-w-2xl leading-relaxed">
              Get your laptop fixed right in front of you. Transparent pricing, genuine parts, and 60-days warranty on all repair
            </p>
          </div>

          {/* Action Buttons */}
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

        {/* Bottom Features */}
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

export default HeroSection;
