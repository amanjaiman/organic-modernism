import React, { useState, useRef } from 'react'
import { FileUpload } from './FileUpload'
import type { FileUploadProps } from './FileUpload'

export interface LiquidUploadProps extends FileUploadProps {
  liquidIntensity?: 'subtle' | 'medium' | 'strong'
  morphingEnabled?: boolean
  mouseTrackingEnabled?: boolean
}

export const LiquidUpload: React.FC<LiquidUploadProps> = ({
  liquidIntensity = 'medium',
  morphingEnabled = true,
  mouseTrackingEnabled = true,
  className = '',
  ...props
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [morphPhase, setMorphPhase] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mouseTrackingEnabled || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setMousePos({ x, y })
  }

  const getIntensityMultiplier = () => {
    switch (liquidIntensity) {
      case 'subtle':
        return 0.4
      case 'strong':
        return 0.9
      default:
        return 0.6
    }
  }

  const multiplier = getIntensityMultiplier()

  // Animate morphing phase
  React.useEffect(() => {
    if (!morphingEnabled || !isHovered) return
    
    let animationId: number
    const animate = () => {
      setMorphPhase(prev => (prev + 0.02) % (Math.PI * 2))
      animationId = requestAnimationFrame(animate)
    }
    animationId = requestAnimationFrame(animate)
    
    return () => cancelAnimationFrame(animationId)
  }, [morphingEnabled, isHovered])

  const getMorphingTransform = () => {
    if (!morphingEnabled) return 'none'
    
    const wave1 = Math.sin(morphPhase) * 2
    const wave2 = Math.cos(morphPhase * 1.5) * 3
    const wave3 = Math.sin(morphPhase * 0.8) * 1.5
    
    return `perspective(1000px) rotateX(${wave1}deg) rotateY(${wave2}deg) translateZ(${wave3}px)`
  }

  const getLiquidBackground = () => {
    if (!isHovered) {
      return `linear-gradient(135deg, 
        rgba(253, 251, 248, 0.95) 0%, 
        rgba(248, 242, 230, 0.9) 30%, 
        rgba(250, 249, 245, 0.95) 70%, 
        rgba(244, 246, 242, 0.9) 100%)`
    }

    return `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, 
      rgba(120, 134, 107, ${0.2 * multiplier}) 0%, 
      rgba(142, 165, 154, ${0.15 * multiplier}) 25%, 
      rgba(248, 242, 230, ${0.6 * multiplier}) 50%, 
      rgba(250, 249, 245, ${0.8 * multiplier}) 75%, 
      transparent 100%)`
  }

  const getLiquidBorder = () => {
    if (!isHovered) {
      return '2px dashed rgba(164, 183, 174, 0.6)'
    }

    const angle = 45 + (mousePos.x * 0.5) + (Math.sin(morphPhase) * 10)
    return `2px dashed transparent`
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      style={{
                  borderRadius: '14px',
        padding: '20px',
        background: getLiquidBackground(),
        boxShadow: isHovered || isDragging
          ? `0 25px 50px rgba(120, 134, 107, ${0.25 * multiplier}), 0 15px 30px rgba(120, 134, 107, ${0.15 * multiplier})`
          : '0 10px 20px rgba(120, 134, 107, 0.1), 0 5px 10px rgba(120, 134, 107, 0.05)',
        transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        transform: isHovered || isDragging 
          ? `scale(1.02) ${getMorphingTransform()}` 
          : 'scale(1)',
      }}
    >
      {/* Liquid overlay with morphing gradient */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: isHovered
            ? `conic-gradient(from ${45 + mousePos.x * 0.8}deg at ${mousePos.x}% ${mousePos.y}%, 
                rgba(120, 134, 107, ${0.1 * multiplier}) 0deg, 
                rgba(187, 201, 194, ${0.08 * multiplier}) 120deg, 
                rgba(164, 183, 174, ${0.06 * multiplier}) 240deg, 
                rgba(120, 134, 107, ${0.1 * multiplier}) 360deg)`
            : 'transparent',
          opacity: isHovered ? 0.8 : 0,
          transition: 'opacity 0.8s ease-out',
        }}
      />

      {/* Morphing border effect */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: isHovered
            ? `linear-gradient(${45 + mousePos.x * 0.5 + Math.sin(morphPhase) * 15}deg, 
                rgba(120, 134, 107, ${0.4 * multiplier}) 0%, 
                rgba(187, 201, 194, ${0.3 * multiplier}) 25%, 
                rgba(164, 183, 174, ${0.2 * multiplier}) 50%, 
                rgba(142, 165, 154, ${0.3 * multiplier}) 75%, 
                rgba(120, 134, 107, ${0.4 * multiplier}) 100%) border-box`
            : 'transparent',
          border: '2px solid transparent',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'subtract',
          maskComposite: 'subtract',
          transition: 'background 0.8s ease-out',
        }}
      />

      {/* Liquid ripple effects */}
      {isHovered && (
        <>
          <div
            className="absolute rounded-full pointer-events-none animate-pulse"
            style={{
              left: `${mousePos.x}%`,
              top: `${mousePos.y}%`,
              width: '80px',
              height: '80px',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, rgba(120, 134, 107, ${0.15 * multiplier}) 0%, transparent 70%)`,
              animationDuration: '2s',
            }}
          />
          <div
            className="absolute rounded-full pointer-events-none animate-pulse"
            style={{
              left: `${mousePos.x}%`,
              top: `${mousePos.y}%`,
              width: '120px',
              height: '120px',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, rgba(164, 183, 174, ${0.1 * multiplier}) 0%, transparent 70%)`,
              animationDuration: '3s',
              animationDelay: '0.5s',
            }}
          />
        </>
      )}

      {/* Floating particles */}
      {isHovered && (
        <>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-sage-400 rounded-full opacity-40 animate-bounce pointer-events-none"
              style={{
                left: `${20 + (i * 12) + mousePos.x * 0.1}%`,
                top: `${30 + (i * 8) + mousePos.y * 0.1}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + i * 0.2}s`,
              }}
            />
          ))}
        </>
      )}

      {/* Morphing glow effect */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, 
                rgba(255, 255, 255, ${0.4 * multiplier}) 0%, 
                rgba(255, 255, 255, ${0.2 * multiplier}) 30%, 
                transparent 70%)`
            : 'transparent',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.6s ease-out',
          transform: `scale(${1 + Math.sin(morphPhase) * 0.05})`,
        }}
      />

      {/* Enhanced FileUpload with custom styling */}
      <div className="relative z-10">
        <FileUpload
          {...props}
          className={`
            [&>div:first-child]:border-none
            [&>div:first-child]:bg-transparent
            [&>div:first-child]:shadow-none
            [&>div:first-child]:backdrop-blur-none
            [&>div:first-child]:transition-all
            [&>div:first-child]:duration-300
            [&>div:first-child:hover]:scale-105
            [&>div:first-child:hover]:shadow-lg
          `}
        />
      </div>

      {/* Liquid wave effect at bottom */}
      <div
        className="absolute bottom-0 left-0 w-full h-16 pointer-events-none overflow-hidden"
        style={{
          borderBottomLeftRadius: '28px',
          borderBottomRightRadius: '28px',
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 60"
          preserveAspectRatio="none"
          className="absolute bottom-0"
        >
          <path
            d={`M0,60 L0,${30 + Math.sin(morphPhase) * 8} Q100,${20 + Math.cos(morphPhase * 1.2) * 6} 200,${30 + Math.sin(morphPhase * 0.8) * 10} T400,${30 + Math.cos(morphPhase * 1.5) * 7} L400,60 Z`}
            fill={`rgba(120, 134, 107, ${0.1 * multiplier})`}
            style={{
              transition: 'fill 0.6s ease-out',
            }}
          />
        </svg>
      </div>
    </div>
  )
} 
