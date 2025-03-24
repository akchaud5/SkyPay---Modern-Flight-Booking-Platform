'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ProfileView from '@/components/profile/ProfileView';

export default function ProfilePage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);
  
  if (!isAuthenticated || !user) {
    return null;
  }
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">My Profile</h1>
      <p className="text-secondary-600 dark:text-secondary-400 mb-8">
        Manage your account information and preferences.
      </p>
      
      <ProfileView user={user} />
    </div>
  );
}
