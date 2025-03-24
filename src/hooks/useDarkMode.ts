import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

export function useDarkMode() {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    // Update meta tag for theme color on mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        isDarkMode ? '#0f172a' : '#f8fafc'
      );
    }
  }, [isDarkMode]);
  
  return { isDarkMode, toggleTheme };
}
