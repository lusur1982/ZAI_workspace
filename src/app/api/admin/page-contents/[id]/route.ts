import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

// GET /api/admin/page-contents/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const pageContent = await db.pageContent.findUnique({
      where: { id: params.id },
    })

    if (!pageContent) {
      return NextResponse.json({ error: 'Page content not found' }, { status: 404 })
    }

    return NextResponse.json(pageContent)
  } catch (error) {
    console.error('Error fetching page content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/admin/page-contents/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    
    const pageContent = await db.pageContent.update({
      where: { id: params.id },
      data,
    })

    return NextResponse.json(pageContent)
  } catch (error) {
    console.error('Error updating page content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/admin/page-contents/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await db.pageContent.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ id: params.id })
  } catch (error) {
    console.error('Error deleting page content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}