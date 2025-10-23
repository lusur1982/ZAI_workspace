'use client'

import React from 'react'
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  DateField,
  required,
} from 'react-admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const orderStatusChoices = [
  { id: 'PENDING', name: 'Pending' },
  { id: 'PROCESSING', name: 'Processing' },
  { id: 'SHIPPED', name: 'Shipped' },
  { id: 'DELIVERED', name: 'Delivered' },
  { id: 'CANCELLED', name: 'Cancelled' },
]

const OrderTitle = ({ record }: { record?: any }) => {
  return <span>Edit Order: {record ? `#${record.orderNumber}` : ''}</span>
}

export const OrderEdit = () => (
  <Edit title={<OrderTitle />}>
    <SimpleForm>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TextInput
              source="orderNumber"
              label="Order Number"
              disabled
            />
            <DateField source="createdAt" label="Order Date" />
            <SelectInput
              source="status"
              label="Order Status"
              choices={orderStatusChoices}
              validate={[required()]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TextInput source="customerFirstName" label="First Name" />
            <TextInput source="customerLastName" label="Last Name" />
            <TextInput source="customerEmail" label="Email" type="email" />
            <TextInput source="customerPhone" label="Phone" />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TextInput source="customerAddress" label="Address" fullWidth />
          <div className="grid grid-cols-2 gap-4">
            <TextInput source="customerCity" label="City" />
            <TextInput source="customerState" label="State" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TextInput source="customerZipCode" label="Zip Code" />
            <TextInput source="customerCountry" label="Country" />
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <ArrayInput source="orderItems">
            <SimpleFormIterator>
              <TextInput source="productName" label="Product Name" />
              <NumberInput source="quantity" label="Quantity" />
              <NumberInput source="productPrice" label="Price per Unit" />
              <NumberInput source="total" label="Total" />
            </SimpleFormIterator>
          </ArrayInput>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Order Totals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <NumberInput source="subtotal" label="Subtotal" />
            <NumberInput source="shipping" label="Shipping" />
            <NumberInput source="tax" label="Tax" />
          </div>
          <NumberInput source="total" label="Total" />
        </CardContent>
      </Card>
    </SimpleForm>
  </Edit>
)