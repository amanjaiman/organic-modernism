import React, { useState } from 'react'

interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
  disabled?: boolean
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  defaultOpen?: string[]
  variant?: 'default' | 'bordered' | 'filled' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onToggle?: (id: string, isOpen: boolean) => void
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
  variant = 'default',
  size = 'md',
  className = '',
  onToggle,
}) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen)

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

  const variantClasses = {
    default: 'border-b border-stone-200',
    bordered: 'border border-stone-200 rounded-lg mb-2',
    filled: 'bg-stone-50 border border-stone-200 rounded-lg mb-2',
    ghost: 'hover:bg-stone-50 rounded-lg mb-1',
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

        return (
          <div 
            key={item.id} 
            className={`${variantClasses[variant]} ${isDisabled ? 'opacity-50' : ''}`}
          >
            <button
              onClick={() => !isDisabled && toggleItem(item.id)}
              disabled={isDisabled}
              className={`
                w-full text-left flex items-center justify-between
                ${paddingClasses[size]}
                ${sizeClasses[size]}
                font-medium text-stone-800
                transition-colors duration-200
                ${!isDisabled && 'hover:text-sage-700 focus:text-sage-700 focus:outline-none'}
                ${isDisabled && 'cursor-not-allowed'}
              `}
            >
              <span>{item.title}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
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
            </button>
            
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className={`${paddingClasses[size]} pt-0 text-stone-600 ${sizeClasses[size]}`}>
                {item.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Utility function for creating accordion items
export const createAccordionItem = (
  id: string,
  title: string,
  content: React.ReactNode,
  disabled?: boolean
): AccordionItem => ({
  id,
  title,
  content,
  disabled,
}) 