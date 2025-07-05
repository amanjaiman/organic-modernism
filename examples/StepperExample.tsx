import React, { useState } from 'react'
import { Stepper, VineStepper, createStepperStep } from '../src/components'

export const StepperExample: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [vineCurrentStep, setVineCurrentStep] = useState(2)

  const basicSteps = [
    createStepperStep('1', 'Account', 'Create your account'),
    createStepperStep('2', 'Profile', 'Complete your profile'),
    createStepperStep('3', 'Verification', 'Verify your email'),
    createStepperStep('4', 'Complete', 'Welcome aboard!'),
  ]

  const orderSteps = [
    createStepperStep('order1', 'Order Placed', 'Your order has been received', true),
    createStepperStep('order2', 'Processing', 'We are preparing your order', true),
    createStepperStep('order3', 'Shipped', 'Your order is on its way', true),
    createStepperStep('order4', 'Delivered', 'Enjoy your purchase'),
  ]

  const projectSteps = [
    createStepperStep('p1', 'Planning', 'Project setup and planning phase'),
    createStepperStep('p2', 'Development', 'Building the core features'),
    createStepperStep('p3', 'Testing', 'Quality assurance and testing'),
    createStepperStep('p4', 'Launch', 'Deploy to production'),
  ]

  const iconSteps = [
    createStepperStep('i1', 'Design', 'Create mockups', false, false,
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
      </svg>
    ),
    createStepperStep('i2', 'Code', 'Implement features', false, false,
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    ),
    createStepperStep('i3', 'Test', 'Quality assurance', false, false,
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    createStepperStep('i4', 'Deploy', 'Go live', false, false,
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    ),
  ]

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
  }

  const handleVineStepClick = (stepIndex: number) => {
    setVineCurrentStep(stepIndex)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold text-stone-800 mb-6">Stepper Components</h2>
      
      {/* Standard Stepper */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-stone-700">Standard Stepper</h3>
        
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-4">Horizontal Layout</h4>
            <Stepper 
              steps={basicSteps}
              currentStep={currentStep}
              clickable
              onStepClick={handleStepClick}
              className="mb-4"
            />
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                className="px-4 py-2 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors"
                disabled={currentStep === 0}
              >
                Previous
              </button>
              <button 
                onClick={() => setCurrentStep(Math.min(basicSteps.length - 1, currentStep + 1))}
                className="px-4 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors"
                disabled={currentStep === basicSteps.length - 1}
              >
                Next
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-4">Vertical Layout</h4>
            <Stepper 
              steps={basicSteps}
              currentStep={2}
              orientation="vertical"
              size="lg"
            />
          </div>
        </div>
      </section>

      {/* Stepper Variants */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-stone-700">Stepper Variants</h3>
        
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-4">Numbered Variant</h4>
            <Stepper 
              steps={projectSteps}
              currentStep={1}
              variant="numbered"
              showDescription={false}
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-4">Dots Variant</h4>
            <Stepper 
              steps={projectSteps}
              currentStep={2}
              variant="dots"
              size="sm"
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-4">Icon Variant</h4>
            <Stepper 
              steps={iconSteps}
              currentStep={1}
              variant="icon"
              size="lg"
            />
          </div>
        </div>
      </section>

      {/* Vine Stepper */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-stone-700">Vine Stepper</h3>
        <p className="text-stone-600">Watch the organic, animated vine-like connectors between steps!</p>
        
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-4">Organic Variant</h4>
            <VineStepper 
              steps={basicSteps}
              currentStep={vineCurrentStep}
              variant="organic"
              clickable
              onStepClick={handleVineStepClick}
              className="mb-4"
            />
            <div className="flex gap-2">
              <button 
                onClick={() => setVineCurrentStep(Math.max(0, vineCurrentStep - 1))}
                className="px-4 py-2 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors"
                disabled={vineCurrentStep === 0}
              >
                Previous
              </button>
              <button 
                onClick={() => setVineCurrentStep(Math.min(basicSteps.length - 1, vineCurrentStep + 1))}
                className="px-4 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors"
                disabled={vineCurrentStep === basicSteps.length - 1}
              >
                Next
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-4">Flowing Variant</h4>
            <VineStepper 
              steps={projectSteps}
              currentStep={2}
              variant="flowing"
              size="lg"
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-4">Growing Variant</h4>
            <VineStepper 
              steps={projectSteps}
              currentStep={1}
              variant="growing"
              size="md"
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-4">Vertical Vine</h4>
            <VineStepper 
              steps={basicSteps.slice(0, 3)}
              currentStep={1}
              orientation="vertical"
              variant="organic"
              size="md"
            />
          </div>
        </div>
      </section>


    </div>
  )
} 