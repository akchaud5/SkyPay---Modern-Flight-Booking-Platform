import Link from 'next/link';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-800 mt-auto">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-secondary-900 dark:text-white">SkyPay</h3>
            <p className="text-secondary-600 dark:text-secondary-400 text-sm">
              Book flights and make secure payments with the most convenient flight booking platform.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4 text-secondary-900 dark:text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4 text-secondary-900 dark:text-white">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4 text-secondary-900 dark:text-white">Connect</h4>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400"
              >
                <FiGithub className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400"
              >
                <FiTwitter className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400"
              >
                <FiLinkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:info@skypay.com" 
                className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400"
              >
                <FiMail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary-200 dark:border-secondary-800 mt-8 pt-8 text-center text-sm text-secondary-600 dark:text-secondary-400">
          <p>&copy; {currentYear} SkyPay. All rights reserved.</p>
          <p className="mt-1">This is a demo project and not a real service.</p>
        </div>
      </div>
    </footer>
  );
}
