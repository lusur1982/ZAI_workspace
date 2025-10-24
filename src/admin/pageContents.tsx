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
  FileText,
  Globe,
  Eye,
  EyeOff,
  Star,
  Calendar,
} from 'lucide-react'

const pageChoices = [
  { id: 'home', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'contact', name: 'Contact' },
  { id: 'faq', name: 'FAQ' },
  { id: 'privacy', name: 'Privacy Policy' },
  { id: 'terms', name: 'Terms of Service' },
]

const PageFilters = () => (
  <Card className="w-64 mr-4">
    <CardContent className="p-4">
      <FilterList label="Page Type" icon={<Globe className="w-4 h-4" />}>
        {pageChoices.map((page) => (
          <FilterListItem
            key={page.id}
            label={page.name}
            value={{ page: page.id }}
          />
        ))}
      </FilterList>
    </CardContent>
  </Card>
)

const PageTypeField = ({ source }: { source: string }) => {
  const record = useRecordContext()
  if (!record) return null

  const pageConfig = pageChoices.find(p => p.id === record[source])

  return (
    <Badge className="bg-blue-100 text-blue-800">
      <Globe className="w-3 h-3 mr-1" />
      {pageConfig?.name || record[source]}
    </Badge>
  )
}

const SeoField = ({ record }: { record: any }) => {
  if (!record) return null

  return (
    <div className="space-y-1">
      <div className="font-medium">{record.title}</div>
      {record.metaTitle && (
        <div className="text-sm text-gray-600">SEO: {record.metaTitle}</div>
      )}
      {record.metaDescription && (
        <div className="text-xs text-gray-500 line-clamp-2">
          {record.metaDescription}
        </div>
      )}
    </div>
  )
}

export const PageContentList = () => (
  <div className="flex">
    <PageFilters />
    <List>
      <Datagrid rowClick="edit">
        <PageTypeField source="page" />
        <SeoField />
        <DateField source="createdAt" label="Created" />
        <DateField source="updatedAt" label="Updated" />
        <EditButton />
      </Datagrid>
    </List>
  </div>
)