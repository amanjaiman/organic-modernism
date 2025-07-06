import React, { useState, useEffect } from 'react'

interface StepperStep {
  id: string
  title: string
  description?: string
  completed?: boolean
  disabled?: boolean
  icon?: React.ReactNode
}

interface VineStepperProps {
  steps: StepperStep[]
  currentStep: number
  orientation?: 'horizontal' | 'vertical'
  variant?: 'organic' | 'flowing' | 'growing'
  size?: 'sm' | 'md' | 'lg'
  clickable?: boolean
  showDescription?: boolean
  className?: string
  onStepClick?: (stepIndex: number) => void
}

export const VineStepper: React.FC<VineStepperProps> = ({
  steps,
  currentStep,
  orientation = 'horizontal',
  variant = 'organic',
  size = 'md',
  clickable = false,
  showDescription = true,
  className = '',
  onStepClick,
}) => {
  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationProgress(prev => (prev + 0.1) % 1)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const stepSizes = {
    sm: {
      circle: 'w-8 h-8 text-xs',
      text: 'text-xs',
      connector: 60,
    },
    md: {
      circle: 'w-10 h-10 text-sm',
      text: 'text-sm',
      connector: 80,
    },
    lg: {
      circle: 'w-12 h-12 text-base',
      text: 'text-base',
      connector: 100,
    },
  }

  const getStepStatus = (stepIndex: number) => {
    if (steps[stepIndex].completed) return 'completed'
    if (stepIndex === currentStep) return 'current'
    if (stepIndex < currentStep) return 'completed'
    return 'future'
  }

  const getStepClasses = (stepIndex: number) => {
    const status = getStepStatus(stepIndex)
    const isDisabled = steps[stepIndex].disabled
    
    const baseClasses = `
      flex items-center justify-center rounded-full border-2 transition-all duration-500
      ${stepSizes[size].circle}
      ${clickable && !isDisabled ? 'cursor-pointer hover:scale-110' : ''}
      ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
      relative overflow-hidden
    `
    
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-sage-500 border-sage-500 text-white shadow-lg`
      case 'current':
        return `${baseClasses} bg-sage-100 border-sage-500 text-sage-700 shadow-md animate-pulse`
      case 'future':
        return `${baseClasses} bg-white border-stone-300 text-stone-500`
      default:
        return baseClasses
    }
  }

  const handleStepClick = (stepIndex: number) => {
    if (clickable && !steps[stepIndex].disabled) {
      onStepClick?.(stepIndex)
    }
  }

  const renderStepContent = (step: StepperStep, stepIndex: number) => {
    const status = getStepStatus(stepIndex)
    
    if (step.icon) {
      return step.icon
    }
    
    if (status === 'completed') {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )
    }
    
    return stepIndex + 1
  }

  const generateVinePath = (index: number, isCompleted: boolean) => {
    const baseLength = stepSizes[size].connector
    const amplitude = 8 + Math.sin(animationProgress * Math.PI * 2) * 3
    const frequency = 0.02
    
    let path = `M 0 0`
    
    if (variant === 'organic') {
      // Organic curved path with natural variations
      const cp1x = baseLength * 0.3
      const cp1y = amplitude * Math.sin(animationProgress * Math.PI * 2 + index)
      const cp2x = baseLength * 0.7
      const cp2y = amplitude * Math.sin(animationProgress * Math.PI * 2 + index + 1)
      
      path = `M 0 0 C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${baseLength} 0`
    } else if (variant === 'flowing') {
      // Flowing wave pattern
      for (let x = 0; x <= baseLength; x += 5) {
        const y = amplitude * Math.sin(x * frequency + animationProgress * Math.PI * 2)
        path += ` L ${x} ${y}`
      }
    } else if (variant === 'growing') {
      // Growing vine with branches
      const branchPoints = [0.3, 0.7].map(t => t * baseLength)
      path = `M 0 0 Q ${baseLength * 0.25} ${amplitude} ${baseLength * 0.5} 0 Q ${baseLength * 0.75} ${-amplitude} ${baseLength} 0`
      
      // Add small branches
      branchPoints.forEach(x => {
        const branchY = amplitude * 0.5 * Math.sin(animationProgress * Math.PI * 4)
        path += ` M ${x} 0 L ${x + 10} ${branchY} M ${x} 0 L ${x + 10} ${-branchY}`
      })
    }
    
    return path
  }

  if (orientation === 'vertical') {
    return (
      <div className={`flex flex-col ${className}`}>
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start">
            <div className="flex flex-col items-center mr-4">
              <div
                className={getStepClasses(index)}
                onClick={() => handleStepClick(index)}
              >
                {renderStepContent(step, index)}
                {getStepStatus(index) === 'current' && (
                  <div className="absolute inset-0 rounded-full bg-sage-500/20 animate-ping" />
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className="mt-2 mb-2 relative">
                  <svg
                    width="20"
                    height={stepSizes[size].connector}
                    className="overflow-visible"
                  >
                    <path
                      d={generateVinePath(index, getStepStatus(index) === 'completed')}
                      stroke={getStepStatus(index) === 'completed' ? '#8EA59A' : '#d6d3d1'}
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={getStepStatus(index) === 'completed' ? '0' : '5,3'}
                      className="transition-all duration-500"
                      transform="rotate(90)"
                    />
                    
                    {/* Animated indicators */}
                    <circle
                      cx="10"
                      cy={animationProgress * stepSizes[size].connector}
                      r="2"
                      fill="#8EA59A"
                      opacity="0.6"
                      className={getStepStatus(index) === 'completed' ? 'animate-pulse' : 'hidden'}
                    />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="flex-1 pb-8">
              <div className={`font-medium ${stepSizes[size].text} ${
                getStepStatus(index) === 'current' ? 'text-sage-700' : 'text-stone-700'
              }`}>
                {step.title}
              </div>
              {showDescription && step.description && (
                <div className={`${stepSizes[size].text} text-stone-500 mt-1`}>
                  {step.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`flex items-center ${className}`}>
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={getStepClasses(index)}
              onClick={() => handleStepClick(index)}
            >
              {renderStepContent(step, index)}
              {getStepStatus(index) === 'current' && (
                <div className="absolute inset-0 rounded-full bg-sage-500/20 animate-ping" />
              )}
            </div>
            
            <div className={`mt-2 ${stepSizes[size].text} font-medium ${
              getStepStatus(index) === 'current' ? 'text-sage-700' : 'text-stone-700'
            }`}>
              {step.title}
            </div>
            {showDescription && step.description && (
              <div className={`${stepSizes[size].text} text-stone-500 mt-1 text-center max-w-20`}>
                {step.description}
              </div>
            )}
          </div>
          
          {index < steps.length - 1 && (
            <div className="mx-4 relative">
              <svg
                width={stepSizes[size].connector}
                height="40"
                className="overflow-visible"
              >
                <path
                  d={generateVinePath(index, getStepStatus(index) === 'completed')}
                  stroke={getStepStatus(index) === 'completed' ? '#8EA59A' : '#d6d3d1'}
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={getStepStatus(index) === 'completed' ? '0' : '5,3'}
                  className="transition-all duration-500"
                  transform="translate(0, 20)"
                />
                
                {/* Animated indicators */}
                <circle
                  cx={animationProgress * stepSizes[size].connector}
                  cy="20"
                  r="2"
                  fill="#8EA59A"
                  opacity="0.6"
                  className={getStepStatus(index) === 'completed' ? 'animate-pulse' : 'hidden'}
                />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  )
} 
