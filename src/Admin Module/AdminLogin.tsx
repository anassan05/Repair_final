import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, Lock, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { AdminUser } from "./AdminApp";

interface AdminLoginProps {
  onLogin: (adminData: AdminUser) => void;
  onNavigateDashboard: () => void;
}

const AdminLogin = ({ onLogin, onNavigateDashboard }: AdminLoginProps) => {
  const [name, setName] = useState("");
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const payload: AdminUser = {
      name: name.trim() || "Administrator",
      adminId: adminId.trim() || "ADM-001",
      role: "Super Admin",
    };

    localStorage.setItem("adminUser", JSON.stringify(payload));
    onLogin(payload);
    onNavigateDashboard();
  };

  return (
    <div className="admin-login-shell">
      <div className="admin-login-wrap">
        <Card className="admin-login-card">
          <CardHeader className="space-y-4 px-6 pt-8 text-center sm:px-8 sm:pt-10">
            <CardTitle className="text-2xl sm:text-3xl font-display font-bold text-white">
              CareMyLap<span className="admin-accent">.com</span>
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-rose-100/70">
              Secure access to the admin control room
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-8 pt-2 sm:px-8 sm:pb-10">
            <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-5">
              <div className="space-y-2">
                <Label htmlFor="admin-name" className="text-rose-100">Name</Label>
                <div className="relative">
                  <User className="admin-input-icon" />
                  <Input
                    id="admin-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Admin name"
                    className="admin-input"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-id" className="text-rose-100">Admin ID</Label>
                <div className="relative">
                  <ShieldCheck className="admin-input-icon" />
                  <Input
                    id="admin-id"
                    value={adminId}
                    onChange={(event) => setAdminId(event.target.value)}
                    placeholder="ADM-001"
                    className="admin-input"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password" className="text-rose-100">Password</Label>
                <div className="relative">
                  <Lock className="admin-input-icon" />
                  <Input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="********"
                    className="admin-input"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="admin-submit-btn">
                Login to Admin Panel
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="admin-login-footer">Restricted to authorized administrators</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
