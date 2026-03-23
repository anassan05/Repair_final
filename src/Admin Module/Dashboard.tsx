import { useMemo, useState } from "react";
import { AlertTriangle, BellRing, CheckCircle2, ShieldAlert, UserCheck, Wrench } from "lucide-react";
import type { AdminUser } from "./AdminApp";

interface AdminDashboardProps {
  currentAdmin: AdminUser;
  onLogout: () => void;
  onNavigateProfile: () => void;
}

type TicketStatus = "open" | "in-progress" | "resolved";

interface Ticket {
  id: string;
  type: "customer" | "worker" | "payment";
  title: string;
  owner: string;
  createdAt: string;
  priority: "high" | "medium" | "low";
  status: TicketStatus;
}

interface WorkerOption {
  id: string;
  name: string;
  skill: string;
}

interface BookingRequest {
  id: string;
  userName: string;
  service: string;
  location: string;
  preferredDate: string;
  notificationTime: string;
  status: "new" | "assigned";
  assignedWorkerId?: string;
}

const initialTickets: Ticket[] = [
  {
    id: "TCK-3201",
    type: "worker",
    title: "Worker profile verification pending",
    owner: "Priya Singh",
    createdAt: "2026-03-17",
    priority: "high",
    status: "open",
  },
  {
    id: "TCK-3198",
    type: "payment",
    title: "Refund escalation for booking BK-118",
    owner: "Rohan Das",
    createdAt: "2026-03-16",
    priority: "medium",
    status: "in-progress",
  },
  {
    id: "TCK-3191",
    type: "customer",
    title: "Repeat cancellation complaint",
    owner: "Ananya Patel",
    createdAt: "2026-03-15",
    priority: "low",
    status: "resolved",
  },
  {
    id: "TCK-3188",
    type: "worker",
    title: "Warranty mismatch issue",
    owner: "Amit Verma",
    createdAt: "2026-03-14",
    priority: "high",
    status: "open",
  },
];

const availableWorkers: WorkerOption[] = [
  { id: "WRK-001", name: "Amit Verma", skill: "Laptop Repair" },
  { id: "WRK-009", name: "Priya Nair", skill: "Appliance Repair" },
  { id: "WRK-014", name: "Rohan Das", skill: "Desktop & Networking" },
  { id: "WRK-022", name: "Sneha Shah", skill: "Motherboard & Soldering" },
];

const defaultBookingRequests: BookingRequest[] = [
  {
    id: "BK-214",
    userName: "Karthik Rao",
    service: "Laptop Screen Replacement",
    location: "HSR Layout, Bengaluru",
    preferredDate: "2026-03-22",
    notificationTime: "12 min ago",
    status: "new",
  },
  {
    id: "BK-216",
    userName: "Neha Sharma",
    service: "Air Conditioner Repair",
    location: "Indiranagar, Bengaluru",
    preferredDate: "2026-03-23",
    notificationTime: "35 min ago",
    status: "new",
  },
  {
    id: "BK-208",
    userName: "Arjun Menon",
    service: "Washing Machine Motor Fix",
    location: "Whitefield, Bengaluru",
    preferredDate: "2026-03-21",
    notificationTime: "1 hr ago",
    status: "assigned",
    assignedWorkerId: "WRK-009",
  },
];

const getIncomingBookings = (): BookingRequest[] => {
  const raw = localStorage.getItem("userBookingNotifications");
  if (!raw) return defaultBookingRequests;

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return defaultBookingRequests;

    const mapped = parsed
      .filter((item) => item && typeof item === "object")
      .map((item, index): BookingRequest => ({
        id: typeof item.id === "string" ? item.id : `BK-U${index + 1}`,
        userName: typeof item.userName === "string" ? item.userName : "User",
        service: typeof item.service === "string" ? item.service : "General Repair",
        location: typeof item.location === "string" ? item.location : "Unknown",
        preferredDate: typeof item.preferredDate === "string" ? item.preferredDate : new Date().toISOString().slice(0, 10),
        notificationTime: typeof item.notificationTime === "string" ? item.notificationTime : "just now",
        status: item.assignedWorkerId ? "assigned" : "new",
        assignedWorkerId: typeof item.assignedWorkerId === "string" ? item.assignedWorkerId : undefined,
      }));

    return mapped.length > 0 ? mapped : defaultBookingRequests;
  } catch {
    return defaultBookingRequests;
  }
};

