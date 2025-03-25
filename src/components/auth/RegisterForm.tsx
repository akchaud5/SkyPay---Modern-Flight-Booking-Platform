'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useForm, FormErrors } from '@/hooks/useForm';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import { FiUser, FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export default function RegisterForm() {
  const router = useRouter();
  const { register, isLoading, error: authError, resetError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  const initialValues: RegisterFormValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  };
  
  const validate = (values: RegisterFormValues) => {
    const errors: FormErrors = {};
    
    if (!values.name) {
      errors.name = 'Name is required';
    }
    
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!values.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    return errors;
  };
  
  const handleSubmit = async (values: RegisterFormValues) => {
    resetError();
    
    try {
      await register(values.name, values.email, values.password);
      router.push('/flights');
    } catch (error) {
      // Error is handled by the auth context
      console.error('Registration error:', error);
    }
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const { 
    values, 
    errors, 
    touched, 
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
    <Card>
      {authError && (
        <div className="mb-6 p-4 bg-error-50 dark:bg-error-900/20 text-error-600 dark:text-error-400 rounded-md flex items-start">
          <FiAlertCircle className="mt-0.5 mr-3 flex-shrink-0" />
          <span>{authError}</span>
        </div>
      )}
      
      <form onSubmit={submitForm} className="space-y-6">
        <Input
          label="Full Name"
          name="name"
          id="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && errors.name ? errors.name as string : ''}
          leftIcon={<FiUser />}
          autoComplete="name"
          required
        />
        
        <Input
          label="Email Address"
          name="email"
          id="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email ? errors.email as string : ''}
          leftIcon={<FiMail />}
          autoComplete="email"
          required
        />
        
        <Input
          label="Password"
          name="password"
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && errors.password ? errors.password as string : ''}
          helperText="Must be at least 8 characters"
          leftIcon={<FiLock />}
          autoComplete="new-password"
          required
        />
        
        <div>
          <Input
            label="Confirm Password"
            name="confirmPassword"
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword as string : ''}
            leftIcon={<FiLock />}
            autoComplete="new-password"
            required
          />
          
          <div className="text-right mt-2">
            <button
              type="button"
              onClick={toggleShowPassword}
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              {showPassword ? 'Hide' : 'Show'} password
            </button>
          </div>
        </div>
        
        <div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                name="agreeToTerms"
                id="agreeToTerms"
                checked={values.agreeToTerms}
                onChange={(e) => setFieldValue('agreeToTerms', e.target.checked)}
                className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:focus:ring-primary-400"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeToTerms" className="text-secondary-600 dark:text-secondary-400">
                I agree to the <a href="/terms" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">Terms and Conditions</a> and <a href="/privacy" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">Privacy Policy</a>
              </label>
              {touched.agreeToTerms && errors.agreeToTerms && (
                <div className="form-error mt-1">{errors.agreeToTerms as string}</div>
              )}
            </div>
          </div>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
        >
          Create Account
        </Button>
      </form>
      
      <div className="mt-8 pt-6 border-t border-secondary-200 dark:border-secondary-700 text-center">
        <p className="text-secondary-600 dark:text-secondary-400">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </Card>
  );
}
