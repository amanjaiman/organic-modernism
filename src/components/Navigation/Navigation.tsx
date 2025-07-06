import React, { useState, useEffect, useRef } from 'react'

export interface NavigationItem {
  label: string
  href?: string
  onClick?: () => void
  active?: boolean
  disabled?: boolean
  children?: NavigationItem[]
}

export interface NavigationProps {
  items: NavigationItem[]
  logo?: React.ReactNode
  logoHref?: string
  variant?: 'standard' | 'liquid' | 'time-aware'
  size?: 'sm' | 'md' | 'lg'
  position?: 'static' | 'sticky' | 'fixed'
  backdrop?: boolean
  className?: string
  onItemClick?: (item: NavigationItem) => void
}

// Dropdown Component
const NavigationDropdown: React.FC<{
  item: NavigationItem
  onItemClick?: (item: NavigationItem) => void
  variant?: 'standard' | 'liquid' | 'time-aware'
}> = ({ item, onItemClick, variant = 'standard' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [liquidOffset, setLiquidOffset] = useState({ x: 0, y: 0 })
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<number | undefined>(undefined)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150) // Small delay to allow moving to dropdown
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (variant !== 'liquid' || !dropdownRef.current) return
    const rect = dropdownRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setLiquidOffset({ x, y })
  }

  const handleMainClick = () => {
    if (!item.children || item.children.length === 0) {
      if (item.onClick) item.onClick()
      if (onItemClick) onItemClick(item)
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div 
      ref={dropdownRef} 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <button
        onClick={handleMainClick}
        className={`
          flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-200 font-medium
          ${item.active ? 'font-semibold' : ''}
          ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
        `}
        style={{
          backgroundColor: item.active ? '#78866B' : 'transparent',
          color: item.active ? 'white' : '#4D5D53',
          ...(variant === 'liquid' && isHovered && !item.active ? {
            background: `radial-gradient(circle at ${liquidOffset.x}% ${liquidOffset.y}%, rgba(120, 134, 107, 0.05) 0%, transparent 50%)`
          } : {})
        }}
        disabled={item.disabled}
      >
        <span>{item.label}</span>
        {item.children && item.children.length > 0 && (
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="currentColor"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        )}
      </button>

      {/* Dropdown Menu */}
      {item.children && item.children.length > 0 && isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 rounded-lg shadow-xl border min-w-max"
          style={{ 
            backgroundColor: '#FDFBF8',
            borderColor: '#F3ECE0',
            zIndex: 9999
          }}
        >
          <div className="py-2">
            {item.children.map((child, index) => (
              <button
                key={index}
                onClick={() => {
                  if (child.onClick) child.onClick()
                  if (onItemClick) onItemClick(child)
                  setIsOpen(false)
                }}
                className={`
                  block w-full text-left px-4 py-2 transition-all duration-200 font-medium
                  ${child.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                `}
                style={{
                  color: '#6B7A5E',
                  backgroundColor: 'transparent'
                }}
                disabled={child.disabled}
              >
                {child.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Liquid Navigation Item Component
const LiquidNavigationItem: React.FC<{
  item: NavigationItem
  onItemClick?: (item: NavigationItem) => void
}> = ({ item, onItemClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [liquidOffset, setLiquidOffset] = useState({ x: 0, y: 0 })
  const itemRef = useRef<HTMLElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!itemRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setLiquidOffset({ x, y })
  }

  const handleClick = () => {
    if (item.onClick) {
      item.onClick()
    }
    if (onItemClick) {
      onItemClick(item)
    }
  }

  const Tag = item.href ? 'a' : 'button'

  return (
    <Tag
      ref={itemRef as any}
      href={item.href}
      onClick={handleClick}
      className={`
        relative px-4 py-2 rounded-lg transition-all duration-300 overflow-hidden
        ${item.active ? 'font-semibold' : 'font-medium'}
        ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isHovered ? 'scale-105' : ''}
      `}
      style={{
        backgroundColor: item.active ? '#78866B' : 'transparent',
        color: item.active ? 'white' : '#4D5D53',
        background: isHovered && !item.active ? 
          `radial-gradient(circle at ${liquidOffset.x}% ${liquidOffset.y}%, rgba(120, 134, 107, 0.05) 0%, transparent 50%)` : 
          item.active ? '#78866B' : 'transparent'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      disabled={item.disabled}
    >
      {item.label}
    </Tag>
  )
}

// Time-Aware Navigation Component
const TimeAwareNavigation: React.FC<{
  items: NavigationItem[]
  onItemClick?: (item: NavigationItem) => void
}> = ({ items, onItemClick }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute
    return () => clearInterval(timer)
  }, [])

  const hour = currentTime.getHours()
  const getTimeTheme = () => {
    if (hour < 6) return { bg: '#1a1a1a', text: '#e5e5e5', accent: '#6B7A5E' } // Night
    if (hour < 12) return { bg: '#FDFBF8', text: '#4D5D53', accent: '#78866B' } // Morning
    if (hour < 17) return { bg: '#F4F6F2', text: '#4D5D53', accent: '#8F9779' } // Afternoon
    if (hour < 20) return { bg: '#E8ECDE', text: '#4D5D53', accent: '#6B7A5E' } // Evening
    return { bg: '#2a2a2a', text: '#e5e5e5', accent: '#ACBAA1' } // Night
  }

  const theme = getTimeTheme()

  return (
    <div 
      className="flex items-center space-x-1 transition-all duration-1000"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            if (item.onClick) item.onClick()
            if (onItemClick) onItemClick(item)
          }}
          className={`
            px-4 py-2 rounded-lg transition-all duration-300 font-medium
            ${item.active ? 'font-semibold' : ''}
            ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
          `}
          style={{
            backgroundColor: item.active ? theme.accent : 'transparent',
            color: item.active ? 'white' : theme.text,
          }}
          disabled={item.disabled}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

// Mobile Menu with Morphing Geometry
const MobileMenu: React.FC<{
  items: NavigationItem[]
  isOpen: boolean
  onClose: () => void
  onItemClick?: (item: NavigationItem) => void
}> = ({ items, isOpen, onClose, onItemClick }) => {
  const [morphState, setMorphState] = useState(0)

  useEffect(() => {
    if (isOpen) {
      let animationFrame: number
      let startTime = Date.now()
      
      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000
        setMorphState(Math.sin(elapsed * 2) * 0.1 + 1)
        
        if (isOpen) {
          animationFrame = requestAnimationFrame(animate)
        }
      }
      
      animate()
      
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div 
        className="absolute right-0 top-0 h-full w-80 shadow-2xl transition-all duration-300"
        style={{
          backgroundColor: '#FDFBF8',
          borderRadius: `${24 * morphState}px 0 0 ${24 * morphState}px`,
          transform: `scaleY(${morphState})`,
          transformOrigin: 'top right'
        }}
      >
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gray-100"
            style={{ color: '#6B7A5E' }}
          >
            ✕
          </button>
          <div className="mt-8 space-y-4">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  if (item.onClick) item.onClick()
                  if (onItemClick) onItemClick(item)
                  onClose()
                }}
                className={`
                  w-full text-left px-4 py-3 rounded-lg transition-all duration-200
                  ${item.active ? 'font-semibold' : 'font-medium'}
                  ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                `}
                style={{
                  backgroundColor: item.active ? '#78866B' : 'transparent',
                  color: item.active ? 'white' : '#4D5D53',
                }}
                disabled={item.disabled}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const Navigation: React.FC<NavigationProps> = ({
  items,
  logo,
  logoHref,
  variant = 'standard',
  size = 'md',
  position = 'static',
  backdrop = false,
  className = '',
  onItemClick
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const sizes = {
    sm: 'px-4 py-2',
    md: 'px-6 py-4',
    lg: 'px-8 py-6'
  }

  const positions = {
    static: 'relative',
    sticky: 'sticky top-0 z-40',
    fixed: 'fixed top-0 left-0 right-0 z-40'
  }

  const LogoComponent = logoHref ? 'a' : 'div'

  return (
    <>
      <nav 
        className={`
          ${positions[position]} ${sizes[size]} ${className}
          ${backdrop ? 'backdrop-blur-md bg-opacity-90' : ''}
          transition-all duration-300
        `}
        style={{
          backgroundColor: backdrop ? 'rgba(253, 251, 248, 0.9)' : '#FDFBF8',
          borderBottom: '1px solid #F3ECE0'
        }}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          {logo && (
            <LogoComponent 
              href={logoHref}
              className="flex items-center space-x-2 font-bold text-xl transition-all duration-200 hover:scale-105"
              style={{ color: '#4D5D53' }}
            >
              {logo}
            </LogoComponent>
          )}

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {variant === 'time-aware' ? (
              <TimeAwareNavigation items={items} onItemClick={onItemClick} />
            ) : (
              items.map((item, index) => (
                item.children && item.children.length > 0 ? (
                  <NavigationDropdown 
                    key={index} 
                    item={item} 
                    onItemClick={onItemClick}
                    variant={variant}
                  />
                ) : variant === 'liquid' ? (
                  <LiquidNavigationItem 
                    key={index} 
                    item={item} 
                    onItemClick={onItemClick}
                  />
                ) : (
                  (() => {
                    const Tag = item.href ? 'a' : 'button'
                    return (
                      <Tag
                        key={index}
                        href={item.href}
                        onClick={() => {
                          if (item.onClick) item.onClick()
                          if (onItemClick) onItemClick(item)
                        }}
                        className={`
                          px-4 py-2 rounded-lg transition-all duration-200 font-medium
                          ${item.active ? 'font-semibold' : ''}
                          ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105 hover:bg-opacity-10'}
                        `}
                        style={{
                          backgroundColor: item.active ? '#78866B' : 'transparent',
                          color: item.active ? 'white' : '#4D5D53',
                        }}
                        disabled={item.disabled}
                      >
                        {item.label}
                      </Tag>
                    )
                  })()
                )
              ))
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg transition-all duration-200 hover:bg-opacity-10"
            style={{ color: '#6B7A5E' }}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        items={items}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onItemClick={onItemClick}
      />
    </>
  )
} 
