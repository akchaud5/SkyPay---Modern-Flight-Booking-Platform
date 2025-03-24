'use client';

import { FormEvent, ChangeEvent, FocusEvent } from 'react';
import { FormErrors } from '@/hooks/useForm';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import DatePicker from '../common/DatePicker';
import { FiCalendar, FiMapPin, FiUsers, FiSearch } from 'react-icons/fi';

interface FlightSearchValues {
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  tripType: 'oneWay' | 'roundTrip';
  passengers: number;
  cabinClass: 'economy' | 'premium' | 'business' | 'first';
}

interface FlightSearchFormProps {
  values: FlightSearchValues;
  errors: FormErrors;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  submitForm: (e: FormEvent) => void;
  setFieldValue: (name: string, value: any) => void;
}

const cabinClassOptions = [
  { value: 'economy', label: 'Economy' },
  { value: 'premium', label: 'Premium Economy' },
  { value: 'business', label: 'Business' },
  { value: 'first', label: 'First Class' },
];

const airportOptions = [
  { value: 'LHR', label: 'London Heathrow (LHR)' },
  { value: 'CDG', label: 'Paris Charles de Gaulle (CDG)' },
  { value: 'FRA', label: 'Frankfurt Airport (FRA)' },
  { value: 'JFK', label: 'New York JFK (JFK)' },
  { value: 'LAX', label: 'Los Angeles (LAX)' },
  { value: 'DXB', label: 'Dubai International (DXB)' },
];

export default function FlightSearchForm({
  values,
  errors,
  touched,
  isSubmitting,
  handleChange,
  handleBlur,
  submitForm,
  setFieldValue,
}: FlightSearchFormProps) {
  const handleDepartDateChange = (date: Date | null) => {
    if (date) {
      setFieldValue('departDate', date.toISOString());
      
      // If the return date is before the depart date, update it
      if (values.returnDate && new Date(values.returnDate) < date) {
        setFieldValue('returnDate', date.toISOString());
      }
    } else {
      setFieldValue('departDate', '');
    }
  };
  
  const handleReturnDateChange = (date: Date | null) => {
    if (date) {
      setFieldValue('returnDate', date.toISOString());
    } else {
      setFieldValue('returnDate', '');
    }
  };
  
  const toggleTripType = (type: 'oneWay' | 'roundTrip') => {
    setFieldValue('tripType', type);
    if (type === 'oneWay') {
      setFieldValue('returnDate', '');
    }
  };
  
  const getErrorForField = (field: keyof FlightSearchValues) => {
    return touched[field] && errors[field] ? errors[field] : '';
  };
  
  return (
    <form onSubmit={submitForm} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex space-x-4">
          <div className="space-x-2">
            <button
              type="button"
              className={`px-4 py-2 rounded-full ${values.tripType === 'oneWay' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300' : 'bg-secondary-100 text-secondary-600 dark:bg-secondary-800 dark:text-secondary-400'}`}
              onClick={() => toggleTripType('oneWay')}
            >
              One Way
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-full ${values.tripType === 'roundTrip' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300' : 'bg-secondary-100 text-secondary-600 dark:bg-secondary-800 dark:text-secondary-400'}`}
              onClick={() => toggleTripType('roundTrip')}
            >
              Round Trip
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="From"
          name="from"
          id="from"
          options={airportOptions}
          value={values.from}
          onChange={handleChange}
          onBlur={handleBlur}
          error={getErrorForField('from')}
          required
          leftIcon={<FiMapPin />}
        />
        
        <Select
          label="To"
          name="to"
          id="to"
          options={airportOptions}
          value={values.to}
          onChange={handleChange}
          onBlur={handleBlur}
          error={getErrorForField('to')}
          required
          leftIcon={<FiMapPin />}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DatePicker
          label="Departure Date"
          id="departDate"
          value={values.departDate ? new Date(values.departDate) : null}
          onChange={handleDepartDateChange}
          minDate={new Date()}
          error={getErrorForField('departDate')}
          required
        />
        
        {values.tripType === 'roundTrip' && (
          <DatePicker
            label="Return Date"
            id="returnDate"
            value={values.returnDate ? new Date(values.returnDate) : null}
            onChange={handleReturnDateChange}
            minDate={values.departDate ? new Date(values.departDate) : new Date()}
            error={getErrorForField('returnDate')}
            disabled={!values.departDate}
            required={values.tripType === 'roundTrip'}
          />
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex space-x-4">
          <div className="w-1/3">
            <Input
              label="Passengers"
              name="passengers"
              id="passengers"
              type="number"
              min={1}
              max={9}
              value={values.passengers.toString()}
              onChange={(e) => setFieldValue('passengers', parseInt(e.target.value) || 1)}
              onBlur={handleBlur}
              error={getErrorForField('passengers')}
              required
              leftIcon={<FiUsers />}
            />
          </div>
          
          <div className="w-2/3">
            <Select
              label="Cabin Class"
              name="cabinClass"
              id="cabinClass"
              options={cabinClassOptions}
              value={values.cabinClass}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getErrorForField('cabinClass')}
              required
            />
          </div>
        </div>
        
        <div className="flex items-end justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            icon={<FiSearch />}
            className="w-full md:w-auto"
          >
            Search Flights
          </Button>
        </div>
      </div>
    </form>
  );
}
