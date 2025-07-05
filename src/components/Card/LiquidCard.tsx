import React, { useState, useRef } from 'react'

export interface LiquidCardProps {
  children: React.ReactNode
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  onClick?: () => void
}

export const LiquidCard: React.FC<LiquidCardProps> = ({
  children,
  padding = 'md',
  className = '',
  onClick,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const cardRef = useRef<HTMLDivElement>(null)
  
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  }
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setMousePosition({ x, y })
  }
  
  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 50, y: 50 })
  }
  
  return (
    <div
      ref={cardRef}
      className={`
        relative overflow-hidden cursor-pointer
        ${paddings[padding]}
        ${className}
      `}
      style={{
        borderRadius: isHovered ? '2rem' : '1.5rem',
        background: `linear-gradient(135deg, #FDFCFA, #F6F3E8)`,
        border: '1px solid rgba(240, 236, 220, 0.5)',
        boxShadow: isHovered 
          ? '0 25px 50px rgba(120, 134, 107, 0.25)' 
          : '0 10px 25px rgba(120, 134, 107, 0.15)',
        transform: isHovered ? 'scale(1.03) translateY(-8px)' : 'scale(1)',
        transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...props}
    >
      {/* Liquid background morphing effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(120, 134, 107, 0.15) 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.8s ease-out',
        }}
      />
      
      {/* Morphing border highlight */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: 'inherit',
          background: `linear-gradient(135deg, rgba(120, 134, 107, 0.3), rgba(143, 151, 121, 0.3))`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          padding: '1px',
          opacity: isHovered ? 0.8 : 0.3,
          transition: 'opacity 0.6s ease-out'
        }}
      />
      
      {/* Floating light effect */}
      <div 
        className="absolute pointer-events-none"
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%)`,
          left: `${mousePosition.x - 50}px`,
          top: `${mousePosition.y - 50}px`,
          transform: 'translate(-50%, -50%)',
          opacity: isHovered ? 0.6 : 0,
          transition: 'all 0.3s ease-out',
          filter: 'blur(20px)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
} 