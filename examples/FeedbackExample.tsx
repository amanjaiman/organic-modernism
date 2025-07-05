import React, { useState } from 'react';
import { 
  Modal, 
  LiquidModal, 
  Toast, 
  RippleToast, 
  ToastContainer, 
  Tooltip, 
  Alert,
  Button
} from '../src/components';
import { type ToastProps } from '../src/components/Toast/Toast';

const FeedbackExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiquidModalOpen, setIsLiquidModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [showAlert, setShowAlert] = useState(true);

  const addToast = (type: ToastProps['type'], title: string, message?: string) => {
    const newToast: ToastProps = {
      id: Date.now().toString(),
      type,
      title,
      message,
      onClose: (id) => setToasts(prev => prev.filter(t => t.id !== id))
    };
    setToasts(prev => [...prev, newToast]);
  };

  const addRippleToast = (type: ToastProps['type'], title: string, message?: string) => {
    // For demo purposes, we'll use a different container for ripple toasts
    const newToast: ToastProps = {
      id: Date.now().toString(),
      type,
      title,
      message,
      onClose: (id) => console.log('Ripple toast closed:', id)
    };
    // In a real app, you'd have a separate state for ripple toasts
    console.log('Ripple toast added:', newToast);
  };

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-stone-800 tracking-tight">
            Phase 5: Feedback & Overlays
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Interactive components for user feedback, notifications, and overlay content with our unique organic interaction patterns.
          </p>
        </div>

        {/* Modal Components */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-stone-800 mb-4">Modal Components</h2>
            <p className="text-stone-600 mb-8">Standard and liquid-enhanced modal dialogs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Standard Modal */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-xl font-semibold text-stone-800 mb-4">Standard Modal</h3>
              <p className="text-stone-600 mb-6">
                Clean, accessible modal with backdrop blur and smooth animations.
              </p>
              <div className="space-y-4">
                <Button onClick={() => setIsModalOpen(true)} variant="primary">
                  Open Standard Modal
                </Button>
              </div>
            </div>

            {/* Liquid Modal */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-xl font-semibold text-stone-800 mb-4">Liquid Modal</h3>
              <p className="text-stone-600 mb-6">
                Enhanced with liquid transitions, mouse tracking, and organic animations.
              </p>
              <div className="space-y-4">
                <Button onClick={() => setIsLiquidModalOpen(true)} variant="primary">
                  Open Liquid Modal
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Toast Components */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-stone-800 mb-4">Toast Notifications</h2>
            <p className="text-stone-600 mb-8">Contextual notifications with auto-dismiss and stacking</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Standard Toasts */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-xl font-semibold text-stone-800 mb-4">Standard Toasts</h3>
              <p className="text-stone-600 mb-6">
                Clean notifications with progress indicators and smooth slide animations.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={() => addToast('success', 'Success!', 'Your action was completed successfully.')}
                  variant="secondary"
                  size="sm"
                >
                  Success
                </Button>
                <Button 
                  onClick={() => addToast('error', 'Error!', 'Something went wrong. Please try again.')}
                  variant="secondary"
                  size="sm"
                >
                  Error
                </Button>
                <Button 
                  onClick={() => addToast('warning', 'Warning!', 'Please check your input and try again.')}
                  variant="secondary"
                  size="sm"
                >
                  Warning
                </Button>
                <Button 
                  onClick={() => addToast('info', 'Info', 'Here is some helpful information.')}
                  variant="secondary"
                  size="sm"
                >
                  Info
                </Button>
              </div>
            </div>

            {/* Ripple Toasts */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-xl font-semibold text-stone-800 mb-4">Ripple Toasts</h3>
              <p className="text-stone-600 mb-6">
                Interactive toasts with ripple effects that respond to clicks.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={() => addRippleToast('success', 'Success!', 'Click me for ripples!')}
                  variant="secondary"
                  size="sm"
                >
                  Success
                </Button>
                <Button 
                  onClick={() => addRippleToast('error', 'Error!', 'Interactive feedback')}
                  variant="secondary"
                  size="sm"
                >
                  Error
                </Button>
                <Button 
                  onClick={() => addRippleToast('warning', 'Warning!', 'Organic interactions')}
                  variant="secondary"
                  size="sm"
                >
                  Warning
                </Button>
                <Button 
                  onClick={() => addRippleToast('info', 'Info', 'Ripple on click')}
                  variant="secondary"
                  size="sm"
                >
                  Info
                </Button>
              </div>
            </div>
          </div>

          {/* Demo Ripple Toast */}
          <div className="flex justify-center">
            <RippleToast
              id="demo-ripple"
              type="info"
              title="Demo Ripple Toast"
              message="Click anywhere on this toast to see the ripple effect!"
              duration={0} // Don't auto-dismiss
              onClose={() => console.log('Demo toast closed')}
            />
          </div>
        </section>

        {/* Tooltip Components */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-stone-800 mb-4">Tooltips</h2>
            <p className="text-stone-600 mb-8">Contextual help with intelligent positioning</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <Tooltip content="This appears on top!" position="top">
                  <Button variant="outline" size="sm">Top Tooltip</Button>
                </Tooltip>
              </div>
              <div>
                <Tooltip content="This appears on the right!" position="right">
                  <Button variant="outline" size="sm">Right Tooltip</Button>
                </Tooltip>
              </div>
              <div>
                <Tooltip content="This appears on the bottom!" position="bottom">
                  <Button variant="outline" size="sm">Bottom Tooltip</Button>
                </Tooltip>
              </div>
              <div>
                <Tooltip content="This appears on the left!" position="left">
                  <Button variant="outline" size="sm">Left Tooltip</Button>
                </Tooltip>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Tooltip 
                content={
                  <div className="space-y-2">
                    <div className="font-semibold">Rich Content Tooltip</div>
                    <div className="text-sm">Tooltips can contain complex content like this!</div>
                  </div>
                }
                position="top"
              >
                <Button variant="primary">Rich Content Tooltip</Button>
              </Tooltip>
            </div>
          </div>
        </section>

        {/* Alert Components */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-stone-800 mb-4">Alert Banners</h2>
            <p className="text-stone-600 mb-8">Prominent status messages with optional dismissal</p>
          </div>

          <div className="space-y-6">
            {showAlert && (
              <Alert 
                type="info" 
                title="Welcome!"
                dismissible
                onDismiss={() => setShowAlert(false)}
              >
                This is a dismissible alert banner. Click the X to close it.
              </Alert>
            )}
            
            <Alert type="success" title="Success">
              Your changes have been saved successfully. All data is now synchronized.
            </Alert>
            
            <Alert type="warning" title="Warning">
              Your session will expire in 5 minutes. Please save your work.
            </Alert>
            
            <Alert type="error" title="Error">
              Unable to connect to the server. Please check your internet connection and try again.
            </Alert>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-stone-800 mb-4">Usage Examples</h2>
            <p className="text-stone-600 mb-8">Real-world implementation patterns</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200">
            <h3 className="text-xl font-semibold text-stone-800 mb-4">Form Validation Flow</h3>
            <div className="space-y-4">
              <Button 
                onClick={() => {
                  addToast('error', 'Validation Error', 'Please fill in all required fields.');
                }}
                variant="outline"
              >
                Trigger Validation Error
              </Button>
              
              <Button 
                onClick={() => {
                  addToast('success', 'Form Submitted', 'Your form has been submitted successfully!');
                }}
                variant="primary"
              >
                Submit Form
              </Button>
            </div>
          </div>
        </section>

        {/* Modals */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Standard Modal"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-stone-600">
              This is a standard modal with clean design and smooth animations. 
              It includes backdrop blur and keyboard navigation support.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                Confirm
              </Button>
            </div>
          </div>
        </Modal>

        <LiquidModal
          isOpen={isLiquidModalOpen}
          onClose={() => setIsLiquidModalOpen(false)}
          title="Liquid Modal"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-stone-600">
              This is a liquid modal with organic animations and mouse tracking effects. 
              Move your mouse around to see the interactive background!
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsLiquidModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsLiquidModalOpen(false)}>
                Confirm
              </Button>
            </div>
          </div>
        </LiquidModal>

        {/* Toast Container */}
        <ToastContainer toasts={toasts} position="top-right" />
      </div>
    </div>
  );
};

 