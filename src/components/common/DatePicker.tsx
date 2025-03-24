'use client';

import { forwardRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { FiCalendar, FiAlertCircle } from 'react-icons/fi';

interface DatePickerProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholderText?: string;
  error?: string;
  helperText?: string;
  id?: string;
  fullWidth?: boolean;
  showTimeSelect?: boolean;
  dateFormat?: string;
  isClearable?: boolean;
  disabled?: boolean;
  required?: boolean;
}

const DatePicker = forwardRef<ReactDatePicker, DatePickerProps>((
  {
    label,
    value,
    onChange,
    minDate,
    maxDate,
    placeholderText = 'Select a date',
    error,
    helperText,
    id,
    fullWidth = true,
    showTimeSelect = false,
    dateFormat = 'MM/dd/yyyy',
    isClearable = true,
    disabled = false,
    required = false,
  },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const inputClasses = `
    input pr-10
    ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-500 dark:border-error-600 dark:focus:border-error-500 dark:focus:ring-error-500' : ''}
    ${disabled ? 'bg-secondary-100 dark:bg-secondary-800 cursor-not-allowed' : ''}
  `;
  
  const wrapperClasses = `
    ${fullWidth ? 'w-full' : 'w-auto'}
  `;
  
  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}{required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <ReactDatePicker
          selected={value}
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText={placeholderText}
          className={inputClasses}
          wrapperClassName="w-full"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          showTimeSelect={showTimeSelect}
          dateFormat={dateFormat}
          isClearable={isClearable}
          disabled={disabled}
          id={id}
          required={required}
          ref={ref as any}
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-secondary-500 dark:text-secondary-400">
          <FiCalendar className={`h-4 w-4 ${isFocused ? 'text-primary-500 dark:text-primary-400' : ''}`} />
        </div>
      </div>
      
      {error && (
        <div className="form-error flex items-center space-x-1">
          <FiAlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-secondary-500 dark:text-secondary-400">{helperText}</p>
      )}
    </div>
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;
