import React, { useState } from 'react'
import { Select, MultiSelect, SelectOption } from '../src/components'

const SelectExample: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const [multiSelectedValues, setMultiSelectedValues] = useState<string[]>([])

  const options: SelectOption[] = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'nuxt', label: 'Nuxt.js' },
    { value: 'gatsby', label: 'Gatsby', disabled: true },
    { value: 'remix', label: 'Remix' },
  ]

  const countryOptions: SelectOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'au', label: 'Australia' },
  ]

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#4D5D53' }}>
          Select Components
        </h1>
        <p className="text-lg" style={{ color: '#6B7A5E' }}>
          Dropdown selection components with organic modernism design
        </p>
      </div>

      {/* Standard Select Examples */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
          Standard Select
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Select
              label="Choose Framework"
              placeholder="Select a framework..."
              options={options}
              value={selectedValue}
              onChange={setSelectedValue}
              helperText="Select your preferred frontend framework"
            />
            
            <Select
              label="Choose Framework (Searchable)"
              placeholder="Search frameworks..."
              options={options}
              searchable
              helperText="Type to search through options"
            />
            
            <Select
              label="Small Size"
              placeholder="Select..."
              options={options.slice(0, 4)}
              size="sm"
            />
          </div>
          
          <div className="space-y-6">
            <Select
              label="Large Size"
              placeholder="Select..."
              options={options.slice(0, 4)}
              size="lg"
            />
            
            <Select
              label="With Error"
              placeholder="Select..."
              options={options.slice(0, 4)}
              error="Please select a valid option"
            />
            
            <Select
              label="With Success"
              placeholder="Select..."
              options={options.slice(0, 4)}
              success="Great choice!"
              defaultValue="react"
            />
          </div>
        </div>
      </section>

      {/* MultiSelect Examples */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
          MultiSelect with Ripple Effects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <MultiSelect
              label="Choose Multiple Frameworks"
              placeholder="Select frameworks..."
              options={options}
              value={multiSelectedValues}
              onChange={setMultiSelectedValues}
              helperText="Select multiple frameworks. Click to see ripple effects!"
            />
            
            <MultiSelect
              label="Limited Selection (Max 3)"
              placeholder="Select up to 3..."
              options={countryOptions}
              maxSelections={3}
              helperText="You can select up to 3 countries"
            />
          </div>
          
          <div className="space-y-6">
            <MultiSelect
              label="Searchable MultiSelect"
              placeholder="Search and select..."
              options={options}
              searchable
              helperText="Type to search, click to select with ripple effects"
            />
            
            <MultiSelect
              label="Small Size"
              placeholder="Select..."
              options={options.slice(0, 4)}
              size="sm"
            />
          </div>
        </div>
      </section>

      {/* Selected Values Display */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
          Selected Values
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl" style={{ backgroundColor: '#F4F6F2' }}>
            <h3 className="font-semibold mb-2" style={{ color: '#4D5D53' }}>
              Single Select Value:
            </h3>
            <p style={{ color: '#6B7A5E' }}>
              {selectedValue || 'None selected'}
            </p>
          </div>
          
          <div className="p-6 rounded-2xl" style={{ backgroundColor: '#F4F6F2' }}>
            <h3 className="font-semibold mb-2" style={{ color: '#4D5D53' }}>
              Multi Select Values:
            </h3>
            <p style={{ color: '#6B7A5E' }}>
              {multiSelectedValues.length > 0 ? multiSelectedValues.join(', ') : 'None selected'}
            </p>
          </div>
        </div>
      </section>

      {/* Disabled State */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
          Disabled States
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Select
            label="Disabled Select"
            placeholder="Cannot select..."
            options={options.slice(0, 4)}
            disabled
            helperText="This select is disabled"
          />
          
          <MultiSelect
            label="Disabled MultiSelect"
            placeholder="Cannot select..."
            options={options.slice(0, 4)}
            disabled
            helperText="This multiselect is disabled"
          />
        </div>
      </section>
    </div>
  )
}

export default SelectExample 