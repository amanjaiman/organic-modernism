import React from 'react'
import { Card, LiquidCard, GestureCard, Button } from '../../components'

const Cards: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#4D5D53' }}>
          Card Components
        </h1>
        <p className="text-xl max-w-2xl mx-auto" style={{ color: '#6B7A5E' }}>
          Elegant content containers with interactive effects and organic styling.
        </p>
      </div>

      {/* Basic Card */}
      <div className="mb-16">
        <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Basic Card
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B7A5E' }}>
            Clean, minimal cards with subtle shadows and rounded corners for organizing content.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Basic Examples</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-3" style={{ color: '#4D5D53' }}>
                      Simple Card
                    </h4>
                    <p className="text-sm mb-4" style={{ color: '#6B7A5E' }}>
                      This is a basic card with standard padding and styling. Perfect for general content organization.
                    </p>
                    <Button variant="primary" size="sm">
                      Learn More
                    </Button>
                  </div>
                </Card>
                <Card>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-3" style={{ color: '#4D5D53' }}>
                      Card with Image
                    </h4>
                    <div className="w-full h-32 mb-4 rounded-lg" style={{ backgroundColor: '#F8F2E6' }}>
                      <div className="flex items-center justify-center h-full text-sm" style={{ color: '#6B7A5E' }}>
                        Image Placeholder
                      </div>
                    </div>
                    <p className="text-sm mb-4" style={{ color: '#6B7A5E' }}>
                      Cards can contain images, text, and interactive elements.
                    </p>
                    <Button variant="primary" size="sm">
                      View Details
                    </Button>
                  </div>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Card Variants</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card variant="elevated">
                  <div className="p-6 text-center">
                    <h4 className="text-lg font-semibold mb-3" style={{ color: '#4D5D53' }}>
                      Elevated Card
                    </h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      Enhanced shadow for more prominence
                    </p>
                  </div>
                </Card>
                <Card variant="outlined">
                  <div className="p-6 text-center">
                    <h4 className="text-lg font-semibold mb-3" style={{ color: '#4D5D53' }}>
                      Outlined Card
                    </h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      Bordered style with minimal shadow
                    </p>
                  </div>
                </Card>
                <Card variant="filled">
                  <div className="p-6 text-center">
                    <h4 className="text-lg font-semibold mb-3" style={{ color: '#4D5D53' }}>
                      Filled Card
                    </h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      Subtle background fill
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Liquid Card */}
      <div className="mb-16">
        <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Liquid Card
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B7A5E' }}>
            Cards with liquid morphing effects and gradient transitions that respond to cursor movement.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Interactive Examples</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <LiquidCard>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-3" style={{ color: '#4D5D53' }}>
                      Liquid Effect Demo
                    </h4>
                    <p className="text-sm mb-4" style={{ color: '#6B7A5E' }}>
                      Hover over this card to see the liquid morphing effect in action. The gradient shifts follow your cursor.
                    </p>
                    <Button variant="primary" size="sm">
                      Explore Effect
                    </Button>
                  </div>
                </LiquidCard>
                <LiquidCard>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-3" style={{ color: '#4D5D53' }}>
                      Premium Content
                    </h4>
                    <p className="text-sm mb-4" style={{ color: '#6B7A5E' }}>
                      Liquid cards are perfect for highlighting premium features or special content that deserves attention.
                    </p>
                    <Button variant="accent" size="sm">
                      Upgrade Now
                    </Button>
                  </div>
                </LiquidCard>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Usage Scenarios</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#4D5D53' }}>✅ Perfect For:</h4>
                  <ul className="text-sm space-y-1" style={{ color: '#6B7A5E' }}>
                    <li>• Premium product showcases</li>
                    <li>• Special offers and promotions</li>
                    <li>• Interactive portfolios</li>
                    <li>• Feature highlights</li>
                  </ul>
                </div>
                <div className="p-4 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#4D5D53' }}>❌ Avoid For:</h4>
                  <ul className="text-sm space-y-1" style={{ color: '#6B7A5E' }}>
                    <li>• Data-heavy interfaces</li>
                    <li>• List views with many items</li>
                    <li>• Mobile-first designs</li>
                    <li>• Accessibility-critical content</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gesture Card */}
      <div className="mb-16">
        <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Gesture Card
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B7A5E' }}>
            Interactive cards that respond to swipe gestures and touch interactions with smooth animations.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Swipe Interactions</h3>
              <div className="grid md:grid-cols-2 gap-6">
                                 <GestureCard>
                   <div className="p-6">
                     <h4 className="text-lg font-semibold mb-3" style={{ color: '#4D5D53' }}>
                       Swipe to Interact
                     </h4>
                     <p className="text-sm mb-4" style={{ color: '#6B7A5E' }}>
                       Try swiping left or right on this card to trigger different actions. Perfect for mobile interfaces.
                     </p>
                     <div className="flex gap-2 text-xs" style={{ color: '#6B7A5E' }}>
                       <span>← Archive</span>
                       <span>Favorite →</span>
                     </div>
                   </div>
                 </GestureCard>
                                 <GestureCard>
                   <div className="p-6">
                     <h4 className="text-lg font-semibold mb-3" style={{ color: '#4D5D53' }}>
                       Vertical Gestures
                     </h4>
                     <p className="text-sm mb-4" style={{ color: '#6B7A5E' }}>
                       This card responds to vertical swipes. Swipe up to expand or down to minimize.
                     </p>
                     <div className="flex gap-2 text-xs" style={{ color: '#6B7A5E' }}>
                       <span>↑ Expand</span>
                       <span>↓ Minimize</span>
                     </div>
                   </div>
                 </GestureCard>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Gesture Options</h3>
              <div className="grid md:grid-cols-3 gap-6">
                                 <GestureCard>
                   <div className="p-6 text-center">
                     <h4 className="text-lg font-semibold mb-3" style={{ color: '#4D5D53' }}>
                       Tap Gestures
                     </h4>
                     <p className="text-sm" style={{ color: '#6B7A5E' }}>
                       Single tap and double tap support
                     </p>
                   </div>
                 </GestureCard>
                 <GestureCard>
                   <div className="p-6 text-center">
                     <h4 className="text-lg font-semibold mb-3" style={{ color: '#4D5D53' }}>
                       Long Press
                     </h4>
                     <p className="text-sm" style={{ color: '#6B7A5E' }}>
                       Hold for 1 second to trigger
                     </p>
                   </div>
                 </GestureCard>
                 <GestureCard>
                   <div className="p-6 text-center">
                     <h4 className="text-lg font-semibold mb-3" style={{ color: '#4D5D53' }}>
                       Pinch Gesture
                     </h4>
                     <p className="text-sm" style={{ color: '#6B7A5E' }}>
                       Pinch to zoom (touch devices)
                     </p>
                   </div>
                 </GestureCard>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Cards 