import React, { useState, useRef, useEffect } from 'react'

export interface LiquidAvatarProps {
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

const LiquidAvatar: React.FC<LiquidAvatarProps> = ({
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const avatarRef = useRef<HTMLDivElement>(null)

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
        return '#22c55e'
      case 'offline':
        return '#6b7280'
      case 'away':
        return '#f59e0b'
      case 'busy':
        return '#ef4444'
      default:
        return 'transparent'
    }
  }

  const getFallbackColor = () => {
    if (fallbackColor) return fallbackColor
    
    const colors = [
      'var(--color-sage-500)',
      'var(--color-vintage-lace-500)',
      '#8b5cf6',
      '#06b6d4',
      '#10b981',
      '#f59e0b',
      '#ef4444',
      '#8b5cf6',
    ]
    
    if (initials) {
      const charCode = initials.charCodeAt(0)
      return colors[charCode % colors.length]
    }
    
    return 'var(--color-sage-500)'
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!avatarRef.current) return
    
    const rect = avatarRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setMousePosition({ x, y })
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const sizeStyles = getSizeStyles()
  const statusColor = getStatusColor()
  const fallbackBg = getFallbackColor()

  const renderContent = () => {
    if (src && !imageError) {
      return (
        <img
          src={src}
          alt={alt || 'Avatar'}
          onError={handleImageError}
          className={`w-full h-full object-cover transition-all duration-500 ${
            square ? 'rounded-md' : 'rounded-full'
          }`}
          style={{
            borderRadius: square ? '0.375rem' : '50%',
            filter: isHovered ? 'brightness(1.1) saturate(1.1)' : 'brightness(1) saturate(1)'
          }}
        />
      )
    }

    if (initials) {
      return (
        <span
          className="font-medium text-white select-none transition-all duration-500"
          style={{
            fontSize: sizeStyles.fontSize,
            textTransform: 'uppercase',
            textShadow: isHovered ? '0 0 10px rgba(255,255,255,0.3)' : 'none'
          }}
        >
          {initials.slice(0, 2)}
        </span>
      )
    }

    if (icon) {
      return (
        <div
          className="flex items-center justify-center text-white transition-all duration-500"
          style={{
            width: `${parseFloat(sizeStyles.width) * 0.5}rem`,
            height: `${parseFloat(sizeStyles.height) * 0.5}rem`,
            filter: isHovered ? 'drop-shadow(0 0 4px rgba(255,255,255,0.3))' : 'none'
          }}
        >
          {icon}
        </div>
      )
    }

    return (
      <svg
        className="text-white transition-all duration-500"
        width={`${parseFloat(sizeStyles.width) * 0.5}rem`}
        height={`${parseFloat(sizeStyles.height) * 0.5}rem`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          filter: isHovered ? 'drop-shadow(0 0 4px rgba(255,255,255,0.3))' : 'none'
        }}
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  }

  return (
    <div
      ref={avatarRef}
      className={`relative inline-flex items-center justify-center transition-all duration-500 ease-out ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      style={{
        width: sizeStyles.width,
        height: sizeStyles.height
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      {/* Liquid Border Effect */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          square ? 'rounded-md' : 'rounded-full'
        }`}
        style={{
          borderRadius: square ? '0.375rem' : '50%',
          background: isHovered
            ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                rgba(142, 165, 154, 0.8) 0%, 
                rgba(142, 165, 154, 0.4) 50%, 
                transparent 100%)`
            : 'transparent',
          padding: border ? '3px' : '2px',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          boxShadow: isHovered
            ? `0 0 20px rgba(142, 165, 154, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)`
            : '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Main Avatar */}
        <div
          className={`w-full h-full flex items-center justify-center overflow-hidden transition-all duration-500 ${
            square ? 'rounded-md' : 'rounded-full'
          }`}
          style={{
            backgroundColor: src && !imageError ? 'transparent' : fallbackBg,
            borderRadius: square ? '0.375rem' : '50%',
            background: isHovered && (!src || imageError)
              ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                  ${fallbackBg} 0%, 
                  ${fallbackBg}dd 70%, 
                  ${fallbackBg}aa 100%)`
              : fallbackBg
          }}
        >
          {renderContent()}
        </div>
      </div>

      {/* Liquid Glow Effect */}
      {isHovered && (
        <div
          className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
            square ? 'rounded-md' : 'rounded-full'
          }`}
          style={{
            borderRadius: square ? '0.375rem' : '50%',
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(142, 165, 154, 0.2) 0%, 
              transparent 60%)`,
            filter: 'blur(8px)',
            transform: 'scale(1.2)'
          }}
        />
      )}

      {/* Status Indicator */}
      {status !== 'none' && (
        <div
          className={`absolute bottom-0 right-0 border-2 border-white transition-all duration-500 ${
            square ? 'rounded-sm' : 'rounded-full'
          }`}
          style={{
            width: sizeStyles.statusSize,
            height: sizeStyles.statusSize,
            backgroundColor: statusColor,
            borderRadius: square ? '0.125rem' : '50%',
            boxShadow: isHovered
              ? `0 0 8px ${statusColor}66`
              : '0 1px 3px rgba(0, 0, 0, 0.1)',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        />
      )}
    </div>
  )
}

export default LiquidAvatar 