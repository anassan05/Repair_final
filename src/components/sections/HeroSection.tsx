import { ArrowRight, Shield, Clock, BadgeCheck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  onBookRepair?: () => void;
}

const HeroSection = ({ onBookRepair }: HeroSectionProps) => {
  const navigate = useNavigate();
  const trustBadges = [
    { icon: Shield, label: "90 Days Warranty" },
    { icon: BadgeCheck, label: "Verified Technicians" },
    { icon: Clock, label: "Same Day Service" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 gradient-hero opacity-[0.03]" />
      <div className="absolute top-20 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-8 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-6 lg:space-y-8 animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full bg-primary/10 border border-primary/20">
              <Wrench className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-primary" />
              <span className="text-xs lg:text-sm font-medium text-primary">Trusted by 10,000+ Customers</span>
            </div>

            {/* Heading */}
            <div className="space-y-3 lg:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
                Expert Laptop Repair at Your{" "}
                <span className="text-gradient-primary">Doorstep</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl">
                Get your laptop fixed right in front of you. Transparent pricing, 
                genuine parts, and 90-day warranty on all repairs.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <Button variant="hero" size="lg" onClick={onBookRepair} className="w-full sm:w-auto text-base lg:text-lg">
                Book a Repair
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/profile')} className="w-full sm:w-auto text-base lg:text-lg">
                View Membership
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 p-2">
                  <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <badge.icon className="w-4 h-4 lg:w-5 lg:h-5 text-accent" />
                  </div>
                  <span className="text-xs lg:text-sm font-medium text-foreground">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image / Illustration */}
          <div className="relative animate-fade-up hidden lg:block" style={{ animationDelay: "0.2s" }}>
            <div className="relative z-10">
              {/* Main Visual Card */}
              <div className="relative bg-card rounded-3xl shadow-xl p-8 lg:p-10 border border-border">
                <div className="absolute -top-4 -right-4 w-24 h-24 gradient-accent rounded-2xl flex items-center justify-center shadow-lg animate-float">
                  <Wrench className="w-10 h-10 text-accent-foreground" />
                </div>
                
                {/* Repair Request Card */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center">
                      <svg className="w-8 h-8 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">Quick Repair</h3>
                      <p className="text-sm text-muted-foreground">Same day service available</p>
                    </div>
                  </div>

                  {/* Issue Selection Preview */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">Common Issues</p>
                    <div className="grid grid-cols-2 gap-2">
                      {["Screen Damage", "Battery Issue", "Keyboard Fix", "Slow Performance"].map((issue) => (
                        <button 
                          key={issue}
                          onClick={onBookRepair}
                          className="px-4 py-3 bg-muted rounded-xl text-sm font-medium text-foreground text-center hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                        >
                          {issue}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Preview */}
                  <div className="flex items-center justify-between p-4 bg-accent/10 rounded-xl border border-accent/20">
                    <div>
                      <p className="text-sm text-muted-foreground">Starting from</p>
                      <p className="text-2xl font-display font-bold text-foreground">₹499</p>
                    </div>
                    <div className="flex items-center gap-1 text-accent">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">90 Days Warranty</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
