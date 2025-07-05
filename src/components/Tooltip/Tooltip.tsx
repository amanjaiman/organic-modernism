import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  children: React.ReactNode;
  content: string | React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
  disabled?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  delay = 500,
  duration = 0,
  className = '',
  disabled = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPositioned, setIsPositioned] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | undefined>(undefined);
  const durationTimeoutRef = useRef<number | undefined>(undefined);

  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current?.getBoundingClientRect();
    
    if (!tooltipRect) return;

    const spacing = 8;
    let x = 0;
    let y = 0;

    switch (position) {
      case 'top':
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.top - tooltipRect.height - spacing;
        break;
      case 'bottom':
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.bottom + spacing;
        break;
      case 'left':
        x = triggerRect.left - tooltipRect.width - spacing;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
      case 'right':
        x = triggerRect.right + spacing;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
    }

    // Keep tooltip within viewport
    const padding = 8;
    x = Math.max(padding, Math.min(x, window.innerWidth - tooltipRect.width - padding));
    y = Math.max(padding, Math.min(y, window.innerHeight - tooltipRect.height - padding));

    setTooltipPosition({ x, y });
    setIsPositioned(true);
  };

  const showTooltip = () => {
    if (disabled) return;
    
    timeoutRef.current = setTimeout(() => {
      setIsPositioned(false);
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (durationTimeoutRef.current) {
      clearTimeout(durationTimeoutRef.current);
    }
    setIsVisible(false);
    setIsPositioned(false);
  };

  useLayoutEffect(() => {
    if (isVisible && tooltipRef.current) {
      // Calculate position synchronously before paint
      calculatePosition();
      
      if (duration > 0) {
        durationTimeoutRef.current = setTimeout(() => {
          hideTooltip();
        }, duration);
      }
    }
  }, [isVisible, duration]);

  useEffect(() => {
    const handleResize = () => {
      if (isVisible && tooltipRef.current) {
        setIsPositioned(false);
        requestAnimationFrame(() => {
          calculatePosition();
        });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (durationTimeoutRef.current) clearTimeout(durationTimeoutRef.current);
    };
  }, [isVisible]);

  const getAnimationClasses = (position: 'top' | 'bottom' | 'left' | 'right', isPositioned: boolean) => {
    if (isPositioned) {
      return 'opacity-100 translate-x-0 translate-y-0';
    }
    
    switch (position) {
      case 'top':
        return 'opacity-0 translate-y-1'; // slide down to final position
      case 'bottom':
        return 'opacity-0 -translate-y-1'; // slide up to final position
      case 'left':
        return 'opacity-0 translate-x-1'; // slide left to final position
      case 'right':
        return 'opacity-0 -translate-x-1'; // slide right to final position
      default:
        return 'opacity-0';
    }
  };

  const arrowClasses = {
    top: 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent',
    bottom: 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent',
    left: 'right-0 top-1/2 transform translate-x-full -translate-y-1/2 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent',
    right: 'left-0 top-1/2 transform -translate-x-full -translate-y-1/2 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent'
  };

  const getArrowColor = () => {
    switch (position) {
      case 'top':
        return { borderTopColor: 'rgba(77, 93, 83, 0.95)' };
      case 'bottom':
        return { borderBottomColor: 'rgba(77, 93, 83, 0.95)' };
      case 'left':
        return { borderLeftColor: 'rgba(77, 93, 83, 0.95)' };
      case 'right':
        return { borderRightColor: 'rgba(77, 93, 83, 0.95)' };
      default:
        return {};
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>

      {isVisible && createPortal(
        <div
          ref={tooltipRef}
          className={`
            fixed z-50 px-3 py-2 text-sm rounded-xl backdrop-blur-sm
            shadow-lg shadow-sage-900/20 transition-opacity transition-transform duration-200 ease-out
            ${getAnimationClasses(position, isPositioned)}
            ${className}
          `}
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            backgroundColor: 'rgba(77, 93, 83, 0.95)',
            color: '#F8F2E6',
            border: '1px solid rgba(143, 151, 121, 0.3)',
            boxShadow: '0 4px 12px rgba(77, 93, 83, 0.3), 0 0 0 1px rgba(172, 186, 161, 0.1)',
          }}
        >
          {content}
          
          {/* Arrow */}
          <div 
            className={`absolute w-0 h-0 ${arrowClasses[position]}`} 
            style={getArrowColor()}
          />
        </div>,
        document.body
      )}
    </>
  );
};

export default Tooltip; 