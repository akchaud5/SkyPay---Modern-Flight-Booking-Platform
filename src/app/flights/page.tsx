import FlightSearch from '@/components/flights/FlightSearch';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Flights | SkyPay',
  description: 'Search and book flights to destinations worldwide',
};

export default function FlightsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-8">Find Your Flight</h1>
      <FlightSearch />
    </div>
  );
}
