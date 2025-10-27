import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

// GET /api/admin/blogs
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
    if (filter.published !== undefined) where.published = filter.published
    if (filter.featured !== undefined) where.featured = filter.featured

    const orderBy: any = {}
    if (sort.field) {
      orderBy[sort.field] = sort.order.toLowerCase()
    }

    const [blogs, total] = await Promise.all([
      db.blog.findMany({
        where,
        orderBy,
        skip,
        take: perPage,
      }),
      db.blog.count({ where }),
    ])

    const headers = new Headers()
    headers.set('Content-Range', `${skip}-${skip + blogs.length - 1}/${total}`)

    return NextResponse.json(blogs, { headers })
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/admin/blogs
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    
    const blog = await db.blog.create({
      data,
    })

    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    console.error('Error creating blog:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}