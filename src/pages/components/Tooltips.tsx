import React from 'react'
import { Tooltip, Button } from '../../components'

const Tooltips: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#4D5D53' }}>
          Tooltip Components
        </h1>
        <p className="text-xl max-w-2xl mx-auto" style={{ color: '#6B7A5E' }}>
          Contextual information displays with smooth animations and intelligent positioning.
        </p>
      </div>

      {/* Basic Tooltip */}
      <div className="mb-16">
        <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Basic Tooltip
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B7A5E' }}>
            Lightweight contextual information that appears on hover or focus with smooth animations.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Tooltip Positioning</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-center">
                    <Tooltip content="Tooltip appears above" position="top">
                      <Button variant="primary">
                        Top Tooltip
                      </Button>
                    </Tooltip>
                  </div>
                  <div className="flex items-center justify-center">
                    <Tooltip content="Tooltip appears to the right" position="right">
                      <Button variant="primary">
                        Right Tooltip
                      </Button>
                    </Tooltip>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-center">
                    <Tooltip content="Tooltip appears below" position="bottom">
                      <Button variant="primary">
                        Bottom Tooltip
                      </Button>
                    </Tooltip>
                  </div>
                  <div className="flex items-center justify-center">
                    <Tooltip content="Tooltip appears to the left" position="left">
                      <Button variant="primary">
                        Left Tooltip
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Tooltip Variants</h3>
              <div className="flex flex-wrap gap-6 justify-center">
                <Tooltip content="Standard tooltip with default styling">
                  <Button variant="secondary">
                    Default Tooltip
                  </Button>
                </Tooltip>
                <Tooltip content="Dark themed tooltip">
                  <Button variant="secondary">
                    Dark Tooltip
                  </Button>
                </Tooltip>
                <Tooltip content="Light themed tooltip">
                  <Button variant="secondary">
                    Light Tooltip
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip Content Types */}
      <div className="mb-16">
        <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Tooltip Content
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B7A5E' }}>
            Tooltips can display various types of content from simple text to rich HTML.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Content Examples</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Tooltip content="This is a simple text tooltip">
                      <div className="p-4 rounded-lg border-2 border-dashed" style={{ borderColor: '#4D5D53' }}>
                        <span className="text-sm" style={{ color: '#4D5D53' }}>Simple Text</span>
                      </div>
                    </Tooltip>
                  </div>
                  <div className="flex items-center justify-center">
                    <Tooltip content="This is a longer tooltip with more detailed information that spans multiple lines">
                      <div className="p-4 rounded-lg border-2 border-dashed" style={{ borderColor: '#4D5D53' }}>
                        <span className="text-sm" style={{ color: '#4D5D53' }}>Multi-line Text</span>
                      </div>
                    </Tooltip>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Tooltip content={<div><strong>Rich Content</strong><br/>With HTML formatting</div>}>
                      <div className="p-4 rounded-lg border-2 border-dashed" style={{ borderColor: '#4D5D53' }}>
                        <span className="text-sm" style={{ color: '#4D5D53' }}>Rich HTML</span>
                      </div>
                    </Tooltip>
                  </div>
                  <div className="flex items-center justify-center">
                    <Tooltip content="⚡ Tooltip with emoji and symbols ⭐">
                      <div className="p-4 rounded-lg border-2 border-dashed" style={{ borderColor: '#4D5D53' }}>
                        <span className="text-sm" style={{ color: '#4D5D53' }}>With Emoji</span>
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip Triggers */}
      <div className="mb-16">
        <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Tooltip Triggers
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B7A5E' }}>
            Tooltips can be triggered by different user interactions for optimal user experience.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Trigger Types</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Tooltip content="Appears on hover">
                      <Button variant="secondary">
                        Hover Trigger
                      </Button>
                    </Tooltip>
                  </div>
                  <div className="flex items-center justify-center">
                    <Tooltip content="Appears on focus">
                      <Button variant="secondary">
                        Focus Trigger
                      </Button>
                    </Tooltip>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Tooltip content="Appears on click">
                      <Button variant="secondary">
                        Click Trigger
                      </Button>
                    </Tooltip>
                  </div>
                  <div className="flex items-center justify-center">
                    <Tooltip content="Appears on hover or focus">
                      <Button variant="secondary">
                        Hover + Focus
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip Delays */}
      <div className="mb-16">
        <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Tooltip Timing
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B7A5E' }}>
            Configure show and hide delays for better user experience.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Delay Examples</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Tooltip content="No delay - shows immediately">
                    <Button variant="secondary">
                      No Delay
                    </Button>
                  </Tooltip>
                  <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>0ms delay</p>
                </div>
                <div className="text-center">
                  <Tooltip content="Short delay before showing">
                    <Button variant="secondary">
                      Short Delay
                    </Button>
                  </Tooltip>
                  <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>300ms delay</p>
                </div>
                <div className="text-center">
                  <Tooltip content="Longer delay before showing">
                    <Button variant="secondary">
                      Long Delay
                    </Button>
                  </Tooltip>
                  <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>1000ms delay</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
  )
}

export default Tooltips 