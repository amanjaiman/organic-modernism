import React, { useState } from 'react'

interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
  disabled?: boolean
}

interface LiquidAccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  defaultOpen?: string[]
  variant?: 'default' | 'bordered' | 'filled' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onToggle?: (id: string, isOpen: boolean) => void
}

export const LiquidAccordion: React.FC<LiquidAccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
  variant = 'default',
  size = 'md',
  className = '',
  onToggle,
}) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen)
  const [mousePosition, setMousePosition] = useState<{ [key: string]: { x: number; y: number } }>({})

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      let newOpenItems: string[]
      
      if (allowMultiple) {
        newOpenItems = prev.includes(id)
          ? prev.filter(item => item !== id)
          : [...prev, id]
      } else {
        newOpenItems = prev.includes(id) ? [] : [id]
      }
      
      const isOpen = newOpenItems.includes(id)
      onToggle?.(id, isOpen)
      
      return newOpenItems
    })
  }

  const handleMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition(prev => ({
      ...prev,
      [id]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }))
  }

  const variantClasses = {
    default: 'border-b border-stone-200',
    bordered: 'border border-stone-200 rounded-2xl mb-3 overflow-hidden',
    filled: 'bg-gradient-to-br from-stone-50 to-stone-100 border border-stone-200 rounded-2xl mb-3 overflow-hidden',
    glass: 'bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl mb-3 overflow-hidden',
  }

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5',
  }

  return (
    <div className={`w-full ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)
        const isDisabled = item.disabled
        const mouse = mousePosition[item.id] || { x: 0, y: 0 }

        return (
          <div 
            key={item.id} 
            className={`${variantClasses[variant]} ${isDisabled ? 'opacity-50' : ''} relative transition-all duration-500 ease-out`}
            style={{
              transform: isOpen ? 'scale(1.01)' : 'scale(1)',
              ...(variant !== 'default' && {
                background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, 
                  rgba(142, 165, 154, 0.1) 0%, 
                  rgba(142, 165, 154, 0.05) 40%, 
                  transparent 70%
                )`,
              }),
            }}
            onMouseMove={(e) => handleMouseMove(item.id, e)}
          >
            <button
              onClick={() => !isDisabled && toggleItem(item.id)}
              disabled={isDisabled}
              className={`
                w-full text-left flex items-center justify-between
                ${paddingClasses[size]}
                ${sizeClasses[size]}
                font-medium text-stone-800
                transition-all duration-300
                ${!isDisabled && 'hover:text-sage-700 focus:text-sage-700 focus:outline-none'}
                ${isDisabled && 'cursor-not-allowed'}
                relative overflow-hidden
              `}
              style={{
                background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, 
                  rgba(255, 255, 255, 0.3) 0%, 
                  rgba(255, 255, 255, 0.1) 30%, 
                  transparent 60%
                )`,
              }}
            >
              <span className="relative z-10">{item.title}</span>
              <div className="relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center bg-sage-500/20 transition-all duration-500 ${
                    isOpen ? 'rotate-180 bg-sage-500/30' : ''
                  }`}
                  style={{
                    transform: `rotate(${isOpen ? 180 : 0}deg) scale(${isOpen ? 1.1 : 1})`,
                    borderRadius: isOpen ? '12px' : '50%',
                  }}
                >
                  <svg
                    className="w-4 h-4 text-sage-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </button>
            
            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
              style={{
                transform: isOpen ? 'scaleY(1)' : 'scaleY(0.95)',
                transformOrigin: 'top',
              }}
            >
              <div 
                className={`${paddingClasses[size]} pt-2 text-stone-600 ${sizeClasses[size]}`}
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(142, 165, 154, 0.03) 0%, 
                    rgba(142, 165, 154, 0.01) 50%, 
                    transparent 100%
                  )`,
                }}
              >
                {item.content}
              </div>
            </div>
            
            {/* Liquid shimmer effect */}
            {isOpen && (
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background: `linear-gradient(45deg, 
                    transparent 30%, 
                    rgba(142, 165, 154, 0.3) 50%, 
                    transparent 70%
                  )`,
                  transform: 'translateX(-100%)',
                  animation: 'liquid-shimmer 3s ease-in-out infinite',
                }}
              />
            )}
          </div>
        )
      })}
      
      <style>{`
        @keyframes liquid-shimmer {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  )
} 