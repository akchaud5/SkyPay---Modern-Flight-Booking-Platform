import BookingReview from '@/components/booking/BookingReview';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Review Booking | SkyPay',
  description: 'Review your flight booking details before payment',
};

export default function BookingReviewPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">Review Your Booking</h1>
      <p className="text-secondary-600 dark:text-secondary-400 mb-8">
        Please review your booking details before proceeding to payment.
      </p>
      
      <BookingReview />
    </div>
  );
}
