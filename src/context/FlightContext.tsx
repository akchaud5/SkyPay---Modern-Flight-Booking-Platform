'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Flight, FlightSearchParams } from '@/types';

interface FlightState {
  flights: Flight[];
  isLoading: boolean;
  error: string | null;
  searchParams: FlightSearchParams | null;
}

interface FlightContextProps extends FlightState {
  searchFlights: (params: FlightSearchParams) => Promise<void>;
  clearFlights: () => void;
  resetError: () => void;
}

type FlightAction =
  | { type: 'SEARCH_START'; payload: FlightSearchParams }
  | { type: 'SEARCH_SUCCESS'; payload: Flight[] }
  | { type: 'SEARCH_FAILURE'; payload: string }
  | { type: 'CLEAR_FLIGHTS' }
  | { type: 'RESET_ERROR' };

const initialState: FlightState = {
  flights: [],
  isLoading: false,
  error: null,
  searchParams: null,
};

function flightReducer(state: FlightState, action: FlightAction): FlightState {
  switch (action.type) {
    case 'SEARCH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
        searchParams: action.payload,
      };
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        flights: action.payload,
        isLoading: false,
      };
    case 'SEARCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        flights: [],
      };
    case 'CLEAR_FLIGHTS':
      return {
        ...state,
        flights: [],
        searchParams: null,
      };
    case 'RESET_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

const FlightContext = createContext<FlightContextProps | undefined>(undefined);

// Mock API function
const mockSearchFlights = async (params: FlightSearchParams): Promise<Flight[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate mock flights based on search parameters
  const airlines = [
    { code: 'BA', name: 'British Airways', logo: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=50&h=50' },
    { code: 'AF', name: 'Air France', logo: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=50&h=50' },
    { code: 'LH', name: 'Lufthansa', logo: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=50&h=50' },
    { code: 'EK', name: 'Emirates', logo: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=50&h=50' },
  ];
  
  const airports = {
    'LHR': { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'United Kingdom' },
    'CDG': { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
    'FRA': { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
    'JFK': { code: 'JFK', name: 'John F. Kennedy Airport', city: 'New York', country: 'United States' },
    'LAX': { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'United States' },
    'DXB': { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates' },
  };
  
  const departureAirport = airports[params.from as keyof typeof airports];
  const arrivalAirport = airports[params.to as keyof typeof airports];
  
  if (!departureAirport || !arrivalAirport) {
    throw new Error('Invalid airports selected');
  }
  
  // Generate 5-10 random flights
  const numFlights = Math.floor(Math.random() * 6) + 5;
  const flights: Flight[] = [];
  
  for (let i = 0; i < numFlights; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const flightNumber = `${airline.code}${Math.floor(Math.random() * 1000) + 100}`;
    
    // Generate random departure time
    const departDate = new Date(params.departDate);
    departDate.setHours(Math.floor(Math.random() * 24));
    departDate.setMinutes(Math.floor(Math.random() * 4) * 15);
    
    // Calculate random duration between 1-12 hours
    const durationHours = Math.floor(Math.random() * 8) + 1;
    const durationMinutes = Math.floor(Math.random() * 4) * 15;
    
    // Calculate arrival time based on duration
    const arrivalDate = new Date(departDate.getTime());
    arrivalDate.setHours(arrivalDate.getHours() + durationHours);
    arrivalDate.setMinutes(arrivalDate.getMinutes() + durationMinutes);
    
    // Generate random price based on cabin class
    let basePrice = 0;
    switch (params.cabinClass) {
      case 'economy':
        basePrice = 100;
        break;
      case 'premium':
        basePrice = 300;
        break;
      case 'business':
        basePrice = 600;
        break;
      case 'first':
        basePrice = 1200;
        break;
    }
    
    const priceVariation = Math.random() * 0.3 + 0.85; // 85% to 115% of base price
    const finalPrice = Math.round(basePrice * priceVariation) * params.passengers;
    
    flights.push({
      id: `FLIGHT-${i + 1}`,
      airline,
      flightNumber,
      departure: {
        airport: departureAirport,
        time: departDate.toISOString(),
        terminal: `T${Math.floor(Math.random() * 5) + 1}`,
      },
      arrival: {
        airport: arrivalAirport,
        time: arrivalDate.toISOString(),
        terminal: `T${Math.floor(Math.random() * 5) + 1}`,
      },
      duration: `${durationHours}h ${durationMinutes}m`,
      price: {
        amount: finalPrice,
        currency: 'USD',
      },
      seatsAvailable: Math.floor(Math.random() * 50) + 1,
      cabinClass: params.cabinClass,
    });
  }
  
  // Sort by price
  return flights.sort((a, b) => a.price.amount - b.price.amount);
};

export function FlightProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(flightReducer, initialState);

  const searchFlights = async (params: FlightSearchParams) => {
    dispatch({ type: 'SEARCH_START', payload: params });
    try {
      const flights = await mockSearchFlights(params);
      dispatch({ type: 'SEARCH_SUCCESS', payload: flights });
    } catch (error) {
      dispatch({ type: 'SEARCH_FAILURE', payload: (error as Error).message });
    }
  };

  const clearFlights = () => {
    dispatch({ type: 'CLEAR_FLIGHTS' });
  };

  const resetError = () => {
    dispatch({ type: 'RESET_ERROR' });
  };

  return (
    <FlightContext.Provider
      value={{
        ...state,
        searchFlights,
        clearFlights,
        resetError,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
}

export function useFlights() {
  const context = useContext(FlightContext);
  if (context === undefined) {
    throw new Error('useFlights must be used within a FlightProvider');
  }
  return context;
}
