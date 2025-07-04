import React, { useState, useEffect, useRef } from 'react'

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

// Liquid Transition Component
const LiquidButton = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  
  return (
    <button
      className="relative px-8 py-4 text-white font-medium text-lg rounded-3xl overflow-hidden cursor-pointer border-none focus:outline-none"
      style={{
        background: `linear-gradient(135deg, #78866B, #8F9779)`,
        transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        transform: isPressed ? 'scale(0.95)' : isHovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isHovered ? '0 20px 40px rgba(120, 134, 107, 0.3)' : '0 10px 20px rgba(120, 134, 107, 0.2)',
        borderRadius: isHovered ? '2rem' : '1.5rem'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
    >
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${isHovered ? '60% 40%' : '30% 70%'}, rgba(255,255,255,0.3) 0%, transparent 70%)`,
          transition: 'all 0.8s ease-out'
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  )
}

// Wind Effect Component
const WindyCard = ({ children }: { children: React.ReactNode }) => {
  const [windPhase, setWindPhase] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWindPhase(prev => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])
  
  const windX = Math.sin(windPhase * 0.02) * 2
  const windY = Math.cos(windPhase * 0.015) * 1
  const windRotation = Math.sin(windPhase * 0.01) * 0.5
  
  return (
    <div
      className="p-6 rounded-3xl shadow-lg border relative"
      style={{
        backgroundColor: '#FDFBF8',
        borderColor: '#F8F2E6',
        transform: `translate(${windX}px, ${windY}px) rotate(${windRotation}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {children}
    </div>
  )
}

// Irregular Shape Component
const IrregularShape = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative p-8 text-center">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #BDC9BB, #ACBAA1)',
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          transition: 'all 0.3s ease-out'
        }}
      />
      <div className="relative z-10 text-white font-medium">
        {children}
      </div>
    </div>
  )
}

// Vine-like Connector Component
const VineConnector = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-center">
      <svg width="200" height="80" viewBox="0 0 200 80" className="absolute">
        <path
          d="M0 40 Q50 10, 100 40 T200 40"
          stroke="#8F9779"
          strokeWidth="3"
          fill="none"
          strokeDasharray="5,5"
          className="animate-pulse"
        />
        <circle cx="20" cy="30" r="4" fill="#ACBAA1" className="animate-bounce" />
        <circle cx="100" cy="40" r="4" fill="#78866B" className="animate-bounce" style={{ animationDelay: '0.2s' }} />
        <circle cx="180" cy="30" r="4" fill="#ACBAA1" className="animate-bounce" style={{ animationDelay: '0.4s' }} />
      </svg>
    </div>
  )
}

// Gesture Card Component
const GestureCard = ({ children }: { children: React.ReactNode }) => {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    const rect = cardRef.current?.getBoundingClientRect()
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2
      })
    }
  }
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const rect = cardRef.current?.getBoundingClientRect()
    if (rect) {
      const newX = e.clientX - rect.left - rect.width / 2
      const newY = e.clientY - rect.top - rect.height / 2
      setDragOffset({ x: newX, y: newY })
      
      // Flip card if dragged far enough
      if (Math.abs(newX) > 100) {
        setIsFlipped(true)
      }
    }
  }
  
  const handleMouseUp = () => {
    setIsDragging(false)
    setDragOffset({ x: 0, y: 0 })
    setTimeout(() => setIsFlipped(false), 2000) // Reset flip after 2 seconds
  }
  
  return (
    <div
      ref={cardRef}
      className="w-64 h-40 cursor-grab active:cursor-grabbing relative perspective-1000"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className={`w-full h-full rounded-2xl shadow-xl transition-all duration-300 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{
          transform: `translate(${dragOffset.x * 0.1}px, ${dragOffset.y * 0.1}px) rotateX(${dragOffset.y * 0.1}deg) rotateY(${dragOffset.x * 0.1}deg)`,
          transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          backgroundColor: '#F8F2E6',
          border: '1px solid #F3ECE0'
        }}
      >
        <div className="absolute inset-0 p-6 flex items-center justify-center backface-hidden">
          <div style={{ color: '#4D5D53' }}>{children}</div>
        </div>
        <div className="absolute inset-0 p-6 flex items-center justify-center backface-hidden rotate-y-180 rounded-2xl" style={{ backgroundColor: '#BDC9BB' }}>
          <div style={{ color: '#4D5D53' }}>Card Flipped! 🌿</div>
        </div>
      </div>
    </div>
  )
}

// Pressure-Sensitive Button
const PressureButton = ({ children, onPressComplete }: { children: React.ReactNode, onPressComplete?: () => void }) => {
  const [pressTime, setPressTime] = useState(0)
  const [isPressed, setIsPressed] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const pressInterval = useRef<number>()
  
  const handleMouseDown = () => {
    setIsPressed(true)
    setIsComplete(false)
    setPressTime(0)
    
    pressInterval.current = setInterval(() => {
      setPressTime(prev => {
        const newTime = prev + 10
        if (newTime >= 2000) {
          setIsComplete(true)
          if (onPressComplete) {
            onPressComplete()
          }
          if (pressInterval.current) {
            clearInterval(pressInterval.current)
          }
        }
        return newTime
      })
    }, 10)
  }
  
  const handleMouseUp = () => {
    setIsPressed(false)
    if (pressInterval.current) {
      clearInterval(pressInterval.current)
    }
    if (!isComplete) {
      setPressTime(0)
    }
  }
  
  const progress = Math.min(pressTime / 2000, 1)
  
  return (
    <button
      className="relative px-8 py-4 rounded-2xl font-medium text-lg overflow-hidden focus:outline-none"
      style={{
        backgroundColor: isComplete ? '#78866B' : '#BDC9BB',
        color: isComplete ? 'white' : '#4D5D53',
        transform: `scale(${isPressed ? 0.95 : 1})`,
        transition: 'all 0.2s ease-out'
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="absolute inset-0 transition-all duration-75"
        style={{
          background: `linear-gradient(to right, #78866B ${progress * 100}%, transparent ${progress * 100}%)`,
          opacity: 0.3
        }}
      />
      <span className="relative z-10">
        {isComplete ? '✓ Complete!' : `${children} (${Math.round(progress * 100)}%)`}
      </span>
    </button>
  )
}

