import React, { useState } from 'react'

export interface CheckboxProps {
  label?: string
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  required?: boolean
  error?: string
  success?: string
  helperText?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onChange?: (checked: boolean) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  defaultChecked = false,
  disabled = false,
  required = false,
  error,
  success,
  helperText,
  size = 'md',
  className = '',
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const [isFocused, setIsFocused] = useState(false)

  const currentChecked = checked !== undefined ? checked : internalChecked

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked
    if (checked === undefined) {
      setInternalChecked(newChecked)
    }
    onChange?.(newChecked)
  }

  const handleFocus = () => {
    setIsFocused(true)
    onFocus?.()
  }

  const handleBlur = () => {
    setIsFocused(false)
    onBlur?.()
  }

  const sizes = {
    sm: {
      checkbox: 'w-4 h-4',
      label: 'text-sm',
      helper: 'text-xs',
      gap: 'gap-2',
      helperOffset: 'ml-6' // 16px (checkbox) + 8px (gap) = 24px
    },
    md: {
      checkbox: 'w-5 h-5',
      label: 'text-base',
      helper: 'text-sm',
      gap: 'gap-3',
      helperOffset: 'ml-8' // 20px (checkbox) + 12px (gap) = 32px
    },
    lg: {
      checkbox: 'w-6 h-6',
      label: 'text-lg',
      helper: 'text-base',
      gap: 'gap-4',
      helperOffset: 'ml-10' // 24px (checkbox) + 16px (gap) = 40px
    }
  }

  const getCheckboxStyles = () => {
    if (disabled) {
      return {
        backgroundColor: currentChecked ? '#E8ECDE' : '#F4F6F2',
        borderColor: '#E8ECDE',
        cursor: 'not-allowed'
      }
    }
    
    if (error) {
      return {
        backgroundColor: currentChecked ? '#78866B' : '#FDFBF8',
        borderColor: '#dc2626',
        boxShadow: isFocused ? `0 0 0 3px rgba(220, 38, 38, 0.1)` : 'none'
      }
    }
    
    if (success) {
      return {
        backgroundColor: currentChecked ? '#78866B' : '#FDFBF8',
        borderColor: '#059669',
        boxShadow: isFocused ? `0 0 0 3px rgba(5, 150, 105, 0.1)` : 'none'
      }
    }
    
    return {
      backgroundColor: currentChecked ? '#78866B' : '#FDFBF8',
      borderColor: currentChecked ? '#78866B' : (isFocused ? '#78866B' : '#F3ECE0'),
      boxShadow: isFocused ? `0 0 0 3px rgba(120, 134, 107, 0.1)` : 'none'
    }
  }

  const getLabelColor = () => {
    if (disabled) return '#8F9779'
    if (error) return '#dc2626'
    if (success) return '#059669'
    return '#4D5D53'
  }

  return (
    <div className={`${className}`}>
      <label
        className={`
          inline-flex items-center cursor-pointer transition-all duration-300 ease-out
          ${sizes[size].gap}
          ${disabled ? 'cursor-not-allowed' : ''}
        `}
      >
        {/* Hidden native checkbox */}
        <input
          type="checkbox"
          checked={currentChecked}
          disabled={disabled}
          required={required}
          className="sr-only"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {/* Custom checkbox */}
        <div className="relative flex-shrink-0">
          {/* Liquid glow effect */}
          {isFocused && !disabled && !error && !success && (
            <div
              className="absolute inset-0 pointer-events-none rounded"
              style={{
                background: `radial-gradient(circle at 50% 50%, rgba(120, 134, 107, 0.15) 0%, transparent 70%)`,
                transition: 'opacity 0.3s ease-out',
                opacity: 1,
                transform: 'scale(1.8)'
              }}
            />
          )}

          <div
            className={`
              relative flex items-center justify-center border-2 rounded transition-colors duration-300 ease-out
              ${sizes[size].checkbox}
              ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
            style={{
              ...getCheckboxStyles(),
              minWidth: sizes[size].checkbox.includes('w-4') ? '16px' : sizes[size].checkbox.includes('w-5') ? '20px' : '24px',
              minHeight: sizes[size].checkbox.includes('h-4') ? '16px' : sizes[size].checkbox.includes('h-5') ? '20px' : '24px',
              transition: 'background-color 0.3s ease-out, border-color 0.3s ease-out, box-shadow 0.3s ease-out'
            } as React.CSSProperties}
          >
            {/* Checkmark - always present but invisible when unchecked */}
            <svg
              className="w-3 h-3 text-white transition-opacity duration-200 ease-out"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{
                strokeWidth: 3,
                opacity: currentChecked ? 1 : 0
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Label */}
        {label && (
          <span
            className={`
              font-medium transition-all duration-300 ease-out
              ${sizes[size].label}
              ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
            style={{ 
              color: getLabelColor()
            }}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
        )}
      </label>

      {/* Helper text, error, or success message */}
      {(helperText || error || success) && (
        <div className={`mt-2 ${sizes[size].helperOffset} ${sizes[size].helper}`}>
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
