import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Membership from "./pages/Membership";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import UserLogin from "./pages/UserLogin";
import NotFound from "./pages/NotFound";
import IconTest from "./components/ImageTest";
import ParticleCanvas from "./components/ParticleCanvas";
import FloatingBubbles from "./components/FloatingBubbles";

const queryClient = new QueryClient();

/** Renders ParticleCanvas + FloatingBubbles on every page except /profile.
 *  On mobile (< 768px) both canvases are disabled entirely for performance. */
const ConditionalParticles = () => {
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (pathname === "/profile" || pathname === "/services") return null;
  return (
    <>
      <FloatingBubbles />
      <ParticleCanvas excludeSelector={pathname === "/" ? "#home-dots-exclude" : undefined} />
    </>
  );
};

const App = () => {
  const [currentUser, setCurrentUser] = useState<{ name: string; phone: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData: { name: string; phone: string }) => {
    setCurrentUser(userData);
    sessionStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('currentUser');
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ConditionalParticles />
          <Routes>
            <Route path="/login" element={
              currentUser ? <Navigate to="/" /> : <UserLogin onLogin={handleLogin} />
            } />
            {/* All main routes require login */}
            <Route path="/" element={
              currentUser ? <Index currentUser={currentUser} /> : <Navigate to="/login" />
            } />
            <Route path="/services" element={<Services currentUser={currentUser} />} />
            <Route path="/membership" element={
              currentUser ? <Membership currentUser={currentUser} /> : <Navigate to="/login" />
            } />
            <Route path="/contact" element={
              currentUser ? <Contact currentUser={currentUser} /> : <Navigate to="/login" />
            } />
            <Route path="/profile" element={
              currentUser ? <Profile currentUser={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />
            } />
            <Route path="/debug" element={<IconTest />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
