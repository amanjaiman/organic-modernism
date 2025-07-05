import React, { useState, useEffect, useRef } from 'react'

export interface SideNavItem {
  label: string
  href?: string
  onClick?: () => void
  active?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  badge?: string | number
  children?: SideNavItem[]
}

export interface SideNavProps {
  items: SideNavItem[]
  width?: number
  minWidth?: number
  maxWidth?: number
  collapsed?: boolean
  collapsible?: boolean
  variant?: 'standard' | 'liquid' | 'organic'
  position?: 'left' | 'right'
  backdrop?: boolean
  className?: string
  onItemClick?: (item: SideNavItem) => void
  onCollapseToggle?: (collapsed: boolean) => void
}

// SideNav Item Component
const SideNavItemComponent: React.FC<{
  item: SideNavItem
  level: number
  collapsed: boolean
  variant: 'standard' | 'liquid' | 'organic'
  onItemClick?: (item: SideNavItem) => void
}> = ({ item, level, collapsed, variant, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [liquidOffset, setLiquidOffset] = useState({ x: 0, y: 0 })
  const itemRef = useRef<HTMLElement>(null)

  const hasChildren = item.children && item.children.length > 0

  const handleMouseMove = (e: React.MouseEvent) => {
    if (variant !== 'liquid' || !itemRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setLiquidOffset({ x, y })
  }

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen)
    } else {
      if (item.onClick) item.onClick()
      if (onItemClick) onItemClick(item)
    }
  }

  const getItemStyles = () => {
    if (item.active) {
      return {
        color: '#658172',
        fontWeight: '600',
        borderLeftColor: '#78866B'
      }
    }

    if (isHovered && !item.disabled) {
      return {
        color: '#4D5D53',
        borderLeftColor: '#D1DBD6'
      }
    }

    return {
      color: '#6B7A5E',
      borderLeftColor: 'transparent'
    }
  }

  const Tag = item.href ? 'a' : 'button'

  return (
    <div className="relative">
      <Tag
        ref={itemRef as any}
        href={item.href}
        onClick={handleClick}
        className={`
          relative flex items-center w-full py-2.5 px-3 text-left transition-all duration-300 ease-out font-medium text-sm
          ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-[1.01]'}
          ${collapsed ? 'justify-center' : ''}
        `}
        style={{
          marginLeft: collapsed ? '0' : `${level * 12}px`,
          marginRight: '8px',
          borderRadius: '0px 12px 12px 0px',
          transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
          ...getItemStyles(),
          // Force border-left to ensure it's not overridden
          borderLeftWidth: '4px',
          borderLeftStyle: 'solid'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        disabled={item.disabled}
      >
        {/* Icon */}
        {item.icon && (
          <div 
            className="flex items-center justify-center transition-all duration-300"
            style={{
              width: '18px',
              height: '18px',
              marginRight: collapsed ? '0' : '12px',
              color: item.active ? '#78866B' : '#8F9779'
            }}
          >
            {item.icon}
          </div>
        )}

        {/* Label */}
        {!collapsed && (
          <span className="flex-1 min-w-0 truncate">
            {item.label}
          </span>
        )}

        {/* Badge */}
        {!collapsed && item.badge && (
          <div 
            className="ml-auto px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-300"
            style={{
              backgroundColor: item.active ? '#78866B' : '#BDC9BB',
              color: item.active ? 'white' : '#4D5D53',
              fontSize: '11px'
            }}
          >
            {item.badge}
          </div>
        )}

        {/* Expand/Collapse Arrow */}
        {!collapsed && hasChildren && (
          <div className="ml-2 transition-all duration-300">
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 16 16" 
              className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ opacity: 0.6 }}
            >
              <path d="M6 4l4 4-4 4" />
            </svg>
          </div>
        )}
      </Tag>

      {/* Children */}
      {hasChildren && isOpen && !collapsed && (
        <div className="relative mt-1 mb-2">
          {item.children!.map((child, index) => (
            <SideNavItemComponent
              key={index}
              item={child}
              level={level + 1}
              collapsed={collapsed}
              variant={variant}
              onItemClick={onItemClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Main SideNav Component
export const SideNav: React.FC<SideNavProps> = ({
  items,
  width = 280,
  minWidth = 64,
  maxWidth = 400,
  collapsed = false,
  collapsible = true,
  variant = 'standard',
  position = 'left',
  backdrop = false,
  className = '',
  onItemClick,
  onCollapseToggle
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(collapsed)
  const [isHovered, setIsHovered] = useState(false)
  const [liquidBg, setLiquidBg] = useState({ x: 0, y: 0 })
  const sidenavRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setInternalCollapsed(collapsed)
  }, [collapsed])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (variant !== 'liquid' || !sidenavRef.current) return
    const rect = sidenavRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setLiquidBg({ x, y })
  }

  const handleCollapseToggle = () => {
    const newCollapsed = !internalCollapsed
    setInternalCollapsed(newCollapsed)
    if (onCollapseToggle) {
      onCollapseToggle(newCollapsed)
    }
  }

  const currentWidth = internalCollapsed ? minWidth : width

  const getBackgroundStyles = () => {
    if (variant === 'liquid' && isHovered) {
      return {
        background: `radial-gradient(circle at ${liquidBg.x}% ${liquidBg.y}%, rgba(253, 251, 248, 0.98) 0%, rgba(248, 242, 230, 0.96) 100%)`
      }
    } else if (variant === 'organic') {
      return {
        background: `linear-gradient(135deg, 
          rgba(253, 251, 248, 0.98) 0%, 
          rgba(248, 242, 230, 0.96) 30%, 
          rgba(253, 251, 248, 0.98) 70%, 
          rgba(244, 246, 242, 0.96) 100%)`
      }
    } else {
      return {
        backgroundColor: '#FDFBF8'
      }
    }
  }

  return (
    <>
      {/* Backdrop */}
      {backdrop && (
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => onCollapseToggle && onCollapseToggle(true)}
        />
      )}

      {/* SideNav */}
      <div
        ref={sidenavRef}
        className={`
          fixed top-0 bottom-0 z-50 transition-all duration-300 ease-out overflow-hidden
          ${position === 'right' ? 'right-0' : 'left-0'}
          ${className}
        `}
        style={{
          width: `${currentWidth}px`,
          minWidth: `${minWidth}px`,
          maxWidth: `${maxWidth}px`,
          boxShadow: position === 'left' 
            ? '4px 0 24px rgba(0, 0, 0, 0.08), 2px 0 8px rgba(0, 0, 0, 0.04)' 
            : '-4px 0 24px rgba(0, 0, 0, 0.08), -2px 0 8px rgba(0, 0, 0, 0.04)',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
          ...getBackgroundStyles()
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-6">
          {!internalCollapsed && (
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm transition-all duration-300"
                style={{ 
                  backgroundColor: '#78866B', 
                  color: 'white',
                  boxShadow: '0 2px 8px rgba(120, 134, 107, 0.3)'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 2h5v5H2V2zm0 7h5v5H2V9zm7-7h5v5H9V2zm0 7h5v5H9V9z"/>
                </svg>
              </div>
              <span className="font-semibold text-base tracking-tight" style={{ color: '#4D5D53' }}>
                Navigation
              </span>
            </div>
          )}
          
          {collapsible && (
            <button
              onClick={handleCollapseToggle}
              className={`
                p-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-sm
                ${internalCollapsed ? 'mx-auto' : ''}
              `}
              style={{
                backgroundColor: 'rgba(120, 134, 107, 0.08)',
                color: '#78866B',
                border: '1px solid rgba(120, 134, 107, 0.15)'
              }}
            >
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 16 16" 
                className={`transition-transform duration-300 ${internalCollapsed ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M10 12l-4-4 4-4" />
              </svg>
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 pb-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`
            .overflow-y-auto::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {items.map((item, index) => (
            <SideNavItemComponent
              key={index}
              item={item}
              level={0}
              collapsed={internalCollapsed}
              variant={variant}
              onItemClick={onItemClick}
            />
          ))}
        </div>

        {/* Footer */}
        {!internalCollapsed && (
          <div className="px-6 py-4 border-t border-black/5">
            <div className="text-center">
              <p className="text-xs font-medium opacity-60" style={{ color: '#8F9779' }}>
                Design System
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
} 