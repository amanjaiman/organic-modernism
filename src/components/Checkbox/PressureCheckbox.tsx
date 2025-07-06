import React, { useState, useRef, useEffect } from 'react'

export interface PressureCheckboxProps {
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
  holdDuration?: number // Duration in milliseconds to hold for completion
  onChange?: (checked: boolean) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const PressureCheckbox: React.FC<PressureCheckboxProps> = ({
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
  holdDuration = 800,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const [isFocused, setIsFocused] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isCompleting, setIsCompleting] = useState(false)
  
  const timeoutRef = useRef<number | null>(null)
  const intervalRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)

  const currentChecked = checked !== undefined ? checked : internalChecked

  const startHold = () => {
    if (disabled || isCompleting) return
    
    setIsPressed(true)
    setProgress(0)
    startTimeRef.current = Date.now()
    
    // Progress interval
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      const newProgress = Math.min((elapsed / holdDuration) * 100, 100)
      setProgress(newProgress)
      
      if (newProgress >= 100) {
        completeToggle()
      }
    }, 16) // ~60fps
  }

  const endHold = () => {
    setIsPressed(false)
    setProgress(0)
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const completeToggle = () => {
    setIsCompleting(true)
    endHold()
    
    const newChecked = !currentChecked
    if (checked === undefined) {
      setInternalChecked(newChecked)
    }
    onChange?.(newChecked)
    
    // Reset completion state
    setTimeout(() => {
      setIsCompleting(false)
    }, 300)
  }

  const handleFocus = () => {
    setIsFocused(true)
    onFocus?.()
  }

  const handleBlur = () => {
    setIsFocused(false)
    endHold()
    onBlur?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      if (!isPressed) {
        startHold()
      }
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      endHold()
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

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
      boxShadow: isFocused ? `0 0 0 3px rgba(120, 134, 107, 0.1)` : 'none',
      transform: isPressed ? 'scale(0.95)' : 'scale(1)'
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
        {/* Hidden native checkbox for accessibility */}
        <input
          type="checkbox"
          checked={currentChecked}
          disabled={disabled}
          required={required}
          className="sr-only"
          onChange={() => {}} // Controlled by pressure interaction
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          {...props}
        />

        {/* Custom pressure checkbox */}
        <div className="relative flex-shrink-0">
          {/* Liquid glow effect */}
          {(isFocused || isPressed) && !disabled && !error && !success && (
            <div
              className="absolute inset-0 pointer-events-none rounded"
              style={{
                background: `radial-gradient(circle at 50% 50%, rgba(120, 134, 107, ${isPressed ? 0.25 : 0.15}) 0%, transparent 70%)`,
                transition: 'opacity 0.3s ease-out',
                opacity: 1,
                transform: 'scale(1.8)'
              }}
            />
          )}

          <div
            className={`
              relative flex items-center justify-center border-2 rounded transition-colors duration-300 ease-out overflow-hidden
              ${sizes[size].checkbox}
              ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
            style={{
              ...getCheckboxStyles(),
              minWidth: sizes[size].checkbox.includes('w-4') ? '16px' : sizes[size].checkbox.includes('w-5') ? '20px' : '24px',
              minHeight: sizes[size].checkbox.includes('h-4') ? '16px' : sizes[size].checkbox.includes('h-5') ? '20px' : '24px',
              transition: 'background-color 0.3s ease-out, border-color 0.3s ease-out, box-shadow 0.3s ease-out'
            } as React.CSSProperties}
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
          >
            {/* Progress fill */}
            {isPressed && (
              <div
                className="absolute inset-0 transition-all duration-75 ease-out"
                style={{
                  background: `linear-gradient(135deg, rgba(120, 134, 107, 0.3) 0%, rgba(143, 151, 121, 0.3) 100%)`,
                  clipPath: `circle(${progress}% at 50% 50%)`,
                  borderRadius: '6px'
                }}
              />
            )}

            {/* Checkmark - always present but invisible when unchecked */}
            <svg
              className="relative z-10 w-3 h-3 text-white transition-opacity duration-200 ease-out"
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

            {/* Progress indicator for unchecked state */}
            {!currentChecked && isPressed && (
              <div
                className="relative z-10 w-2 h-2 rounded-full transition-all duration-75 ease-out"
                style={{
                  backgroundColor: '#78866B',
                  transform: `scale(${progress / 100})`,
                  opacity: progress / 100
                }}
              />
            )}
          </div>

          {/* Progress ring */}
          {isPressed && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: '8px',
                background: `conic-gradient(from 0deg, rgba(120, 134, 107, 0.6) 0deg, rgba(120, 134, 107, 0.6) ${(progress / 100) * 360}deg, transparent ${(progress / 100) * 360}deg)`,
                mask: 'radial-gradient(circle, transparent 60%, black 65%)',
                WebkitMask: 'radial-gradient(circle, transparent 60%, black 65%)'
              }}
            />
          )}
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
              {!disabled && (
                <span className="block text-xs opacity-75 mt-1">
                  Hold to {currentChecked ? 'uncheck' : 'check'}
                </span>
              )}
            </p>
          )}
        </div>
      )}


    </div>
  )
} 
