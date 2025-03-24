import RegisterForm from '@/components/auth/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register | SkyPay',
  description: 'Create a new SkyPay account',
};

export default function RegisterPage() {
  return (
    <div className="container py-16 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-8 text-center">
        Create an Account
      </h1>
      
      <RegisterForm />
    </div>
  );
}
