import React, { useState, useRef } from 'react'
import { Table } from './Table'
import type { TableProps } from './Table'

export interface LiquidTableProps<T = any> extends TableProps<T> {
  liquidIntensity?: 'subtle' | 'medium' | 'strong'
  mouseTrackingEnabled?: boolean
}

export const LiquidTable = <T extends Record<string, any>>({
  liquidIntensity = 'medium',
  mouseTrackingEnabled = true,
  className = '',
  ...props
}: LiquidTableProps<T>) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const tableRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mouseTrackingEnabled || !tableRef.current) return
    
    const rect = tableRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setMousePos({ x, y })
  }

  const getIntensityMultiplier = () => {
    switch (liquidIntensity) {
      case 'subtle':
        return 0.3
      case 'strong':
        return 0.8
      default:
        return 0.5
    }
  }

  const multiplier = getIntensityMultiplier()

  return (
    <div
      ref={tableRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered
          ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(120, 134, 107, ${0.15 * multiplier}) 0%, rgba(248, 242, 230, ${0.5 * multiplier}) 30%, rgba(250, 249, 245, ${0.8 * multiplier}) 70%, transparent 100%)`
          : `linear-gradient(135deg, rgba(253, 251, 248, 0.9) 0%, rgba(248, 242, 230, 0.8) 50%, rgba(253, 251, 248, 0.9) 100%)`,
        borderRadius: '24px',
        padding: '16px',
        boxShadow: isHovered
          ? `0 20px 40px rgba(120, 134, 107, ${0.2 * multiplier}), 0 10px 20px rgba(120, 134, 107, ${0.1 * multiplier})`
          : '0 8px 16px rgba(120, 134, 107, 0.08), 0 4px 8px rgba(120, 134, 107, 0.04)',
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        transform: isHovered ? 'scale(1.01)' : 'scale(1)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Liquid highlight overlay */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, ${0.3 * multiplier}) 0%, transparent 50%)`
            : 'transparent',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.6s ease-out',
        }}
      />
      
      {/* Morphing border effect */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          border: `2px solid transparent`,
          background: isHovered
            ? `linear-gradient(${45 + mousePos.x * 0.5}deg, rgba(120, 134, 107, ${0.4 * multiplier}) 0%, rgba(187, 201, 194, ${0.3 * multiplier}) 50%, rgba(120, 134, 107, ${0.4 * multiplier}) 100%) border-box`
            : 'transparent',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'subtract',
          maskComposite: 'subtract',
          transition: 'background 0.6s ease-out',
        }}
      />

      {/* Enhanced Table with liquid effects */}
      <div 
        className="relative z-10"
        style={{
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(4px)',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Table
          {...props}
          className={`
            transition-all duration-300 ease-out
            [&_thead]:backdrop-blur-sm
            [&_tbody_tr]:transition-all
            [&_tbody_tr]:duration-300
            [&_tbody_tr:hover]:shadow-lg
            [&_tbody_tr:hover]:scale-[1.005]
            [&_tbody_tr:hover]:z-10
            [&_tbody_tr:hover]:relative
          `}
        />
      </div>

      {/* Ambient particles effect */}
      {isHovered && (
        <>
          <div
            className="absolute w-2 h-2 bg-sage-300 rounded-full opacity-60 animate-pulse pointer-events-none"
            style={{
              left: `${20 + mousePos.x * 0.3}%`,
              top: `${15 + mousePos.y * 0.2}%`,
              animationDelay: '0s',
              animationDuration: '2s',
            }}
          />
          <div
            className="absolute w-1.5 h-1.5 bg-sage-400 rounded-full opacity-40 animate-pulse pointer-events-none"
            style={{
              left: `${70 + mousePos.x * 0.2}%`,
              top: `${80 + mousePos.y * 0.1}%`,
              animationDelay: '0.5s',
              animationDuration: '2.5s',
            }}
          />
          <div
            className="absolute w-1 h-1 bg-sage-500 rounded-full opacity-30 animate-pulse pointer-events-none"
            style={{
              left: `${40 + mousePos.x * 0.4}%`,
              top: `${60 + mousePos.y * 0.3}%`,
              animationDelay: '1s',
              animationDuration: '3s',
            }}
          />
        </>
      )}
      

    </div>
  )
} 