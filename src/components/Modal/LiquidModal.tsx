import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface LiquidModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closable?: boolean;
  title?: string;
  className?: string;
}

const LiquidModal: React.FC<LiquidModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  closable = true,
  title,
  className = ''
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closable) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      setIsAnimating(true);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closable]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closable) {
      handleClose();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 
        bg-stone-900/20 backdrop-blur-sm transition-all duration-300 ease-out
        ${isAnimating ? 'opacity-100' : 'opacity-0'}
      `}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        onMouseMove={handleMouseMove}
        className={`
          relative w-full ${sizeClasses[size]} 
          bg-gradient-to-br from-stone-50 to-stone-100/80
          rounded-2xl shadow-2xl shadow-stone-900/10
          border border-stone-200/50
          transform transition-all duration-300 ease-out
          overflow-hidden
          ${isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
          ${className}
        `}
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(142, 165, 154, 0.1) 0%, 
              transparent 50%),
            linear-gradient(135deg, 
              rgb(250, 249, 245) 0%, 
              rgb(245, 245, 241) 100%)
          `,
          animation: isAnimating ? 'liquidPulse 4s ease-in-out infinite' : 'none'
        }}
      >
        {/* Liquid overlay effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                rgba(142, 165, 154, 0.2) 0%, 
                rgba(142, 165, 154, 0.1) 30%,
                transparent 60%)
            `,
            transition: 'all 0.3s ease-out'
          }}
        />

        {/* Header */}
        {(title || closable) && (
          <div className="relative flex items-center justify-between p-6 border-b border-stone-200/50">
            {title && (
              <h2 className="text-xl font-semibold text-stone-800 tracking-tight">
                {title}
              </h2>
            )}
            {closable && (
              <button
                onClick={handleClose}
                className="relative p-2 rounded-xl text-stone-500 hover:text-stone-700 
                  transition-all duration-200 ease-out group
                  focus:outline-none focus:ring-2 focus:ring-sage-400/50"
                aria-label="Close modal"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sage-200/0 to-sage-200/50 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <svg className="relative w-5 h-5 transform group-hover:rotate-90 transition-transform duration-200" 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="relative p-6">
          {children}
        </div>

        {/* Animated border effect */}
        <div 
          className="absolute inset-0 rounded-2xl border-2 border-sage-300/20 pointer-events-none"
          style={{
            background: `
              conic-gradient(from 0deg at 50% 50%, 
                transparent 0deg, 
                rgba(142, 165, 154, 0.1) 90deg, 
                transparent 180deg, 
                rgba(142, 165, 154, 0.1) 270deg, 
                transparent 360deg)
            `,
            animation: isAnimating ? 'liquidRotate 8s linear infinite' : 'none'
          }}
        />
      </div>

      <style>{`
        @keyframes liquidPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.005); }
        }
        
        @keyframes liquidRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>,
    document.body
  );
};

export default LiquidModal; 