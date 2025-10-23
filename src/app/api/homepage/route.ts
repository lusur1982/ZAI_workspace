import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Simple memory cache for homepage
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export async function GET(request: NextRequest) {
  try {
    // Check cache first
    const cachedData = cache.get('homepage')
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
      return NextResponse.json(cachedData.data)
    }
    if (cachedData) {
      cache.delete('homepage')
    }

    // Fetch both featured and new products in parallel
    const [featuredProducts, newProducts] = await Promise.all([
      db.product.findMany({
        where: { featured: true },
        orderBy: { createdAt: 'desc' },
        take: 6
      }),
      db.product.findMany({
        where: { new: true },
        orderBy: { createdAt: 'desc' },
        take: 8
      })
    ])

    // Batch parse images JSON for better performance
    const parseImages = (products: any[]) => 
      products.map(product => ({
        ...product,
        images: product.images ? JSON.parse(product.images) : []
      }))

    const responseData = {
      featured: parseImages(featuredProducts),
      new: parseImages(newProducts)
    }

    // Cache the response
    cache.set('homepage', { data: responseData, timestamp: Date.now() })

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch homepage data' },
      { status: 500 }
    )
  }
}