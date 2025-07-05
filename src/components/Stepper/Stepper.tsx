import React from 'react'

interface StepperStep {
  id: string
  title: string
  description?: string
  completed?: boolean
  disabled?: boolean
  icon?: React.ReactNode
}

interface StepperProps {
  steps: StepperStep[]
  currentStep: number
  orientation?: 'horizontal' | 'vertical'
  variant?: 'default' | 'numbered' | 'dots' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  clickable?: boolean
  showDescription?: boolean
  className?: string
  onStepClick?: (stepIndex: number) => void
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  orientation = 'horizontal',
  variant = 'default',
  size = 'md',
  clickable = false,
  showDescription = true,
  className = '',
  onStepClick,
}) => {
  const stepSizes = {
    sm: {
      circle: 'w-6 h-6 text-xs',
      text: 'text-xs',
      line: 'h-0.5',
    },
    md: {
      circle: 'w-8 h-8 text-sm',
      text: 'text-sm',
      line: 'h-0.5',
    },
    lg: {
      circle: 'w-10 h-10 text-base',
      text: 'text-base',
      line: 'h-1',
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
      flex items-center justify-center rounded-full border-2 transition-all duration-300
      ${stepSizes[size].circle}
      ${clickable && !isDisabled ? 'cursor-pointer hover:scale-110' : ''}
      ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
    `
    
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-sage-500 border-sage-500 text-white`
      case 'current':
        return `${baseClasses} bg-sage-100 border-sage-500 text-sage-700`
      case 'future':
        return `${baseClasses} bg-white border-stone-300 text-stone-500`
      default:
        return baseClasses
    }
  }

  const getLineClasses = (stepIndex: number) => {
    const isCompleted = getStepStatus(stepIndex) === 'completed'
    return `
      ${stepSizes[size].line}
      ${orientation === 'horizontal' ? 'flex-1' : 'w-0.5 flex-1'}
      ${isCompleted ? 'bg-sage-500' : 'bg-stone-300'}
      transition-colors duration-300
    `
  }

  const handleStepClick = (stepIndex: number) => {
    if (clickable && !steps[stepIndex].disabled) {
      onStepClick?.(stepIndex)
    }
  }

  const renderStepContent = (step: StepperStep, stepIndex: number) => {
    const status = getStepStatus(stepIndex)
    
    if (variant === 'icon' && step.icon) {
      return step.icon
    }
    
    if (variant === 'numbered' || variant === 'default') {
      if (status === 'completed') {
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )
      }
      return stepIndex + 1
    }
    
    if (variant === 'dots') {
      return (
        <div className={`w-2 h-2 rounded-full ${
          status === 'completed' || status === 'current' ? 'bg-current' : 'bg-stone-400'
        }`} />
      )
    }
    
    return stepIndex + 1
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
              </div>
              {index < steps.length - 1 && (
                <div className={`mt-2 mb-2 ${getLineClasses(index)}`} />
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
            <div className={`mx-4 ${getLineClasses(index)}`} />
          )}
        </div>
      ))}
    </div>
  )
}

// Utility function for creating stepper steps
export const createStepperStep = (
  id: string,
  title: string,
  description?: string,
  completed?: boolean,
  disabled?: boolean,
  icon?: React.ReactNode
): StepperStep => ({
  id,
  title,
  description,
  completed,
  disabled,
  icon,
}) 