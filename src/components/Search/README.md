# Search Component

A comprehensive search component with autocomplete, recent searches, category filtering, and keyboard navigation.

## Component

### Search
The search component with clean, accessible design and comprehensive functionality.

```tsx
import { Search } from './components'

// Basic usage
<Search
  placeholder="Search..."
  suggestions={suggestions}
  onSearch={(query) => console.log(query)}
  onSuggestionSelect={(suggestion) => console.log(suggestion)}
/>

// Advanced usage with all features
<Search
  placeholder="Search everything..."
  suggestions={suggestions}
  recentSearches={recentSearches}
  categories={categories}
  showCategories
  showRecentSearches
  maxSuggestions={8}
  onSearch={(query) => handleSearch(query)}
  onSuggestionSelect={(suggestion) => handleSuggestionSelect(suggestion)}
  onCategorySelect={(category) => handleCategorySelect(category)}
/>
```

## Props

### SearchProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `"Search..."` | Input placeholder text |
| `value` | `string` | `undefined` | Controlled value |
| `defaultValue` | `string` | `""` | Default value for uncontrolled usage |
| `disabled` | `boolean` | `false` | Disable the search input |
| `loading` | `boolean` | `false` | Show loading spinner |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Search input size |
| `suggestions` | `SearchSuggestion[]` | `[]` | Array of suggestion objects |
| `recentSearches` | `string[]` | `[]` | Array of recent search strings |
| `categories` | `string[]` | `[]` | Array of category strings |
| `showCategories` | `boolean` | `false` | Show category filter buttons |
| `showRecentSearches` | `boolean` | `false` | Show recent searches section |
| `maxSuggestions` | `number` | `5` | Maximum number of suggestions to show |
| `className` | `string` | `""` | Additional CSS classes |

### Callbacks

| Callback | Type | Description |
|----------|------|-------------|
| `onSearch` | `(query: string) => void` | Called when search is submitted |
| `onChange` | `(value: string) => void` | Called when input value changes |
| `onSuggestionSelect` | `(suggestion: SearchSuggestion) => void` | Called when a suggestion is selected |
| `onCategorySelect` | `(category: string) => void` | Called when a category is selected |
| `onFocus` | `() => void` | Called when input is focused |
| `onBlur` | `() => void` | Called when input loses focus |

### SearchSuggestion

```tsx
interface SearchSuggestion {
  id: string
  text: string
  category?: string
  icon?: React.ReactNode
}
```



## Features

### Autocomplete
Intelligent suggestion filtering based on user input with support for icons and categories.

### Recent Searches
Store and display recent search queries for quick access.

### Category Filtering
Filter suggestions by category with visual category selection buttons.

### Keyboard Navigation
- **Arrow Keys**: Navigate through suggestions
- **Enter**: Select highlighted suggestion or submit search
- **Escape**: Close dropdown and blur input

### Accessibility
- Screen reader support with proper ARIA labels
- Keyboard-only navigation
- Focus management and visual indicators
- Semantic HTML structure

### Responsive Design
- Mobile-friendly touch targets
- Adaptive layout for different screen sizes
- Consistent spacing and typography

## Design Philosophy

The search components follow the Organic Modernism design philosophy:

- **Organic Geometry**: Rounded corners and natural shapes
- **Layered Depth**: Subtle shadows and elevation
- **Tactile Elements**: Interactive feedback and hover states
- **Breathing Space**: Generous padding and margins
- **Micro-interactions**: Smooth animations and transitions

### Interactions

The search component features smooth, organic animations and transitions that enhance the user experience without being distracting.

## Usage Examples

### Basic Search with Suggestions

```tsx
const suggestions = [
  { id: '1', text: 'Design Systems', category: 'Documentation' },
  { id: '2', text: 'React Components', category: 'Development' },
  { id: '3', text: 'TypeScript Guide', category: 'Documentation' }
]

<Search
  placeholder="Search documentation..."
  suggestions={suggestions}
  onSearch={(query) => performSearch(query)}
  onSuggestionSelect={(suggestion) => navigateToResult(suggestion)}
/>
```

### Advanced Search with All Features

```tsx
const [searchValue, setSearchValue] = useState('')
const [selectedCategory, setSelectedCategory] = useState(null)

<Search
  placeholder="Search with all features..."
  value={searchValue}
  onChange={setSearchValue}
  suggestions={filteredSuggestions}
  recentSearches={recentSearches}
  categories={categories}
  showCategories
  showRecentSearches
  maxSuggestions={10}
  onSearch={handleSearch}
  onSuggestionSelect={handleSuggestionSelect}
  onCategorySelect={setSelectedCategory}
/>
```



## Performance Considerations

- Suggestions are filtered client-side for fast response
- Dropdown virtualization for large suggestion lists
- Debounced input for external API calls
- Lazy loading of suggestion icons
- Optimized re-renders with React.memo

## Browser Support

- Modern browsers (ES2020+)
- Safari 14+
- Chrome 90+
- Firefox 90+
- Edge 90+ 