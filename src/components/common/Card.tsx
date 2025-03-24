import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  headerAction?: ReactNode;
  footer?: ReactNode;
  noPadding?: boolean;
}

export default function Card({
  children,
  title,
  subtitle,
  className = '',
  headerAction,
  footer,
  noPadding = false,
}: CardProps) {
  return (
    <div className={`card ${className}`}>
      {(title || subtitle || headerAction) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && <h3 className="text-lg font-medium text-secondary-900 dark:text-white">{title}</h3>}
            {subtitle && <p className="mt-1 text-sm text-secondary-500 dark:text-secondary-400">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      
      <div className={noPadding ? '' : 'py-1'}>{children}</div>
      
      {footer && (
        <div className="mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-700">
          {footer}
        </div>
      )}
    </div>
  );
}
