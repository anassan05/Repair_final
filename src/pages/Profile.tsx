import { useState, useEffect, useRef, useMemo } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Crown, 
  Calendar,
  Wrench,
  Star,
  TrendingUp,
  Save,
  X,
  Zap,
  Plus,
  Trash2,
  Edit,
  Info,
  LogOut,
  Moon,
  Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useNavigate } from "react-router-dom";
import { indianStatesAndDistricts, allStates } from "@/data/indianLocations";
import { useToast } from "@/hooks/use-toast";

const USER_BOOKINGS_KEY = "userBookings";
const LEGACY_DUMMY_ADDRESS_KEYS = new Set([
  "home|123 tech street, bangalore|bangalore|karnataka|560001",
  "office|45 business park, mg road|bangalore|karnataka|560002",
]);

const normalizeAddressKey = (address: {
  type?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}) =>
  [address.type, address.address, address.city, address.state, address.pincode]
    .map((value) => String(value ?? "").trim().toLowerCase())
    .join("|");

const isAddressLike = (
  value: unknown
): value is { type?: string; address?: string; city?: string; state?: string; pincode?: string } =>
  !!value && typeof value === "object";

const sanitizeLegacyAddresses = (addresses: unknown) => {
  if (!Array.isArray(addresses)) return [];
  return addresses.filter((address) => {
    if (!isAddressLike(address)) return false;
    return !LEGACY_DUMMY_ADDRESS_KEYS.has(normalizeAddressKey(address));
  });
};

// Mock user data
const initialUserData = {
  name: "Mohammed Anas",
  email: "mohammed.anas@example.com",
  phone: "+91 98765 43210",
  addresses: [],
  memberSince: "January 2025",
  membership: {
    plan: "Pro",
    status: "Active",
    renewalDate: "January 15, 2027",
    usedDiagnostics: 1,
    totalDiagnostics: 3,
  },
  stats: {
    totalRepairs: 8,
    totalSpent: "₹24,850",
    savedAmount: "₹4,970",
    avgRating: 4.8,
  },
};

const getInitialProfile = (currentUser: { name: string; phone: string }) => {
  const stored = sessionStorage.getItem("userProfile");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        addresses: sanitizeLegacyAddresses(parsed?.addresses),
      };
    } catch (e) {}
  }

  let sessionUserEmail = initialUserData.email;
  const sessionUserRaw = sessionStorage.getItem("user");
  if (sessionUserRaw) {
    try {
      const sessionUser = JSON.parse(sessionUserRaw);
      if (sessionUser?.email) {
        sessionUserEmail = sessionUser.email;
      }
    } catch (e) {}
  }

  return {
    ...initialUserData,
    name: currentUser.name || initialUserData.name,
    phone: currentUser.phone || initialUserData.phone,
    email: sessionUserEmail,
  };
};

const getStoredBookingsForUser = (phone: string) => {
  const storedBookingsRaw = sessionStorage.getItem(USER_BOOKINGS_KEY);
  if (!storedBookingsRaw) return [];

  try {
    const parsed = JSON.parse(storedBookingsRaw);
    const allBookings = Array.isArray(parsed) ? parsed : [];
    return allBookings.filter((booking: any) => {
      if (!booking || typeof booking !== "object") return false;
      if (booking.customerPhone) return booking.customerPhone === phone;
      return true;
    });
  } catch {
    return [];
  }
};

const parseCurrencyValue = (value: unknown): number => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return 0;

  const normalized = value
    .replace(/â‚¹|₹|INR/gi, "")
    .replace(/[^\d.-]/g, "");

  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatINR = (amount: number): string =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const normalizeAmountDisplay = (value: unknown): string => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return formatINR(value);
  }
  if (typeof value !== "string") return "₹0";
  return value.replace(/â‚¹/g, "₹").trim();
};

