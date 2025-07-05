import React, { useState } from 'react'
import { 
  Navigation, 
  Breadcrumb, 
  Pagination, 
  Tabs,
  type NavigationItem,
  type BreadcrumbItem,
  type TabItem
} from '../src/components'

export const NavigationExample: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState('overview')

  // Navigation items
  const navigationItems: NavigationItem[] = [
    { label: 'Home', href: '#home', active: true },
    { 
      label: 'Products', 
      children: [
        { label: 'All Products', href: '#products' },
        { label: 'Electronics', href: '#electronics' },
        { label: 'Clothing', href: '#clothing' },
        { label: 'Books', href: '#books' }
      ]
    },
    { 
      label: 'Services',
      children: [
        { label: 'Consulting', href: '#consulting' },
        { label: 'Support', href: '#support' },
        { label: 'Training', href: '#training' }
      ]
    },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'Blog', href: '#blog' }
  ]

  // Breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '#home' },
    { label: 'Products', href: '#products' },
    { label: 'Electronics', href: '#electronics' },
    { label: 'Computers', href: '#computers' },
    { label: 'Laptops', href: '#laptops' },
    { label: 'MacBook Pro', active: true }
  ]

  // Tab items
  const tabItems: TabItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: '📋',
      content: (
        <div className="p-6 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
          <h3 className="text-xl font-semibold mb-4" style={{ color: '#4D5D53' }}>
            Product Overview
          </h3>
          <p style={{ color: '#6B7A5E' }}>
            This is the overview tab content with detailed information about the product features and specifications.
          </p>
        </div>
      )
    },
    {
      id: 'features',
      label: 'Features',
      icon: '✨',
      content: (
        <div className="p-6 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
          <h3 className="text-xl font-semibold mb-4" style={{ color: '#4D5D53' }}>
            Key Features
          </h3>
          <ul className="space-y-2" style={{ color: '#6B7A5E' }}>
            <li>• Liquid transitions with morphing effects</li>
            <li>• Gesture-based interactions</li>
            <li>• Time-aware UI adaptations</li>
            <li>• Organic design language</li>
          </ul>
        </div>
      )
    },
    {
      id: 'pricing',
      label: 'Pricing',
      icon: '💰',
      content: (
        <div className="p-6 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
          <h3 className="text-xl font-semibold mb-4" style={{ color: '#4D5D53' }}>
            Pricing Plans
          </h3>
          <p style={{ color: '#6B7A5E' }}>
            Choose from our flexible pricing options designed to scale with your needs.
          </p>
        </div>
      )
    },
    {
      id: 'support',
      label: 'Support',
      icon: '🛠️',
      content: (
        <div className="p-6 rounded-2xl" style={{ backgroundColor: '#F8F2E6' }}>
          <h3 className="text-xl font-semibold mb-4" style={{ color: '#4D5D53' }}>
            Support & Documentation
          </h3>
          <p style={{ color: '#6B7A5E' }}>
            Access comprehensive documentation, tutorials, and community support.
          </p>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-16">
      {/* Navigation Components */}
      <div>
        <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
          Navigation Components
        </h2>
        
        {/* Standard Navigation */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Standard Navigation
          </h3>
          <div className="space-y-6">
            <Navigation
              items={navigationItems}
              logo={<span>🌿 Organic</span>}
              logoHref="#home"
              variant="standard"
              size="md"
              backdrop={true}
            />
            <Navigation
              items={navigationItems}
              logo={<span>🌿 Organic</span>}
              variant="standard"
              size="sm"
              position="static"
            />
          </div>
        </div>

        {/* Liquid Navigation */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Liquid Navigation
            <span className="text-sm font-normal ml-2" style={{ color: '#6B7A5E' }}>
              (Hover over menu items)
            </span>
          </h3>
          <Navigation
            items={navigationItems}
            logo={<span>🌿 Liquid</span>}
            variant="liquid"
            size="md"
            backdrop={true}
          />
        </div>

        {/* Time-Aware Navigation */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Time-Aware Navigation
            <span className="text-sm font-normal ml-2" style={{ color: '#6B7A5E' }}>
              (Adapts to time of day)
            </span>
          </h3>
          <Navigation
            items={navigationItems}
            logo={<span>🌿 Time-Aware</span>}
            variant="time-aware"
            size="md"
          />
        </div>
      </div>

      {/* Breadcrumb Components */}
      <div>
        <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
          Breadcrumb Components
        </h2>
        
        {/* Standard Breadcrumb */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Standard Breadcrumb
          </h3>
          <div className="space-y-4">
            <Breadcrumb
              items={breadcrumbItems}
              variant="standard"
              separator="arrow"
              maxItems={5}
            />
            <Breadcrumb
              items={breadcrumbItems}
              variant="standard"
              separator="slash"
              size="sm"
            />
            <Breadcrumb
              items={breadcrumbItems}
              variant="standard"
              separator="dot"
              size="lg"
            />
          </div>
        </div>

        {/* Vine Breadcrumb */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Vine Breadcrumb
            <span className="text-sm font-normal ml-2" style={{ color: '#6B7A5E' }}>
              (Organic vine-like connectors)
            </span>
          </h3>
          <Breadcrumb
            items={breadcrumbItems}
            variant="vine"
            maxItems={4}
          />
        </div>

        {/* Ripple Breadcrumb */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Ripple Breadcrumb
            <span className="text-sm font-normal ml-2" style={{ color: '#6B7A5E' }}>
              (Click items to see ripple effects)
            </span>
          </h3>
          <Breadcrumb
            items={breadcrumbItems}
            variant="ripple"
            separator="arrow"
            maxItems={5}
          />
        </div>
      </div>

      {/* Pagination Components */}
      <div>
        <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
          Pagination Components
        </h2>
        
        {/* Standard Pagination */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Standard Pagination
          </h3>
          <div className="space-y-6">
            <Pagination
              currentPage={currentPage}
              totalPages={20}
              variant="standard"
              onPageChange={setCurrentPage}
            />
            <Pagination
              currentPage={5}
              totalPages={10}
              variant="standard"
              size="sm"
              maxVisiblePages={5}
              onPageChange={() => {}}
            />
          </div>
        </div>

        {/* Liquid Pagination */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Liquid Pagination
            <span className="text-sm font-normal ml-2" style={{ color: '#6B7A5E' }}>
              (Hover over page numbers)
            </span>
          </h3>
          <Pagination
            currentPage={3}
            totalPages={15}
            variant="liquid"
            onPageChange={() => {}}
          />
        </div>

        {/* Compact Pagination */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Compact Pagination
          </h3>
          <div className="space-y-4">
            <Pagination
              currentPage={7}
              totalPages={25}
              variant="compact"
              onPageChange={() => {}}
            />
            <Pagination
              currentPage={2}
              totalPages={5}
              variant="compact"
              size="lg"
              onPageChange={() => {}}
            />
          </div>
        </div>
      </div>

      {/* Tabs Components */}
      <div>
        <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: '#4D5D53' }}>
          Tabs Components
        </h2>
        
        {/* Standard Tabs */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Standard Tabs
          </h3>
          <div className="space-y-8">
            <Tabs
              items={tabItems}
              activeTab={activeTab}
              variant="standard"
              onTabChange={setActiveTab}
            />
            <Tabs
              items={tabItems.slice(0, 3)}
              variant="standard"
              size="sm"
              fullWidth={true}
            />
          </div>
        </div>

        {/* Underline Tabs */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Underline Tabs
            <span className="text-sm font-normal ml-2" style={{ color: '#6B7A5E' }}>
              (Clean, minimal design)
            </span>
          </h3>
          <Tabs
            items={tabItems}
            variant="underline"
            defaultActiveTab="features"
          />
        </div>

        {/* Gesture Tabs */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Gesture Tabs
            <span className="text-sm font-normal ml-2" style={{ color: '#6B7A5E' }}>
              (Drag tabs to experience 3D effects)
            </span>
          </h3>
          <Tabs
            items={tabItems}
            variant="gesture"
            defaultActiveTab="pricing"
          />
        </div>

        {/* Vertical Tabs */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6" style={{ color: '#4D5D53' }}>
            Vertical Tabs
          </h3>
          <Tabs
            items={tabItems}
            variant="standard"
            orientation="vertical"
            defaultActiveTab="support"
          />
        </div>
      </div>
    </div>
  )
} 