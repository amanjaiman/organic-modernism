import React, { useState, useRef } from 'react'

// Add CSS styles for custom scrollbar - hidden by default, visible on hover
const scrollbarStyles = `
  .floating-nav-scrollable::-webkit-scrollbar {
    width: 2px;
  }
  
  .floating-nav-scrollable::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .floating-nav-scrollable::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 1px;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .floating-nav-container:hover .floating-nav-scrollable::-webkit-scrollbar-thumb {
    background: rgba(120, 134, 107, 0.1);
  }
  
  .floating-nav-container:hover .floating-nav-scrollable::-webkit-scrollbar-thumb:hover {
    background: rgba(120, 134, 107, 0.2);
  }
  
  .floating-nav-scrollable::-webkit-scrollbar-corner {
    background: transparent;
  }
  
  /* Firefox styles */
  .floating-nav-scrollable {
    scrollbar-width: none;
    scrollbar-color: transparent transparent;
  }
  
  .floating-nav-container:hover .floating-nav-scrollable {
    scrollbar-width: thin;
    scrollbar-color: rgba(120, 134, 107, 0.1) transparent;
  }
`

// Inject styles if not already present
if (typeof document !== 'undefined' && !document.querySelector('#floating-nav-scrollbar-styles')) {
  const styleElement = document.createElement('style')
  styleElement.id = 'floating-nav-scrollbar-styles'
  styleElement.textContent = scrollbarStyles
  document.head.appendChild(styleElement)
}

export interface FloatingNavItem {
  label: string
  href?: string
  onClick?: () => void
  active?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  badge?: string | number
  tooltip?: string
}

export interface FloatingNavProps {
  items: FloatingNavItem[]
  side?: 'left' | 'right'
  variant?: 'standard' | 'liquid' | 'organic'
  size?: 'sm' | 'md' | 'lg'
  displayMode?: 'icon' | 'text'
  collapsible?: boolean
  maxHeight?: number | string
  className?: string
  onItemClick?: (item: FloatingNavItem) => void
}

