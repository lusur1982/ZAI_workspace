'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/hooks/use-toast'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react'

interface UserProfile {
  id: string
  name: string
  email: string
  username?: string
  phone?: string
  address?: string
  role: string
  createdAt: string
  updatedAt: string
}

interface Order {
  id: string
  orderNumber: string
  total: number
  status: string
  createdAt: string
  customerFirstName: string
  customerLastName: string
}

export default function UserDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user) {
      fetchUserProfile()
      fetchUserOrders()
    }
  }, [session])

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/user/profile')
      if (response.ok) {
        const data = await response.json()
        setUserProfile(data)
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
          address: data.address || '',
        })
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUserOrders = async () => {
    try {
      const response = await fetch('/api/user/orders')
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      console.error('Error fetching user orders:', error)
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        })
        setIsEditing(false)
        fetchUserProfile()
      } else {
        throw new Error('Failed to update profile')
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive"
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'PROCESSING':
        return <Package className="w-4 h-4 text-blue-600" />
      case 'SHIPPED':
        return <Truck className="w-4 h-4 text-purple-600" />
      case 'DELIVERED':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'CANCELLED':
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    const colorMap: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      PROCESSING: 'bg-blue-100 text-blue-800',
      SHIPPED: 'bg-purple-100 text-purple-800',
      DELIVERED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
    }

    return (
      <Badge className={colorMap[status] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    )
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <p className="text-gray-600">Manage your profile and view your orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button type="submit">Save Changes</Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">{userProfile?.email}</span>
                    </div>
                    {userProfile?.name && (
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">{userProfile.name}</span>
                      </div>
                    )}
                    {userProfile?.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">{userProfile.phone}</span>
                      </div>
                    )}
                    {userProfile?.address && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">{userProfile.address}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">
                        Member since {new Date(userProfile?.createdAt || '').toLocaleDateString()}
                      </span>
                    </div>
                    <Separator />
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="w-full"
                    >
                      Edit Profile
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Orders Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span>My Orders</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">You haven't placed any orders yet.</p>
                    <Button
                      onClick={() => router.push('/shop')}
                      className="mt-4"
                    >
                      Start Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border rounded-lg p-4 hover:bg-gray-50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(order.status)}
                            <div>
                              <p className="font-medium">Order #{order.orderNumber}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              ${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </p>
                            {getStatusBadge(order.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}