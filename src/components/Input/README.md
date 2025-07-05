# Input Components

Phase 2 of our design system: Core Input Components with unique interaction patterns.

## Components

### Input
The foundational input component with floating labels and validation states.

```tsx
import { Input } from './components'

// Basic usage
<Input label="Email" type="email" />

// With validation
<Input 
  label="Password"
  type="password"
  error="Password is required"
  required
/>

// Different sizes
<Input label="Small" size="sm" />
<Input label="Medium" size="md" />
<Input label="Large" size="lg" />

// With helper text
<Input 
  label="Username"
  helperText="Must be at least 3 characters"
  success="Username is available!"
/>
```

### LiquidInput
Input with liquid morphing animations on focus - borders breathe and glow organically.

```tsx
import { LiquidInput } from './components'

<LiquidInput
  label="Email"
  type="email"
  placeholder="Focus to see the liquid effect"
  helperText="Watch the field morph as you focus"
/>
```

**Unique Features:**
- Organic border radius morphing using sine waves
- Glowing effect that pulses with variable intensity
- Radial gradient background that moves
- Liquid-like scaling animations

### RippleInput
Input that triggers ripple effects when validation states change.

```tsx
import { RippleInput } from './components'

<RippleInput
  label="Username"
  value={username}
  onChange={setUsername}
  error={error}
  success={success}
  helperText="Ripples appear on validation changes"
/>
```

**Unique Features:**
- Ripples emanate from input center on validation state changes
- Organic growth with mathematical imperfections
- Color-coded ripples (red for errors, green for success)
- Fade-out animation with opacity control

### Textarea
Auto-resizing textarea with morphing character counter.

```tsx
import { Textarea } from './components'

<Textarea
  label="Message"
  maxLength={200}
  showCharacterCount={true}
  autoResize={true}
  placeholder="Type your message..."
/>
```

**Unique Features:**
- Intelligent auto-resize based on content
- Character counter that pulses when approaching limit
- Morphing geometry for the counter display
- Prevents typing beyond maxLength

## Import Examples

```tsx
// Import individual components
import { Input } from './components/Input'
import { LiquidInput } from './components/Input'
import { RippleInput } from './components/Input'
import { Textarea } from './components/Input'

// Or import all from main components
import { Input, LiquidInput, RippleInput, Textarea } from './components'

// Import with types
import { Input, InputProps } from './components'
```

## Props Reference

### InputProps
```tsx
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  label?: string
  placeholder?: string
  value?: string
  defaultValue?: string
  disabled?: boolean
  required?: boolean
  error?: string
  success?: string
  helperText?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}
```

### LiquidInputProps
```tsx
interface LiquidInputProps {
  // Same as InputProps
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  label?: string
  placeholder?: string
  value?: string
  defaultValue?: string
  disabled?: boolean
  required?: boolean
  error?: string
  success?: string
  helperText?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}
```

### RippleInputProps
```tsx
interface RippleInputProps {
  // Same as InputProps
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  label?: string
  placeholder?: string
  value?: string
  defaultValue?: string
  disabled?: boolean
  required?: boolean
  error?: string
  success?: string
  helperText?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}
```

### TextareaProps
```tsx
interface TextareaProps {
  label?: string
  placeholder?: string
  value?: string
  defaultValue?: string
  disabled?: boolean
  required?: boolean
  error?: string
  success?: string
  helperText?: string
  rows?: number                  // Default: 3
  maxRows?: number              // Default: 10
  maxLength?: number
  showCharacterCount?: boolean   // Default: false
  autoResize?: boolean          // Default: true
  className?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}
```

## Design Philosophy

### Organic Modernism in Input Components

1. **Liquid Transitions**: Focus states that morph and breathe organically
   - Border radius varies with sine wave functions
   - Glowing effects with variable intensity
   - Scaling animations that feel natural

2. **Ripple Growth**: Validation feedback through organic ripples
   - Emanate from input center on state changes
   - Mathematical imperfections make them feel natural
   - Color-coded feedback (red/green) for accessibility

3. **Morphing Geometry**: Elements that adapt to content
   - Auto-resize textareas that grow intelligently
   - Character counters that pulse when approaching limits
   - Floating labels that transition smoothly

4. **Tactile Elements**: Components feel weighted and responsive
   - Subtle shadows and elevation changes
   - Smooth transitions with organic easing
   - Visual feedback for all interactions

### Color System Usage

All input components use our sage and vintage lace color palette:

- **Focus States**: Sage 600 (#78866B) borders with Sage 500 (#8F9779) rings
- **Background**: Vintage Lace 100 (#FDFBF8) for main areas
- **Borders**: Vintage Lace 300 (#F3ECE0) for default states
- **Text**: Sage 900 (#4D5D53) for primary text
- **Helper Text**: Sage 700 (#6B7A5E) for secondary text
- **Error States**: System red with appropriate contrast
- **Success States**: System green with appropriate contrast

### Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Clear focus indicators and keyboard navigation
- **Color Contrast**: WCAG AA compliant color combinations
- **Error Handling**: Clear error messages with icons
- **Required Fields**: Visual and semantic indication

### Animation Principles

- **Duration**: 300ms for standard transitions, 500ms for liquid effects
- **Easing**: `cubic-bezier(0.23, 1, 0.32, 1)` for organic feel
- **Organic Variations**: Sine wave functions for natural imperfections
- **Performance**: RequestAnimationFrame for smooth animations
- **Reduced Motion**: Respects user preferences for motion

## Usage Guidelines

### When to Use Each Component

**Input**: Use for most form fields - email, password, text, numbers
**LiquidInput**: Use for premium experiences or key interaction points
**RippleInput**: Use when validation feedback is critical (usernames, forms)
**Textarea**: Use for multi-line text input with dynamic content

### Best Practices

1. **Consistent Sizing**: Use the same size across related form fields
2. **Proper Labels**: Always provide labels for accessibility
3. **Meaningful Validation**: Use clear, helpful error messages
4. **Progressive Enhancement**: Start with basic Input, add effects as needed
5. **Performance**: Use unique interactions sparingly for best performance

### Common Patterns

```tsx
// Login form
<Input label="Email" type="email" required />
<Input label="Password" type="password" required />

// Registration form with validation
<RippleInput 
  label="Username"
  value={username}
  onChange={setUsername}
  error={usernameError}
  success={usernameSuccess}
/>

// Premium contact form
<LiquidInput label="Full Name" required />
<LiquidInput label="Email" type="email" required />
<Textarea 
  label="Message"
  maxLength={500}
  showCharacterCount={true}
/>
``` 