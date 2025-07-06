import React, { useState, useMemo } from 'react'

export interface Column<T = any> {
  key: keyof T
  label: string
  sortable?: boolean
  width?: string | number
  render?: (value: any, row: T, index: number) => React.ReactNode
  className?: string
}

export interface TableProps<T = any> {
  data: T[]
  columns: Column<T>[]
  variant?: 'standard' | 'striped' | 'bordered' | 'compact'
  size?: 'sm' | 'md' | 'lg'
  sortable?: boolean
  selectable?: boolean
  onRowSelect?: (selectedRows: T[]) => void
  responsive?: boolean
  stickyHeader?: boolean
  emptyMessage?: string
  className?: string
  onSort?: (key: keyof T, direction: 'asc' | 'desc') => void
}

export const Table = <T extends Record<string, any>>({
  data,
  columns,
  variant = 'standard',
  size = 'md',
  sortable = true,
  selectable = false,
  onRowSelect,
  responsive = true,
  stickyHeader = false,
  emptyMessage = 'No data available',
  className = '',
  onSort
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null
    direction: 'asc' | 'desc'
  }>({ key: null, direction: 'asc' })
  
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [selectAll, setSelectAll] = useState(false)

  // Sort data based on current sort config
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!]
      const bValue = b[sortConfig.key!]
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortConfig])

  const handleSort = (key: keyof T) => {
    if (!sortable) return
    
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    
    setSortConfig({ key, direction })
    onSort?.(key, direction)
  }

  const handleRowSelect = (index: number) => {
    if (!selectable) return
    
    const newSelected = new Set(selectedRows)
    if (newSelected.has(index)) {
      newSelected.delete(index)
    } else {
      newSelected.add(index)
    }
    
    setSelectedRows(newSelected)
    setSelectAll(newSelected.size === data.length)
    
    const selectedData = Array.from(newSelected).map(i => data[i])
    onRowSelect?.(selectedData)
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set())
      setSelectAll(false)
      onRowSelect?.([])
    } else {
      const allIndexes = new Set(data.map((_, index) => index))
      setSelectedRows(allIndexes)
      setSelectAll(true)
      onRowSelect?.(data)
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          fontSize: '13px',
          headerPadding: '8px 12px',
          cellPadding: '6px 12px',
          minHeight: '32px'
        }
      case 'lg':
        return {
          fontSize: '15px',
          headerPadding: '16px 20px',
          cellPadding: '12px 20px',
          minHeight: '48px'
        }
      default:
        return {
          fontSize: '14px',
          headerPadding: '12px 16px',
          cellPadding: '10px 16px',
          minHeight: '40px'
        }
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'striped':
        return {
          oddRowBg: 'rgba(250, 249, 245, 0.5)',
          evenRowBg: 'rgba(244, 246, 242, 0.3)'
        }
      case 'bordered':
        return {
          border: '1px solid #E8ECDE',
          cellBorder: '1px solid #E8ECDE'
        }
      case 'compact':
        return {
          headerPadding: '6px 12px',
          cellPadding: '4px 12px',
          minHeight: '28px'
        }
      default:
        return {}
    }
  }

  const sizeStyles = getSizeStyles()
  const variantStyles = getVariantStyles()

  if (data.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div 
          className="text-center py-16 rounded-lg border-2 border-dashed"
          style={{
            color: '#8F9779',
            borderColor: '#E8ECDE',
            backgroundColor: 'rgba(250, 249, 245, 0.5)'
          }}
        >
          <div className="text-4xl mb-4">📋</div>
          <p className="text-lg font-medium">{emptyMessage}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      <div className={`${responsive ? 'overflow-x-auto' : ''} rounded-lg border shadow-sm`} style={{ borderColor: '#E8ECDE' }}>
        <table className="w-full border-collapse">
          <thead 
            className={`${stickyHeader ? 'sticky top-0 z-10' : ''}`}
            style={{
              backgroundColor: '#F8F2E6',
              borderBottom: '2px solid #E8ECDE'
            }}
          >
            <tr>
              {selectable && (
                <th 
                  className="text-left font-semibold"
                  style={{
                    padding: variantStyles.headerPadding || sizeStyles.headerPadding,
                    fontSize: sizeStyles.fontSize,
                    color: '#4D5D53',
                    width: '48px'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded-sm border-2 border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400"
                    style={{
                      accentColor: '#78866B'
                    }}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`text-left font-semibold ${sortable && column.sortable !== false ? 'cursor-pointer hover:bg-stone-100' : ''} ${column.className || ''}`}
                  style={{
                    padding: variantStyles.headerPadding || sizeStyles.headerPadding,
                    fontSize: sizeStyles.fontSize,
                    color: '#4D5D53',
                    width: column.width,
                    transition: 'background-color 0.2s ease'
                  }}
                  onClick={() => sortable && column.sortable !== false && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.label}</span>
                    {sortable && column.sortable !== false && (
                      <div className="flex flex-col">
                        <svg
                          className={`w-3 h-3 ${sortConfig.key === column.key && sortConfig.direction === 'asc' ? 'text-stone-600' : 'text-stone-400'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" />
                        </svg>
                        <svg
                          className={`w-3 h-3 -mt-1 ${sortConfig.key === column.key && sortConfig.direction === 'desc' ? 'text-stone-600' : 'text-stone-400'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr
                key={index}
                className={`transition-colors duration-200 ${selectedRows.has(index) ? 'bg-stone-100' : 'hover:bg-stone-50'}`}
                style={{
                  backgroundColor: selectedRows.has(index) 
                    ? 'rgba(120, 134, 107, 0.1)' 
                    : variant === 'striped' 
                      ? (index % 2 === 0 ? variantStyles.evenRowBg : variantStyles.oddRowBg)
                      : undefined,
                  borderTop: variant === 'bordered' ? variantStyles.cellBorder : '1px solid #F0ECDC'
                }}
              >
                {selectable && (
                  <td 
                    className="text-left"
                    style={{
                      padding: variantStyles.cellPadding || sizeStyles.cellPadding,
                      minHeight: variantStyles.minHeight || sizeStyles.minHeight
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedRows.has(index)}
                      onChange={() => handleRowSelect(index)}
                      className="w-4 h-4 rounded-sm border-2 border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400"
                      style={{
                        accentColor: '#78866B'
                      }}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={column.className || ''}
                    style={{
                      padding: variantStyles.cellPadding || sizeStyles.cellPadding,
                      fontSize: sizeStyles.fontSize,
                      color: '#4D5D53',
                      minHeight: variantStyles.minHeight || sizeStyles.minHeight,
                      borderLeft: variant === 'bordered' ? variantStyles.cellBorder : undefined
                    }}
                  >
                    {column.render ? column.render(row[column.key], row, index) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 
