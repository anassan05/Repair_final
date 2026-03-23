import { useMemo } from "react";
import { BadgeCheck, BellRing, LockKeyhole, ShieldCheck } from "lucide-react";
import type { AdminUser } from "./AdminApp";

interface AdminProfileProps {
  currentAdmin: AdminUser;
  onLogout: () => void;
  onNavigateDashboard: () => void;
}

const accessScopes = [
  "User account moderation",
  "Worker verification approval",
  "Service escalation handling",
  "Refund and payout oversight",
  "System incident triage",
];

const recentActions = [
  { id: "ACT-541", action: "Approved worker KYC", time: "2 hours ago" },
  { id: "ACT-533", action: "Resolved refund dispute", time: "5 hours ago" },
  { id: "ACT-520", action: "Blocked suspicious user", time: "Yesterday" },
  { id: "ACT-501", action: "Updated escalation rules", time: "2 days ago" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const AdminProfile = ({ currentAdmin, onLogout, onNavigateDashboard }: AdminProfileProps) => {
  const profileStats = useMemo(
    () => ({
      permissions: accessScopes.length,
      actionsThisWeek: 36,
      securityScore: "98/100",
      sessionsActive: 1,
    }),
    []
  );

  return (
    <div className="admin-page">
      <header className="admin-navbar">
        <div className="admin-navbar-inner">
          <a href="/admin/dashboard" className="admin-logo">
            CareMyLap<span className="admin-logo-accent">.com</span>
          </a>

          <nav className="admin-nav-links">
            <button type="button" className="admin-nav-link" onClick={onNavigateDashboard}>Dashboard</button>
            <button type="button" className="admin-nav-link active">Profile</button>
          </nav>

          <div className="admin-nav-actions">
            <button type="button" className="admin-btn-ghost" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </header>

      <main className="admin-main profile">
        <section className="admin-profile-hero">
          <div className="admin-avatar">{initials(currentAdmin.name)}</div>
          <div>
            <h1>{currentAdmin.name}</h1>
            <p>{currentAdmin.role} - {currentAdmin.adminId}</p>
            <div className="admin-profile-tags">
              <span><ShieldCheck className="w-4 h-4" /> Elevated Access</span>
              <span><LockKeyhole className="w-4 h-4" /> 2FA Enabled</span>
              <span><BellRing className="w-4 h-4" /> Alerts Subscribed</span>
            </div>
          </div>
        </section>

        <section className="admin-profile-stats">
          <article>
            <p>Permission Scopes</p>
            <h3>{profileStats.permissions}</h3>
          </article>
          <article>
            <p>Actions This Week</p>
            <h3>{profileStats.actionsThisWeek}</h3>
          </article>
          <article>
            <p>Security Score</p>
            <h3>{profileStats.securityScore}</h3>
          </article>
          <article>
            <p>Active Sessions</p>
            <h3>{profileStats.sessionsActive}</h3>
          </article>
        </section>

        <section className="admin-profile-grid">
          <article className="admin-card">
            <h2><BadgeCheck className="w-5 h-5" /> Access Responsibilities</h2>
            <div className="admin-chip-list">
              {accessScopes.map((scope) => (
                <span key={scope} className="admin-chip">{scope}</span>
              ))}
            </div>
          </article>

          <article className="admin-card">
            <h2>Recent Actions</h2>
            <div className="admin-action-list">
              {recentActions.map((item) => (
                <div key={item.id} className="admin-action-item">
                  <div>
                    <h4>{item.action}</h4>
                    <p>{item.id}</p>
                  </div>
                  <span>{item.time}</span>
                </div>
              ))}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default AdminProfile;
