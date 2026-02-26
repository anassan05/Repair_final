import { useState, useEffect, useRef } from "react";
import { X, Monitor, Battery, Keyboard, HardDrive, Cpu, Wifi, Upload, ArrowRight, ArrowLeft, Shield, Check, Laptop, PcCase, MapPin, Plus, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { indianStatesAndDistricts, allStates } from "@/data/indianLocations";
import { useToast } from "@/hooks/use-toast";
// All data is dummy - no API calls

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: { name: string; phone: string } | null;
  preselectedService?: {
    title: string;
    type: "laptop" | "pc";
  } | null;
}

interface SavedAddress {
  id: number;
  type: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface BookingHistoryItem {
  id: string;
  device: string;
  issue: string;
  date: string;
  status: "Active" | "Completed" | "In Progress" | "Pending";
  cost: string;
  discount: string;
  rating: number;
  otp: string;
  customerName: string;
  customerPhone: string;
  address: string;
  description: string;
  createdAt: string;
}

const USER_ADDRESSES_KEY = "userAddresses";
const USER_BOOKINGS_KEY = "userBookings";

const getStoredAddresses = (): SavedAddress[] => {
  const raw = sessionStorage.getItem(USER_ADDRESSES_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const laptopBrands = ["Dell", "HP", "Lenovo", "ASUS", "Acer", "Apple", "MSI", "Samsung", "Other"];
const pcBrands = ["Dell", "HP", "Lenovo", "ASUS", "Acer", "Intel", "AMD", "Custom Build", "Other"];

const laptopRepairIssues = [
  { icon: Monitor, label: "Screen Issue", description: "Cracked, black, or flickering display", price: "₹2,499 - ₹5,999", image: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=240&q=80" },
  { icon: Battery, label: "Battery Problem", description: "Not charging or drains quickly", price: "₹1,999 - ₹3,999", image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&w=240&q=80" },
  { icon: Keyboard, label: "Keyboard Fix", description: "Keys not working or stuck", price: "₹999 - ₹2,499", image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=240&q=80" },
  { icon: HardDrive, label: "Storage/HDD", description: "Slow performance or data recovery", price: "₹1,499 - ₹4,999", image: "https://images.unsplash.com/photo-1591489378430-ef2f4c626b35?auto=format&fit=crop&w=240&q=80" },
  { icon: Cpu, label: "Motherboard", description: "Not powering on or random shutdowns", price: "₹2,999 - ₹7,999", image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=240&q=80" },
  { icon: Wifi, label: "WiFi/Network", description: "Can't connect to internet", price: "₹799 - ₹1,999", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=240&q=80" },
  { icon: Shield, label: "Not Sure / Need Diagnosis", description: "Let our technician identify the issue", price: "Free Checkup", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=240&q=80" },
];

const pcRepairIssues = [
  { icon: Monitor, label: "Display Issue", description: "No display or screen problems", price: "₹1,999 - ₹4,999", image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=240&q=80" },
  { icon: Cpu, label: "CPU Problem", description: "Overheating or slow performance", price: "₹2,499 - ₹6,999", image: "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?auto=format&fit=crop&w=240&q=80" },
  { icon: HardDrive, label: "Storage/HDD", description: "Slow performance or data recovery", price: "₹1,499 - ₹4,999", image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=240&q=80" },
  { icon: Cpu, label: "Motherboard", description: "Not powering on or random restarts", price: "₹3,499 - ₹8,999", image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=240&q=80" },
  { icon: Wifi, label: "Network Card", description: "Internet connectivity issues", price: "₹999 - ₹2,499", image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=240&q=80" },
  { icon: Monitor, label: "Graphics Card", description: "Display artifacts or gaming issues", price: "₹2,999 - ₹9,999", image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=240&q=80" },
  { icon: Shield, label: "Not Sure / Need Diagnosis", description: "Let our technician identify the issue", price: "Free Checkup", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=240&q=80" },
];

// Mapping from service page titles to booking modal issue labels
const serviceToIssueMapping: { [key: string]: { laptop: string; pc: string } } = {
  "Screen Replacement": { laptop: "Screen Issue", pc: "Display Issue" },
  "Battery Replacement": { laptop: "Battery Problem", pc: "CPU Problem" },
  "Keyboard Repair": { laptop: "Keyboard Fix", pc: "CPU Problem" },
  "SSD/HDD Upgrade": { laptop: "Storage/HDD", pc: "Storage/HDD" },
  "Motherboard Repair": { laptop: "Motherboard", pc: "Motherboard" },
  "WiFi/Network Fix": { laptop: "WiFi/Network", pc: "Network Card" },
  "Display/Monitor Fix": { laptop: "Screen Issue", pc: "Display Issue" },
  "CPU Upgrade/Repair": { laptop: "Motherboard", pc: "CPU Problem" },
  "Storage Solutions": { laptop: "Storage/HDD", pc: "Storage/HDD" },
  "Motherboard Service": { laptop: "Motherboard", pc: "Motherboard" },
  "Network Card Fix": { laptop: "WiFi/Network", pc: "Network Card" },
  "Graphics Card": { laptop: "Screen Issue", pc: "Graphics Card" },
};

const BookingModal = ({ isOpen, onClose, currentUser, preselectedService }: BookingModalProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>(() => getStoredAddresses());
  const [step, setStep] = useState(0);
  const [deviceType, setDeviceType] = useState<"laptop" | "pc" | "">("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [bookingOtp, setBookingOtp] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showStateSuggestions, setShowStateSuggestions] = useState(false);
  const [showDistrictSuggestions, setShowDistrictSuggestions] = useState(false);

  const stateInputRef = useRef<HTMLDivElement>(null);
  const districtInputRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    phone: currentUser?.phone || "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    description: "",
    image: null as File | null,
  });

  // Handle modal state and preselected service
  useEffect(() => {
    console.log('BookingModal useEffect triggered:', { isOpen, preselectedService, currentUser: currentUser?.name });
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    if (!isOpen) {
      // Reset all states when modal closes
      console.log('Modal closing - resetting state');
      setStep(0);
      setDeviceType("");
      setSelectedBrand("");
      setSelectedIssues([]);
      setBookingOtp("");
      setBookingId("");
      setUseNewAddress(false);
      setImagePreview(null);
      setFormData({
        name: currentUser?.name || "",
        phone: currentUser?.phone || "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        description: "",
        image: null,
      });
      return;
    }

    // Always fetch latest addresses when modal opens so Profile add/delete stays in sync.
    const latestAddresses = getStoredAddresses();
    setSavedAddresses(latestAddresses);
    if (latestAddresses.length === 0) {
      setSelectedAddressId(null);
      setUseNewAddress(true);
    } else {
      const defaultAddressId = latestAddresses.find(a => a.isDefault)?.id || latestAddresses[0].id;
      setSelectedAddressId(prev =>
        prev && latestAddresses.some(a => a.id === prev) ? prev : defaultAddressId
      );
    }

    // When modal opens, pre-populate issue and skip device selection if service was clicked
    if (preselectedService) {
      const mapping = serviceToIssueMapping[preselectedService.title];
      const issueLabel = mapping ? mapping[preselectedService.type] : preselectedService.title;
      
      setDeviceType(preselectedService.type);
      setSelectedIssues([issueLabel]);
      setStep(1); // Skip device selection, go straight to brand
    } else {
      setSelectedIssues([]);
      setStep(0);
    }

    return () => { document.body.style.overflow = ''; };
  }, [isOpen, preselectedService, currentUser]);

  // Reset scroll position when step changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [step]);

  // Update form data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.name,
        phone: currentUser.phone,
      }));
    }
  }, [currentUser]);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, image: file }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const brands = deviceType === "laptop" ? laptopBrands : pcBrands;
  const repairIssues = deviceType === "laptop" ? laptopRepairIssues : pcRepairIssues;

  const toggleIssue = (issue: string) => {
    // If "Not Sure" is selected, deselect everything else
    if (issue.includes("Not Sure")) {
      setSelectedIssues([issue]);
      return;
    }
    
    // If another issue is selected, deselect "Not Sure"
    setSelectedIssues(prev => {
      const newIssues = prev.filter(i => !i.includes("Not Sure"));
      if (newIssues.includes(issue)) {
        return newIssues.filter(i => i !== issue);
      } else {
        return [...newIssues, issue];
      }
    });
  };

  const handleSubmit = async () => {
    // Get selected address details
    let addressDetails = "";
    if (useNewAddress) {
      addressDetails = `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`;
      
      // Save new address to sessionStorage for profile page
      const existingAddresses = getStoredAddresses();
      
      // Create new address object
      const newAddressObj = {
        id: Math.max(...existingAddresses.map(a => a.id || 0), 0) + 1,
        type: "Home", // Default type, could be made selectable
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        isDefault: existingAddresses.length === 0, // First address becomes default
      };
      
      // Add to existing addresses and save back to sessionStorage
      const updatedAddresses = [...existingAddresses, newAddressObj];
      sessionStorage.setItem(USER_ADDRESSES_KEY, JSON.stringify(updatedAddresses));
      setSavedAddresses(updatedAddresses);
      setSelectedAddressId(newAddressObj.id);
      toast({
        title: "Address saved",
        description: "New address saved for future bookings.",
      });
      
    } else {
      const selectedAddress = savedAddresses.find(a => a.id === selectedAddressId);
      if (selectedAddress) {
        addressDetails = `${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}`;
      }
    }

    // Get user from sessionStorage or create guest ID
    const userStr = sessionStorage.getItem('user');
    let customerId;
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        customerId = user.id || `GUEST${Date.now()}`;
      } catch (e) {
        customerId = `GUEST${Date.now()}`;
      }
    } else {
      customerId = `GUEST${Date.now()}`;
    }

    // Prepare booking data for session storage
    const bookingDataToStore = {
      customerId: customerId.toString(),
      customerName: formData.name,
      customerPhone: formData.phone,
      customerAddress: addressDetails,
      service: `${deviceType === "laptop" ? "Laptop" : "Desktop PC"} - ${selectedBrand} - ${selectedIssues.join(", ")}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      description: formData.description,
    };

    // Simulate dummy booking success
    const dummyBookingId = `BK-${Date.now().toString().slice(-6)}`;
    const dummyOtp = Math.floor(1000 + Math.random() * 9000).toString();

    sessionStorage.setItem('currentBooking', JSON.stringify({
      ...bookingDataToStore,
      otp: dummyOtp,
      bookingId: dummyBookingId,
      createdAt: new Date().toISOString(),
    }));

    // Persist booking for Profile page history.
    const storedBookingsRaw = sessionStorage.getItem(USER_BOOKINGS_KEY);
    let storedBookings: BookingHistoryItem[] = [];
    if (storedBookingsRaw) {
      try {
        const parsed = JSON.parse(storedBookingsRaw);
        storedBookings = Array.isArray(parsed) ? parsed : [];
      } catch {
        storedBookings = [];
      }
    }

    const newBookingHistoryItem = {
      id: dummyBookingId,
      device: `${deviceType === "laptop" ? "Laptop" : "Desktop PC"} - ${selectedBrand || "Unknown Brand"}`,
      issue: selectedIssues.join(", ") || "General Service",
      date: new Date().toISOString(),
      status: "Active",
      cost: "₹0",
      discount: "₹0",
      rating: 0,
      otp: dummyOtp,
      customerName: formData.name,
      customerPhone: formData.phone,
      address: addressDetails,
      description: formData.description,
      createdAt: new Date().toISOString(),
    };

    sessionStorage.setItem(
      USER_BOOKINGS_KEY,
      JSON.stringify([newBookingHistoryItem, ...storedBookings])
    );
    window.dispatchEvent(new Event("bookings-updated"));

    setBookingOtp(dummyOtp);
    setBookingId(dummyBookingId);
    setStep(5); // Show success
  };

  if (!isOpen) return null;

  console.log('Rendering BookingModal - Step:', step, 'DeviceType:', deviceType, 'Issues:', selectedIssues);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80 backdrop-blur-lg" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-card via-card to-card/95 rounded-2xl lg:rounded-3xl shadow-2xl w-full max-w-2xl lg:max-w-3xl max-h-[85vh] lg:max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-300 border-2 border-primary/10 mx-auto">
        {/* Scrollable Content */}
        <div ref={scrollRef} className="max-h-[85vh] lg:max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 lg:top-6 right-3 lg:right-6 w-9 h-9 lg:w-11 lg:h-11 rounded-full bg-background/90 backdrop-blur-sm border-2 border-border/50 flex items-center justify-center text-muted-foreground hover:bg-destructive hover:text-white hover:border-destructive hover:scale-110 hover:rotate-90 transition-all duration-300 z-20 shadow-xl"
          >
            <X className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>

        {/* Progress Bar */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-4 lg:p-8 pb-3 lg:pb-6 pr-12 lg:pr-20 border-b border-border/50">
          <div className="flex items-center justify-between mb-2 lg:mb-4">
            {['Device', 'Brand', 'Issue', 'Details'].map((label, idx) => {
              const stepNum = idx + 1;
              const isActive = stepNum === step;
              const isCompleted = stepNum < step;
              return (
                <div key={idx} className="flex flex-col items-center flex-1">
                  <div className={`w-7 h-7 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-bold text-xs lg:text-sm mb-1 lg:mb-2 transition-all duration-300 ${
                    isCompleted ? 'gradient-hero text-primary-foreground shadow-lg scale-110' :
                    isActive ? 'border-2 border-primary bg-primary/10 text-primary scale-110' :
                    'border-2 border-border bg-muted text-muted-foreground'
                  }`}>
                    {isCompleted ? '✓' : stepNum}
                  </div>
                  <span className={`text-xs lg:text-sm font-medium transition-colors ${
                    isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'
                  }`}>{label}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    s <= step ? "gradient-hero" : ""
                  }`}
                  style={{ width: s <= step ? '100%' : '0%' }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 lg:p-6 pt-0">
          {/* Step 0: Device Type Selection */}
          {step === 0 && (
            <div className="space-y-4 lg:space-y-8 p-4 lg:p-8">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-2 lg:mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Select Your Device
                </h2>
                <p className="text-muted-foreground text-sm lg:text-lg">
                  Which device needs expert repair?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-6">
                <button
                  onClick={() => {
                    setDeviceType("laptop");
                    setSelectedBrand("");
                    setSelectedIssues([]);
                    setImagePreview(null);
                    setFormData(prev => ({ ...prev, image: null, description: "" }));
                    setStep(1);
                  }}
                  className="group relative p-6 lg:p-10 rounded-2xl border-2 border-border hover:border-primary bg-gradient-to-br from-card to-card/50 hover:from-primary/5 hover:to-accent/5 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-500" />
                  <div className="relative">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto rounded-2xl gradient-hero flex items-center justify-center mb-3 lg:mb-5 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                      <Laptop className="w-8 h-8 lg:w-10 lg:h-10 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg lg:text-2xl font-display font-bold text-foreground mb-2 lg:mb-3 group-hover:text-primary transition-colors">
                      Laptop
                    </h3>
                    <p className="text-xs lg:text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      Portable computers & notebooks
                    </p>
                    <div className="mt-3 lg:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs font-semibold text-primary">Click to select â†’</span>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setDeviceType("pc");
                    setSelectedBrand("");
                    setSelectedIssues([]);
                    setImagePreview(null);
                    setFormData(prev => ({ ...prev, image: null, description: "" }));
                    setStep(1);
                  }}
                  className="group relative p-6 lg:p-10 rounded-2xl border-2 border-border hover:border-primary bg-gradient-to-br from-card to-card/50 hover:from-primary/5 hover:to-accent/5 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-500" />
                  <div className="relative">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto rounded-2xl gradient-hero flex items-center justify-center mb-3 lg:mb-5 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                      <PcCase className="w-8 h-8 lg:w-10 lg:h-10 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg lg:text-2xl font-display font-bold text-foreground mb-2 lg:mb-3 group-hover:text-primary transition-colors">
                      Desktop PC
                    </h3>
                    <p className="text-xs lg:text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      Desktop computers & workstations
                    </p>
                    <div className="mt-3 lg:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs font-semibold text-primary">Click to select â†’</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 1: Brand Selection */}
          {step === 1 && (
            <div className="space-y-4 lg:space-y-8 p-4 lg:p-8">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-2 lg:mb-3">
                  Choose Your {deviceType === "laptop" ? "Laptop" : "PC"} Brand
                </h2>
                <p className="text-muted-foreground text-sm lg:text-base">
                  Select your device manufacturer for accurate diagnostics
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 lg:gap-4">
                {brands.map((brand) => {
                  const isSelected = selectedBrand === brand;
                  const isLast = brand === "Other";
                  return (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`group relative p-3 lg:p-5 rounded-lg lg:rounded-xl border-2 text-center font-semibold transition-all duration-300 overflow-hidden text-sm lg:text-base ${
                        isLast ? "col-span-2 sm:col-span-1 max-w-[60%] sm:max-w-none mx-auto sm:mx-0 w-full" : ""
                      } ${
                        isSelected
                          ? "border-primary bg-gradient-to-br from-primary/15 to-accent/10 text-primary shadow-lg scale-105"
                          : "border-border sm:hover:border-primary/50 bg-card sm:hover:bg-gradient-to-br sm:hover:from-primary/5 sm:hover:to-accent/5 text-foreground sm:hover:scale-105 sm:hover:shadow-md"
                      }`}
                    >
                      <div className={`absolute inset-0 transition-opacity duration-300 ${
                        isSelected ? 'opacity-100' : 'opacity-0 sm:group-hover:opacity-100'
                      }`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                      </div>
                      <div className="relative flex flex-col items-center gap-1">
                        {isSelected && <Check className="w-3 h-3 lg:w-4 lg:h-4 absolute -top-1 -right-1" />}
                        <span>{brand}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2 lg:gap-3 pt-2">
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none sm:w-auto text-xs lg:text-base" onClick={() => {
                  setStep(0);
                  setSelectedBrand("");
                  setSelectedIssues([]);
                  setImagePreview(null);
                  setFormData(prev => ({ ...prev, image: null, description: "" }));
                }}>
                  <ArrowLeft className="w-3 h-3 lg:w-5 lg:h-5 mr-1" />
                  Back
                </Button>
                <Button
                  variant="hero"
                  size="sm"
                  className="flex-[2] sm:flex-1 text-xs lg:text-base"
                  disabled={!selectedBrand}
                  onClick={() => setStep(2)}
                >
                  Continue
                  <ArrowRight className="w-3 h-3 lg:w-5 lg:h-5 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Issue Selection */}
          {step === 2 && (
            <div className="space-y-4 sm:space-y-6 p-4 sm:p-8">
              {/* Header with floating count */}
              <div className="text-center relative">
                <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-full px-4 py-1.5 mb-3">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-medium text-primary">Step 3 of 5</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                  What needs fixing?
                </h2>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Tap to select • Pick multiple if needed
                </p>
              </div>

              {/* Service cards — innovative stacked layout */}
              <div className="space-y-2.5 sm:space-y-3">
                {repairIssues.map((issue) => {
                  const isSelected = selectedIssues.includes(issue.label);
                  return (
                    <button
                      key={issue.label}
                      onClick={() => toggleIssue(issue.label)}
                      className={`w-full flex items-center gap-3 sm:gap-4 rounded-2xl border-2 p-3 sm:p-4 text-left transition-all duration-300 group ${
                        isSelected
                          ? "border-primary bg-gradient-to-r from-primary/5 via-primary/3 to-transparent shadow-lg shadow-primary/10 scale-[1.01]"
                          : "border-transparent bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:border-gray-200"
                      }`}
                    >
                      {/* Icon */}
                      <div className={`relative shrink-0 h-11 w-11 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? "bg-primary text-white shadow-md shadow-primary/30 rotate-0"
                          : "bg-white dark:bg-gray-800 text-gray-400 group-hover:text-primary group-hover:shadow-sm border border-gray-100 dark:border-gray-700"
                      }`}>
                        <issue.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm sm:text-base font-semibold truncate transition-colors ${
                            isSelected ? "text-primary" : "text-foreground"
                          }`}>
                            {issue.label}
                          </p>
                          {issue.price === "Free Checkup" && (
                            <span className="shrink-0 text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-1.5 py-0.5 rounded-md uppercase tracking-wide">
                              Free
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] sm:text-xs text-muted-foreground truncate">
                          {issue.description}
                        </p>
                      </div>

                      {/* Price + check */}
                      <div className="shrink-0 flex items-center gap-2.5">
                        <span className={`hidden sm:block text-xs font-semibold transition-colors ${
                          isSelected ? "text-primary" : "text-muted-foreground"
                        }`}>
                          {issue.price}
                        </span>
                        <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          isSelected
                            ? "border-primary bg-primary text-white scale-110"
                            : "border-gray-300 dark:border-gray-600 group-hover:border-primary/40"
                        }`}>
                          {isSelected && <Check className="h-3.5 w-3.5" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected count badge */}
              {selectedIssues.length > 0 && (
                <div className="flex items-center justify-center">
                  <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                    <Check className="h-3.5 w-3.5" />
                    {selectedIssues.length} service{selectedIssues.length > 1 ? "s" : ""} selected
                  </div>
                </div>
              )}

              {/* Image Upload — compact */}
              <label
                htmlFor="issue-image-upload"
                className="relative flex items-center gap-3 p-3 sm:p-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl hover:border-primary/40 hover:bg-primary/[0.02] transition-all duration-200 cursor-pointer group"
              >
                <input
                  type="file"
                  id="issue-image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {imagePreview ? (
                  <div className="flex items-center gap-3 w-full">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <ImageIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">
                        {formData.image?.name || "Image uploaded"}
                      </p>
                      <p className="text-[11px] text-primary">Tap to change</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setImagePreview(null);
                        setFormData(prev => ({ ...prev, image: null }));
                        const input = document.getElementById('issue-image-upload') as HTMLInputElement;
                        if (input) input.value = '';
                      }}
                      className="text-xs text-destructive hover:underline font-medium shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="h-10 w-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                      <Upload className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-foreground">
                        Attach a photo <span className="text-muted-foreground font-normal">(optional)</span>
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Helps us diagnose faster
                      </p>
                    </div>
                  </>
                )}
              </label>

              <div className="flex gap-2 lg:gap-3">
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none sm:w-auto text-xs lg:text-sm lg:text-base" onClick={() => {
                  setStep(1);
                  setSelectedIssues([]);
                  setImagePreview(null);
                  setFormData(prev => ({ ...prev, image: null }));
                }}>
                  <ArrowLeft className="w-3 h-3 lg:w-5 lg:h-5 mr-1" />
                  Back
                </Button>
                <Button
                  variant="hero"
                  size="sm"
                  className="flex-[2] sm:flex-1 text-xs lg:text-sm lg:text-base"
                  disabled={selectedIssues.length === 0}
                  onClick={() => setStep(3)}
                >
                  Continue
                  <ArrowRight className="w-3 h-3 lg:w-5 lg:h-5 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Details & Address */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                  Your Details & Address
                </h2>
                <p className="text-muted-foreground">
                  Enter your contact information and select delivery address.
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

                {/* Address Selection */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Pickup/Delivery Address
                  </label>
                  
                  {/* Saved Addresses */}
                  <div className="space-y-2 mb-3">
                    {savedAddresses.map((addr) => (
                      <button
                        key={addr.id}
                        onClick={() => {
                          setSelectedAddressId(addr.id);
                          setUseNewAddress(false);
                        }}
                        className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                          selectedAddressId === addr.id && !useNewAddress
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <MapPin className={`w-5 h-5 mt-0.5 ${
                            selectedAddressId === addr.id && !useNewAddress
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant={addr.isDefault ? "default" : "outline"} className="text-xs">
                                {addr.type}
                              </Badge>
                              {addr.isDefault && (
                                <Badge className="text-xs gradient-hero border-0 text-primary-foreground">
                                  Default
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm font-medium text-foreground">{addr.address}</p>
                            <p className="text-xs text-muted-foreground">
                              {addr.city}, {addr.state} - {addr.pincode}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}

                    {/* Add New Address Option */}
                    <button
                      onClick={() => setUseNewAddress(true)}
                      className={`w-full p-3 rounded-lg border-2 transition-all ${
                        useNewAddress
                          ? "border-primary bg-primary/10"
                          : "border-dashed border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          useNewAddress
                            ? "gradient-hero text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          <Plus className="w-5 h-5" />
                        </div>
                        <span className={`font-medium ${
                          useNewAddress ? "text-primary" : "text-foreground"
                        }`}>
                          Add New Address
                        </span>
                      </div>
                    </button>
                  </div>

                  {/* New Address Form */}
                  {useNewAddress && (
                    <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Street Address</label>
                        <Textarea
                          placeholder="Flat/House No., Building, Street"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          rows={2}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div ref={stateInputRef} className="relative">
                          <label className="text-sm font-medium mb-1 block">State</label>
                          <Input
                            placeholder="Type to search state..."
                            value={formData.state}
                            onChange={(e) => {
                              setFormData({ ...formData, state: e.target.value, city: "" });
                              setShowStateSuggestions(true);
                              setShowDistrictSuggestions(false);
                            }}
                            onFocus={() => setShowStateSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowStateSuggestions(false), 200)}
                          />
                          {showStateSuggestions && (
                            <div className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto rounded-md border bg-popover shadow-lg">
                              {allStates
                                .filter(s => s.toLowerCase().includes(formData.state.toLowerCase()))
                                .map(state => (
                                  <div
                                    key={state}
                                    className="px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                                    onMouseDown={() => {
                                      setFormData({ ...formData, state, city: "" });
                                      setShowStateSuggestions(false);
                                    }}
                                  >
                                    {state}
                                  </div>
                                ))}
                              {allStates.filter(s => s.toLowerCase().includes(formData.state.toLowerCase())).length === 0 && (
                                <div className="px-3 py-2 text-sm text-muted-foreground">No states found</div>
                              )}
                            </div>
                          )}
                        </div>
                        <div ref={districtInputRef} className="relative">
                          <label className="text-sm font-medium mb-1 block">District</label>
                          <Input
                            placeholder={formData.state ? "Type to search district..." : "Select state first"}
                            value={formData.city}
                            onChange={(e) => {
                              setFormData({ ...formData, city: e.target.value });
                              setShowDistrictSuggestions(true);
                            }}
                            onFocus={() => formData.state && setShowDistrictSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowDistrictSuggestions(false), 200)}
                            disabled={!formData.state}
                          />
                          {showDistrictSuggestions && formData.state && (
                            <div className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto rounded-md border bg-popover shadow-lg">
                              {(indianStatesAndDistricts[formData.state] || [])
                                .filter(d => d.toLowerCase().includes(formData.city.toLowerCase()))
                                .map(district => (
                                  <div
                                    key={district}
                                    className="px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                                    onMouseDown={() => {
                                      setFormData({ ...formData, city: district });
                                      setShowDistrictSuggestions(false);
                                    }}
                                  >
                                    {district}
                                  </div>
                                ))}
                              {(indianStatesAndDistricts[formData.state] || []).filter(d => d.toLowerCase().includes(formData.city.toLowerCase())).length === 0 && (
                                <div className="px-3 py-2 text-sm text-muted-foreground">No districts found</div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Pincode</label>
                        <Input
                          placeholder="6-digit pincode"
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          maxLength={6}
                        />
                      </div>
                    </div>
                  )}
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

              {/* Booking Summary */}
              <div className="p-5 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-primary/20 space-y-3 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">Booking Summary</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Device Type:</span>
                    <span className="text-foreground font-semibold">{deviceType === "laptop" ? "Laptop" : "Desktop PC"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Brand:</span>
                    <span className="text-foreground font-semibold">{selectedBrand}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Issues:</span>
                    <Badge className="gradient-hero border-0 text-primary-foreground">{selectedIssues.length} selected</Badge>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-3 pt-2">
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none sm:w-auto text-xs lg:text-base" onClick={() => setStep(2)}>
                  <ArrowLeft className="w-3 h-3 lg:w-5 lg:h-5" />
                  Back
                </Button>
                <Button
                  variant="hero"
                  size="sm"
                  className="flex-[2] sm:flex-1 text-xs lg:text-base"
                  disabled={
                    !formData.name ||
                    !formData.phone ||
                    (!selectedAddressId && !useNewAddress) ||
                    (useNewAddress && (!formData.address || !formData.city || !formData.state || !formData.pincode))
                  }
                  onClick={() => setStep(4)}
                >
                  Continue
                  <ArrowRight className="w-3 h-3 lg:w-5 lg:h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="space-y-4 lg:space-y-6 p-4 lg:p-6">
              <div>
                <h2 className="text-xl lg:text-2xl font-display font-bold text-foreground mb-2">
                  Review & Confirm
                </h2>
                <p className="text-sm lg:text-base text-muted-foreground">
                  Please review your booking details before confirming.
                </p>
              </div>

              {/* Price Summary */}
              <div className="p-4 lg:p-6 bg-gradient-to-br from-accent/10 to-primary/5 rounded-lg lg:rounded-xl border-2 border-accent/30 shadow-lg">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <div>
                    <p className="text-xs lg:text-sm text-muted-foreground mb-1">Estimated Price Range</p>
                    <p className="text-xl lg:text-2xl font-display font-bold text-foreground">
                      {deviceType === "laptop" ? "₹799 - ₹7,999" : "₹999 - ₹9,999"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 lg:p-3 bg-accent/20 rounded-lg">
                  <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-xs lg:text-sm font-semibold text-accent">90 Days Warranty</p>
                    <p className="text-xs text-muted-foreground">On all repairs & parts</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-3 pt-2">
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none sm:w-auto text-xs lg:text-base" onClick={() => setStep(2)}>
                  <ArrowLeft className="w-3 h-3 lg:w-5 lg:h-5" />
                  Back
                </Button>
                <Button
                  variant="hero"
                  size="sm"
                  className="flex-[2] sm:flex-1 text-xs lg:text-base"
                  onClick={handleSubmit}
                >
                  Book Repair Now
                  <ArrowRight className="w-3 h-3 lg:w-5 lg:h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <div className="relative text-center py-16 px-8 space-y-8 animate-in fade-in duration-300 overflow-hidden">
              {/* Background decoration - simplified */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-success/5" />
              
              <div className="relative z-10">
                {/* Success Icon - simplified animations */}
                <div className="relative inline-block mb-6">
                  <div className="w-28 h-28 rounded-full gradient-hero flex items-center justify-center mx-auto shadow-2xl">
                    <Check className="w-14 h-14 text-primary-foreground" />
                  </div>
                </div>

                {/* Success Message */}
                <div className="space-y-4 mb-8">
                  <h2 className="text-4xl font-display font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Booking Confirmed!
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                    Excellent choice! Our expert technicians are ready to help.
                  </p>
                </div>

                {/* Contact Info Card */}
                <div className="max-w-md mx-auto space-y-4">
                  {/* OTP Display */}
                  {bookingOtp ? (
                    <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-300 shadow-lg">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="text-3xl">🔐</span>
                        <p className="font-bold text-blue-900 text-xl">Your Service OTP</p>
                      </div>
                      <p className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-blue-600 tracking-widest mb-3">{bookingOtp}</p>
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <p className="text-sm text-blue-900 font-semibold mb-1">IMPORTANT: Save This OTP</p>
                        <p className="text-xs text-blue-800">You'll need to share this OTP with the technician to verify service completion</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-300">
                      <p className="text-sm text-yellow-800">Debug: OTP is empty or undefined</p>
                    </div>
                  )}

                  <div className="p-6 bg-gradient-to-br from-card to-card/50 rounded-2xl border-2 border-primary/20 shadow-xl">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center">
                        <span className="text-xl">📞</span>
                      </div>
                      <p className="text-sm font-semibold text-muted-foreground">We'll Contact You At</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xl sm:text-2xl font-bold text-foreground text-center leading-tight break-all sm:break-words">
                        {formData.name}
                      </p>
                      <p className="text-base sm:text-lg font-semibold text-primary text-center break-all sm:break-normal">
                        {formData.phone}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex items-center justify-center gap-2 text-accent">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <p className="text-sm font-medium">Expected call within 2 hours</p>
                      </div>
                    </div>
                  </div>

                  {/* Service Summary */}
                  <div className="p-5 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl border border-border/50">
                    <p className="text-xs font-semibold text-muted-foreground mb-3">BOOKING SUMMARY</p>
                    <div className="space-y-2 text-sm">
                      {bookingId && (
                        <div className="flex justify-between pb-2 border-b border-border">
                          <span className="text-muted-foreground">Booking ID:</span>
                          <span className="font-bold text-foreground">{bookingId}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Device:</span>
                        <span className="font-semibold text-foreground">{deviceType === "laptop" ? "Laptop" : "Desktop PC"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Brand:</span>
                        <span className="font-semibold text-foreground">{selectedBrand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Issues:</span>
                        <span className="font-semibold text-foreground">{selectedIssues.length} selected</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 max-w-md mx-auto mt-8">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    onClick={() => {
                      onClose();
                      setStep(0);
                      setDeviceType("");
                      setSelectedBrand("");
                      setSelectedIssues([]);
                      setBookingOtp("");
                      setBookingId("");
                    }} 
                    className="w-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg py-6"
                  >
                    Perfect! Close
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => {
                      setStep(0);
                      setDeviceType("");
                      setSelectedBrand("");
                      setSelectedIssues([]);
                      setBookingOtp("");
                      setBookingId("");
                    }} 
                    className="w-full border-2 hover:bg-primary/5 transition-all duration-300"
                  >
                    Book Another Repair
                  </Button>
                </div>

                {/* Trust Badge */}
                <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground">
                  <Shield className="w-5 h-5 text-primary" />
                  <p className="text-sm font-medium">90-Day Warranty â€¢ Expert Technicians â€¢ Free Diagnosis</p>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

