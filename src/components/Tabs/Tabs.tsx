import React, { useState, useEffect, useRef } from 'react'

export interface TabItem {
  id: string
  label: string
  content: React.ReactNode
  disabled?: boolean
  icon?: React.ReactNode
}

export interface TabsProps {
  items: TabItem[]
  defaultActiveTab?: string
  activeTab?: string
  variant?: 'standard' | 'underline' | 'gesture'
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  scrollable?: boolean
  className?: string
  onTabChange?: (tabId: string) => void
}

// Underline Tab Component (cleaner design)
const UnderlineTab: React.FC<{
  tab: TabItem
  isActive: boolean
  onClick: () => void
  size: 'sm' | 'md' | 'lg'
}> = ({ tab, isActive, onClick, size }) => {
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  }

  return (
    <button
      onClick={onClick}
      disabled={tab.disabled}
      className={`
        relative font-medium transition-all duration-200 flex items-center space-x-2 border-b-2
        ${sizes[size]}
        ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}
        ${isActive ? 'font-semibold' : ''}
      `}
      style={{
        color: isActive ? '#78866B' : '#6B7A5E',
        borderBottomColor: isActive ? '#78866B' : 'transparent',
        backgroundColor: 'transparent'
      }}
    >
      {tab.icon && <span>{tab.icon}</span>}
      <span>{tab.label}</span>
    </button>
  )
}

