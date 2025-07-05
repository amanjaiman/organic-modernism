import React from 'react'
import { Table, LiquidTable } from '../src/components'
import type { Column } from '../src/components'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  lastLogin: string
  avatar?: string
}

export const TableExample: React.FC = () => {
  const userData: User[] = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2024-01-15',
      avatar: '👩‍💼'
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: 'Editor',
      status: 'active',
      lastLogin: '2024-01-14',
      avatar: '👨‍💻'
    },
    {
      id: 3,
      name: 'Carol Williams',
      email: 'carol@example.com',
      role: 'Viewer',
      status: 'inactive',
      lastLogin: '2024-01-10',
      avatar: '👩‍🎨'
    },
    {
      id: 4,
      name: 'David Brown',
      email: 'david@example.com',
      role: 'Editor',
      status: 'pending',
      lastLogin: '2024-01-12',
      avatar: '👨‍🔬'
    },
    {
      id: 5,
      name: 'Eva Davis',
      email: 'eva@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2024-01-16',
      avatar: '👩‍🚀'
    }
  ]

  const columns: Column<User>[] = [
    {
      key: 'name',
      label: 'Name',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{row.avatar}</span>
          <div>
            <div className="font-medium text-stone-900">{value}</div>
            <div className="text-sm text-stone-500">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      render: (value) => (
        <span
          className="px-2 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: value === 'Admin' ? 'rgba(120, 134, 107, 0.1)' : 
                             value === 'Editor' ? 'rgba(164, 183, 174, 0.1)' : 
                             'rgba(187, 201, 194, 0.1)',
            color: value === 'Admin' ? '#4D5D53' : '#6B7A5E'
          }}
        >
          {value}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <div className="flex items-center space-x-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: value === 'active' ? '#10B981' : 
                             value === 'inactive' ? '#EF4444' : 
                             '#F59E0B'
            }}
          />
          <span className="text-sm capitalize">{value}</span>
        </div>
      )
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
      render: (value) => (
        <span className="text-sm text-stone-600">{value}</span>
      )
    }
  ]

  const handleRowSelect = (selectedRows: User[]) => {
    console.log('Selected rows:', selectedRows)
  }

  const handleSort = (key: keyof User, direction: 'asc' | 'desc') => {
    console.log('Sort:', key, direction)
  }

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#4D5D53' }}>
          Table Components
        </h2>
        <p className="text-lg mb-12" style={{ color: '#6B7A5E' }}>
          Powerful data tables with sorting, selection, and responsive design.
        </p>
      </div>

      {/* Standard Table */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold" style={{ color: '#4D5D53' }}>
          Standard Table
        </h3>
        <Table
          data={userData}
          columns={columns}
          selectable
          onRowSelect={handleRowSelect}
          onSort={handleSort}
          variant="standard"
          size="md"
        />
      </div>

      {/* Table Variants */}
      <div className="space-y-8">
        <h3 className="text-2xl font-semibold" style={{ color: '#4D5D53' }}>
          Table Variants
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-medium" style={{ color: '#6B7A5E' }}>
              Striped Table
            </h4>
            <Table
              data={userData.slice(0, 3)}
              columns={columns}
              variant="striped"
              size="sm"
            />
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-medium" style={{ color: '#6B7A5E' }}>
              Bordered Table
            </h4>
            <Table
              data={userData.slice(0, 3)}
              columns={columns}
              variant="bordered"
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* LiquidTable */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold" style={{ color: '#4D5D53' }}>
          LiquidTable
        </h3>
        <p className="text-base mb-6" style={{ color: '#6B7A5E' }}>
          Enhanced table with liquid transitions and mouse tracking effects.
        </p>
        
        <LiquidTable
          data={userData}
          columns={columns}
          selectable
          onRowSelect={handleRowSelect}
          onSort={handleSort}
          variant="standard"
          size="md"
          liquidIntensity="medium"
          mouseTrackingEnabled={true}
        />
      </div>

      {/* Compact Table */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold" style={{ color: '#4D5D53' }}>
          Compact Table
        </h3>
        <Table
          data={userData}
          columns={columns}
          variant="compact"
          size="sm"
          stickyHeader
        />
      </div>

      {/* Empty State */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold" style={{ color: '#4D5D53' }}>
          Empty State
        </h3>
        <Table
          data={[]}
          columns={columns}
          emptyMessage="No users found"
        />
      </div>
    </div>
  )
} 