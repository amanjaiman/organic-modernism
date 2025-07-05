import React from 'react'
import { Button, LiquidButton, PressureButton } from '../src/components'

export const ButtonExample: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#4D5D53' }}>
          Button Component Examples
        </h2>
        
        {/* Basic Button variants */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium" style={{ color: '#4D5D53' }}>
            Basic Button Variants
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="accent">Accent</Button>
          </div>
        </div>

        {/* Button sizes */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium" style={{ color: '#4D5D53' }}>
            Button Sizes
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        {/* Interactive examples */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium" style={{ color: '#4D5D53' }}>
            Interactive Examples
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="primary" 
              onClick={() => alert('Standard button clicked!')}
            >
              Click Me
            </Button>
            <LiquidButton onClick={() => alert('Liquid button clicked!')}>
              Liquid Button
            </LiquidButton>
            <PressureButton 
              onPressComplete={() => alert('Hold completed!')}
              duration={2000}
            >
              Hold Me
            </PressureButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ButtonExample 