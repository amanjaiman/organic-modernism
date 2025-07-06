import React, { useEffect, useRef, useState } from 'react'

interface RippleProgressProps {
  value?: number // 0-100 for determinate, undefined for indeterminate
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  showValue?: boolean
  label?: string
  className?: string
}

interface Ripple {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  progress: number
}

export const RippleProgress: React.FC<RippleProgressProps> = ({
  value,
  size = 'md',
  variant = 'primary',
  showValue = false,
  label,
  className = '',
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const progressRef = useRef<HTMLDivElement>(null)
  const rippleIdRef = useRef(0)
  const isIndeterminate = value === undefined

  const sizeClasses = {
    sm: 'h-3',
    md: 'h-4',
    lg: 'h-5',
  }

  const variantColors = {
    primary: 'rgb(142, 165, 154)',   // #8EA59A sage-500
    secondary: 'rgb(120, 147, 134)',  // #789386 sage-600
    success: 'rgb(164, 183, 174)',   // #A4B7AE sage-400
    warning: 'rgb(101, 129, 114)',   // #658172 sage-700
    error: 'rgb(89, 116, 94)',       // #59745E sage-800
    info: 'rgb(187, 201, 194)',      // #BBC9C2 sage-300
  }

  const progressWidth = isIndeterminate ? 100 : Math.min(Math.max(value || 0, 0), 100)

  // Create ripples based on progress
  useEffect(() => {
    if (!isIndeterminate && value !== undefined) {
      const shouldCreateRipple = Math.random() < 0.3 // 30% chance per update
      if (shouldCreateRipple && progressRef.current) {
        const rect = progressRef.current.getBoundingClientRect()
        const progressPos = (value / 100) * rect.width
        
        // Add some organic randomness
        const randomOffset = (Math.random() - 0.5) * 20
        const newRipple: Ripple = {
          id: rippleIdRef.current++,
          x: progressPos + randomOffset,
          y: rect.height / 2 + (Math.random() - 0.5) * 10,
          size: 20 + Math.random() * 15,
          opacity: 0.6 + Math.random() * 0.4,
          progress: 0,
        }
        
        setRipples(prev => [...prev, newRipple])
      }
    }
  }, [value, isIndeterminate])

  // Animate ripples
  useEffect(() => {
    const interval = setInterval(() => {
      setRipples(prev => prev.map(ripple => ({
        ...ripple,
        progress: ripple.progress + 0.05,
        opacity: ripple.opacity * 0.95,
      })).filter(ripple => ripple.progress < 1 && ripple.opacity > 0.1))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  // Create continuous ripples for indeterminate state
  useEffect(() => {
    if (isIndeterminate && progressRef.current) {
      const interval = setInterval(() => {
        const rect = progressRef.current?.getBoundingClientRect()
        if (rect) {
          const newRipple: Ripple = {
            id: rippleIdRef.current++,
            x: Math.random() * rect.width,
            y: rect.height / 2 + (Math.random() - 0.5) * 10,
            size: 15 + Math.random() * 10,
            opacity: 0.4 + Math.random() * 0.3,
            progress: 0,
          }
          
          setRipples(prev => [...prev, newRipple])
        }
      }, 200)

      return () => clearInterval(interval)
    }
  }, [isIndeterminate])

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
      >
        <div
          className="h-full rounded-full transition-all duration-300 ease-out relative"
          style={{
            width: `${progressWidth}%`,
            backgroundColor: variantColors[variant],
          }}
        />
        
        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x - ripple.size / 2,
              top: ripple.y - ripple.size / 2,
              width: ripple.size * (1 + ripple.progress),
              height: ripple.size * (1 + ripple.progress),
              backgroundColor: variantColors[variant],
              opacity: ripple.opacity,
              transform: `scale(${1 + ripple.progress * 2})`,
              borderRadius: '50%',
              transition: 'all 0.1s ease-out',
            }}
          />
        ))}
        
        {/* Organic texture overlay */}
        <div 
          className="absolute inset-0 rounded-full opacity-20"
          style={{
            width: `${progressWidth}%`,
            background: `radial-gradient(ellipse at 30% 40%, 
              rgba(255, 255, 255, 0.3) 0%, 
              transparent 50%
            ), radial-gradient(ellipse at 70% 60%, 
              rgba(255, 255, 255, 0.2) 0%, 
              transparent 50%
            )`,
          }}
        />
      </div>
    </div>
  )
} 
