import { Smartphone, ClipboardList, Wrench, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Smartphone,
    step: "01",
    title: "Book Online",
    description: "Select your laptop brand and describe the issue. Get instant price estimate.",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Get Confirmed",
    description: "Our team confirms the booking and assigns a certified technician to you.",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Doorstep Repair",
    description: "Technician arrives at your location and repairs the device in front of you.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Pay & Warranty",
    description: "Pay only after satisfaction. Get warranty card for peace of mind.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Wrench className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">How It Works</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Repair in 4 Easy Steps
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting your laptop repaired has never been easier. Follow these simple steps 
            and we'll handle the rest.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
                </div>
              )}

              <div className="relative bg-card rounded-2xl p-6 border border-border shadow-card group-hover:shadow-lg transition-all duration-300">
                {/* Step Number */}
                <div className="absolute -top-4 left-6 px-3 py-1 rounded-full gradient-hero text-primary-foreground text-sm font-bold">
                  Step {step.step}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mt-4 mb-5 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