// Magnetic Snap Component
const MagneticSnap = () => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [snapTargets, setSnapTargets] = useState<{[key: string]: boolean}>({})
  const [positions, setPositions] = useState<{[key: string]: {x: number, y: number}}>({
    item1: { x: 50, y: 50 },
    item2: { x: 150, y: 50 },
    item3: { x: 250, y: 50 }
  })
  
  const snapZones = [
    { id: 'zone1', x: 75, y: 150, width: 60, height: 60 },
    { id: 'zone2', x: 175, y: 150, width: 60, height: 60 },
    { id: 'zone3', x: 275, y: 150, width: 60, height: 60 }
  ]
  
  const handleDrag = (itemId: string, e: React.MouseEvent) => {
    if (draggedItem !== itemId) return
    
    const rect = e.currentTarget.parentElement?.getBoundingClientRect()
    if (!rect) return
    
    const x = e.clientX - rect.left - 15
    const y = e.clientY - rect.top - 15
    
    setPositions(prev => ({ ...prev, [itemId]: { x, y } }))
    
    // Check for snap zones
    const newSnapTargets: {[key: string]: boolean} = {}
    snapZones.forEach(zone => {
      const distance = Math.sqrt(Math.pow(x - zone.x, 2) + Math.pow(y - zone.y, 2))
      newSnapTargets[zone.id] = distance < 40
    })
    setSnapTargets(newSnapTargets)
  }
  
  const handleDragEnd = (itemId: string) => {
    setDraggedItem(null)
    
    // Snap to nearest zone if close enough
    let snapped = false
    snapZones.forEach(zone => {
      const pos = positions[itemId]
      const distance = Math.sqrt(Math.pow(pos.x - zone.x, 2) + Math.pow(pos.y - zone.y, 2))
      if (distance < 40) {
        setPositions(prev => ({ ...prev, [itemId]: { x: zone.x, y: zone.y } }))
        snapped = true
      }
    })
    
    setSnapTargets({})
  }
  
  return (
    <div className="relative w-full h-64 rounded-2xl border-2 border-dashed" style={{ borderColor: '#E8ECDE', backgroundColor: '#FDFBF8' }}>
      {/* Snap Zones */}
      {snapZones.map(zone => (
        <div
          key={zone.id}
          className="absolute rounded-xl border-2 transition-all duration-200"
          style={{
            left: zone.x,
            top: zone.y,
            width: zone.width,
            height: zone.height,
            borderColor: snapTargets[zone.id] ? '#78866B' : '#E8ECDE',
            backgroundColor: snapTargets[zone.id] ? '#F4F6F2' : 'transparent'
          }}
        />
      ))}
      
      {/* Draggable Items */}
      {Object.entries(positions).map(([itemId, pos]) => (
        <div
          key={itemId}
          className="absolute w-8 h-8 rounded-full cursor-grab active:cursor-grabbing transition-all duration-200"
          style={{
            left: pos.x,
            top: pos.y,
            backgroundColor: '#8F9779',
            transform: draggedItem === itemId ? 'scale(1.2)' : 'scale(1)',
            zIndex: draggedItem === itemId ? 10 : 1
          }}
          onMouseDown={() => setDraggedItem(itemId)}
          onMouseMove={(e) => handleDrag(itemId, e)}
          onMouseUp={() => handleDragEnd(itemId)}
        />
      ))}
    </div>
  )
}

