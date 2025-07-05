import React, { useState, useEffect } from 'react'

export interface AvatarProps {
  src?: string
  alt?: string
  initials?: string
  icon?: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  status?: 'online' | 'offline' | 'away' | 'busy' | 'none'
  className?: string
  onClick?: () => void
  fallbackColor?: string
  border?: boolean
  square?: boolean
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  initials,
  icon,
  size = 'md',
  status = 'none',
  className = '',
  onClick,
  fallbackColor,
  border = false,
  square = false
}) => {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const getSizeStyles = () => {
    switch (size) {
      case 'xs':
        return {
          width: '1.5rem',
          height: '1.5rem',
          fontSize: '0.625rem',
          statusSize: '0.375rem'
        }
      case 'sm':
        return {
          width: '2rem',
          height: '2rem',
          fontSize: '0.75rem',
          statusSize: '0.5rem'
        }
      case 'md':
        return {
          width: '2.5rem',
          height: '2.5rem',
          fontSize: '0.875rem',
          statusSize: '0.625rem'
        }
      case 'lg':
        return {
          width: '3rem',
          height: '3rem',
          fontSize: '1rem',
          statusSize: '0.75rem'
        }
      case 'xl':
        return {
          width: '4rem',
          height: '4rem',
          fontSize: '1.25rem',
          statusSize: '1rem'
        }
      default:
        return {
          width: '2.5rem',
          height: '2.5rem',
          fontSize: '0.875rem',
          statusSize: '0.625rem'
        }
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return '#22c55e' // green-500
      case 'offline':
        return '#6b7280' // gray-500
      case 'away':
        return '#f59e0b' // amber-500
      case 'busy':
        return '#ef4444' // red-500
      default:
        return 'transparent'
    }
  }

  const getFallbackColor = () => {
    if (fallbackColor) return fallbackColor
    
    // Generate a color based on initials or use default
    const colors = [
      'var(--color-sage-500)',
      'var(--color-vintage-lace-500)',
      '#8b5cf6', // violet-500
      '#06b6d4', // cyan-500
      '#10b981', // emerald-500
      '#f59e0b', // amber-500
      '#ef4444', // red-500
      '#8b5cf6', // violet-500
    ]
    
    if (initials) {
      const charCode = initials.charCodeAt(0)
      return colors[charCode % colors.length]
    }
    
    return 'var(--color-sage-500)'
  }

  const sizeStyles = getSizeStyles()
  const statusColor = getStatusColor()
  const fallbackBg = getFallbackColor()

  const handleImageError = () => {
    setImageError(true)
  }

  const renderContent = () => {
    // Show image if available and not errored
    if (src && !imageError) {
      return (
        <img
          src={src}
          alt={alt || 'Avatar'}
          onError={handleImageError}
          className={`w-full h-full object-cover ${square ? 'rounded-md' : 'rounded-full'}`}
          style={{
            borderRadius: square ? '0.375rem' : '50%'
          }}
        />
      )
    }

    // Show initials if provided
    if (initials) {
      return (
        <span
          className="font-medium text-white select-none"
          style={{
            fontSize: sizeStyles.fontSize,
            textTransform: 'uppercase'
          }}
        >
          {initials.slice(0, 2)}
        </span>
      )
    }

    // Show icon if provided
    if (icon) {
      return (
        <div
          className="flex items-center justify-center text-white"
          style={{
            width: `${parseFloat(sizeStyles.width) * 0.5}rem`,
            height: `${parseFloat(sizeStyles.height) * 0.5}rem`
          }}
        >
          {icon}
        </div>
      )
    }

    // Default fallback icon
    return (
      <svg
        className="text-white"
        width={`${parseFloat(sizeStyles.width) * 0.5}rem`}
        height={`${parseFloat(sizeStyles.height) * 0.5}rem`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center transition-all duration-300 ease-out ${
        onClick ? 'cursor-pointer hover:scale-105' : ''
      } ${className}`}
      style={{
        width: sizeStyles.width,
        height: sizeStyles.height
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Main Avatar */}
      <div
        className={`w-full h-full flex items-center justify-center overflow-hidden ${
          square ? 'rounded-md' : 'rounded-full'
        } ${border ? 'border-2 border-white' : ''}`}
        style={{
          backgroundColor: src && !imageError ? 'transparent' : fallbackBg,
          borderRadius: square ? '0.375rem' : '50%',
          boxShadow: isHovered 
            ? '0 4px 12px rgba(0, 0, 0, 0.15)' 
            : '0 2px 8px rgba(0, 0, 0, 0.1)',
          transform: isHovered && onClick ? 'scale(1.05)' : 'scale(1)'
        }}
      >
        {renderContent()}
      </div>

      {/* Status Indicator */}
      {status !== 'none' && (
        <div
          className={`absolute bottom-0 right-0 border-2 border-white ${
            square ? 'rounded-sm' : 'rounded-full'
          }`}
          style={{
            width: sizeStyles.statusSize,
            height: sizeStyles.statusSize,
            backgroundColor: statusColor,
            borderRadius: square ? '0.125rem' : '50%'
          }}
        />
      )}
    </div>
  )
}

export default Avatar 