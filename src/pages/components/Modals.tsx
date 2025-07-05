import React, { useState } from 'react'
import { Modal, LiquidModal, Button } from '../../components'

const Modals: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLiquidModalOpen, setIsLiquidModalOpen] = useState(false)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#4D5D53' }}>
          Modal Components
        </h1>
        <p className="text-xl max-w-2xl mx-auto" style={{ color: '#6B7A5E' }}>
          Overlay dialogs with smooth animations and accessible focus management.
        </p>
      </div>

      {/* Basic Modal */}
      <div className="mb-16">
        <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Basic Modal
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B7A5E' }}>
            Standard modal dialog with backdrop blur and smooth entry/exit animations.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Modal Example</h3>
              <div className="text-center">
                <Button
                  variant="primary"
                  onClick={() => setIsModalOpen(true)}
                >
                  Open Modal
                </Button>
              </div>
              <div className="mt-4 p-4 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
                <p className="text-sm" style={{ color: '#6B7A5E' }}>
                  Click the button above to see the modal in action with backdrop blur and smooth animations.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Modal Features</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#4D5D53' }}>Accessibility</h4>
                  <ul className="text-sm space-y-1" style={{ color: '#6B7A5E' }}>
                    <li>• Focus trap management</li>
                    <li>• Keyboard navigation (ESC to close)</li>
                    <li>• Screen reader support</li>
                    <li>• ARIA attributes</li>
                  </ul>
                </div>
                <div className="p-4 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#4D5D53' }}>Animations</h4>
                  <ul className="text-sm space-y-1" style={{ color: '#6B7A5E' }}>
                    <li>• Smooth scale transitions</li>
                    <li>• Backdrop blur effect</li>
                    <li>• Configurable animation duration</li>
                    <li>• Smooth exit animations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Liquid Modal */}
      <div className="mb-16">
        <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Liquid Modal
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B7A5E' }}>
            Enhanced modal with liquid morphing effects and dynamic background gradients.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Liquid Modal Demo</h3>
              <div className="text-center">
                <Button
                  variant="primary"
                  onClick={() => setIsLiquidModalOpen(true)}
                >
                  Open Liquid Modal
                </Button>
              </div>
              <div className="mt-4 p-4 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
                <p className="text-sm" style={{ color: '#6B7A5E' }}>
                  Experience the liquid modal with morphing effects and dynamic background gradients that respond to interaction.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Liquid Modal Features</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#4D5D53' }}>Visual Effects</h4>
                  <ul className="text-sm space-y-1" style={{ color: '#6B7A5E' }}>
                    <li>• Liquid morphing transitions</li>
                    <li>• Dynamic gradient backgrounds</li>
                    <li>• Cursor-responsive effects</li>
                    <li>• Organic shape transformations</li>
                  </ul>
                </div>
                <div className="p-4 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#4D5D53' }}>Usage Guidelines</h4>
                  <ul className="text-sm space-y-1" style={{ color: '#6B7A5E' }}>
                    <li>• Premium feature announcements</li>
                    <li>• Interactive product demos</li>
                    <li>• Creative portfolio showcases</li>
                    <li>• Special event notifications</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Sizes and Variants */}
      <div className="mb-16">
        <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Modal Customization
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Available Sizes</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl text-center" style={{ backgroundColor: '#F8F2E6' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#4D5D53' }}>Small</h4>
                  <p className="text-sm" style={{ color: '#6B7A5E' }}>
                    Quick confirmations and alerts
                  </p>
                </div>
                <div className="p-4 rounded-2xl text-center" style={{ backgroundColor: '#F8F2E6' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#4D5D53' }}>Medium</h4>
                  <p className="text-sm" style={{ color: '#6B7A5E' }}>
                    Form dialogs and content
                  </p>
                </div>
                <div className="p-4 rounded-2xl text-center" style={{ backgroundColor: '#F8F2E6' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#4D5D53' }}>Large</h4>
                  <p className="text-sm" style={{ color: '#6B7A5E' }}>
                    Complex content and media
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Position Options</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#4D5D53' }}>Centered</h4>
                  <p className="text-sm" style={{ color: '#6B7A5E' }}>
                    Default position for most use cases
                  </p>
                </div>
                <div className="p-4 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#4D5D53' }}>Top-aligned</h4>
                  <p className="text-sm" style={{ color: '#6B7A5E' }}>
                    For content-heavy modals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Components */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#4D5D53' }}>
            This is a Basic Modal
          </h3>
          <p className="text-sm mb-6" style={{ color: '#6B7A5E' }}>
            This modal demonstrates the smooth animations and accessibility features of our modal component. 
            Notice the backdrop blur effect and how focus is trapped within the modal.
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => setIsModalOpen(false)}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>

      <LiquidModal
        isOpen={isLiquidModalOpen}
        onClose={() => setIsLiquidModalOpen(false)}
        title="Liquid Modal Demo"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#4D5D53' }}>
            Experience the Liquid Effect
          </h3>
          <p className="text-sm mb-6" style={{ color: '#6B7A5E' }}>
            This liquid modal showcases dynamic gradient backgrounds and morphing effects. 
            Move your cursor around to see how the modal responds with fluid animations.
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              onClick={() => setIsLiquidModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => setIsLiquidModalOpen(false)}
            >
              Confirm
            </Button>
          </div>
        </div>
      </LiquidModal>
    </div>
  )
}

export default Modals 