import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onBookRepair?: () => void;
}

const CTASection = ({ onBookRepair }: CTASectionProps) => {
  return (
    <section id="contact" className="py-20 lg:py-28 gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
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

export default CTASection;
