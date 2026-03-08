import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./Worker Module/worker.css";
import WorkerApp from "./Worker Module/WorkerApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <WorkerApp />
    </BrowserRouter>
  </StrictMode>
);
