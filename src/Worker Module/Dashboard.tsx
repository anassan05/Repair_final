import { useMemo, useState } from "react";

type BookingStatus = "assigned" | "completed";

interface WorkerDashboardProps {
  currentWorker: { name: string; workerId: string };
  onLogout: () => void;
}

interface BookingItem {
  id: string;
  service: string;
  customer: string;
  address: string;
  date: string;
  status: BookingStatus;
}

const initialBookings: BookingItem[] = [
  { id: "BK001", service: "Air Conditioner Repair", customer: "Rajesh Kumar", address: "123 MG Road, Bangalore, Karnataka", date: "2026-02-21", status: "assigned" },
  { id: "BK002", service: "Washing Machine Repair", customer: "Priya Singh", address: "456 Koramangala, Bangalore, Karnataka", date: "2026-02-22", status: "assigned" },
  { id: "BK003", service: "Refrigerator Repair", customer: "Amit Patel", address: "789 Indiranagar, Bangalore, Karnataka", date: "2026-02-23", status: "assigned" },
  { id: "BK004", service: "Microwave Repair", customer: "Anjali Sharma", address: "321 Whitefield, Bangalore, Karnataka", date: "2026-02-24", status: "assigned" },
  { id: "BK005", service: "Water Heater Installation", customer: "Vikram Singh", address: "654 Banaswadi, Bangalore, Karnataka", date: "2026-02-25", status: "assigned" },
];

const WorkerDashboard = ({ currentWorker, onLogout }: WorkerDashboardProps) => {
  const [bookings, setBookings] = useState<BookingItem[]>(initialBookings);

  const assignedBookings = useMemo(
    () => bookings.filter((booking) => booking.status === "assigned"),
    [bookings]
  );

  const handleCompleteService = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status: "completed" } : booking
      )
    );
  };

  return (
    <div className="dashboard-page">
      <header className="worker-navbar">
        <div className="worker-navbar-inner">
          <a href="/" className="worker-logo">
            CareMyLap<span className="worker-logo-accent">.com</span>
          </a>

          <nav className="worker-nav-links">
            <button type="button" className="worker-nav-link active">Dashboard</button>
            <button type="button" className="worker-nav-link">Bookings</button>
            <button type="button" className="worker-nav-link">History</button>
          </nav>

          <div className="worker-nav-actions">
            <button type="button" className="worker-btn-outline">Profile</button>
            <button type="button" className="worker-btn-ghost" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="worker-meta">
          <p>Logged in as</p>
          <h2>{currentWorker.name}</h2>
          <span>{currentWorker.workerId}</span>
        </section>

        <section>
          <h3>Assigned Bookings</h3>
          <div className="booking-grid">
            {assignedBookings.map((booking) => (
              <article key={booking.id} className="booking-card">
                <div className="booking-header">
                  <div>
                    <h4>{booking.service}</h4>
                    <p>Booking #{booking.id}</p>
                  </div>
                  <span className="status-pill">{booking.status}</span>
                </div>

                <div className="booking-meta">
                  <p><strong>Customer:</strong> {booking.customer}</p>
                  <p><strong>Address:</strong> {booking.address}</p>
                  <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString("en-IN")}</p>
                </div>

                <button
                  type="button"
                  className="complete-btn"
                  onClick={() => handleCompleteService(booking.id)}
                >
                  Complete Service
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default WorkerDashboard;
