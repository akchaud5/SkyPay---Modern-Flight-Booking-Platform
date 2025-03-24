'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>((
  {
    label,
    error,
    helperText,
    fullWidth = true,
    leftIcon,
    rightIcon,
    className = '',
    ...props
  },
  ref
) => {
  const inputClasses = `
    input
    ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-500 dark:border-error-600 dark:focus:border-error-500 dark:focus:ring-error-500' : ''}
    ${leftIcon ? 'pl-10' : ''}
    ${rightIcon ? 'pr-10' : ''}
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
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary-400 dark:text-secondary-500">
            {leftIcon}
          </div>
        )}
        
        <input 
          ref={ref} 
          className={inputClasses}
          {...props} 
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-secondary-400 dark:text-secondary-500">
            {rightIcon}
          </div>
        )}
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

Input.displayName = 'Input';

export default Input;
