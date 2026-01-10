import { useState } from "react";
import { X, Monitor, Battery, Keyboard, HardDrive, Cpu, Wifi, Upload, ArrowRight, ArrowLeft, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const laptopBrands = ["Dell", "HP", "Lenovo", "ASUS", "Acer", "Apple", "MSI", "Samsung", "Other"];

const repairIssues = [
  { icon: Monitor, label: "Screen Issue", price: "₹2,499 - ₹5,999" },
  { icon: Battery, label: "Battery Problem", price: "₹1,999 - ₹3,999" },
  { icon: Keyboard, label: "Keyboard Fix", price: "₹999 - ₹2,499" },
  { icon: HardDrive, label: "Storage/HDD", price: "₹1,499 - ₹4,999" },
  { icon: Cpu, label: "Motherboard", price: "₹2,999 - ₹7,999" },
  { icon: Wifi, label: "WiFi/Network", price: "₹799 - ₹1,999" },
];

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    description: "",
  });

  const toggleIssue = (issue: string) => {
    setSelectedIssues(prev =>
      prev.includes(issue) ? prev.filter(i => i !== issue) : [...prev, issue]
    );
  };

  const handleSubmit = () => {
    // Here you would submit the booking
    setStep(4); // Show success
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted-foreground/20 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Bar */}
        <div className="p-6 pb-0">
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <div
                  className={`w-full h-2 rounded-full ${
                    s <= step ? "gradient-hero" : "bg-muted"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 pt-0">
          {/* Step 1: Brand Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                  Select Your Laptop Brand
                </h2>
                <p className="text-muted-foreground">
                  Choose the brand of your laptop for accurate pricing.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {laptopBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`p-4 rounded-xl border-2 text-center font-medium transition-all ${
                      selectedBrand === brand
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50 text-foreground"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>

              <Button
                variant="hero"
                size="lg"
                className="w-full"
                disabled={!selectedBrand}
                onClick={() => setStep(2)}
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          )}

          {/* Step 2: Issue Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                  What's the Issue?
                </h2>
                <p className="text-muted-foreground">
                  Select the problems you're facing. You can choose multiple.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {repairIssues.map((issue) => {
                  const isSelected = selectedIssues.includes(issue.label);
                  return (
                    <button
                      key={issue.label}
                      onClick={() => toggleIssue(issue.label)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isSelected ? "gradient-hero text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}>
                          <issue.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className={`font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                            {issue.label}
                          </p>
                          <p className="text-sm text-muted-foreground">{issue.price}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Image Upload */}
              <div className="p-4 border-2 border-dashed border-border rounded-xl text-center">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Upload images of the issue (optional)
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </Button>
                <Button
                  variant="hero"
                  size="lg"
                  className="flex-1"
                  disabled={selectedIssues.length === 0}
                  onClick={() => setStep(3)}
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Details */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                  Your Details
                </h2>
                <p className="text-muted-foreground">
                  Enter your contact information for the technician visit.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Full Name
                  </label>
                  <Input
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Phone Number
                  </label>
                  <Input
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Address
                  </label>
                  <Input
                    placeholder="Enter your complete address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Additional Details (Optional)
                  </label>
                  <Textarea
                    placeholder="Describe your issue in detail..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>

              {/* Price Summary */}
              <div className="p-4 bg-accent/10 rounded-xl border border-accent/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground font-medium">Estimated Price</span>
                  <span className="text-xl font-display font-bold text-foreground">₹499 - ₹7,999</span>
                </div>
                <div className="flex items-center gap-2 text-accent">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">90 Days Warranty Included</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="lg" onClick={() => setStep(2)}>
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </Button>
                <Button
                  variant="hero"
                  size="lg"
                  className="flex-1"
                  onClick={handleSubmit}
                >
                  Book Repair Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 rounded-full gradient-accent flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-accent-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                  Booking Confirmed!
                </h2>
                <p className="text-muted-foreground">
                  Our team will contact you shortly to confirm the visit time.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">Booking Reference</p>
                <p className="text-lg font-display font-bold text-foreground">
                  REP-{Math.random().toString(36).substr(2, 8).toUpperCase()}
                </p>
              </div>
              <Button variant="hero" size="lg" onClick={onClose}>
                Done
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
