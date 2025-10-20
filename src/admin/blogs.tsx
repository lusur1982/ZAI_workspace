'use client'

import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  BooleanField,
  FunctionField,
  useRecordContext,
} from 'react-admin'
import { FilterList, FilterListItem } from 'react-admin'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Article,
  Eye,
  EyeOff,
  Star,
  Calendar,
  FileText,
} from 'lucide-react'

const BlogFilters = () => (
  <Card className="w-64 mr-4">
    <CardContent className="p-4">
      <FilterList label="Status" icon={<Eye className="w-4 h-4" />}>
        <FilterListItem
          label="Published"
          value={{ published: true }}
        />
        <FilterListItem
          label="Draft"
          value={{ published: false }}
        />
      </FilterList>
      
      <FilterList label="Featured" icon={<Star className="w-4 h-4" />}>
        <FilterListItem
          label="Featured"
          value={{ featured: true }}
        />
        <FilterListItem
          label="Not Featured"
          value={{ featured: false }}
        />
      </FilterList>
    </CardContent>
  </Card>
)

const StatusField = ({ source }: { source: string }) => {
  const record = useRecordContext()
  if (!record) return null

  return (
    <Badge className={record[source] ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
      {record[source] ? (
        <div className="flex items-center space-x-1">
          <Eye className="w-3 h-3" />
          <span>Published</span>
        </div>
      ) : (
        <div className="flex items-center space-x-1">
          <EyeOff className="w-3 h-3" />
          <span>Draft</span>
        </div>
      )}
    </Badge>
  )
}

const FeaturedField = ({ source }: { source: string }) => {
  const record = useRecordContext()
  if (!record) return null

  return (
    <Badge className={record[source] ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}>
      {record[source] ? (
        <div className="flex items-center space-x-1">
          <Star className="w-3 h-3" />
          <span>Featured</span>
        </div>
      ) : (
        <div className="flex items-center space-x-1">
          <FileText className="w-3 h-3" />
          <span>Regular</span>
        </div>
      )}
    </Badge>
  )
}

const BlogContentField = ({ record }: { record: any }) => {
  if (!record) return null

  return (
    <div className="space-y-1">
      <div className="font-medium">{record.title}</div>
      <div className="text-sm text-gray-600">Slug: {record.slug}</div>
      {record.excerpt && (
        <div className="text-xs text-gray-500 line-clamp-2">
          {record.excerpt}
        </div>
      )}
    </div>
  )
}

export const BlogList = () => (
  <div className="flex">
    <BlogFilters />
    <List>
      <Datagrid rowClick="edit">
        <BlogContentField />
        <StatusField source="published" />
        <FeaturedField source="featured" />
        <DateField source="createdAt" label="Created" />
        <DateField source="updatedAt" label="Updated" />
        <EditButton />
      </Datagrid>
    </List>
  </div>
)