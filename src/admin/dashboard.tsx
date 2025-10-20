'use client'

import { useGetList, useGetOne } from 'react-admin'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  DollarSign,
  FileText,
} from 'lucide-react'

const Dashboard = () => {
  const { data: products, total: totalProducts } = useGetList('products', {
    pagination: { page: 1, perPage: 1 },
    sort: { field: 'createdAt', order: 'DESC' },
  })

  const { data: orders, total: totalOrders } = useGetList('orders', {
    pagination: { page: 1, perPage: 1 },
    sort: { field: 'createdAt', order: 'DESC' },
  })

  const { data: users, total: totalUsers } = useGetList('users', {
    pagination: { page: 1, perPage: 1 },
    sort: { field: 'createdAt', order: 'DESC' },
  })

  const { data: blogs, total: totalBlogs } = useGetList('blogs', {
    pagination: { page: 1, perPage: 1 },
    sort: { field: 'createdAt', order: 'DESC' },
  })

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts || 0,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Orders',
      value: totalOrders || 0,
      icon: ShoppingCart,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Users',
      value: totalUsers || 0,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Total Blogs',
      value: totalBlogs || 0,
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to CM Crypto Miners Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Recent orders will appear here</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Recent products will appear here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export { Dashboard }