const AdminDashboard = ({ currentAdmin, onLogout, onNavigateProfile }: AdminDashboardProps) => {
  const [tickets] = useState<Ticket[]>(initialTickets);
  const [bookings, setBookings] = useState<BookingRequest[]>(() => getIncomingBookings());
  const [selectedWorkers, setSelectedWorkers] = useState<Record<string, string>>({});
  const [dismissedNotificationIds, setDismissedNotificationIds] = useState<string[]>([]);

  const visibleNotifications = useMemo(
    () =>
      bookings.filter(
        (booking) =>
          booking.status === "new" &&
          !dismissedNotificationIds.includes(booking.id)
      ),
    [bookings, dismissedNotificationIds]
  );

  const dashboardStats = useMemo(() => {
    const openIssues = tickets.filter((ticket) => ticket.status !== "resolved").length;
    const pendingAssignments = bookings.filter((booking) => booking.status === "new").length;

    return {
      totalUsers: 1284,
      activeWorkers: 246,
      openIssues,
      pendingAssignments,
    };
  }, [tickets, bookings]);

  const assignWorker = (bookingId: string) => {
    const workerId = selectedWorkers[bookingId];
    if (!workerId) return;

    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: "assigned", assignedWorkerId: workerId }
          : booking
      )
    );

    setDismissedNotificationIds((prev) => prev.filter((id) => id !== bookingId));
  };

  const dismissNotification = (bookingId: string) => {
    setDismissedNotificationIds((prev) =>
      prev.includes(bookingId) ? prev : [...prev, bookingId]
    );
  };

  const workerNameById = (workerId?: string) =>
    availableWorkers.find((worker) => worker.id === workerId)?.name ?? "Unassigned";

  return (
    <div className="admin-page">
      <header className="admin-navbar">
        <div className="admin-navbar-inner">
          <a href="/admin/dashboard" className="admin-logo">
            CareMyLap<span className="admin-logo-accent">.com</span>
          </a>

          <nav className="admin-nav-links">
            <button type="button" className="admin-nav-link active">Dashboard</button>
            <button type="button" className="admin-nav-link" onClick={onNavigateProfile}>Profile</button>
          </nav>

          <div className="admin-nav-actions">
            <button type="button" className="admin-btn-ghost" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <section className="admin-welcome-card">
          <div>
            <p className="admin-welcome-sub">Admin Console</p>
            <h1>Welcome, {currentAdmin.name}</h1>
            <span>{currentAdmin.role} - {currentAdmin.adminId}</span>
          </div>
          <div className="admin-alert-chip">
            <ShieldAlert className="w-4 h-4" />
            Secure Mode Enabled
          </div>
        </section>

        <section className="admin-stats-grid">
          <article className="admin-stat-card">
            <div className="admin-stat-icon users"><UserCheck className="w-18 h-18" /></div>
            <p>Total Users</p>
            <h3>{dashboardStats.totalUsers}</h3>
          </article>

          <article className="admin-stat-card">
            <div className="admin-stat-icon workers"><Wrench className="w-18 h-18" /></div>
            <p>Active Workers</p>
            <h3>{dashboardStats.activeWorkers}</h3>
          </article>

          <article className="admin-stat-card">
            <div className="admin-stat-icon alerts"><AlertTriangle className="w-18 h-18" /></div>
            <p>Open Issues</p>
            <h3>{dashboardStats.openIssues}</h3>
          </article>

          <article className="admin-stat-card">
            <div className="admin-stat-icon verify"><CheckCircle2 className="w-18 h-18" /></div>
            <p>Pending Assignments</p>
            <h3>{dashboardStats.pendingAssignments}</h3>
          </article>
        </section>

        <section className="admin-layout-grid">
          <article className="admin-notification-panel">
            <div className="admin-section-head">
              <h2><BellRing className="w-5 h-5" /> User Notifications</h2>
              <p>Incoming booking requests from users</p>
            </div>

            <div className="admin-notification-list">
              {visibleNotifications.length === 0 ? (
                <div className="admin-empty-state">No new user notifications.</div>
              ) : (
                visibleNotifications.map((notification) => (
                  <article key={notification.id} className="admin-notification-card">
                    <div>
                      <h4>{notification.service}</h4>
                      <p>{notification.id} - {notification.userName}</p>
                    </div>
                    <div className="admin-notification-meta">
                      <span>{notification.location}</span>
                      <span>Preferred: {new Date(notification.preferredDate).toLocaleDateString("en-IN")}</span>
                      <span>{notification.notificationTime}</span>
                    </div>
                    <button
                      type="button"
                      className="admin-mini-btn"
                      onClick={() => dismissNotification(notification.id)}
                    >
                      Dismiss
                    </button>
                  </article>
                ))
              )}
            </div>
          </article>

          <article className="admin-assignment-panel">
            <div className="admin-section-head">
              <h2>Assign Bookings to Workers</h2>
              <p>Map each booking request to a specific worker</p>
            </div>

            <div className="admin-assignment-list">
              {bookings.map((booking) => (
                <article key={booking.id} className="admin-assignment-card">
                  <div className="admin-assignment-top">
                    <div>
                      <h4>{booking.service}</h4>
                      <p>{booking.id} - {booking.userName}</p>
                    </div>
                    <span className={`admin-ticket-badge status-${booking.status === "assigned" ? "resolved" : "open"}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="admin-assignment-meta">
                    <span>{booking.location}</span>
                    <span>Date: {new Date(booking.preferredDate).toLocaleDateString("en-IN")}</span>
                    <span>Assigned: {workerNameById(booking.assignedWorkerId)}</span>
                  </div>

                  <div className="admin-assignment-actions">
                    <select
                      value={selectedWorkers[booking.id] ?? booking.assignedWorkerId ?? ""}
                      onChange={(event) =>
                        setSelectedWorkers((prev) => ({
                          ...prev,
                          [booking.id]: event.target.value,
                        }))
                      }
                      disabled={booking.status === "assigned"}
                    >
                      <option value="">Select worker</option>
                      {availableWorkers.map((worker) => (
                        <option key={worker.id} value={worker.id}>
                          {worker.name} - {worker.skill}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      className="admin-mini-btn primary"
                      disabled={booking.status === "assigned" || !selectedWorkers[booking.id]}
                      onClick={() => assignWorker(booking.id)}
                    >
                      Assign Worker
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </article>
        </section>

        <section className="admin-ticket-panel">
          <div className="admin-ticket-head">
            <h2>Priority Queue</h2>
            <p>Latest moderation and escalation tickets</p>
          </div>

          <div className="admin-ticket-list">
            {tickets.map((ticket) => (
              <article key={ticket.id} className="admin-ticket-card">
                <div className="admin-ticket-top">
                  <div>
                    <h4>{ticket.title}</h4>
                    <p>{ticket.id} - {ticket.owner}</p>
                  </div>
                  <span className={`admin-ticket-badge status-${ticket.status}`}>{ticket.status}</span>
                </div>

                <div className="admin-ticket-meta">
                  <span>Type: {ticket.type}</span>
                  <span>Priority: {ticket.priority}</span>
                  <span>Created: {new Date(ticket.createdAt).toLocaleDateString("en-IN")}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
