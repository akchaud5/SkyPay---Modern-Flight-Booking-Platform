'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Flight, Passenger } from '@/types';
import Card from '../common/Card';
import Button from '../common/Button';
import FlightSummary from './FlightSummary';
import {
  FiCheck,
  FiDownload,
  FiMail,
  FiPrinter,
  FiShare2,
  FiUser,
} from 'react-icons/fi';

interface BookingConfirmationProps {
  bookingReference: string;
  outboundFlight: Flight;
  returnFlight?: Flight | null;
  passengers: Passenger[];
  contactDetails: {
    email: string;
    phone: string;
  };
  totalPrice: number;
}

export default function BookingConfirmation({
  bookingReference,
  outboundFlight,
  returnFlight,
  passengers,
  contactDetails,
  totalPrice,
}: BookingConfirmationProps) {
  const [isEmailSent, setIsEmailSent] = useState(false);
  
  const handleSendEmail = () => {
    // Simulate sending email
    setTimeout(() => {
      setIsEmailSent(true);
    }, 1000);
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="space-y-8">
      <div className="bg-success-50 dark:bg-success-900/20 p-6 rounded-lg border border-success-200 dark:border-success-800">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-success-100 dark:bg-success-800 flex items-center justify-center text-success-600 dark:text-success-400 mb-4 md:mb-0 md:mr-6">
            <FiCheck size={32} />
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-success-700 dark:text-success-400 mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-secondary-600 dark:text-secondary-400">
              Your booking reference is <span className="font-medium text-secondary-900 dark:text-white">{bookingReference}</span>
            </p>
            <p className="text-secondary-600 dark:text-secondary-400 mt-1">
              A confirmation email has been sent to {contactDetails.email}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <Button
          variant="outline"
          icon={<FiMail />}
          onClick={handleSendEmail}
          disabled={isEmailSent}
        >
          {isEmailSent ? 'Email Sent' : 'Email Itinerary'}
        </Button>
        
        <Button
          variant="outline"
          icon={<FiPrinter />}
          onClick={handlePrint}
        >
          Print Itinerary
        </Button>
        
        <Button
          variant="outline"
          icon={<FiDownload />}
        >
          Download PDF
        </Button>
        
        <Button
          variant="outline"
          icon={<FiShare2 />}
        >
          Share
        </Button>
      </div>
      
      <Card>
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">Flight Details</h2>
        
        <div className="space-y-6">
          <FlightSummary 
            flight={outboundFlight} 
            label="Outbound Flight" 
          />
          
          {returnFlight && (
            <FlightSummary 
              flight={returnFlight} 
              label="Return Flight" 
            />
          )}
        </div>
      </Card>
      
      <Card>
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">Passenger Information</h2>
        
        <div className="space-y-4">
          {passengers.map((passenger, index) => (
            <div 
              key={passenger.id}
              className="flex items-center p-4 border border-secondary-200 dark:border-secondary-700 rounded-lg"
            >
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 mr-3">
                <FiUser />
              </div>
              <div>
                <h3 className="font-medium text-secondary-900 dark:text-white">
                  {passenger.title} {passenger.firstName} {passenger.lastName}
                </h3>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  Passenger {index + 1} • {passenger.nationality}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      <Card>
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">Payment Summary</h2>
        
        <div className="space-y-3">
          <div className="flex justify-between text-secondary-700 dark:text-secondary-300">
            <div>Outbound Flight ({passengers.length} {passengers.length === 1 ? 'passenger' : 'passengers'})</div>
            <div>${outboundFlight.price.amount.toLocaleString()}</div>
          </div>
          
          {returnFlight && (
            <div className="flex justify-between text-secondary-700 dark:text-secondary-300">
              <div>Return Flight ({passengers.length} {passengers.length === 1 ? 'passenger' : 'passengers'})</div>
              <div>${returnFlight.price.amount.toLocaleString()}</div>
            </div>
          )}
          
          <div className="flex justify-between text-secondary-700 dark:text-secondary-300">
            <div>Taxes and Fees</div>
            <div>Included</div>
          </div>
          
          <div className="border-t border-secondary-200 dark:border-secondary-700 pt-3 mt-3">
            <div className="flex justify-between font-bold text-lg text-secondary-900 dark:text-white">
              <div>Total Paid</div>
              <div>${totalPrice.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </Card>
      
      <Card>
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">What's Next?</h2>
        
        <div className="space-y-4">
          <div className="p-4 border border-secondary-200 dark:border-secondary-700 rounded-lg">
            <h3 className="font-medium text-secondary-900 dark:text-white mb-2">Online Check-in</h3>
            <p className="text-secondary-600 dark:text-secondary-400 mb-3">
              Online check-in opens 24 hours before your flight. You'll need your booking reference and passenger details.
            </p>
            <Button variant="secondary" size="sm">
              Check-in Online
            </Button>
          </div>
          
          <div className="p-4 border border-secondary-200 dark:border-secondary-700 rounded-lg">
            <h3 className="font-medium text-secondary-900 dark:text-white mb-2">Manage Booking</h3>
            <p className="text-secondary-600 dark:text-secondary-400 mb-3">
              Need to make changes to your booking? You can modify your seat selection, add baggage, or request special assistance.
            </p>
            <Button variant="secondary" size="sm">
              Manage Booking
            </Button>
          </div>
        </div>
      </Card>
      
      <div className="text-center mt-8">
        <p className="text-secondary-600 dark:text-secondary-400 mb-4">
          Thank you for booking with SkyPay. We hope you have a pleasant flight!
        </p>
        <Link href="/flights" className="btn-primary inline-block">
          Book Another Flight
        </Link>
      </div>
    </div>
  );
}
