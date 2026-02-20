import { useState } from "react";
import { Phone, User as UserIcon, ArrowRight, Shield, CheckCircle2, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: (userData: { name: string; phone: string }) => void;
}

const UserLogin = ({ onLogin }: LoginProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Skip authentication - allow any user to login
    const userData = { name: name || email.split("@")[0], phone: phone || "1234567890" };
    sessionStorage.setItem("user", JSON.stringify({ name: userData.name, email, phone: userData.phone }));
    sessionStorage.setItem("currentUser", JSON.stringify(userData));
    onLogin(userData);
    setLoading(false);
    navigate("/");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Skip authentication - allow any user to register
    const userData = { name, phone };
    sessionStorage.setItem("user", JSON.stringify({ name, email, phone }));
    sessionStorage.setItem("currentUser", JSON.stringify(userData));
    onLogin(userData);
    setLoading(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f4faff] dark:bg-[#10151b] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto grid w-full max-w-7xl items-stretch gap-6 lg:grid-cols-2">
        <div className="hidden lg:flex min-h-[680px] flex-col justify-between rounded-3xl border border-blue-200/70 bg-gradient-to-br from-blue-50 via-white to-blue-100 p-10 shadow-xl">
          <div>
            <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg">
              <Shield className="h-7 w-7" />
            </div>
            <h1 className="text-5xl font-display font-bold text-slate-900 leading-tight">
              TechFix Hub
            </h1>
            <p className="mt-4 max-w-lg text-3xl text-lg text-slate-600">
              Fast, transparent laptop and desktop repair services at your doorstep.
            </p>
          </div>
          <div className="space-y-5">
            {[
              "Verified technicians and genuine parts",
              "Live service tracking with booking details",
              "Warranty-backed repairs with quick support",
            ].map((point) => (
              <div key={point} className="flex items-center gap-3 rounded-xl border border-blue-100 bg-white/70 px-5 py-4">
                <CheckCircle2 className="h-5 w-5 text-blue-500" />
                <p className="text-base font-medium text-slate-700">{point}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="mx-auto w-full max-w-2xl border-blue-100/80 rounded-3xl bg-white/95 shadow-2xl dark:bg-[#111827] lg:min-h-[680px]">
          <CardHeader className="space-y-4 px-6 pt-8 text-center sm:px-8 sm:pt-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500 shadow-md">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-display text-slate-900 dark:text-white">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {isLogin ? "Login to book laptop and PC repair services" : "Sign up to get started with TechFix Hub"}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-8 pt-2 sm:px-8 sm:pb-10">
            {isLogin ? (
              <form onSubmit={handleLogin} className="mx-auto max-w-xl space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11 border-blue-100 focus-visible:ring-blue-400"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-11 border-blue-100 focus-visible:ring-blue-400"
                      required
                    />
                  </div>
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="mt-1 h-12 w-full bg-blue-500 text-white hover:bg-blue-600" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="mx-auto max-w-xl space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 h-11 border-blue-100 focus-visible:ring-blue-400"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-reg">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email-reg"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11 border-blue-100 focus-visible:ring-blue-400"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 h-11 border-blue-100 focus-visible:ring-blue-400"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-reg">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password-reg"
                      type="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-11 border-blue-100 focus-visible:ring-blue-400"
                      required
                    />
                  </div>
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="mt-1 h-12 w-full bg-blue-500 text-white hover:bg-blue-600" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Login
                  </button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserLogin;

