import React, { useState } from 'react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({
  type,
  title,
  children,
  dismissible = false,
  onDismiss,
  className = '',
  icon
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDismiss?.();
    }, 300);
  };

  const typeStyles = {
    success: {
      background: 'linear-gradient(135deg, var(--color-success-500) 0%, var(--color-success-600) 100%)',
      borderColor: 'var(--color-success-600)',
      iconColor: '#FFFFFF',
      iconBgColor: 'rgba(255, 255, 255, 0.2)',
      textColor: '#FFFFFF',
      textSecondaryColor: 'rgba(255, 255, 255, 0.9)'
    },
    error: {
      background: 'linear-gradient(135deg, var(--color-error-600) 0%, var(--color-error-700) 100%)',
      borderColor: 'var(--color-error-700)',
      iconColor: '#FFFFFF',
      iconBgColor: 'rgba(255, 255, 255, 0.2)',
      textColor: '#FFFFFF',
      textSecondaryColor: 'rgba(255, 255, 255, 0.9)'
    },
    warning: {
      background: 'linear-gradient(135deg, var(--color-warning-500) 0%, var(--color-warning-600) 100%)',
      borderColor: 'var(--color-warning-600)',
      iconColor: 'var(--color-warning-900)',
      iconBgColor: 'color-mix(in srgb, var(--color-warning-900) 15%, transparent)',
      textColor: 'var(--color-warning-900)',
      textSecondaryColor: 'var(--color-warning-900)'
    },
    info: {
      background: 'linear-gradient(135deg, var(--color-info-500) 0%, var(--color-info-600) 100%)',
      borderColor: 'var(--color-info-600)',
      iconColor: 'var(--color-info-900)',
      iconBgColor: 'color-mix(in srgb, var(--color-info-900) 15%, transparent)',
      textColor: 'var(--color-info-900)',
      textSecondaryColor: 'var(--color-info-900)'
    }
  };

  const defaultIcons = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  const styles = typeStyles[type];

  if (!isVisible) return null;

  return (
    <div
      className={`
        rounded-2xl p-4 border
        shadow-sm shadow-stone-900/5 transition-all duration-300 ease-out
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        ${className}
      `}
      style={{
        background: styles.background,
        borderColor: styles.borderColor
      }}
    >
      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div 
          className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: styles.iconBgColor }}
        >
          <span style={{ color: styles.iconColor }}>
            {icon || defaultIcons[type]}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="text-sm font-semibold tracking-tight mb-1" style={{ color: styles.textColor }}>
              {title}
            </h4>
          )}
          <div className="text-sm leading-relaxed" style={{ color: styles.textSecondaryColor }}>
            {children}
          </div>
        </div>

        {/* Dismiss button */}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 rounded transition-all duration-200 ease-out
              focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ 
              color: styles.iconColor,
              opacity: 0.7
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.backgroundColor = styles.iconBgColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.7';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = `0 0 0 2px ${styles.iconBgColor}`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
            aria-label="Dismiss alert"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert; 
