
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import AdminApp from "./Admin Module/AdminApp.tsx";
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

const pathname = window.location.pathname.toLowerCase();
const isAdminPath = pathname === "/admin" || pathname.startsWith("/admin/");

createRoot(document.getElementById("root")!).render(
  isAdminPath ? <AdminApp /> : <App />
);
