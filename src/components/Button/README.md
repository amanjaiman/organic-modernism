# Button Components

A collection of beautiful, organic button components for our design system.

## Components

### Button
The main button component with variants and sizes.

```tsx
import { Button } from './components'

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="accent">Accent</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With click handler
<Button onClick={() => console.log('Clicked!')}>
  Interactive Button
</Button>
```

### LiquidButton
A button with liquid morphing animation effects.

```tsx
import { LiquidButton } from './components'

<LiquidButton onClick={() => alert('Liquid clicked!')}>
  Liquid Button
</LiquidButton>
```

### PressureButton
A button that responds to pressure/hold duration.

```tsx
import { PressureButton } from './components'

<PressureButton 
  onPressComplete={() => console.log('Hold completed!')}
  duration={2000}
>
  Hold Me
</PressureButton>
```

## Import Examples

```tsx
// Import individual components
import { Button } from './components/Button'
import { LiquidButton } from './components/Button'
import { PressureButton } from './components/Button'

// Or import all from main components
import { Button, LiquidButton, PressureButton } from './components'

// Import with types
import { Button, ButtonProps } from './components'
```

## Props

### ButtonProps
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  onClick?: () => void
}
```

### LiquidButtonProps
```tsx
interface LiquidButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}
```

### PressureButtonProps
```tsx
interface PressureButtonProps {
  children: React.ReactNode
  onPressComplete?: () => void
  className?: string
  duration?: number // Default: 2000ms
}
```

## Design Philosophy

These button components embody our "Organic Modernism" design philosophy:

- **Organic Geometry**: Natural, flowing shapes with precise geometric elements
- **Tactile Elements**: Components feel weighted and textured
- **Micro-interactions**: Subtle animations that respond naturally to user input
- **Layered Depth**: Subtle shadows create depth without visual heaviness

## Color System

All buttons use our sage and vintage lace color palette:

- **Primary**: Sage 600 (#78866B)
- **Secondary**: Lace 200 (#F8F2E6)
- **Accent**: Sage 200 (#BDC9BB)
- **Ghost**: Transparent with sage text 