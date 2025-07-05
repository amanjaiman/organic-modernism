import React, { useState, useEffect } from 'react'
import { Progress, CircularProgress, LiquidProgress, RippleProgress } from '../src/components'

export const ProgressExample: React.FC = () => {
  const [progressValue, setProgressValue] = useState(0)
  const [slowProgressValue, setSlowProgressValue] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue(prev => (prev + 1) % 101)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSlowProgressValue(prev => (prev + 1) % 101)
    }, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold text-stone-800 mb-6">Progress Components</h2>
      
      {/* Standard Progress */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-stone-700">Standard Progress</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-2">Sizes</h4>
            <div className="space-y-3">
              <Progress value={75} size="sm" label="Small" showValue />
              <Progress value={60} size="md" label="Medium" showValue />
              <Progress value={45} size="lg" label="Large" showValue />
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-2">Variants</h4>
            <div className="space-y-3">
              <Progress value={75} variant="primary" label="Primary" showValue />
              <Progress value={60} variant="success" label="Success" showValue />
              <Progress value={45} variant="warning" label="Warning" showValue />
              <Progress value={30} variant="error" label="Error" showValue />
              <Progress value={85} variant="info" label="Info" showValue />
              <Progress value={70} variant="secondary" label="Secondary" showValue />
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-2">Dynamic Progress</h4>
            <Progress value={progressValue} label="Animated Progress" showValue />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-2">Indeterminate</h4>
            <Progress label="Loading..." />
          </div>
        </div>
      </section>

      {/* Circular Progress */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-stone-700">Circular Progress</h3>
        
        <div className="flex flex-wrap gap-6">
          <CircularProgress value={75} size={48} showValue label="Small" />
          <CircularProgress value={60} size={64} showValue label="Medium" />
          <CircularProgress value={45} size={80} showValue label="Large" />
        </div>
        
        <div className="flex flex-wrap gap-6">
          <CircularProgress value={slowProgressValue} size={64} variant="primary" showValue label="Primary" />
          <CircularProgress value={75} size={64} variant="success" showValue label="Success" />
          <CircularProgress value={60} size={64} variant="warning" showValue label="Warning" />
          <CircularProgress value={45} size={64} variant="error" showValue label="Error" />
        </div>
        
        <div className="flex flex-wrap gap-6">
          <CircularProgress size={64} label="Loading..." />
          <CircularProgress size={48} variant="success" label="Processing..." />
        </div>
      </section>

      {/* Liquid Progress */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-stone-700">Liquid Progress</h3>
        <p className="text-stone-600">Hover over the progress bars to see the liquid mouse tracking effects!</p>
        
        <div className="space-y-4">
          <LiquidProgress value={75} size="md" label="Liquid Progress" showValue />
          <LiquidProgress value={slowProgressValue} size="md" variant="success" label="Animated Liquid" showValue />
          <LiquidProgress size="md" variant="primary" label="Liquid Loading..." />
        </div>
      </section>

      {/* Ripple Progress */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-stone-700">Ripple Progress</h3>
        <p className="text-stone-600">Watch for organic ripples that appear based on progress!</p>
        
        <div className="space-y-4">
          <RippleProgress value={progressValue} size="md" label="Ripple Progress" showValue />
          <RippleProgress value={75} size="md" variant="success" label="Success Ripples" showValue />
          <RippleProgress size="md" variant="info" label="Ripple Loading..." />
        </div>
      </section>


    </div>
  )
} 