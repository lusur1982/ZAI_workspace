import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

// GET /api/admin/page-contents
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
    if (filter.page) where.page = filter.page

    const orderBy: any = {}
    if (sort.field) {
      orderBy[sort.field] = sort.order.toLowerCase()
    }

    const [pageContents, total] = await Promise.all([
      db.pageContent.findMany({
        where,
        orderBy,
        skip,
        take: perPage,
      }),
      db.pageContent.count({ where }),
    ])

    const headers = new Headers()
    headers.set('Content-Range', `${skip}-${skip + pageContents.length - 1}/${total}`)

    return NextResponse.json(pageContents, { headers })
  } catch (error) {
    console.error('Error fetching page contents:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/admin/page-contents
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    
    const pageContent = await db.pageContent.create({
      data,
    })

    return NextResponse.json(pageContent, { status: 201 })
  } catch (error) {
    console.error('Error creating page content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}