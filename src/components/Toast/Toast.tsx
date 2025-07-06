import React, { useEffect, useState } from 'react';

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
  className?: string;
}

const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Slide in animation
    setTimeout(() => setIsVisible(true), 50);

    // Auto dismiss
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const typeStyles = {
    success: {
      background: 'linear-gradient(135deg, var(--color-success-500) 0%, var(--color-success-600) 100%)',
      borderColor: 'var(--color-success-600)',
      iconColor: '#FFFFFF',
      iconBgColor: 'rgba(255, 255, 255, 0.2)',
      textColor: '#FFFFFF',
      textSecondaryColor: 'rgba(255, 255, 255, 0.9)',
      progressColor: 'rgba(255, 255, 255, 0.3)'
    },
    info: {
      background: 'linear-gradient(135deg, var(--color-info-500) 0%, var(--color-info-600) 100%)',
      borderColor: 'var(--color-info-600)',
      iconColor: 'var(--color-info-900)',
      iconBgColor: 'color-mix(in srgb, var(--color-info-900) 15%, transparent)',
      textColor: 'var(--color-info-900)',
      textSecondaryColor: 'var(--color-info-900)',
      progressColor: 'color-mix(in srgb, var(--color-info-900) 30%, transparent)'
    },
    warning: {
      background: 'linear-gradient(135deg, var(--color-warning-500) 0%, var(--color-warning-600) 100%)',
      borderColor: 'var(--color-warning-600)',
      iconColor: 'var(--color-warning-900)',
      iconBgColor: 'color-mix(in srgb, var(--color-warning-900) 15%, transparent)',
      textColor: 'var(--color-warning-900)',
      textSecondaryColor: 'var(--color-warning-900)',
      progressColor: 'color-mix(in srgb, var(--color-warning-900) 30%, transparent)'
    },
    error: {
      background: 'linear-gradient(135deg, var(--color-error-600) 0%, var(--color-error-700) 100%)',
      borderColor: 'var(--color-error-700)',
      iconColor: '#FFFFFF',
      iconBgColor: 'rgba(255, 255, 255, 0.2)',
      textColor: '#FFFFFF',
      textSecondaryColor: 'rgba(255, 255, 255, 0.9)',
      progressColor: 'rgba(255, 255, 255, 0.3)'
    }
  };

  const icons = {
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

  return (
    <div
      className={`
        relative max-w-sm w-full
        rounded-lg shadow-lg shadow-stone-900/10 border
        p-4 transition-all duration-300 ease-out
        ${isVisible && !isExiting ? 'transform translate-x-0 opacity-100' : 'transform translate-x-full opacity-0'}
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
          className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center"
          style={{ backgroundColor: styles.iconBgColor }}
        >
          <span style={{ color: styles.iconColor }}>
            {icons[type]}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 
            className="text-sm font-semibold tracking-tight"
            style={{ color: styles.textColor }}
          >
            {title}
          </h4>
          {message && (
            <p 
              className="mt-1 text-sm leading-relaxed"
              style={{ color: styles.textSecondaryColor }}
            >
              {message}
            </p>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 rounded transition-all duration-200 ease-out
            focus:outline-none focus:ring-2"
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
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Progress bar for auto-dismiss */}
      {duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-lg overflow-hidden" style={{ backgroundColor: styles.progressColor }}>
          <div 
            className="h-full transition-all ease-linear"
            style={{
              width: '100%',
              backgroundColor: styles.iconBgColor,
              animation: `toastProgress ${duration}ms linear forwards`
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes toastProgress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default Toast; 
