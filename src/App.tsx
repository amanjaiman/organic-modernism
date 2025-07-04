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
    primary: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl focus:ring-emerald-500",
    secondary: "bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 text-amber-900 shadow-md hover:shadow-lg focus:ring-amber-400 border border-amber-200",
    ghost: "bg-transparent hover:bg-stone-100 text-stone-700 hover:text-stone-900 focus:ring-stone-300",
    accent: "bg-gradient-to-r from-rose-200 to-pink-200 hover:from-rose-300 hover:to-pink-300 text-rose-900 shadow-md hover:shadow-lg focus:ring-rose-400"
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm rounded-xl",
    md: "px-6 py-3 text-base rounded-2xl",
    lg: "px-8 py-4 text-lg rounded-3xl"
  }
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Color Palette Display Component
const ColorPalette = () => {
  const colors = [
    { name: "Sage Primary", class: "bg-emerald-600", hex: "#059669" },
    { name: "Earth Warm", class: "bg-amber-700", hex: "#B45309" },
    { name: "Terracotta", class: "bg-orange-600", hex: "#EA580C" },
    { name: "Vintage Cream", class: "bg-amber-50", hex: "#FFFBEB" },
    { name: "Champagne", class: "bg-yellow-100", hex: "#FEF3C7" },
    { name: "Soft Beige", class: "bg-stone-200", hex: "#E7E5E4" },
    { name: "Blush Pink", class: "bg-rose-200", hex: "#FECACA" },
    { name: "Lavender", class: "bg-purple-200", hex: "#E9D5FF" },
    { name: "Mint", class: "bg-emerald-200", hex: "#A7F3D0" },
    { name: "Peach", class: "bg-orange-200", hex: "#FED7AA" },
  ]
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {colors.map((color, index) => (
        <div key={index} className="text-center">
          <div className={`${color.class} h-20 w-full rounded-2xl shadow-md mb-2 border border-stone-300`}></div>
          <p className="text-sm font-medium text-stone-700">{color.name}</p>
          <p className="text-xs text-stone-500">{color.hex}</p>
        </div>
      ))}
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(250, 249, 245)' }}>
      <div className="container mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-stone-800 mb-4">
            Organic Modernism
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            A design language that blends natural harmony with modern precision
          </p>
        </div>

        {/* Design Philosophy */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-stone-800 mb-8 text-center">
            Design Philosophy
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-stone-200">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg">○</span>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">Organic Geometry</h3>
              <p className="text-stone-600">Blend natural, flowing shapes with precise geometric elements for visual harmony.</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-stone-200">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg">△</span>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">Layered Depth</h3>
              <p className="text-stone-600">Subtle shadows and layering create depth without visual heaviness.</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-stone-200">
              <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-pink-400 rounded-2xl mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg">◊</span>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">Tactile Elements</h3>
              <p className="text-stone-600">Components feel textured and weighted, inviting interaction.</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-stone-200">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-2xl mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg">◌</span>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">Breathing Space</h3>
              <p className="text-stone-600">Generous spacing creates a luxurious, uncluttered experience.</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-stone-200">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg">◐</span>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">Micro-interactions</h3>
              <p className="text-stone-600">Subtle, organic animations that respond naturally to user input.</p>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-stone-800 mb-8 text-center">
            Color Palette
          </h2>
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-stone-200">
            <ColorPalette />
          </div>
        </div>

        {/* Button Component Showcase */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-stone-800 mb-8 text-center">
            Button Component
          </h2>
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-stone-200">
            <div className="space-y-8">
              
              {/* Variants */}
              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-4">Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary Action</Button>
                  <Button variant="secondary">Secondary Action</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="accent">Accent Button</Button>
                </div>
              </div>
              
              {/* Sizes */}
              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-4">Sizes</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>
              
              {/* Interactive Example */}
              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-4">Interactive Example</h3>
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
          <p className="text-stone-500 text-sm">
            This is the foundation of our design system. More components coming soon!
          </p>
        </div>
        
      </div>
    </div>
  )
}

export default App
