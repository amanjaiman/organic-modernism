import React, { useState, useRef, useEffect } from 'react'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface MultiSelectProps {
  label?: string
  placeholder?: string
  value?: string[]
  defaultValue?: string[]
  disabled?: boolean
  required?: boolean
  error?: string
  success?: string
  helperText?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  options: SelectOption[]
  searchable?: boolean
  maxSelections?: number
  onChange?: (values: string[]) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  placeholder = 'Select options...',
  value,
  defaultValue = [],
  disabled = false,
  required = false,
  error,
  success,
  helperText,
  size = 'md',
  className = '',
  options,
  searchable = false,
  maxSelections,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue)
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const selectRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const currentValue = value !== undefined ? value : internalValue
  const selectedOptions = options.filter(option => currentValue.includes(option.value))

  const filteredOptions = searchable
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setIsFocused(false)
        onBlur?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onBlur])

  const handleSelect = (optionValue: string) => {
    if (disabled) return
    
    let newValue: string[]
    if (currentValue.includes(optionValue)) {
      // Remove from selection
      newValue = currentValue.filter(v => v !== optionValue)
    } else {
      // Add to selection (if not at max limit)
      if (maxSelections && currentValue.length >= maxSelections) {
        return
      }
      newValue = [...currentValue, optionValue]
    }
    
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const handleRemoveTag = (optionValue: string, event: React.MouseEvent) => {
    event.stopPropagation()
    
    const newValue = currentValue.filter(v => v !== optionValue)
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const handleFocus = () => {
    if (!disabled) {
      setIsFocused(true)
      onFocus?.()
    }
  }

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
      handleFocus()
    }
  }

  const sizes = {
    sm: {
      select: 'px-3 py-2 text-sm',
      label: 'text-sm',
      helper: 'text-xs',
      dropdown: 'text-sm',
      tag: 'px-2 py-1 text-xs'
    },
    md: {
      select: 'px-4 py-3 text-base',
      label: 'text-base',
      helper: 'text-sm',
      dropdown: 'text-base',
      tag: 'px-3 py-1 text-sm'
    },
    lg: {
      select: 'px-5 py-4 text-lg',
      label: 'text-lg',
      helper: 'text-base',
      dropdown: 'text-lg',
      tag: 'px-4 py-2 text-base'
    }
  }

  const getStateStyles = () => {
    if (disabled) {
      return {
        backgroundColor: '#F4F6F2',
        borderColor: '#E8ECDE',
        color: '#8F9779',
        cursor: 'not-allowed'
      }
    }
    
    if (error) {
      return {
        backgroundColor: '#FDFBF8',
        borderColor: '#dc2626',
        color: '#4D5D53',
        boxShadow: (isFocused || isOpen) ? `0 0 20px rgba(220, 38, 38, 0.3)` : 'none'
      }
    }
    
    if (success) {
      return {
        backgroundColor: '#FDFBF8',
        borderColor: '#059669',
        color: '#4D5D53',
        boxShadow: (isFocused || isOpen) ? `0 0 20px rgba(5, 150, 105, 0.3)` : 'none'
      }
    }
    
    return {
      backgroundColor: '#FDFBF8',
      borderColor: (isFocused || isOpen) ? '#78866B' : '#F3ECE0',
      color: '#4D5D53',
      boxShadow: (isFocused || isOpen) ? `0 0 20px rgba(120, 134, 107, 0.4)` : 'none'
    }
  }

  const getLabelColor = () => {
    if (disabled) return '#8F9779'
    if (error) return '#dc2626'
    if (success) return '#059669'
    if (isFocused || isOpen) return '#78866B'
    return '#6B7A5E'
  }

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {/* Top label */}
      {label && (
        <label
          className={`
            block mb-2 font-medium transition-all duration-300 ease-out
            ${sizes[size].label}
            ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          `}
          style={{ 
            color: getLabelColor()
          }}
          onClick={() => !disabled && handleToggle()}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Select container with liquid effects */}
      <div className="relative">
        {/* Static liquid background glow effect */}
        {(isFocused || isOpen) && !disabled && !error && !success && (
          <div
            className="absolute inset-0 pointer-events-none rounded-lg"
            style={{
              background: `radial-gradient(circle at 30% 40%, rgba(120, 134, 107, 0.12) 0%, transparent 70%)`,
              transition: 'opacity 0.5s ease-out',
              opacity: 1
            }}
          />
        )}

        {/* Select trigger */}
        <div
          className={`
            relative w-full border-2 rounded-lg transition-all duration-500 ease-out
            focus:outline-none cursor-pointer flex items-center justify-between min-h-[44px]
            ${sizes[size].select}
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
          style={{
            ...getStateStyles(),
                          borderRadius: '8px',
            transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
          } as React.CSSProperties}
          onClick={handleToggle}
        >
          <div className="flex flex-wrap gap-1 flex-1">
            {selectedOptions.length > 0 ? (
              selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className={`
                    inline-flex items-center gap-1 bg-sage-100 text-sage-700 rounded-md font-medium
                    ${sizes[size].tag}
                  `}
                  style={{
                    backgroundColor: '#E8EDE4',
                    color: '#658172'
                  }}
                >
                  {option.label}
                  <button
                    onClick={(e) => handleRemoveTag(option.value, e)}
                    className="hover:bg-sage-200 rounded-full p-0.5 transition-colors"
                    style={{
                      fontSize: '0.75rem'
                    }}
                  >
                    ×
                  </button>
                </span>
              ))
            ) : (
              <span className="opacity-50">{placeholder}</span>
            )}
          </div>
          
          {/* Dropdown arrow */}
          <svg
            className={`w-5 h-5 transition-transform duration-300 ml-2 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <div
            className="absolute z-50 w-full mt-2 bg-white border-2 border-stone-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            style={{
              backgroundColor: '#FDFBF8',
              borderColor: '#F3ECE0',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Search input */}
            {searchable && (
              <div className="p-2 border-b border-stone-200">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search options..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full px-3 py-2 text-sm border border-stone-200 rounded-md focus:outline-none focus:border-sage-500 ${sizes[size].dropdown}`}
                  style={{
                    backgroundColor: '#FDFBF8',
                    borderColor: '#F3ECE0'
                  }}
                />
              </div>
            )}

            {/* Options */}
            <div className="py-1">
              {filteredOptions.length === 0 ? (
                <div className={`px-4 py-3 text-stone-500 ${sizes[size].dropdown}`}>
                  No options found
                </div>
              ) : (
                                 filteredOptions.map((option) => {
                   const isSelected = currentValue.includes(option.value)
                   const isDisabled = option.disabled || (maxSelections && !isSelected && currentValue.length >= maxSelections)
                   
                   return (
                     <div
                       key={option.value}
                       className={`
                         relative px-4 py-3 cursor-pointer transition-all duration-200 ease-out
                         ${sizes[size].dropdown}
                         ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                         ${isSelected ? 'font-medium' : ''}
                       `}
                       style={{
                         backgroundColor: isSelected ? '#F4F6F2' : undefined,
                         color: isSelected ? '#658172' : '#4D5D53',
                         borderLeft: isSelected ? '4px solid #78866B' : '4px solid transparent'
                       }}
                       onMouseEnter={(e) => {
                         if (!isDisabled && !isSelected) {
                           e.currentTarget.style.backgroundColor = '#FDFCFA'
                           e.currentTarget.style.borderLeft = '4px solid #D1DBD6'
                         }
                       }}
                       onMouseLeave={(e) => {
                         if (!isDisabled && !isSelected) {
                           e.currentTarget.style.backgroundColor = 'transparent'
                           e.currentTarget.style.borderLeft = '4px solid transparent'
                         }
                       }}
                       onClick={() => !isDisabled && handleSelect(option.value)}
                     >
                       <span>{option.label}</span>
                     </div>
                   )
                 })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Helper text, error, or success message */}
      {(helperText || error || success) && (
        <div className={`mt-2 ${sizes[size].helper}`}>
          {error && (
            <p style={{ color: '#dc2626' }} className="flex items-center gap-1">
              <span>⚠</span>
              {error}
            </p>
          )}
          {success && (
            <p style={{ color: '#059669' }} className="flex items-center gap-1">
              <span>✓</span>
              {success}
            </p>
          )}
          {helperText && !error && !success && (
            <p style={{ color: '#6B7A5E' }}>
              {helperText}
            </p>
          )}
        </div>
      )}


    </div>
  )
} 
