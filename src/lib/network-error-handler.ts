'use client'

import { useState, useEffect } from 'react'
import { toast } from '@/hooks/use-toast'

export class NetworkErrorHandler {
  private static instance: NetworkErrorHandler
  private retryCount = 0
  private maxRetries = 3
  private retryDelay = 1000

  static getInstance(): NetworkErrorHandler {
    if (!NetworkErrorHandler.instance) {
      NetworkErrorHandler.instance = new NetworkErrorHandler()
    }
    return NetworkErrorHandler.instance
  }

  async handleNetworkError(
    error: Error,
    retryCallback?: () => Promise<any>
  ): Promise<any> {
    console.error('Network error:', error)

    // Check if it's a network error
    if (this.isNetworkError(error)) {
      if (this.retryCount < this.maxRetries && retryCallback) {
        this.retryCount++
        
        toast({
          title: "Connection issue",
          description: `Retrying... (${this.retryCount}/${this.maxRetries})`,
          variant: "default",
        })

        await this.delay(this.retryDelay * this.retryCount)
        
        try {
          const result = await retryCallback()
          this.retryCount = 0 // Reset on success
          return result
        } catch (retryError) {
          return this.handleNetworkError(retryError as Error, retryCallback)
        }
      } else {
        toast({
          title: "Network Error",
          description: "Unable to connect to the server. Please check your internet connection.",
          variant: "destructive",
        })
        this.retryCount = 0
      }
    } else {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      })
    }

    throw error
  }

  private isNetworkError(error: Error): boolean {
    return (
      error.message.includes('NetworkError') ||
      error.message.includes('fetch') ||
      error.message.includes('Failed to fetch') ||
      error.message.includes('ECONNREFUSED') ||
      error.message.includes('ENOTFOUND') ||
      error.message.includes('timeout') ||
      error.message.includes('AbortError')
    )
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  resetRetryCount(): void {
    this.retryCount = 0
  }
}

// Enhanced fetch with retry logic
export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries: number = 3
): Promise<Response> {
  const errorHandler = NetworkErrorHandler.getInstance()
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(10000), // 10 second timeout
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      return response
    } catch (error) {
      if (attempt === maxRetries) {
        await errorHandler.handleNetworkError(error as Error)
        throw error
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
    }
  }
  
  throw new Error('Max retries exceeded')
}

// Monitor network status
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [connectionType, setConnectionType] = useState<string>('unknown')

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      toast({
        title: "Connection restored",
        description: "You're back online!",
        variant: "default",
      })
    }

    const handleOffline = () => {
      setIsOnline(false)
      toast({
        title: "Connection lost",
        description: "Please check your internet connection.",
        variant: "destructive",
      })
    }

    const handleConnectionChange = () => {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
      if (connection) {
        setConnectionType(connection.effectiveType || 'unknown')
      }
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    window.addEventListener('connectionchange', handleConnectionChange)

    // Initial connection check
    handleConnectionChange()

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('connectionchange', handleConnectionChange)
    }
  }, [])

  return { isOnline, connectionType }
}