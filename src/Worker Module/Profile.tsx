import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface WorkerProfileProps {
  currentWorker: { name: string; workerId: string };
  onLogout: () => void;
}

interface CompletedWork {
  id: string;
  service: string;
  bookingId: string;
  customer: string;
  completedDate: string;
  componentsUsed: string;
  warranty: string;
  rating: number;
  hasWarranty: boolean;
}

const completedWorks: CompletedWork[] = [
  {
    id: "1",
    service: "Laptop Screen Replacement",
    bookingId: "BK045",
    customer: "John Doe",
    completedDate: "1/9/2026",
    componentsUsed: "LCD Screen, Hinges",
    warranty: "12 months",
    rating: 5,
    hasWarranty: true,
  },
  {
    id: "2",
    service: "Air Conditioner Repair",
    bookingId: "BK038",
    customer: "Priya Sharma",
    completedDate: "12/28/2025",
    componentsUsed: "Compressor, Gas Refill",
    warranty: "6 months",
    rating: 4,
    hasWarranty: true,
  },
  {
    id: "3",
    service: "Washing Machine Motor Fix",
    bookingId: "BK032",
    customer: "Amit Patel",
    completedDate: "12/15/2025",
    componentsUsed: "Motor Belt, Bearings",
    warranty: "3 months",
    rating: 5,
    hasWarranty: false,
  },
  {
    id: "4",
    service: "Refrigerator Thermostat Repair",
    bookingId: "BK027",
    customer: "Sneha Reddy",
    completedDate: "11/20/2025",
    componentsUsed: "Thermostat Unit",
    warranty: "6 months",
    rating: 5,
    hasWarranty: true,
  },
];

const workerStats = {
  totalCompleted: 47,
  averageRating: 4.6,
  totalEarnings: 23500,
  thisMonth: 8,
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="star-rating">
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star} className={star <= rating ? "star filled" : "star"}>
        ★
      </span>
    ))}
  </div>
);

const WorkerProfile = ({ currentWorker, onLogout }: WorkerProfileProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"all" | "warranty">("all");

  const filteredWorks =
    activeTab === "warranty"
      ? completedWorks.filter((w) => w.hasWarranty)
      : completedWorks;

  return (
    <>
      <header className="worker-navbar">
        <div className="worker-navbar-inner">
          <a href="/worker/dashboard" className="worker-logo">
            CareMyLap<span className="worker-logo-accent">.com</span>
          </a>

          <nav className="worker-nav-links">
            <button type="button" className="worker-nav-link" onClick={() => navigate("/worker/dashboard")}>Dashboard</button>
            <button type="button" className="worker-nav-link active">Profile</button>
          </nav>

          <div className="worker-nav-actions">
            <button type="button" className="worker-btn-ghost" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </header>

      <div className="profile-page">

      {/* Profile card */}
      <section className="profile-card">
        <div className="profile-card-top">
          <div className="profile-avatar">{getInitials(currentWorker.name)}</div>
          <div className="profile-info">
            <h2>{currentWorker.name}</h2>
            <p className="profile-worker-id">
              Worker ID: {currentWorker.workerId}
            </p>
            <div className="profile-badges">
              <span className="profile-badge rating-badge">
                ⭐ {workerStats.averageRating} Rating
              </span>
              <span className="profile-badge jobs-badge">
                ✓ {workerStats.totalCompleted} Jobs Completed
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats grid */}
      <section className="profile-stats-grid">
        <div className="profile-stat-card">
          <p className="stat-label">Total Completed</p>
          <h3 className="stat-value">{workerStats.totalCompleted}</h3>
        </div>
        <div className="profile-stat-card">
          <p className="stat-label">Average Rating</p>
          <h3 className="stat-value">
            {workerStats.averageRating} <span className="stat-star">⭐</span>
          </h3>
        </div>
        <div className="profile-stat-card">
          <p className="stat-label">Total Earnings</p>
          <h3 className="stat-value">₹{workerStats.totalEarnings.toLocaleString("en-IN")}</h3>
        </div>
        <div className="profile-stat-card">
          <p className="stat-label">This Month</p>
          <h3 className="stat-value">{workerStats.thisMonth}</h3>
        </div>
      </section>

      {/* Work History */}
      <section className="work-history-section">
        <h3>Work History</h3>
        <p className="work-history-sub">View all your completed jobs</p>

        <div className="work-tabs">
          <button
            type="button"
            className={`work-tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Works
          </button>
          <button
            type="button"
            className={`work-tab ${activeTab === "warranty" ? "active" : ""}`}
            onClick={() => setActiveTab("warranty")}
          >
            With Warranty
          </button>
        </div>

        <div className="work-list">
          {filteredWorks.map((work) => (
            <article key={work.id} className="work-card">
              <div className="work-card-image">
                <span>Completed work</span>
              </div>
              <div className="work-card-details">
                <div className="work-card-header">
                  <div>
                    <h4>{work.service}</h4>
                    <p className="work-booking-id">Booking #{work.bookingId}</p>
                  </div>
                  <StarRating rating={work.rating} />
                </div>
                <div className="work-card-meta">
                  <p><strong>Customer:</strong> {work.customer}</p>
                  <p><strong>Completed:</strong> {work.completedDate}</p>
                  <p><strong>Components Used:</strong> {work.componentsUsed}</p>
                  <p><strong>Warranty:</strong> {work.warranty}</p>
                </div>
                {work.hasWarranty && (
                  <span className="warranty-badge">Under Warranty</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      </div>
    </>
  );
};

export default WorkerProfile;
