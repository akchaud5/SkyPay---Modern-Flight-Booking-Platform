export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface Flight {
  id: string;
  airline: {
    code: string;
    name: string;
    logo: string;
  };
  flightNumber: string;
  departure: {
    airport: Airport;
    time: string;
    terminal: string;
  };
  arrival: {
    airport: Airport;
    time: string;
    terminal: string;
  };
  duration: string;
  price: {
    amount: number;
    currency: string;
  };
  seatsAvailable: number;
  cabinClass: 'economy' | 'premium' | 'business' | 'first';
}

export interface FlightSearchParams {
  from: string;
  to: string;
  departDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: 'economy' | 'premium' | 'business' | 'first';
}

export interface Passenger {
  id: string;
  type: 'adult' | 'child' | 'infant';
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber?: string;
  passportExpiry?: string;
}

export interface BookingState {
  outboundFlight: Flight | null;
  returnFlight: Flight | null;
  passengers: Passenger[];
  contactDetails: {
    email: string;
    phone: string;
  } | null;
  totalPrice: number;
  bookingReference?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'applepay' | 'googlepay';
  details: any;
  isDefault: boolean;
}

export interface PaymentState {
  selectedPaymentMethod: PaymentMethod | null;
  savedPaymentMethods: PaymentMethod[];
  isProcessing: boolean;
  error: string | null;
  paymentComplete: boolean;
  transactionId?: string;
}
