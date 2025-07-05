import React, { useState } from 'react'
import { Progress, CircularProgress, LiquidProgress, RippleProgress, Accordion, LiquidAccordion, createAccordionItem, Stepper, VineStepper, createStepperStep } from '../../components'

export const Advanced: React.FC = () => {
  const [progressValue, setProgressValue] = useState(65)
  const [currentStep, setCurrentStep] = useState(1)

  const accordionItems = [
    createAccordionItem('1', 'What makes these components unique?', 
      <div className="space-y-2">
        <p>Our advanced components feature organic interaction patterns like liquid transitions, ripple effects, and vine-like connectors that create a more natural user experience.</p>
        <p>Each component is built with accessibility in mind and includes multiple variants for different use cases.</p>
      </div>
    ),
    createAccordionItem('2', 'How do I customize the animations?', 
      <div className="space-y-2">
        <p>Most components include variant props that control different animation styles. For example, the VineStepper has "organic", "flowing", and "growing" variants.</p>
        <p>You can also disable animations entirely for users who prefer reduced motion.</p>
      </div>
    ),
    createAccordionItem('3', 'Are these components performant?', 
      <div className="space-y-2">
        <p>Yes! All animations are CSS-based and use hardware acceleration. The components are optimized for smooth 60fps performance.</p>
        <p>Complex interactions like mouse tracking use efficient event handling to minimize performance impact.</p>
      </div>
    ),
  ]

  const demoSteps = [
    createStepperStep('1', 'Setup', 'Install and configure'),
    createStepperStep('2', 'Customize', 'Tailor to your needs'),
    createStepperStep('3', 'Deploy', 'Launch your application'),
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-stone-800">Advanced Components</h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
          Explore our Phase 7 components featuring progress indicators, accordions, and steppers with unique organic interaction patterns.
        </p>
      </div>

      {/* Progress Components */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-stone-800">Progress Components</h2>
          <p className="text-stone-600">Visual indicators for ongoing processes and completion states</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Standard Progress */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-stone-700">Standard Progress</h3>
            <div className="space-y-4">
              <Progress value={progressValue} label="File Upload" showValue />
              <Progress value={85} variant="success" label="Profile Complete" showValue />
              <Progress variant="warning" label="Processing..." />
            </div>
          </div>

          {/* Circular Progress */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-stone-700">Circular Progress</h3>
            <div className="flex gap-4 justify-center">
              <CircularProgress value={progressValue} size={64} showValue />
              <CircularProgress value={90} size={64} variant="success" showValue />
              <CircularProgress size={64} variant="info" />
            </div>
          </div>

          {/* Liquid Progress */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-stone-700">Liquid Progress</h3>
            <div className="space-y-4">
              <p className="text-sm text-stone-600">Hover to see liquid mouse tracking!</p>
              <LiquidProgress value={progressValue} label="Liquid Animation" showValue />
              <LiquidProgress value={75} variant="primary" label="Morphing Progress" showValue />
            </div>
          </div>

          {/* Ripple Progress */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-stone-700">Ripple Progress</h3>
            <div className="space-y-4">
              <p className="text-sm text-stone-600">Watch for organic ripples!</p>
              <RippleProgress value={progressValue} label="Ripple Effect" showValue />
              <RippleProgress variant="success" label="Processing..." />
            </div>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={() => setProgressValue(Math.random() * 100)}
            className="px-6 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors"
          >
            Randomize Progress
          </button>
        </div>
      </section>

      {/* Accordion Components */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-stone-800">Accordion Components</h2>
          <p className="text-stone-600">Expandable content sections with smooth animations</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Standard Accordion */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-stone-700">Standard Accordion</h3>
            <Accordion 
              items={accordionItems}
              variant="bordered"
              allowMultiple
              defaultOpen={['1']}
            />
          </div>

          {/* Liquid Accordion */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-stone-700">Liquid Accordion</h3>
            <p className="text-sm text-stone-600">Move your mouse over the items!</p>
            <LiquidAccordion 
              items={accordionItems}
              variant="glass"
              allowMultiple
              defaultOpen={['1']}
            />
          </div>
        </div>
      </section>

      {/* Stepper Components */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-stone-800">Stepper Components</h2>
          <p className="text-stone-600">Step-by-step progress indicators and navigation</p>
        </div>

        <div className="space-y-8">
          {/* Standard Stepper */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-stone-700">Standard Stepper</h3>
            <Stepper 
              steps={demoSteps}
              currentStep={currentStep}
              clickable
              onStepClick={setCurrentStep}
              className="mb-4"
            />
            <div className="flex gap-2 justify-center">
              <button 
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                className="px-4 py-2 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors"
                disabled={currentStep === 0}
              >
                Previous
              </button>
              <button 
                onClick={() => setCurrentStep(Math.min(demoSteps.length - 1, currentStep + 1))}
                className="px-4 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors"
                disabled={currentStep === demoSteps.length - 1}
              >
                Next
              </button>
            </div>
          </div>

          {/* Vine Stepper */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-stone-700">Vine Stepper</h3>
            <p className="text-sm text-stone-600">Watch the organic, animated vine-like connectors!</p>
            <VineStepper 
              steps={[
                createStepperStep('v1', 'Design', 'Create wireframes'),
                createStepperStep('v2', 'Build', 'Develop features'),
                createStepperStep('v3', 'Test', 'Quality assurance'),
                createStepperStep('v4', 'Launch', 'Go live'),
              ]}
              currentStep={2}
              variant="organic"
              size="lg"
            />
          </div>
        </div>
      </section>


    </div>
  )
} 