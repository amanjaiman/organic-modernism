import React, { useState } from 'react'
import { Search } from '../src/components'
import type { SearchSuggestion } from '../src/components'

const SearchExample: React.FC = () => {
  const [searchValue, setSearchValue] = useState('')

  // Sample data for search demonstrations
  const suggestions: SearchSuggestion[] = [
    { id: '1', text: 'Design Systems', category: 'Documentation', icon: '📚' },
    { id: '2', text: 'React Components', category: 'Development', icon: '⚛️' },
    { id: '3', text: 'TypeScript Guide', category: 'Documentation', icon: '📝' },
    { id: '4', text: 'UI/UX Best Practices', category: 'Design', icon: '🎨' },
    { id: '5', text: 'Component Library', category: 'Development', icon: '🧱' },
    { id: '6', text: 'Accessibility Guidelines', category: 'Documentation', icon: '♿' },
    { id: '7', text: 'Animation Principles', category: 'Design', icon: '✨' },
    { id: '8', text: 'State Management', category: 'Development', icon: '🗂️' },
    { id: '9', text: 'Color Theory', category: 'Design', icon: '🌈' },
    { id: '10', text: 'Performance Optimization', category: 'Development', icon: '⚡' }
  ]

  const recentSearches = [
    'React hooks',
    'CSS Grid',
    'Responsive design',
    'User experience',
    'Component testing'
  ]

  const categories = ['Documentation', 'Development', 'Design', 'Testing', 'Performance']

  const handleSearch = (query: string) => {
    console.log('Search query:', query)
    // Here you would typically perform the actual search
  }

  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    console.log('Selected suggestion:', suggestion)
    // Here you would typically handle the selection
  }

  const handleCategorySelect = (category: string) => {
    console.log('Selected category:', category)
    // Here you would typically filter by category
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-sage-900">Search Component Examples</h1>
        <p className="text-lg text-sage-600">
          Comprehensive search functionality with autocomplete, categories, and keyboard navigation
        </p>
      </div>

      {/* Standard Search */}
      <section className="space-y-6">
        <div className="border-b border-sage-200 pb-4">
          <h2 className="text-2xl font-semibold text-sage-900 mb-2">Standard Search</h2>
          <p className="text-sage-600">
            Clean, accessible search with autocomplete, recent searches, and category filtering
          </p>
        </div>

        <div className="grid gap-6">
          {/* Basic Search */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-sage-800">Basic Search</h3>
            <div className="max-w-md">
              <Search
                placeholder="Search documentation..."
                value={searchValue}
                onChange={setSearchValue}
                onSearch={handleSearch}
                suggestions={suggestions}
                onSuggestionSelect={handleSuggestionSelect}
              />
            </div>
          </div>

          {/* Search with Categories and Recent Searches */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-sage-800">Advanced Search Features</h3>
            <div className="max-w-md">
              <Search
                placeholder="Search with categories..."
                suggestions={suggestions}
                recentSearches={recentSearches}
                categories={categories}
                showCategories
                showRecentSearches
                onSearch={handleSearch}
                onSuggestionSelect={handleSuggestionSelect}
                onCategorySelect={handleCategorySelect}
              />
            </div>
          </div>

          {/* Search Sizes */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-sage-800">Different Sizes</h3>
            <div className="space-y-4">
              <div className="max-w-xs">
                <label className="block text-sm font-medium text-sage-700 mb-2">Small</label>
                <Search
                  size="sm"
                  placeholder="Small search..."
                  suggestions={suggestions.slice(0, 3)}
                  onSearch={handleSearch}
                />
              </div>
              <div className="max-w-md">
                <label className="block text-sm font-medium text-sage-700 mb-2">Medium (Default)</label>
                <Search
                  size="md"
                  placeholder="Medium search..."
                  suggestions={suggestions.slice(0, 3)}
                  onSearch={handleSearch}
                />
              </div>
              <div className="max-w-lg">
                <label className="block text-sm font-medium text-sage-700 mb-2">Large</label>
                <Search
                  size="lg"
                  placeholder="Large search..."
                  suggestions={suggestions.slice(0, 3)}
                  onSearch={handleSearch}
                />
              </div>
            </div>
          </div>

          {/* Search States */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-sage-800">Different States</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-2">Loading State</label>
                <Search
                  placeholder="Loading..."
                  loading
                  suggestions={suggestions.slice(0, 3)}
                  onSearch={handleSearch}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-2">Disabled State</label>
                <Search
                  placeholder="Disabled search..."
                  disabled
                  suggestions={suggestions.slice(0, 3)}
                  onSearch={handleSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="space-y-6">
        <div className="border-b border-sage-200 pb-4">
          <h2 className="text-2xl font-semibold text-sage-900 mb-2">Advanced Features</h2>
          <p className="text-sage-600">
            Comprehensive search with all features enabled
          </p>
        </div>

        <div className="max-w-lg">
          <Search
            placeholder="Search everything..."
            suggestions={suggestions}
            recentSearches={recentSearches}
            categories={categories}
            showCategories
            showRecentSearches
            maxSuggestions={8}
            onSearch={handleSearch}
            onSuggestionSelect={handleSuggestionSelect}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      </section>

      {/* Usage Notes */}
      <section className="space-y-4">
        <div className="border-b border-sage-200 pb-4">
          <h2 className="text-2xl font-semibold text-sage-900 mb-2">Usage Notes</h2>
        </div>
        
        <div className="bg-sage-50 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-medium text-sage-900">Key Features</h3>
          <ul className="space-y-2 text-sage-700">
            <li className="flex items-start gap-2">
              <span className="text-sage-500 mt-1">•</span>
              <span><strong>Autocomplete:</strong> Intelligent suggestions with filtering</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sage-500 mt-1">•</span>
              <span><strong>Categories:</strong> Filter suggestions by category</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sage-500 mt-1">•</span>
              <span><strong>Recent Searches:</strong> Quick access to previous searches</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sage-500 mt-1">•</span>
              <span><strong>Keyboard Navigation:</strong> Arrow keys, Enter, and Escape support</span>
            </li>

            <li className="flex items-start gap-2">
              <span className="text-sage-500 mt-1">•</span>
              <span><strong>Accessibility:</strong> Screen reader support and keyboard accessibility</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default SearchExample 