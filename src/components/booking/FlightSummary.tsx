'use client';

import { Flight } from '@/types';
import { format } from 'date-fns';
import Image from 'next/image';
import { FiClock, FiCalendar, FiMapPin } from 'react-icons/fi';

interface FlightSummaryProps {
  flight: Flight;
  label?: string;
}

export default function FlightSummary({ flight, label }: FlightSummaryProps) {
  const { 
    airline, 
    flightNumber, 
    departure, 
    arrival, 
    duration, 
    cabinClass 
  } = flight;
  
  const departureTime = new Date(departure.time);
  const arrivalTime = new Date(arrival.time);
  
  const formatTime = (date: Date) => format(date, 'h:mm a');
  const formatDate = (date: Date) => format(date, 'EEE, MMM d, yyyy');
  
  const getCabinClassLabel = (cabinClass: string) => {
    switch (cabinClass) {
      case 'economy': return 'Economy';
      case 'premium': return 'Premium Economy';
      case 'business': return 'Business';
      case 'first': return 'First Class';
      default: return cabinClass;
    }
  };
  
  return (
    <div className="border border-secondary-200 dark:border-secondary-700 rounded-lg p-4">
      {label && (
        <div className="text-sm font-medium text-secondary-500 dark:text-secondary-400 mb-3">
          {label}
        </div>
      )}
      
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 relative mr-3 flex-shrink-0">
          <Image 
            src={airline.logo} 
            alt={airline.name} 
            width={40} 
            height={40}
            className="rounded object-contain"
          />
        </div>
        
        <div>
          <div className="font-medium text-secondary-900 dark:text-white">
            {airline.name} ({flightNumber})
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400">
            {getCabinClassLabel(cabinClass)}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
        <div className="md:col-span-3">
          <div className="text-xl font-semibold text-secondary-900 dark:text-white">
            {formatTime(departureTime)}
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400 flex items-center mt-1">
            <FiCalendar className="mr-1" size={14} /> {formatDate(departureTime)}
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
            {departure.airport.city} ({departure.airport.code})
          </div>
          <div className="text-xs text-secondary-500 dark:text-secondary-500 mt-1">
            Terminal {departure.terminal}
          </div>
        </div>
        
        <div className="md:col-span-4 flex flex-col items-center justify-center">
          <div className="text-sm text-secondary-600 dark:text-secondary-400 flex items-center">
            <FiClock className="mr-1" size={14} /> {duration}
          </div>
          <div className="relative w-full my-2">
            <div className="absolute top-1/2 left-0 right-0 border-t-2 border-dashed border-secondary-300 dark:border-secondary-600 -z-10"></div>
            <div className="flex justify-between">
              <div className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400"></div>
              <div className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400"></div>
            </div>
          </div>
          <div className="text-xs text-center text-secondary-500 dark:text-secondary-500">
            Direct Flight
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="text-xl font-semibold text-secondary-900 dark:text-white">
            {formatTime(arrivalTime)}
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400 flex items-center mt-1">
            <FiCalendar className="mr-1" size={14} /> {formatDate(arrivalTime)}
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
            {arrival.airport.city} ({arrival.airport.code})
          </div>
          <div className="text-xs text-secondary-500 dark:text-secondary-500 mt-1">
            Terminal {arrival.terminal}
          </div>
        </div>
      </div>
    </div>
  );
}
