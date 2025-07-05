# Card Component Family

A collection of card components that embody our organic modernism design philosophy, offering both standard layouts and unique interactive experiences.

## Components

### 1. Card (Standard)
The foundation card component with multiple variants and customization options.

```tsx
import { Card } from '@/components'

// Basic usage
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here...</p>
</Card>

// With all options
<Card
  variant="elevated"
  elevation="md"
  padding="lg"
  rounded="lg"
  hoverable
  onClick={() => console.log('Card clicked')}
>
  Content
</Card>
```

#### Props
- `variant`: `'elevated' | 'outlined' | 'filled' | 'glass'` - Visual style variant
- `elevation`: `'none' | 'sm' | 'md' | 'lg' | 'xl'` - Shadow depth level
- `padding`: `'none' | 'sm' | 'md' | 'lg' | 'xl'` - Internal spacing
- `rounded`: `'sm' | 'md' | 'lg' | 'xl'` - Border radius size
- `hoverable`: `boolean` - Enables hover lifting animation
- `onClick`: `() => void` - Click handler
- `className`: `string` - Additional CSS classes

### 2. LiquidCard
Interactive card with morphing liquid effects that respond to cursor movement.

```tsx
import { LiquidCard } from '@/components'

<LiquidCard padding="lg" onClick={() => console.log('Liquid clicked')}>
  <h3>Liquid Card</h3>
  <p>Hover to see liquid morphing effects...</p>
</LiquidCard>
```

#### Props
- `padding`: `'sm' | 'md' | 'lg' | 'xl'` - Internal spacing
- `onClick`: `() => void` - Click handler
- `className`: `string` - Additional CSS classes

#### Features
- **Cursor-following effects**: Radial gradients follow mouse movement
- **Morphing borders**: Border radius changes on hover
- **Floating light**: Subtle light effect that follows cursor
- **Smooth transitions**: Cubic-bezier easing for organic feel

### 3. GestureCard
3D draggable card with natural physics and perspective transforms.

```tsx
import { GestureCard } from '@/components'

<GestureCard 
  padding="lg" 
  intensity="medium"
  onClick={() => console.log('Gesture clicked')}
>
  <h3>Gesture Card</h3>
  <p>Click and drag to experience 3D physics...</p>
</GestureCard>
```

#### Props
- `padding`: `'sm' | 'md' | 'lg' | 'xl'` - Internal spacing
- `intensity`: `'subtle' | 'medium' | 'strong'` - Interaction intensity level
- `onClick`: `() => void` - Click handler
- `className`: `string` - Additional CSS classes

#### Features
- **3D Perspective**: Full perspective transforms with realistic depth
- **Drag Physics**: Natural dragging with momentum and spring-back
- **Rotation Effects**: Card rotates based on mouse position and drag
- **Intensity Levels**: Configurable interaction strength
- **Visual Feedback**: Drag indicator and enhanced shadows

## Design Variants

### Standard Card Variants

