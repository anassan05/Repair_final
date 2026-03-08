import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import WorkerLogin from "./WorkerLogin";
import WorkerDashboard from "./Dashboard";
import WorkerProfile from "./Profile";
import GreenFloatingBubbles from "./ui/GreenFloatingBubbles";
import GreenParticleCanvas from "./ui/GreenParticleCanvas";

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
  const [worker, setWorker] = useState<WorkerUser | null>(() => getCurrentWorker());

  return (
    <>
      <GreenFloatingBubbles />
      <GreenParticleCanvas />
      <Routes>
      <Route
        path="/login"
        element={worker ? <Navigate to="/dashboard" replace /> : <WorkerLogin onLogin={setWorker} />}
      />
      <Route
        path="/dashboard"
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
        path="/profile"
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
      <Route path="*" element={<Navigate to={worker ? "/dashboard" : "/login"} replace />} />
    </Routes>
    </>
  );
}

export default WorkerApp;