// FloatingNav Item Component
const FloatingNavItemComponent: React.FC<{
  item: FloatingNavItem
  variant: 'standard' | 'liquid' | 'organic'
  size: 'sm' | 'md' | 'lg'
  displayMode: 'icon' | 'text'
  isCollapsed?: boolean
  onItemClick?: (item: FloatingNavItem) => void
}> = ({ item, variant, size, displayMode, isCollapsed = false, onItemClick }) => {
  const [liquidOffset, setLiquidOffset] = useState({ x: 0, y: 0 })
  const itemRef = useRef<HTMLElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (variant !== 'liquid' || !itemRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setLiquidOffset({ x, y })
  }

  const handleClick = () => {
    if (item.onClick) item.onClick()
    if (onItemClick) onItemClick(item)
  }

  const getSizeStyles = () => {
    // When collapsed, always use icon sizing regardless of displayMode
    if (isCollapsed) {
      switch (size) {
        case 'sm':
          return {
            width: '36px',
            height: '36px',
            fontSize: '14px'
          }
        case 'lg':
          return {
            width: '48px',
            height: '48px',
            fontSize: '18px'
          }
        default: // md
          return {
            width: '42px',
            height: '42px',
            fontSize: '16px'
          }
      }
    }
    
    // When expanded, use text sizing for collapsible or follow displayMode for non-collapsible
    if (displayMode === 'text' || !isCollapsed) {
      switch (size) {
        case 'sm':
          return {
            width: '140px',
            height: '32px',
            fontSize: '13px',
            paddingX: '12px'
          }
        case 'lg':
          return {
            width: '160px',
            height: '44px',
            fontSize: '15px',
            paddingX: '16px'
          }
        default: // md
          return {
            width: '150px',
            height: '38px',
            fontSize: '14px',
            paddingX: '14px'
          }
      }
    } else {
      // Icon mode when not collapsible
      switch (size) {
        case 'sm':
          return {
            width: '36px',
            height: '36px',
            fontSize: '14px'
          }
        case 'lg':
          return {
            width: '48px',
            height: '48px',
            fontSize: '18px'
          }
        default: // md
          return {
            width: '42px',
            height: '42px',
            fontSize: '16px'
          }
      }
    }
  }

  const getItemStyles = () => {
    const sizeStyles = getSizeStyles()
    
    // Handle active state - this overrides all other states
    if (item.active) {
      return {
        ...sizeStyles,
        backgroundColor: '#78866B',
        color: 'white',
        boxShadow: '0 4px 16px rgba(120, 134, 107, 0.2), 0 2px 8px rgba(120, 134, 107, 0.1)',
        transform: 'translateY(-1px) scale(1.02)'
      }
    }

    // Default state - CSS hover will handle hover styling
    return {
      ...sizeStyles,
      backgroundColor: variant === 'organic' 
        ? 'linear-gradient(135deg, rgba(253, 251, 248, 0.92) 0%, rgba(248, 242, 230, 0.92) 100%)'
        : 'rgba(253, 251, 248, 0.92)',
      color: '#8F9779',
      boxShadow: '0 2px 8px rgba(120, 134, 107, 0.06), 0 1px 4px rgba(120, 134, 107, 0.04)',
      transform: 'translateY(0px) scale(1)'
    }
  }

  const Tag = item.href ? 'a' : 'button'

  return (
    <div 
      className="relative group"
      onMouseMove={handleMouseMove}
    >
      <Tag
        ref={itemRef as any}
        href={item.href}
        onClick={handleClick}
        className={`
          relative flex items-center ${(!isCollapsed && displayMode === 'text') || (isCollapsed === false && displayMode === 'text') ? 'justify-start px-3' : 'justify-center'} rounded-md transition-all duration-300 ease-out
          ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${!item.disabled && !item.active ? 'hover:bg-[#F8F2E6] hover:text-[#4D5D53] hover:shadow-[0_6px_20px_rgba(120,134,107,0.12),0_3px_10px_rgba(120,134,107,0.08)] hover:-translate-y-0.5 hover:scale-105' : ''}
        `}
        style={{
          ...getItemStyles(),
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
          paddingLeft: (!isCollapsed && (displayMode === 'text' || isCollapsed === false)) ? getItemStyles().paddingX : undefined,
          paddingRight: (!isCollapsed && (displayMode === 'text' || isCollapsed === false)) ? getItemStyles().paddingX : undefined
        }}
        disabled={item.disabled}
        title={item.tooltip || item.label}
      >
        {/* Content */}
        <div className="flex items-center space-x-2">
          {/* Icon - show when collapsed or when displayMode is icon and not collapsible */}
          {item.icon && (isCollapsed || (displayMode === 'icon' && !isCollapsed)) && (
            <div className="flex items-center justify-center transition-all duration-300 flex-shrink-0">
              {item.icon}
            </div>
          )}
          
          {/* Text - show when expanded or when displayMode is text and not collapsible */}
          {(!isCollapsed || (displayMode === 'text' && !isCollapsed)) && (
            <span className="font-medium whitespace-nowrap transition-all duration-300">
              {item.label}
            </span>
          )}
        </div>

        {/* Badge */}
        {item.badge && (
          <div 
            className={`absolute px-1.5 py-0.5 rounded-full text-xs font-semibold transition-all duration-300 ${
              displayMode === 'text' ? '-top-0.5 -right-1' : '-top-0.5 -right-0.5'
            }`}
            style={{
              backgroundColor: '#78866B',
              color: 'white',
              fontSize: '9px',
              minWidth: '16px',
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 4px rgba(120, 134, 107, 0.2)'
            }}
          >
            {item.badge}
          </div>
        )}

        {/* Liquid effect overlay - will be handled by CSS hover */}
        {variant === 'liquid' && (
          <div 
            className="absolute inset-0 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${liquidOffset.x}% ${liquidOffset.y}%, rgba(120, 134, 107, 0.08) 0%, transparent 70%)`
            }}
          />
        )}
      </Tag>

      {/* Tooltip - only show in icon mode or if there's a specific tooltip */}
      {displayMode === 'icon' && (item.tooltip || item.label) && (
        <div 
          className="absolute z-10 px-2.5 py-1.5 text-xs font-medium rounded shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap"
          style={{
            backgroundColor: '#4D5D53',
            color: 'white',
            left: '50%',
            transform: 'translateX(-50%) translateY(-4px)',
            top: '100%',
            marginTop: '6px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)'
          }}
        >
          {item.tooltip || item.label}
          {/* Tooltip arrow */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full"
            style={{
              width: '0',
              height: '0',
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderBottom: '4px solid #4D5D53'
            }}
          />
        </div>
      )}
      
      {/* Tooltip for text mode - only show if there's a specific tooltip different from label */}
      {displayMode === 'text' && item.tooltip && item.tooltip !== item.label && (
        <div 
          className="absolute z-10 px-2.5 py-1.5 text-xs font-medium rounded shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap"
          style={{
            backgroundColor: '#4D5D53',
            color: 'white',
            left: '50%',
            transform: 'translateX(-50%) translateY(-4px)',
            top: '100%',
            marginTop: '6px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)'
          }}
        >
          {item.tooltip}
          {/* Tooltip arrow */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full"
            style={{
              width: '0',
              height: '0',
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderBottom: '4px solid #4D5D53'
            }}
          />
        </div>
      )}
    </div>
  )
}