// Gesture Tab Component
const GestureTab: React.FC<{
  tab: TabItem
  isActive: boolean
  onClick: () => void
  size: 'sm' | 'md' | 'lg'
}> = ({ tab, isActive, onClick, size }) => {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const tabRef = useRef<HTMLButtonElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (tab.disabled) return
    setIsDragging(true)
    setIsPressed(true)
    const rect = tabRef.current?.getBoundingClientRect()
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || tab.disabled) return
    const rect = tabRef.current?.getBoundingClientRect()
    if (rect) {
      const newX = e.clientX - rect.left - rect.width / 2
      const newY = e.clientY - rect.top - rect.height / 2
      setDragOffset({ x: newX, y: newY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsPressed(false)
    setDragOffset({ x: 0, y: 0 })
    if (Math.abs(dragOffset.x) < 10 && Math.abs(dragOffset.y) < 10) {
      onClick()
    }
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  }

  return (
    <button
      ref={tabRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      disabled={tab.disabled}
      className={`
        relative font-medium transition-all duration-300 flex items-center space-x-2 cursor-grab active:cursor-grabbing
        ${sizes[size]}
        ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      style={{
        backgroundColor: isActive ? '#78866B' : 'transparent',
        color: isActive ? 'white' : '#4D5D53',
                    borderRadius: '8px',
        transform: `translate(${dragOffset.x * 0.1}px, ${dragOffset.y * 0.1}px) rotateX(${dragOffset.y * 0.1}deg) rotateY(${dragOffset.x * 0.1}deg) scale(${isPressed ? 0.95 : 1})`,
        transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        border: '1px solid',
        borderColor: isActive ? '#78866B' : '#F3ECE0'
      }}
    >
      {tab.icon && <span>{tab.icon}</span>}
      <span>{tab.label}</span>
    </button>
  )
}

// Animated Indicator Component
const AnimatedIndicator: React.FC<{
  activeIndex: number
  tabRefs: React.RefObject<HTMLButtonElement | null>[]
  orientation: 'horizontal' | 'vertical'
}> = ({ activeIndex, tabRefs, orientation }) => {
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    height: 0,
    left: 0,
    top: 0
  })

  useEffect(() => {
    const activeTab = tabRefs[activeIndex]?.current
    if (activeTab) {
      const rect = activeTab.getBoundingClientRect()
      const parentRect = activeTab.parentElement?.getBoundingClientRect()
      
      if (parentRect) {
        setIndicatorStyle({
          width: orientation === 'horizontal' ? rect.width : 4,
          height: orientation === 'horizontal' ? 4 : rect.height,
          left: orientation === 'horizontal' ? rect.left - parentRect.left : 0,
          top: orientation === 'horizontal' ? rect.bottom - parentRect.top : rect.top - parentRect.top
        })
      }
    }
  }, [activeIndex, tabRefs, orientation])

  return (
    <div
      className="absolute transition-all duration-300 ease-out"
      style={{
        width: indicatorStyle.width,
        height: indicatorStyle.height,
        left: indicatorStyle.left,
        top: indicatorStyle.top,
        backgroundColor: '#78866B',
        borderRadius: '2px',
        transform: orientation === 'horizontal' ? 'translateY(-2px)' : 'translateX(-2px)'
      }}
    />
  )
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveTab,
  activeTab,
  variant = 'standard',
  orientation = 'horizontal',
  size = 'md',
  fullWidth = false,
  scrollable = false,
  className = '',
  onTabChange
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(
    activeTab || defaultActiveTab || items[0]?.id
  )
  const tabRefs = useRef<React.RefObject<HTMLButtonElement | null>[]>(
    items.map(() => React.createRef<HTMLButtonElement>())
  )

  const currentActiveTab = activeTab || internalActiveTab
  const activeIndex = items.findIndex(item => item.id === currentActiveTab)
  const activeTabContent = items.find(item => item.id === currentActiveTab)?.content

  const handleTabClick = (tabId: string) => {
    if (!activeTab) {
      setInternalActiveTab(tabId)
    }
    if (onTabChange) {
      onTabChange(tabId)
    }
  }

  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  return (
    <div className={`${className}`}>
      {/* Tab List */}
      <div 
        className={`
          relative
          ${orientation === 'horizontal' ? 'flex' : 'flex flex-col'}
          ${fullWidth ? 'w-full' : ''}
          ${scrollable ? 'overflow-x-auto' : ''}
          ${sizes[size]}
        `}
        style={{
          borderBottom: orientation === 'horizontal' ? '1px solid #F3ECE0' : 'none',
          borderRight: orientation === 'vertical' ? '1px solid #F3ECE0' : 'none'
        }}
      >
        {items.map((tab, index) => {
          const isActive = tab.id === currentActiveTab
          
          return (
            <div
              key={tab.id}
              className={`
                ${fullWidth ? 'flex-1' : ''}
                ${orientation === 'horizontal' ? 'mr-2' : 'mb-2'}
              `}
            >
              {variant === 'underline' ? (
                <UnderlineTab
                  tab={tab}
                  isActive={isActive}
                  onClick={() => handleTabClick(tab.id)}
                  size={size}
                />
              ) : variant === 'gesture' ? (
                <GestureTab
                  tab={tab}
                  isActive={isActive}
                  onClick={() => handleTabClick(tab.id)}
                  size={size}
                />
              ) : (
                <button
                  ref={tabRefs.current[index]}
                  onClick={() => handleTabClick(tab.id)}
                  disabled={tab.disabled}
                  className={`
                    relative font-medium transition-all duration-200 flex items-center space-x-2 rounded-lg
                    ${size === 'sm' ? 'px-3 py-2 text-sm' : ''}
                    ${size === 'md' ? 'px-4 py-3 text-base' : ''}
                    ${size === 'lg' ? 'px-6 py-4 text-lg' : ''}
                    ${isActive ? 'font-semibold' : ''}
                    ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                    ${fullWidth ? 'w-full justify-center' : ''}
                  `}
                  style={{
                    backgroundColor: isActive ? '#78866B' : 'transparent',
                    color: isActive ? 'white' : '#4D5D53',
                    border: '1px solid',
                    borderColor: isActive ? '#78866B' : 'transparent'
                  }}
                >
                  {tab.icon && <span>{tab.icon}</span>}
                  <span>{tab.label}</span>
                </button>
              )}
            </div>
          )
        })}
        
        {/* Animated Indicator for Standard Variant */}
        {variant === 'standard' && (
          <AnimatedIndicator
            activeIndex={activeIndex}
            tabRefs={tabRefs.current}
            orientation={orientation}
          />
        )}
      </div>

      {/* Tab Content */}
      <div 
        className={`
          ${orientation === 'horizontal' ? 'mt-6' : 'ml-6'}
          transition-all duration-300
        `}
      >
        {activeTabContent}
      </div>
    </div>
  )
} 
