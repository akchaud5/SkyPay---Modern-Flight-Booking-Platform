'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Flight, Passenger, BookingState } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface BookingContextProps extends BookingState {
  selectOutboundFlight: (flight: Flight) => void;
  selectReturnFlight: (flight: Flight | null) => void;
  addPassenger: (passenger: Omit<Passenger, 'id'>) => void;
  updatePassenger: (id: string, data: Partial<Passenger>) => void;
  removePassenger: (id: string) => void;
  setContactDetails: (email: string, phone: string) => void;
  resetBooking: () => void;
  completeBooking: () => Promise<string>;
}

type BookingAction =
  | { type: 'SELECT_OUTBOUND_FLIGHT'; payload: Flight }
  | { type: 'SELECT_RETURN_FLIGHT'; payload: Flight | null }
  | { type: 'ADD_PASSENGER'; payload: Passenger }
  | { type: 'UPDATE_PASSENGER'; payload: { id: string; data: Partial<Passenger> } }
  | { type: 'REMOVE_PASSENGER'; payload: string }
  | { type: 'SET_CONTACT_DETAILS'; payload: { email: string; phone: string } }
  | { type: 'RESET_BOOKING' }
  | { type: 'COMPLETE_BOOKING'; payload: string };

const initialState: BookingState = {
  outboundFlight: null,
  returnFlight: null,
  passengers: [],
  contactDetails: null,
  totalPrice: 0,
};

function calculateTotalPrice(state: BookingState): number {
  let total = 0;
  
  // Add outbound flight price
  if (state.outboundFlight) {
    total += state.outboundFlight.price.amount;
  }
  
  // Add return flight price if exists
  if (state.returnFlight) {
    total += state.returnFlight.price.amount;
  }
  
  return total;
}

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'SELECT_OUTBOUND_FLIGHT':
      return {
        ...state,
        outboundFlight: action.payload,
        totalPrice: calculateTotalPrice({
          ...state,
          outboundFlight: action.payload,
        }),
      };
    case 'SELECT_RETURN_FLIGHT':
      return {
        ...state,
        returnFlight: action.payload,
        totalPrice: calculateTotalPrice({
          ...state,
          returnFlight: action.payload,
        }),
      };
    case 'ADD_PASSENGER':
      return {
        ...state,
        passengers: [...state.passengers, action.payload],
      };
    case 'UPDATE_PASSENGER':
      return {
        ...state,
        passengers: state.passengers.map(passenger =>
          passenger.id === action.payload.id
            ? { ...passenger, ...action.payload.data }
            : passenger
        ),
      };
    case 'REMOVE_PASSENGER':
      return {
        ...state,
        passengers: state.passengers.filter(
          passenger => passenger.id !== action.payload
        ),
      };
    case 'SET_CONTACT_DETAILS':
      return {
        ...state,
        contactDetails: action.payload,
      };
    case 'RESET_BOOKING':
      return {
        ...initialState,
      };
    case 'COMPLETE_BOOKING':
      return {
        ...state,
        bookingReference: action.payload,
      };
    default:
      return state;
  }
}

const BookingContext = createContext<BookingContextProps | undefined>(undefined);

// Mock API function
const mockCompleteBooking = async (): Promise<string> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate a random booking reference
  return `SKY${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
};

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const selectOutboundFlight = (flight: Flight) => {
    dispatch({ type: 'SELECT_OUTBOUND_FLIGHT', payload: flight });
  };

  const selectReturnFlight = (flight: Flight | null) => {
    dispatch({ type: 'SELECT_RETURN_FLIGHT', payload: flight });
  };

  const addPassenger = (passenger: Omit<Passenger, 'id'>) => {
    const newPassenger = {
      ...passenger,
      id: uuidv4(),
    };
    dispatch({ type: 'ADD_PASSENGER', payload: newPassenger });
  };

  const updatePassenger = (id: string, data: Partial<Passenger>) => {
    dispatch({ type: 'UPDATE_PASSENGER', payload: { id, data } });
  };

  const removePassenger = (id: string) => {
    dispatch({ type: 'REMOVE_PASSENGER', payload: id });
  };

  const setContactDetails = (email: string, phone: string) => {
    dispatch({
      type: 'SET_CONTACT_DETAILS',
      payload: { email, phone },
    });
  };

  const resetBooking = () => {
    dispatch({ type: 'RESET_BOOKING' });
  };

  const completeBooking = async (): Promise<string> => {
    try {
      const bookingReference = await mockCompleteBooking();
      dispatch({ type: 'COMPLETE_BOOKING', payload: bookingReference });
      return bookingReference;
    } catch (error) {
      throw new Error('Failed to complete booking');
    }
  };

  return (
    <BookingContext.Provider
      value={{
        ...state,
        selectOutboundFlight,
        selectReturnFlight,
        addPassenger,
        updatePassenger,
        removePassenger,
        setContactDetails,
        resetBooking,
        completeBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
