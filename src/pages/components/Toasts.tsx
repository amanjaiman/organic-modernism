import React, { useState } from 'react'
import { Toast, RippleToast, ToastContainer, Button } from '../../components'

const Toasts: React.FC = () => {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' | 'warning' | 'info' }>>([])

  const addToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 5000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#4D5D53' }}>
          Toast Components
        </h1>
        <p className="text-xl max-w-2xl mx-auto" style={{ color: '#6B7A5E' }}>
          Elegant notification system with smooth animations and customizable styles.
        </p>
      </div>

      {/* Basic Toast */}
      <div className="mb-16">
        <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Basic Toast
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B7A5E' }}>
            Standard toast notifications with automatic dismissal and smooth slide animations.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Toast Types</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Button
                    variant="primary"
                    onClick={() => addToast('Success! Your changes have been saved.', 'success')}
                    className="w-full"
                  >
                    Show Success Toast
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => addToast('Error! Something went wrong.', 'error')}
                    className="w-full"
                  >
                    Show Error Toast
                  </Button>
                </div>
                <div className="space-y-4">
                  <Button
                    variant="accent"
                    onClick={() => addToast('Warning! Please check your input.', 'warning')}
                    className="w-full"
                  >
                    Show Warning Toast
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => addToast('Info: Your profile has been updated.', 'info')}
                    className="w-full"
                  >
                    Show Info Toast
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Toast Features</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#4D5D53' }}>Automatic Dismissal</h4>
                  <ul className="text-sm space-y-1" style={{ color: '#6B7A5E' }}>
                    <li>• Configurable duration</li>
                    <li>• Pause on hover</li>
                    <li>• Manual dismissal option</li>
                    <li>• Queue management</li>
                  </ul>
                </div>
                <div className="p-4 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#4D5D53' }}>Animations</h4>
                  <ul className="text-sm space-y-1" style={{ color: '#6B7A5E' }}>
                    <li>• Smooth slide transitions</li>
                    <li>• Fade in/out effects</li>
                    <li>• Stacking animations</li>
                    <li>• Responsive positioning</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ripple Toast */}
      <div className="mb-16">
        <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Ripple Toast
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B7A5E' }}>
            Enhanced toast with ripple effects and dynamic background animations.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Ripple Effects Demo</h3>
              <div className="text-center space-y-4">
                                 <div className="p-4 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
                   <RippleToast
                     id="demo-toast"
                     title="Ripple Toast Demo"
                     message="This is a ripple toast with animated background effects!"
                     type="success"
                     duration={0} // Don't auto-dismiss for demo
                     onClose={() => {}}
                   />
                 </div>
                <p className="text-sm" style={{ color: '#6B7A5E' }}>
                  Notice the ripple effect and animated background gradients
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Ripple Toast Features</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#4D5D53' }}>Visual Effects</h4>
                  <ul className="text-sm space-y-1" style={{ color: '#6B7A5E' }}>
                    <li>• Ripple wave animations</li>
                    <li>• Dynamic gradient backgrounds</li>
                    <li>• Color-coded by type</li>
                    <li>• Organic shape morphing</li>
                  </ul>
                </div>
                <div className="p-4 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#4D5D53' }}>Enhanced Interaction</h4>
                  <ul className="text-sm space-y-1" style={{ color: '#6B7A5E' }}>
                    <li>• Hover effects</li>
                    <li>• Click animations</li>
                    <li>• Swipe to dismiss</li>
                    <li>• Touch-friendly gestures</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <div className="mb-16">
        <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Toast Container
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B7A5E' }}>
            Manages multiple toasts with intelligent positioning and queue management.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Container Features</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#4D5D53' }}>Positioning</h4>
                  <ul className="text-sm space-y-1" style={{ color: '#6B7A5E' }}>
                    <li>• Top-right (default)</li>
                    <li>• Top-left</li>
                    <li>• Bottom-right</li>
                    <li>• Bottom-left</li>
                    <li>• Top-center</li>
                    <li>• Bottom-center</li>
                  </ul>
                </div>
                <div className="p-4 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#4D5D53' }}>Queue Management</h4>
                  <ul className="text-sm space-y-1" style={{ color: '#6B7A5E' }}>
                    <li>• Automatic stacking</li>
                    <li>• Maximum visible toasts</li>
                    <li>• Oldest toast removal</li>
                    <li>• Smooth reordering</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Multiple Toasts Demo</h3>
              <div className="text-center space-y-4">
                <Button
                  variant="primary"
                  onClick={() => {
                    addToast('First toast message', 'success')
                    setTimeout(() => addToast('Second toast message', 'info'), 500)
                    setTimeout(() => addToast('Third toast message', 'warning'), 1000)
                  }}
                >
                  Show Multiple Toasts
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Toast Container for displaying toasts */}
      <ToastContainer position="top-right" toasts={toasts.map(toast => ({
        id: toast.id,
        title: toast.type.charAt(0).toUpperCase() + toast.type.slice(1),
        message: toast.message,
        type: toast.type,
        onClose: () => setToasts(prev => prev.filter(t => t.id !== toast.id))
      }))} />
    </div>
  )
}

export default Toasts 