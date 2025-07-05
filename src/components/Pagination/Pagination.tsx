import React, { useState, useRef } from 'react'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  variant?: 'standard' | 'liquid' | 'compact'
  size?: 'sm' | 'md' | 'lg'
  showFirstLast?: boolean
  showPrevNext?: boolean
  maxVisiblePages?: number
  onPageChange: (page: number) => void
  className?: string
  disabled?: boolean
}

// Liquid Pagination Button Component
const LiquidPaginationButton: React.FC<{
  page: number
  isActive: boolean
  onClick: () => void
  disabled?: boolean
}> = ({ page, isActive, onClick, disabled }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [liquidOffset, setLiquidOffset] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || disabled) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setLiquidOffset({ x, y })
  }

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-10 h-10 rounded-2xl font-medium transition-all duration-300 overflow-hidden
        ${isActive ? 'font-bold' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isHovered && !disabled ? 'scale-110' : ''}
      `}
      style={{
        backgroundColor: isActive ? '#78866B' : 'transparent',
        color: isActive ? 'white' : '#4D5D53',
                 background: isHovered && !isActive && !disabled ? 
           `radial-gradient(circle at ${liquidOffset.x}% ${liquidOffset.y}%, rgba(120, 134, 107, 0.08) 0%, transparent 50%)` : 
           isActive ? '#78866B' : 'transparent',
        border: '1px solid',
        borderColor: isActive ? '#78866B' : '#F3ECE0'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {page}
    </button>
  )
}

// Arrow Button Component
const ArrowButton: React.FC<{
  direction: 'prev' | 'next' | 'first' | 'last'
  onClick: () => void
  disabled?: boolean
  variant?: 'standard' | 'liquid' | 'compact'
}> = ({ direction, onClick, disabled, variant = 'standard' }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [liquidOffset, setLiquidOffset] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || disabled) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setLiquidOffset({ x, y })
  }

  const icons = {
    first: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M11 4l-4 4 4 4M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    prev: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    next: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    last: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M5 4l4 4-4 4M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-10 h-10 rounded-2xl font-medium transition-all duration-300 overflow-hidden flex items-center justify-center
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isHovered && !disabled ? 'scale-110' : ''}
      `}
      style={{
        backgroundColor: 'transparent',
        color: '#6B7A5E',
                 background: variant === 'liquid' && isHovered && !disabled ? 
           `radial-gradient(circle at ${liquidOffset.x}% ${liquidOffset.y}%, rgba(120, 134, 107, 0.08) 0%, transparent 50%)` : 
           'transparent',
        border: '1px solid #F3ECE0'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={variant === 'liquid' ? handleMouseMove : undefined}
    >
      {icons[direction]}
    </button>
  )
}

// Ellipsis Component
const Ellipsis: React.FC = () => (
  <div className="w-10 h-10 flex items-center justify-center">
    <span className="text-sage-400 font-medium">...</span>
  </div>
)

// Generate visible page numbers
const generatePageNumbers = (
  currentPage: number,
  totalPages: number,
  maxVisible: number
): (number | 'ellipsis')[] => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages: (number | 'ellipsis')[] = []
  const halfVisible = Math.floor(maxVisible / 2)

  if (currentPage <= halfVisible + 1) {
    // Show first pages
    for (let i = 1; i <= maxVisible - 1; i++) {
      pages.push(i)
    }
    pages.push('ellipsis')
    pages.push(totalPages)
  } else if (currentPage >= totalPages - halfVisible) {
    // Show last pages
    pages.push(1)
    pages.push('ellipsis')
    for (let i = totalPages - maxVisible + 2; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Show middle pages
    pages.push(1)
    pages.push('ellipsis')
    for (let i = currentPage - halfVisible + 1; i <= currentPage + halfVisible - 1; i++) {
      pages.push(i)
    }
    pages.push('ellipsis')
    pages.push(totalPages)
  }

  return pages
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  variant = 'standard',
  size = 'md',
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 7,
  onPageChange,
  className = '',
  disabled = false
}) => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const pageNumbers = generatePageNumbers(currentPage, totalPages, maxVisiblePages)

  if (variant === 'compact') {
    return (
      <div className={`flex items-center space-x-2 ${sizes[size]} ${className}`}>
        {showPrevNext && (
          <ArrowButton
            direction="prev"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={disabled || currentPage === 1}
            variant={variant}
          />
        )}
        
        <div 
          className="px-4 py-2 rounded-2xl font-medium border"
          style={{
            backgroundColor: '#F8F2E6',
            borderColor: '#F3ECE0',
            color: '#4D5D53'
          }}
        >
          {currentPage} of {totalPages}
        </div>
        
        {showPrevNext && (
          <ArrowButton
            direction="next"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={disabled || currentPage === totalPages}
            variant={variant}
          />
        )}
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-2 ${sizes[size]} ${className}`}>
      {/* First Page Button */}
      {showFirstLast && currentPage > 1 && (
        <ArrowButton
          direction="first"
          onClick={() => onPageChange(1)}
          disabled={disabled}
          variant={variant}
        />
      )}

      {/* Previous Page Button */}
      {showPrevNext && (
        <ArrowButton
          direction="prev"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
          variant={variant}
        />
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => (
        <React.Fragment key={index}>
          {page === 'ellipsis' ? (
            <Ellipsis />
          ) : variant === 'liquid' ? (
            <LiquidPaginationButton
              page={page}
              isActive={page === currentPage}
              onClick={() => onPageChange(page)}
              disabled={disabled}
            />
          ) : (
            <button
              onClick={() => onPageChange(page)}
              disabled={disabled}
              className={`
                w-10 h-10 rounded-2xl font-medium transition-all duration-200
                ${page === currentPage ? 'font-bold' : ''}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
              `}
              style={{
                backgroundColor: page === currentPage ? '#78866B' : 'transparent',
                color: page === currentPage ? 'white' : '#4D5D53',
                border: '1px solid',
                borderColor: page === currentPage ? '#78866B' : '#F3ECE0'
              }}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Next Page Button */}
      {showPrevNext && (
        <ArrowButton
          direction="next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={disabled || currentPage === totalPages}
          variant={variant}
        />
      )}

      {/* Last Page Button */}
      {showFirstLast && currentPage < totalPages && (
        <ArrowButton
          direction="last"
          onClick={() => onPageChange(totalPages)}
          disabled={disabled}
          variant={variant}
        />
      )}
    </div>
  )
} 