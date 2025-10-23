'use client'

import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  EditButton,
  FunctionField,
  useRecordContext,
} from 'react-admin'
import { FilterList, FilterListItem } from 'react-admin'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ShoppingCart,
  User,
  DollarSign,
  Package,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
} from 'lucide-react'

const orderStatusChoices = [
  { id: 'PENDING', name: 'Pending', color: 'yellow' },
  { id: 'PROCESSING', name: 'Processing', color: 'blue' },
  { id: 'SHIPPED', name: 'Shipped', color: 'purple' },
  { id: 'DELIVERED', name: 'Delivered', color: 'green' },
  { id: 'CANCELLED', name: 'Cancelled', color: 'red' },
]

const OrderFilters = () => (
  <Card className="w-64 mr-4">
    <CardContent className="p-4">
      <FilterList label="Order Status" icon={<ShoppingCart className="w-4 h-4" />}>
        {orderStatusChoices.map((status) => (
          <FilterListItem
            key={status.id}
            label={status.name}
            value={{ status: status.id }}
          />
        ))}
      </FilterList>
    </CardContent>
  </Card>
)

const StatusField = ({ source }: { source: string }) => {
  const record = useRecordContext()
  if (!record) return null

  const statusConfig = orderStatusChoices.find(s => s.id === record[source])
  const colorMap: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    PROCESSING: 'bg-blue-100 text-blue-800',
    SHIPPED: 'bg-purple-100 text-purple-800',
    DELIVERED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
  }

  const iconMap: Record<string, React.ReactNode> = {
    PENDING: <Clock className="w-3 h-3" />,
    PROCESSING: <Package className="w-3 h-3" />,
    SHIPPED: <Truck className="w-3 h-3" />,
    DELIVERED: <CheckCircle className="w-3 h-3" />,
    CANCELLED: <XCircle className="w-3 h-3" />,
  }

  return (
    <Badge className={`${colorMap[record[source]]} flex items-center space-x-1`}>
      {iconMap[record[source]]}
      <span>{statusConfig?.name || record[source]}</span>
    </Badge>
  )
}

const CustomerField = ({ source }: { source: string }) => {
  const record = useRecordContext()
  if (!record) return null

  return (
    <div className="space-y-1">
      <div className="font-medium">{record.customerFirstName} {record.customerLastName}</div>
      <div className="text-sm text-gray-600">{record.customerEmail}</div>
      <div className="text-sm text-gray-600">{record.customerPhone}</div>
    </div>
  )
}

const TotalField = ({ source }: { source: string }) => {
  const record = useRecordContext()
  if (!record) return null

  return (
    <div className="flex items-center space-x-1">
      <DollarSign className="w-4 h-4 text-green-600" />
      <span className="font-semibold text-green-600">
        {record[source]?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
    </div>
  )
}

export const OrderList = () => (
  <div className="flex">
    <OrderFilters />
    <List>
      <Datagrid rowClick="edit">
        <TextField source="orderNumber" label="Order #" />
        <CustomerField source="customerFirstName" label="Customer" />
        <DateField source="createdAt" label="Order Date" />
        <StatusField source="status" />
        <NumberField source="total" label="Subtotal" />
        <TotalField source="total" label="Total" />
        <EditButton />
      </Datagrid>
    </List>
  </div>
)