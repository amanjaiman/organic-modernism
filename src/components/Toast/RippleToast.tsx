import React, { useEffect, useState } from 'react';

export interface RippleToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
  className?: string;
}

const RippleToast: React.FC<RippleToastProps> = ({
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
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);

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

  useEffect(() => {
    // Create initial ripple effect
    if (isVisible) {
      createRipple(Math.random() * 100, Math.random() * 100);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const createRipple = (x: number, y: number) => {
    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: Math.random() * 40 + 20
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 2000);
  };

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    createRipple(x, y);
  };

  const typeStyles = {
    success: {
      bg: 'bg-gradient-to-r from-success-200 to-success-300/90',
      border: 'border-success-400/40',
      icon: 'text-success-700',
      iconBg: 'bg-success-100',
      ripple: 'bg-success-400/30'
    },
    info: {
      bg: 'bg-gradient-to-r from-info-100 to-info-200/90',
      border: 'border-info-300/40',
      icon: 'text-info-600',
      iconBg: 'bg-info-50',
      ripple: 'bg-info-300/30'
    },
    warning: {
      bg: 'bg-gradient-to-r from-warning-200 to-warning-300/90',
      border: 'border-warning-400/40',
      icon: 'text-warning-700',
      iconBg: 'bg-warning-100',
      ripple: 'bg-warning-400/30'
    },
    error: {
      bg: 'bg-gradient-to-r from-error-300 to-error-400/90',
      border: 'border-error-500/40',
      icon: 'text-error-800',
      iconBg: 'bg-error-100',
      ripple: 'bg-error-500/30'
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
      onClick={handleClick}
      className={`
        relative max-w-sm w-full ${styles.bg} ${styles.border}
        rounded-lg shadow-lg shadow-stone-900/10 border
        p-4 transition-all duration-300 ease-out cursor-pointer
        overflow-hidden
        ${isVisible && !isExiting ? 'transform translate-x-0 opacity-100' : 'transform translate-x-full opacity-0'}
        ${className}
      `}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className={`absolute rounded-full ${styles.ripple} pointer-events-none`}
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
            width: `${ripple.size}px`,
            height: `${ripple.size}px`,
            transform: 'translate(-50%, -50%)',
            animation: 'rippleGrow 2s ease-out forwards'
          }}
        />
      ))}

      <div className="relative flex items-start space-x-3">
        {/* Icon */}
                  <div className={`flex-shrink-0 w-8 h-8 ${styles.iconBg} rounded-md flex items-center justify-center`}>
          <span className={styles.icon}>
            {icons[type]}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-stone-800 tracking-tight">
            {title}
          </h4>
          {message && (
            <p className="mt-1 text-sm text-stone-600 leading-relaxed">
              {message}
            </p>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
                      className="flex-shrink-0 p-1 rounded text-stone-400 hover:text-stone-600 
            hover:bg-stone-100/50 transition-all duration-200 ease-out
            focus:outline-none focus:ring-2 focus:ring-sage-400/50"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Progress bar for auto-dismiss */}
      {duration > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-stone-200/30 rounded-b-lg overflow-hidden">
          <div 
            className={`h-full ${styles.iconBg} transition-all ease-linear`}
            style={{
              width: '100%',
              animation: `toastProgress ${duration}ms linear forwards`
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes rippleGrow {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.6;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
        
        @keyframes toastProgress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default RippleToast; 