interface Address {
  id: number;
  type: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface ProfileProps {
  currentUser: { name: string; phone: string };
  onLogout: () => void;
}

const Profile = ({ currentUser, onLogout }: ProfileProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState(() => getInitialProfile(currentUser));
  const [editedData, setEditedData] = useState(userData);
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [selectedRepair, setSelectedRepair] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [newAddress, setNewAddress] = useState<Address>({
    id: 0,
    type: "Home",
    address: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });
  const [bookings, setBookings] = useState<any[]>([]);
  const [repairFilter, setRepairFilter] = useState<"all" | "active" | "completed">("active");
  const [showStateSuggestions, setShowStateSuggestions] = useState(false);
  const [showDistrictSuggestions, setShowDistrictSuggestions] = useState(false);
  const stateInputRef = useRef<HTMLDivElement>(null);
  const districtInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('theme', next);
  };

  // Save profile to sessionStorage whenever userData changes
  useEffect(() => {
    sessionStorage.setItem('userProfile', JSON.stringify(userData));
  }, [userData]);

  // Load addresses from sessionStorage (not merged with dummy)
  useEffect(() => {
    const savedAddressesFromStorage = sessionStorage.getItem('userAddresses');
    if (savedAddressesFromStorage) {
      try {
        const savedAddresses = JSON.parse(savedAddressesFromStorage);
        const cleanedAddresses = sanitizeLegacyAddresses(savedAddresses);
        setUserData(prev => ({ ...prev, addresses: cleanedAddresses }));
        sessionStorage.setItem('userAddresses', JSON.stringify(cleanedAddresses));
      } catch (e) {}
    }
  }, []);

