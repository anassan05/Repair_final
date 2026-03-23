import { ChangeEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

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

interface UsedComponent {
  id: number;
  type: string;
  warrantyMonths: string;
  imagePreview: string;
}

const initialBookings: BookingItem[] = [
  { id: "BK001", service: "Air Conditioner Repair", customer: "Rajesh Kumar", address: "123 MG Road, Bangalore, Karnataka", date: "2026-02-21", status: "assigned" },
  { id: "BK002", service: "Washing Machine Repair", customer: "Priya Singh", address: "456 Koramangala, Bangalore, Karnataka", date: "2026-02-22", status: "assigned" },
  { id: "BK003", service: "Refrigerator Repair", customer: "Amit Patel", address: "789 Indiranagar, Bangalore, Karnataka", date: "2026-02-23", status: "assigned" },
  { id: "BK004", service: "Microwave Repair", customer: "Anjali Sharma", address: "321 Whitefield, Bangalore, Karnataka", date: "2026-02-24", status: "assigned" },
  { id: "BK005", service: "Water Heater Installation", customer: "Vikram Singh", address: "654 Banaswadi, Bangalore, Karnataka", date: "2026-02-25", status: "assigned" },
];

const WorkerDashboard = ({ currentWorker, onLogout }: WorkerDashboardProps) => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<BookingItem[]>(initialBookings);

  const [activeBooking, setActiveBooking] = useState<BookingItem | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [serviceAmount, setServiceAmount] = useState("");
  const [serviceNotes, setServiceNotes] = useState("");
  const [completionImage, setCompletionImage] = useState("");
  const [usedComponents, setUsedComponents] = useState<UsedComponent[]>([
    { id: 1, type: "", warrantyMonths: "", imagePreview: "" },
  ]);

  const assignedBookings = useMemo(
    () => bookings.filter((booking) => booking.status === "assigned"),
    [bookings]
  );

  const openCompleteServiceModal = (booking: BookingItem) => {
    setActiveBooking(booking);
    setCurrentStep(1);
    setOtp("");
    setServiceAmount("");
    setServiceNotes("");
    setCompletionImage("");
    setUsedComponents([{ id: 1, type: "", warrantyMonths: "", imagePreview: "" }]);
  };

  const closeCompleteServiceModal = () => {
    setActiveBooking(null);
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCompletionImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setCompletionImage(URL.createObjectURL(file));
  };

  const handleComponentImage = (componentId: number, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setUsedComponents((prev) =>
      prev.map((component) =>
        component.id === componentId ? { ...component, imagePreview: preview } : component
      )
    );
  };

  const addComponent = () => {
    setUsedComponents((prev) => [
      ...prev,
      { id: Date.now(), type: "", warrantyMonths: "", imagePreview: "" },
    ]);
  };

  const removeComponent = (componentId: number) => {
    setUsedComponents((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((component) => component.id !== componentId);
    });
  };

  const updateComponent = (componentId: number, key: "type" | "warrantyMonths", value: string) => {
    setUsedComponents((prev) =>
      prev.map((component) =>
        component.id === componentId ? { ...component, [key]: value } : component
      )
    );
  };

  const submitCompletion = () => {
    if (!activeBooking) return;

    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === activeBooking.id ? { ...booking, status: "completed" } : booking
      )
    );

    closeCompleteServiceModal();
  };

  return (
    <div className="dashboard-page">
      <header className="worker-navbar">
        <div className="worker-navbar-inner">
          <a href="/worker/dashboard" className="worker-logo">
            CareMyLap<span className="worker-logo-accent">.com</span>
          </a>

          <nav className="worker-nav-links">
            <button type="button" className="worker-nav-link active">Dashboard</button>
            <button type="button" className="worker-nav-link" onClick={() => navigate("/worker/profile")}>Profile</button>
          </nav>

          <div className="worker-nav-actions">
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
                  onClick={() => openCompleteServiceModal(booking)}
                >
                  Complete Service
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>

      {activeBooking && (
        <div className="complete-modal-overlay" onClick={closeCompleteServiceModal}>
          <section className="complete-modal" onClick={(event) => event.stopPropagation()}>
            <div className="complete-modal-head">
              <h4>Complete Service</h4>
              <button type="button" className="complete-modal-close" onClick={closeCompleteServiceModal}>x</button>
            </div>

            <div className="complete-stepper">
              {[1, 2, 3].map((step) => (
                <div key={step} className="stepper-item">
                  <div className={`stepper-circle ${step < currentStep ? "done" : ""} ${step === currentStep ? "active" : ""}`}>
                    {step < currentStep ? "OK" : step}
                  </div>
                  <p>
                    {step === 1 && "OTP Verification"}
                    {step === 2 && "Completion Details"}
                    {step === 3 && "Components"}
                  </p>
                </div>
              ))}
            </div>

            <div className="complete-booking-summary">
              <p><strong>Booking #{activeBooking.id}</strong> - {activeBooking.service}</p>
              <p>Customer: {activeBooking.customer}</p>
            </div>

            <div className="complete-modal-body">
              {currentStep === 1 && (
                <div className="complete-card">
                  <h5>Customer OTP Verification</h5>
                  <p>Ask the customer for their 6-digit booking OTP to verify service completion.</p>
                  <label htmlFor="customer-otp">Customer OTP *</label>
                  <input
                    id="customer-otp"
                    maxLength={6}
                    value={otp}
                    onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6-digit OTP"
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div className="complete-card">
                  <h5>Service Completion Details</h5>
                  <p>Upload completion proof and enter service amount.</p>

                  <label htmlFor="completion-image">Completion Image *</label>
                  <input id="completion-image" type="file" accept="image/*" onChange={handleCompletionImage} />
                  {completionImage && (
                    <img src={completionImage} alt="Completion proof" className="completion-preview" />
                  )}

                  <label htmlFor="service-amount">Service Amount (Rs.) *</label>
                  <input
                    id="service-amount"
                    value={serviceAmount}
                    onChange={(event) => setServiceAmount(event.target.value.replace(/\D/g, ""))}
                    placeholder="Enter amount"
                  />

                  <label htmlFor="service-notes">Notes</label>
                  <textarea
                    id="service-notes"
                    value={serviceNotes}
                    onChange={(event) => setServiceNotes(event.target.value)}
                    placeholder="Any completion notes"
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div className="complete-card">
                  <div className="complete-card-top">
                    <div>
                      <h5>Component Details</h5>
                      <p>Add details for each component used, including image for verification.</p>
                    </div>
                    <button type="button" className="add-component-btn" onClick={addComponent}>Add Component</button>
                  </div>

                  {usedComponents.map((component, index) => (
                    <div key={component.id} className="component-box">
                      <div className="component-box-head">
                        <h6>Component {index + 1}</h6>
                        <button type="button" onClick={() => removeComponent(component.id)}>Remove</button>
                      </div>

                      <label>Component Type *</label>
                      <input
                        value={component.type}
                        onChange={(event) => updateComponent(component.id, "type", event.target.value)}
                        placeholder="Select component type"
                      />

                      <label>Warranty Period (months) *</label>
                      <input
                        value={component.warrantyMonths}
                        onChange={(event) => updateComponent(component.id, "warrantyMonths", event.target.value.replace(/\D/g, ""))}
                        placeholder="e.g. 6, 12, 24"
                      />

                      <label>Barcode/Serial Number Image *</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleComponentImage(component.id, event)}
                      />
                      {component.imagePreview && (
                        <img src={component.imagePreview} alt="Component" className="component-preview" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="complete-modal-foot">
              <button type="button" className="step-btn secondary" onClick={currentStep === 1 ? closeCompleteServiceModal : handleBack}>
                {currentStep === 1 ? "Cancel" : "Back"}
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  className="step-btn primary"
                  onClick={handleNext}
                  disabled={currentStep === 1 && otp.length !== 6}
                >
                  Next
                </button>
              ) : (
                <button type="button" className="step-btn primary" onClick={submitCompletion}>
                  Complete Service
                </button>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default WorkerDashboard;
