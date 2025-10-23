import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Cache for 5 minutes
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes in ms
let cachedData: any = null
let lastFetch = 0

export async function GET(request: NextRequest) {
  const now = Date.now()
  
  // Return cached data if still valid
  if (cachedData && (now - lastFetch) < CACHE_DURATION) {
    return NextResponse.json(cachedData)
  }

  try {
    // Fetch fresh data with optimized queries
    const [featuredProducts, newProducts] = await Promise.all([
      db.product.findMany({
        where: { featured: true },
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          slug: true,
          price: true,
          description: true,
          type: true,
          cooling: true,
          images: true,
          featured: true,
          new: true
        }
      }),
      db.product.findMany({
        where: { new: true },
        take: 4,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          slug: true,
          price: true,
          description: true,
          type: true,
          cooling: true,
          images: true,
          featured: true,
          new: true
        }
      })
    ])

    const data = {
      featured: featuredProducts,
      new: newProducts
    }

    // Cache the result
    cachedData = data
    lastFetch = now

    // Add cache headers
    const response = NextResponse.json(data)
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    response.headers.set('X-Cache', 'MISS')
    
    return response
  } catch (error) {
    console.error('Homepage API error:', error)
    
    // Return cached data if available, even if expired
    if (cachedData) {
      const response = NextResponse.json(cachedData)
      response.headers.set('X-Cache', 'STALE')
      return response
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch homepage data' },
      { status: 500 }
    )
  }
}