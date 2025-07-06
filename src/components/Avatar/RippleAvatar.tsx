import React, { useState, useRef, useEffect } from 'react'

export interface RippleAvatarProps {
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

interface Ripple {
  id: number
  x: number
  y: number
  timestamp: number
}

const RippleAvatar: React.FC<RippleAvatarProps> = ({
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
  const [ripples, setRipples] = useState<Ripple[]>([])
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

  const handleClick = (e: React.MouseEvent) => {
    if (!avatarRef.current) return
    
    const rect = avatarRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    const newRipple: Ripple = {
      id: Date.now(),
      x,
      y,
      timestamp: Date.now()
    }
    
    setRipples(prev => [...prev, newRipple])
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 800)
    
    if (onClick) {
      onClick()
    }
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
          className={`w-full h-full object-cover transition-all duration-300 ${
            square ? 'rounded-md' : 'rounded-full'
          }`}
          style={{
            borderRadius: square ? '0.375rem' : '50%',
            filter: isHovered ? 'brightness(1.05)' : 'brightness(1)'
          }}
        />
      )
    }

    if (initials) {
      return (
        <span
          className="font-medium text-white select-none transition-all duration-300"
          style={{
            fontSize: sizeStyles.fontSize,
            textTransform: 'uppercase'
          }}
        >
          {initials.slice(0, 2)}
        </span>
      )
    }

    if (icon) {
      return (
        <div
          className="flex items-center justify-center text-white transition-all duration-300"
          style={{
            width: `${parseFloat(sizeStyles.width) * 0.5}rem`,
            height: `${parseFloat(sizeStyles.height) * 0.5}rem`
          }}
        >
          {icon}
        </div>
      )
    }

    return (
      <svg
        className="text-white transition-all duration-300"
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
      ref={avatarRef}
      className={`relative inline-flex items-center justify-center transition-all duration-300 ease-out ${
        onClick ? 'cursor-pointer hover:scale-105' : ''
      } ${className}`}
      style={{
        width: sizeStyles.width,
        height: sizeStyles.height
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Main Avatar */}
      <div
        className={`w-full h-full flex items-center justify-center overflow-hidden transition-all duration-300 ${
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

      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className={`absolute pointer-events-none ${
            square ? 'rounded-md' : 'rounded-full'
          }`}
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
            transform: 'translate(-50%, -50%)',
            width: '8px',
            height: '8px',
            borderRadius: square ? '0.125rem' : '50%',
            background: 'rgba(142, 165, 154, 0.6)',
            animation: `rippleGrow 0.8s ease-out`,
            animationFillMode: 'forwards'
          }}
        />
      ))}

      {/* Status Indicator */}
      {status !== 'none' && (
        <div
          className={`absolute bottom-0 right-0 border-2 border-white transition-all duration-300 ${
            square ? 'rounded-sm' : 'rounded-full'
          }`}
          style={{
            width: sizeStyles.statusSize,
            height: sizeStyles.statusSize,
            backgroundColor: statusColor,
            borderRadius: square ? '0.125rem' : '50%',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        />
      )}

      {/* Styles for ripple animation */}
      <style>{`
        @keyframes rippleGrow {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.8;
          }
          50% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0.4;
          }
          100% {
            transform: translate(-50%, -50%) scale(8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default RippleAvatar 
