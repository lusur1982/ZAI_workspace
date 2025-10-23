import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

// GET /api/admin/products
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const perPage = parseInt(searchParams.get('perPage') || '10')
    const sort = JSON.parse(searchParams.get('sort') || '{}')
    const filter = JSON.parse(searchParams.get('filter') || '{}')

    const skip = (page - 1) * perPage

    const where: any = {}
    if (filter.type) where.type = filter.type
    if (filter.cooling) where.cooling = filter.cooling
    if (filter.featured !== undefined) where.featured = filter.featured
    if (filter.new !== undefined) where.new = filter.new

    const orderBy: any = {}
    if (sort.field) {
      orderBy[sort.field] = sort.order.toLowerCase()
    }

    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        orderBy,
        skip,
        take: perPage,
      }),
      db.product.count({ where }),
    ])

    // Parse images JSON for each product
    const productsWithParsedImages = products.map(product => ({
      ...product,
      images: JSON.parse(product.images || '[]'),
    }))

    const headers = new Headers()
    headers.set('Content-Range', `${skip}-${skip + products.length - 1}/${total}`)

    return NextResponse.json(productsWithParsedImages, { headers })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/admin/products
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    
    // Handle images - ensure it's a JSON string
    if (data.images && Array.isArray(data.images)) {
      data.images = JSON.stringify(data.images)
    }

    const product = await db.product.create({
      data: {
        ...data,
        slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}