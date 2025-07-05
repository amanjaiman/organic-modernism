import React, { useState, useRef, useEffect } from 'react'
import type { BadgeProps } from './Badge'

interface LiquidBadgeProps extends BadgeProps {
  intensity?: 'subtle' | 'moderate' | 'strong'
}

const LiquidBadge: React.FC<LiquidBadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  dismissible = false,
  onDismiss,
  dot = false,
  icon,
  onClick,
  intensity = 'moderate'
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [liquidOffset, setLiquidOffset] = useState({ x: 0, y: 0 })
  const [isAnimating, setIsAnimating] = useState(false)
  const badgeRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!badgeRef.current) return
    
    const rect = badgeRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setLiquidOffset({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    setIsAnimating(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setLiquidOffset({ x: 50, y: 50 })
    setTimeout(() => setIsAnimating(false), 300)
  }

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
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
        liquidColor: 'color-mix(in srgb, var(--color-sage-600) 30%, transparent)'
      },
      secondary: {
        backgroundColor: 'var(--color-vintage-lace-500)',
        color: 'var(--color-sage-900)',
        borderColor: 'var(--color-vintage-lace-600)',
        liquidColor: 'color-mix(in srgb, var(--color-vintage-lace-600) 30%, transparent)'
      },
      success: {
        backgroundColor: 'var(--color-success-500)',
        color: '#FFFFFF',
        borderColor: 'var(--color-success-600)',
        liquidColor: 'color-mix(in srgb, var(--color-success-600) 30%, transparent)'
      },
      warning: {
        backgroundColor: 'var(--color-warning-500)',
        color: 'var(--color-warning-900)',
        borderColor: 'var(--color-warning-600)',
        liquidColor: 'color-mix(in srgb, var(--color-warning-600) 30%, transparent)'
      },
      error: {
        backgroundColor: 'var(--color-error-600)',
        color: '#FFFFFF',
        borderColor: 'var(--color-error-700)',
        liquidColor: 'color-mix(in srgb, var(--color-error-700) 30%, transparent)'
      },
      info: {
        backgroundColor: 'var(--color-info-500)',
        color: 'var(--color-info-900)',
        borderColor: 'var(--color-info-600)',
        liquidColor: 'color-mix(in srgb, var(--color-info-600) 30%, transparent)'
      },
      neutral: {
        backgroundColor: 'var(--color-sage-50)',
        color: 'var(--color-sage-900)',
        borderColor: 'var(--color-sage-100)',
        liquidColor: 'color-mix(in srgb, var(--color-sage-100) 30%, transparent)'
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
    switch (intensity) {
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
          ? `0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 8px ${variantStyles.liquidColor}`
          : '0 1px 3px rgba(0, 0, 0, 0.05)',
        transform: isHovered && onClick ? `scale(${1.02 * intensityScale})` : 'scale(1)'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Liquid Background Effect */}
      {isAnimating && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${liquidOffset.x}% ${liquidOffset.y}%, ${variantStyles.liquidColor} 0%, transparent 50%)`,
            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            borderRadius: 'inherit'
          }}
        />
      )}

      {/* Morphing Border Effect */}
      {isAnimating && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            border: `2px solid ${variantStyles.liquidColor}`,
            borderRadius: 'inherit',
            transform: `scale(${1 + 0.05 * intensityScale})`,
            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            opacity: isHovered ? 0.6 : 0
          }}
        />
      )}

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

export default LiquidBadge 