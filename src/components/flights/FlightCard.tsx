'use client';

import { Flight } from '@/types';
import { format } from 'date-fns';
import Image from 'next/image';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import Card from '@/components/common/Card';
import { FiClock, FiCalendar, FiMapPin } from 'react-icons/fi';

interface FlightCardProps {
  flight: Flight;
  onSelect: () => void;
  passengers: number;
}

export default function FlightCard({ flight, onSelect, passengers }: FlightCardProps) {
  const { 
    airline, 
    flightNumber, 
    departure, 
    arrival, 
    duration, 
    price, 
    seatsAvailable, 
    cabinClass 
  } = flight;
  
  const departureTime = new Date(departure.time);
  const arrivalTime = new Date(arrival.time);
  
  const formatTime = (date: Date) => format(date, 'h:mm a');
  const formatDate = (date: Date) => format(date, 'EEE, MMM d');
  
  const getCabinClassLabel = (cabinClass: string) => {
    switch (cabinClass) {
      case 'economy': return 'Economy';
      case 'premium': return 'Premium Economy';
      case 'business': return 'Business';
      case 'first': return 'First Class';
      default: return cabinClass;
    }
  };
  
  const getSeatsLabel = () => {
    if (seatsAvailable > 9) return 'Many seats available';
    if (seatsAvailable > 5) return 'Limited seats available';
    return `Only ${seatsAvailable} ${seatsAvailable === 1 ? 'seat' : 'seats'} left`;
  };
  
  const getSeatsVariant = () => {
    if (seatsAvailable > 9) return 'success';
    if (seatsAvailable > 5) return 'warning';
    return 'error';
  };
  
  return (
    <Card className="border border-secondary-200 dark:border-secondary-700 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-12 h-12 relative mr-4 flex-shrink-0">
            <Image 
              src={airline.logo} 
              alt={airline.name} 
              width={48} 
              height={48}
              className="rounded-md object-contain"
            />
          </div>
          
          <div>
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                {airline.name}
              </h3>
              <span className="text-sm text-secondary-500 dark:text-secondary-400 ml-2">
                {flightNumber}
              </span>
            </div>
            <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-400">
              <Badge variant={getSeatsVariant()} size="sm" className="mr-2">
                {getSeatsLabel()}
              </Badge>
              <span className="capitalize">{getCabinClassLabel(cabinClass)}</span>
            </div>
          </div>
        </div>
        
        <div className="font-semibold text-xl text-secondary-900 dark:text-white mb-4 md:mb-0 md:hidden">
          ${price.amount.toLocaleString()}
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-10 gap-4">
        <div className="md:col-span-3 flex flex-col">
          <div className="text-2xl font-semibold text-secondary-900 dark:text-white">
            {formatTime(departureTime)}
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400 flex items-center mt-1">
            <FiCalendar className="mr-1" size={14} /> {formatDate(departureTime)}
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400 flex items-center mt-1">
            <FiMapPin className="mr-1" size={14} /> {departure.airport.city} ({departure.airport.code})
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
              <div className="w-3 h-3 rounded-full bg-primary-600 dark:bg-primary-400"></div>
              <div className="w-3 h-3 rounded-full bg-primary-600 dark:bg-primary-400"></div>
            </div>
          </div>
          <div className="text-xs text-center text-secondary-500 dark:text-secondary-500">
            Direct Flight
          </div>
        </div>
        
        <div className="md:col-span-3 flex flex-col">
          <div className="text-2xl font-semibold text-secondary-900 dark:text-white">
            {formatTime(arrivalTime)}
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400 flex items-center mt-1">
            <FiCalendar className="mr-1" size={14} /> {formatDate(arrivalTime)}
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400 flex items-center mt-1">
            <FiMapPin className="mr-1" size={14} /> {arrival.airport.city} ({arrival.airport.code})
          </div>
          <div className="text-xs text-secondary-500 dark:text-secondary-500 mt-1">
            Terminal {arrival.terminal}
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex flex-col md:flex-row items-center justify-between pt-4 border-t border-secondary-200 dark:border-secondary-700">
        <div className="mb-4 md:mb-0">
          <div className="text-sm text-secondary-600 dark:text-secondary-400">
            Total for {passengers} {passengers === 1 ? 'passenger' : 'passengers'}
          </div>
          <div className="text-2xl font-bold text-secondary-900 dark:text-white">
            ${price.amount.toLocaleString()}
          </div>
        </div>
        
        <Button onClick={onSelect} variant="primary">
          Select Flight
        </Button>
      </div>
    </Card>
  );
}
