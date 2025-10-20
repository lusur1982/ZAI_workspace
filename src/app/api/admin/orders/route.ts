import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

// GET /api/admin/orders
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
    if (filter.status) where.status = filter.status

    const orderBy: any = {}
    if (sort.field) {
      orderBy[sort.field] = sort.order.toLowerCase()
    }

    const [orders, total] = await Promise.all([
      db.order.findMany({
        where,
        orderBy,
        skip,
        take: perPage,
        include: {
          orderItems: true,
        },
      }),
      db.order.count({ where }),
    ])

    const headers = new Headers()
    headers.set('Content-Range', `${skip}-${skip + orders.length - 1}/${total}`)

    return NextResponse.json(orders, { headers })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}