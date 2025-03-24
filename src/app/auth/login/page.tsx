import LoginForm from '@/components/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | SkyPay',
  description: 'Log in to your SkyPay account',
};

export default function LoginPage() {
  return (
    <div className="container py-16 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-8 text-center">
        Login to Your Account
      </h1>
      
      <LoginForm />
    </div>
  );
}
