import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import WorkerLogin from "./WorkerLogin";
import WorkerDashboard from "./Dashboard";
import WorkerProfile from "./Profile";
import GreenFloatingBubbles from "./ui/GreenFloatingBubbles";

export interface WorkerUser {
  name: string;
  workerId: string;
}

const getCurrentWorker = (): WorkerUser | null => {
  const raw = localStorage.getItem("workerUser");
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed?.name && parsed?.workerId) return parsed as WorkerUser;
    return null;
  } catch {
    return null;
  }
};

function WorkerApp() {
  const location = useLocation();
  const [worker, setWorker] = useState<WorkerUser | null>(() => getCurrentWorker());
  const workerLoginPath = "/worker/login";
  const workerDashboardPath = "/worker/dashboard";
  const workerProfilePath = "/worker/profile";
  const isLoginRoute = location.pathname === workerLoginPath || location.pathname === "/login";

  return (
    <>
      {isLoginRoute && <GreenFloatingBubbles />}
      <Routes>
      <Route
        path={workerLoginPath}
        element={worker ? <Navigate to={workerDashboardPath} replace /> : <WorkerLogin onLogin={setWorker} />}
      />
      <Route
        path={workerDashboardPath}
        element={
          worker ? (
            <WorkerDashboard
              currentWorker={worker}
              onLogout={() => {
                localStorage.removeItem("workerUser");
                setWorker(null);
              }}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path={workerProfilePath}
        element={
          worker ? (
            <WorkerProfile
              currentWorker={worker}
              onLogout={() => {
                localStorage.removeItem("workerUser");
                setWorker(null);
              }}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/login" element={<Navigate to={workerLoginPath} replace />} />
      <Route path="/dashboard" element={<Navigate to={workerDashboardPath} replace />} />
      <Route path="/profile" element={<Navigate to={workerProfilePath} replace />} />
      <Route path="*" element={<Navigate to={worker ? workerDashboardPath : workerLoginPath} replace />} />
    </Routes>
    </>
  );
}

export default WorkerApp;
