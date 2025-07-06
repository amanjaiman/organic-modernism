import React, { useState } from 'react'

export interface LiquidButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({ 
  children, 
  onClick, 
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  
  return (
    <button
      className={`relative px-8 py-4 text-white font-medium text-lg rounded-xl overflow-hidden cursor-pointer border-none focus:outline-none ${className}`}
      style={{
        background: `linear-gradient(135deg, #78866B, #8F9779)`,
        transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        transform: isPressed ? 'scale(0.95)' : isHovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isHovered ? '0 20px 40px rgba(120, 134, 107, 0.3)' : '0 10px 20px rgba(120, 134, 107, 0.2)',
        borderRadius: isHovered ? '2rem' : '1.5rem'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
    >
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${isHovered ? '60% 40%' : '30% 70%'}, rgba(255,255,255,0.3) 0%, transparent 70%)`,
          transition: 'all 0.8s ease-out'
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  )
} 
