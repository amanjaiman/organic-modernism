import React, { useState, useEffect, useRef } from 'react'
import { 
  Button, LiquidButton, PressureButton, 
  Input, Textarea, 
  Select, MultiSelect,
  Checkbox, PressureCheckbox,
  Radio,
  Card, LiquidCard, GestureCard,
  Navigation, SideNav, FloatingNav, Breadcrumb, Pagination, Tabs,
  Modal, LiquidModal, RippleToast, ToastContainer, Tooltip, Alert,
  Badge, LiquidBadge, RippleBadge,
  Avatar, LiquidAvatar, RippleAvatar,
  Progress, CircularProgress, LiquidProgress, RippleProgress,
  Accordion, LiquidAccordion, createAccordionItem,
  Stepper, VineStepper, createStepperStep,
  Table, LiquidTable,
  FileUpload,
  Search
} from './components'
import type { SideNavItem, FloatingNavItem, ToastProps } from './components'

// Lowkey Font Switcher - Press 'F' key to toggle fonts
const useFontSwitcher = () => {
  const [currentFont, setCurrentFont] = useState('system')
  
  const toggleFont = () => {
    const root = document.documentElement
    const newFont = currentFont === 'system' ? 'nunito' : 'system'
    
    if (newFont === 'nunito') {
      root.style.setProperty('--font-primary', 'var(--font-nunito)')
      root.style.setProperty('--font-heading', 'var(--font-nunito)')
      root.style.setProperty('--font-body', 'var(--font-nunito)')
    } else {
      root.style.setProperty('--font-primary', 'var(--font-system)')
      root.style.setProperty('--font-heading', 'var(--font-system)')
      root.style.setProperty('--font-body', 'var(--font-system)')
    }
    
    setCurrentFont(newFont)
  }
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Only trigger if not typing in an input field
        const target = e.target as HTMLElement
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && !target.isContentEditable) {
          toggleFont()
        }
      }
    }
    
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [currentFont])
  
  return currentFont
}

// Ripple Growth Component
const RippleGrowth = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
  const [ripples, setRipples] = useState<Array<{ id: number, x: number, y: number, size: number }>>([])
  const containerRef = useRef<HTMLDivElement>(null)
  
  const handleClick = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const newRipple = {
        id: Date.now(),
        x,
        y,
        size: 0
      }
      
      setRipples(prev => [...prev, newRipple])
      
      // Animate ripple growth with organic timing
      let startTime = Date.now()
      
      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000
        const maxSize = 200
        
        // Organic growth with slight irregularity
        const baseSize = Math.min(elapsed * 150, maxSize)
        const organicVariation = Math.sin(elapsed * 8) * 5
        const finalSize = baseSize + organicVariation
        
        setRipples(prev => 
          prev.map(ripple => 
            ripple.id === newRipple.id 
              ? { ...ripple, size: finalSize }
              : ripple
          )
        )
        
        if (finalSize < maxSize) {
          requestAnimationFrame(animate)
        } else {
          // Remove ripple after animation
          setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id))
          }, 500)
        }
      }
      
      animate()
    }
    
    if (onClick) {
      onClick()
    }
  }
  
  return (
    <div
      ref={containerRef}
      className="relative p-6 rounded-3xl shadow-lg border cursor-pointer overflow-hidden"
      style={{
        backgroundColor: '#FDFBF8',
        borderColor: '#F8F2E6'
      }}
      onClick={handleClick}
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            borderRadius: '50%',
            border: '2px solid #8F9779',
            opacity: Math.max(0, 1 - ripple.size / 200),
            transition: 'opacity 0.3s ease-out'
          }}
        />
      ))}
      
      <div className="relative z-10">
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

// Local Gesture Card Component (for demo purposes)
const LocalGestureCard = ({ children }: { children: React.ReactNode }) => {
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



// Modal Size Example Component
const ModalSizeExample = ({ size }: { size: 'sm' | 'md' | 'lg' | 'xl' }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setIsOpen(true)}>
        {size.toUpperCase()}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`${size.toUpperCase()} Modal`}
        size={size}
      >
        <div className="space-y-4">
          <p style={{ color: '#6B7A5E' }}>
            This is a {size} sized modal demonstrating the size variant.
          </p>
          <div className="flex justify-end">
            <Button variant="primary" size="sm" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

// Modal Closable Example Component
const ModalClosableExample = ({ closable }: { closable: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setIsOpen(true)}>
        {closable ? 'Closable Modal' : 'Non-Closable Modal'}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={closable ? 'Closable Modal' : 'Non-Closable Modal'}
        size="md"
        closable={closable}
      >
        <div className="space-y-4">
          <p style={{ color: '#6B7A5E' }}>
            This modal is {closable ? 'closable' : 'non-closable'}. 
            {closable ? ' You can close it by clicking the X, pressing Escape, or clicking the backdrop.' : ' You must use the Close button to dismiss it.'}
          </p>
          <div className="flex justify-end">
            <Button variant="primary" size="sm" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

// Toast Position Example Component
const ToastPositionExample = ({ position }: { position: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center' }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([])
  
  const addToast = () => {
    const newToast: ToastProps = {
      id: Date.now().toString(),
      type: 'info',
      title: `${position} Toast`,
      message: `This toast appears at ${position}`,
      onClose: (id) => setToasts(prev => prev.filter(t => t.id !== id))
    }
    setToasts(prev => [...prev, newToast])
  }
  
  return (
    <>
      <Button variant="secondary" size="sm" onClick={addToast}>
        {position}
      </Button>
      <ToastContainer toasts={toasts} position={position} />
    </>
  )
}

// Toast Duration Example Component
const ToastDurationExample = ({ duration, label }: { duration: number, label: string }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([])
  
  const addToast = () => {
    const newToast: ToastProps = {
      id: Date.now().toString(),
      type: 'success',
      title: label,
      message: duration === 0 ? 'This toast will not auto-dismiss' : `Auto-dismisses in ${duration/1000}s`,
      duration,
      onClose: (id) => setToasts(prev => prev.filter(t => t.id !== id))
    }
    setToasts(prev => [...prev, newToast])
  }
  
  return (
    <div className="text-center space-y-4">
      <h4 className="text-lg font-semibold" style={{ color: '#4D5D53' }}>
        {label}
      </h4>
      <Button variant="secondary" size="sm" onClick={addToast}>
        Show Toast
      </Button>
      <ToastContainer toasts={toasts} position="top-right" />
    </div>
  )
}

// Tooltip Delay Example Component
const TooltipDelayExample = ({ delay, label }: { delay: number, label: string }) => {
  return (
    <div className="text-center space-y-4">
      <h4 className="text-lg font-semibold" style={{ color: '#4D5D53' }}>
        {label}
      </h4>
      <Tooltip content={`This tooltip has a ${delay}ms delay`} delay={delay}>
        <Button variant="secondary" size="sm">Hover Me</Button>
      </Tooltip>
    </div>
  )
}

// Dismissible Alert Example Component
const DismissibleAlertExample = ({ type, title }: { type: 'info' | 'warning', title: string }) => {
  const [isVisible, setIsVisible] = useState(true)
  
  if (!isVisible) {
    return (
      <div className="flex items-center justify-between p-4 rounded-2xl border" style={{ backgroundColor: '#F4F6F2', borderColor: '#E8ECDE' }}>
        <span style={{ color: '#6B7A5E' }}>Alert was dismissed</span>
        <Button variant="secondary" size="sm" onClick={() => setIsVisible(true)}>
          Show Again
        </Button>
      </div>
    )
  }
  
  return (
    <Alert 
      type={type} 
      title={title}
      dismissible
      onDismiss={() => setIsVisible(false)}
    >
      This is a dismissible {type} alert. Click the X to close it.
    </Alert>
  )
}

// FloatingNav Text Demo Component
const FloatingNavTextDemo = ({ variant, side }: { 
  variant: 'standard' | 'liquid' | 'organic', 
  side: 'left' | 'right',
  title: string, 
  description: string 
}) => {
  const [isVisible, setIsVisible] = useState(false)
  
  const textNavItems: FloatingNavItem[] = [
    {
      label: 'Home',
      active: true,
      onClick: () => console.log('Home clicked')
    },
    {
      label: 'About',
      onClick: () => console.log('About clicked')
    },
    {
      label: 'Services',
      badge: '5',
      onClick: () => console.log('Services clicked')
    },
    {
      label: 'Contact',
      onClick: () => console.log('Contact clicked')
    }
  ]
  
  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'} {variant.charAt(0).toUpperCase() + variant.slice(1)} Text FloatingNav
      </Button>
      
      {isVisible && (
        <>
          <FloatingNav
            items={textNavItems}
            variant={variant}
            side={side}
            size="md"
            displayMode="text"
            onItemClick={(item) => {
              console.log(`Clicked: ${item.label}`)
              if (item.onClick) item.onClick()
            }}
          />
          
          {/* Close button overlay */}
          <div className={`fixed top-4 z-[60] ${side === 'left' ? 'left-4' : 'right-4'}`}>
            <Button 
              variant="accent" 
              size="sm" 
              onClick={() => setIsVisible(false)}
              className="shadow-xl"
            >
              Close Text FloatingNav
            </Button>
          </div>
        </>
      )}
    </>
  )
}

// FloatingNav Demo Component
const FloatingNavDemo = ({ variant, side }: { 
  variant: 'standard' | 'liquid' | 'organic', 
  side: 'left' | 'right',
  title: string, 
  description: string 
}) => {
  const [isVisible, setIsVisible] = useState(false)
  
  const floatingNavItems: FloatingNavItem[] = [
    {
      label: 'Dashboard',
      icon: (
        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 2h5v5H2V2zm0 7h5v5H2V9zm7-7h5v5H9V2zm0 7h5v5H9V9z"/>
        </svg>
      ),
      active: true,
      onClick: () => console.log('Dashboard clicked')
    },
    {
      label: 'Analytics',
      icon: (
        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 14V2h2v12H2zm4-8v8h2V6H6zm4 2v6h2V8h-2zm4-4v10h2V4h-2z"/>
        </svg>
      ),
      badge: '3',
      onClick: () => console.log('Analytics clicked')
    },
    {
      label: 'Messages',
      icon: (
        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4l-2 2V4a2 2 0 0 1 2-2zm2 3v1h8V5H4zm0 2v1h8V7H4zm0 2v1h6V9H4z"/>
        </svg>
      ),
      badge: '12',
      onClick: () => console.log('Messages clicked')
    },
    {
      label: 'Profile',
      icon: (
        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3z"/>
        </svg>
      ),
      onClick: () => console.log('Profile clicked')
    },
    {
      label: 'Settings',
      icon: (
        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
        </svg>
      ),
      onClick: () => console.log('Settings clicked')
    }
  ]
  
  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'} {variant.charAt(0).toUpperCase() + variant.slice(1)} FloatingNav
      </Button>
      
      {isVisible && (
        <>
          <FloatingNav
            items={floatingNavItems}
            variant={variant}
            side={side}
            size="md"
            onItemClick={(item) => {
              console.log(`Clicked: ${item.label}`)
              if (item.onClick) item.onClick()
            }}
          />
          
          {/* Close button overlay */}
          <div className={`fixed top-4 z-[60] ${side === 'left' ? 'left-4' : 'right-4'}`}>
            <Button 
              variant="accent" 
              size="sm" 
              onClick={() => setIsVisible(false)}
              className="shadow-xl"
            >
              Close FloatingNav
            </Button>
          </div>
        </>
      )}
    </>
  )
}

