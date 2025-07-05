import React, { useState, useRef, useCallback } from 'react'

export interface FileUploadProps {
  accept?: string
  multiple?: boolean
  maxSize?: number // in bytes
  maxFiles?: number
  disabled?: boolean
  onFilesSelect?: (files: File[]) => void
  onUpload?: (files: File[]) => Promise<void>
  onError?: (error: string) => void
  className?: string
  variant?: 'compact' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  uploadText?: string
  browseText?: string
  dragText?: string
  supportedFormats?: string[]
  showPreview?: boolean
  removable?: boolean
}

interface FileWithProgress {
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept = '*',
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 5,
  disabled = false,
  onFilesSelect,
  onUpload,
  onError,
  className = '',
  variant = 'compact',
  size = 'md',
  uploadText = 'Drop files here or click to browse',
  browseText = 'Browse Files',
  dragText = 'Drop files here',
  supportedFormats = [],
  showPreview = true,
  removable = true
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<FileWithProgress[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          minHeight: '100px',
          padding: '16px',
          fontSize: '13px',
          iconSize: '24px'
        }
      case 'lg':
        return {
          minHeight: '200px',
          padding: '32px',
          fontSize: '16px',
          iconSize: '48px'
        }
      default:
        return {
          minHeight: '150px',
          padding: '24px',
          fontSize: '14px',
          iconSize: '32px'
        }
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          background: 'rgba(248, 242, 230, 0.5)',
          border: '1px solid #E8ECDE',
          borderRadius: '12px'
        }
      case 'ghost':
        return {
          background: 'transparent',
          border: '2px dashed #BBC9C2',
          borderRadius: '16px'
        }
      default:
        return {
          background: 'rgba(248, 242, 230, 0.5)',
          border: '1px solid #E8ECDE',
          borderRadius: '12px'
        }
    }
  }

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize) {
      return `File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`
    }

    // Check file type if accept is specified
    if (accept !== '*') {
      const acceptedTypes = accept.split(',').map(type => type.trim())
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
      const fileType = file.type

      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return type === fileExtension
        }
        return fileType.match(type.replace('*', '.*'))
      })

      if (!isAccepted) {
        return `File type not supported. Accepted types: ${acceptedTypes.join(', ')}`
      }
    }

    return null
  }

  const handleFiles = useCallback((newFiles: File[]) => {
    const validFiles: FileWithProgress[] = []
    const errors: string[] = []

    // Check total file count
    if (files.length + newFiles.length > maxFiles) {
      errors.push(`Maximum ${maxFiles} files allowed`)
    }

    newFiles.forEach(file => {
      const error = validateFile(file)
      if (error) {
        errors.push(`${file.name}: ${error}`)
      } else {
        validFiles.push({
          file,
          progress: 0,
          status: 'pending'
        })
      }
    })

    if (errors.length > 0) {
      onError?.(errors.join(', '))
      return
    }

    const updatedFiles = [...files, ...validFiles]
    setFiles(updatedFiles)
    onFilesSelect?.(updatedFiles.map(f => f.file))
  }, [files, maxFiles, onFilesSelect, onError])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (disabled) return

    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    handleFiles(selectedFiles)
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleBrowseClick = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onFilesSelect?.(updatedFiles.map(f => f.file))
  }

  const uploadFiles = async () => {
    if (!onUpload || isUploading) return

    setIsUploading(true)
    
    try {
      // Simulate upload progress
      const filesToUpload = files.filter(f => f.status === 'pending')
      
      for (let i = 0; i < filesToUpload.length; i++) {
        const fileIndex = files.findIndex(f => f === filesToUpload[i])
        
        // Update status to uploading
        setFiles(prev => prev.map((f, idx) => 
          idx === fileIndex ? { ...f, status: 'uploading' as const } : f
        ))

        // Simulate progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 50))
          setFiles(prev => prev.map((f, idx) => 
            idx === fileIndex ? { ...f, progress } : f
          ))
        }

        // Mark as success
        setFiles(prev => prev.map((f, idx) => 
          idx === fileIndex ? { ...f, status: 'success' as const } : f
        ))
      }

      await onUpload(filesToUpload.map(f => f.file))
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const getFileIcon = (file: File) => {
    const type = file.type
    if (type.startsWith('image/')) return '🖼️'
    if (type.startsWith('video/')) return '🎥'
    if (type.startsWith('audio/')) return '🎵'
    if (type.includes('pdf')) return '📄'
    if (type.includes('text/')) return '📝'
    return '📁'
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const sizeStyles = getSizeStyles()
  const variantStyles = getVariantStyles()

  return (
    <div className={`w-full ${className}`}>
      {/* Drop Zone */}
      <div
        className={`
          flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300
          ${isDragging ? 'scale-[1.02] shadow-lg' : 'hover:scale-[1.01]'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        style={{
          ...variantStyles,
          ...sizeStyles,
          borderColor: isDragging ? '#78866B' : variantStyles.border?.includes('#') ? variantStyles.border.split(' ')[2] : '#A4B7AE',
          backgroundColor: isDragging ? 'rgba(120, 134, 107, 0.1)' : variantStyles.background,
          boxShadow: isDragging ? '0 12px 24px rgba(120, 134, 107, 0.2)' : '0 4px 8px rgba(120, 134, 107, 0.1)',
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        {/* Upload Icon */}
        <div className="mb-4">
          <svg
            width={sizeStyles.iconSize}
            height={sizeStyles.iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="mx-auto"
            style={{ color: '#8F9779' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>

        {/* Upload Text */}
        <p className="font-medium mb-2" style={{ color: '#4D5D53', fontSize: sizeStyles.fontSize }}>
          {isDragging ? dragText : uploadText}
        </p>

        {/* Browse Button */}
        <button
          type="button"
          className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: '#78866B',
            color: 'white',
            fontSize: sizeStyles.fontSize,
          }}
          onClick={(e) => {
            e.stopPropagation()
            handleBrowseClick()
          }}
        >
          {browseText}
        </button>

        {/* Supported Formats */}
        {supportedFormats.length > 0 && (
          <p className="text-xs mt-2 opacity-60" style={{ color: '#8F9779' }}>
            Supported formats: {supportedFormats.join(', ')}
          </p>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6 space-y-2">
          <h4 className="font-medium text-sm" style={{ color: '#4D5D53' }}>
            Files ({files.length})
          </h4>
          
          {files.map((fileItem, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:shadow-md"
              style={{
                backgroundColor: 'rgba(250, 249, 245, 0.8)',
                borderColor: '#E8ECDE'
              }}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{getFileIcon(fileItem.file)}</span>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: '#4D5D53' }}>
                    {fileItem.file.name}
                  </p>
                  <p className="text-xs opacity-60" style={{ color: '#8F9779' }}>
                    {formatFileSize(fileItem.file.size)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Progress Bar */}
                {fileItem.status === 'uploading' && (
                  <div className="w-20 h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${fileItem.progress}%`,
                        backgroundColor: '#78866B'
                      }}
                    />
                  </div>
                )}

                {/* Status Icon */}
                {fileItem.status === 'success' && (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#78866B' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  </div>
                )}

                {fileItem.status === 'error' && (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#DC2626' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                )}

                {/* Remove Button */}
                {removable && fileItem.status !== 'uploading' && (
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="p-1 rounded-full hover:bg-stone-200 transition-colors"
                    style={{ color: '#8F9779' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Upload Button */}
          {onUpload && files.some(f => f.status === 'pending') && (
            <button
              type="button"
              onClick={uploadFiles}
              disabled={isUploading}
              className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: '#78866B',
                color: 'white',
              }}
            >
              {isUploading ? 'Uploading...' : `Upload ${files.filter(f => f.status === 'pending').length} Files`}
            </button>
          )}
        </div>
      )}
    </div>
  )
} 