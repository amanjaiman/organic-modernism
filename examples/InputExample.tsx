import React, { useState } from 'react'
import { Input, LiquidInput, RippleInput, Textarea } from '../src/components'

export const InputExample: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [liquidValue, setLiquidValue] = useState('')
  const [rippleValue, setRippleValue] = useState('')
  const [message, setMessage] = useState('')
  const [validationState, setValidationState] = useState<'none' | 'error' | 'success'>('none')

  const handleValidation = () => {
    if (rippleValue.length < 3) {
      setValidationState('error')
    } else {
      setValidationState('success')
    }
  }

  return (
    <div className="p-8 space-y-12 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-semibold mb-2" style={{ color: '#4D5D53' }}>
          Input Components
        </h2>
        <p className="text-lg mb-8" style={{ color: '#6B7A5E' }}>
          Phase 2 of our design system: Core Input Components with unique interactions
        </p>
      </div>

      {/* Basic Input Examples */}
      <div className="space-y-8">
        <h3 className="text-2xl font-semibold" style={{ color: '#4D5D53' }}>
          Basic Input Component
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>Standard Variations</h4>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="Enter your email"
              helperText="We'll never share your email"
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              required
              helperText="Must be at least 8 characters"
            />
            <Input
              label="Phone"
              type="tel"
              placeholder="(555) 123-4567"
              helperText="US phone number format"
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>States & Sizes</h4>
            <Input
              label="Small Input"
              size="sm"
              placeholder="Small size"
            />
            <Input
              label="Large Input"
              size="lg"
              placeholder="Large size"
            />
            <Input
              label="Error State"
              error="This field is required"
              placeholder="Enter value"
            />
            <Input
              label="Success State"
              success="Valid input!"
              placeholder="Enter value"
              defaultValue="Valid value"
            />
            <Input
              label="Disabled Input"
              disabled
              placeholder="Cannot edit"
            />
          </div>
        </div>
      </div>

      {/* Liquid Input */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold" style={{ color: '#4D5D53' }}>
          Liquid Input - Morphing Focus Effects
        </h3>
        <div className="p-6 rounded-3xl border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <div className="grid md:grid-cols-2 gap-6">
            <LiquidInput
              label="Liquid Email"
              type="email"
              value={liquidValue}
              onChange={setLiquidValue}
              placeholder="Watch the field morph as you focus"
              helperText="Focus to see the liquid morphing animation"
            />
            <LiquidInput
              label="Liquid Password"
              type="password"
              placeholder="Organic border animation"
              helperText="The field breathes and morphs organically"
            />
          </div>
          <div className="mt-6 text-center">
            <p style={{ color: '#6B7A5E' }}>
              <strong>Focus on the inputs above</strong> to experience the liquid morphing effects with organic border radius changes and glowing animations.
            </p>
          </div>
        </div>
      </div>

      {/* Ripple Input */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold" style={{ color: '#4D5D53' }}>
          Ripple Input - Validation Feedback
        </h3>
        <div className="p-6 rounded-3xl border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <div className="grid md:grid-cols-2 gap-6">
            <RippleInput
              label="Username"
              value={rippleValue}
              onChange={setRippleValue}
              placeholder="Type at least 3 characters"
              error={validationState === 'error' ? 'Username too short' : undefined}
              success={validationState === 'success' ? 'Username is valid!' : undefined}
              helperText="Ripples appear when validation changes"
            />
            <div className="flex items-center">
              <button
                onClick={handleValidation}
                className="px-6 py-3 rounded-2xl font-medium transition-all duration-300"
                style={{
                  backgroundColor: '#78866B',
                  color: 'white',
                  transform: 'hover:scale(1.02)'
                }}
              >
                Validate Input
              </button>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p style={{ color: '#6B7A5E' }}>
              <strong>Type in the username field and click validate</strong> to see ripples emanate from the input when validation states change.
            </p>
          </div>
        </div>
      </div>

      {/* Textarea */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold" style={{ color: '#4D5D53' }}>
          Textarea - Auto-resize & Character Counter
        </h3>
        <div className="p-6 rounded-3xl border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <div className="grid md:grid-cols-2 gap-6">
            <Textarea
              label="Message"
              value={message}
              onChange={setMessage}
              placeholder="Type your message here..."
              helperText="This textarea auto-resizes as you type"
              maxLength={200}
              showCharacterCount={true}
            />
            <Textarea
              label="Feedback"
              placeholder="Share your thoughts..."
              helperText="Character counter morphs when approaching limit"
              maxLength={100}
              showCharacterCount={true}
              rows={4}
            />
          </div>
          <div className="mt-6 text-center">
            <p style={{ color: '#6B7A5E' }}>
              <strong>Type in the textareas above</strong> to see auto-resizing and morphing character counters. The counter pulses when you approach the limit.
            </p>
          </div>
        </div>
      </div>

      {/* Form Example */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold" style={{ color: '#4D5D53' }}>
          Complete Form Example
        </h3>
        <div className="p-8 rounded-3xl border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                required
                placeholder="Enter your first name"
              />
              <Input
                label="Last Name"
                required
                placeholder="Enter your last name"
              />
            </div>
            
            <LiquidInput
              label="Email Address"
              type="email"
              required
              placeholder="your@email.com"
              helperText="We'll use this for account notifications"
            />
            
            <RippleInput
              label="Company"
              placeholder="Your company name"
              helperText="Optional - for business accounts"
            />
            
            <Textarea
              label="Tell us about your project"
              placeholder="Describe what you're building..."
              helperText="Help us understand your needs"
              maxLength={500}
              showCharacterCount={true}
            />
            
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="px-8 py-3 rounded-2xl font-medium transition-all duration-300"
                style={{
                  backgroundColor: '#78866B',
                  color: 'white'
                }}
              >
                Submit Form
              </button>
              <button
                type="button"
                className="px-8 py-3 rounded-2xl font-medium transition-all duration-300"
                style={{
                  backgroundColor: '#F8F2E6',
                  color: '#4D5D53',
                  border: '1px solid #F3ECE0'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Design Philosophy */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold" style={{ color: '#4D5D53' }}>
          Design Philosophy
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center" style={{ backgroundColor: '#78866B' }}>
              <span className="text-white font-bold text-lg">✨</span>
            </div>
            <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>Liquid Transitions</h4>
            <p style={{ color: '#6B7A5E' }}>Focus states that morph and breathe organically, creating a tactile feeling.</p>
          </div>
          
          <div className="p-6 rounded-3xl border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center" style={{ backgroundColor: '#8F9779' }}>
              <span className="text-white font-bold text-lg">🌊</span>
            </div>
            <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>Ripple Feedback</h4>
            <p style={{ color: '#6B7A5E' }}>Validation states trigger organic ripples that grow from the input center.</p>
          </div>
          
          <div className="p-6 rounded-3xl border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center" style={{ backgroundColor: '#ACBAA1' }}>
              <span style={{ color: '#4D5D53' }} className="font-bold text-lg">📏</span>
            </div>
            <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>Morphing Elements</h4>
            <p style={{ color: '#6B7A5E' }}>Character counters and auto-resize features that adapt naturally to content.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputExample 