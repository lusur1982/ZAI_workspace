import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Aggressive cache for 15 minutes
const CACHE_DURATION = 15 * 60 * 1000 // 15 minutes
let cachedData: any = null
let lastFetch = 0

export async function GET(request: NextRequest) {
  const now = Date.now()
  
  // Return cached data if still valid
  if (cachedData && (now - lastFetch) < CACHE_DURATION) {
    const response = NextResponse.json(cachedData)
    response.headers.set('X-Cache', 'HIT')
    response.headers.set('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=1800')
    return response
  }

  try {
    // Optimized query with minimal fields
    const products = await db.product.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        type: true,
        cooling: true,
        featured: true,
        new: true,
        createdAt: true
      },
      orderBy: [
        { featured: 'desc' },
        { new: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    const responseData = { 
      products: products.map(product => ({
        ...product,
        images: [] // No images for faster loading
      }))
    }
    
    // Cache the result
    cachedData = responseData
    lastFetch = now

    const response = NextResponse.json(responseData)
    response.headers.set('X-Cache', 'MISS')
    response.headers.set('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=1800')
    
    return response
  } catch (error) {
    console.error('Fast products API error:', error)
    
    // Return cached data if available, even if expired
    if (cachedData) {
      const response = NextResponse.json(cachedData)
      response.headers.set('X-Cache', 'STALE')
      return response
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}