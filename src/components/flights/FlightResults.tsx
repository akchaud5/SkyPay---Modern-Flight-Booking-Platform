'use client';

import { useEffect } from 'react';
import { Flight, FlightSearchParams } from '@/types';
import Loader from '@/components/common/Loader';
import FlightCard from './FlightCard';
import { useBooking } from '@/context/BookingContext';
import { useRouter } from 'next/navigation';

interface FlightResultsProps {
  flights: Flight[];
  isLoading: boolean;
  error: string | null;
  searchParams: FlightSearchParams;
}

export default function FlightResults({ 
  flights, 
  isLoading, 
  error,
  searchParams,
}: FlightResultsProps) {
  const router = useRouter();
  const { selectOutboundFlight } = useBooking();
  
  // Scroll to results when loaded
  useEffect(() => {
    if (!isLoading && flights.length > 0) {
      const resultsElement = document.getElementById('flight-results');
      if (resultsElement) {
        window.scrollTo({
          top: resultsElement.offsetTop - 100,
          behavior: 'smooth',
        });
      }
    }
  }, [isLoading, flights]);
  
  const handleSelectFlight = (flight: Flight) => {
    selectOutboundFlight(flight);
    router.push('/booking/passengers');
  };
  
  if (isLoading) {
    return (
      <div className="py-12" id="flight-results">
        <div className="text-center">
          <Loader size="lg" />
          <p className="mt-4 text-secondary-600 dark:text-secondary-400">
            Searching for flights...
          </p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-12 bg-error-50 dark:bg-secondary-800 rounded-lg" id="flight-results">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-error-600 dark:text-error-400">
            Error Searching Flights
          </h3>
          <p className="mt-2 text-secondary-600 dark:text-secondary-400">{error}</p>
        </div>
      </div>
    );
  }
  
  if (flights.length === 0 && !isLoading) {
    return (
      <div className="py-12 bg-warning-50 dark:bg-secondary-800 rounded-lg" id="flight-results">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-warning-600 dark:text-warning-400">
            No Flights Found
          </h3>
          <p className="mt-2 text-secondary-600 dark:text-secondary-400">
            We couldn't find any flights matching your search criteria. Please try different dates or destinations.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8" id="flight-results">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-secondary-900 dark:text-white">
          Available Flights
        </h2>
        <div className="text-sm text-secondary-600 dark:text-secondary-400">
          {flights.length} {flights.length === 1 ? 'flight' : 'flights'} found
        </div>
      </div>
      
      <div className="space-y-6">
        {flights.map((flight) => (
          <FlightCard 
            key={flight.id} 
            flight={flight} 
            onSelect={() => handleSelectFlight(flight)}
            passengers={searchParams.passengers}
          />
        ))}
      </div>
    </div>
  );
}
