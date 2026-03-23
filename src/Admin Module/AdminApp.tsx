import { useEffect, useMemo, useState } from "react";
import AdminLogin from "./AdminLogin.tsx";
import AdminDashboard from "./Dashboard.tsx";
import AdminProfile from "./Profile.tsx";
import RedFloatingBubbles from "./ui/RedFloatingBubbles.tsx";
import "./admin.css";

export interface AdminUser {
  name: string;
  adminId: string;
  role: string;
}

const getCurrentAdmin = (): AdminUser | null => {
  const raw = localStorage.getItem("adminUser");
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (parsed?.name && parsed?.adminId && parsed?.role) {
      return parsed as AdminUser;
    }
    return null;
  } catch {
    return null;
  }
};

type AdminRoute = "login" | "dashboard" | "profile";

const parseRouteFromPath = (pathname: string): AdminRoute => {
  const path = pathname.toLowerCase();
  if (path.endsWith("/profile") || path === "/profile") return "profile";
  if (path.endsWith("/dashboard") || path === "/dashboard") return "dashboard";
  return "login";
};

const toRoutePath = (route: AdminRoute): string => `/admin/${route}`;

function AdminApp() {
  const [admin, setAdmin] = useState<AdminUser | null>(() => getCurrentAdmin());
  const [route, setRoute] = useState<AdminRoute>(() => parseRouteFromPath(window.location.pathname));

  const navigateTo = (nextRoute: AdminRoute, replace = false) => {
    const nextPath = toRoutePath(nextRoute);
    if (window.location.pathname !== nextPath) {
      if (replace) {
        window.history.replaceState(null, "", nextPath);
      } else {
        window.history.pushState(null, "", nextPath);
      }
    }
    setRoute(nextRoute);
  };

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseRouteFromPath(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!admin && route !== "login") {
      navigateTo("login", true);
      return;
    }

    if (admin && route === "login") {
      navigateTo("dashboard", true);
    }
  }, [admin, route]);

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    setAdmin(null);
    navigateTo("login", true);
  };

  const currentView = useMemo(() => {
    if (!admin) {
      return <AdminLogin onLogin={setAdmin} onNavigateDashboard={() => navigateTo("dashboard", true)} />;
    }

    if (route === "profile") {
      return (
        <AdminProfile
          currentAdmin={admin}
          onLogout={handleLogout}
          onNavigateDashboard={() => navigateTo("dashboard")}
        />
      );
    }

    return (
      <AdminDashboard
        currentAdmin={admin}
        onLogout={handleLogout}
        onNavigateProfile={() => navigateTo("profile")}
      />
    );
  }, [admin, route]);

  return (
    <>
      {route === "login" && <RedFloatingBubbles />}
      {currentView}
    </>
  );
}

export default AdminApp;
