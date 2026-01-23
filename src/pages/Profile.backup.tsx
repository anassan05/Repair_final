import { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Crown, 
  Calendar,
  CheckCircle2,
  Wrench,
  Shield,
  Star,
  TrendingUp,
  Save,
  X,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useNavigate } from "react-router-dom";

// Mock user data
const initialUserData = {
  name: "Mohammed Anas",
  email: "mohammed.anas@example.com",
  phone: "+91 98765 43210",
  address: "123 Tech Street, Bangalore, Karnataka 560001",
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

const repairHistory = [
  {
    id: "REP-2026-001",
    device: "Laptop - Dell Inspiron",
    issue: "Screen Replacement",
    date: "2026-01-05",
    status: "Completed",
    cost: "₹3,499",
    discount: "₹700",
    rating: 5,
  },
  {
    id: "REP-2025-087",
    device: "Desktop PC - Custom Build",
    issue: "Graphics Card Upgrade",
    date: "2025-12-20",
    status: "Completed",
    cost: "₹5,999",
    discount: "₹1,200",
    rating: 5,
  },
  {
    id: "REP-2025-065",
    device: "Laptop - HP Pavilion",
    issue: "Battery Replacement",
    date: "2025-11-15",
    status: "Completed",
    cost: "₹2,799",
    discount: "₹560",
    rating: 4,
  },
];

const Profile = () => {
  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);
  const navigate = useNavigate();

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(userData);
  };

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(userData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-accent/10 text-accent border-accent/20";
      case "In Progress":
        return "bg-warning/10 text-warning border-warning/20";
      case "Scheduled":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="max-w-6xl mx-auto mb-8">
            <Card className="p-6 lg:p-8 border-border shadow-card">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl gradient-hero flex items-center justify-center">
                    <User className="w-12 h-12 text-primary-foreground" />
                  </div>
                  {userData.membership.status === "Active" && (
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full gradient-hero flex items-center justify-center border-4 border-card shadow-lg">
                      <Crown className="w-5 h-5 text-primary-foreground" />
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
                      {userData.name}
                    </h1>
                    <Badge className={`${userData.membership.status === "Active" ? "gradient-hero border-0 text-primary-foreground" : ""}`}>
                      {userData.membership.plan} Member
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {userData.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {userData.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {userData.address}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Member since {userData.memberSince}
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <Button variant="outline" size="lg">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              </div>
            </Card>
          </div>

          {/* Stats Overview */}
          <div className="max-w-6xl mx-auto mb-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6 border-border shadow-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">
                    {userData.stats.totalRepairs}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Repairs</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border shadow-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">
                    {userData.stats.totalSpent}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border shadow-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">
                    {userData.stats.savedAmount}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Saved</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border shadow-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">
                    {userData.stats.avgRating}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="membership">Membership</TabsTrigger>
                <TabsTrigger value="repairs">Repair History</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Active Membership Card */}
                <Card className="p-6 lg:p-8 border-primary/30 shadow-glow relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 gradient-hero opacity-10 rounded-full blur-3xl" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Crown className="w-6 h-6 text-warning" />
                          <h2 className="text-2xl font-display font-bold text-foreground">
                            {userData.membership.plan} Membership
                          </h2>
                        </div>
                        <p className="text-muted-foreground">
                          Active until {userData.membership.renewalDate}
                        </p>
                      </div>
                      <Badge className="bg-accent/10 text-accent border-accent/20">
                        {userData.membership.status}
                      </Badge>
                    </div>

                    {/* Usage Stats */}
                    <div className="bg-muted/50 rounded-xl p-4 mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">
                          Free Diagnostics Used
                        </span>
                        <span className="text-sm font-bold text-foreground">
                          {userData.membership.usedDiagnostics} / {userData.membership.totalDiagnostics}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full gradient-hero transition-all duration-500"
                          style={{ width: `${(userData.membership.usedDiagnostics / userData.membership.totalDiagnostics) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="hero" className="flex-1">
                        Upgrade Plan
                      </Button>
                      <Button variant="outline">
                        View Benefits
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Recent Repairs */}
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-4">
                    Recent Repairs
                  </h3>
                  <div className="space-y-4">
                    {repairHistory.slice(0, 3).map((repair) => (
                      <Card key={repair.id} className="p-6 border-border shadow-card hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-foreground">{repair.device}</h4>
                              <Badge className={getStatusColor(repair.status)}>
                                {repair.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">{repair.issue}</p>
                            <p className="text-xs text-muted-foreground">
                              Booking ID: {repair.id}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-display font-bold text-foreground">
                              {repair.cost}
                            </p>
                            <p className="text-xs text-accent">
                              Saved {repair.discount}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4 text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(repair.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Shield className="w-4 h-4" />
                              {repair.warranty}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < repair.rating
                                    ? "fill-warning text-warning"
                                    : "text-muted"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Membership Tab */}
              <TabsContent value="membership" className="space-y-6">
                <Card className="p-6 lg:p-8 border-border shadow-card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-display font-bold text-foreground">
                      Membership Benefits
                    </h3>
                    <Button variant="hero">
                      Upgrade Plan
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {userData.membership.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                        <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="text-foreground font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Renewal Info */}
                  <div className="p-4 bg-warning/10 border border-warning/20 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-warning mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground mb-1">
                          Membership Renewal
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Your membership will auto-renew on {userData.membership.renewalDate}. 
                          Manage your subscription settings to change or cancel.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Usage History */}
                <Card className="p-6 lg:p-8 border-border shadow-card">
                  <h3 className="text-xl font-display font-bold text-foreground mb-4">
                    Usage History
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div>
                        <p className="font-medium text-foreground">Free Diagnostic - Laptop</p>
                        <p className="text-sm text-muted-foreground">January 5, 2026</p>
                      </div>
                      <Badge className="bg-accent/10 text-accent border-accent/20">
                        Used
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div>
                        <p className="font-medium text-foreground">20% Discount Applied</p>
                        <p className="text-sm text-muted-foreground">January 5, 2026</p>
                      </div>
                      <span className="text-accent font-medium">-₹700</span>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Repair History Tab */}
              <TabsContent value="repairs" className="space-y-6">
                <Card className="p-6 lg:p-8 border-border shadow-card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-display font-bold text-foreground">
                      All Repairs ({repairHistory.length})
                    </h3>
                    <Button variant="outline">
                      <Download className="w-4 h-4" />
                      Export
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {repairHistory.map((repair) => (
                      <Card key={repair.id} className="p-6 border-border hover:border-primary/30 transition-colors">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                          {/* Repair Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-foreground text-lg">
                                {repair.device}
                              </h4>
                              <Badge className={getStatusColor(repair.status)}>
                                {repair.status}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-2">{repair.issue}</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(repair.date).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                {repair.technician}
                              </span>
                              <span className="flex items-center gap-1">
                                <Shield className="w-4 h-4" />
                                {repair.warranty} Warranty
                              </span>
                              <span className="text-xs">ID: {repair.id}</span>
                            </div>
                          </div>

                          {/* Price & Rating */}
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground mb-1">Total Cost</p>
                              <p className="text-2xl font-display font-bold text-foreground">
                                {repair.cost}
                              </p>
                              <p className="text-sm text-accent">
                                Saved {repair.discount}
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground mb-1">Rating</p>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < repair.rating
                                        ? "fill-warning text-warning"
                                        : "text-muted"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
