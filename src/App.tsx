import React from 'react'

// Button Component with our unique design philosophy
const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) => {
  const baseStyles = "font-medium transition-all duration-300 ease-out transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden"
  
  const variants = {
    primary: "shadow-lg hover:shadow-xl focus:ring-2 focus:ring-offset-2",
    secondary: "shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2",
    ghost: "hover:bg-opacity-10 focus:ring-2 focus:ring-offset-2",
    accent: "shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2"
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm rounded-xl",
    md: "px-6 py-3 text-base rounded-2xl",
    lg: "px-8 py-4 text-lg rounded-3xl"
  }
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={{
        backgroundColor: variant === 'primary' ? '#78866B' : 
                        variant === 'secondary' ? '#F8F2E6' : 
                        variant === 'accent' ? '#BDC9BB' : 'transparent',
        borderColor: variant === 'primary' ? '#78866B' : 
                    variant === 'secondary' ? '#F3ECE0' : 
                    variant === 'accent' ? '#ACBAA1' : 'transparent',
        color: variant === 'primary' ? 'white' : 
               variant === 'secondary' ? '#4D5D53' : 
               variant === 'accent' ? '#4D5D53' : 
               variant === 'ghost' ? '#6B7A5E' : 'inherit',
        borderWidth: '1px',
        borderStyle: 'solid',
        '--tw-ring-color': variant === 'primary' ? '#8F9779' : 
                          variant === 'secondary' ? '#EED8AE' : 
                          variant === 'accent' ? '#8F9779' : 
                          '#8F9779'
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </button>
  )
}

// Color Palette Display Component
const ColorPalette = () => {
  const colorSystem = {
    sage: [
      { name: "Sage 50", hex: "#F4F6F2", description: "Lightest sage for backgrounds" },
      { name: "Sage 100", hex: "#E8ECDE", description: "Very light sage" },
      { name: "Sage 200", hex: "#BDC9BB", description: "Light sage for subtle elements" },
      { name: "Sage 300", hex: "#ACBAA1", description: "Medium-light sage" },
      { name: "Sage 400", hex: "#9BAA94", description: "Medium sage for accents" },
      { name: "Sage 500", hex: "#8F9779", description: "Base sage color" },
      { name: "Sage 600", hex: "#78866B", description: "Primary sage for buttons" },
      { name: "Sage 700", hex: "#6B7A5E", description: "Dark sage for emphasis" },
      { name: "Sage 800", hex: "#5E6D52", description: "Darker sage for contrast" },
      { name: "Sage 900", hex: "#4D5D53", description: "Darkest sage for text" }
    ],
    lace: [
      { name: "Lace 50", hex: "#FDFCFA", description: "Pure white with warmth" },
      { name: "Lace 100", hex: "#FDFBF8", description: "Softest lace tone" },
      { name: "Lace 200", hex: "#F8F2E6", description: "Classic vintage lace" },
      { name: "Lace 300", hex: "#F3ECE0", description: "Warm cream tone" },
      { name: "Lace 400", hex: "#EED8AE", description: "Rich champagne" },
      { name: "Lace 500", hex: "#E6D2A6", description: "Golden lace" },
      { name: "Lace 600", hex: "#D4C199", description: "Deeper cream" },
      { name: "Lace 700", hex: "#C2B08C", description: "Vintage beige" },
      { name: "Lace 800", hex: "#A89B7A", description: "Antique lace" },
      { name: "Lace 900", hex: "#8E8268", description: "Deep vintage tone" }
    ]
  }
  
  return (
    <div className="space-y-8">
      {/* Sage Palette */}
      <div>
        <h3 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
          Sage Palette
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {colorSystem.sage.map((color, index) => (
            <div key={index} className="text-center">
              <div 
                className="h-20 w-full rounded-2xl shadow-md mb-2 border"
                style={{ 
                  backgroundColor: color.hex,
                  borderColor: '#E8ECDE'
                }}
              ></div>
              <p className="text-sm font-medium" style={{ color: '#4D5D53' }}>
                {color.name}
              </p>
              <p className="text-xs" style={{ color: '#6B7A5E' }}>
                {color.hex}
              </p>
              <p className="text-xs mt-1" style={{ color: '#8F9779' }}>
                {color.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Vintage Lace Palette */}
      <div>
        <h3 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
          Vintage Lace Palette
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {colorSystem.lace.map((color, index) => (
            <div key={index} className="text-center">
              <div 
                className="h-20 w-full rounded-2xl shadow-md mb-2 border"
                style={{ 
                  backgroundColor: color.hex,
                  borderColor: '#E8ECDE'
                }}
              ></div>
              <p className="text-sm font-medium" style={{ color: '#4D5D53' }}>
                {color.name}
              </p>
              <p className="text-xs" style={{ color: '#6B7A5E' }}>
                {color.hex}
              </p>
              <p className="text-xs mt-1" style={{ color: '#8F9779' }}>
                {color.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Examples */}
      <div>
        <h3 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
          Color Harmony Examples
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl shadow-lg border" style={{ backgroundColor: '#F8F2E6', borderColor: '#F3ECE0' }}>
            <div className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center" style={{ backgroundColor: '#78866B' }}>
              <span className="text-white font-bold text-lg">1</span>
            </div>
            <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>Primary Combination</h4>
            <p style={{ color: '#6B7A5E' }}>Sage 600 on Lace 200 background</p>
          </div>
          
          <div className="p-6 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center" style={{ backgroundColor: '#8F9779' }}>
              <span className="text-white font-bold text-lg">2</span>
            </div>
            <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>Secondary Combination</h4>
            <p style={{ color: '#6B7A5E' }}>Sage 500 on Lace 100 background</p>
          </div>
          
          <div className="p-6 rounded-3xl shadow-lg border" style={{ backgroundColor: '#F4F6F2', borderColor: '#E8ECDE' }}>
            <div className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center" style={{ backgroundColor: '#ACBAA1' }}>
              <span style={{ color: '#4D5D53' }} className="font-bold text-lg">3</span>
            </div>
            <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>Subtle Combination</h4>
            <p style={{ color: '#6B7A5E' }}>Sage 300 on Sage 50 background</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(250, 249, 245)' }}>
      <div className="container mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#4D5D53' }}>
            Organic Modernism
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#6B7A5E' }}>
            A design language that blends natural harmony with modern precision
          </p>
        </div>

        {/* Design Philosophy */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            Design Philosophy
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
              <div className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center" style={{ backgroundColor: '#78866B' }}>
                <span className="text-white font-bold text-lg">○</span>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#4D5D53' }}>Organic Geometry</h3>
              <p style={{ color: '#6B7A5E' }}>Blend natural, flowing shapes with precise geometric elements for visual harmony.</p>
            </div>
            
            <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
              <div className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center" style={{ backgroundColor: '#8F9779' }}>
                <span className="text-white font-bold text-lg">△</span>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#4D5D53' }}>Layered Depth</h3>
              <p style={{ color: '#6B7A5E' }}>Subtle shadows and layering create depth without visual heaviness.</p>
            </div>
            
            <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
              <div className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center" style={{ backgroundColor: '#ACBAA1' }}>
                <span style={{ color: '#4D5D53' }} className="font-bold text-lg">◊</span>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#4D5D53' }}>Tactile Elements</h3>
              <p style={{ color: '#6B7A5E' }}>Components feel textured and weighted, inviting interaction.</p>
            </div>
            
            <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
              <div className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center" style={{ backgroundColor: '#9BAA94' }}>
                <span style={{ color: '#4D5D53' }} className="font-bold text-lg">◌</span>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#4D5D53' }}>Breathing Space</h3>
              <p style={{ color: '#6B7A5E' }}>Generous spacing creates a luxurious, uncluttered experience.</p>
            </div>
            
            <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
              <div className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center" style={{ backgroundColor: '#BDC9BB' }}>
                <span style={{ color: '#4D5D53' }} className="font-bold text-lg">◐</span>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#4D5D53' }}>Micro-interactions</h3>
              <p style={{ color: '#6B7A5E' }}>Subtle, organic animations that respond naturally to user input.</p>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            Color System
          </h2>
          <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <ColorPalette />
          </div>
        </div>

        {/* Button Component Showcase */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            Button Component
          </h2>
          <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="space-y-8">
              
              {/* Variants */}
              <div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#4D5D53' }}>Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary Action</Button>
                  <Button variant="secondary">Secondary Action</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="accent">Accent Button</Button>
                </div>
              </div>
              
              {/* Sizes */}
              <div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#4D5D53' }}>Sizes</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>
              
              {/* Interactive Example */}
              <div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#4D5D53' }}>Interactive Example</h3>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant="primary" 
                    onClick={() => alert('Button clicked! Notice the smooth scaling animation.')}
                  >
                    Click Me
                  </Button>
                  <Button 
                    variant="accent" 
                    onClick={() => alert('Accent button clicked!')}
                  >
                    Try This Too
                  </Button>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm" style={{ color: '#8F9779' }}>
            This is the foundation of our design system. More components coming soon!
          </p>
        </div>
        
      </div>
    </div>
  )
}

export default App
