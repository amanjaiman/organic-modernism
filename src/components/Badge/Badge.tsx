import React, { useState, useRef, useEffect } from 'react'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  dismissible?: boolean
  onDismiss?: () => void
  dot?: boolean
  icon?: React.ReactNode
  onClick?: () => void
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  dismissible = false,
  onDismiss,
  dot = false,
  icon,
  onClick
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsVisible(false)
    if (onDismiss) {
      onDismiss()
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--color-sage-500)',
          color: '#FFFFFF',
          borderColor: 'var(--color-sage-600)'
        }
      case 'secondary':
        return {
          backgroundColor: 'var(--color-vintage-lace-500)',
          color: 'var(--color-sage-900)',
          borderColor: 'var(--color-vintage-lace-600)'
        }
      case 'success':
        return {
          backgroundColor: 'var(--color-success-500)',
          color: '#FFFFFF',
          borderColor: 'var(--color-success-600)'
        }
      case 'warning':
        return {
          backgroundColor: 'var(--color-warning-500)',
          color: 'var(--color-warning-900)',
          borderColor: 'var(--color-warning-600)'
        }
      case 'error':
        return {
          backgroundColor: 'var(--color-error-600)',
          color: '#FFFFFF',
          borderColor: 'var(--color-error-700)'
        }
      case 'info':
        return {
          backgroundColor: 'var(--color-info-500)',
          color: 'var(--color-info-900)',
          borderColor: 'var(--color-info-600)'
        }
      case 'neutral':
        return {
          backgroundColor: 'var(--color-sage-50)',
          color: 'var(--color-sage-900)',
          borderColor: 'var(--color-sage-100)'
        }
      default:
        return {
          backgroundColor: 'var(--color-sage-500)',
          color: '#FFFFFF',
          borderColor: 'var(--color-sage-600)'
        }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          fontSize: '0.75rem',
          padding: '0.25rem 0.5rem',
          borderRadius: 'var(--border-radius-active-lg)',
          minHeight: '1.5rem'
        }
      case 'md':
        return {
          fontSize: '0.875rem',
          padding: '0.375rem 0.75rem',
          borderRadius: 'var(--border-radius-active-xl)',
          minHeight: '2rem'
        }
      case 'lg':
        return {
          fontSize: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--border-radius-active-2xl)',
          minHeight: '2.5rem'
        }
      default:
        return {
          fontSize: '0.875rem',
          padding: '0.375rem 0.75rem',
          borderRadius: 'var(--border-radius-active-xl)',
          minHeight: '2rem'
        }
    }
  }

  if (!isVisible) return null

  const variantStyles = getVariantStyles()
  const sizeStyles = getSizeStyles()

  return (
    <div
      className={`inline-flex items-center gap-1.5 font-medium transition-all duration-300 ease-out border select-none ${
        onClick ? 'cursor-pointer hover:scale-105' : ''
      } ${className}`}
      style={{
        ...variantStyles,
        ...sizeStyles,
        borderWidth: '1px',
        borderStyle: 'solid',
        boxShadow: isHovered ? '0 2px 8px rgba(0, 0, 0, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.05)',
        transform: isHovered && onClick ? 'scale(1.05)' : 'scale(1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Dot Indicator */}
      {dot && (
        <div
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: variant === 'secondary' || variant === 'neutral' ? '#8EA59A' : '#FFFFFF'
          }}
        />
      )}

      {/* Icon */}
      {icon && (
        <div
          className="flex items-center justify-center"
          style={{
            width: size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px',
            height: size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px'
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
          className="ml-1 rounded-full p-0.5 hover:bg-black/10 transition-colors duration-200"
          style={{
            width: size === 'sm' ? '16px' : size === 'lg' ? '20px' : '18px',
            height: size === 'sm' ? '16px' : size === 'lg' ? '20px' : '18px'
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
  )
}

export default Badge 
