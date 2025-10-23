import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    // Validate required fields
    if (!orderData.customer || !orderData.items || !orderData.pricing) {
      return NextResponse.json(
        { error: 'Missing required order data' },
        { status: 400 }
      )
    }

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create order in database
    const order = await db.order.create({
      data: {
        id: orderId,
        customerFirstName: orderData.customer.firstName,
        customerLastName: orderData.customer.lastName,
        customerEmail: orderData.customer.email,
        customerPhone: orderData.customer.phone || null,
        customerAddress: orderData.customer.address,
        customerCity: orderData.customer.city,
        customerState: orderData.customer.state,
        customerZipCode: orderData.customer.zipCode,
        customerCountry: orderData.customer.country,
        subtotal: orderData.pricing.subtotal,
        shipping: orderData.pricing.shipping,
        tax: orderData.pricing.tax,
        total: orderData.pricing.total,
        status: 'pending',
        items: {
          create: orderData.items.map((item: any) => ({
            productId: item.productId,
            productName: item.name,
            productPrice: item.price,
            quantity: item.quantity,
            total: item.total
          }))
        }
      },
      include: {
        items: true
      }
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    const orders = await db.order.findMany({
      where: {
        customerEmail: email
      },
      include: {
        items: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Order fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}