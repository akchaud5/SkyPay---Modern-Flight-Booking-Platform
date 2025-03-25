'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useBooking } from '@/context/BookingContext';
import BookingConfirmation from '@/components/booking/BookingConfirmation';
import Loader from '@/components/common/Loader';

export const dynamic = 'force-dynamic';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const bookingReference = searchParams.get('ref');
  const { outboundFlight, returnFlight, passengers, contactDetails, totalPrice } = useBooking();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="container py-8 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader size="lg" />
        <p className="mt-4 text-secondary-600 dark:text-secondary-400">
          Generating your booking confirmation...
        </p>
      </div>
    );
  }
  
  if (!bookingReference || !outboundFlight || passengers.length === 0 || !contactDetails) {
    return (
      <div className="container py-8">
        <div className="bg-error-50 dark:bg-secondary-800 p-8 rounded-lg text-center">
          <h1 className="text-3xl font-bold text-error-600 dark:text-error-400 mb-4">
            Booking Not Found
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400 mb-6">
            We couldn't find your booking information. Please contact customer support if you believe this is an error.
          </p>
          <a 
            href="/flights" 
            className="btn-primary"
          >
            Return to Flight Search
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <BookingConfirmation 
        bookingReference={bookingReference}
        outboundFlight={outboundFlight}
        returnFlight={returnFlight}
        passengers={passengers}
        contactDetails={contactDetails}
        totalPrice={totalPrice}
      />
    </div>
  );
}
