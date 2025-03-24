'use client';

import { useState } from 'react';
import { User } from '@/types';
import { useAuth } from '@/context/AuthContext';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiPhone, FiEdit, FiLock, FiLogOut } from 'react-icons/fi';

interface ProfileViewProps {
  user: User;
}

export default function ProfileView({ user }: ProfileViewProps) {
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: '+1 (555) 123-4567', // Mocked
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Since we don't have a real API, we'll just show a success message
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Profile update error:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-white">
              Personal Information
            </h2>
            
            {!isEditing && (
              <Button
                variant="outline"
                icon={<FiEdit />}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
          
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <Input
                  label="Full Name"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  leftIcon={<FiUser />}
                  required
                />
                
                <Input
                  label="Email Address"
                  name="email"
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  leftIcon={<FiMail />}
                  required
                />
                
                <Input
                  label="Phone Number"
                  name="phone"
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  leftIcon={<FiPhone />}
                />
                
                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({ name: user.name, email: user.email, phone: '+1 (555) 123-4567' });
                    }}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSaving}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-secondary-500 dark:text-secondary-400">
                  Full Name
                </h3>
                <p className="mt-1 text-secondary-900 dark:text-white">
                  {user.name}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-secondary-500 dark:text-secondary-400">
                  Email Address
                </h3>
                <p className="mt-1 text-secondary-900 dark:text-white">
                  {user.email}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-secondary-500 dark:text-secondary-400">
                  Phone Number
                </h3>
                <p className="mt-1 text-secondary-900 dark:text-white">
                  +1 (555) 123-4567
                </p>
              </div>
              
              <div className="pt-4 border-t border-secondary-200 dark:border-secondary-700">
                <Button
                  variant="outline"
                  icon={<FiLock />}
                >
                  Change Password
                </Button>
              </div>
            </div>
          )}
        </Card>
        
        <Card className="mt-6">
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-6">
            Account Settings
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="notifications"
                  name="notifications"
                  type="checkbox"
                  defaultChecked
                  className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:focus:ring-primary-400"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="notifications" className="font-medium text-secondary-900 dark:text-white">
                  Email Notifications
                </label>
                <p className="text-secondary-500 dark:text-secondary-400">
                  Receive email notifications about your bookings, promotions, and travel alerts.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="marketing"
                  name="marketing"
                  type="checkbox"
                  defaultChecked
                  className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:focus:ring-primary-400"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="marketing" className="font-medium text-secondary-900 dark:text-white">
                  Marketing Communications
                </label>
                <p className="text-secondary-500 dark:text-secondary-400">
                  Receive marketing communications about special offers and new features.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="twoFactor"
                  name="twoFactor"
                  type="checkbox"
                  className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:focus:ring-primary-400"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="twoFactor" className="font-medium text-secondary-900 dark:text-white">
                  Two-Factor Authentication
                </label>
                <p className="text-secondary-500 dark:text-secondary-400">
                  Add an extra layer of security to your account with two-factor authentication.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-secondary-200 dark:border-secondary-700">
            <Button
              variant="outline"
              icon={<FiLogOut />}
              className="text-error-600 dark:text-error-400 hover:text-error-700 dark:hover:text-error-300 border-error-300 dark:border-error-600 hover:border-error-400 dark:hover:border-error-500"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>
        </Card>
      </div>
      
      <div className="lg:col-span-1">
        <Card>
          <div className="text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 relative">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="bg-primary-100 dark:bg-primary-900 flex items-center justify-center h-full text-primary-600 dark:text-primary-400">
                  <FiUser size={64} />
                </div>
              )}
            </div>
            
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-white">
              {user.name}
            </h2>
            <p className="text-secondary-500 dark:text-secondary-400">
              Member since April 2023
            </p>
            
            <Button
              variant="outline"
              className="mt-4"
            >
              Change Avatar
            </Button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-secondary-200 dark:border-secondary-700">
            <h3 className="font-medium text-secondary-900 dark:text-white mb-2">
              Account Status
            </h3>
            <p className="text-sm text-secondary-500 dark:text-secondary-400 flex items-center">
              <span className="w-2 h-2 rounded-full bg-success-500 mr-2" />
              Active
            </p>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium text-secondary-900 dark:text-white mb-2">
              Your Stats
            </h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-secondary-50 dark:bg-secondary-800 rounded-md">
                <div className="text-2xl font-semibold text-secondary-900 dark:text-white">3</div>
                <div className="text-xs text-secondary-500 dark:text-secondary-400">Flights Booked</div>
              </div>
              <div className="p-3 bg-secondary-50 dark:bg-secondary-800 rounded-md">
                <div className="text-2xl font-semibold text-secondary-900 dark:text-white">2,500</div>
                <div className="text-xs text-secondary-500 dark:text-secondary-400">Points Earned</div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="mt-6">
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
            Saved Payment Methods
          </h2>
          
          <div className="space-y-4">
            <div className="p-3 border border-secondary-200 dark:border-secondary-700 rounded-md flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-6 bg-blue-600 rounded mr-3 flex items-center justify-center text-white text-xs font-bold">
                  VISA
                </div>
                <div>
                  <div className="text-sm font-medium text-secondary-900 dark:text-white">
                    Visa ending in 4242
                  </div>
                  <div className="text-xs text-secondary-500 dark:text-secondary-400">
                    Expires 12/25
                  </div>
                </div>
              </div>
              <div className="text-xs bg-secondary-100 dark:bg-secondary-800 px-2 py-1 rounded text-secondary-600 dark:text-secondary-400">
                Default
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              fullWidth
            >
              Add Payment Method
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
