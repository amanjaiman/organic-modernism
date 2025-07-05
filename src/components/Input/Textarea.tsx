import React, { useState, useRef, useEffect } from 'react'

export interface TextareaProps {
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
  rows?: number
  maxLength?: number
  showCharacterCount?: boolean
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const Textarea: React.FC<TextareaProps> = ({
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
  rows = 4,
  maxLength,
  showCharacterCount = false,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '')
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const currentValue = value !== undefined ? value : internalValue
  const characterCount = currentValue.length
  const isNearLimit = maxLength && characterCount > maxLength * 0.8

  // Auto-resize functionality
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [currentValue])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (maxLength && newValue.length > maxLength) {
      return // Don't allow input beyond max length
    }
    
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
      textarea: 'px-3 py-2 text-sm',
      label: 'text-sm',
      helper: 'text-xs'
    },
    md: {
      textarea: 'px-4 py-3 text-base',
      label: 'text-base',
      helper: 'text-sm'
    },
    lg: {
      textarea: 'px-5 py-4 text-lg',
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
          onClick={() => !disabled && textareaRef.current?.focus()}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Textarea container with liquid effects */}
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

        {/* Textarea field with liquid styling */}
        <textarea
          ref={textareaRef}
          value={currentValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={rows}
          className={`
            relative w-full border-2 rounded-2xl transition-all duration-500 ease-out
            focus:outline-none resize-none
            ${sizes[size].textarea}
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
          style={{
            ...getStateStyles(),
            borderRadius: '16px',
            transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
            minHeight: `${rows * 1.5}rem`
          } as React.CSSProperties}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </div>

      {/* Character count and helper text */}
      <div className="flex justify-between items-start mt-2">
        <div className={`${sizes[size].helper}`}>
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
        
        {/* Character counter with morphing animation */}
        {showCharacterCount && maxLength && (
          <div className="flex items-center gap-1">
            <span
              className={`
                ${sizes[size].helper} font-medium transition-all duration-300
                ${isNearLimit ? 'animate-pulse' : ''}
              `}
              style={{
                color: isNearLimit ? '#dc2626' : '#6B7A5E',
                transform: isNearLimit ? 'scale(1.1)' : 'scale(1)'
              }}
            >
              {characterCount}
            </span>
            <span className={`${sizes[size].helper}`} style={{ color: '#8F9779' }}>
              / {maxLength}
            </span>
          </div>
        )}
      </div>
    </div>
  )
} 