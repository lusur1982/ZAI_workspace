import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
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

    // Parse images JSON for each product
    const productsWithParsedImages = products.map(product => ({
      ...product,
      images: JSON.parse(product.images || '[]')
    }))

    return NextResponse.json({ products: productsWithParsedImages })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      slug,
      description,
      price,
      type,
      cooling,
      images,
      featured = false,
      new: isNew = false
    } = body

    // Validate required fields
    if (!name || !slug || !description || !price || !type || !cooling) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingProduct = await db.product.findUnique({
      where: { slug }
    })

    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product with this slug already exists' },
        { status: 400 }
      )
    }

    const product = await db.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        type,
        cooling,
        images: JSON.stringify(images || []),
        featured,
        new: isNew
      }
    })

    // Parse images for response
    const responseProduct = {
      ...product,
      images: JSON.parse(product.images || '[]')
    }

    return NextResponse.json(responseProduct, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}