// Elastic Feedback Component
const ElasticButton = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
  const [isClicked, setIsClicked] = useState(false)
  
  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 600)
    if (onClick) {
      onClick()
    }
  }
  
  return (
    <button
      className="px-8 py-4 rounded-2xl font-medium text-lg focus:outline-none"
      style={{
        backgroundColor: '#BDC9BB',
        color: '#4D5D53',
        transform: isClicked ? 'scale(0.9)' : 'scale(1)',
        transition: 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        boxShadow: isClicked ? '0 5px 15px rgba(189, 201, 187, 0.4)' : '0 10px 25px rgba(189, 201, 187, 0.3)'
      }}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

// Time-Aware Component
const TimeAwareGreeting = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  
  const hour = currentTime.getHours()
  const getGreeting = () => {
    if (hour < 12) return { text: 'Good Morning', color: '#EED8AE', bg: '#FDFBF8' }
    if (hour < 17) return { text: 'Good Afternoon', color: '#8F9779', bg: '#F4F6F2' }
    return { text: 'Good Evening', color: '#78866B', bg: '#E8ECDE' }
  }
  
  const greeting = getGreeting()
  
  return (
    <div
      className="p-6 rounded-3xl shadow-lg border transition-all duration-1000"
      style={{
        backgroundColor: greeting.bg,
        borderColor: '#F3ECE0'
      }}
    >
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-2" style={{ color: greeting.color }}>
          {greeting.text}
        </h3>
        <p style={{ color: '#6B7A5E' }}>
          {currentTime.toLocaleTimeString()}
        </p>
      </div>
    </div>
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

        {/* NEW: Unique Interaction Components */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            Unique Interaction Components
          </h2>
          
          {/* Liquid Transitions */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
              Liquid Transitions
            </h3>
            <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
              <div className="flex flex-wrap gap-6 items-center justify-center">
                <LiquidButton onClick={() => alert('Liquid button clicked! Notice the morphing effect.')}>
                  Liquid Button
                </LiquidButton>
                <div className="text-center">
                  <p style={{ color: '#6B7A5E' }}>Hover and click to experience the liquid morphing animation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Wind Effects */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
              Wind Effects
            </h3>
            <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
              <div className="flex flex-wrap gap-6 items-center justify-center">
                <WindyCard>
                  <div className="text-center">
                    <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>Gentle Breeze</h4>
                    <p style={{ color: '#6B7A5E' }}>This card sways naturally like leaves in the wind</p>
                  </div>
                </WindyCard>
                <WindyCard>
                  <div className="text-center">
                    <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>Organic Motion</h4>
                    <p style={{ color: '#6B7A5E' }}>Continuous, subtle movement creates life</p>
                  </div>
                </WindyCard>
              </div>
            </div>
          </div>

          {/* Irregular Shapes */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
              Irregular Shapes
            </h3>
            <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
              <div className="flex flex-wrap gap-6 items-center justify-center">
                <IrregularShape>
                  <div>Hexagon Shape</div>
                </IrregularShape>
                <div className="text-center">
                  <p style={{ color: '#6B7A5E' }}>Organic, non-geometric shapes create visual interest</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vine-like Connectors */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
              Vine-like Connectors
            </h3>
            <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
              <VineConnector />
              <div className="text-center mt-4">
                <p style={{ color: '#6B7A5E' }}>Organic curves connect elements naturally</p>
              </div>
            </div>
          </div>

          {/* Time-Aware UI */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
              Time-Aware UI
            </h3>
            <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
              <div className="flex justify-center">
                <TimeAwareGreeting />
              </div>
              <div className="text-center mt-4">
                <p style={{ color: '#6B7A5E' }}>Components adapt their appearance based on time of day</p>
              </div>
            </div>
          </div>

          {/* Gesture Cards */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
              Gesture Cards
            </h3>
            <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
              <div className="flex justify-center">
                <GestureCard>
                  <div className="text-center">
                    <h4 className="text-lg font-semibold mb-2">Swipe Me!</h4>
                    <p>Drag to experience journal-like page turning</p>
                  </div>
                </GestureCard>
              </div>
              <div className="text-center mt-4">
                <p style={{ color: '#6B7A5E' }}>Drag the card to experience 3D rotation and flipping</p>
              </div>
            </div>
          </div>

          {/* Pressure-Sensitive Buttons */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
              Pressure-Sensitive Buttons
            </h3>
            <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
              <div className="flex justify-center">
                <PressureButton onPressComplete={() => alert('Pressure action completed!')}>
                  Hold Me
                </PressureButton>
              </div>
              <div className="text-center mt-4">
                <p style={{ color: '#6B7A5E' }}>Hold the button for 2 seconds to complete the action</p>
              </div>
            </div>
          </div>

          {/* Magnetic Snap */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
              Magnetic Snap
            </h3>
            <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
              <MagneticSnap />
              <div className="text-center mt-4">
                <p style={{ color: '#6B7A5E' }}>Drag the circles near the snap zones to feel the magnetic effect</p>
              </div>
            </div>
          </div>

          {/* Elastic Feedback */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
              Elastic Feedback
            </h3>
            <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
              <div className="flex justify-center">
                <ElasticButton onClick={() => alert('Elastic button clicked! Feel the bounce!')}>
                  Elastic Button
                </ElasticButton>
              </div>
              <div className="text-center mt-4">
                <p style={{ color: '#6B7A5E' }}>Click to experience satisfying bounce-back animation</p>
              </div>
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
