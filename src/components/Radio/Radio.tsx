import React, { useState } from 'react'

export interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}

export interface RadioProps {
  name: string
  value?: string
  defaultValue?: string
  disabled?: boolean
  required?: boolean
  error?: string
  success?: string
  helperText?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  options: RadioOption[]
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const Radio: React.FC<RadioProps> = ({
  name,
  value,
  defaultValue,
  disabled = false,
  required = false,
  error,
  success,
  helperText,
  size = 'md',
  className = '',
  options,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '')
  const [focusedValue, setFocusedValue] = useState<string | null>(null)

  const currentValue = value !== undefined ? value : internalValue

  const handleChange = (optionValue: string) => {
    if (value === undefined) {
      setInternalValue(optionValue)
    }
    onChange?.(optionValue)
  }

  const handleFocus = (optionValue: string) => {
    setFocusedValue(optionValue)
    onFocus?.()
  }

  const handleBlur = () => {
    setFocusedValue(null)
    onBlur?.()
  }

  const sizes = {
    sm: {
      radio: 'w-4 h-4',
      label: 'text-sm',
      helper: 'text-xs',
      gap: 'gap-2',
      spacing: 'gap-3'
    },
    md: {
      radio: 'w-5 h-5',
      label: 'text-base',
      helper: 'text-sm',
      gap: 'gap-3',
      spacing: 'gap-4'
    },
    lg: {
      radio: 'w-6 h-6',
      label: 'text-lg',
      helper: 'text-base',
      gap: 'gap-4',
      spacing: 'gap-5'
    }
  }

  const getRadioStyles = (optionValue: string, isDisabled: boolean) => {
    const isSelected = currentValue === optionValue
    const isFocused = focusedValue === optionValue
    
    // Always include box-shadow to prevent layout shifts
    const baseBoxShadow = '0 0 0 3px transparent'
    
    if (isDisabled) {
      return {
        backgroundColor: isSelected ? '#E8ECDE' : '#F4F6F2',
        borderColor: '#E8ECDE',
        cursor: 'not-allowed',
        boxShadow: baseBoxShadow
      }
    }
    
    if (error) {
      return {
        backgroundColor: isSelected ? '#78866B' : '#FDFBF8',
        borderColor: '#dc2626',
        boxShadow: isFocused ? '0 0 0 3px rgba(220, 38, 38, 0.1)' : baseBoxShadow
      }
    }
    
    if (success) {
      return {
        backgroundColor: isSelected ? '#78866B' : '#FDFBF8',
        borderColor: '#059669',
        boxShadow: isFocused ? '0 0 0 3px rgba(5, 150, 105, 0.1)' : baseBoxShadow
      }
    }
    
    return {
      backgroundColor: isSelected ? '#78866B' : '#FDFBF8',
      borderColor: isSelected ? '#78866B' : (isFocused ? '#78866B' : '#F3ECE0'),
      boxShadow: isFocused ? '0 0 0 3px rgba(120, 134, 107, 0.1)' : baseBoxShadow
    }
  }

  const getLabelColor = (isDisabled: boolean) => {
    if (isDisabled) return '#8F9779'
    if (error) return '#dc2626'
    if (success) return '#059669'
    return '#4D5D53'
  }

  return (
    <div className={`${className}`}>
      <div className={`flex flex-col ${sizes[size].spacing}`}>
        {options.map((option) => {
          const isSelected = currentValue === option.value
          const isDisabled = disabled || option.disabled
          const isFocused = focusedValue === option.value
          
          return (
            <label
              key={option.value}
              className={`
                inline-flex items-center cursor-pointer transition-all duration-300 ease-out
                ${sizes[size].gap}
                ${isDisabled ? 'cursor-not-allowed' : ''}
              `}
            >
              {/* Hidden native radio */}
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                disabled={isDisabled}
                required={required}
                className="sr-only"
                onChange={() => !isDisabled && handleChange(option.value)}
                onFocus={() => handleFocus(option.value)}
                onBlur={handleBlur}
                {...props}
              />

              {/* Custom radio container - prevents layout shifts */}
              <div className="relative flex-shrink-0">
                {/* Glow effect container - positioned absolutely to not affect layout */}
                <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                  {isFocused && !isDisabled && !error && !success && (
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(120, 134, 107, 0.15) 0%, transparent 70%)`,
                        transition: 'opacity 0.3s ease-out',
                        opacity: 1,
                        transform: 'scale(1.8)',
                        transformOrigin: 'center'
                      }}
                    />
                  )}
                </div>

                {/* Radio button */}
                <div
                  className={`
                    relative flex items-center justify-center border-2 rounded-full transition-all duration-300 ease-out
                    ${sizes[size].radio}
                    ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                  `}
                  style={{
                    ...getRadioStyles(option.value, !!isDisabled),
                    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
                  } as React.CSSProperties}
                >
                  {/* Radio dot - optimized animation to prevent layout shifts */}
                  <div
                    className="rounded-full transition-all duration-200 ease-out"
                    style={{
                      width: size === 'sm' ? '6px' : size === 'md' ? '8px' : '10px',
                      height: size === 'sm' ? '6px' : size === 'md' ? '8px' : '10px',
                      backgroundColor: isSelected ? (isDisabled ? '#8F9779' : 'white') : 'transparent',
                      opacity: isSelected ? 1 : 0,
                      transform: isSelected ? 'scale(1)' : 'scale(0.3)',
                      transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
                    }}
                  />
                </div>
              </div>

              {/* Label */}
              <span
                className={`
                  font-medium transition-all duration-300 ease-out
                  ${sizes[size].label}
                  ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
                style={{ 
                  color: getLabelColor(!!isDisabled)
                }}
              >
                {option.label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </span>
            </label>
          )
        })}
      </div>

      {/* Helper text, error, or success message */}
      {(helperText || error || success) && (
        <div className={`mt-3 ${sizes[size].helper}`}>
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