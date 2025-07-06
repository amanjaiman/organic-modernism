import React, { useRef, useState } from 'react'

interface LiquidProgressProps {
  value?: number // 0-100 for determinate, undefined for indeterminate
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  showValue?: boolean
  label?: string
  className?: string
}

export const LiquidProgress: React.FC<LiquidProgressProps> = ({
  value,
  size = 'md',
  variant = 'primary',
  showValue = false,
  label,
  className = '',
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const progressRef = useRef<HTMLDivElement>(null)
  const isIndeterminate = value === undefined

  const sizeClasses = {
    sm: 'h-3',
    md: 'h-4',
    lg: 'h-5',
  }

  const variantGradients = {
    primary: 'from-sage-400 via-sage-500 to-sage-600',
    secondary: 'from-sage-500 via-sage-600 to-sage-700',
    success: 'from-sage-300 via-sage-400 to-sage-500',
    warning: 'from-sage-600 via-sage-700 to-sage-800',
    error: 'from-sage-700 via-sage-800 to-sage-900',
    info: 'from-sage-200 via-sage-300 to-sage-400',
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const progressWidth = isIndeterminate ? 100 : Math.min(Math.max(value || 0, 0), 100)

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-stone-700">{label}</span>
          )}
          {showValue && !isIndeterminate && (
            <span className="text-sm text-stone-600">{value}%</span>
          )}
        </div>
      )}
      
      <div 
        ref={progressRef}
        className={`bg-stone-200 rounded-full overflow-hidden relative ${sizeClasses[size]}`}
        onMouseMove={handleMouseMove}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r ${variantGradients[variant]} relative`}
          style={{
            width: `${progressWidth}%`,
            background: `
              radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(255, 255, 255, 0.3) 0%, 
                rgba(255, 255, 255, 0.1) 30%, 
                rgba(255, 255, 255, 0) 70%
              ),
              linear-gradient(90deg, 
                var(--tw-gradient-stops)
              )
            `,
            ...(isIndeterminate && {
              animation: 'liquid-wave 2s ease-in-out infinite',
            }),
          }}
        >
          <div 
            className="absolute inset-0 rounded-full opacity-50"
            style={{
              background: `radial-gradient(ellipse at ${mousePosition.x}px center, 
                rgba(255, 255, 255, 0.4) 0%, 
                rgba(255, 255, 255, 0.1) 50%, 
                transparent 100%
              )`,
            }}
          />
        </div>
        
        {/* Liquid shimmer effect */}
        <div 
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            background: `linear-gradient(45deg, 
              transparent 30%, 
              rgba(255, 255, 255, 0.3) 50%, 
              transparent 70%
            )`,
            transform: 'translateX(-100%)',
            animation: 'shimmer 3s ease-in-out infinite',
            width: `${progressWidth}%`,
          }}
        />
      </div>
      
      <style>{`
        @keyframes liquid-wave {
          0%, 100% {
            transform: scaleX(1) scaleY(1);
            border-radius: 9999px;
          }
          25% {
            transform: scaleX(1.02) scaleY(0.98);
            border-radius: 12px;
          }
          50% {
            transform: scaleX(0.98) scaleY(1.02);
            border-radius: 16px;
          }
          75% {
            transform: scaleX(1.01) scaleY(0.99);
            border-radius: 20px;
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  )
} 
