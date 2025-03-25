'use client';

import { forwardRef, SelectHTMLAttributes } from 'react';
import { FiAlertCircle, FiChevronDown } from 'react-icons/fi';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode; // Add this to support leftIcon prop from other components
}

const Select = forwardRef<HTMLSelectElement, SelectProps>((
  {
    label,
    options,
    error,
    helperText,
    fullWidth = true,
    size = 'md',
    className = '',
    leftIcon, // Add this to destructure the prop (and not pass it to DOM)
    ...props
  },
  ref
) => {
  const sizeClasses = {
    sm: 'py-1.5 text-xs',
    md: 'py-2 text-sm',
    lg: 'py-3 text-base',
  };
  
  const selectClasses = `
    input appearance-none pr-10 ${sizeClasses[size]}
    ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-500 dark:border-error-600 dark:focus:border-error-500 dark:focus:ring-error-500' : ''}
    ${className}
  `;
  
  const wrapperClasses = `
    ${fullWidth ? 'w-full' : 'w-auto'}
  `;
  
  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={props.id} className="form-label">
          {label}
        </label>
      )}
      
      <div className="relative rounded-md">
        <select
          ref={ref}
          className={selectClasses}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-secondary-500 dark:text-secondary-400">
          <FiChevronDown className="h-4 w-4" />
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

Select.displayName = 'Select';

export default Select;
