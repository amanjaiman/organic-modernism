import React, { useState } from 'react'
import { Navigation, SideNav, Breadcrumb, Pagination, Tabs } from '../../components'
import Modal from '../../components/Modal/Modal'

const NavigationPage: React.FC = () => {
  const [isSideNavModalOpen, setIsSideNavModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const navItems = [
    { label: 'Home', href: '/', active: true },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Contact', href: '/contact' },
  ]

  const sideNavItems = [
    { 
      label: 'Dashboard', 
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/></svg>,
      active: true 
    },
    { 
      label: 'Analytics', 
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/></svg>,
      badge: '5'
    },
    { 
      label: 'Projects', 
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/></svg>,
      children: [
        { label: 'Active Projects', badge: '3' },
        { label: 'Completed Projects' },
        { label: 'Archived Projects' }
      ]
    },
    { 
      label: 'Team', 
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>
    },
    { 
      label: 'Settings', 
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/></svg>
    }
  ]

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Smartphones', href: '/products/electronics/smartphones' },
  ]

  const tabItems = [
    { id: 'overview', label: 'Overview', content: <div className="p-6 text-center"><p className="text-gray-600">Overview content with detailed information about our services and features.</p></div> },
    { id: 'features', label: 'Features', content: <div className="p-6 text-center"><p className="text-gray-600">Comprehensive feature list and capabilities of our platform.</p></div> },
    { id: 'pricing', label: 'Pricing', content: <div className="p-6 text-center"><p className="text-gray-600">Flexible pricing plans to suit your business needs.</p></div> },
    { id: 'support', label: 'Support', content: <div className="p-6 text-center"><p className="text-gray-600">24/7 customer support and comprehensive documentation.</p></div> },
  ]

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#4D5D53' }}>
          Navigation Components
        </h1>
        <p className="text-xl max-w-3xl mx-auto" style={{ color: '#6B7A5E' }}>
          Intuitive navigation elements with smooth transitions, responsive design, and interactive features.
        </p>
      </div>

      {/* Navigation Bar Examples */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8" style={{ color: '#4D5D53' }}>
          Navigation Bar
        </h2>
        
        <div className="space-y-8">
          {/* Standard Navigation */}
          <div>
            <h3 className="text-lg font-medium mb-4" style={{ color: '#4D5D53' }}>Standard Navigation</h3>
            <div className="p-6 rounded-2xl border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
              <Navigation items={navItems} />
            </div>
          </div>

          {/* Navigation Variants */}
          <div>
            <h3 className="text-lg font-medium mb-4" style={{ color: '#4D5D53' }}>Navigation Variants</h3>
            <div className="grid gap-6">
              <div className="p-6 rounded-2xl border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
                <div className="mb-2 text-sm font-medium" style={{ color: '#6B7A5E' }}>Liquid Effect</div>
                <Navigation items={navItems} variant="liquid" />
              </div>
              <div className="p-6 rounded-2xl border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
                <div className="mb-2 text-sm font-medium" style={{ color: '#6B7A5E' }}>Time-Aware</div>
                <Navigation items={navItems} variant="time-aware" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SideNav Example */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8" style={{ color: '#4D5D53' }}>
          Side Navigation
        </h2>
        
        <div className="p-6 rounded-2xl border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <p className="text-base mb-4" style={{ color: '#6B7A5E' }}>
            Vertical sidebar navigation with collapsible sections, icons, and badges.
          </p>
          <button
            onClick={() => setIsSideNavModalOpen(true)}
            className="px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: '#78866B', color: 'white' }}
          >
            Open SideNav Demo
          </button>
        </div>
      </div>

      {/* Breadcrumb Examples */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8" style={{ color: '#4D5D53' }}>
          Breadcrumb Navigation
        </h2>
        
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="mb-2 text-sm font-medium" style={{ color: '#6B7A5E' }}>Standard Breadcrumb</div>
            <Breadcrumb items={breadcrumbItems} />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
              <div className="mb-2 text-sm font-medium" style={{ color: '#6B7A5E' }}>Arrow Style</div>
              <Breadcrumb items={breadcrumbItems} separator="arrow" />
            </div>
            <div className="p-6 rounded-2xl border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
              <div className="mb-2 text-sm font-medium" style={{ color: '#6B7A5E' }}>Dot Style</div>
              <Breadcrumb items={breadcrumbItems} separator="dot" />
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Examples */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8" style={{ color: '#4D5D53' }}>
          Pagination
        </h2>
        
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border flex justify-center" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
            <div className="text-center">
              <div className="mb-4 text-sm font-medium" style={{ color: '#6B7A5E' }}>Standard Pagination</div>
              <Pagination
                currentPage={5}
                totalPages={12}
                onPageChange={(page) => console.log(`Page changed to: ${page}`)}
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border flex justify-center" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
              <div className="text-center">
                <div className="mb-4 text-sm font-medium" style={{ color: '#6B7A5E' }}>Compact</div>
                <Pagination
                  currentPage={2}
                  totalPages={5}
                  showFirstLast={false}
                  onPageChange={(page) => console.log(`Page: ${page}`)}
                />
              </div>
            </div>
            <div className="p-6 rounded-2xl border flex justify-center" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
              <div className="text-center">
                <div className="mb-4 text-sm font-medium" style={{ color: '#6B7A5E' }}>With First/Last</div>
                <Pagination
                  currentPage={8}
                  totalPages={25}
                  showFirstLast={true}
                  onPageChange={(page) => console.log(`Page: ${page}`)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Example */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8" style={{ color: '#4D5D53' }}>
          Tabs Navigation
        </h2>
        
        <div className="p-6 rounded-2xl border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <Tabs
            items={tabItems}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>

      {/* SideNav Modal */}
      <Modal
        isOpen={isSideNavModalOpen}
        onClose={() => setIsSideNavModalOpen(false)}
        title="Side Navigation Demo"
        size="xl"
      >
        <div className="flex h-96 rounded-xl overflow-hidden border" style={{ borderColor: '#F8F2E6' }}>
          <div className="w-72 bg-white">
            <SideNav 
              items={sideNavItems}
              positioning="relative"
              showHeader={true}
            />
          </div>
          <div className="flex-1 p-8 flex items-center justify-center" style={{ backgroundColor: '#FDFBF8' }}>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#4D5D53' }}>
                Main Content Area
              </h3>
              <p style={{ color: '#6B7A5E' }}>
                This is where your main content would appear alongside the side navigation.
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default NavigationPage 