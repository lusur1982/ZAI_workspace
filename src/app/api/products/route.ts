import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Simple memory cache
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

function getCacheKey(searchParams: URLSearchParams): string {
  return searchParams.toString()
}

function getFromCache(key: string): any | null {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }
  if (cached) {
    cache.delete(key)
  }
  return null
}

function setCache(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() })
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const cacheKey = getCacheKey(searchParams)
    
    // Check cache first
    const cachedData = getFromCache(cacheKey)
    if (cachedData) {
      return NextResponse.json(cachedData)
    }

    const featured = searchParams.get('featured')
    const isNew = searchParams.get('new')
    const type = searchParams.get('type')
    const limit = searchParams.get('limit')
    const search = searchParams.get('search')

    let whereClause: any = {}

    if (featured === 'true') {
      whereClause.featured = true
    }

    if (isNew === 'true') {
      whereClause.new = true
    }

    if (type) {
      whereClause.type = type
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { type: { contains: search, mode: 'insensitive' } },
        { cooling: { contains: search, mode: 'insensitive' } }
      ]
    }

    const products = await db.product.findMany({
      where: whereClause,
      orderBy: [
        { featured: 'desc' },
        { new: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit ? parseInt(limit) : undefined
    })

    // Batch parse images JSON for better performance
    const productsWithParsedImages = products.map(product => ({
      ...product,
      images: product.images ? JSON.parse(product.images) : []
    }))

    const responseData = { products: productsWithParsedImages }
    
    // Cache the response
    setCache(cacheKey, responseData)

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}