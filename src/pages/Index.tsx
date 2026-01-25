import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import MembershipSection from "@/components/sections/MembershipSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BrandsSection from "@/components/sections/BrandsSection";
import CTASection from "@/components/sections/CTASection";
import BookingModal from "@/components/BookingModal";
import ScrollIndicator from "@/components/ScrollIndicator";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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
    <div className="min-h-screen bg-background overflow-hidden">
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

export default Index;
