import React, { useState, useRef } from 'react'

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  label?: string
  placeholder?: string
  value?: string
  defaultValue?: string
  disabled?: boolean
  required?: boolean
  error?: string
  success?: string
  helperText?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  placeholder,
  value,
  defaultValue,
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
  const [internalValue, setInternalValue] = useState(defaultValue || '')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const currentValue = value !== undefined ? value : internalValue

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
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
      input: 'px-3 py-2 text-sm',
      label: 'text-sm',
      helper: 'text-xs'
    },
    md: {
      input: 'px-4 py-3 text-base',
      label: 'text-base',
      helper: 'text-sm'
    },
    lg: {
      input: 'px-5 py-4 text-lg',
      label: 'text-lg',
      helper: 'text-base'
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
        boxShadow: isFocused ? `0 0 20px rgba(220, 38, 38, 0.3)` : 'none'
      }
    }
    
    if (success) {
      return {
        backgroundColor: '#FDFBF8',
        borderColor: '#059669',
        color: '#4D5D53',
        boxShadow: isFocused ? `0 0 20px rgba(5, 150, 105, 0.3)` : 'none'
      }
    }
    
    return {
      backgroundColor: '#FDFBF8',
      borderColor: isFocused ? '#78866B' : '#F3ECE0',
      color: '#4D5D53',
      boxShadow: isFocused ? `0 0 20px rgba(120, 134, 107, 0.4)` : 'none'
    }
  }

  const getLabelColor = () => {
    if (disabled) return '#8F9779'
    if (error) return '#dc2626'
    if (success) return '#059669'
    if (isFocused) return '#78866B'
    return '#6B7A5E'
  }

  return (
    <div className={`${className}`}>
      {/* Top label */}
      {label && (
        <label
          className={`
            block mb-2 font-medium transition-all duration-300 ease-out
            ${sizes[size].label}
            ${disabled ? 'cursor-not-allowed' : 'cursor-text'}
          `}
          style={{ 
            color: getLabelColor()
          }}
          onClick={() => !disabled && inputRef.current?.focus()}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input container with liquid effects */}
      <div className="relative">
        {/* Static liquid background glow effect */}
        {isFocused && !disabled && !error && !success && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(circle at 30% 40%, rgba(120, 134, 107, 0.12) 0%, transparent 70%)`,
              transition: 'opacity 0.5s ease-out',
              opacity: 1
            }}
          />
        )}

        {/* Input field with liquid styling */}
        <input
          ref={inputRef}
          type={type}
          value={currentValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            relative w-full border-2 rounded-2xl transition-all duration-500 ease-out
            focus:outline-none
            ${sizes[size].input}
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
          style={{
            ...getStateStyles(),
            borderRadius: '16px',
            transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
          } as React.CSSProperties}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
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
            <p style={{ color: '#6B7A5E' }}>{helperText}</p>
          )}
        </div>
      )}
    </div>
  )
} 