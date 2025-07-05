import React, { useState } from 'react'
import { Checkbox, PressureCheckbox, Radio, RadioOption } from '../src/components'

const CheckboxRadioExample: React.FC = () => {
  const [checkboxValues, setCheckboxValues] = useState({
    terms: false,
    newsletter: false,
    updates: false,
    marketing: false
  })
  
  const [pressureValues, setPressureValues] = useState({
    important: false,
    confirm: false,
    delete: false
  })
  
  const [radioValue, setRadioValue] = useState('')
  const [planValue, setPlanValue] = useState('')
  const [themeValue, setThemeValue] = useState('')

  const handleCheckboxChange = (key: keyof typeof checkboxValues) => (checked: boolean) => {
    setCheckboxValues(prev => ({ ...prev, [key]: checked }))
  }

  const handlePressureChange = (key: keyof typeof pressureValues) => (checked: boolean) => {
    setPressureValues(prev => ({ ...prev, [key]: checked }))
  }

  const experienceOptions: RadioOption[] = [
    { value: 'beginner', label: 'Beginner (0-1 years)' },
    { value: 'intermediate', label: 'Intermediate (1-3 years)' },
    { value: 'advanced', label: 'Advanced (3-5 years)' },
    { value: 'expert', label: 'Expert (5+ years)' },
  ]

  const planOptions: RadioOption[] = [
    { value: 'free', label: 'Free Plan' },
    { value: 'pro', label: 'Pro Plan ($9/month)' },
    { value: 'enterprise', label: 'Enterprise Plan ($29/month)' },
    { value: 'custom', label: 'Custom Plan', disabled: true },
  ]

  const themeOptions: RadioOption[] = [
    { value: 'light', label: 'Light Theme' },
    { value: 'dark', label: 'Dark Theme' },
    { value: 'auto', label: 'Auto (System)' },
  ]

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#4D5D53' }}>
          Checkbox & Radio Components
        </h1>
        <p className="text-lg" style={{ color: '#6B7A5E' }}>
          Form selection components with organic modernism design and unique interactions
        </p>
      </div>

      {/* Standard Checkbox Examples */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
          Standard Checkboxes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Checkbox
              label="I agree to the terms and conditions"
              checked={checkboxValues.terms}
              onChange={handleCheckboxChange('terms')}
              required
              helperText="You must agree to continue"
            />
            
            <Checkbox
              label="Subscribe to newsletter"
              checked={checkboxValues.newsletter}
              onChange={handleCheckboxChange('newsletter')}
              helperText="Get weekly updates about new features"
            />
            
            <Checkbox
              label="Enable notifications"
              checked={checkboxValues.updates}
              onChange={handleCheckboxChange('updates')}
              size="sm"
              helperText="Small size checkbox"
            />
            
            <Checkbox
              label="Large checkbox example"
              checked={checkboxValues.marketing}
              onChange={handleCheckboxChange('marketing')}
              size="lg"
            />
          </div>
          
          <div className="space-y-6">
            <Checkbox
              label="Checkbox with error"
              error="This field is required"
              helperText="Please check this box"
            />
            
            <Checkbox
              label="Checkbox with success"
              success="Verified successfully"
              defaultChecked
              helperText="This option is validated"
            />
            
            <Checkbox
              label="Disabled checkbox"
              disabled
              helperText="This checkbox is disabled"
            />
            
            <Checkbox
              label="Disabled & checked"
              disabled
              defaultChecked
              helperText="This checkbox is disabled and checked"
            />
          </div>
        </div>
      </section>

      {/* Pressure Checkbox Examples */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
          Pressure Checkboxes
          <span className="text-sm font-normal ml-2" style={{ color: '#6B7A5E' }}>
            (Hold to complete)
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <PressureCheckbox
              label="Important decision"
              checked={pressureValues.important}
              onChange={handlePressureChange('important')}
              helperText="Hold to confirm this important choice"
              holdDuration={1000}
            />
            
            <PressureCheckbox
              label="Confirm action"
              checked={pressureValues.confirm}
              onChange={handlePressureChange('confirm')}
              helperText="Quick confirmation (0.5s hold)"
              holdDuration={500}
            />
            
            <PressureCheckbox
              label="Delete confirmation"
              checked={pressureValues.delete}
              onChange={handlePressureChange('delete')}
              helperText="Long hold required for safety (1.5s)"
              holdDuration={1500}
              size="lg"
            />
          </div>
          
          <div className="space-y-6">
            <PressureCheckbox
              label="Pressure with error"
              error="Please confirm by holding"
              helperText="Hold to acknowledge the error"
            />
            
            <PressureCheckbox
              label="Small pressure checkbox"
              size="sm"
              helperText="Small size with pressure feedback"
            />
            
            <PressureCheckbox
              label="Disabled pressure checkbox"
              disabled
              helperText="This pressure checkbox is disabled"
            />
          </div>
        </div>
      </section>

      {/* Radio Examples */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
          Radio Button Groups
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Radio
              name="experience"
              options={experienceOptions}
              value={radioValue}
              onChange={setRadioValue}
              helperText="Select your experience level"
            />
            
            <Radio
              name="plan"
              options={planOptions}
              value={planValue}
              onChange={setPlanValue}
              size="sm"
              helperText="Choose your subscription plan"
            />
          </div>
          
          <div className="space-y-8">
            <Radio
              name="theme"
              options={themeOptions}
              value={themeValue}
              onChange={setThemeValue}
              size="lg"
              helperText="Select your preferred theme"
            />
            
            <Radio
              name="error-example"
              options={experienceOptions.slice(0, 2)}
              error="Please select an option"
              helperText="This radio group has an error"
            />
            
            <Radio
              name="success-example"
              options={experienceOptions.slice(0, 2)}
              success="Great choice!"
              defaultValue="intermediate"
              helperText="This radio group shows success"
            />
          </div>
        </div>
      </section>

      {/* Selected Values Display */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
          Selected Values
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl" style={{ backgroundColor: '#F4F6F2' }}>
            <h3 className="font-semibold mb-3" style={{ color: '#4D5D53' }}>
              Checkbox Values:
            </h3>
            <div className="space-y-1 text-sm" style={{ color: '#6B7A5E' }}>
              <p>Terms: {checkboxValues.terms ? '✓' : '✗'}</p>
              <p>Newsletter: {checkboxValues.newsletter ? '✓' : '✗'}</p>
              <p>Updates: {checkboxValues.updates ? '✓' : '✗'}</p>
              <p>Marketing: {checkboxValues.marketing ? '✓' : '✗'}</p>
            </div>
          </div>
          
          <div className="p-6 rounded-2xl" style={{ backgroundColor: '#F4F6F2' }}>
            <h3 className="font-semibold mb-3" style={{ color: '#4D5D53' }}>
              Pressure Values:
            </h3>
            <div className="space-y-1 text-sm" style={{ color: '#6B7A5E' }}>
              <p>Important: {pressureValues.important ? '✓' : '✗'}</p>
              <p>Confirm: {pressureValues.confirm ? '✓' : '✗'}</p>
              <p>Delete: {pressureValues.delete ? '✓' : '✗'}</p>
            </div>
          </div>
          
          <div className="p-6 rounded-2xl" style={{ backgroundColor: '#F4F6F2' }}>
            <h3 className="font-semibold mb-3" style={{ color: '#4D5D53' }}>
              Radio Values:
            </h3>
            <div className="space-y-1 text-sm" style={{ color: '#6B7A5E' }}>
              <p>Experience: {radioValue || 'None'}</p>
              <p>Plan: {planValue || 'None'}</p>
              <p>Theme: {themeValue || 'None'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Disabled States */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
          Disabled States
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Radio
            name="disabled-radio"
            options={experienceOptions.slice(0, 3)}
            disabled
            helperText="This entire radio group is disabled"
          />
          
          <div className="space-y-4">
            <Checkbox
              label="Disabled unchecked"
              disabled
            />
            <Checkbox
              label="Disabled checked"
              disabled
              defaultChecked
            />
            <PressureCheckbox
              label="Disabled pressure"
              disabled
              helperText="Pressure interaction is disabled"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default CheckboxRadioExample 