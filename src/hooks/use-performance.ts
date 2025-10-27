'use client'

import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  memoryUsage?: number
}

export function usePerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
  })

  useEffect(() => {
    // Measure page load time
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    const loadTime = navigation.loadEventEnd - navigation.loadEventStart
    
    // Measure render time
    const renderTime = performance.now()
    
    // Get memory usage if available
    const memoryUsage = (performance as any).memory ? {
      used: Math.round((performance as any).memory.usedJSHeapSize / 1048576),
      total: Math.round((performance as any).memory.totalJSHeapSize / 1048576),
      limit: Math.round((performance as any).memory.jsHeapSizeLimit / 1048576),
    } : undefined

    setMetrics({
      loadTime: Math.round(loadTime),
      renderTime: Math.round(renderTime),
      memoryUsage: memoryUsage?.used,
    })

    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Metrics:', {
        loadTime: `${Math.round(loadTime)}ms`,
        renderTime: `${Math.round(renderTime)}ms`,
        memoryUsage,
      })
    }
  }, [])

  return metrics
}

export function useLazyLoad(threshold = 0.1) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const elementRef = useState<HTMLDivElement | null>(null)[0]

  useEffect(() => {
    const element = elementRef
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsIntersecting(true)
          setHasLoaded(true)
        }
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [elementRef, threshold, hasLoaded])

  return { elementRef, isIntersecting, hasLoaded }
}