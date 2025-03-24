import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthProvider } from '@/context/AuthContext';
import { FlightProvider } from '@/context/FlightContext';
import { BookingProvider } from '@/context/BookingContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SkyPay - Flight Booking & Payment',
  description: 'Book flights and make secure payments with SkyPay',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <FlightProvider>
              <BookingProvider>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-grow">{children}</main>
                  <Footer />
                </div>
                <ToastContainer position="top-right" autoClose={5000} />
              </BookingProvider>
            </FlightProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
