'use client';

import { useRouter } from 'next/navigation';
import { useBooking } from '@/context/BookingContext';
import { format } from 'date-fns';
import Card from '../common/Card';
import Button from '../common/Button';
import FlightSummary from './FlightSummary';
import { FiAlertCircle, FiUser, FiMail, FiPhone, FiCheck, FiArrowRight } from 'react-icons/fi';

export default function BookingReview() {
  const router = useRouter();
  const { 
    outboundFlight, 
    returnFlight, 
    passengers, 
    contactDetails, 
    totalPrice 
  } = useBooking();
  
  // Redirect if no flight or passengers
  if (!outboundFlight || passengers.length === 0 || !contactDetails) {
    router.push('/flights');
    return null;
  }
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };
  
  const handleProceedToPayment = () => {
    router.push('/booking/payment');
  };
  
  return (
    <div className="space-y-8">
      {/* Flight Summary */}
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
      
      {/* Passenger Information */}
      <Card>
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">Passenger Information</h2>
        
        <div className="space-y-4">
          {passengers.map((passenger, index) => (
            <div 
              key={passenger.id}
              className="p-4 border border-secondary-200 dark:border-secondary-700 rounded-lg"
            >
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 mr-3">
                  <FiUser />
                </div>
                <h3 className="font-medium text-secondary-900 dark:text-white">
                  Passenger {index + 1}: {passenger.title} {passenger.firstName} {passenger.lastName}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-secondary-600 dark:text-secondary-400">
                <div>
                  <p><strong>Date of Birth:</strong> {formatDate(passenger.dateOfBirth)}</p>
                  <p><strong>Nationality:</strong> {passenger.nationality}</p>
                </div>
                <div>
                  <p><strong>Passport Number:</strong> {passenger.passportNumber}</p>
                  <p><strong>Passport Expiry:</strong> {formatDate(passenger.passportExpiry || '')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Contact Information */}
      <Card>
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">Contact Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-secondary-700 dark:text-secondary-300">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 mr-3">
              <FiMail />
            </div>
            <div>
              <div className="text-sm text-secondary-500 dark:text-secondary-400">Email</div>
              <div>{contactDetails.email}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 mr-3">
              <FiPhone />
            </div>
            <div>
              <div className="text-sm text-secondary-500 dark:text-secondary-400">Phone</div>
              <div>{contactDetails.phone}</div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Price Summary */}
      <Card>
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">Price Summary</h2>
        
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
              <div>Total</div>
              <div>${totalPrice.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Terms and Continue */}
      <Card>
        <div className="flex items-start space-x-4 mb-6">
          <div className="mt-1 text-success-600 dark:text-success-400">
            <FiCheck size={20} />
          </div>
          <div className="text-sm text-secondary-700 dark:text-secondary-300">
            By proceeding to payment, you agree to our <a href="/terms" className="text-primary-600 dark:text-primary-400 hover:underline">Terms and Conditions</a> and <a href="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</a>. You confirm that all passenger information is correct and matches their travel documents.
          </div>
        </div>
        
        <div className="flex items-start space-x-4 mb-6">
          <div className="mt-1 text-warning-600 dark:text-warning-400">
            <FiAlertCircle size={20} />
          </div>
          <div className="text-sm text-secondary-700 dark:text-secondary-300">
            Please ensure all information is correct before proceeding. Changes after payment may incur additional fees.
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleProceedToPayment} 
            variant="primary" 
            size="lg"
            icon={<FiArrowRight />}
            iconPosition="right"
          >
            Proceed to Payment
          </Button>
        </div>
      </Card>
    </div>
  );
}
