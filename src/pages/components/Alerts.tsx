import React, { useState } from 'react'
import { Alert } from '../../components'

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState({
    success: true,
    error: true,
    warning: true,
    info: true,
  })

  const toggleAlert = (type: keyof typeof alerts) => {
    setAlerts(prev => ({ ...prev, [type]: !prev[type] }))
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#4D5D53' }}>
          Alert Components
        </h1>
        <p className="text-xl max-w-2xl mx-auto" style={{ color: '#6B7A5E' }}>
          Attention-grabbing messages with clear visual hierarchy and smooth animations.
        </p>
      </div>

      {/* Alert Types */}
      <div className="mb-16">
        <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Alert Types
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B7A5E' }}>
            Different alert types for various message contexts with appropriate visual styling.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Basic Alert Types</h3>
              <div className="space-y-4">
                {alerts.success && (
                  <Alert
                    type="success"
                    title="Success"
                    dismissible
                    onDismiss={() => toggleAlert('success')}
                  >
                    Your changes have been saved successfully!
                  </Alert>
                )}
                {alerts.error && (
                  <Alert
                    type="error"
                    title="Error"
                    dismissible
                    onDismiss={() => toggleAlert('error')}
                  >
                    Something went wrong. Please try again.
                  </Alert>
                )}
                {alerts.warning && (
                  <Alert
                    type="warning"
                    title="Warning"
                    dismissible
                    onDismiss={() => toggleAlert('warning')}
                  >
                    Please review your input before proceeding.
                  </Alert>
                )}
                {alerts.info && (
                  <Alert
                    type="info"
                    title="Information"
                    dismissible
                    onDismiss={() => toggleAlert('info')}
                  >
                    Your profile has been updated with new information.
                  </Alert>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Alert Controls</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => toggleAlert('success')}
                  className="px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#4D5D53' }}
                >
                  Toggle Success
                </button>
                <button
                  onClick={() => toggleAlert('error')}
                  className="px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#6B7A5E' }}
                >
                  Toggle Error
                </button>
                <button
                  onClick={() => toggleAlert('warning')}
                  className="px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#8F9779' }}
                >
                  Toggle Warning
                </button>
                <button
                  onClick={() => toggleAlert('info')}
                  className="px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#9BAA94' }}
                >
                  Toggle Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Variants */}
      <div className="mb-16">
        <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Alert Variants
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B7A5E' }}>
            Different visual styles for alerts to match your interface design.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Style Variants</h3>
              <div className="space-y-4">
                <Alert
                  type="success"
                  title="Filled Alert"
                >
                  This is a filled alert with solid background color.
                </Alert>
                <Alert
                  type="info"
                  title="Outlined Alert"
                >
                  This is an outlined alert with border styling.
                </Alert>
                <Alert
                  type="warning"
                  title="Minimal Alert"
                >
                  This is a minimal alert with subtle styling.
                </Alert>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Sizes */}
      <div className="mb-16">
        <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Alert Sizes
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B7A5E' }}>
            Different alert sizes to accommodate various content amounts and layout needs.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Size Examples</h3>
              <div className="space-y-4">
                <Alert
                  type="info"
                  title="Small Alert"
                >
                  Compact alert for minimal space.
                </Alert>
                <Alert
                  type="success"
                  title="Medium Alert"
                >
                  Standard alert size for most use cases.
                </Alert>
                <Alert
                  type="warning"
                  title="Large Alert"
                >
                  Large alert for important messages that need more prominence and space.
                </Alert>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Features */}
      <div className="mb-16">
        <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Alert Features
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Interactive Features</h3>
              <div className="space-y-4">
                <Alert
                  type="info"
                  title="Dismissible Alert"
                  dismissible
                  onDismiss={() => console.log('Alert dismissed')}
                >
                  This alert can be dismissed by clicking the close button.
                </Alert>
                <Alert
                  type="success"
                  title="Auto-dismiss Alert"
                >
                  This alert will automatically disappear after 5 seconds.
                </Alert>
                <Alert
                  type="warning"
                  title="Alert with Actions"
                >
                  This alert includes custom action buttons.
                </Alert>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Alerts 