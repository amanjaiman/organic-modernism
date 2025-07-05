import React from 'react'
import { Select, MultiSelect } from '../../components'

const Selects: React.FC = () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
  ]

  const groupedOptions = [
    { value: 'g1-1', label: 'Group 1 Option 1' },
    { value: 'g1-2', label: 'Group 1 Option 2' },
    { value: 'g2-1', label: 'Group 2 Option 1' },
    { value: 'g2-2', label: 'Group 2 Option 2' },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#4D5D53' }}>
          Select Components
        </h1>
        <p className="text-xl max-w-2xl mx-auto" style={{ color: '#6B7A5E' }}>
          Elegant dropdowns with smooth animations, search capabilities, and multi-selection support.
        </p>
      </div>

      {/* Select Component */}
      <div className="mb-16">
        <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Select
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B7A5E' }}>
            A single-selection dropdown with search functionality and smooth liquid animations.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Basic Examples</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Select
                  label="Choose an option"
                  placeholder="Select an option..."
                  options={options}
                  helperText="Single selection with search"
                />
                <Select
                  label="Required Selection"
                  placeholder="Select required option..."
                  options={options}
                  required
                  helperText="This field is required"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Select Sizes</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Select
                  label="Small Select"
                  size="sm"
                  placeholder="Small size..."
                  options={options}
                  helperText="Size: sm"
                />
                <Select
                  label="Medium Select"
                  size="md"
                  placeholder="Medium size..."
                  options={options}
                  helperText="Size: md (default)"
                />
                <Select
                  label="Large Select"
                  size="lg"
                  placeholder="Large size..."
                  options={options}
                  helperText="Size: lg"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Select States</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Select
                  label="Error State"
                  error="Please select an option"
                  placeholder="Select option..."
                  options={options}
                />
                <Select
                  label="Success State"
                  success="Valid selection!"
                  placeholder="Select option..."
                  options={options}
                  defaultValue="option2"
                />
                <Select
                  label="Disabled State"
                  disabled
                  placeholder="Cannot select"
                  options={options}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MultiSelect Component */}
      <div className="mb-16">
        <div className="p-8 rounded-3xl shadow-lg border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            MultiSelect
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B7A5E' }}>
            Multiple selection dropdown with tag display, search filtering, and group support.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>Basic MultiSelect</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <MultiSelect
                  label="Select multiple options"
                  placeholder="Choose options..."
                  options={options}
                  helperText="Multiple selection with tags"
                />
                <MultiSelect
                  label="With initial selection"
                  placeholder="Choose options..."
                  options={options}
                  defaultValue={['option1', 'option3']}
                  helperText="Pre-selected options"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>MultiSelect Features</h3>
              <div className="grid md:grid-cols-2 gap-6">
                                 <MultiSelect
                   label="With Max Selection"
                   placeholder="Choose up to 2 options..."
                   options={options}
                   maxSelections={2}
                   helperText="Maximum 2 selections allowed"
                 />
                                 <MultiSelect
                   label="Additional Options"
                   placeholder="Choose from more options..."
                   options={groupedOptions}
                   helperText="Extended option list"
                 />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>MultiSelect Sizes</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <MultiSelect
                  label="Small MultiSelect"
                  size="sm"
                  placeholder="Small size..."
                  options={options}
                  helperText="Size: sm"
                />
                <MultiSelect
                  label="Medium MultiSelect"
                  size="md"
                  placeholder="Medium size..."
                  options={options}
                  helperText="Size: md"
                />
                <MultiSelect
                  label="Large MultiSelect"
                  size="lg"
                  placeholder="Large size..."
                  options={options}
                  helperText="Size: lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Selects 