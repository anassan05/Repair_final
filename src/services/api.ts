// Mock API - using sessionStorage for data persistence
const MOCK_USERS = 'mock_users';
const MOCK_BOOKINGS = 'mock_bookings';

type MockUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
};

type MockBooking = {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  service: string;
  date: string;
  time: string;
  status: string;
  createdAt: string;
  rating: number | null;
};

// Helper to get mock data from sessionStorage
const getStoredData = <T>(key: string): T | null => {
  const data = sessionStorage.getItem(key);
  return data ? (JSON.parse(data) as T) : null;
};

// Helper to save mock data
const saveStoredData = <T>(key: string, data: T) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

export const userAPI = {
  // Login - mock with sessionStorage
  login: async (email: string, password: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getStoredData<Record<string, MockUser>>(MOCK_USERS) || {};
        const user = users[email];

        if (user && user.password === password) {
          resolve({
            success: true,
            user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
            token: `mock-token-${email}`,
          });
        } else {
          resolve({
            success: false,
            message: 'Invalid email or password',
          });
        }
      }, 500);
    });
  },

  // Register - mock with sessionStorage
  register: async (userData: { name: string; email: string; phone: string; password: string }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getStoredData<Record<string, MockUser>>(MOCK_USERS) || {};

        if (users[userData.email]) {
          resolve({
            success: false,
            message: 'Email already registered',
          });
        } else {
          const newUser = {
            id: `user-${Date.now()}`,
            ...userData,
          };
          users[userData.email] = newUser;
          saveStoredData(MOCK_USERS, users);

          resolve({
            success: true,
            user: { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone },
            token: `mock-token-${userData.email}`,
          });
        }
      }, 500);
    });
  },

  // Create booking
  createBooking: async (bookingData: {
    customerId: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    service: string;
    date: string;
    time: string;
  }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const bookings = getStoredData<MockBooking[]>(MOCK_BOOKINGS) || [];
        const newBooking = {
          id: `booking-${Date.now()}`,
          ...bookingData,
          status: 'confirmed',
          createdAt: new Date().toISOString(),
          rating: null,
        };
        bookings.push(newBooking);
        saveStoredData(MOCK_BOOKINGS, bookings);

        resolve({
          success: true,
          booking: newBooking,
        });
      }, 500);
    });
  },

  // Get user bookings
  getBookings: async (customerId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const bookings = getStoredData<MockBooking[]>(MOCK_BOOKINGS) || [];
        const userBookings = bookings.filter((b) => b.customerId === customerId);

        resolve({
          success: true,
          bookings: userBookings,
        });
      }, 300);
    });
  },

  // Get booking details
  getBookingDetails: async (bookingId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const bookings = getStoredData<MockBooking[]>(MOCK_BOOKINGS) || [];
        const booking = bookings.find((b) => b.id === bookingId);

        resolve(booking || {
          success: false,
          message: 'Booking not found',
        });
      }, 300);
    });
  },

  // Rate booking
  rateBooking: async (bookingId: string, rating: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const bookings = getStoredData<MockBooking[]>(MOCK_BOOKINGS) || [];
        const booking = bookings.find((b) => b.id === bookingId);

        if (booking) {
          booking.rating = rating;
          saveStoredData(MOCK_BOOKINGS, bookings);
          resolve({
            success: true,
            booking,
          });
        } else {
          resolve({
            success: false,
            message: 'Booking not found',
          });
        }
      }, 300);
    });
  },
};

