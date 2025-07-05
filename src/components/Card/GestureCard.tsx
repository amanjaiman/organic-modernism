import React, { useState, useRef } from 'react'

export interface GestureCardProps {
  children: React.ReactNode
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  intensity?: 'subtle' | 'medium' | 'strong'
  className?: string
  onClick?: () => void
}

export const GestureCard: React.FC<GestureCardProps> = ({
  children,
  padding = 'md',
  intensity = 'medium',
  className = '',
  onClick,
  ...props
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const initialMousePos = useRef({ x: 0, y: 0 })
  const initialCardPos = useRef({ x: 0, y: 0 })
  
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  }
  
  const intensityMultipliers = {
    subtle: 0.3,
    medium: 0.6,
    strong: 1.0
  }
  
  const multiplier = intensityMultipliers[intensity]
  
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    initialMousePos.current = { x: e.clientX, y: e.clientY }
    initialCardPos.current = { x: position.x, y: position.y }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !cardRef.current) return
    
    const deltaX = e.clientX - initialMousePos.current.x
    const deltaY = e.clientY - initialMousePos.current.y
    
    // Update position with physics damping
    const newX = initialCardPos.current.x + deltaX * 0.8
    const newY = initialCardPos.current.y + deltaY * 0.8
    
    setPosition({ x: newX, y: newY })
    
    // Calculate rotation based on position
    const rotationX = (-deltaY * 0.1 * multiplier)
    const rotationY = (deltaX * 0.1 * multiplier)
    
    setRotation({ x: rotationX, y: rotationY })
  }
  
  const handleMouseUp = () => {
    setIsDragging(false)
    
    // Spring back to original position
    setTimeout(() => {
      setPosition({ x: 0, y: 0 })
      setRotation({ x: 0, y: 0 })
    }, 100)
    
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
  
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return
    
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY
    
    const rotationX = (-deltaY * 0.05 * multiplier)
    const rotationY = (deltaX * 0.05 * multiplier)
    
    setRotation({ x: rotationX, y: rotationY })
  }
  
  const handleMouseLeave = () => {
    if (!isDragging) {
      setRotation({ x: 0, y: 0 })
    }
  }
  
  return (
    <div
      className="relative"
      style={{
        perspective: '1000px',
        perspectiveOrigin: 'center center'
      }}
    >
      <div
        ref={cardRef}
        className={`
          relative cursor-grab select-none
          ${paddings[padding]}
          ${className}
          ${isDragging ? 'cursor-grabbing' : ''}
        `}
        style={{
          transform: `
            rotateX(${rotation.x}deg)
            rotateY(${rotation.y}deg)
            translateX(${position.x}px)
            translateY(${position.y}px)
            ${isDragging ? 'scale(1.05)' : 'scale(1)'}
          `,
          transformStyle: 'preserve-3d',
          transition: isDragging 
            ? 'none' 
            : 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          background: `linear-gradient(135deg, #FDFCFA, #F6F3E8)`,
          border: '1px solid rgba(240, 236, 220, 0.5)',
          borderRadius: '1.5rem',
          boxShadow: isDragging
            ? `0 30px 60px rgba(120, 134, 107, 0.4), 0 15px 30px rgba(120, 134, 107, 0.2)`
            : `0 15px 30px rgba(120, 134, 107, 0.2), 0 8px 16px rgba(120, 134, 107, 0.1)`,
        }}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        {...props}
      >
        {/* 3D depth layers */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, rgba(120, 134, 107, 0.1), rgba(143, 151, 121, 0.1))`,
            borderRadius: 'inherit',
            transform: 'translateZ(-10px)',
            opacity: isDragging ? 0.8 : 0.4,
            transition: 'opacity 0.3s ease-out'
          }}
        />
        
        {/* Highlight based on rotation */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(${45 + rotation.y}deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)`,
            borderRadius: 'inherit',
            opacity: Math.abs(rotation.x) + Math.abs(rotation.y) > 0 ? 0.6 : 0,
            transition: 'opacity 0.2s ease-out'
          }}
        />
        
        {/* Content - removed counter-rotation for better readability */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Drag indicator */}
        {isDragging && (
          <div 
            className="absolute top-2 right-2 w-2 h-2 rounded-full pointer-events-none"
            style={{
              background: 'rgba(120, 134, 107, 0.6)',
              animation: 'pulse 1s infinite'
            }}
          />
        )}
      </div>
    </div>
  )
} 