'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { FiMenu, FiX, FiMoon, FiSun, FiUser, FiLogOut } from 'react-icons/fi';
import Image from 'next/image';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm dark:bg-secondary-900 dark:border-b dark:border-secondary-800 sticky top-0 z-10">
      <div className="container py-4 flex items-center justify-between">
        <Link href="/flights" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary-600 dark:text-primary-400">SkyPay</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/flights" className="text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400">
            Flights
          </Link>
          {isAuthenticated ? (
            <>
              <Link href="/booking" className="text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400">
                My Booking
              </Link>
              <Link href="/profile" className="text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400">
                Profile
              </Link>
            </>
          ) : (
            <Link href="/auth/login" className="text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400">
              Login / Register
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <FiSun className="text-secondary-400 hover:text-secondary-600" />
            ) : (
              <FiMoon className="text-secondary-600 hover:text-secondary-800" />
            )}
          </button>

          {isAuthenticated && user && (
            <div className="relative group">
              <button className="flex items-center space-x-2">
                {user.avatar ? (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image 
                      src={user.avatar} 
                      alt={user.name} 
                      width={32} 
                      height={32}
                      className="object-cover" 
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                    <FiUser />
                  </div>
                )}
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-secondary-800 rounded-md shadow-lg py-1 hidden group-hover:block">
                <div className="px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 border-b border-secondary-200 dark:border-secondary-700">
                  {user.name}
                </div>
                <Link 
                  href="/profile" 
                  className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-700"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-700"
                >
                  <div className="flex items-center">
                    <FiLogOut className="mr-2" />
                    Logout
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <FiX className="h-6 w-6 text-secondary-700 dark:text-secondary-300" />
          ) : (
            <FiMenu className="h-6 w-6 text-secondary-700 dark:text-secondary-300" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-secondary-900 py-2 px-4">
          <nav className="flex flex-col space-y-4 pb-4">
            <Link 
              href="/flights" 
              className="text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Flights
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  href="/booking" 
                  className="text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Booking
                </Link>
                <Link 
                  href="/profile" 
                  className="text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400"
                >
                  <div className="flex items-center">
                    <FiLogOut className="mr-2" />
                    Logout
                  </div>
                </button>
              </>
            ) : (
              <Link 
                href="/auth/login" 
                className="text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Login / Register
              </Link>
            )}
            <button
              onClick={toggleTheme}
              className="flex items-center text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400"
            >
              {theme === 'dark' ? (
                <>
                  <FiSun className="mr-2" />
                  Light Mode
                </>
              ) : (
                <>
                  <FiMoon className="mr-2" />
                  Dark Mode
                </>
              )}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
