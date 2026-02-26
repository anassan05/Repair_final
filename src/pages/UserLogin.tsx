import { useState } from "react";
import { Phone, User as UserIcon, ArrowRight, Mail, Lock } from "lucide-react";
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
    <div className="min-h-screen relative z-[1] px-4 py-8 sm:px-6 lg:px-8 lg:py-10 flex items-center justify-center">
      <div className="w-full max-w-lg">
        <Card className="w-full border-blue-100/80 rounded-3xl bg-white/95 shadow-2xl dark:bg-[#111827]">
          <CardHeader className="space-y-4 px-6 pt-8 text-center sm:px-8 sm:pt-10">
            <CardTitle className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">
              CareMyLap<span className="text-blue-500 dark:text-blue-400">.com</span>
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {isLogin ? "Login to your account" : "Create your account to get started"}
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

