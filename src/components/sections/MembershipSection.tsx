import { Check, Star, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
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

const MembershipSection = () => {
  return (
    <section id="membership" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/20 mb-6">
            <Crown className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium text-warning">Membership Plans</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Save More with Membership
          </h2>
          <p className="text-lg text-muted-foreground">
            Join our membership program for exclusive discounts, priority service, 
            and extended warranty benefits.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-card rounded-2xl p-6 lg:p-8 border ${
                plan.popular 
                  ? "border-primary shadow-glow scale-105" 
                  : "border-border shadow-card"
              } transition-all duration-300 hover:shadow-lg`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full gradient-hero text-primary-foreground text-sm font-semibold">
                  Most Popular
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl ${plan.popular ? "gradient-hero" : "bg-primary/10"} flex items-center justify-center mb-5`}>
                <plan.icon className={`w-7 h-7 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
              </div>

              {/* Plan Info */}
              <h3 className="text-2xl font-display font-bold text-foreground mb-1">
                {plan.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-display font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button 
                variant={plan.popular ? "hero" : "outline"} 
                className="w-full"
                size="lg"
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
