



// Set theme based on system preference
function applySystemTheme() {
	const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	document.documentElement.classList.toggle('dark', isDark);
}

applySystemTheme();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applySystemTheme);

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