// SideNav Demo Component
const SideNavDemo = ({ variant }: { 
  variant: 'standard' | 'liquid' | 'organic', 
  title: string, 
  description: string 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const sideNavItems: SideNavItem[] = [
    {
      label: 'Dashboard',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 2h5v5H2V2zm0 7h5v5H2V9zm7-7h5v5H9V2zm0 7h5v5H9V9z"/>
        </svg>
      ),
      active: true,
      href: '#dashboard'
    },
    {
      label: 'Analytics',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 14V2h2v12H2zm4-8v8h2V6H6zm4 2v6h2V8h-2zm4-4v10h2V4h-2z"/>
        </svg>
      ),
      badge: '3',
      children: [
        { label: 'Overview', href: '#analytics-overview' },
        { label: 'Reports', href: '#analytics-reports', badge: 'New' },
        { label: 'Insights', href: '#analytics-insights' }
      ]
    },
    {
      label: 'Content',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M4 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm1 3v1h6V5H5zm0 2v1h6V7H5zm0 2v1h4V9H5z"/>
        </svg>
      ),
      children: [
        { label: 'Articles', href: '#content-articles' },
        { label: 'Media', href: '#content-media' },
        { 
          label: 'Categories', 
          href: '#content-categories',
          children: [
            { label: 'Technology', href: '#cat-tech' },
            { label: 'Design', href: '#cat-design', active: variant === 'organic' },
            { label: 'Business', href: '#cat-business' }
          ]
        }
      ]
    },
    {
      label: 'Users',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3z"/>
        </svg>
      ),
      badge: '12',
      children: [
        { label: 'All Users', href: '#users-all' },
        { label: 'Admins', href: '#users-admins' },
        { label: 'Guests', href: '#users-guests' }
      ]
    },
    {
      label: 'Settings',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
        </svg>
      ),
      children: [
        { label: 'General', href: '#settings-general' },
        { label: 'Security', href: '#settings-security' },
        { label: 'Notifications', href: '#settings-notifications' }
      ]
    },
    {
      label: 'Help & Support',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
        </svg>
      ),
      href: '#help'
    }
  ]
  
  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setIsOpen(true)}>
        {variant.charAt(0).toUpperCase() + variant.slice(1)} SideNav
      </Button>
      
      {isOpen && (
        <SideNav
          items={sideNavItems}
          variant={variant}
          backdrop={true}
          onItemClick={(item) => {
            if (item.href) {
              console.log(`Clicked: ${item.label} (${item.href})`)
            }
          }}
          onCollapseToggle={(collapsed) => {
            console.log(`SideNav ${collapsed ? 'collapsed' : 'expanded'}`)
          }}
        />
      )}
      
      {/* Close button overlay */}
      {isOpen && (
        <div className="fixed top-4 right-4 z-[60]">
          <Button 
            variant="accent" 
            size="sm" 
            onClick={() => setIsOpen(false)}
            className="shadow-xl"
          >
            Close Demo
          </Button>
        </div>
      )}
    </>
  )
}

// Modal Example Components
const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button variant="primary" size="sm" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
        size="md"
      >
        <div className="space-y-4">
          <p style={{ color: '#6B7A5E' }}>
            This is a standard modal with clean design and smooth animations.
          </p>
          <div className="flex justify-end space-x-3">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

const LiquidModalExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button variant="primary" size="sm" onClick={() => setIsOpen(true)}>
        Open Liquid Modal
      </Button>
      <LiquidModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Liquid Modal"
        size="md"
      >
        <div className="space-y-4">
          <p style={{ color: '#6B7A5E' }}>
            This modal has liquid transitions and mouse tracking effects. Move your mouse around!
          </p>
          <div className="flex justify-end space-x-3">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </LiquidModal>
    </>
  )
}

// Toast Example Components
const ToastExample = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([])
  
  const addToast = (type: ToastProps['type'], title: string, message?: string) => {
    const newToast: ToastProps = {
      id: Date.now().toString(),
      type,
      title,
      message,
      onClose: (id) => setToasts(prev => prev.filter(t => t.id !== id))
    }
    setToasts(prev => [...prev, newToast])
  }
  
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={() => addToast('success', 'Success!', 'Action completed.')}
        >
          Success
        </Button>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={() => addToast('error', 'Error!', 'Something went wrong.')}
        >
          Error
        </Button>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={() => addToast('warning', 'Warning!', 'Please check input.')}
        >
          Warning
        </Button>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={() => addToast('info', 'Info', 'Helpful information.')}
        >
          Info
        </Button>
      </div>
      <ToastContainer toasts={toasts} position="top-right" />
    </>
  )
}

const RippleToastExample = () => {
  return (
    <div className="flex justify-center">
      <RippleToast
        id="demo-ripple"
        type="info"
        title="Demo Ripple Toast"
        message="Click me to see ripple effects!"
        duration={0}
        onClose={() => {}}
      />
    </div>
  )
}

