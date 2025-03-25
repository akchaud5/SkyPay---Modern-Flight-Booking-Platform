'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/context/BookingContext';
import { useAuth } from '@/context/AuthContext';
import { useForm } from '@/hooks/useForm';
import Card from '../common/Card';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import DatePicker from '../common/DatePicker';
import { toast } from 'react-toastify';
import { FiUser, FiUsers, FiCalendar, FiMail, FiPhone } from 'react-icons/fi';

interface PassengerFormValues {
  email: string;
  phone: string;
  passengerInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    passportNumber?: string;
    passportExpiry?: string;
  }[];
}

export default function PassengerForm() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { outboundFlight, passengers, addPassenger, setContactDetails } = useBooking();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalPassengers, setTotalPassengers] = useState(1);
  
  const initialValues: PassengerFormValues = {
    email: isAuthenticated && user ? user.email : '',
    phone: '',
    passengerInfo: Array(totalPassengers).fill({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      nationality: '',
      passportNumber: '',
      passportExpiry: '',
    }),
  };
  
  const validate = (values: PassengerFormValues) => {
    const errors: Record<string, any> = {};
    
    // Email validation
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    
    // Phone validation
    if (!values.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s]{8,15}$/.test(values.phone.replace(/[\s()\-]/g, ''))) {
      errors.phone = 'Invalid phone number';
    }
    
    // Current passenger validation
    const passengerErrors: Record<string, string> = {};
    const passenger = values.passengerInfo[currentIndex];
    
    if (!passenger.firstName) {
      passengerErrors.firstName = 'First name is required';
    }
    
    if (!passenger.lastName) {
      passengerErrors.lastName = 'Last name is required';
    }
    
    if (!passenger.dateOfBirth) {
      passengerErrors.dateOfBirth = 'Date of birth is required';
    }
    
    if (!passenger.nationality) {
      passengerErrors.nationality = 'Nationality is required';
    }
    
    if (!passenger.passportNumber) {
      passengerErrors.passportNumber = 'Passport number is required for international flights';
    }
    
    if (!passenger.passportExpiry) {
      passengerErrors.passportExpiry = 'Passport expiry date is required for international flights';
    } else if (new Date(passenger.passportExpiry) <= new Date()) {
      passengerErrors.passportExpiry = 'Passport must not be expired';
    }
    
    if (Object.keys(passengerErrors).length > 0) {
      errors.passengerInfo = { [currentIndex]: passengerErrors };
    }
    
    return errors;
  };
  
  const handleSubmit = async (values: PassengerFormValues) => {
    try {
      // Save contact details
      setContactDetails(values.email, values.phone);
      
      // Add all passengers
      values.passengerInfo.forEach(passenger => {
        addPassenger({
          type: 'adult', // Simplified - would normally determine type based on age
          title: 'Mr', // Simplified - would normally be a form field
          firstName: passenger.firstName,
          lastName: passenger.lastName,
          dateOfBirth: passenger.dateOfBirth,
          nationality: passenger.nationality,
          passportNumber: passenger.passportNumber,
          passportExpiry: passenger.passportExpiry,
        });
      });
      
      // Navigate to payment page
      router.push('/booking/review');
    } catch (error) {
      toast.error('Error saving passenger information. Please try again.');
      console.error('Passenger form error:', error);
    }
  };
  
  const { 
    values, 
    errors, 
    touched, 
    isSubmitting, 
    handleChange, 
    handleBlur, 
    setFieldValue,
    setTouched: setTouchedFields,
  } = useForm({
    initialValues,
    validate,
    onSubmit: handleSubmit,
  });
  
  useEffect(() => {
    // Redirect if no flight is selected
    if (!outboundFlight) {
      router.push('/flights');
      return;
    }
    
    // Set total passengers from the selected flight
    if (outboundFlight) {
      setTotalPassengers(outboundFlight.price.amount / (outboundFlight.price.amount / outboundFlight.price.amount));
    }
    
    // Prefill email if user is authenticated
    if (isAuthenticated && user) {
      setFieldValue('email', user.email);
    }
  }, [outboundFlight, isAuthenticated, user, router, setFieldValue]);
  
  const handleNext = async () => {
    // Validate the current passenger data
    const passengerErrors = validate(values).passengerInfo?.[currentIndex];
    
    if (passengerErrors) {
      // Mark all fields as touched for the current passenger
      const newTouched = { ...touched };
      Object.keys(values.passengerInfo[currentIndex]).forEach(field => {
        newTouched[`passengerInfo[${currentIndex}].${field}`] = true;
      });
      setTouchedFields(newTouched);
      return;
    }
    
    // Move to the next passenger
    setCurrentIndex(currentIndex + 1);
  };
  
  const handlePrevious = () => {
    // Move to the previous passenger
    setCurrentIndex(currentIndex - 1);
  };
  
  const handleComplete = () => {
    // Validate all fields before submission
    if (Object.keys(validate(values)).length > 0) {
      // Mark all fields as touched
      const newTouched: Record<string, boolean> = {};
      newTouched.email = true;
      newTouched.phone = true;
      
      values.passengerInfo.forEach((_, index) => {
        Object.keys(values.passengerInfo[index]).forEach(field => {
          newTouched[`passengerInfo[${index}].${field}`] = true;
        });
      });
      
      setTouchedFields(newTouched);
      return;
    }
    
    // Submit the form
    handleSubmit(values);
  };
  
  const nationalityOptions = [
    { value: '', label: 'Select Nationality' },
    { value: 'US', label: 'United States' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'CA', label: 'Canada' },
    { value: 'AU', label: 'Australia' },
    { value: 'FR', label: 'France' },
    { value: 'DE', label: 'Germany' },
    { value: 'IN', label: 'India' },
    { value: 'JP', label: 'Japan' },
    { value: 'CN', label: 'China' },
    { value: 'BR', label: 'Brazil' },
  ];
  
  const getCurrentPassenger = () => values.passengerInfo[currentIndex] || initialValues.passengerInfo[0];
  
  const getPassengerError = (field: string) => {
    return errors.passengerInfo?.[currentIndex]?.[field] || '';
  };
  
  const isPassengerFieldTouched = (field: string) => {
    return touched[`passengerInfo[${currentIndex}].${field}`] || false;
  };
  
  const isLastPassenger = currentIndex === totalPassengers - 1;
  
  return (
    <div>
      {/* Contact Information */}
      <Card className="mb-8">
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">Contact Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Email Address"
            name="email"
            id="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email ? errors.email : ''}
            leftIcon={<FiMail />}
            required
          />
          
          <Input
            label="Phone Number"
            name="phone"
            id="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone && errors.phone ? errors.phone : ''}
            helperText="Include country code (e.g., +1 for US)"
            leftIcon={<FiPhone />}
            required
          />
        </div>
      </Card>
      
      {/* Passenger Information */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-white">
            Passenger {currentIndex + 1} of {totalPassengers}
          </h2>
          
          <div className="text-sm text-secondary-600 dark:text-secondary-400">
            {Array.from({ length: totalPassengers }).map((_, index) => (
              <span 
                key={index}
                className={`inline-block w-4 h-4 rounded-full mx-1 ${index === currentIndex ? 'bg-primary-600 dark:bg-primary-400' : 'bg-secondary-200 dark:bg-secondary-700'}`}
              />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            name={`passengerInfo[${currentIndex}].firstName`}
            id={`passenger-${currentIndex}-firstName`}
            value={getCurrentPassenger().firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={isPassengerFieldTouched('firstName') ? getPassengerError('firstName') : ''}
            leftIcon={<FiUser />}
            required
          />
          
          <Input
            label="Last Name"
            name={`passengerInfo[${currentIndex}].lastName`}
            id={`passenger-${currentIndex}-lastName`}
            value={getCurrentPassenger().lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={isPassengerFieldTouched('lastName') ? getPassengerError('lastName') : ''}
            leftIcon={<FiUser />}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <DatePicker
            label="Date of Birth"
            id={`passenger-${currentIndex}-dateOfBirth`}
            value={getCurrentPassenger().dateOfBirth ? new Date(getCurrentPassenger().dateOfBirth) : null}
            onChange={(date) => {
              if (date) {
                setFieldValue(`passengerInfo[${currentIndex}].dateOfBirth`, date.toISOString());
              } else {
                setFieldValue(`passengerInfo[${currentIndex}].dateOfBirth`, '');
              }
            }}
            maxDate={new Date()}
            error={isPassengerFieldTouched('dateOfBirth') ? getPassengerError('dateOfBirth') : ''}
            required
          />
          
          <Select
            label="Nationality"
            name={`passengerInfo[${currentIndex}].nationality`}
            id={`passenger-${currentIndex}-nationality`}
            options={nationalityOptions}
            value={getCurrentPassenger().nationality}
            onChange={handleChange}
            onBlur={handleBlur}
            error={isPassengerFieldTouched('nationality') ? getPassengerError('nationality') : ''}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Input
            label="Passport Number"
            name={`passengerInfo[${currentIndex}].passportNumber`}
            id={`passenger-${currentIndex}-passportNumber`}
            value={getCurrentPassenger().passportNumber || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={isPassengerFieldTouched('passportNumber') ? getPassengerError('passportNumber') : ''}
            required
          />
          
          <DatePicker
            label="Passport Expiry Date"
            id={`passenger-${currentIndex}-passportExpiry`}
            value={getCurrentPassenger().passportExpiry ? new Date(getCurrentPassenger().passportExpiry) : null}
            onChange={(date) => {
              if (date) {
                setFieldValue(`passengerInfo[${currentIndex}].passportExpiry`, date.toISOString());
              } else {
                setFieldValue(`passengerInfo[${currentIndex}].passportExpiry`, '');
              }
            }}
            minDate={new Date()}
            error={isPassengerFieldTouched('passportExpiry') ? getPassengerError('passportExpiry') : ''}
            required
          />
        </div>
        
        <div className="flex justify-between mt-8">
          {currentIndex > 0 ? (
            <Button
              onClick={handlePrevious}
              variant="outline"
            >
              Previous Passenger
            </Button>
          ) : (
            <div></div>
          )}
          
          {!isLastPassenger ? (
            <Button
              onClick={handleNext}
              variant="primary"
            >
              Next Passenger
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              variant="primary"
              isLoading={isSubmitting}
            >
              Continue to Review
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
