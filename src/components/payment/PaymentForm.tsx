'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/context/BookingContext';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import { toast } from 'react-toastify';
import { FiCreditCard, FiLock, FiCalendar, FiUser } from 'react-icons/fi';

export default function PaymentForm() {
  const router = useRouter();
  const { outboundFlight, passengers, contactDetails, totalPrice, completeBooking } = useBooking();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvc: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Redirect if no flight or passengers
  if (typeof window !== 'undefined' && (!outboundFlight || passengers.length === 0 || !contactDetails)) {
    router.push('/flights');
    return null;
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces every 4 digits
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    // Format expiry date with slash
    if (name === 'expiryDate') {
      let formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}`;
      }
      setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validate card number (simplified)
    if (!cardDetails.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    // Validate cardholder name
    if (!cardDetails.cardholderName) {
      newErrors.cardholderName = 'Cardholder name is required';
    }
    
    // Validate expiry date
    if (!cardDetails.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date format (MM/YY)';
    } else {
      const [month, year] = cardDetails.expiryDate.split('/').map(Number);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      
      if (month < 1 || month > 12) {
        newErrors.expiryDate = 'Invalid month';
      } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.expiryDate = 'Card has expired';
      }
    }
    
    // Validate CVC
    if (!cardDetails.cvc) {
      newErrors.cvc = 'CVC is required';
    } else if (!/^\d{3,4}$/.test(cardDetails.cvc)) {
      newErrors.cvc = 'CVC must be 3 or 4 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Complete the booking
      const bookingReference = await completeBooking();
      
      // Show success message
      toast.success('Payment successful!');
      
      // Navigate to confirmation page
      router.push(`/booking/confirmation?ref=${bookingReference}`);
    } catch (error) {
      toast.error('Payment failed. Please try again.');
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-6">
            Card Payment
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                label="Card Number"
                name="cardNumber"
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.cardNumber}
                onChange={handleChange}
                error={errors.cardNumber}
                leftIcon={<FiCreditCard />}
                maxLength={19} // 16 digits + 3 spaces
                required
              />
              
              <Input
                label="Cardholder Name"
                name="cardholderName"
                id="cardholderName"
                type="text"
                placeholder="John Smith"
                value={cardDetails.cardholderName}
                onChange={handleChange}
                error={errors.cardholderName}
                leftIcon={<FiUser />}
                required
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  name="expiryDate"
                  id="expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiryDate}
                  onChange={handleChange}
                  error={errors.expiryDate}
                  leftIcon={<FiCalendar />}
                  maxLength={5} // MM/YY
                  required
                />
                
                <Input
                  label="CVC"
                  name="cvc"
                  id="cvc"
                  type="text"
                  placeholder="123"
                  value={cardDetails.cvc}
                  onChange={handleChange}
                  error={errors.cvc}
                  leftIcon={<FiLock />}
                  maxLength={4}
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center mt-6 text-sm text-secondary-600 dark:text-secondary-400">
              <FiLock className="mr-2 text-success-600 dark:text-success-400" />
              Your payment is secure. We use encryption to protect your card details.
            </div>
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              isLoading={isProcessing}
            >
              Pay ${totalPrice!.toLocaleString()}
            </Button>
          </form>
        </Card>
      </div>
      
      <div className="lg:col-span-1">
        <Card>
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
            Order Summary
          </h2>
          
          <div className="space-y-3">
            <div className="flex justify-between text-secondary-700 dark:text-secondary-300">
              <div>Flight</div>
              <div>${outboundFlight!.price.amount.toLocaleString()}</div>
            </div>
            
            <div className="flex justify-between text-secondary-700 dark:text-secondary-300">
              <div>Passengers</div>
              <div>{passengers.length}</div>
            </div>
            
            <div className="flex justify-between text-secondary-700 dark:text-secondary-300">
              <div>Taxes and Fees</div>
              <div>Included</div>
            </div>
            
            <div className="border-t border-secondary-200 dark:border-secondary-700 pt-3 mt-3">
              <div className="flex justify-between font-bold text-lg text-secondary-900 dark:text-white">
                <div>Total</div>
                <div>${totalPrice!.toLocaleString()}</div>
              </div>
              <div className="text-xs text-secondary-500 dark:text-secondary-400 mt-1 text-right">
                All prices are in USD
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg text-sm text-secondary-600 dark:text-secondary-400">
            <h3 className="font-medium text-secondary-900 dark:text-white mb-2">Payment Methods</h3>
            <p className="mb-2">We accept the following payment methods:</p>
            <div className="flex space-x-2">
              <div className="px-2 py-1 bg-white dark:bg-secondary-700 rounded border border-secondary-200 dark:border-secondary-600 text-xs">
                Visa
              </div>
              <div className="px-2 py-1 bg-white dark:bg-secondary-700 rounded border border-secondary-200 dark:border-secondary-600 text-xs">
                Mastercard
              </div>
              <div className="px-2 py-1 bg-white dark:bg-secondary-700 rounded border border-secondary-200 dark:border-secondary-600 text-xs">
                American Express
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