// Morphing Cards Component
const MorphingCard = ({ children }: { children: React.ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [morphState, setMorphState] = useState({
    borderRadius: '24px',
    scaleX: 1,
    scaleY: 1
  })
  
  useEffect(() => {
    if (isHovered) {
      let animationFrame: number
      let startTime = Date.now()
      
      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000
        
        // Create organic morphing with sine waves
        const radiusVariation = Math.sin(elapsed * 2) * 8 + 24
        const scaleXVariation = 1 + Math.sin(elapsed * 1.5) * 0.02
        const scaleYVariation = 1 + Math.cos(elapsed * 1.8) * 0.02
        
        setMorphState({
          borderRadius: `${radiusVariation}px`,
          scaleX: scaleXVariation,
          scaleY: scaleYVariation
        })
        
        if (isHovered) {
          animationFrame = requestAnimationFrame(animate)
        }
      }
      
      animate()
      
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    } else {
      setMorphState({
        borderRadius: '24px',
        scaleX: 1,
        scaleY: 1
      })
    }
  }, [isHovered])
  
  return (
    <div
      className="p-6 shadow-lg border transition-all duration-300 cursor-pointer"
      style={{
        backgroundColor: '#F8F2E6',
        borderColor: '#F3ECE0',
        borderRadius: morphState.borderRadius,
        transform: `scale(${morphState.scaleX}, ${morphState.scaleY})`,
        transition: isHovered ? 'none' : 'all 0.3s ease-out'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ color: '#4D5D53' }}>
        {children}
      </div>
    </div>
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

// Scroll spy hook
const useScrollSpy = (elementIds: string[], offset: number = 100) => {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset

      // Find the section that's currently in view
      for (let i = elementIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(elementIds[i])
        if (element) {
          const { offsetTop } = element
          if (scrollPosition >= offsetTop) {
            setActiveId(elementIds[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [elementIds, offset])

  return activeId
}

// Smooth scroll utility
const scrollToSection = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (element) {
    const yOffset = -80 // Offset for fixed header if any
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

function App() {
  // Define section IDs for scroll spy
  const sectionIds = [
    'design-philosophy',
    'unique-interactions',
    'color-system',
    'buttons',
    'inputs',
    'selects',
    'checkboxes',
    'radios',
    'search',
    'navigation',
    'modals',
    'toasts',
    'tooltips',
    'alerts',
    'cards',
    'badges',
    'avatars',
    'tables',
    'file-uploads',
    'progress',
    'accordions',
    'steppers'
  ]
  
  const activeSection = useScrollSpy(sectionIds)
  
  // Define FloatingNav items - with icons for collapsible functionality
  const floatingNavItems: FloatingNavItem[] = [
    {
      label: 'Design Philosophy',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A6 6 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"/>
        </svg>
      ),
      active: activeSection === 'design-philosophy',
      onClick: () => scrollToSection('design-philosophy')
    },
    {
      label: 'Unique Interactions',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
        </svg>
      ),
      active: activeSection === 'unique-interactions',
      onClick: () => scrollToSection('unique-interactions')
    },
    {
      label: 'Color System',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM4 8a4 4 0 0 1 8 0H4z"/>
        </svg>
      ),
      active: activeSection === 'color-system',
      onClick: () => scrollToSection('color-system')
    },
    {
      label: 'Buttons',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm1 8V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z"/>
          <path d="M6 7.5a1.5 1.5 0 1 0 0 1h4a1.5 1.5 0 1 0 0-1H6z"/>
        </svg>
      ),
      active: activeSection === 'buttons',
      onClick: () => scrollToSection('buttons')
    },
    {
      label: 'Inputs',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11A.5.5 0 0 1 8 2zM6 7a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
        </svg>
      ),
      active: activeSection === 'inputs',
      onClick: () => scrollToSection('inputs')
    },
    {
      label: 'Selects',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h11A1.5 1.5 0 0 1 15 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5V4h12v-.5a.5.5 0 0 0-.5-.5h-11zM2 5v7.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V5H2z"/>
          <path d="M6 9.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5z"/>
          <path d="M12 3.5a.5.5 0 0 1-.5.5h-.5a.5.5 0 0 1 0-1h.5a.5.5 0 0 1 .5.5zm-1 3a.5.5 0 0 1 .5-.5h.5a.5.5 0 0 1 0 1h-.5a.5.5 0 0 1-.5-.5z"/>
        </svg>
      ),
      active: activeSection === 'selects',
      onClick: () => scrollToSection('selects')
    },
    {
      label: 'Checkboxes',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
        </svg>
      ),
      active: activeSection === 'checkboxes',
      onClick: () => scrollToSection('checkboxes')
    },
    {
      label: 'Radios',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6 8a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
        </svg>
      ),
      active: activeSection === 'radios',
      onClick: () => scrollToSection('radios')
    },
    {
      label: 'Search',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      ),
      active: activeSection === 'search',
      onClick: () => scrollToSection('search')
    },
    {
      label: 'Navigation',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 2h5v5H2V2zm0 7h5v5H2V9zm7-7h5v5H9V2zm0 7h5v5H9V9z"/>
        </svg>
      ),
      active: activeSection === 'navigation',
      onClick: () => scrollToSection('navigation')
    },
    {
      label: 'Modals',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M1.5 1A1.5 1.5 0 0 0 0 2.5v11A1.5 1.5 0 0 0 1.5 15h13a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 14.5 1h-13zm13 1a.5.5 0 0 1 .5.5V5H1V2.5a.5.5 0 0 1 .5-.5h13zM1 6h14v7.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V6z"/>
        </svg>
      ),
      active: activeSection === 'modals',
      onClick: () => scrollToSection('modals')
    },
    {
      label: 'Toasts',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
        </svg>
      ),
      active: activeSection === 'toasts',
      onClick: () => scrollToSection('toasts')
    },
    {
      label: 'Tooltips',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
        </svg>
      ),
      active: activeSection === 'tooltips',
      onClick: () => scrollToSection('tooltips')
    },
    {
      label: 'Alerts',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
      ),
      active: activeSection === 'alerts',
      onClick: () => scrollToSection('alerts')
    },
    {
      label: 'Cards',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
          <path d="M2 5.5v6h12v-6H2zm1 1h10v4H3v-4z"/>
          <path d="M5 8.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
        </svg>
      ),
      active: activeSection === 'cards',
      onClick: () => scrollToSection('cards')
    },
    {
      label: 'Badges',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
          <path d="M6.5 4.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
        </svg>
      ),
      active: activeSection === 'badges',
      onClick: () => scrollToSection('badges')
    },
    {
      label: 'Avatars',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
        </svg>
      ),
      active: activeSection === 'avatars',
      onClick: () => scrollToSection('avatars')
    },
    {
      label: 'Tables',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm0 4v3h4V8H6z"/>
        </svg>
      ),
      active: activeSection === 'tables',
      onClick: () => scrollToSection('tables')
    },
    {
      label: 'File Uploads',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
          <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
        </svg>
      ),
      active: activeSection === 'file-uploads',
      onClick: () => scrollToSection('file-uploads')
    },
    {
      label: 'Progress',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
        </svg>
      ),
      active: activeSection === 'progress',
      onClick: () => scrollToSection('progress')
    },
    {
      label: 'Accordions',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
        </svg>
      ),
      active: activeSection === 'accordions',
      onClick: () => scrollToSection('accordions')
    },
    {
      label: 'Steppers',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/>
        </svg>
      ),
      active: activeSection === 'steppers',
      onClick: () => scrollToSection('steppers')
    }
  ]

  const handleFloatingNavItemClick = (item: FloatingNavItem) => {
    if (item.onClick) {
      item.onClick()
    }
  }

  const currentFont = useFontSwitcher()
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(250, 249, 245)' }}>
      {/* Floating Navigation - collapsible */}
      <FloatingNav
        items={floatingNavItems}
        variant="organic"
        side="right"
        size="md"
        displayMode="text"
        collapsible={true}
        onItemClick={handleFloatingNavItemClick}
      />

      <div className="container mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#4D5D53' }}>
            Organic Modernism
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#6B7A5E' }}>
            A design language that blends natural harmony with modern precision
          </p>
          <p className="text-sm mt-4 opacity-60" style={{ color: '#6B7A5E' }}>
            Press 'F' to toggle fonts • Currently: {currentFont === 'system' ? 'System Default' : 'Nunito Sans'}
          </p>
        </div>

        {/* Design Philosophy */}
        <div id="design-philosophy" className="mb-16">
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
        <div id="unique-interactions" className="mb-16">
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

          {/* Ripple Growth */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
              Ripple Growth
            </h3>
            <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
              <div className="flex flex-wrap gap-6 items-center justify-center">
                <RippleGrowth onClick={() => alert('Ripple clicked! Watch the organic growth!')}>
                  <div className="text-center">
                    <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>Click Me!</h4>
                    <p style={{ color: '#6B7A5E' }}>Organic ripples grow from your click point</p>
                  </div>
                </RippleGrowth>
                <RippleGrowth onClick={() => alert('Another ripple effect!')}>
                  <div className="text-center">
                    <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>Try This Too!</h4>
                    <p style={{ color: '#6B7A5E' }}>Each click creates unique ripple patterns</p>
                  </div>
                </RippleGrowth>
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
                <LocalGestureCard>
                  <div className="text-center">
                    <h4 className="text-lg font-semibold mb-2">Swipe Me!</h4>
                    <p>Drag to experience journal-like page turning</p>
                  </div>
                </LocalGestureCard>
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

          {/* Morphing Cards */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
              Morphing Cards
            </h3>
            <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
              <div className="flex flex-wrap gap-6 justify-center">
                <MorphingCard>
                  <div className="text-center">
                    <h4 className="text-lg font-semibold mb-2">Hover Me!</h4>
                    <p>Watch me breathe and morph organically</p>
                  </div>
                </MorphingCard>
                <MorphingCard>
                  <div className="text-center">
                    <h4 className="text-lg font-semibold mb-2">Living Shapes</h4>
                    <p>Cards that adapt like organic forms</p>
                  </div>
                </MorphingCard>
              </div>
              <div className="text-center mt-4">
                <p style={{ color: '#6B7A5E' }}>Hover over cards to see them morph and breathe naturally</p>
              </div>
            </div>
          </div>

        </div>

        {/* Color Palette */}
        <div id="color-system" className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            Color System
          </h2>
          <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <ColorPalette />
          </div>
        </div>

        {/* Button Component Showcase */}
        <div id="buttons" className="mb-16">
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
              
              {/* Semantic Variants */}
              <div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#4D5D53' }}>Semantic Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="success">Save Changes</Button>
                  <Button variant="warning">Proceed with Caution</Button>
                  <Button variant="error">Delete Item</Button>
                  <Button variant="info">Learn More</Button>
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
                  <Button 
                    variant="success" 
                    onClick={() => alert('Success action completed!')}
                  >
                    Complete Action
                  </Button>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Input Component Showcase */}
        <div id="inputs" className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            Input Components
          </h2>
          <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="space-y-12">
              
              {/* Basic Input with Static Liquid Effects */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Input with Static Liquid Effects</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    helperText="Static liquid glow on focus"
                  />
                  <Input
                    label="Password"
                    type="password"
                    required
                    helperText="Clean liquid styling with top labels"
                  />
                </div>
              </div>

              {/* Textarea with Static Liquid Effects */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Textarea with Static Liquid Effects</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Textarea
                    label="Message"
                    placeholder="Type your message..."
                    helperText="Auto-resizes with liquid glow"
                    maxLength={200}
                    showCharacterCount={true}
                  />
                  <Textarea
                    label="Feedback"
                    placeholder="Share your thoughts..."
                    helperText="Character counter morphs near limit"
                    maxLength={100}
                    showCharacterCount={true}
                  />
                </div>
              </div>

              {/* Input Sizes */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Input Sizes</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Input
                    label="Small Input"
                    size="sm"
                    placeholder="Small size"
                    helperText="Size: sm"
                  />
                  <Input
                    label="Medium Input"
                    size="md"
                    placeholder="Medium size"
                    helperText="Size: md (default)"
                  />
                  <Input
                    label="Large Input"
                    size="lg"
                    placeholder="Large size"
                    helperText="Size: lg"
                  />
                </div>
              </div>

              {/* Textarea Sizes */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Textarea Sizes</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Textarea
                    label="Small Textarea"
                    size="sm"
                    placeholder="Small size textarea..."
                    helperText="Size: sm"
                    maxLength={100}
                    showCharacterCount={true}
                  />
                  <Textarea
                    label="Medium Textarea"
                    size="md"
                    placeholder="Medium size textarea..."
                    helperText="Size: md (default)"
                    maxLength={150}
                    showCharacterCount={true}
                  />
                  <Textarea
                    label="Large Textarea"
                    size="lg"
                    placeholder="Large size textarea..."
                    helperText="Size: lg"
                    maxLength={200}
                    showCharacterCount={true}
                  />
                </div>
              </div>

              {/* States Demo */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Input States</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Input
                    label="Error State"
                    error="This field is required"
                    placeholder="Enter value"
                  />
                  <Input
                    label="Success State"
                    success="Valid input!"
                    defaultValue="Valid value"
                  />
                  <Input
                    label="Disabled State"
                    disabled
                    placeholder="Cannot edit"
                  />
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Select Component Showcase */}
        <div id="selects" className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            Select Components
          </h2>
          <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="space-y-12">
              
              {/* Standard Select */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Standard Select</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Select
                    label="Choose Framework"
                    placeholder="Select a framework..."
                    options={[
                      { value: 'react', label: 'React' },
                      { value: 'vue', label: 'Vue.js' },
                      { value: 'angular', label: 'Angular' },
                      { value: 'svelte', label: 'Svelte' }
                    ]}
                    helperText="Select your preferred frontend framework"
                  />
                  <Select
                    label="Searchable Select"
                    placeholder="Search frameworks..."
                    options={[
                      { value: 'react', label: 'React' },
                      { value: 'vue', label: 'Vue.js' },
                      { value: 'angular', label: 'Angular' },
                      { value: 'svelte', label: 'Svelte' },
                      { value: 'nextjs', label: 'Next.js' },
                      { value: 'nuxt', label: 'Nuxt.js' }
                    ]}
                    searchable
                    helperText="Type to search through options"
                  />
                </div>
              </div>

                             {/* MultiSelect */}
               <div>
                 <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>MultiSelect</h3>
                 <div className="grid md:grid-cols-2 gap-6">
                   <MultiSelect
                     label="Choose Multiple Frameworks"
                     placeholder="Select frameworks..."
                     options={[
                       { value: 'react', label: 'React' },
                       { value: 'vue', label: 'Vue.js' },
                       { value: 'angular', label: 'Angular' },
                       { value: 'svelte', label: 'Svelte' },
                       { value: 'nextjs', label: 'Next.js' }
                     ]}
                     helperText="Select multiple frameworks with visual selection indicators"
                   />
                   <MultiSelect
                     label="Limited Selection (Max 3)"
                     placeholder="Select up to 3..."
                     options={[
                       { value: 'us', label: 'United States' },
                       { value: 'ca', label: 'Canada' },
                       { value: 'uk', label: 'United Kingdom' },
                       { value: 'de', label: 'Germany' },
                       { value: 'fr', label: 'France' }
                     ]}
                     maxSelections={3}
                     helperText="You can select up to 3 countries"
                   />
                 </div>
               </div>

              {/* Select Sizes */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Select Sizes</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Select
                    label="Small Select"
                    size="sm"
                    placeholder="Small size"
                    options={[
                      { value: 'option1', label: 'Option 1' },
                      { value: 'option2', label: 'Option 2' }
                    ]}
                    helperText="Size: sm"
                  />
                  <Select
                    label="Medium Select"
                    size="md"
                    placeholder="Medium size"
                    options={[
                      { value: 'option1', label: 'Option 1' },
                      { value: 'option2', label: 'Option 2' }
                    ]}
                    helperText="Size: md (default)"
                  />
                  <Select
                    label="Large Select"
                    size="lg"
                    placeholder="Large size"
                    options={[
                      { value: 'option1', label: 'Option 1' },
                      { value: 'option2', label: 'Option 2' }
                    ]}
                    helperText="Size: lg"
                  />
                </div>
              </div>

              {/* Select States */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Select States</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Select
                    label="Error State"
                    error="Please select a valid option"
                    placeholder="Select..."
                    options={[
                      { value: 'option1', label: 'Option 1' },
                      { value: 'option2', label: 'Option 2' }
                    ]}
                  />
                  <Select
                    label="Success State"
                    success="Great choice!"
                    defaultValue="option1"
                    options={[
                      { value: 'option1', label: 'Option 1' },
                      { value: 'option2', label: 'Option 2' }
                    ]}
                  />
                  <Select
                    label="Disabled State"
                    disabled
                    placeholder="Cannot select"
                    options={[
                      { value: 'option1', label: 'Option 1' },
                      { value: 'option2', label: 'Option 2' }
                    ]}
                  />
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Checkbox Component Showcase */}
        <div id="checkboxes" className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            Checkbox Components
          </h2>
          <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="space-y-12">
              
              {/* Standard Checkboxes */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Standard Checkboxes</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Checkbox
                      label="I agree to the terms and conditions"
                      required
                      helperText="You must agree to continue"
                    />
                    <Checkbox
                      label="Subscribe to newsletter"
                      helperText="Get weekly updates about new features"
                    />
                    <Checkbox
                      label="Enable notifications"
                      defaultChecked
                      helperText="Receive push notifications"
                    />
                  </div>
                  <div className="space-y-4">
                    <Checkbox
                      label="Small checkbox"
                      size="sm"
                      helperText="Size: sm"
                    />
                    <Checkbox
                      label="Large checkbox"
                      size="lg"
                      helperText="Size: lg"
                    />
                    <Checkbox
                      label="Disabled checkbox"
                      disabled
                      helperText="This checkbox is disabled"
                    />
                  </div>
                </div>
              </div>

              {/* Pressure Checkboxes */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
                  Pressure Checkboxes
                  <span className="text-sm font-normal ml-2" style={{ color: '#6B7A5E' }}>
                    (Hold to complete)
                  </span>
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <PressureCheckbox
                      label="Important decision"
                      helperText="Hold to confirm this important choice"
                      holdDuration={1000}
                    />
                    <PressureCheckbox
                      label="Quick confirmation"
                      helperText="Quick confirmation (0.5s hold)"
                      holdDuration={500}
                    />
                  </div>
                  <div className="space-y-4">
                    <PressureCheckbox
                      label="Delete confirmation"
                      helperText="Long hold required for safety (1.5s)"
                      holdDuration={1500}
                      size="lg"
                    />
                    <PressureCheckbox
                      label="Small pressure checkbox"
                      size="sm"
                      helperText="Small size with pressure feedback"
                    />
                  </div>
                </div>
              </div>

              {/* Checkbox States */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Checkbox States</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Checkbox
                    label="Error state"
                    error="This field is required"
                    helperText="Please check this box"
                  />
                  <Checkbox
                    label="Success state"
                    success="Verified successfully"
                    defaultChecked
                    helperText="This option is validated"
                  />
                  <Checkbox
                    label="Disabled & checked"
                    disabled
                    defaultChecked
                    helperText="This checkbox is disabled"
                  />
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Radio Component Showcase */}
        <div id="radios" className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            Radio Components
          </h2>
          <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="space-y-12">
              
              {/* Standard Radio Groups */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Radio Button Groups</h3>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* Experience Level - 4 options, display vertically */}
                  <div className="max-w-md">
                    <Radio
                      name="experience"
                      options={[
                        { value: 'beginner', label: 'Beginner (0-1 years)' },
                        { value: 'intermediate', label: 'Intermediate (1-3 years)' },
                        { value: 'advanced', label: 'Advanced (3-5 years)' },
                        { value: 'expert', label: 'Expert (5+ years)' }
                      ]}
                      helperText="Select your experience level"
                    />
                  </div>
                  
                  {/* Plan Selection - 4 options, display vertically */}
                  <div className="max-w-md">
                    <Radio
                      name="plan"
                      options={[
                        { value: 'free', label: 'Free Plan' },
                        { value: 'pro', label: 'Pro Plan ($9/month)' },
                        { value: 'enterprise', label: 'Enterprise Plan ($29/month)' },
                        { value: 'custom', label: 'Custom Plan', disabled: true }
                      ]}
                      helperText="Choose your subscription plan"
                    />
                  </div>
                </div>
              </div>

              {/* Radio Sizes */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Radio Sizes</h3>
                <div className="grid md:grid-cols-3 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <Radio
                      name="theme-sm"
                      options={[
                        { value: 'light', label: 'Light Theme' },
                        { value: 'dark', label: 'Dark Theme' }
                      ]}
                      size="sm"
                      helperText="Size: sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Radio
                      name="theme-md"
                      options={[
                        { value: 'light', label: 'Light Theme' },
                        { value: 'dark', label: 'Dark Theme' }
                      ]}
                      size="md"
                      helperText="Size: md (default)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Radio
                      name="theme-lg"
                      options={[
                        { value: 'light', label: 'Light Theme' },
                        { value: 'dark', label: 'Dark Theme' }
                      ]}
                      size="lg"
                      helperText="Size: lg"
                    />
                  </div>
                </div>
              </div>

              {/* Radio States */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Radio States</h3>
                <div className="grid md:grid-cols-3 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <Radio
                      name="error-example"
                      options={[
                        { value: 'option1', label: 'Option 1' },
                        { value: 'option2', label: 'Option 2' }
                      ]}
                      error="Please select an option"
                      helperText="This radio group has an error"
                    />
                  </div>
                  <div className="space-y-2">
                    <Radio
                      name="success-example"
                      options={[
                        { value: 'option1', label: 'Option 1' },
                        { value: 'option2', label: 'Option 2' }
                      ]}
                      success="Great choice!"
                      defaultValue="option1"
                      helperText="This radio group shows success"
                    />
                  </div>
                  <div className="space-y-2">
                    <Radio
                      name="disabled-example"
                      options={[
                        { value: 'option1', label: 'Option 1' },
                        { value: 'option2', label: 'Option 2' }
                      ]}
                      disabled
                      helperText="This radio group is disabled"
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Search Component Showcase */}
        <div id="search" className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            Search Components
          </h2>
          <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="space-y-12">
              
              {/* Standard Search */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Standard Search</h3>
                <div className="space-y-8">
                  
                  {/* Basic Search */}
                  <div>
                    <h4 className="text-lg font-medium mb-4" style={{ color: '#4D5D53' }}>Basic Search</h4>
                    <div className="max-w-md">
                      <Search
                        placeholder="Search documentation..."
                        suggestions={[
                          { id: '1', text: 'Design Systems', category: 'Documentation' },
                          { id: '2', text: 'React Components', category: 'Development' },
                          { id: '3', text: 'TypeScript Guide', category: 'Documentation' },
                          { id: '4', text: 'UI/UX Best Practices', category: 'Design' }
                        ]}
                        onSearch={(query) => console.log('Search:', query)}
                        onSuggestionSelect={(suggestion) => console.log('Selected:', suggestion)}
                      />
                    </div>
                  </div>

                  {/* Advanced Search Features */}
                  <div>
                    <h4 className="text-lg font-medium mb-4" style={{ color: '#4D5D53' }}>Advanced Search with Categories & Recent Searches</h4>
                    <div className="max-w-lg">
                      <Search
                        placeholder="Search with categories..."
                        suggestions={[
                          { id: '1', text: 'Design Systems', category: 'Documentation' },
                          { id: '2', text: 'React Components', category: 'Development' },
                          { id: '3', text: 'TypeScript Guide', category: 'Documentation' },
                          { id: '4', text: 'UI/UX Best Practices', category: 'Design' },
                          { id: '5', text: 'Component Library', category: 'Development' }
                        ]}
                        recentSearches={[
                          'React hooks',
                          'CSS Grid',
                          'Responsive design'
                        ]}
                        categories={['Documentation', 'Development', 'Design', 'Testing']}
                        showCategories
                        showRecentSearches
                        onSearch={(query) => console.log('Search:', query)}
                        onSuggestionSelect={(suggestion) => console.log('Selected:', suggestion)}
                        onCategorySelect={(category) => console.log('Category:', category)}
                      />
                    </div>
                  </div>

                  {/* Search Sizes */}
                  <div>
                    <h4 className="text-lg font-medium mb-4" style={{ color: '#4D5D53' }}>Different Sizes</h4>
                    <div className="space-y-4">
                      <div className="max-w-xs">
                        <label className="block text-sm font-medium mb-2" style={{ color: '#6B7A5E' }}>Small</label>
                        <Search
                          size="sm"
                          placeholder="Small search..."
                          suggestions={[
                            { id: '1', text: 'Quick search', category: 'General' },
                            { id: '2', text: 'Find item', category: 'General' }
                          ]}
                        />
                      </div>
                      <div className="max-w-md">
                        <label className="block text-sm font-medium mb-2" style={{ color: '#6B7A5E' }}>Medium (Default)</label>
                        <Search
                          size="md"
                          placeholder="Medium search..."
                          suggestions={[
                            { id: '1', text: 'Standard search', category: 'General' },
                            { id: '2', text: 'Find content', category: 'General' }
                          ]}
                        />
                      </div>
                      <div className="max-w-lg">
                        <label className="block text-sm font-medium mb-2" style={{ color: '#6B7A5E' }}>Large</label>
                        <Search
                          size="lg"
                          placeholder="Large search..."
                          suggestions={[
                            { id: '1', text: 'Large search bar', category: 'General' },
                            { id: '2', text: 'Extended search', category: 'General' }
                          ]}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Search States */}
                  <div>
                    <h4 className="text-lg font-medium mb-4" style={{ color: '#4D5D53' }}>Different States</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#6B7A5E' }}>Loading State</label>
                        <Search
                          placeholder="Loading..."
                          loading
                          suggestions={[
                            { id: '1', text: 'Loading results', category: 'General' }
                          ]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#6B7A5E' }}>Disabled State</label>
                        <Search
                          placeholder="Disabled search..."
                          disabled
                          suggestions={[
                            { id: '1', text: 'Cannot search', category: 'General' }
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Features Demo */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
                  Advanced Features
                </h3>
                <div className="max-w-lg">
                  <Search
                    placeholder="Search everything..."
                    suggestions={[
                      { id: '1', text: 'Design Systems', category: 'Documentation', icon: '📚' },
                      { id: '2', text: 'React Components', category: 'Development', icon: '⚛️' },
                      { id: '3', text: 'TypeScript Guide', category: 'Documentation', icon: '📝' },
                      { id: '4', text: 'UI/UX Best Practices', category: 'Design', icon: '🎨' },
                      { id: '5', text: 'Component Library', category: 'Development', icon: '🧱' },
                      { id: '6', text: 'Accessibility Guidelines', category: 'Documentation', icon: '♿' },
                      { id: '7', text: 'Animation Principles', category: 'Design', icon: '✨' },
                      { id: '8', text: 'State Management', category: 'Development', icon: '🗂️' }
                    ]}
                    recentSearches={[
                      'React hooks',
                      'CSS Grid',
                      'Responsive design',
                      'User experience',
                      'Component testing'
                    ]}
                    categories={['Documentation', 'Development', 'Design', 'Testing', 'Performance']}
                    showCategories
                    showRecentSearches
                    maxSuggestions={8}
                    onSearch={(query) => console.log('Advanced Search:', query)}
                    onSuggestionSelect={(suggestion) => console.log('Advanced Selected:', suggestion)}
                    onCategorySelect={(category) => console.log('Advanced Category:', category)}
                  />
                </div>
                <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: '#F4F6F2' }}>
                  <p className="text-sm" style={{ color: '#6B7A5E' }}>
                    This advanced search includes all features: autocomplete suggestions with icons, 
                    recent searches, category filtering, and keyboard navigation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation & Interaction Components Showcase */}
        <div id="navigation" className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            Navigation & Interaction Components
          </h2>
          <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="space-y-12">
              
              {/* Navigation Examples */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Navigation Bar</h3>
                <div className="space-y-6">
                  <Navigation
                    items={[
                      { label: 'Home', href: '#home', active: true },
                      { label: 'Products', href: '#products' },
                      { label: 'About', href: '#about' },
                      { label: 'Contact', href: '#contact' }
                    ]}
                    logo={<span>🌿 Organic</span>}
                    variant="standard"
                    size="md"
                    backdrop={true}
                  />
                  <Navigation
                    items={[
                      { label: 'Dashboard', href: '#dashboard' },
                      { 
                        label: 'Products', 
                        children: [
                          { label: 'All Products', href: '#products' },
                          { label: 'Electronics', href: '#electronics' },
                          { label: 'Clothing', href: '#clothing' },
                          { label: 'Books', href: '#books' }
                        ]
                      },
                      { 
                        label: 'Services',
                        children: [
                          { label: 'Consulting', href: '#consulting' },
                          { label: 'Support', href: '#support' },
                          { label: 'Training', href: '#training' }
                        ]
                      },
                      { label: 'Settings', href: '#settings' }
                    ]}
                    logo={<span>📊 Analytics</span>}
                    variant="liquid"
                    size="md"
                  />
                </div>
              </div>

              {/* SideNav Examples */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Side Navigation</h3>
                <div className="space-y-8">
                  
                  {/* SideNav Demo Buttons */}
                  <div className="flex flex-wrap gap-3 justify-center">
                    <SideNavDemo 
                      variant="standard" 
                      title="Standard SideNav"
                      description="Clean vertical navigation with collapsible sections"
                    />
                    <SideNavDemo 
                      variant="liquid" 
                      title="Liquid SideNav"
                      description="Enhanced with liquid mouse tracking effects"
                    />
                    <SideNavDemo 
                      variant="organic" 
                      title="Organic SideNav"
                      description="Natural gradients with growing active indicators"
                    />
                  </div>
                </div>
              </div>

              {/* FloatingNav Examples */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Floating Navigation</h3>
                <div className="space-y-8">
                  
                  {/* FloatingNav Demo Buttons */}
                  <div className="flex flex-wrap gap-3 justify-center">
                    <FloatingNavDemo 
                      variant="standard" 
                      side="right"
                      title="Standard FloatingNav"
                      description="Clean floating navigation with rounded edges and subtle shadows"
                    />
                    <FloatingNavDemo 
                      variant="liquid" 
                      side="left"
                      title="Liquid FloatingNav"
                      description="Enhanced with liquid mouse tracking effects and morphing backgrounds"
                    />
                    <FloatingNavDemo 
                      variant="organic" 
                      side="right"
                      title="Organic FloatingNav"
                      description="Natural gradients with organic morphing and breathing effects"
                    />
                  </div>
                  
                  {/* Text Mode Demo */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4" style={{ color: '#4D5D53' }}>
                      Text Mode
                    </h4>
                    <p className="text-sm mb-6" style={{ color: '#6B7A5E' }}>
                      For navigation items without icons, use <code className="px-2 py-1 rounded bg-sage-100 text-sage-800">displayMode="text"</code> for full-width text buttons.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      <FloatingNavTextDemo 
                        variant="standard" 
                        side="right"
                        title="Text FloatingNav"
                        description="Sleek text-based navigation for menu labels"
                      />
                      <FloatingNavTextDemo 
                        variant="liquid" 
                        side="left"
                        title="Liquid Text FloatingNav"
                        description="Text navigation with liquid hover effects"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center space-y-4">
                      <h4 className="text-lg font-semibold" style={{ color: '#4D5D53' }}>
                        Size Variants
                      </h4>
                      <p className="text-sm" style={{ color: '#6B7A5E' }}>
                        Available sizes: <code className="px-2 py-1 rounded bg-sage-100 text-sage-800">sm</code>, <code className="px-2 py-1 rounded bg-sage-100 text-sage-800">md</code>, <code className="px-2 py-1 rounded bg-sage-100 text-sage-800">lg</code>
                      </p>
                    </div>
                    <div className="text-center space-y-4">
                      <h4 className="text-lg font-semibold" style={{ color: '#4D5D53' }}>
                        Side Positioning
                      </h4>
                      <p className="text-sm" style={{ color: '#6B7A5E' }}>
                        Can be positioned on either <code className="px-2 py-1 rounded bg-sage-100 text-sage-800">left</code> or <code className="px-2 py-1 rounded bg-sage-100 text-sage-800">right</code> side of the screen
                      </p>
                    </div>
                    <div className="text-center space-y-4">
                      <h4 className="text-lg font-semibold" style={{ color: '#4D5D53' }}>
                        Interactive Features
                      </h4>
                      <p className="text-sm" style={{ color: '#6B7A5E' }}>
                        Supports icons, badges, tooltips, and click handlers with smooth animations
                      </p>
                    </div>
                  </div>
                  

                </div>
              </div>

              {/* Breadcrumb Examples */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Breadcrumb Navigation</h3>
                <div className="space-y-4">
                  <Breadcrumb
                    items={[
                      { label: 'Home', href: '#home' },
                      { label: 'Products', href: '#products' },
                      { label: 'Electronics', href: '#electronics' },
                      { label: 'Laptops', href: '#laptops' },
                      { label: 'MacBook Pro', active: true }
                    ]}
                    variant="vine"
                    maxItems={4}
                  />
                  <Breadcrumb
                    items={[
                      { label: 'Dashboard', href: '#dashboard' },
                      { label: 'Settings', href: '#settings' },
                      { label: 'Profile', active: true }
                    ]}
                    variant="ripple"
                    separator="arrow"
                  />
                  <p className="text-sm" style={{ color: '#6B7A5E' }}>
                    Click breadcrumb items to see ripple effects and vine-like connectors
                  </p>
                </div>
              </div>

              {/* Pagination Examples */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Pagination</h3>
                <div className="space-y-6">
                  <Pagination
                    currentPage={3}
                    totalPages={15}
                    variant="liquid"
                    onPageChange={() => {}}
                  />
                  <Pagination
                    currentPage={7}
                    totalPages={25}
                    variant="compact"
                    onPageChange={() => {}}
                  />
                  <p className="text-sm" style={{ color: '#6B7A5E' }}>
                    Hover over page numbers to see liquid transitions
                  </p>
                </div>
              </div>

              {/* Tabs Examples */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Tabs</h3>
                <div className="space-y-8">
                  <Tabs
                    items={[
                      {
                        id: 'overview',
                        label: 'Overview',
                        icon: '📋',
                        content: (
                          <div className="p-6 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
                            <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>Overview Content</h4>
                            <p style={{ color: '#6B7A5E' }}>This is the overview tab with detailed information.</p>
                          </div>
                        )
                      },
                      {
                        id: 'features',
                        label: 'Features',
                        icon: '✨',
                        content: (
                          <div className="p-6 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
                            <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>Features Content</h4>
                            <p style={{ color: '#6B7A5E' }}>Key features and capabilities are listed here.</p>
                          </div>
                        )
                      },
                      {
                        id: 'settings',
                        label: 'Settings',
                        icon: '⚙️',
                        content: (
                          <div className="p-6 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
                            <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>Settings Content</h4>
                            <p style={{ color: '#6B7A5E' }}>Configuration options and preferences.</p>
                          </div>
                        )
                      },
                      {
                        id: 'analytics',
                        label: 'Analytics',
                        icon: '📊',
                        content: (
                          <div className="p-6 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
                            <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>Analytics Content</h4>
                            <p style={{ color: '#6B7A5E' }}>Data insights and performance metrics.</p>
                          </div>
                        )
                      }
                    ]}
                    variant="underline"
                    defaultActiveTab="features"
                  />
                  <p className="text-sm" style={{ color: '#6B7A5E' }}>
                    Clean underline tabs with smooth transitions and icon support
                  </p>
                </div>
              </div>
              
            </div>
          </div>
        </div>

                {/* Modal Component Showcase */}
        <div id="modals" className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            Modal Components
          </h2>
          <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="space-y-12">
              
              {/* Standard vs Liquid Modals */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Modal Variants</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold" style={{ color: '#4D5D53' }}>
                      Standard Modal
                    </h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      Clean, accessible modal with backdrop blur and smooth animations.
                    </p>
                    <ModalExample />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold" style={{ color: '#4D5D53' }}>
                      Liquid Modal
                    </h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      Enhanced with liquid transitions and mouse tracking effects.
                    </p>
                    <LiquidModalExample />
                  </div>
                </div>
              </div>

              {/* Modal Sizes */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Modal Sizes</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ModalSizeExample size="sm" />
                  <ModalSizeExample size="md" />
                  <ModalSizeExample size="lg" />
                  <ModalSizeExample size="xl" />
                </div>
              </div>

              {/* Modal Features */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Modal Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold" style={{ color: '#4D5D53' }}>
                      Closable Options
                    </h4>
                    <div className="space-y-2">
                      <ModalClosableExample closable={true} />
                      <ModalClosableExample closable={false} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold" style={{ color: '#4D5D53' }}>
                      Keyboard Navigation
                    </h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      • Press <kbd className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#E8ECDE', color: '#4D5D53' }}>Escape</kbd> to close
                    </p>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      • Click backdrop to close (if closable)
                    </p>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      • Focus management for accessibility
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Toast Component Showcase */}
        <div id="toasts" className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            Toast Notifications
          </h2>
          <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="space-y-12">
              
              {/* Toast Types */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Toast Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold" style={{ color: '#4D5D53' }}>
                      Standard Toasts
                    </h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      Clean notifications with auto-dismiss and progress indicators.
                    </p>
                    <ToastExample />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold" style={{ color: '#4D5D53' }}>
                      Ripple Toasts
                    </h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      Interactive toasts with ripple effects on click.
                    </p>
                    <RippleToastExample />
                  </div>
                </div>
              </div>

              {/* Toast Positioning */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Toast Positioning</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <ToastPositionExample position="top-right" />
                  <ToastPositionExample position="top-left" />
                  <ToastPositionExample position="top-center" />
                  <ToastPositionExample position="bottom-right" />
                  <ToastPositionExample position="bottom-left" />
                  <ToastPositionExample position="bottom-center" />
                </div>
              </div>

              {/* Toast Duration */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Toast Duration</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ToastDurationExample duration={2000} label="Quick (2s)" />
                  <ToastDurationExample duration={5000} label="Standard (5s)" />
                  <ToastDurationExample duration={0} label="Persistent" />
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Tooltip Component Showcase */}
        <div id="tooltips" className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            Tooltip Components
          </h2>
          <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="space-y-12">
              
              {/* Tooltip Positioning */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Tooltip Positioning</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <Tooltip content="This appears on top!" position="top">
                        <Button variant="ghost" size="sm">Top</Button>
                      </Tooltip>
                    </div>
                    <div className="text-center">
                      <Tooltip content="This appears on the right!" position="right">
                        <Button variant="ghost" size="sm">Right</Button>
                      </Tooltip>
                    </div>
                    <div className="text-center">
                      <Tooltip content="This appears on the bottom!" position="bottom">
                        <Button variant="ghost" size="sm">Bottom</Button>
                      </Tooltip>
                    </div>
                    <div className="text-center">
                      <Tooltip content="This appears on the left!" position="left">
                        <Button variant="ghost" size="sm">Left</Button>
                      </Tooltip>
                    </div>
                  </div>
                  <p className="text-sm text-center" style={{ color: '#6B7A5E' }}>
                    Tooltips automatically adjust position to stay within viewport
                  </p>
                </div>
              </div>

              {/* Tooltip Content Types */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Tooltip Content</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-4">
                    <h4 className="text-lg font-semibold" style={{ color: '#4D5D53' }}>
                      Simple Text
                    </h4>
                    <Tooltip content="Simple tooltip text">
                      <Button variant="secondary" size="sm">Hover Me</Button>
                    </Tooltip>
                  </div>
                  <div className="text-center space-y-4">
                    <h4 className="text-lg font-semibold" style={{ color: '#4D5D53' }}>
                      Rich Content
                    </h4>
                    <Tooltip 
                      content={
                        <div className="space-y-2">
                          <div className="font-semibold">Rich Content</div>
                          <div className="text-sm">Tooltips support complex content!</div>
                        </div>
                      }
                      position="top"
                    >
                      <Button variant="primary" size="sm">Rich Content</Button>
                    </Tooltip>
                  </div>
                  <div className="text-center space-y-4">
                    <h4 className="text-lg font-semibold" style={{ color: '#4D5D53' }}>
                      Long Content
                    </h4>
                    <Tooltip content="This is a longer tooltip that demonstrates how tooltips handle extended content with proper wrapping and sizing.">
                      <Button variant="accent" size="sm">Long Text</Button>
                    </Tooltip>
                  </div>
                </div>
              </div>

              {/* Tooltip Timing */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Tooltip Timing</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <TooltipDelayExample delay={0} label="Instant" />
                  <TooltipDelayExample delay={500} label="Standard (500ms)" />
                  <TooltipDelayExample delay={1000} label="Slow (1000ms)" />
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Alert Component Showcase */}
        <div id="alerts" className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            Alert Components
          </h2>
          <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="space-y-12">
              
              {/* Alert Types */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Alert Types</h3>
                <div className="space-y-4">
                  <Alert type="success" title="Success">
                    Your changes have been saved successfully. All data is now synchronized.
                  </Alert>
                  <Alert type="info" title="Information">
                    Here's some helpful information about the current process.
                  </Alert>
                  <Alert type="warning" title="Warning">
                    Your session will expire in 5 minutes. Please save your work.
                  </Alert>
                  <Alert type="error" title="Error">
                    Unable to connect to the server. Please check your connection.
                  </Alert>
                </div>
              </div>

              {/* Alert Features */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Alert Features</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4" style={{ color: '#4D5D53' }}>
                      Dismissible Alerts
                    </h4>
                    <div className="space-y-4">
                      <DismissibleAlertExample type="info" title="Dismissible Info" />
                      <DismissibleAlertExample type="warning" title="Dismissible Warning" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4" style={{ color: '#4D5D53' }}>
                      Custom Icons
                    </h4>
                    <div className="space-y-4">
                      <Alert 
                        type="success" 
                        title="Custom Success Icon"
                        icon={<span className="text-lg">🎉</span>}
                      >
                        This alert uses a custom celebration icon instead of the default checkmark.
                      </Alert>
                      <Alert 
                        type="info" 
                        title="Custom Info Icon"
                        icon={<span className="text-lg">💡</span>}
                      >
                        This alert uses a lightbulb icon to represent a tip or idea.
                      </Alert>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4" style={{ color: '#4D5D53' }}>
                      No Title Alerts
                    </h4>
                    <div className="space-y-4">
                      <Alert type="success">
                        Simple success message without a title.
                      </Alert>
                      <Alert type="error">
                        Error message that gets straight to the point.
                      </Alert>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Card Component Showcase */}
        <div id="cards" className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            Card Components
          </h2>
          <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="space-y-12">
              
              {/* Standard Card Variants */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
                  Standard Card Variants
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card variant="elevated" elevation="md" hoverable>
                    <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>
                      Elevated Card
                    </h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      Clean elevation with subtle shadows and hover lifting effect.
                    </p>
                  </Card>

                  <Card variant="outlined" elevation="sm" hoverable>
                    <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>
                      Outlined Card
                    </h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      Subtle border with minimal elevation for clean layouts.
                    </p>
                  </Card>

                  <Card variant="filled" elevation="md" hoverable>
                    <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>
                      Filled Card
                    </h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      Filled background with organic warmth and texture.
                    </p>
                  </Card>

                  <Card variant="glass" elevation="lg" hoverable>
                    <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>
                      Glass Card
                    </h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      Frosted glass effect with backdrop blur for modern appeal.
                    </p>
                  </Card>
                </div>
              </div>

              {/* Hover Lift Effect */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
                  Hover Lift Effect
                </h3>
                <p className="text-sm mb-6" style={{ color: '#6B7A5E' }}>
                  The <code className="px-2 py-1 rounded bg-sage-100 text-sage-800">hoverable</code> prop enables smooth lifting animations on hover. 
                  Use <code className="px-2 py-1 rounded bg-sage-100 text-sage-800">hoverLift</code> to control the intensity.
                </p>
                
                {/* Static vs Hoverable */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card variant="elevated" elevation="md" hoverable={false}>
                    <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>
                      Static Card
                    </h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      This card has <code>hoverable={false}</code> - no lift effect on hover.
                    </p>
                  </Card>

                  <Card variant="elevated" elevation="md" hoverable={true}>
                    <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>
                      Hoverable Card
                    </h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      This card has <code>hoverable={true}</code> - hover to see it lift and scale!
                    </p>
                  </Card>
                </div>

                {/* Hover Lift Intensities */}
                <div>
                  <h4 className="text-lg font-semibold mb-4" style={{ color: '#4D5D53' }}>
                    Hover Lift Intensities
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {(['none', 'sm', 'md', 'lg'] as const).map((lift) => (
                      <Card 
                        key={lift}
                        variant="elevated" 
                        elevation="md"
                        hoverable={lift !== 'none'}
                        hoverLift={lift}
                        className="text-center"
                      >
                        <h5 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>
                          {lift.toUpperCase()}
                        </h5>
                        <p className="text-sm" style={{ color: '#6B7A5E' }}>
                          <code>hoverLift="{lift}"</code>
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Elevation Levels */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
                  Elevation Levels
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((elevation) => (
                    <Card 
                      key={elevation}
                      variant="elevated" 
                      elevation={elevation}
                      hoverable
                      className="text-center"
                    >
                      <h4 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>
                        {elevation.toUpperCase()}
                      </h4>
                      <p className="text-sm" style={{ color: '#6B7A5E' }}>
                        Elevation level for depth hierarchy
                      </p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Unique Interaction Cards */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
                  Unique Interaction Cards
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Liquid Card */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold" style={{ color: '#4D5D53' }}>
                      Liquid Card
                    </h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      Morphing liquid effects with gradient shifts that follow your cursor.
                    </p>
                    <LiquidCard padding="lg">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full" 
                             style={{ backgroundColor: '#78866B' }}>
                          <div className="w-full h-full flex items-center justify-center text-white text-2xl">
                            ✨
                          </div>
                        </div>
                        <h5 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>
                          Liquid Interactions
                        </h5>
                        <p className="text-sm" style={{ color: '#6B7A5E' }}>
                          Hover and move your cursor around this card to see the liquid morphing effects.
                        </p>
                      </div>
                    </LiquidCard>
                  </div>

                  {/* Gesture Card */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold" style={{ color: '#4D5D53' }}>
                      Gesture Card
                    </h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
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
                        <h5 className="text-lg font-semibold mb-2" style={{ color: '#4D5D53' }}>
                          3D Gestures
                        </h5>
                        <p className="text-sm" style={{ color: '#6B7A5E' }}>
                          Click and drag this card to experience 3D physics with natural spring-back motion.
                        </p>
                      </div>
                    </GestureCard>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Badge Component Showcase */}
        <div id="badges" className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            Badge Components
          </h2>
          <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="space-y-12">
              
              {/* Standard Badge Variants */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
                  Standard Badge Variants
                </h3>
                <div className="space-y-6">
                  {/* Color Variants */}
                  <div>
                    <h4 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Color Variants</h4>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="primary">Primary</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="success">Success</Badge>
                      <Badge variant="warning">Warning</Badge>
                      <Badge variant="error">Error</Badge>
                      <Badge variant="info">Info</Badge>
                      <Badge variant="neutral">Neutral</Badge>
                    </div>
                  </div>

                  {/* Size Variants */}
                  <div>
                    <h4 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Size Variants</h4>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge size="sm">Small</Badge>
                      <Badge size="md">Medium</Badge>
                      <Badge size="lg">Large</Badge>
                    </div>
                  </div>

                  {/* With Icons and Dots */}
                  <div>
                    <h4 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>With Icons and Dots</h4>
                    <div className="flex flex-wrap gap-3">
                      <Badge 
                        variant="primary" 
                        icon={
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/>
                          </svg>
                        }
                      >
                        Featured
                      </Badge>
                      <Badge variant="success" dot>Online</Badge>
                      <Badge variant="warning" dot>Pending</Badge>
                      <Badge variant="error" dot>Offline</Badge>
                    </div>
                  </div>

                  {/* Dismissible Badges */}
                  <div>
                    <h4 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Dismissible Badges</h4>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="secondary" dismissible>React</Badge>
                      <Badge variant="secondary" dismissible>TypeScript</Badge>
                      <Badge variant="secondary" dismissible>UI/UX</Badge>
                      <Badge variant="secondary" dismissible>Design</Badge>
                    </div>
                  </div>

                  {/* Clickable Badges */}
                  <div>
                    <h4 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Clickable Badges</h4>
                    <div className="flex flex-wrap gap-3">
                      <Badge 
                        variant="primary" 
                        onClick={() => alert('Badge clicked!')}
                      >
                        Click Me
                      </Badge>
                      <Badge 
                        variant="info" 
                        onClick={() => alert('Filter applied!')}
                        icon={
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11A.5.5 0 0 1 8 2z"/>
                            <path d="M6 7a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                          </svg>
                        }
                      >
                        Filter
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Liquid Badge Variants */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
                  Liquid Badge Variants
                </h3>
                <p className="text-sm mb-6" style={{ color: '#6B7A5E' }}>
                  Hover over these badges to see the liquid transition effects with mouse tracking
                </p>
                <div className="space-y-6">
                  {/* Liquid Colors */}
                  <div>
                    <h4 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Liquid Colors</h4>
                    <div className="flex flex-wrap gap-3">
                      <LiquidBadge variant="primary">Primary Liquid</LiquidBadge>
                      <LiquidBadge variant="secondary">Secondary Liquid</LiquidBadge>
                      <LiquidBadge variant="success">Success Liquid</LiquidBadge>
                      <LiquidBadge variant="warning">Warning Liquid</LiquidBadge>
                      <LiquidBadge variant="error">Error Liquid</LiquidBadge>
                    </div>
                  </div>

                  {/* Liquid Intensity */}
                  <div>
                    <h4 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Liquid Intensity</h4>
                    <div className="flex flex-wrap gap-3">
                      <LiquidBadge variant="primary" intensity="subtle">Subtle</LiquidBadge>
                      <LiquidBadge variant="primary" intensity="moderate">Moderate</LiquidBadge>
                      <LiquidBadge variant="primary" intensity="strong">Strong</LiquidBadge>
                    </div>
                  </div>

                  {/* Liquid with Features */}
                  <div>
                    <h4 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Liquid with Features</h4>
                    <div className="flex flex-wrap gap-3">
                      <LiquidBadge 
                        variant="primary" 
                        icon={
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                          </svg>
                        }
                      >
                        With Icon
                      </LiquidBadge>
                      <LiquidBadge variant="success" dot>With Dot</LiquidBadge>
                      <LiquidBadge 
                        variant="info" 
                        onClick={() => alert('Liquid badge clicked!')}
                      >
                        Clickable
                      </LiquidBadge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ripple Badge Variants */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
                  Ripple Badge Variants
                </h3>
                <p className="text-sm mb-6" style={{ color: '#6B7A5E' }}>
                  Click these badges to see organic ripple growth effects emanating from your click point
                </p>
                <div className="space-y-6">
                  {/* Ripple Colors */}
                  <div>
                    <h4 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Ripple Colors</h4>
                    <div className="flex flex-wrap gap-3">
                      <RippleBadge variant="primary">Primary Ripple</RippleBadge>
                      <RippleBadge variant="secondary">Secondary Ripple</RippleBadge>
                      <RippleBadge variant="success">Success Ripple</RippleBadge>
                      <RippleBadge variant="warning">Warning Ripple</RippleBadge>
                      <RippleBadge variant="error">Error Ripple</RippleBadge>
                    </div>
                  </div>

                  {/* Ripple Intensity */}
                  <div>
                    <h4 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Ripple Intensity</h4>
                    <div className="flex flex-wrap gap-3">
                      <RippleBadge variant="primary" rippleIntensity="subtle">Subtle</RippleBadge>
                      <RippleBadge variant="primary" rippleIntensity="moderate">Moderate</RippleBadge>
                      <RippleBadge variant="primary" rippleIntensity="strong">Strong</RippleBadge>
                    </div>
                  </div>

                  {/* Ripple on Hover */}
                  <div>
                    <h4 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Ripple on Hover</h4>
                    <div className="flex flex-wrap gap-3">
                      <RippleBadge variant="primary" rippleOnHover>Hover for Ripple</RippleBadge>
                      <RippleBadge 
                        variant="success" 
                        rippleOnHover 
                        icon={
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/>
                          </svg>
                        }
                      >
                        With Icon
                      </RippleBadge>
                      <RippleBadge variant="warning" rippleOnHover dot>With Dot</RippleBadge>
                    </div>
                  </div>

                  {/* Ripple with Features */}
                  <div>
                    <h4 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Ripple with Features</h4>
                    <div className="flex flex-wrap gap-3">
                      <RippleBadge 
                        variant="primary" 
                        onClick={() => alert('Ripple badge clicked!')}
                        icon={
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                          </svg>
                        }
                      >
                        With Icon
                      </RippleBadge>
                      <RippleBadge variant="success" dot>With Dot</RippleBadge>
                      <RippleBadge 
                        variant="error" 
                        dismissible
                        onDismiss={() => console.log('Badge dismissed')}
                      >
                        Dismissible
                      </RippleBadge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-World Examples */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
                  Real-World Examples
                </h3>
                <div className="space-y-6">
                  {/* Status Indicators */}
                  <div>
                    <h4 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Status Indicators</h4>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="success" dot>Online</Badge>
                      <Badge variant="warning" dot>Away</Badge>
                      <Badge variant="error" dot>Offline</Badge>
                      <Badge variant="neutral" dot>Unknown</Badge>
                    </div>
                  </div>

                  {/* Notification Badges */}
                  <div>
                    <h4 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Notification Badges</h4>
                    <div className="flex flex-wrap gap-3">
                      <LiquidBadge 
                        variant="error" 
                        icon={
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917z"/>
                          </svg>
                        }
                      >
                        3 New
                      </LiquidBadge>
                      <RippleBadge 
                        variant="primary" 
                        icon={
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                          </svg>
                        }
                      >
                        12 Likes
                      </RippleBadge>
                      <Badge 
                        variant="info" 
                        icon={
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/>
                          </svg>
                        }
                      >
                        Featured
                      </Badge>
                    </div>
                  </div>

                  {/* Interactive Action Badges */}
                  <div>
                    <h4 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Interactive Action Badges</h4>
                    <div className="flex flex-wrap gap-3">
                      <RippleBadge 
                        variant="primary" 
                        onClick={() => alert('Filter applied!')}
                      >
                        Apply Filter
                      </RippleBadge>
                      <LiquidBadge 
                        variant="success" 
                        onClick={() => alert('Action confirmed!')}
                      >
                        Confirm Action
                      </LiquidBadge>
                      <Badge 
                        variant="warning" 
                        onClick={() => alert('Settings opened!')}
                        icon={
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492z"/>
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z"/>
                          </svg>
                        }
                      >
                        Settings
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Avatar Component Showcase */}
        <div id="avatars" className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            Avatar Components
          </h2>
          <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="space-y-12">
              
              {/* Standard Avatar */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
                  Standard Avatar
                </h3>
                <div className="space-y-8">
                  
                  {/* Sizes */}
                  <div>
                    <h4 className="text-lg font-medium mb-4" style={{ color: '#4D5D53' }}>Sizes</h4>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="text-center">
                        <Avatar size="xs" initials="XS" />
                        <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>XS</p>
                      </div>
                      <div className="text-center">
                        <Avatar size="sm" initials="SM" />
                        <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>SM</p>
                      </div>
                      <div className="text-center">
                        <Avatar size="md" initials="MD" />
                        <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>MD</p>
                      </div>
                      <div className="text-center">
                        <Avatar size="lg" initials="LG" />
                        <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>LG</p>
                      </div>
                      <div className="text-center">
                        <Avatar size="xl" initials="XL" />
                        <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>XL</p>
                      </div>
                    </div>
                  </div>

                  {/* Variants */}
                  <div>
                    <h4 className="text-lg font-medium mb-4" style={{ color: '#4D5D53' }}>Variants</h4>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="text-center">
                        <Avatar 
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                          alt="John Doe"
                          status="online"
                        />
                        <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>Image</p>
                      </div>
                      <div className="text-center">
                        <Avatar initials="JD" status="away" />
                        <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>Initials</p>
                      </div>
                      <div className="text-center">
                        <Avatar 
                          icon={
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                          }
                          status="busy"
                        />
                        <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>Icon</p>
                      </div>
                      <div className="text-center">
                        <Avatar status="offline" />
                        <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>Default</p>
                      </div>
                    </div>
                  </div>

                  {/* Status Indicators */}
                  <div>
                    <h4 className="text-lg font-medium mb-4" style={{ color: '#4D5D53' }}>Status Indicators</h4>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="text-center">
                        <Avatar initials="ON" status="online" />
                        <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>Online</p>
                      </div>
                      <div className="text-center">
                        <Avatar initials="AW" status="away" />
                        <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>Away</p>
                      </div>
                      <div className="text-center">
                        <Avatar initials="BS" status="busy" />
                        <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>Busy</p>
                      </div>
                      <div className="text-center">
                        <Avatar initials="OF" status="offline" />
                        <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>Offline</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Options */}
                  <div>
                    <h4 className="text-lg font-medium mb-4" style={{ color: '#4D5D53' }}>Additional Options</h4>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="text-center">
                        <Avatar initials="BD" border />
                        <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>With Border</p>
                      </div>
                      <div className="text-center">
                        <Avatar initials="SQ" square />
                        <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>Square</p>
                      </div>
                      <div className="text-center">
                        <Avatar 
                          initials="CL" 
                          onClick={() => alert('Avatar clicked!')}
                          className="cursor-pointer"
                        />
                        <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>Clickable</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Liquid Avatar */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
                  Liquid Avatar
                </h3>
                <p className="text-sm mb-6" style={{ color: '#6B7A5E' }}>
                  Interactive avatars with liquid transitions and mouse tracking effects. Hover to see the morphing border and glow effects.
                </p>
                
                <div className="flex flex-wrap items-center gap-8">
                  <div className="text-center">
                    <LiquidAvatar 
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b734?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                      alt="Sarah Wilson"
                      size="lg"
                      status="online"
                    />
                    <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>Image</p>
                  </div>
                  <div className="text-center">
                    <LiquidAvatar 
                      initials="MW" 
                      size="lg"
                      status="away"
                      onClick={() => alert('Liquid avatar clicked!')}
                    />
                    <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>Initials</p>
                  </div>
                  <div className="text-center">
                    <LiquidAvatar 
                      icon={
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="10" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      }
                      size="lg"
                      status="busy"
                    />
                    <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>Icon</p>
                  </div>
                  <div className="text-center">
                    <LiquidAvatar 
                      square
                      initials="SQ"
                      size="lg"
                      status="online"
                    />
                    <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>Square</p>
                  </div>
                </div>
              </div>

              {/* Ripple Avatar */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
                  Ripple Avatar
                </h3>
                <p className="text-sm mb-6" style={{ color: '#6B7A5E' }}>
                  Interactive avatars with ripple effects. Click to create ripples that expand from the click point.
                </p>
                
                <div className="flex flex-wrap items-center gap-8">
                  <div className="text-center">
                    <RippleAvatar 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                      alt="Alex Johnson"
                      size="lg"
                      status="online"
                      onClick={() => console.log('Ripple avatar clicked!')}
                    />
                    <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>Image</p>
                  </div>
                  <div className="text-center">
                    <RippleAvatar 
                      initials="RT" 
                      size="lg"
                      status="away"
                      onClick={() => console.log('Ripple avatar clicked!')}
                    />
                    <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>Initials</p>
                  </div>
                  <div className="text-center">
                    <RippleAvatar 
                      icon={
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 12l2 2 4-4" />
                          <circle cx="12" cy="12" r="9" />
                        </svg>
                      }
                      size="lg"
                      status="busy"
                      onClick={() => console.log('Ripple avatar clicked!')}
                    />
                    <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>Icon</p>
                  </div>
                  <div className="text-center">
                    <RippleAvatar 
                      square
                      initials="SQ"
                      size="lg"
                      status="online"
                      onClick={() => console.log('Ripple avatar clicked!')}
                    />
                    <p className="text-sm mt-2" style={{ color: '#6B7A5E' }}>Square</p>
                  </div>
                </div>
              </div>

              {/* Group Examples */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
                  Group Examples
                </h3>
                <div className="space-y-6">
                  {/* Avatar Stack */}
                  <div>
                    <h4 className="text-lg font-medium mb-4" style={{ color: '#4D5D53' }}>Avatar Stack</h4>
                    <div className="flex -space-x-2">
                      <Avatar 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                        border
                        status="online"
                      />
                      <Avatar 
                        src="https://images.unsplash.com/photo-1494790108755-2616b612b734?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                        border
                        status="away"
                      />
                      <Avatar 
                        initials="AB"
                        border
                        status="busy"
                      />
                      <Avatar 
                        initials="+2"
                        border
                        fallbackColor="#6b7280"
                      />
                    </div>
                  </div>

                  {/* Team List */}
                  <div>
                    <h4 className="text-lg font-medium mb-4" style={{ color: '#4D5D53' }}>Team List</h4>
                    <div className="space-y-4">
                      {[
                        { name: 'John Doe', role: 'Frontend Developer', status: 'online' as const, initials: 'JD' },
                        { name: 'Sarah Wilson', role: 'UI/UX Designer', status: 'away' as const, initials: 'SW' },
                        { name: 'Mike Johnson', role: 'Backend Developer', status: 'busy' as const, initials: 'MJ' },
                        { name: 'Emily Davis', role: 'Product Manager', status: 'offline' as const, initials: 'ED' }
                      ].map((member) => (
                        <div key={member.name} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                          <Avatar 
                            initials={member.initials}
                            status={member.status}
                            size="md"
                          />
                          <div>
                            <p className="font-medium" style={{ color: '#4D5D53' }}>{member.name}</p>
                            <p className="text-sm" style={{ color: '#6B7A5E' }}>{member.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Table Components Showcase */}
        <div id="tables" className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            Table Components
          </h2>
          <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="space-y-12">
              


              {/* Standard Table */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
                  Standard Table
                </h3>
                <Table
                  data={[
                    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15', avatar: '👩‍💼' },
                    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'active', lastLogin: '2024-01-14', avatar: '👨‍💻' },
                    { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Viewer', status: 'inactive', lastLogin: '2024-01-10', avatar: '👩‍🎨' }
                  ]}
                  columns={[
                    {
                      key: 'name',
                      label: 'Name',
                      render: (value, row) => (
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{row.avatar}</span>
                          <div>
                            <div className="font-medium text-stone-900">{value}</div>
                            <div className="text-sm text-stone-500">{row.email}</div>
                          </div>
                        </div>
                      )
                    },
                    {
                      key: 'role',
                      label: 'Role',
                      render: (value) => (
                        <span
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: value === 'Admin' ? 'rgba(120, 134, 107, 0.1)' : 
                                           value === 'Editor' ? 'rgba(164, 183, 174, 0.1)' : 
                                           'rgba(187, 201, 194, 0.1)',
                            color: value === 'Admin' ? '#4D5D53' : '#6B7A5E'
                          }}
                        >
                          {value}
                        </span>
                      )
                    },
                    {
                      key: 'status',
                      label: 'Status',
                      render: (value) => (
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: value === 'active' ? '#10B981' : 
                                             value === 'inactive' ? '#EF4444' : 
                                             '#F59E0B'
                            }}
                          />
                          <span className="text-sm capitalize">{value}</span>
                        </div>
                      )
                    }
                  ]}
                  selectable
                  onRowSelect={(rows) => console.log('Selected rows:', rows)}
                  variant="standard"
                  size="md"
                />
              </div>

              {/* LiquidTable */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
                  LiquidTable
                </h3>
                <p className="text-sm mb-6" style={{ color: '#6B7A5E' }}>
                  Enhanced table with liquid transitions and mouse tracking effects.
                </p>
                <LiquidTable
                  data={[
                    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15', avatar: '👩‍💼' },
                    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'active', lastLogin: '2024-01-14', avatar: '👨‍💻' },
                    { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Viewer', status: 'inactive', lastLogin: '2024-01-10', avatar: '👩‍🎨' },
                    { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'pending', lastLogin: '2024-01-12', avatar: '👨‍🔬' }
                  ]}
                  columns={[
                    {
                      key: 'name',
                      label: 'Name',
                      render: (value, row) => (
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{row.avatar}</span>
                          <div>
                            <div className="font-medium text-stone-900">{value}</div>
                            <div className="text-sm text-stone-500">{row.email}</div>
                          </div>
                        </div>
                      )
                    },
                    {
                      key: 'role',
                      label: 'Role',
                      render: (value) => (
                        <span
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: value === 'Admin' ? 'rgba(120, 134, 107, 0.1)' : 
                                           value === 'Editor' ? 'rgba(164, 183, 174, 0.1)' : 
                                           'rgba(187, 201, 194, 0.1)',
                            color: value === 'Admin' ? '#4D5D53' : '#6B7A5E'
                          }}
                        >
                          {value}
                        </span>
                      )
                    },
                    {
                      key: 'status',
                      label: 'Status',
                      render: (value) => (
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: value === 'active' ? '#10B981' : 
                                             value === 'inactive' ? '#EF4444' : 
                                             '#F59E0B'
                            }}
                          />
                          <span className="text-sm capitalize">{value}</span>
                        </div>
                      )
                    },
                    {
                      key: 'lastLogin',
                      label: 'Last Login',
                      render: (value) => (
                        <span className="text-sm text-stone-600">{value}</span>
                      )
                    }
                  ]}
                  selectable
                  onRowSelect={(rows) => console.log('Selected rows:', rows)}
                  variant="standard"
                  size="md"
                  liquidIntensity="medium"
                  mouseTrackingEnabled={true}
                />
              </div>

              {/* Table Variants */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
                  Table Variants
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium" style={{ color: '#6B7A5E' }}>
                      Striped Table
                    </h4>
                    <Table
                      data={[
                        { name: 'Alice', role: 'Admin', status: 'active' },
                        { name: 'Bob', role: 'Editor', status: 'active' },
                        { name: 'Carol', role: 'Viewer', status: 'inactive' }
                      ]}
                      columns={[
                        { key: 'name', label: 'Name' },
                        { key: 'role', label: 'Role' },
                        { key: 'status', label: 'Status' }
                      ]}
                      variant="striped"
                      size="sm"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium" style={{ color: '#6B7A5E' }}>
                      Bordered Table
                    </h4>
                    <Table
                      data={[
                        { name: 'Alice', role: 'Admin', status: 'active' },
                        { name: 'Bob', role: 'Editor', status: 'active' },
                        { name: 'Carol', role: 'Viewer', status: 'inactive' }
                      ]}
                      columns={[
                        { key: 'name', label: 'Name' },
                        { key: 'role', label: 'Role' },
                        { key: 'status', label: 'Status' }
                      ]}
                      variant="bordered"
                      size="sm"
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* File Upload Components Showcase */}
        <div id="file-uploads" className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            File Upload Components
          </h2>
          <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="space-y-12">
              
                             {/* Compact FileUpload */}
               <div>
                 <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
                   Compact File Upload
                 </h3>
                 <FileUpload
                   accept="image/*,application/pdf,.doc,.docx"
                   multiple
                   maxSize={5 * 1024 * 1024} // 5MB
                   maxFiles={3}
                   onFilesSelect={(files) => console.log('Files selected:', files)}
                   onUpload={async (files) => {
                     console.log('Uploading files:', files);
                     await new Promise(resolve => setTimeout(resolve, 2000));
                   }}
                   onError={(error) => console.error('Upload error:', error)}
                   supportedFormats={['JPG', 'PNG', 'PDF', 'DOC', 'DOCX']}
                   variant="compact"
                   size="md"
                 />
               </div>

                             {/* Ghost Upload */}
               <div>
                 <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
                   Ghost Upload
                 </h3>
                 <FileUpload
                   accept=".pdf"
                   multiple={false}
                   maxSize={5 * 1024 * 1024} // 5MB
                   maxFiles={1}
                   onFilesSelect={(files) => console.log('Files selected:', files)}
                   onUpload={async (files) => {
                     console.log('Uploading files:', files);
                     await new Promise(resolve => setTimeout(resolve, 2000));
                   }}
                   onError={(error) => console.error('Upload error:', error)}
                   variant="ghost"
                   size="md"
                   supportedFormats={['PDF']}
                   uploadText="Drop PDF document here"
                   browseText="Select PDF"
                 />
               </div>
              
            </div>
          </div>
        </div>

        {/* Progress Components Showcase */}
        <div id="progress" className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            Progress Components
          </h2>
          <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="space-y-12">
              
              {/* Standard Progress */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Standard Progress</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>Linear Progress</h4>
                    <div className="space-y-4">
                      <Progress value={75} label="File Upload" showValue />
                      <Progress value={60} variant="success" label="Profile Complete" showValue />
                      <Progress variant="warning" label="Processing..." />
                      <Progress value={45} variant="error" label="Failed Upload" showValue />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>Circular Progress</h4>
                    <div className="flex gap-4 justify-center">
                      <CircularProgress value={75} size={48} showValue />
                      <CircularProgress value={90} size={48} variant="success" showValue />
                      <CircularProgress size={48} variant="info" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Liquid Progress */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Liquid Progress</h3>
                <p className="text-sm mb-6" style={{ color: '#6B7A5E' }}>
                  Interactive progress bars with liquid transitions and mouse tracking effects. Hover to see the morphing animation!
                </p>
                <div className="space-y-4">
                  <LiquidProgress value={85} label="Liquid Animation" showValue />
                  <LiquidProgress value={60} variant="primary" label="Morphing Progress" showValue />
                  <LiquidProgress value={40} variant="success" label="Organic Growth" showValue />
                </div>
              </div>

              {/* Ripple Progress */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Ripple Progress</h3>
                <p className="text-sm mb-6" style={{ color: '#6B7A5E' }}>
                  Progress bars with organic ripple effects that create natural, breathing animations.
                </p>
                <div className="space-y-4">
                  <RippleProgress value={70} label="Ripple Effect" showValue />
                  <RippleProgress variant="success" label="Processing..." />
                  <RippleProgress value={90} variant="primary" label="Nearly Complete" showValue />
                </div>
              </div>

              {/* Progress Sizes */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Progress Sizes</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>Small</h4>
                      <Progress value={65} size="sm" label="Small Progress" showValue />
                      <CircularProgress value={65} size={32} showValue />
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>Medium</h4>
                      <Progress value={75} size="md" label="Medium Progress" showValue />
                      <CircularProgress value={75} size={48} showValue />
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>Large</h4>
                      <Progress value={85} size="lg" label="Large Progress" showValue />
                      <CircularProgress value={85} size={64} showValue />
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Accordion Components Showcase */}
        <div id="accordions" className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            Accordion Components
          </h2>
          <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="space-y-12">
              
              {/* Standard Accordion */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Standard Accordion</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  
                  {/* Basic Accordion */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>Basic Accordion</h4>
                    <Accordion 
                      items={[
                        createAccordionItem('1', 'What makes these components unique?', 
                          <p style={{ color: '#6B7A5E' }}>Our components feature organic interaction patterns like liquid transitions and ripple effects that create natural, engaging user experiences.</p>
                        ),
                        createAccordionItem('2', 'How do I customize the animations?', 
                          <p style={{ color: '#6B7A5E' }}>Most components include variant props that control different animation styles and behaviors. You can adjust intensity, timing, and visual effects.</p>
                        ),
                        createAccordionItem('3', 'Are these components accessible?', 
                          <p style={{ color: '#6B7A5E' }}>Yes! All components follow WCAG guidelines with proper ARIA labels, keyboard navigation, and focus management.</p>
                        ),
                      ]}
                      variant="bordered"
                      allowMultiple
                      defaultOpen={['1']}
                    />
                  </div>

                  {/* Variant Examples */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>Variant Examples</h4>
                                         <Accordion 
                       items={[
                         createAccordionItem('v1', '🎨 Design Philosophy', 
                           <p style={{ color: '#6B7A5E' }}>Our design system combines organic modernism with functional precision, creating interfaces that feel natural and intuitive.</p>
                         ),
                         createAccordionItem('v2', '⚡ Performance', 
                           <p style={{ color: '#6B7A5E' }}>All animations are CSS-based and optimized for smooth 60fps performance across devices.</p>
                         ),
                       ]}
                       variant="ghost"
                       allowMultiple={false}
                       defaultOpen={['v1']}
                     />
                  </div>
                </div>
              </div>

              {/* Liquid Accordion */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Liquid Accordion</h3>
                <p className="text-sm mb-6" style={{ color: '#6B7A5E' }}>
                  Enhanced accordion with liquid transitions and mouse tracking effects. Move your mouse over the items to see the interactive glow!
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  
                  {/* Liquid Glass Variant */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>Glass Variant</h4>
                    <LiquidAccordion 
                      items={[
                        createAccordionItem('l1', '🌿 Organic Interactions', 
                          <p style={{ color: '#6B7A5E' }}>Experience natural, flowing animations that respond to user input with organic timing and easing.</p>
                        ),
                        createAccordionItem('l2', '✨ Liquid Effects', 
                          <p style={{ color: '#6B7A5E' }}>Morphing backgrounds and mouse tracking create an immersive, tactile experience.</p>
                        ),
                      ]}
                      variant="glass"
                      allowMultiple
                      defaultOpen={['l1']}
                    />
                  </div>

                  {/* Liquid Bordered Variant */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>Bordered Variant</h4>
                    <LiquidAccordion 
                      items={[
                        createAccordionItem('l3', '🎯 Mouse Tracking', 
                          <p style={{ color: '#6B7A5E' }}>Accordion items respond to cursor movement with subtle glow effects that follow your mouse.</p>
                        ),
                        createAccordionItem('l4', '🌊 Smooth Transitions', 
                          <p style={{ color: '#6B7A5E' }}>Liquid morphing creates seamless transitions between states with natural timing curves.</p>
                        ),
                      ]}
                      variant="bordered"
                      allowMultiple
                      defaultOpen={['l3']}
                    />
                  </div>
                </div>
              </div>

              {/* Accordion Features */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Accordion Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>Single vs Multiple</h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      Control whether multiple items can be open simultaneously with the <code className="px-2 py-1 rounded bg-sage-100 text-sage-800">allowMultiple</code> prop.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>Default Open</h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      Set initial open state with <code className="px-2 py-1 rounded bg-sage-100 text-sage-800">defaultOpen</code> prop accepting an array of item IDs.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>Rich Content</h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      Accordion items support any React content including images, forms, and other components.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>Keyboard Navigation</h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      Full keyboard support with arrow keys, Enter, and Space for accessibility compliance.
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Stepper Components Showcase */}
        <div id="steppers" className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
            Stepper Components
          </h2>
          <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="space-y-12">
              
              {/* Standard Stepper */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Standard Stepper</h3>
                <div className="space-y-8">
                  
                  {/* Basic Stepper */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>Basic Stepper</h4>
                    <Stepper 
                      steps={[
                        createStepperStep('1', 'Setup', 'Install and configure your environment'),
                        createStepperStep('2', 'Customize', 'Tailor components to your needs'),
                        createStepperStep('3', 'Deploy', 'Launch your application'),
                      ]}
                      currentStep={1}
                    />
                  </div>

                  {/* Completed Steps */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>With Completed Steps</h4>
                                         <Stepper 
                       steps={[
                         createStepperStep('s1', 'Planning', 'Define requirements and scope'),
                         createStepperStep('s2', 'Design', 'Create wireframes and prototypes'),
                         createStepperStep('s3', 'Development', 'Build and test features'),
                         createStepperStep('s4', 'Testing', 'Quality assurance and bug fixes'),
                         createStepperStep('s5', 'Launch', 'Deploy to production'),
                       ]}
                       currentStep={3}
                       variant="numbered"
                       size="md"
                     />
                  </div>
                </div>
              </div>

              {/* Vine Stepper */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Vine Stepper</h3>
                <p className="text-sm mb-6" style={{ color: '#6B7A5E' }}>
                  Organic stepper with animated vine-like connectors that grow and breathe naturally.
                </p>
                <div className="space-y-8">
                  
                  {/* Organic Vine Stepper */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>Organic Variant</h4>
                    <VineStepper 
                      steps={[
                        createStepperStep('v1', 'Ideation', 'Brainstorm and research'),
                        createStepperStep('v2', 'Design', 'Create and iterate'),
                        createStepperStep('v3', 'Build', 'Develop and test'),
                        createStepperStep('v4', 'Launch', 'Deploy and monitor'),
                      ]}
                      currentStep={2}
                      variant="organic"
                      size="md"
                    />
                  </div>

                  {/* Liquid Vine Stepper */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>Liquid Variant</h4>
                                         <VineStepper 
                       steps={[
                         createStepperStep('lv1', 'Research', 'Gather insights and data'),
                         createStepperStep('lv2', 'Strategy', 'Plan the approach'),
                         createStepperStep('lv3', 'Execute', 'Implement the solution'),
                         createStepperStep('lv4', 'Measure', 'Analyze results'),
                         createStepperStep('lv5', 'Optimize', 'Improve and iterate'),
                       ]}
                       currentStep={3}
                       variant="flowing"
                       size="lg"
                     />
                  </div>
                </div>
              </div>

              {/* Stepper Features */}
              <div>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Stepper Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>Step States</h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      Steps can be in different states: pending, active, completed, or error. Each state has distinct visual styling.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>Navigation</h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      Support for clickable steps to navigate between completed steps in a non-linear fashion.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>Responsive Design</h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      Steppers adapt to different screen sizes with responsive layouts and touch-friendly interactions.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium" style={{ color: '#4D5D53' }}>Organic Animations</h4>
                    <p className="text-sm" style={{ color: '#6B7A5E' }}>
                      Vine steppers feature organic growth animations that make progress feel natural and alive.
                    </p>
                  </div>
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
