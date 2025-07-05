import React from 'react'

export interface CardProps {
  children: React.ReactNode
  variant?: 'elevated' | 'outlined' | 'filled' | 'glass'
  elevation?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'sm' | 'md' | 'lg' | 'xl'
  hoverable?: boolean
  hoverLift?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  elevation = 'md',
  padding = 'md',
  rounded = 'lg',
  hoverable = false,
  hoverLift = 'md',
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles = "transition-all duration-300 ease-out relative overflow-hidden"
  
  const variants = {
    elevated: {
      backgroundColor: '#FDFCFA', // Vintage Lace 50
      borderColor: 'transparent',
      borderWidth: '0px'
    },
    outlined: {
      backgroundColor: '#FDFCFA',
      borderColor: '#F0ECDC', // Vintage Lace 300
      borderWidth: '1px'
    },
    filled: {
      backgroundColor: '#F6F3E8', // Vintage Lace 200
      borderColor: 'transparent',
      borderWidth: '0px'
    },
    glass: {
      backgroundColor: 'rgba(253, 252, 250, 0.8)',
      borderColor: 'rgba(240, 236, 220, 0.5)',
      borderWidth: '1px',
      backdropFilter: 'blur(10px)'
    }
  }
  
  const elevations = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md hover:shadow-lg',
    lg: 'shadow-lg hover:shadow-xl',
    xl: 'shadow-xl hover:shadow-2xl'
  }
  
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  }
  
  const roundings = {
    sm: 'rounded-xl',
    md: 'rounded-2xl',
    lg: 'rounded-3xl',
    xl: 'rounded-[2rem]'
  }
  
  const hoverLiftStyles = {
    none: '',
    sm: 'hover:scale-[1.01] hover:-translate-y-0.5',
    md: 'hover:scale-[1.02] hover:-translate-y-1',
    lg: 'hover:scale-[1.03] hover:-translate-y-2'
  }
  
  const hoverStyles = hoverable ? `${hoverLiftStyles[hoverLift]} cursor-pointer` : ""
  const clickableStyles = onClick ? "cursor-pointer" : ""
  
  return (
    <div
      className={`
        ${baseStyles}
        ${elevations[elevation]}
        ${paddings[padding]}
        ${roundings[rounded]}
        ${hoverStyles}
        ${clickableStyles}
        ${className}
      `}
      style={{
        ...variants[variant],
        borderStyle: 'solid',
        ...(variant === 'glass' && {
          WebkitBackdropFilter: 'blur(10px)',
          backdropFilter: 'blur(10px)'
        })
      } as React.CSSProperties}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
} 