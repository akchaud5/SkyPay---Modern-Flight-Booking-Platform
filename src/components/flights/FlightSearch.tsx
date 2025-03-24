'use client';

import { useState } from 'react';
import { useForm } from '@/hooks/useForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFlights } from '@/context/FlightContext';
import { format } from 'date-fns';
import FlightSearchForm from './FlightSearchForm';
import FlightResults from './FlightResults';
import Card from '../common/Card';

const flightSearchSchema = z.object({
  from: z.string().min(3, 'Please select a departure airport'),
  to: z.string().min(3, 'Please select an arrival airport'),
  departDate: z.string().min(1, 'Please select a departure date'),
  returnDate: z.string().optional(),
  tripType: z.enum(['oneWay', 'roundTrip']),
  passengers: z.number().min(1, 'At least 1 passenger is required').max(9, 'Maximum 9 passengers allowed'),
  cabinClass: z.enum(['economy', 'premium', 'business', 'first']),
}).refine(data => data.from !== data.to, {
  message: 'Departure and arrival airports must be different',
  path: ['to'],
});

type FlightSearchValues = z.infer<typeof flightSearchSchema>;

export default function FlightSearch() {
  const { searchFlights, flights, isLoading, error } = useFlights();
  const [showResults, setShowResults] = useState(false);
  
  const initialValues: FlightSearchValues = {
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    tripType: 'oneWay',
    passengers: 1,
    cabinClass: 'economy',
  };
  
  const validate = (values: FlightSearchValues) => {
    try {
      flightSearchSchema.parse(values);
      return {};
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as string] = err.message;
          }
        });
        return formattedErrors;
      }
      return {};
    }
  };
  
  const handleSubmit = async (values: FlightSearchValues) => {
    try {
      await searchFlights({
        from: values.from,
        to: values.to,
        departDate: values.departDate,
        returnDate: values.tripType === 'roundTrip' ? values.returnDate : undefined,
        passengers: values.passengers,
        cabinClass: values.cabinClass,
      });
      setShowResults(true);
    } catch (error) {
      console.error('Flight search error:', error);
    }
  };
  
  const { 
    values, 
    errors, 
    touched, 
    isSubmitting, 
    handleChange, 
    handleBlur, 
    handleSubmit: submitForm, 
    setFieldValue,
  } = useForm({
    initialValues,
    validate,
    onSubmit: handleSubmit,
  });
  
  return (
    <div>
      <Card className="mb-8">
        <FlightSearchForm
          values={values}
          errors={errors}
          touched={touched}
          isSubmitting={isSubmitting}
          handleChange={handleChange}
          handleBlur={handleBlur}
          submitForm={submitForm}
          setFieldValue={setFieldValue}
        />
      </Card>
      
      {showResults && (
        <FlightResults
          flights={flights}
          isLoading={isLoading}
          error={error}
          searchParams={{
            from: values.from,
            to: values.to,
            departDate: values.departDate,
            returnDate: values.tripType === 'roundTrip' ? values.returnDate : undefined,
            passengers: values.passengers,
            cabinClass: values.cabinClass,
          }}
        />
      )}
    </div>
  );
}
