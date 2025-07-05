import React, { useState } from 'react'
import { FileUpload } from '../src/components'

export const FileUploadExample: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<string[]>([])

  const handleFilesSelect = (files: File[]) => {
    console.log('Files selected:', files)
    setUploadedFiles(files)
  }

  const handleUpload = async (files: File[]) => {
    console.log('Uploading files:', files)
    
    // Simulate upload process
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('Upload completed')
        resolve()
      }, 2000)
    })
  }

  const handleError = (error: string) => {
    console.error('Upload error:', error)
    setErrors(prev => [...prev, error])
    
    // Clear error after 5 seconds
    setTimeout(() => {
      setErrors(prev => prev.slice(1))
    }, 5000)
  }

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#4D5D53' }}>
          File Upload Components
        </h2>
        <p className="text-lg mb-12" style={{ color: '#6B7A5E' }}>
          Drag and drop file uploads with progress tracking and validation.
        </p>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="space-y-2">
          {errors.map((error, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border-l-4 border-red-500 bg-red-50"
            >
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          ))}
        </div>
      )}

      {/* Compact FileUpload */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold" style={{ color: '#4D5D53' }}>
          Compact File Upload
        </h3>
        <FileUpload
          accept="image/*,application/pdf,.doc,.docx"
          multiple
          maxSize={5 * 1024 * 1024} // 5MB
          maxFiles={3}
          onFilesSelect={handleFilesSelect}
          onUpload={handleUpload}
          onError={handleError}
          supportedFormats={['JPG', 'PNG', 'PDF', 'DOC', 'DOCX']}
          variant="compact"
          size="md"
        />
      </div>

      {/* Ghost Upload */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold" style={{ color: '#4D5D53' }}>
          Ghost Upload
        </h3>
        <FileUpload
          accept=".pdf"
          multiple={false}
          maxSize={5 * 1024 * 1024} // 5MB
          maxFiles={1}
          onFilesSelect={handleFilesSelect}
          onUpload={handleUpload}
          onError={handleError}
          variant="ghost"
          size="md"
          supportedFormats={['PDF']}
          uploadText="Drop PDF document here"
          browseText="Select PDF"
        />
      </div>

      {/* Uploaded Files Summary */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold" style={{ color: '#4D5D53' }}>
            Recently Selected Files
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: 'rgba(250, 249, 245, 0.8)',
                  borderColor: '#E8ECDE'
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                    {file.type.startsWith('image/') ? '🖼️' : 
                     file.type.startsWith('video/') ? '🎥' : 
                     file.type.startsWith('audio/') ? '🎵' : 
                     file.type.includes('pdf') ? '📄' : 
                     '📁'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate" style={{ color: '#4D5D53' }}>
                      {file.name}
                    </p>
                    <p className="text-xs opacity-60" style={{ color: '#8F9779' }}>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 