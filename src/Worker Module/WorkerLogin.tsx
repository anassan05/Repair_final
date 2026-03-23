import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Lock, User, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
interface WorkerLoginProps {
  onLogin: (workerData: { name: string; workerId: string }) => void;
}

const WorkerLogin = ({ onLogin }: WorkerLoginProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [workerId, setWorkerId] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      name: name.trim() || "Worker",
      workerId: workerId.trim() || "WRK-001",
    };

    localStorage.setItem("workerUser", JSON.stringify(payload));
    onLogin(payload);
    navigate("/worker/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen relative z-[1] px-4 py-8 sm:px-6 lg:px-8 lg:py-10 flex items-center justify-center bg-[#050b12]">
      <div className="w-full max-w-lg">
        <Card className="w-full rounded-3xl bg-[#0a1426]/95 border border-slate-500/60 shadow-2xl backdrop-blur-md">
          <CardHeader className="space-y-4 px-6 pt-8 text-center sm:px-8 sm:pt-10">
            <CardTitle className="text-2xl sm:text-3xl font-display font-bold text-white">
              CareMyLap<span className="text-green-500">.com</span>
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-slate-400">
              Login to your worker account
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-8 pt-2 sm:px-8 sm:pb-10">
            <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-5">
              <div className="space-y-2">
                <Label htmlFor="worker-name" className="text-slate-200">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    id="worker-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Technician name"
                    className="pl-10 h-11 bg-[#0b1424] border-slate-500/60 text-white placeholder:text-slate-400 focus-visible:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="worker-id" className="text-slate-200">Worker ID</Label>
                <div className="relative">
                  <Wrench className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    id="worker-id"
                    value={workerId}
                    onChange={(e) => setWorkerId(e.target.value)}
                    placeholder="WRK-001"
                    className="pl-10 h-11 bg-[#0b1424] border-slate-500/60 text-white placeholder:text-slate-400 focus-visible:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="worker-password" className="text-slate-200">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    id="worker-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    className="pl-10 h-11 bg-[#0b1424] border-slate-500/60 text-white placeholder:text-slate-400 focus-visible:ring-green-500"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="mt-1 h-12 w-full bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-900/30">
                Login
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="text-center text-sm text-slate-400 mt-5">Worker access only</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkerLogin;
