'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useForm, FormErrors } from '@/hooks/useForm';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error: authError, resetError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  const initialValues: LoginFormValues = {
    email: '',
    password: '',
    rememberMe: false,
  };
  

  const validate = (values: LoginFormValues) => {
    const errors: FormErrors = {};
    
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    
    if (!values.password) {
      errors.password = 'Password is required';
    }
    
    return errors;
  };
  
  const handleSubmit = async (values: LoginFormValues) => {
    resetError();
    
    try {
      await login(values.email, values.password);
      router.push('/flights');
    } catch (error) {
      // Error is handled by the auth context
      console.error('Login error:', error);
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
        
        <div>
          <Input
            label="Password"
            name="password"
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password ? errors.password as string : ''}
            leftIcon={<FiLock />}
            autoComplete="current-password"
            required
          />
          
          <div className="flex justify-between mt-2 text-sm">
            <label className="flex items-center text-secondary-600 dark:text-secondary-400">
              <input
                type="checkbox"
                name="rememberMe"
                checked={values.rememberMe}
                onChange={(e) => setFieldValue('rememberMe', e.target.checked)}
                className="mr-2 rounded border-secondary-300 text-primary-600 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:focus:ring-primary-400"
              />
              Remember me
            </label>
            
            <button
              type="button"
              onClick={toggleShowPassword}
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              {showPassword ? 'Hide' : 'Show'} password
            </button>
          </div>
        </div>
        
        <div>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
          >
            Log In
          </Button>
          
          <div className="text-center mt-4">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </form>
      
      <div className="mt-8 pt-6 border-t border-secondary-200 dark:border-secondary-700 text-center">
        <p className="text-secondary-600 dark:text-secondary-400">
          Don't have an account?{' '}
          <Link
            href="/auth/register"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-secondary-500 dark:text-secondary-500">
          For testing, use: <span className="font-medium">test@example.com</span> / <span className="font-medium">password</span>
        </p>
      </div>
    </Card>
  );
}
