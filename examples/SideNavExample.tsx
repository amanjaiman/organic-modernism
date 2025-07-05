import React, { useState } from 'react'
import { SideNav, Button } from '../src/components'
import type { SideNavItem } from '../src/components'

const SideNavExample = () => {
  const [standardOpen, setStandardOpen] = useState(false)
  const [liquidOpen, setLiquidOpen] = useState(false)
  const [organicOpen, setOrganicOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const sampleItems: SideNavItem[] = [
    {
      label: 'Dashboard',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 2h5v5H2V2zm0 7h5v5H2V9zm7-7h5v5H9V2zm0 7h5v5H9V9z"/>
        </svg>
      ),
      active: true,
      href: '#dashboard'
    },
    {
      label: 'Analytics',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 14V2h2v12H2zm4-8v8h2V6H6zm4 2v6h2V8h-2zm4-4v10h2V4h-2z"/>
        </svg>
      ),
      badge: '3',
      children: [
        { label: 'Overview', href: '#analytics-overview' },
        { label: 'Reports', href: '#analytics-reports', badge: 'New' },
        { label: 'Insights', href: '#analytics-insights' }
      ]
    },
    {
      label: 'Content Management',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M4 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm1 3v1h6V5H5zm0 2v1h6V7H5zm0 2v1h4V9H5z"/>
        </svg>
      ),
      children: [
        { label: 'Articles', href: '#content-articles' },
        { label: 'Media Library', href: '#content-media' },
        { 
          label: 'Categories', 
          href: '#content-categories',
          children: [
            { label: 'Technology', href: '#cat-tech' },
            { label: 'Design', href: '#cat-design', active: true },
            { label: 'Business', href: '#cat-business' },
            { label: 'Lifestyle', href: '#cat-lifestyle' }
          ]
        },
        { label: 'Tags', href: '#content-tags' }
      ]
    },
    {
      label: 'User Management',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3z"/>
        </svg>
      ),
      badge: '12',
      children: [
        { label: 'All Users', href: '#users-all' },
        { label: 'Administrators', href: '#users-admins' },
        { label: 'Moderators', href: '#users-moderators' },
        { label: 'Guests', href: '#users-guests' }
      ]
    },
    {
      label: 'E-commerce',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
      ),
      children: [
        { label: 'Products', href: '#ecommerce-products' },
        { label: 'Orders', href: '#ecommerce-orders', badge: '5' },
        { label: 'Customers', href: '#ecommerce-customers' },
        { label: 'Inventory', href: '#ecommerce-inventory' }
      ]
    },
    {
      label: 'Settings',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
        </svg>
      ),
      children: [
        { label: 'General', href: '#settings-general' },
        { label: 'Security', href: '#settings-security' },
        { label: 'Notifications', href: '#settings-notifications' },
        { label: 'Integrations', href: '#settings-integrations' }
      ]
    },
    {
      label: 'Help & Support',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
        </svg>
      ),
      href: '#help'
    },
    {
      label: 'Logout',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
          <path d="M15.854 8.354a.5.5 0 0 0 0-.708L12.707 4.5a.5.5 0 1 0-.707.707L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.293 2.293a.5.5 0 0 0 .707.707l3.147-3.146z"/>
        </svg>
      ),
      href: '#logout',
      onClick: () => alert('Logout clicked!')
    }
  ]

  return (
    <div className="p-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold" style={{ color: '#4D5D53' }}>
          SideNav Component Examples
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7A5E' }}>
          Organic modernism side navigation with collapsible sections, nested items, and liquid effects.
        </p>
      </div>

      {/* Variant Demos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center space-y-4 p-6 rounded-3xl border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h3 className="text-xl font-semibold" style={{ color: '#4D5D53' }}>Standard SideNav</h3>
          <p className="text-sm" style={{ color: '#6B7A5E' }}>
            Clean vertical navigation with smooth hover effects and collapsible sections.
          </p>
          <Button variant="secondary" onClick={() => setStandardOpen(true)}>
            Open Standard
          </Button>
        </div>

        <div className="text-center space-y-4 p-6 rounded-3xl border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h3 className="text-xl font-semibold" style={{ color: '#4D5D53' }}>Liquid SideNav</h3>
          <p className="text-sm" style={{ color: '#6B7A5E' }}>
            Enhanced with liquid mouse tracking effects and radial gradients.
          </p>
          <Button variant="primary" onClick={() => setLiquidOpen(true)}>
            Open Liquid
          </Button>
        </div>

        <div className="text-center space-y-4 p-6 rounded-3xl border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h3 className="text-xl font-semibold" style={{ color: '#4D5D53' }}>Organic SideNav</h3>
          <p className="text-sm" style={{ color: '#6B7A5E' }}>
            Natural gradients with growing active indicators and vine-like connectors.
          </p>
          <Button variant="accent" onClick={() => setOrganicOpen(true)}>
            Open Organic
          </Button>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h3 className="text-xl font-semibold mb-4" style={{ color: '#4D5D53' }}>
            Key Features
          </h3>
          <ul className="space-y-2 text-sm" style={{ color: '#6B7A5E' }}>
            <li>• Collapsible with smooth animations</li>
            <li>• Nested menu items (up to 3 levels)</li>
            <li>• Icon and badge support</li>
            <li>• Liquid mouse tracking effects</li>
            <li>• Organic growing active indicators</li>
            <li>• Backdrop blur overlay</li>
            <li>• Keyboard navigation support</li>
            <li>• Responsive design</li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl border" style={{ backgroundColor: '#FDFBF8', borderColor: '#F8F2E6' }}>
          <h3 className="text-xl font-semibold mb-4" style={{ color: '#4D5D53' }}>
            Customization Options
          </h3>
          <ul className="space-y-2 text-sm" style={{ color: '#6B7A5E' }}>
            <li>• Adjustable width (min/max)</li>
            <li>• Left or right positioning</li>
            <li>• Three distinct visual variants</li>
            <li>• Custom icons and badges</li>
            <li>• Controlled or uncontrolled collapse</li>
            <li>• Event handlers for clicks</li>
            <li>• Disabled state support</li>
            <li>• Custom styling via className</li>
          </ul>
        </div>
      </div>

      {/* SideNav Instances */}
      {standardOpen && (
        <>
          <SideNav
            items={sampleItems}
            variant="standard"
            backdrop={true}
            onItemClick={(item) => {
              console.log(`Clicked: ${item.label}`)
            }}
            onCollapseToggle={(collapsed) => {
              console.log(`SideNav ${collapsed ? 'collapsed' : 'expanded'}`)
            }}
          />
          <div className="fixed top-4 right-4 z-[60]">
            <Button variant="ghost" onClick={() => setStandardOpen(false)}>
              Close
            </Button>
          </div>
        </>
      )}

      {liquidOpen && (
        <>
          <SideNav
            items={sampleItems}
            variant="liquid"
            backdrop={true}
            onItemClick={(item) => {
              console.log(`Clicked: ${item.label}`)
            }}
            onCollapseToggle={(collapsed) => {
              console.log(`SideNav ${collapsed ? 'collapsed' : 'expanded'}`)
            }}
          />
          <div className="fixed top-4 right-4 z-[60]">
            <Button variant="ghost" onClick={() => setLiquidOpen(false)}>
              Close
            </Button>
          </div>
        </>
      )}

      {organicOpen && (
        <>
          <SideNav
            items={sampleItems}
            variant="organic"
            backdrop={true}
            onItemClick={(item) => {
              console.log(`Clicked: ${item.label}`)
            }}
            onCollapseToggle={(collapsed) => {
              console.log(`SideNav ${collapsed ? 'collapsed' : 'expanded'}`)
            }}
          />
          <div className="fixed top-4 right-4 z-[60]">
            <Button variant="ghost" onClick={() => setOrganicOpen(false)}>
              Close
            </Button>
          </div>
        </>
      )}

      {/* Usage Code Example */}
      <div className="p-6 rounded-3xl border" style={{ backgroundColor: '#F4F6F2', borderColor: '#E8ECDE' }}>
        <h3 className="text-xl font-semibold mb-4" style={{ color: '#4D5D53' }}>
          Usage Example
        </h3>
        <pre className="text-sm overflow-x-auto" style={{ color: '#6B7A5E' }}>
{`import { SideNav } from './components'

const items = [
  {
    label: 'Dashboard',
    icon: <DashboardIcon />,
    active: true,
    href: '/dashboard'
  },
  {
    label: 'Analytics',
    icon: <AnalyticsIcon />,
    badge: '3',
    children: [
      { label: 'Overview', href: '/analytics/overview' },
      { label: 'Reports', href: '/analytics/reports' }
    ]
  }
]

<SideNav
  items={items}
  variant="liquid"
  backdrop={true}
  onItemClick={(item) => console.log(item)}
  onCollapseToggle={(collapsed) => console.log(collapsed)}
/>`}
        </pre>
      </div>
    </div>
  )
}

export default SideNavExample 