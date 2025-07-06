import React, { useState, useRef } from 'react'

export interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
  active?: boolean
  disabled?: boolean
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  variant?: 'standard' | 'vine' | 'ripple'
  separator?: 'arrow' | 'slash' | 'dot' | 'custom'
  customSeparator?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  maxItems?: number
  className?: string
  onItemClick?: (item: BreadcrumbItem, index: number) => void
}

// Vine-like Connector Component
const VineConnector: React.FC<{ index: number }> = ({ index }) => {
  return (
    <div className="flex items-center mx-2">
      <svg width="24" height="16" viewBox="0 0 24 16" style={{ color: '#ACBAA1' }}>
        <path
          d="M0 8 Q6 4, 12 8 T24 8"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray="3,2"
          style={{ 
            opacity: 0.7,
            animationDelay: `${index * 0.1}s`
          }}
        />
      </svg>
    </div>
  )
}

// Ripple Breadcrumb Item Component
const RippleBreadcrumbItem: React.FC<{
  item: BreadcrumbItem
  index: number
  onItemClick?: (item: BreadcrumbItem, index: number) => void
}> = ({ item, index, onItemClick }) => {
  const [ripples, setRipples] = useState<Array<{ id: number, x: number, y: number, size: number }>>([])
  const itemRef = useRef<HTMLElement>(null)

  const handleClick = (e: React.MouseEvent) => {
    if (item.disabled) return

    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const newRipple = {
        id: Date.now(),
        x,
        y,
        size: 0
      }
      
      setRipples(prev => [...prev, newRipple])
      
      // Animate ripple growth
      let startTime = Date.now()
      
      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000
        const maxSize = 60
        const finalSize = Math.min(elapsed * 100, maxSize)
        
        setRipples(prev => 
          prev.map(ripple => 
            ripple.id === newRipple.id 
              ? { ...ripple, size: finalSize }
              : ripple
          )
        )
        
        if (finalSize < maxSize) {
          requestAnimationFrame(animate)
        } else {
          setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id))
          }, 300)
        }
      }
      
      animate()
    }

    if (item.onClick) {
      item.onClick()
    }
    if (onItemClick) {
      onItemClick(item, index)
    }
  }

  const Tag = item.href ? 'a' : 'button'

  return (
    <Tag
      ref={itemRef as any}
      href={item.href}
      onClick={handleClick}
      className={`
        relative px-3 py-2 rounded-2xl transition-all duration-200 overflow-hidden
        ${item.active ? 'font-semibold' : 'font-medium'}
        ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
      `}
      style={{
        backgroundColor: item.active ? '#78866B' : 'transparent',
        color: item.active ? 'white' : '#6B7A5E',
      }}
      disabled={item.disabled}
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            borderRadius: '50%',
            backgroundColor: 'rgba(120, 134, 107, 0.3)',
            opacity: Math.max(0, 1 - ripple.size / 60),
            transition: 'opacity 0.3s ease-out'
          }}
        />
      ))}
      
      <span className="relative z-10">{item.label}</span>
    </Tag>
  )
}

// Standard Separator Component
const StandardSeparator: React.FC<{ 
  type: 'arrow' | 'slash' | 'dot' | 'custom'
  custom?: React.ReactNode
}> = ({ type, custom }) => {
  const separators = {
    arrow: (
      <svg width="16" height="16" viewBox="0 0 16 16" className="text-sage-400">
        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
    slash: <span className="text-sage-400 font-medium">/</span>,
    dot: <span className="text-sage-400 font-bold">•</span>,
    custom: custom
  }

  return (
    <div className="flex items-center mx-2">
      {separators[type]}
    </div>
  )
}

// Collapsed Items Component
const CollapsedItems: React.FC<{
  items: BreadcrumbItem[]
  onItemClick?: (item: BreadcrumbItem, index: number) => void
}> = ({ items, onItemClick }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-3 py-2 rounded-2xl transition-all duration-200 hover:scale-105 font-medium"
        style={{ color: '#6B7A5E' }}
      >
        ...
      </button>
      
      {isExpanded && (
        <div 
          className="absolute top-full left-0 mt-2 rounded-2xl shadow-xl border z-50 min-w-max"
          style={{ 
            backgroundColor: '#FDFBF8',
            borderColor: '#F3ECE0'
          }}
        >
          <div className="p-2">
            {items.map((item, index) => {
              const Tag = item.href ? 'a' : 'button'
              return (
                <Tag
                  key={index}
                  href={item.href}
                  onClick={() => {
                    if (item.onClick) item.onClick()
                    if (onItemClick) onItemClick(item, index)
                    setIsExpanded(false)
                  }}
                  className={`
                    block w-full text-left px-3 py-2 rounded-xl transition-all duration-200
                    ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                  `}
                  style={{
                    color: '#6B7A5E',
                    backgroundColor: 'transparent'
                  }}
                  disabled={item.disabled}
                >
                  {item.label}
                </Tag>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  variant = 'standard',
  separator = 'arrow',
  customSeparator,
  size = 'md',
  maxItems,
  className = '',
  onItemClick
}) => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  // Handle item truncation
  const displayItems = maxItems && items.length > maxItems
    ? [
        items[0],
        ...items.slice(-(maxItems - 2))
      ]
    : items

  const collapsedItems = maxItems && items.length > maxItems
    ? items.slice(1, -(maxItems - 2))
    : []

  return (
    <nav 
      className={`flex items-center ${sizes[size]} ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-0">
        {displayItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {/* Show collapsed items after first item */}
            {index === 1 && collapsedItems.length > 0 && (
              <>
                <CollapsedItems items={collapsedItems} onItemClick={onItemClick} />
                {variant === 'vine' ? (
                  <VineConnector index={index} />
                ) : (
                  <StandardSeparator 
                    type={separator === 'custom' ? 'custom' : separator}
                    custom={customSeparator}
                  />
                )}
              </>
            )}

            {/* Breadcrumb Item */}
            {variant === 'ripple' ? (
              <RippleBreadcrumbItem 
                item={item} 
                index={index} 
                onItemClick={onItemClick}
              />
            ) : (
              (() => {
                const Tag = item.href ? 'a' : 'button'
                return (
                  <Tag
                    href={item.href}
                    onClick={() => {
                      if (item.onClick) item.onClick()
                      if (onItemClick) onItemClick(item, index)
                    }}
                    className={`
                      px-3 py-2 rounded-2xl transition-all duration-200
                      ${item.active ? 'font-semibold' : 'font-medium'}
                      ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                    `}
                    style={{
                      backgroundColor: item.active ? '#78866B' : 'transparent',
                      color: item.active ? 'white' : '#6B7A5E',
                    }}
                    disabled={item.disabled}
                    aria-current={item.active ? 'page' : undefined}
                  >
                    {item.label}
                  </Tag>
                )
              })()
            )}

            {/* Separator */}
            {index < displayItems.length - 1 && (
              variant === 'vine' ? (
                <VineConnector index={index} />
              ) : (
                <StandardSeparator 
                  type={separator === 'custom' ? 'custom' : separator}
                  custom={customSeparator}
                />
              )
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
} 
