import PaymentForm from '@/components/payment/PaymentForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment | SkyPay',
  description: 'Complete your booking payment securely',
};

export default function PaymentPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">Payment</h1>
      <p className="text-secondary-600 dark:text-secondary-400 mb-8">
        Complete your booking with a secure payment.
      </p>
      
      <PaymentForm />
    </div>
  );
}
