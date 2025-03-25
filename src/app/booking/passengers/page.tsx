import { Metadata } from 'next';
import PassengerForm from '@/components/booking/PassengerForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Passenger Information | SkyPay',
  description: 'Enter passenger details for your flight booking',
};

export default function PassengersPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">Passenger Information</h1>
      <p className="text-secondary-600 dark:text-secondary-400 mb-8">
        Please enter the details of all passengers traveling on this flight.
      </p>
      
      <PassengerForm />
    </div>
  );
}
