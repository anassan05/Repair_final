import { Phone, Mail, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

interface ContactProps {
  currentUser: { name: string; phone: string } | null;
}

const Contact = ({ currentUser }: ContactProps) => {
  return (
    <div className="min-h-screen relative z-[1] text-foreground page-enter">
      <Header />

      <main className="pt-20 pb-8">
        {/* CTA Section */}
        <CTASection />

        {/* Contact Information Section */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-8 sm:mb-12">
                Get In Touch
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
                {/* Phone */}
                <div className="text-center p-4 sm:p-6 rounded-lg border border-border hover:border-primary/30 transition-colors">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full gradient-hero flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Phone</h3>
                  <p className="text-muted-foreground mb-4">Call us for immediate assistance</p>
                  <a href="tel:+919876543210" className="text-primary font-semibold hover:underline">
                    +91 98765 43210
                  </a>
                </div>

                {/* Email */}
                <div className="text-center p-4 sm:p-6 rounded-lg border border-border hover:border-primary/30 transition-colors">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full gradient-hero flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Email</h3>
                  <p className="text-muted-foreground mb-4">Send us your queries</p>
                  <a href="mailto:support@caremylap.com" className="text-primary font-semibold hover:underline">
                    support@caremylap.com
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="text-center p-4 sm:p-6 rounded-lg border border-border hover:border-primary/30 transition-colors">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full gradient-hero flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">WhatsApp</h3>
                  <p className="text-muted-foreground mb-4">Chat with us instantly</p>
                  <a href="https://wa.me/919876543210" className="text-primary font-semibold hover:underline">
                    Start Chat
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Hours */}
        <section className="bg-secondary/30 py-10 sm:py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Business Hours</h3>
              <div className="space-y-2 sm:space-y-3 text-base sm:text-lg">
                <p><span className="font-semibold">Monday - Friday:</span> 9:00 AM - 8:00 PM</p>
                <p><span className="font-semibold">Saturday:</span> 10:00 AM - 6:00 PM</p>
                <p><span className="font-semibold">Sunday:</span> 11:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// CTA Section Component
const CTASection = () => {
  const { toast } = useToast();

  const handleCallUs = () => {
    toast({
      title: "📞 Call Us Now",
      description: "Reach us at +91 98765 43210. Our support team is available Mon-Sat, 9 AM - 8 PM.",
    });
  };

  return (
    <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-12 sm:py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6">
            Ready to Get Your Laptop Fixed?
          </h1>
          <p className="text-base sm:text-lg sm:text-xl mb-8 sm:mb-10 opacity-95">
            Book a repair now and get your laptop working like new. Our experts are just a call away.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base" onClick={handleCallUs}>
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now
              </Button>
            <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 text-base">
              <ArrowRight className="w-5 h-5 mr-2" />
              Book Repair Online
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm sm:text-base">
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="w-4 h-4" />
              +91 98765 43210
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="https://wa.me/919876543210" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <MessageCircle className="w-4 h-4" />
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;