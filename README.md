# Organic Modernism Design System

A React design system that blends natural harmony with modern precision, built with TypeScript, Vite, and TailwindCSS.

## 🌿 Design Philosophy

**Organic Modernism** is a design language that emphasizes:

- **Organic Geometry**: Blend natural, flowing shapes with precise geometric elements
- **Layered Depth**: Subtle shadows and layering create depth without visual heaviness
- **Tactile Elements**: Components feel textured and weighted, inviting interaction
- **Breathing Space**: Generous spacing creates a luxurious, uncluttered experience
- **Micro-interactions**: Subtle, organic animations that respond naturally to user input

## 🎨 Color Palette

Our color system is built around sage and vintage lace tones:

- **Primary**: `#78866B` (Sage Green)
- **Secondary**: `#8F9779` (Muted Sage)
- **Accent**: `#ACBAA1` (Light Sage)
- **Background**: `#FDFBF8` (Vintage Lace)
- **Surface**: `#F8F2E6` (Warm White)
- **Text**: `#4D5D53` (Deep Forest)

## 🧩 Components

### Button Components
- **Button**: Core button with variants (primary, secondary, ghost, accent) and sizes
- **LiquidButton**: Morphing button with liquid transitions and gradient shifts
- **PressureButton**: Pressure-sensitive button requiring hold duration

### Input Components
- **Input**: Core input field with static liquid glow effects
- **Textarea**: Auto-resizing textarea with character counter and liquid styling

### Form Components
- **Select**: Custom dropdown with search functionality
- **MultiSelect**: Multiple selection dropdown with visual indicators
- **Checkbox**: Custom styled checkbox with smooth animations
- **PressureCheckbox**: Pressure-sensitive checkbox requiring hold duration
- **Radio**: Custom styled radio button groups

### Navigation Components
- **Navigation**: Horizontal navigation bar with dropdown menus
- **SideNav**: Collapsible side navigation with nested items
- **FloatingNav**: Floating navigation anchored to screen sides
- **Breadcrumb**: Breadcrumb navigation with organic connectors
- **Pagination**: Page navigation with liquid transitions
- **Tabs**: Tab navigation with smooth indicators

### Card Components
- **Card**: Standard card with elevation and hover effects
- **LiquidCard**: Card with liquid morphing effects
- **GestureCard**: 3D draggable card with physics

### Feedback Components
- **Modal**: Standard modal with backdrop blur
- **LiquidModal**: Modal with liquid transitions and mouse tracking
- **Toast**: Notification toast with auto-dismiss
- **RippleToast**: Interactive toast with ripple effects
- **Tooltip**: Smart tooltip with positioning
- **Alert**: Status alerts with dismissible options

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **ESLint** - Code linting

## 📁 Project Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── LiquidButton.tsx
│   │   ├── PressureButton.tsx
│   │   └── index.ts
│   ├── Input/
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   └── index.ts
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🎯 Usage Examples

### Basic Input
```tsx
import { Input } from './components'

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
/>
```

### Textarea with Character Count
```tsx
import { Textarea } from './components'

<Textarea
  label="Message"
  placeholder="Type your message..."
  maxLength={200}
  showCharacterCount={true}
/>
```

### Button Variants
```tsx
import { Button } from './components'

<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="ghost">Ghost Button</Button>
```

### FloatingNav
```tsx
import { FloatingNav } from './components'

// Icon mode (default)
<FloatingNav
  items={[
    {
      label: 'Dashboard',
      icon: <DashboardIcon />,
      active: true,
      onClick: () => console.log('Dashboard clicked')
    },
    {
      label: 'Analytics',
      icon: <AnalyticsIcon />,
      badge: '3',
      onClick: () => console.log('Analytics clicked')
    }
  ]}
  side="right"
  variant="liquid"
  size="md"
  displayMode="icon"
  onItemClick={(item) => console.log(`Clicked: ${item.label}`)}
/>

// Text mode for navigation without icons
<FloatingNav
  items={[
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
    }
  ]}
  side="left"
  variant="standard"
  size="md"
  displayMode="text"
  onItemClick={(item) => console.log(`Clicked: ${item.label}`)}
/>
```

## 🎨 Customization

All components use CSS custom properties and TailwindCSS classes, making them easily customizable. The design system follows a consistent color palette and spacing system.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