// Main FloatingNav Component
export const FloatingNav: React.FC<FloatingNavProps> = ({
  items,
  side = 'right',
  variant = 'standard',
  size = 'md',
  displayMode = 'icon',
  collapsible = false,
  maxHeight = 800,
  className = '',
  onItemClick
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [liquidBg, setLiquidBg] = useState({ x: 0, y: 0 })
  const [isExpanded, setIsExpanded] = useState(!collapsible)
  const navRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (variant !== 'liquid' || !navRef.current) return
    const rect = navRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setLiquidBg({ x, y })
  }

  const getContainerStyles = () => {
    if (variant === 'liquid' && isHovered) {
      return {
        background: `radial-gradient(circle at ${liquidBg.x}% ${liquidBg.y}%, rgba(253, 251, 248, 0.92) 0%, rgba(248, 242, 230, 0.88) 100%)`
      }
    } else if (variant === 'organic') {
      return {
        background: `linear-gradient(135deg, 
          rgba(253, 251, 248, 0.92) 0%, 
          rgba(248, 242, 230, 0.88) 30%, 
          rgba(253, 251, 248, 0.92) 70%, 
          rgba(244, 246, 242, 0.88) 100%)`
      }
    } else {
      return {
        backgroundColor: 'rgba(253, 251, 248, 0.92)'
      }
    }
  }

  const getSpacing = () => {
    switch (size) {
      case 'sm':
        return '6px'
      case 'lg':
        return '10px'
      default:
        return '8px'
    }
  }

  return (
    <div
      ref={navRef}
      className={`
        floating-nav-container fixed top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ease-out
        ${side === 'left' ? 'left-6' : 'right-6'}
        ${className}
      `}
      style={{
        padding: getSpacing(),
        borderRadius: '8px',
        boxShadow: side === 'left' 
          ? '4px 0 20px rgba(0, 0, 0, 0.08), 2px 0 8px rgba(0, 0, 0, 0.04)' 
          : '-4px 0 20px rgba(0, 0, 0, 0.08), -2px 0 8px rgba(0, 0, 0, 0.04)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
        ...getContainerStyles()
      }}
      onMouseEnter={() => {
        setIsHovered(true)
        if (collapsible) setIsExpanded(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        if (collapsible) setIsExpanded(false)
      }}
      onMouseMove={handleMouseMove}
    >
      <div 
        className="flex flex-col space-y-2 overflow-y-auto overflow-x-hidden floating-nav-scrollable"
        style={{
          maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
          paddingRight: '2px', // Space for scrollbar
          marginRight: '-2px', // Offset to maintain visual alignment
        }}
      >
        {items.map((item, index) => (
          <FloatingNavItemComponent
            key={`${index}-${item.active}-${item.label}`}
            item={item}
            variant={variant}
            size={size}
            displayMode={displayMode}
            isCollapsed={!isExpanded}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    </div>
  )
} 
