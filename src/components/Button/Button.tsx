import React from 'react'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "font-medium transition-all duration-300 ease-out transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden"
  
  const variants = {
    primary: "shadow-lg hover:shadow-xl focus:ring-2 focus:ring-offset-2",
    secondary: "shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2",
    ghost: "hover:bg-opacity-10 focus:ring-2 focus:ring-offset-2",
    accent: "shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2",
    success: "shadow-lg hover:shadow-xl focus:ring-2 focus:ring-offset-2",
    warning: "shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2",
    error: "shadow-lg hover:shadow-xl focus:ring-2 focus:ring-offset-2",
    info: "shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2"
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm rounded-xl",
    md: "px-6 py-3 text-base rounded-2xl",
    lg: "px-8 py-4 text-lg rounded-3xl"
  }
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={{
        backgroundColor: variant === 'primary' ? 'var(--color-sage-700)' : 
                        variant === 'secondary' ? 'var(--color-vintage-lace-200)' : 
                        variant === 'accent' ? 'var(--color-sage-300)' : 
                        variant === 'success' ? 'var(--color-success-500)' :
                        variant === 'warning' ? 'var(--color-warning-500)' :
                        variant === 'error' ? 'var(--color-error-600)' :
                        variant === 'info' ? 'var(--color-info-500)' : 'transparent',
        borderColor: variant === 'primary' ? 'var(--color-sage-700)' : 
                    variant === 'secondary' ? 'var(--color-vintage-lace-300)' : 
                    variant === 'accent' ? 'var(--color-sage-400)' : 
                    variant === 'success' ? 'var(--color-success-600)' :
                    variant === 'warning' ? 'var(--color-warning-600)' :
                    variant === 'error' ? 'var(--color-error-700)' :
                    variant === 'info' ? 'var(--color-info-600)' : 'transparent',
        color: variant === 'primary' ? 'white' : 
               variant === 'secondary' ? 'var(--color-sage-900)' : 
               variant === 'accent' ? 'var(--color-sage-900)' : 
               variant === 'success' ? '#FFFFFF' :
               variant === 'warning' ? 'var(--color-warning-900)' :
               variant === 'error' ? '#FFFFFF' :
               variant === 'info' ? 'var(--color-info-900)' :
               variant === 'ghost' ? 'var(--color-sage-700)' : 'inherit',
        borderWidth: '1px',
        borderStyle: 'solid',
        '--tw-ring-color': variant === 'primary' ? 'var(--color-sage-400)' : 
                          variant === 'secondary' ? 'var(--color-vintage-lace-400)' : 
                          variant === 'accent' ? 'var(--color-sage-400)' : 
                          variant === 'success' ? 'var(--color-success-400)' :
                          variant === 'warning' ? 'var(--color-warning-400)' :
                          variant === 'error' ? 'var(--color-error-400)' :
                          variant === 'info' ? 'var(--color-info-400)' :
                          'var(--color-sage-400)'
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </button>
  )
} 