import React, { useState, useRef, useEffect } from 'react'

export interface SearchSuggestion {
  id: string
  text: string
  category?: string
  icon?: React.ReactNode
}

export interface SearchProps {
  placeholder?: string
  value?: string
  defaultValue?: string
  disabled?: boolean
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
  suggestions?: SearchSuggestion[]
  recentSearches?: string[]
  categories?: string[]
  showCategories?: boolean
  showRecentSearches?: boolean
  maxSuggestions?: number
  className?: string
  onSearch?: (query: string) => void
  onChange?: (value: string) => void
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void
  onCategorySelect?: (category: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const Search: React.FC<SearchProps> = ({
  placeholder = 'Search...',
  value,
  defaultValue = '',
  disabled = false,
  loading = false,
  size = 'md',
  suggestions = [],
  recentSearches = [],
  categories = [],
  showCategories = false,
  showRecentSearches = false,
  maxSuggestions = 5,
  className = '',
  onSearch,
  onChange,
  onSuggestionSelect,
  onCategorySelect,
  onFocus,
  onBlur
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [isFocused, setIsFocused] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  const searchRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentValue = value !== undefined ? value : internalValue

  // Filter suggestions based on current query and selected category
  const filteredSuggestions = suggestions
    .filter(suggestion => {
      const matchesQuery = suggestion.text.toLowerCase().includes(currentValue.toLowerCase())
      const matchesCategory = !selectedCategory || suggestion.category === selectedCategory
      return matchesQuery && matchesCategory
    })
    .slice(0, maxSuggestions)

  // Filter recent searches based on current query
  const filteredRecentSearches = recentSearches
    .filter(search => search.toLowerCase().includes(currentValue.toLowerCase()))
    .slice(0, 3)

  const allDropdownItems = [
    ...(showCategories ? categories.map(cat => ({ type: 'category', text: cat })) : []),
    ...(showRecentSearches && filteredRecentSearches.length > 0 ? 
      filteredRecentSearches.map(search => ({ type: 'recent', text: search })) : []),
    ...filteredSuggestions.map(suggestion => ({ type: 'suggestion', ...suggestion }))
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (value === undefined) {
      setInternalValue(newValue)
    }
    setHighlightedIndex(-1)
    setShowDropdown(true)
    onChange?.(newValue)
  }

  const handleInputFocus = () => {
    setIsFocused(true)
    setShowDropdown(true)
    onFocus?.()
  }

  const handleInputBlur = () => {
    // Delay blur to allow for dropdown clicks
    setTimeout(() => {
      setIsFocused(false)
      setShowDropdown(false)
      setHighlightedIndex(-1)
      onBlur?.()
    }, 200)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < allDropdownItems.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : allDropdownItems.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0) {
          handleItemSelect(allDropdownItems[highlightedIndex])
        } else {
          handleSearch()
        }
        break
      case 'Escape':
        setShowDropdown(false)
        setHighlightedIndex(-1)
        searchRef.current?.blur()
        break
    }
  }

  const handleItemSelect = (item: any) => {
    if (item.type === 'category') {
      setSelectedCategory(item.text)
      onCategorySelect?.(item.text)
    } else if (item.type === 'recent') {
      if (value === undefined) {
        setInternalValue(item.text)
      }
      onChange?.(item.text)
      handleSearch(item.text)
    } else if (item.type === 'suggestion') {
      if (value === undefined) {
        setInternalValue(item.text)
      }
      onChange?.(item.text)
      onSuggestionSelect?.(item)
    }
    setShowDropdown(false)
    setHighlightedIndex(-1)
  }

  const handleSearch = (query?: string) => {
    const searchQuery = query || currentValue
    if (searchQuery.trim()) {
      onSearch?.(searchQuery.trim())
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch()
  }

  const clearSearch = () => {
    if (value === undefined) {
      setInternalValue('')
    }
    onChange?.('')
    setSelectedCategory(null)
    searchRef.current?.focus()
  }

  const sizes = {
    sm: {
      input: 'px-3 py-2 text-sm h-9',
      icon: 'w-4 h-4',
      dropdown: 'text-sm'
    },
    md: {
      input: 'px-4 py-3 text-base h-11',
      icon: 'w-5 h-5',
      dropdown: 'text-base'
    },
    lg: {
      input: 'px-5 py-4 text-lg h-14',
      icon: 'w-6 h-6',
      dropdown: 'text-lg'
    }
  }

  const getInputStyles = () => {
    if (disabled) {
      return {
        backgroundColor: '#F4F6F2',
        borderColor: '#E8ECDE',
        color: '#8F9779',
        cursor: 'not-allowed'
      }
    }
    
    return {
      backgroundColor: '#FDFBF8',
      borderColor: isFocused ? '#78866B' : '#F3ECE0',
      color: '#4D5D53',
      boxShadow: isFocused ? `0 0 20px rgba(120, 134, 107, 0.4)` : 'none'
    }
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        {/* Search Input */}
        <div className="relative">
          {/* Liquid glow effect */}
          {isFocused && !disabled && (
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                background: `radial-gradient(circle at 30% 40%, rgba(120, 134, 107, 0.12) 0%, transparent 70%)`,
                transition: 'opacity 0.5s ease-out',
                opacity: 1
              }}
            />
          )}

          <input
            ref={searchRef}
            type="text"
            value={currentValue}
            placeholder={placeholder}
            disabled={disabled}
            className={`
              relative w-full border-2 rounded-2xl transition-all duration-500 ease-out
              focus:outline-none pl-12 pr-12
              ${sizes[size].input}
              ${disabled ? 'cursor-not-allowed' : ''}
            `}
            style={{
              ...getInputStyles(),
              borderRadius: '16px',
              transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
            }}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
          />

          {/* Search Icon */}
          <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${sizes[size].icon}`}>
            {loading ? (
              <div className="animate-spin rounded-full border-2 border-sage-300 border-t-sage-600 w-full h-full" />
            ) : (
              <svg
                className="w-full h-full text-sage-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </div>

          {/* Clear Button */}
          {currentValue && !disabled && (
            <button
              type="button"
              onClick={clearSearch}
              className={`
                absolute right-4 top-1/2 transform -translate-y-1/2 
                ${sizes[size].icon} text-sage-400 hover:text-sage-600 
                transition-colors duration-200
              `}
            >
              <svg
                className="w-full h-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {/* Category indicator */}
          {selectedCategory && (
            <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
              <span className="text-xs bg-sage-100 text-sage-700 px-2 py-1 rounded-full">
                {selectedCategory}
              </span>
            </div>
          )}
        </div>

        {/* Dropdown */}
        {showDropdown && (isFocused || currentValue) && allDropdownItems.length > 0 && (
          <div
            ref={dropdownRef}
            className={`
              absolute top-full left-0 right-0 mt-2 bg-white border border-sage-200 
              rounded-2xl shadow-lg z-50 max-h-80 overflow-y-auto
              ${sizes[size].dropdown}
            `}
            style={{
              backgroundColor: '#FDFBF8',
              borderColor: '#F3ECE0',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            {/* Categories */}
            {showCategories && categories.length > 0 && (
              <div className="px-4 py-2 border-b border-sage-100">
                <p className="text-sage-500 text-xs font-medium mb-2">Categories</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <button
                      key={category}
                      onClick={() => handleItemSelect({ type: 'category', text: category })}
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium transition-all duration-200
                        ${selectedCategory === category 
                          ? 'bg-sage-500 text-white' 
                          : 'bg-sage-100 text-sage-700 hover:bg-sage-200'}
                        ${highlightedIndex === index ? 'ring-2 ring-sage-300' : ''}
                      `}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Searches */}
            {showRecentSearches && filteredRecentSearches.length > 0 && (
              <div className="px-4 py-2 border-b border-sage-100">
                <p className="text-sage-500 text-xs font-medium mb-2">Recent Searches</p>
                {filteredRecentSearches.map((search, index) => {
                  const itemIndex = categories.length + index
                  return (
                    <button
                      key={search}
                      onClick={() => handleItemSelect({ type: 'recent', text: search })}
                      className={`
                        w-full text-left px-2 py-2 rounded-lg transition-all duration-200
                        ${highlightedIndex === itemIndex 
                          ? 'bg-sage-50 text-sage-900' 
                          : 'text-sage-700 hover:bg-sage-50'}
                      `}
                    >
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-sage-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{search}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            {/* Suggestions */}
            {filteredSuggestions.length > 0 && (
              <div className="px-4 py-2">
                {filteredSuggestions.length > 0 && (
                  <p className="text-sage-500 text-xs font-medium mb-2">Suggestions</p>
                )}
                {filteredSuggestions.map((suggestion, index) => {
                  const itemIndex = categories.length + filteredRecentSearches.length + index
                  return (
                    <button
                      key={suggestion.id}
                      onClick={() => handleItemSelect({ type: 'suggestion', ...suggestion })}
                      className={`
                        w-full text-left px-2 py-2 rounded-lg transition-all duration-200
                        ${highlightedIndex === itemIndex 
                          ? 'bg-sage-50 text-sage-900' 
                          : 'text-sage-700 hover:bg-sage-50'}
                      `}
                    >
                      <div className="flex items-center gap-2">
                        {suggestion.icon || (
                          <svg className="w-4 h-4 text-sage-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        )}
                        <span>{suggestion.text}</span>
                        {suggestion.category && (
                          <span className="ml-auto text-xs text-sage-500">
                            {suggestion.category}
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  )
} 