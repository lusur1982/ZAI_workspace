'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, Package, Truck, ArrowLeft, Home, Mail } from 'lucide-react'

interface OrderItem {
  id: string
  productName: string
  productPrice: number
  quantity: number
  total: number
}

interface Order {
  id: string
  orderNumber: string
  customerFirstName: string
  customerLastName: string
  customerEmail: string
  customerAddress: string
  customerCity: string
  customerState: string
  customerZipCode: string
  customerCountry: string
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: string
  createdAt: string
  items: OrderItem[]
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const orderId = searchParams.get('orderId')

  useEffect(() => {
    if (!orderId) {
      setError('Order ID not found')
      setLoading(false)
      return
    }

    // In a real app, you would fetch the order from the API
    // For now, we'll simulate this with a mock order
    const fetchOrder = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock order data - in production, this would come from your API
        const mockOrder: Order = {
          id: orderId,
          orderNumber: orderId,
          customerFirstName: 'John',
          customerLastName: 'Doe',
          customerEmail: 'john.doe@example.com',
          customerAddress: '123 Main St',
          customerCity: 'New York',
          customerState: 'NY',
          customerZipCode: '10001',
          customerCountry: 'United States',
          subtotal: 5999.97,
          shipping: 0,
          tax: 479.99,
          total: 6479.96,
          status: 'PENDING',
          createdAt: new Date().toISOString(),
          items: [
            {
              id: '1',
              productName: 'Antminer S19 Pro 110TH/s',
              productPrice: 1999.99,
              quantity: 3,
              total: 5999.97
            }
          ]
        }
        
        setOrder(mockOrder)
      } catch (err) {
        setError('Failed to load order details')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your order details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 text-red-600">Order Not Found</h1>
            <p className="text-gray-600 mb-8">
              {error || 'We couldn\'t find your order details. Please contact customer support.'}
            </p>
          </div>
          
          <div className="space-y-4">
            <Link href="/shop">
              <Button size="lg" className="w-full sm:w-auto">
                <Home className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 text-lg">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          <div className="mt-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Order #{order.orderNumber}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Customer</p>
                    <p className="font-medium">
                      {order.customerFirstName} {order.customerLastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{order.customerEmail}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Shipping Address</p>
                    <p className="font-medium">
                      {order.customerAddress}<br />
                      {order.customerCity}, {order.customerState} {order.customerZipCode}<br />
                      {order.customerCountry}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${item.total.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">${item.productPrice.toLocaleString()} each</p>
                      </div>
                    </div>
                  ))}
                  <Separator />
                  <div className="space-y-2 pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${order.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>{order.shipping === 0 ? 'FREE' : `$${order.shipping.toLocaleString()}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>${order.tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      {order.status}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      We'll send you updates via email
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Order placed: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p>Expected delivery: 5-7 business days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Order Confirmation</p>
                      <p className="text-sm text-gray-600">You'll receive an email confirmation shortly</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Order Processing</p>
                      <p className="text-sm text-gray-600">We'll prepare your items for shipping</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Shipping</p>
                      <p className="text-sm text-gray-600">Your order will be shipped via express delivery</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">4</span>
                    </div>
                    <div>
                      <p className="font-medium">Delivery</p>
                      <p className="text-sm text-gray-600">Receive your crypto miners and start mining!</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Link href="/shop">
                    <Button className="w-full">
                      <Home className="w-4 h-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}