import React from 'react'
import { Card, LiquidCard, GestureCard } from '../src/components'

export const CardExample = () => {
  return (
    <div className="p-8 space-y-12" style={{ backgroundColor: '#FAF9F5' }}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2" style={{ color: '#4D5D53' }}>
          Card Component Showcase
        </h1>
        <p className="text-center text-lg mb-12" style={{ color: '#6B7A5E' }}>
          Explore our organic modernism card variations with unique interactions
        </p>

        {/* Standard Card Variants */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8" style={{ color: '#4D5D53' }}>
            Standard Card Variants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Elevated Card */}
            <Card variant="elevated" elevation="md" hoverable>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>
                Elevated Card
              </h3>
              <p className="text-sm" style={{ color: '#6B7A5E' }}>
                Clean elevation with subtle shadows and hover lifting effect.
              </p>
            </Card>

            {/* Outlined Card */}
            <Card variant="outlined" elevation="sm" hoverable>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>
                Outlined Card
              </h3>
              <p className="text-sm" style={{ color: '#6B7A5E' }}>
                Subtle border with minimal elevation for clean layouts.
              </p>
            </Card>

            {/* Filled Card */}
            <Card variant="filled" elevation="md" hoverable>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>
                Filled Card
              </h3>
              <p className="text-sm" style={{ color: '#6B7A5E' }}>
                Filled background with organic warmth and texture.
              </p>
            </Card>

            {/* Glass Card */}
            <Card variant="glass" elevation="lg" hoverable>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>
                Glass Card
              </h3>
              <p className="text-sm" style={{ color: '#6B7A5E' }}>
                Frosted glass effect with backdrop blur for modern appeal.
              </p>
            </Card>
          </div>
        </section>

        {/* Elevation Levels */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8" style={{ color: '#4D5D53' }}>
            Elevation Levels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((elevation) => (
              <Card 
                key={elevation}
                variant="elevated" 
                elevation={elevation}
                hoverable
                className="text-center"
              >
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>
                  {elevation.toUpperCase()}
                </h3>
                <p className="text-sm" style={{ color: '#6B7A5E' }}>
                  Elevation level for depth hierarchy
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Padding Variations */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8" style={{ color: '#4D5D53' }}>
            Padding Variations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {(['sm', 'md', 'lg', 'xl'] as const).map((padding) => (
              <Card 
                key={padding}
                variant="outlined" 
                padding={padding}
                hoverable
                className="text-center"
              >
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>
                  {padding.toUpperCase()} Padding
                </h3>
                <p className="text-sm" style={{ color: '#6B7A5E' }}>
                  Content spacing for different use cases
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Unique Interaction Cards */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8" style={{ color: '#4D5D53' }}>
            Unique Interaction Cards
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Liquid Card */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold" style={{ color: '#4D5D53' }}>
                Liquid Card
              </h3>
              <p className="text-sm mb-4" style={{ color: '#6B7A5E' }}>
                Morphing liquid effects with gradient shifts and radial highlights that follow your cursor.
              </p>
              <LiquidCard padding="lg">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full" 
                       style={{ backgroundColor: '#78866B' }}>
                    <div className="w-full h-full flex items-center justify-center text-white text-2xl">
                      ✨
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>
                    Liquid Interactions
                  </h4>
                  <p className="text-sm" style={{ color: '#6B7A5E' }}>
                    Hover and move your cursor around this card to see the liquid morphing effects in action.
                  </p>
                </div>
              </LiquidCard>
            </div>

            {/* Gesture Card */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold" style={{ color: '#4D5D53' }}>
                Gesture Card
              </h3>
              <p className="text-sm mb-4" style={{ color: '#6B7A5E' }}>
                3D draggable interactions with natural physics and perspective transforms.
              </p>
              <GestureCard padding="lg" intensity="medium">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full" 
                       style={{ backgroundColor: '#8F9779' }}>
                    <div className="w-full h-full flex items-center justify-center text-white text-2xl">
                      🎯
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>
                    3D Gestures
                  </h4>
                  <p className="text-sm" style={{ color: '#6B7A5E' }}>
                    Click and drag this card to experience 3D physics with natural spring-back motion.
                  </p>
                </div>
              </GestureCard>
            </div>
          </div>

          {/* Intensity Variations */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold" style={{ color: '#4D5D53' }}>
              Gesture Intensity Levels
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(['subtle', 'medium', 'strong'] as const).map((intensity) => (
                <GestureCard 
                  key={intensity}
                  padding="md" 
                  intensity={intensity}
                  className="text-center"
                >
                  <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>
                    {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
                  </h4>
                  <p className="text-sm" style={{ color: '#6B7A5E' }}>
                    {intensity === 'subtle' && 'Gentle 3D effects for professional interfaces'}
                    {intensity === 'medium' && 'Balanced interaction for engaging experiences'}
                    {intensity === 'strong' && 'Dramatic effects for playful applications'}
                  </p>
                </GestureCard>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 