#### Elevated
- **Use Case**: Primary content containers, product cards
- **Characteristics**: Clean shadows, subtle elevation
- **Background**: Vintage Lace 50 (#FDFCFA)

#### Outlined
- **Use Case**: Secondary content, form sections
- **Characteristics**: Subtle border, minimal elevation
- **Background**: Vintage Lace 50 with Vintage Lace 300 border

#### Filled
- **Use Case**: Highlighted content, call-to-action areas
- **Characteristics**: Filled background with organic warmth
- **Background**: Vintage Lace 200 (#F6F3E8)

#### Glass
- **Use Case**: Overlay content, modal backgrounds
- **Characteristics**: Frosted glass effect with backdrop blur
- **Background**: Semi-transparent with backdrop filter

## Elevation System

Our elevation system creates depth hierarchy using layered shadows:

- **None**: No shadow, flat appearance
- **SM**: `shadow-sm` - Subtle depth for minimal elevation
- **MD**: `shadow-md` - Standard elevation for most cards
- **LG**: `shadow-lg` - Prominent elevation for important content
- **XL**: `shadow-xl` - Maximum elevation for floating elements

## Spacing System

Consistent padding scale for different content densities:

- **SM**: `p-4` (16px) - Compact content
- **MD**: `p-6` (24px) - Standard content
- **LG**: `p-8` (32px) - Generous spacing
- **XL**: `p-10` (40px) - Luxury spacing

## Accessibility

### Keyboard Navigation
- All cards support focus states
- Clickable cards are keyboard accessible
- Focus indicators use our sage color palette

### Screen Readers
- Proper semantic structure
- Descriptive content for interactive elements
- Clear hierarchy with headings

### Reduced Motion
- Respects `prefers-reduced-motion` setting
- Fallback to simple opacity changes
- Essential functionality preserved

## Best Practices

### When to Use Each Component

#### Standard Card
- Product listings
- Content sections
- Information panels
- Form containers

#### LiquidCard
- Hero sections
- Interactive showcases
- Feature highlights
- Engagement-focused content

#### GestureCard
- Gamified elements
- Interactive features
- Playful applications
- Experimental interfaces

### Performance Considerations

#### Standard Card
- Lightweight and fast
- Minimal JavaScript overhead
- CSS-only animations

#### LiquidCard
- Moderate performance impact
- Mouse tracking calculations
- Optimized for 60fps animations

#### GestureCard
- Higher performance requirements
- 3D transforms and physics
- Best for limited instances

### Responsive Design

All card components are responsive by default:
- Flexible sizing with container queries
- Touch-friendly interaction areas
- Adaptive spacing on mobile devices

## Examples

### Product Card
```tsx
<Card variant="elevated" elevation="md" hoverable>
  <img src="product.jpg" alt="Product" />
  <h3>Product Name</h3>
  <p>Product description...</p>
  <div className="flex justify-between">
    <span>$49.99</span>
    <button>Add to Cart</button>
  </div>
</Card>
```

### Profile Card with Liquid Effects
```tsx
<LiquidCard padding="lg">
  <div className="flex items-center space-x-4">
    <Avatar src="avatar.jpg" />
    <div>
      <h3>John Doe</h3>
      <p>Senior Designer</p>
    </div>
  </div>
  <p>Bio text...</p>
  <div className="flex space-x-2">
    <Tag>Design</Tag>
    <Tag>UX</Tag>
  </div>
</LiquidCard>
```

### Interactive Feature Card
```tsx
<GestureCard padding="lg" intensity="medium">
  <div className="text-center">
    <Icon name="game" size="xl" />
    <h3>Interactive Feature</h3>
    <p>Drag this card to experience 3D physics!</p>
    <Button>Try It Out</Button>
  </div>
</GestureCard>
```

## Technical Implementation

### CSS Custom Properties
Cards use CSS custom properties for consistent theming:
- `--card-bg`: Background color
- `--card-border`: Border color
- `--card-shadow`: Shadow values
- `--card-radius`: Border radius

### Animation Performance
- Uses `transform` and `opacity` for smooth animations
- Hardware acceleration with `transform3d`
- Optimized transition timing functions
- Minimal layout thrashing

### Browser Support
- Modern browsers (ES2020+)
- Graceful degradation for older browsers
- Progressive enhancement for advanced features

## Customization

### Extending Variants
```tsx
// Custom variant with additional styling
<Card 
  variant="elevated"
  className="border-2 border-sage-300 bg-gradient-to-br from-sage-50 to-vintage-lace-100"
>
  Content
</Card>
```

### Custom Animations
```tsx
// Override default animations
<Card 
  className="transition-all duration-500 hover:rotate-3 hover:scale-105"
>
  Content
</Card>
```

### Theme Integration
Cards automatically inherit theme colors and can be customized through CSS variables or Tailwind configuration. 