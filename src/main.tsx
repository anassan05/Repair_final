
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Apply theme with dark as default, but respect persisted preference
const getPreferredTheme = (): "dark" | "light" => {
	const stored = localStorage.getItem('theme');
	if (stored === 'light' || stored === 'dark') return stored;
	const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	return systemPrefersDark ? 'dark' : 'dark'; // default to dark when unknown
};

const applyTheme = (theme: "dark" | "light") => {
	document.documentElement.classList.toggle('dark', theme === 'dark');
};

const initialTheme = getPreferredTheme();
applyTheme(initialTheme);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
	const stored = localStorage.getItem('theme');
	if (stored === 'light' || stored === 'dark') return; // user-chosen overrides system
	applyTheme(event.matches ? 'dark' : 'light');
});

createRoot(document.getElementById("root")!).render(<App />);