  // Load persisted booking history for this user
  useEffect(() => {
    const refreshBookings = () => {
      setBookings(getStoredBookingsForUser(currentUser.phone));
    };

    const handleStorage = (event: StorageEvent) => {
      if (!event.key || event.key === USER_BOOKINGS_KEY) {
        refreshBookings();
      }
    };

    refreshBookings();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", refreshBookings);
    window.addEventListener("bookings-updated", refreshBookings);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", refreshBookings);
      window.removeEventListener("bookings-updated", refreshBookings);
    };
  }, [currentUser.phone]);

  const liveStats = useMemo(() => {
    const totalRepairs = bookings.length;
    const totalSpentValue = bookings.reduce(
      (total, booking) => total + parseCurrencyValue(booking?.cost),
      0
    );
    const totalSavedValue = bookings.reduce(
      (total, booking) => total + parseCurrencyValue(booking?.discount),
      0
    );

    return {
      totalRepairs,
      totalSpent: formatINR(totalSpentValue),
      savedAmount: formatINR(totalSavedValue),
    };
  }, [bookings]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(userData);
  };

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile changes were saved successfully.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(userData);
  };

  const resetAddressForm = () => {
    setNewAddress({
      id: 0,
      type: "Home",
      address: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: false,
    });
    setIsAddingAddress(false);
    setEditingAddressId(null);
  };

  const handleAddAddress = () => {
    const addressToAdd = {
      ...newAddress,
      id: Math.max(...userData.addresses.map(a => a.id), 0) + 1,
      isDefault: userData.addresses.length === 0,
    };

    setUserData(prev => {
      const updated = { ...prev, addresses: [...prev.addresses, addressToAdd] };
      sessionStorage.setItem('userAddresses', JSON.stringify(updated.addresses));
      return updated;
    });
    resetAddressForm();
    toast({
      title: "Address saved",
      description: "New address added successfully.",
    });
  };

  const handleDeleteAddress = (id: number) => {
    setUserData(prev => {
      const updated = { ...prev, addresses: prev.addresses.filter(a => a.id !== id) };
      sessionStorage.setItem('userAddresses', JSON.stringify(updated.addresses));
      return updated;
    });
    toast({
      title: "Address removed",
      description: "Address deleted successfully.",
    });
  };

  const handleSetDefault = (id: number) => {
    setUserData(prev => {
      const updated = {
        ...prev,
        addresses: prev.addresses.map(a => ({
          ...a,
          isDefault: a.id === id,
        }))
      };
      sessionStorage.setItem('userAddresses', JSON.stringify(updated.addresses));
      return updated;
    });
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddressId(address.id);
    setNewAddress(address);
    setIsAddingAddress(true);
  };

  const handleUpdateAddress = () => {
    if (!editingAddressId) return;

    setUserData(prev => {
      const updated = {
        ...prev,
        addresses: prev.addresses.map(a => (a.id === editingAddressId ? newAddress : a)),
      };
      sessionStorage.setItem('userAddresses', JSON.stringify(updated.addresses));
      return updated;
    });
    resetAddressForm();
    toast({
      title: "Address updated",
      description: "Address changes were saved successfully.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 border-green-200 hover:bg-green-100";
      case "Active":
        return "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100";
      case "Pending":
        return "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10";
      default:
        return "bg-muted text-muted-foreground border-border hover:bg-muted";
    }
  };

  return (
    <div className="min-h-screen relative z-[1] text-foreground flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Profile Header */}
          <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-4">
              <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-xl gradient-hero flex items-center justify-center">
                    <User className="w-6 h-6 sm:w-10 sm:h-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-8 sm:h-8 rounded-full gradient-hero flex items-center justify-center border-2 border-card">
                    <Crown className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-primary-foreground" />
                  </div>
                </div>
                <div className="min-w-0">
                  <h1 className="text-base sm:text-2xl font-display font-bold text-foreground mb-1 leading-tight truncate">
                    {userData.name}
                  </h1>
                  <Badge className="gradient-hero border-0 text-primary-foreground text-xs sm:text-sm">
                    {userData.membership.plan} Member
                  </Badge>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:flex-row sm:justify-end sm:self-start">
              {!isEditing ? (
                <Button onClick={handleEdit} className="flex-1 sm:flex-initial">Edit Profile</Button>
              ) : (
                <>
                  <Button onClick={handleSave} variant="hero" className="flex-1 sm:flex-initial">
                    <Save className="w-4 h-4" />
                    <span className="hidden sm:inline">Save</span>
                  </Button>
                  <Button onClick={handleCancel} variant="outline" className="flex-1 sm:flex-initial">
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline">Cancel</span>
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="w-10 h-10 p-0 flex items-center justify-center"
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
                <Button onClick={onLogout} variant="outline" className="flex-1 sm:flex-initial">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>

            {!isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground min-w-0">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{userData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground sm:justify-end min-w-0">
                  <Phone className="w-4 h-4" />
                  <span className="truncate">{userData.phone}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Name</label>
                    <Input
                      value={editedData.name}
                      onChange={(e) => setEditedData({...editedData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <Input
                      type="email"
                      value={editedData.email}
                      onChange={(e) => setEditedData({...editedData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Phone</label>
                    <Input
                      value={editedData.phone}
                      onChange={(e) => setEditedData({...editedData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <Card className="p-2 sm:p-4">
              <div className="flex flex-col items-center text-center sm:flex-row sm:text-left gap-1 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm sm:text-xl font-bold">{liveStats.totalRepairs}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Repairs</p>
                </div>
              </div>
            </Card>
            <Card className="p-2 sm:p-4">
              <div className="flex flex-col items-center text-center sm:flex-row sm:text-left gap-1 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm sm:text-xl font-bold">{liveStats.totalSpent}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Spent</p>
                </div>
              </div>
            </Card>
            <Card className="p-2 sm:p-4">
              <div className="flex flex-col items-center text-center sm:flex-row sm:text-left gap-1 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm sm:text-xl font-bold">{liveStats.savedAmount}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Saved</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Membership Card */}
          <Card className="p-4 sm:p-6 mb-4 sm:mb-6 border-primary/30">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-warning" />
                  <h2 className="text-lg sm:text-xl font-display font-bold">
                    {userData.membership.plan} Membership
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Active until {userData.membership.renewalDate}
                </p>
              </div>
              <Button onClick={() => navigate('/membership')} className="w-full sm:w-auto" size="sm">
                Upgrade Plan
              </Button>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Free Diagnostics Used</span>
                <span className="text-sm font-bold">
                  {userData.membership.usedDiagnostics} / {userData.membership.totalDiagnostics}
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full gradient-hero transition-all"
                  style={{ width: `${(userData.membership.usedDiagnostics / userData.membership.totalDiagnostics) * 100}%` }}
                />
              </div>
            </div>
          </Card>

          {/* Addresses Section */}
          <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h2 className="text-lg sm:text-xl font-display font-bold">
                Saved Addresses ({userData.addresses.length})
              </h2>
              <Button 
                onClick={() => {
                  setIsAddingAddress(true);
                  setEditingAddressId(null);
                }}
                size="sm"
                className="w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Address</span>
              </Button>
            </div>

            {/* Add/Edit Address Form */}
            {isAddingAddress && (
              <Card className="p-3 sm:p-4 mb-3 sm:mb-4 border-2 border-primary/30">
                <h3 className="text-sm sm:text-base font-semibold mb-3">
                  {editingAddressId ? "Edit Address" : "New Address"}
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs sm:text-sm font-medium mb-1 block">Address Type</label>
                    <div className="flex gap-2">
                      {["Home", "Office", "Other"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setNewAddress({ ...newAddress, type })}
                          className={`flex-1 px-3 py-2 rounded-lg border-2 text-xs sm:text-sm font-medium transition-all ${
                            newAddress.type === type
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Street Address</label>
                    <Textarea
                      placeholder="Flat/House No., Building Name, Street"
                      value={newAddress.address}
                      onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div ref={stateInputRef} className="relative">
                      <label className="text-sm font-medium mb-1 block">State</label>
                      <Input
                        placeholder="Type to search state..."
                        value={newAddress.state}
                        onChange={(e) => {
                          setNewAddress({ ...newAddress, state: e.target.value, city: "" });
                          setShowStateSuggestions(true);
                          setShowDistrictSuggestions(false);
                        }}
                        onFocus={() => setShowStateSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowStateSuggestions(false), 200)}
                      />
                      {showStateSuggestions && (
                        <div className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto rounded-md border bg-popover shadow-lg">
                          {allStates
                            .filter(s => s.toLowerCase().includes(newAddress.state.toLowerCase()))
                            .map(state => (
                              <div
                                key={state}
                                className="px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                                onMouseDown={() => {
                                  setNewAddress({ ...newAddress, state, city: "" });
                                  setShowStateSuggestions(false);
                                }}
                              >
                                {state}
                              </div>
                            ))}
                          {allStates.filter(s => s.toLowerCase().includes(newAddress.state.toLowerCase())).length === 0 && (
                            <div className="px-3 py-2 text-sm text-muted-foreground">No states found</div>
                          )}
                        </div>
                      )}
                    </div>
                    <div ref={districtInputRef} className="relative">
                      <label className="text-sm font-medium mb-1 block">District</label>
                      <Input
                        placeholder={newAddress.state ? "Type to search district..." : "Select state first"}
                        value={newAddress.city}
                        onChange={(e) => {
                          setNewAddress({ ...newAddress, city: e.target.value });
                          setShowDistrictSuggestions(true);
                        }}
                        onFocus={() => newAddress.state && setShowDistrictSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowDistrictSuggestions(false), 200)}
                        disabled={!newAddress.state}
                      />
                      {showDistrictSuggestions && newAddress.state && (
                        <div className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto rounded-md border bg-popover shadow-lg">
                          {(indianStatesAndDistricts[newAddress.state] || [])
                            .filter(d => d.toLowerCase().includes(newAddress.city.toLowerCase()))
                            .map(district => (
                              <div
                                key={district}
                                className="px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                                onMouseDown={() => {
                                  setNewAddress({ ...newAddress, city: district });
                                  setShowDistrictSuggestions(false);
                                }}
                              >
                                {district}
                              </div>
                            ))}
                          {(indianStatesAndDistricts[newAddress.state] || []).filter(d => d.toLowerCase().includes(newAddress.city.toLowerCase())).length === 0 && (
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
                      value={newAddress.pincode}
                      onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                      maxLength={6}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={editingAddressId ? handleUpdateAddress : handleAddAddress}
                      disabled={!newAddress.address || !newAddress.city || !newAddress.state || !newAddress.pincode}
                      className="flex-1"
                    >
                      <Save className="w-4 h-4" />
                      {editingAddressId ? "Update" : "Save"} Address
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsAddingAddress(false);
                        setEditingAddressId(null);
                        setNewAddress({
                          id: 0,
                          type: "Home",
                          address: "",
                          city: "",
                          state: "",
                          pincode: "",
                          isDefault: false,
                        });
                      }}
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Address List */}
            <div className="space-y-3">
              {userData.addresses.map((address) => (
                <Card
                  key={address.id}
                  className={`p-3 sm:p-4 ${
                    address.isDefault ? "border-2 border-primary/50" : "border border-border"
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge variant={address.isDefault ? "default" : "outline"} className="text-xs">
                          {address.type}
                        </Badge>
                        {address.isDefault && (
                          <Badge className="gradient-hero border-0 text-primary-foreground text-xs">
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-foreground mb-1">{address.address}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditAddress(address)}
                        className="flex-1 sm:flex-initial"
                      >
                        <Edit className="w-4 h-4" />
                        <span className="ml-1 sm:hidden">Edit</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteAddress(address.id)}
                        className="flex-1 sm:flex-initial"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="ml-1 sm:hidden">Delete</span>
                      </Button>
                    </div>
                  </div>
                  {!address.isDefault && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full mt-3"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      Set as Default
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          </Card>

          {/* Repair History */}
          <Card className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h2 className="text-lg sm:text-xl font-display font-bold">
                Repair History ({bookings.length})
              </h2>
              <div className="inline-flex items-center gap-1 p-1 bg-muted rounded-lg">
                <button
                  onClick={() => setRepairFilter("active")}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    repairFilter === "active"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setRepairFilter("completed")}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    repairFilter === "completed"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setRepairFilter("all")}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    repairFilter === "all"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {bookings
                .filter((repair) => {
                  if (repairFilter === "all") return true;
                  if (repairFilter === "active") return repair.status.toLowerCase() !== "completed";
                  return repair.status.toLowerCase() === "completed";
                })
                .map((repair) => (
                <div 
                  key={repair.id} 
                  className="p-3 sm:p-4 border border-border rounded-lg"
                  onClick={() => {
                    setSelectedRepair(repair);
                    setDetailsOpen(true);
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="text-sm sm:text-base font-semibold">{repair.device}</h4>
                        <Badge className={getStatusColor(repair.status) + " text-xs pointer-events-none"}>
                          {repair.status}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">{repair.issue}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-base sm:text-lg font-bold">{normalizeAmountDisplay(repair.cost)}</p>
                      {repair.discount && normalizeAmountDisplay(repair.discount) !== "₹0" && (
                        <p className="text-xs text-accent">Saved {normalizeAmountDisplay(repair.discount)}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        {new Date(repair.date).toLocaleDateString()}
                      </span>
                      <span className="text-xs">ID: {repair.id}</span>
                    </div>
                    {repair.rating > 0 && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < repair.rating
                                ? "fill-warning text-warning"
                                : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRepair(repair);
                      setDetailsOpen(true);
                    }}
                  >
                    <Info className="w-3 h-3 mr-1" />
                    View Full Details
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>

      {/* Repair Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Repair Details</DialogTitle>
            <DialogDescription>Complete information about your repair</DialogDescription>
          </DialogHeader>
          {selectedRepair && (
            <div className="space-y-4">
              {/* Show OTP first if available */}
              {selectedRepair.otp && (
                <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-300 shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-3xl">🔐</span>
                    <p className="font-bold text-blue-900 text-xl">Your Service OTP</p>
                  </div>
                  <p className="text-4xl sm:text-5xl font-mono font-bold text-blue-600 tracking-wider mb-3">{selectedRepair.otp}</p>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <p className="text-sm text-blue-900 font-semibold mb-1">IMPORTANT: Save This OTP</p>
                    <p className="text-xs text-blue-800">Share this with the worker to verify service completion</p>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Booking ID</p>
                  <p className="font-mono">{selectedRepair.id}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Status</p>
                  <Badge className={getStatusColor(selectedRepair.status)}>
                    {selectedRepair.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Device</p>
                  <p>{selectedRepair.device}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Date</p>
                  <p>{new Date(selectedRepair.date).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">Issue Description</p>
                <p className="text-sm">{selectedRepair.issue}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Cost</p>
                  <p className="text-lg font-bold">{normalizeAmountDisplay(selectedRepair.cost)}</p>
                </div>
                {selectedRepair.discount && normalizeAmountDisplay(selectedRepair.discount) !== "₹0" && (
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Discount Applied</p>
                    <p className="text-lg font-bold text-accent">{normalizeAmountDisplay(selectedRepair.discount)}</p>
                  </div>
                )}
              </div>

              {selectedRepair.rating > 0 && (
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Your Rating</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < selectedRepair.rating
                            ? "fill-warning text-warning"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setDetailsOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Profile;



