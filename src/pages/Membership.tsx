import { Check, Crown, Star, Zap, ArrowRight, X, CreditCard, Smartphone, Building2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface MembershipProps {
  currentUser: { name: string; phone: string } | null;
}

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "₹999",
    period: "/year",
    description: "Perfect for occasional repairs",
    icon: Zap,
    features: [
      "1 Free Diagnostic",
      "10% Off on All Repairs",
      "Priority Booking",
      "60 Days Extended Warranty",
      "Email Support",
    ],
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹2,499",
    period: "/year",
    description: "Best value for regular users",
    icon: Star,
    features: [
      "3 Free Diagnostics",
      "20% Off on All Repairs",
      "Same Day Service",
      "180 Days Extended Warranty",
      "1 Free Cleaning Service",
      "24/7 Phone Support",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "₹4,999",
    period: "/year",
    description: "For businesses & power users",
    icon: Crown,
    features: [
      "Unlimited Diagnostics",
      "30% Off on All Repairs",
      "Dedicated Technician",
      "1 Year Extended Warranty",
      "4 Free Cleaning Services",
      "On-site AMC Support",
      "Fleet Management Dashboard",
    ],
    popular: false,
  },
];

const Membership = ({ currentUser }: MembershipProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "netbanking">("upi");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowPayment(true);
    setPaymentSuccess(false);
    setPaymentProcessing(false);
  };

  const handlePayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  const selectedPlanDetails = plans.find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-white dark:bg-background text-foreground page-enter">
      <Header />
      
      <main className="pt-20 pb-8 overflow-y-auto">
        {/* Membership Section */}
        <MembershipSection handleSelectPlan={handleSelectPlan} selectedPlan={selectedPlan} />
      </main>

      <Footer />

      {/* Payment Modal */}
      {showPayment && selectedPlanDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setShowPayment(false); setSelectedPlan(null); }} />
          <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300 border border-border mx-2 sm:mx-auto">
            {/* Close button */}
            <button
              onClick={() => { setShowPayment(false); setSelectedPlan(null); }}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-destructive hover:text-white transition-all z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {paymentSuccess ? (
              /* Success State */
              <div className="p-8 text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h2>
                  <p className="text-muted-foreground">
                    You're now a <span className="font-semibold text-primary">{selectedPlanDetails.name}</span> member.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-xl space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan</span>
                    <span className="font-semibold">{selectedPlanDetails.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount Paid</span>
                    <span className="font-semibold">{selectedPlanDetails.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Valid Until</span>
                    <span className="font-semibold">
                      {new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => { setShowPayment(false); setSelectedPlan(null); }}>
                    Close
                  </Button>
                  <Button variant="hero" className="flex-1" onClick={() => { setShowPayment(false); setSelectedPlan(null); navigate('/profile'); }}>
                    View Profile
                  </Button>
                </div>
              </div>
            ) : (
              /* Payment Form */
              <div className="p-6 space-y-6">
                {/* Header */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Complete Payment</h2>
                  <p className="text-sm text-muted-foreground mt-1">Subscribe to {selectedPlanDetails.name} plan</p>
                </div>

                {/* Plan Summary */}
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${selectedPlanDetails.popular ? "gradient-hero" : "bg-primary/10"} flex items-center justify-center`}>
                      <selectedPlanDetails.icon className={`w-5 h-5 ${selectedPlanDetails.popular ? "text-primary-foreground" : "text-primary"}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{selectedPlanDetails.name} Plan</p>
                      <p className="text-xs text-muted-foreground">{selectedPlanDetails.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-foreground">{selectedPlanDetails.price}</p>
                    <p className="text-xs text-muted-foreground">{selectedPlanDetails.period}</p>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Payment Method</p>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setPaymentMethod("upi")}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        paymentMethod === "upi"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Smartphone className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <span className="text-xs font-medium">UPI</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        paymentMethod === "card"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <span className="text-xs font-medium">Card</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("netbanking")}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        paymentMethod === "netbanking"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Building2 className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <span className="text-xs font-medium">Net Banking</span>
                    </button>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="space-y-4">
                  {paymentMethod === "upi" && (
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">UPI ID</label>
                      <Input placeholder="yourname@upi" />
                    </div>
                  )}
                  {paymentMethod === "card" && (
                    <>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Card Number</label>
                        <Input placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1.5 block">Expiry</label>
                          <Input placeholder="MM/YY" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1.5 block">CVV</label>
                          <Input placeholder="123" type="password" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Name on Card</label>
                        <Input placeholder="Full name" />
                      </div>
                    </>
                  )}
                  {paymentMethod === "netbanking" && (
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Select Bank</label>
                      <select className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-sm">
                        <option value="">Choose your bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                        <option value="bob">Bank of Baroda</option>
                        <option value="pnb">Punjab National Bank</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Pay Button */}
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full text-lg py-6"
                  onClick={handlePayment}
                  disabled={paymentProcessing}
                >
                  {paymentProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <>Pay {selectedPlanDetails.price}</>
                  )}
                </Button>

                {/* Trust */}
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Secured by 256-bit SSL encryption</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Membership Section Component
const MembershipSection = ({ handleSelectPlan, selectedPlan }: { handleSelectPlan: (planId: string) => void; selectedPlan: string | null }) => {
  return (
    <section id="membership" className="py-12 sm:py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-warning/10 border border-warning/20 mb-4 sm:mb-6">
            <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-warning" />
            <span className="text-xs sm:text-sm font-medium text-warning">Membership Plans</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4 sm:mb-6">
            Save More with Membership
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
            Join our membership program for exclusive discounts, priority service, 
            and extended warranty benefits.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative p-6 sm:p-8 border ${
                plan.popular 
                  ? "border-primary shadow-glow sm:scale-105" 
                  : "border-border shadow-card"
              } transition-all duration-300 hover:shadow-lg`}
            >
              {plan.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full gradient-hero text-primary-foreground text-xs sm:text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${plan.popular ? "gradient-hero" : "bg-primary/10"} flex items-center justify-center mb-4 sm:mb-5`}>
                <plan.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-1">
                {plan.name}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm mb-4">{plan.description}</p>

              <div className="flex items-baseline gap-1 mb-5 sm:mb-6">
                <span className="text-3xl sm:text-4xl font-display font-bold text-foreground">{plan.price}</span>
                <span className="text-sm sm:text-base text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 sm:gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent" />
                    </div>
                    <span className="text-xs sm:text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.popular ? "hero" : "outline"} 
                className="w-full"
                size="lg"
                onClick={() => handleSelectPlan(plan.id)}
                disabled={selectedPlan === plan.id}
              >
                {selectedPlan === plan.id ? "Processing..." : "Get Started"}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-16 sm:mt-20 max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-4">
            All Plans Include
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
            <div className="p-4 sm:p-6 bg-card rounded-xl border border-border">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl gradient-hero flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Check className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2">No Hidden Fees</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Transparent pricing with no surprise charges.
              </p>
            </div>
            <div className="p-4 sm:p-6 bg-card rounded-xl border border-border">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl gradient-hero flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Check className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2">Cancel Anytime</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                No long-term commitment. Cancel whenever you want.
              </p>
            </div>
            <div className="p-4 sm:p-6 bg-card rounded-xl border border-border sm:col-span-2 md:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl gradient-hero flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Check className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2">30-Day Money Back</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Not satisfied? Get a full refund within 30 days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Membership;