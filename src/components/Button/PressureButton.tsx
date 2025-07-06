import React, { useState, useRef } from 'react'

export interface PressureButtonProps {
  children: React.ReactNode
  onPressComplete?: () => void
  className?: string
  duration?: number
}

export const PressureButton: React.FC<PressureButtonProps> = ({ 
  children, 
  onPressComplete, 
  className = '', 
  duration = 2000 
}) => {
  const [pressTime, setPressTime] = useState(0)
  const [isPressed, setIsPressed] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const pressInterval = useRef<number | undefined>(undefined)
  
  const handleMouseDown = () => {
    setIsPressed(true)
    setIsComplete(false)
    setPressTime(0)
    
    pressInterval.current = setInterval(() => {
      setPressTime(prev => {
        const newTime = prev + 10
        if (newTime >= duration) {
          setIsComplete(true)
          if (onPressComplete) {
            onPressComplete()
          }
          if (pressInterval.current) {
            clearInterval(pressInterval.current)
          }
        }
        return newTime
      })
    }, 10)
  }
  
  const handleMouseUp = () => {
    setIsPressed(false)
    if (pressInterval.current) {
      clearInterval(pressInterval.current)
    }
    if (!isComplete) {
      setPressTime(0)
    }
  }
  
  const progress = Math.min(pressTime / duration, 1)
  
  return (
    <button
      className={`relative px-8 py-4 rounded-2xl font-medium text-lg overflow-hidden focus:outline-none ${className}`}
      style={{
        backgroundColor: isComplete ? '#78866B' : '#BDC9BB',
        color: isComplete ? 'white' : '#4D5D53',
        transform: `scale(${isPressed ? 0.95 : 1})`,
        transition: 'all 0.2s ease-out'
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="absolute inset-0 transition-all duration-75"
        style={{
          background: `linear-gradient(to right, #78866B ${progress * 100}%, transparent ${progress * 100}%)`,
          opacity: 0.3
        }}
      />
      <span className="relative z-10">
        {isComplete ? '✓ Complete!' : `${children} (${Math.round(progress * 100)}%)`}
      </span>
    </button>
  )
} 
