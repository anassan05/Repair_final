import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

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
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="page-wrap">
      <div className="login-card">
        <h1>TechFix Worker</h1>
        <p>Login to worker panel</p>
        <form onSubmit={onSubmit}>
          <label htmlFor="worker-name">Name</label>
          <input id="worker-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Technician name" required />

          <label htmlFor="worker-id">Worker ID</label>
          <input id="worker-id" value={workerId} onChange={(e) => setWorkerId(e.target.value)} placeholder="WRK-001" required />

          <label htmlFor="worker-password">Password</label>
          <input
            id="worker-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default WorkerLogin;
