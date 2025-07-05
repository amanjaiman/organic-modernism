import React, { useState, useRef, useEffect } from 'react'
import type { BadgeProps } from './Badge'

interface RippleBadgeProps extends BadgeProps {
  rippleOnHover?: boolean
  rippleIntensity?: 'subtle' | 'moderate' | 'strong'
}

interface Ripple {
  id: number
  x: number
  y: number
  size: number
  opacity: number
}

const RippleBadge: React.FC<RippleBadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  dismissible = false,
  onDismiss,
  dot = false,
  icon,
  onClick,
  rippleOnHover = false,
  rippleIntensity = 'moderate'
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const badgeRef = useRef<HTMLDivElement>(null)

  const createRipple = (e: React.MouseEvent) => {
    if (!badgeRef.current) return

    const rect = badgeRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple: Ripple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: 0,
      opacity: 1
    }

    setRipples(prev => [...prev, newRipple])

    // Animate ripple
    let startTime = Date.now()
    const maxSize = Math.max(rect.width, rect.height) * 2
    const duration = 600 // ms

    const animate = () => {
      const elapsed = (Date.now() - startTime) / duration
      
      if (elapsed < 1) {
        // Organic growth with slight irregularity
        const baseSize = elapsed * maxSize
        const organicVariation = Math.sin(elapsed * 8) * 3
        const finalSize = baseSize + organicVariation
        
        setRipples(prev => 
          prev.map(ripple => 
            ripple.id === newRipple.id 
              ? { 
                  ...ripple, 
                  size: finalSize,
                  opacity: 1 - elapsed
                }
              : ripple
          )
        )
        
        requestAnimationFrame(animate)
      } else {
        // Remove ripple
        setRipples(prev => prev.filter(r => r.id !== newRipple.id))
      }
    }

    animate()
  }

  const handleClick = (e: React.MouseEvent) => {
    createRipple(e)
    if (onClick) {
      onClick()
    }
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovered(true)
    if (rippleOnHover) {
      createRipple(e)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    createRipple(e)
    setIsVisible(false)
    if (onDismiss) {
      onDismiss()
    }
  }

  const getVariantStyles = () => {
    const baseStyles = {
      primary: {
        backgroundColor: 'var(--color-sage-500)',
        color: '#FFFFFF',
        borderColor: 'var(--color-sage-600)',
        rippleColor: 'rgba(255, 255, 255, 0.4)'
      },
      secondary: {
        backgroundColor: 'var(--color-vintage-lace-500)',
        color: 'var(--color-sage-900)',
        borderColor: 'var(--color-vintage-lace-600)',
        rippleColor: 'color-mix(in srgb, var(--color-sage-900) 30%, transparent)'
      },
      success: {
        backgroundColor: 'var(--color-success-500)',
        color: '#FFFFFF',
        borderColor: 'var(--color-success-600)',
        rippleColor: 'rgba(255, 255, 255, 0.4)'
      },
      warning: {
        backgroundColor: 'var(--color-warning-500)',
        color: 'var(--color-warning-900)',
        borderColor: 'var(--color-warning-600)',
        rippleColor: 'color-mix(in srgb, var(--color-warning-900) 30%, transparent)'
      },
      error: {
        backgroundColor: 'var(--color-error-600)',
        color: '#FFFFFF',
        borderColor: 'var(--color-error-700)',
        rippleColor: 'rgba(255, 255, 255, 0.4)'
      },
      info: {
        backgroundColor: 'var(--color-info-500)',
        color: 'var(--color-info-900)',
        borderColor: 'var(--color-info-600)',
        rippleColor: 'color-mix(in srgb, var(--color-info-900) 30%, transparent)'
      },
      neutral: {
        backgroundColor: 'var(--color-sage-50)',
        color: 'var(--color-sage-900)',
        borderColor: 'var(--color-sage-100)',
        rippleColor: 'color-mix(in srgb, var(--color-sage-900) 20%, transparent)'
      }
    }

    return baseStyles[variant] || baseStyles.primary
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          fontSize: '0.75rem',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.5rem',
          minHeight: '1.5rem'
        }
      case 'md':
        return {
          fontSize: '0.875rem',
          padding: '0.375rem 0.75rem',
          borderRadius: '0.75rem',
          minHeight: '2rem'
        }
      case 'lg':
        return {
          fontSize: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '1rem',
          minHeight: '2.5rem'
        }
      default:
        return {
          fontSize: '0.875rem',
          padding: '0.375rem 0.75rem',
          borderRadius: '0.75rem',
          minHeight: '2rem'
        }
    }
  }

  const getIntensityScale = () => {
    switch (rippleIntensity) {
      case 'subtle':
        return 0.5
      case 'moderate':
        return 1
      case 'strong':
        return 1.5
      default:
        return 1
    }
  }

  if (!isVisible) return null

  const variantStyles = getVariantStyles()
  const sizeStyles = getSizeStyles()
  const intensityScale = getIntensityScale()

  return (
    <div
      ref={badgeRef}
      className={`inline-flex items-center gap-1.5 font-medium transition-all duration-300 ease-out border select-none relative overflow-hidden ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      style={{
        backgroundColor: variantStyles.backgroundColor,
        color: variantStyles.color,
        borderColor: variantStyles.borderColor,
        ...sizeStyles,
        borderWidth: '1px',
        borderStyle: 'solid',
        boxShadow: isHovered 
          ? '0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.1)'
          : '0 1px 3px rgba(0, 0, 0, 0.05)',
        transform: isHovered && onClick ? `scale(${1.02 * intensityScale})` : 'scale(1)'
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ripple Effects */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            borderRadius: '50%',
            backgroundColor: variantStyles.rippleColor,
            opacity: ripple.opacity * intensityScale,
            transform: `scale(${intensityScale})`,
            transition: 'opacity 0.3s ease-out'
          }}
        />
      ))}

      {/* Content Layer */}
      <div className="relative z-10 flex items-center gap-1.5">
        {/* Dot Indicator */}
        {dot && (
          <div
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: variant === 'secondary' || variant === 'neutral' ? '#8EA59A' : '#FFFFFF',
              transform: isHovered ? `scale(${1.2 * intensityScale})` : 'scale(1)'
            }}
          />
        )}

        {/* Icon */}
        {icon && (
          <div
            className="flex items-center justify-center transition-all duration-300"
            style={{
              width: size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px',
              height: size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px',
              transform: isHovered ? `scale(${1.1 * intensityScale})` : 'scale(1)'
            }}
          >
            {icon}
          </div>
        )}

        {/* Content */}
        <span className="truncate">{children}</span>

        {/* Dismiss Button */}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="ml-1 rounded-full p-0.5 hover:bg-black/10 transition-all duration-200"
            style={{
              width: size === 'sm' ? '16px' : size === 'lg' ? '20px' : '18px',
              height: size === 'sm' ? '16px' : size === 'lg' ? '20px' : '18px',
              transform: isHovered ? `scale(${1.1 * intensityScale})` : 'scale(1)'
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 4L4 12M4 4l8 8" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default RippleBadge 