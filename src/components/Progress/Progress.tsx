import React from 'react'

interface ProgressProps {
  value?: number // 0-100 for determinate, undefined for indeterminate
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  showValue?: boolean
  label?: string
  className?: string
}

interface CircularProgressProps extends Omit<ProgressProps, 'size'> {
  size?: number // pixel size for circular variant
  strokeWidth?: number
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  size = 'md',
  variant = 'primary',
  showValue = false,
  label,
  className = '',
}) => {
  const isIndeterminate = value === undefined

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  }

  const variantClasses = {
    primary: 'bg-sage-500',
    secondary: 'bg-sage-600',
    success: 'bg-sage-400',
    warning: 'bg-sage-700',
    error: 'bg-sage-800',
    info: 'bg-sage-300',
  }

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
      
      <div className={`bg-stone-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${variantClasses[variant]}`}
          style={{
            width: isIndeterminate ? '100%' : `${Math.min(Math.max(value || 0, 0), 100)}%`,
            ...(isIndeterminate && {
              animation: 'progress-slide 1.5s ease-in-out infinite',
            }),
          }}
        />
      </div>
      
      <style>{`
        @keyframes progress-slide {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 48,
  strokeWidth = 4,
  variant = 'primary',
  showValue = false,
  label,
  className = '',
}) => {
  const isIndeterminate = value === undefined
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = isIndeterminate ? circumference : circumference
  const strokeDashoffset = isIndeterminate 
    ? 0 
    : circumference - (circumference * (value || 0)) / 100

  const variantColors = {
    primary: '#8EA59A',    // sage-500
    secondary: '#789386',   // sage-600
    success: '#A4B7AE',    // sage-400
    warning: '#658172',    // sage-700
    error: '#59745E',      // sage-800
    info: '#BBC9C2',       // sage-300
  }

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e7e5e4"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={variantColors[variant]}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-300 ease-out ${isIndeterminate ? 'animate-spin' : ''}`}
            style={{
              ...(isIndeterminate && {
                strokeDasharray: `${circumference * 0.25} ${circumference * 0.75}`,
              }),
            }}
          />
        </svg>
        
        {showValue && !isIndeterminate && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium text-stone-700">
              {value}%
            </span>
          </div>
        )}
      </div>
      
      {label && (
        <span className="mt-2 text-sm text-stone-600">{label}</span>
      )}
    </div>
  )
} 
