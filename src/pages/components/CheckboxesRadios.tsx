import React from 'react'
import { Checkbox, PressureCheckbox, Radio } from '../../components'

const CheckboxesRadios: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#4D5D53' }}>
          Checkboxes & Radios
        </h1>
        <p className="text-xl max-w-2xl mx-auto" style={{ color: '#6B7A5E' }}>
          Interactive selection controls with liquid animations and tactile feedback.
        </p>
      </div>

      {/* Checkbox Component */}
      <div className="mb-16">
        <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Checkbox
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B7A5E' }}>
            Standard checkboxes with smooth liquid animations and multiple selection support.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Basic Examples</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Checkbox
                    label="Accept terms and conditions"
                    helperText="Please review our terms"
                  />
                  <Checkbox
                    label="Subscribe to newsletter"
                    helperText="Monthly updates and tips"
                  />
                  <Checkbox
                    label="Enable notifications"
                    helperText="Get notified of important updates"
                  />
                </div>
                <div className="space-y-4">
                  <Checkbox
                    label="Required option"
                    required
                    helperText="This selection is required"
                  />
                  <Checkbox
                    label="Pre-selected option"
                    defaultChecked
                    helperText="Checked by default"
                  />
                  <Checkbox
                    label="Disabled option"
                    disabled
                    helperText="Cannot be changed"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Checkbox Sizes</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <Checkbox
                    label="Small checkbox"
                    size="sm"
                    helperText="Size: sm"
                  />
                  <Checkbox
                    label="Another small"
                    size="sm"
                    defaultChecked
                  />
                </div>
                <div className="space-y-4">
                  <Checkbox
                    label="Medium checkbox"
                    size="md"
                    helperText="Size: md (default)"
                  />
                  <Checkbox
                    label="Another medium"
                    size="md"
                    defaultChecked
                  />
                </div>
                <div className="space-y-4">
                  <Checkbox
                    label="Large checkbox"
                    size="lg"
                    helperText="Size: lg"
                  />
                  <Checkbox
                    label="Another large"
                    size="lg"
                    defaultChecked
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Checkbox States</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <Checkbox
                    label="Error state"
                    error="This field is required"
                  />
                  <Checkbox
                    label="Another error"
                    error="Invalid selection"
                  />
                </div>
                <div className="space-y-4">
                  <Checkbox
                    label="Success state"
                    success="Valid selection!"
                    defaultChecked
                  />
                  <Checkbox
                    label="Another success"
                    success="Looks good!"
                    defaultChecked
                  />
                </div>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PressureCheckbox Component */}
      <div className="mb-16">
        <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Pressure Checkbox
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B7A5E' }}>
            Checkboxes requiring sustained pressure to activate, preventing accidental selections.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Pressure Duration Examples</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <PressureCheckbox
                    label="Quick confirmation (1s)"
                    holdDuration={1000}
                    helperText="Hold for 1 second"
                  />
                  <PressureCheckbox
                    label="Standard (1.5s)"
                    holdDuration={1500}
                    helperText="Hold for 1.5 seconds"
                  />
                </div>
                <div className="space-y-4">
                  <PressureCheckbox
                    label="Important decision (2s)"
                    holdDuration={2000}
                    helperText="Hold for 2 seconds"
                  />
                  <PressureCheckbox
                    label="Critical action (3s)"
                    holdDuration={3000}
                    helperText="Hold for 3 seconds"
                  />
                </div>
                <div className="space-y-4">
                  <PressureCheckbox
                    label="Delete confirmation"
                    holdDuration={2500}
                    helperText="Confirm deletion"
                  />
                  <PressureCheckbox
                    label="Permanent action"
                    holdDuration={3000}
                    helperText="Cannot be undone"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Radio Component */}
      <div className="mb-16">
        <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Radio
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B7A5E' }}>
            Radio buttons for single selection from a group of options with liquid animations.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Basic Radio Groups</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold" style={{ color: '#4D5D53' }}>Payment Method</h4>
                  <Radio
                    name="payment"
                    label="Credit Card"
                    value="credit"
                    helperText="Visa, Mastercard, Amex"
                  />
                  <Radio
                    name="payment"
                    label="PayPal"
                    value="paypal"
                    helperText="Pay with PayPal account"
                  />
                  <Radio
                    name="payment"
                    label="Bank Transfer"
                    value="bank"
                    helperText="Direct bank transfer"
                  />
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold" style={{ color: '#4D5D53' }}>Notification Preference</h4>
                  <Radio
                    name="notifications"
                    label="Email only"
                    value="email"
                    helperText="Receive email notifications"
                  />
                  <Radio
                    name="notifications"
                    label="SMS only"
                    value="sms"
                    helperText="Receive text messages"
                  />
                  <Radio
                    name="notifications"
                    label="Both email and SMS"
                    value="both"
                    helperText="All notification types"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Radio Sizes</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold" style={{ color: '#4D5D53' }}>Small Size</h4>
                  <Radio
                    name="size-sm"
                    label="Small option 1"
                    value="1"
                    size="sm"
                    helperText="Size: sm"
                  />
                  <Radio
                    name="size-sm"
                    label="Small option 2"
                    value="2"
                    size="sm"
                  />
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold" style={{ color: '#4D5D53' }}>Medium Size</h4>
                  <Radio
                    name="size-md"
                    label="Medium option 1"
                    value="1"
                    size="md"
                    helperText="Size: md (default)"
                  />
                  <Radio
                    name="size-md"
                    label="Medium option 2"
                    value="2"
                    size="md"
                  />
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold" style={{ color: '#4D5D53' }}>Large Size</h4>
                  <Radio
                    name="size-lg"
                    label="Large option 1"
                    value="1"
                    size="lg"
                    helperText="Size: lg"
                  />
                  <Radio
                    name="size-lg"
                    label="Large option 2"
                    value="2"
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default CheckboxesRadios 