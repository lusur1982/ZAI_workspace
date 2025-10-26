import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

// GET /api/admin/users
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
    if (filter.role) where.role = filter.role

    const orderBy: any = {}
    if (sort.field) {
      orderBy[sort.field] = sort.order.toLowerCase()
    }

    const [users, total] = await Promise.all([
      db.user.findMany({
        where,
        orderBy,
        skip,
        take: perPage,
        select: {
          id: true,
          email: true,
          username: true,
          name: true,
          role: true,
          phone: true,
          address: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      db.user.count({ where }),
    ])

    const headers = new Headers()
    headers.set('Content-Range', `${skip}-${skip + users.length - 1}/${total}`)

    return NextResponse.json(users, { headers })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/admin/users
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    
    // Hash password if provided
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12)
    }

    const user = await db.user.create({
      data,
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        role: true,
        phone: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}