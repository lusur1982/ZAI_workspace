'use client'

import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  EditButton,
  DateField,
  ImageField,
  SelectField,
  useRecordContext,
} from 'react-admin'
import { FilterList, FilterListItem, ListBase } from 'react-admin'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Package,
  DollarSign,
  Cpu,
  Thermometer,
  Star,
  Sparkles,
} from 'lucide-react'

const productTypeChoices = [
  { id: 'ASIC', name: 'ASIC' },
  { id: 'GPU', name: 'GPU' },
]

const coolingChoices = [
  { id: 'Air Cooling', name: 'Air Cooling' },
  { id: 'Water Cooling', name: 'Water Cooling' },
  { id: 'Liquid Cooling', name: 'Liquid Cooling' },
]

const ProductFilters = () => (
  <Card className="w-64 mr-4">
    <CardContent className="p-4">
      <FilterList label="Product Type" icon={<Cpu className="w-4 h-4" />}>
        <FilterListItem
          label="ASIC"
          value={{ type: 'ASIC' }}
        />
        <FilterListItem
          label="GPU"
          value={{ type: 'GPU' }}
        />
      </FilterList>
      
      <FilterList label="Cooling Type" icon={<Thermometer className="w-4 h-4" />}>
        <FilterListItem
          label="Air Cooling"
          value={{ cooling: 'Air Cooling' }}
        />
        <FilterListItem
          label="Water Cooling"
          value={{ cooling: 'Water Cooling' }}
        />
        <FilterListItem
          label="Liquid Cooling"
          value={{ cooling: 'Liquid Cooling' }}
        />
      </FilterList>

      <FilterList label="Status" icon={<Star className="w-4 h-4" />}>
        <FilterListItem
          label="Featured"
          value={{ featured: true }}
        />
        <FilterListItem
          label="New"
          value={{ new: true }}
        />
      </FilterList>
    </CardContent>
  </Card>
)

const ProductImageField = ({ source }: { source: string }) => {
  const record = useRecordContext()
  if (!record) return null
  
  let images = []
  try {
    images = JSON.parse(record[source] || '[]')
  } catch {
    images = []
  }

  if (images.length === 0) return <Package className="w-8 h-8 text-gray-400" />

  return (
    <img
      src={images[0]}
      alt={record.name}
      className="w-16 h-16 object-cover rounded"
      onError={(e) => {
        e.currentTarget.src = '/placeholder-product.png'
      }}
    />
  )
}

const PriceField = ({ source }: { source: string }) => {
  const record = useRecordContext()
  if (!record) return null
  
  return (
    <div className="flex items-center space-x-1">
      <DollarSign className="w-4 h-4 text-green-600" />
      <span className="font-semibold text-green-600">
        {record[source]?.toLocaleString()}
      </span>
    </div>
  )
}

const StatusBadges = ({ record }: { record: any }) => {
  if (!record) return null

  return (
    <div className="flex space-x-2">
      {record.featured && (
        <Badge variant="secondary" className="flex items-center space-x-1">
          <Star className="w-3 h-3" />
          <span>Featured</span>
        </Badge>
      )}
      {record.new && (
        <Badge variant="default" className="flex items-center space-x-1">
          <Sparkles className="w-3 h-3" />
          <span>New</span>
        </Badge>
      )}
    </div>
  )
}

export const ProductList = () => (
  <ListBase>
    <div className="flex">
      <ProductFilters />
      <List>
        <Datagrid rowClick="edit">
          <ProductImageField source="images" />
          <TextField source="name" />
          <TextField source="slug" />
          <SelectField source="type" choices={productTypeChoices} />
          <SelectField source="cooling" choices={coolingChoices} />
          <PriceField source="price" />
          <StatusBadges />
          <DateField source="createdAt" />
          <EditButton />
        </Datagrid>
      </List>
    </div>
  </ListBase>
)