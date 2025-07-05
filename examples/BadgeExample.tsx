import React, { useState } from 'react'
import { Badge, LiquidBadge, RippleBadge } from '../src/components'

const BadgeExample: React.FC = () => {
  const [dismissibleBadges, setDismissibleBadges] = useState({
    standard: true,
    liquid: true,
    ripple: true
  })

  const resetDismissibleBadges = () => {
    setDismissibleBadges({
      standard: true,
      liquid: true,
      ripple: true
    })
  }

  // Example icons
  const StarIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/>
    </svg>
  )

  const BellIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
    </svg>
  )

  const HeartIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
    </svg>
  )

  return (
    <div className="p-8 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#4D5D53' }}>
          Badge Component Examples
        </h1>
        <p className="text-lg" style={{ color: '#6B7A5E' }}>
          Showcasing standard badges with liquid and ripple interaction patterns
        </p>
      </div>

      {/* Standard Badge Variants */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold" style={{ color: '#4D5D53' }}>
          Standard Badge Variants
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Color Variants</h3>
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

          <div>
            <h3 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Size Variants</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>With Icons</h3>
            <div className="flex flex-wrap gap-3">
              <Badge variant="primary" icon={StarIcon}>Featured</Badge>
              <Badge variant="warning" icon={BellIcon}>Notifications</Badge>
              <Badge variant="error" icon={HeartIcon}>Favorites</Badge>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>With Dots</h3>
            <div className="flex flex-wrap gap-3">
              <Badge variant="primary" dot>Active</Badge>
              <Badge variant="success" dot>Online</Badge>
              <Badge variant="warning" dot>Pending</Badge>
              <Badge variant="error" dot>Offline</Badge>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Dismissible Badges</h3>
            <div className="flex flex-wrap gap-3">
              {dismissibleBadges.standard && (
                <Badge 
                  variant="primary" 
                  dismissible
                  onDismiss={() => setDismissibleBadges(prev => ({ ...prev, standard: false }))}
                >
                  Dismissible
                </Badge>
              )}
              <Badge variant="secondary" dismissible>Another Tag</Badge>
              <Badge variant="info" dismissible icon={StarIcon}>With Icon</Badge>
              <button 
                onClick={resetDismissibleBadges}
                className="px-3 py-1 text-sm rounded-lg border transition-colors"
                style={{ 
                  backgroundColor: '#F4F6F2', 
                  borderColor: '#E8EDE4',
                  color: '#4D5D53'
                }}
              >
                Reset Dismissed
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Clickable Badges</h3>
            <div className="flex flex-wrap gap-3">
              <Badge 
                variant="primary" 
                onClick={() => alert('Badge clicked!')}
              >
                Clickable
              </Badge>
              <Badge 
                variant="secondary" 
                onClick={() => alert('Secondary badge clicked!')}
                icon={StarIcon}
              >
                With Icon
              </Badge>
              <Badge 
                variant="info" 
                onClick={() => alert('Info badge clicked!')}
                dot
              >
                With Dot
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Liquid Badge Variants */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold" style={{ color: '#4D5D53' }}>
          Liquid Badge Variants
        </h2>
        <p className="text-base" style={{ color: '#6B7A5E' }}>
          Hover over these badges to see the liquid transition effects
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Liquid Color Variants</h3>
            <div className="flex flex-wrap gap-3">
              <LiquidBadge variant="primary">Primary Liquid</LiquidBadge>
              <LiquidBadge variant="secondary">Secondary Liquid</LiquidBadge>
              <LiquidBadge variant="success">Success Liquid</LiquidBadge>
              <LiquidBadge variant="warning">Warning Liquid</LiquidBadge>
              <LiquidBadge variant="error">Error Liquid</LiquidBadge>
              <LiquidBadge variant="info">Info Liquid</LiquidBadge>
              <LiquidBadge variant="neutral">Neutral Liquid</LiquidBadge>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Liquid Intensity Levels</h3>
            <div className="flex flex-wrap gap-3">
              <LiquidBadge variant="primary" intensity="subtle">Subtle</LiquidBadge>
              <LiquidBadge variant="primary" intensity="moderate">Moderate</LiquidBadge>
              <LiquidBadge variant="primary" intensity="strong">Strong</LiquidBadge>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Liquid with Features</h3>
            <div className="flex flex-wrap gap-3">
              <LiquidBadge variant="primary" icon={StarIcon}>With Icon</LiquidBadge>
              <LiquidBadge variant="success" dot>With Dot</LiquidBadge>
              {dismissibleBadges.liquid && (
                <LiquidBadge 
                  variant="warning" 
                  dismissible
                  onDismiss={() => setDismissibleBadges(prev => ({ ...prev, liquid: false }))}
                >
                  Dismissible
                </LiquidBadge>
              )}
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
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold" style={{ color: '#4D5D53' }}>
          Ripple Badge Variants
        </h2>
        <p className="text-base" style={{ color: '#6B7A5E' }}>
          Click or hover over these badges to see the ripple growth effects
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Ripple Color Variants</h3>
            <div className="flex flex-wrap gap-3">
              <RippleBadge variant="primary">Primary Ripple</RippleBadge>
              <RippleBadge variant="secondary">Secondary Ripple</RippleBadge>
              <RippleBadge variant="success">Success Ripple</RippleBadge>
              <RippleBadge variant="warning">Warning Ripple</RippleBadge>
              <RippleBadge variant="error">Error Ripple</RippleBadge>
              <RippleBadge variant="info">Info Ripple</RippleBadge>
              <RippleBadge variant="neutral">Neutral Ripple</RippleBadge>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Ripple Intensity Levels</h3>
            <div className="flex flex-wrap gap-3">
              <RippleBadge variant="primary" rippleIntensity="subtle">Subtle</RippleBadge>
              <RippleBadge variant="primary" rippleIntensity="moderate">Moderate</RippleBadge>
              <RippleBadge variant="primary" rippleIntensity="strong">Strong</RippleBadge>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Ripple on Hover</h3>
            <div className="flex flex-wrap gap-3">
              <RippleBadge variant="primary" rippleOnHover>Hover for Ripple</RippleBadge>
              <RippleBadge variant="success" rippleOnHover icon={StarIcon}>With Icon</RippleBadge>
              <RippleBadge variant="warning" rippleOnHover dot>With Dot</RippleBadge>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Ripple with Features</h3>
            <div className="flex flex-wrap gap-3">
              <RippleBadge variant="primary" icon={HeartIcon}>With Icon</RippleBadge>
              <RippleBadge variant="success" dot>With Dot</RippleBadge>
              {dismissibleBadges.ripple && (
                <RippleBadge 
                  variant="error" 
                  dismissible
                  onDismiss={() => setDismissibleBadges(prev => ({ ...prev, ripple: false }))}
                >
                  Dismissible
                </RippleBadge>
              )}
              <RippleBadge 
                variant="info" 
                onClick={() => alert('Ripple badge clicked!')}
              >
                Clickable
              </RippleBadge>
            </div>
          </div>
        </div>
      </div>

      {/* Mixed Examples */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold" style={{ color: '#4D5D53' }}>
          Real-World Examples
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Status Indicators</h3>
            <div className="flex flex-wrap gap-3">
              <Badge variant="success" dot>Online</Badge>
              <Badge variant="warning" dot>Away</Badge>
              <Badge variant="error" dot>Offline</Badge>
              <Badge variant="neutral" dot>Unknown</Badge>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Notification Badges</h3>
            <div className="flex flex-wrap gap-3">
              <LiquidBadge variant="error" icon={BellIcon}>3 New</LiquidBadge>
              <RippleBadge variant="primary" icon={HeartIcon}>12 Likes</RippleBadge>
              <Badge variant="info" icon={StarIcon}>Featured</Badge>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Category Tags</h3>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" dismissible>React</Badge>
              <Badge variant="secondary" dismissible>TypeScript</Badge>
              <Badge variant="secondary" dismissible>UI/UX</Badge>
              <Badge variant="secondary" dismissible>Frontend</Badge>
              <Badge variant="secondary" dismissible>Design System</Badge>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3" style={{ color: '#4D5D53' }}>Interactive Elements</h3>
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
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
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
  )
}

export default BadgeExample 