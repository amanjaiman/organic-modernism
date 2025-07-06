import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closable?: boolean;
  title?: string;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  closable = true,
  title,
  className = ''
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closable) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closable, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closable) {
      onClose();
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
        ${isOpen ? 'opacity-100' : 'opacity-0'}
      `}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`
          relative w-full ${sizeClasses[size]} 
          bg-gradient-to-br from-stone-50 to-stone-100/80
          rounded-lg shadow-2xl shadow-stone-900/10
          border border-stone-200/50
          transform transition-all duration-300 ease-out
          ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
          ${className}
        `}
      >
        {/* Header */}
        {(title || closable) && (
          <div className="flex items-center justify-between p-6 border-b border-stone-200/50">
            {title && (
              <h2 className="text-xl font-semibold text-stone-800 tracking-tight">
                {title}
              </h2>
            )}
            {closable && (
              <button
                onClick={onClose}
                className="p-2 rounded-md text-stone-500 hover:text-stone-700 
                  hover:bg-stone-100/50 transition-all duration-200 ease-out
                  focus:outline-none focus:ring-2 focus:ring-sage-400/50"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal; 
