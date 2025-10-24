'use client'

import React from 'react'
import {
  Edit,
  SimpleForm,
  TextInput,
  required,
} from 'react-admin'
import { RichTextInput } from 'ra-input-rich-text'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const pageChoices = [
  { id: 'home', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'contact', name: 'Contact' },
  { id: 'faq', name: 'FAQ' },
  { id: 'privacy', name: 'Privacy Policy' },
  { id: 'terms', name: 'Terms of Service' },
]

const PageContentTitle = ({ record }: { record?: any }) => {
  return <span>Edit Page: {record ? record.title : ''}</span>
}

export const PageContentEdit = () => (
  <Edit title={<PageContentTitle />}>
    <SimpleForm>
      <Card>
        <CardHeader>
          <CardTitle>Page Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TextInput
            source="page"
            label="Page Type"
            choices={pageChoices}
            validate={[required()]}
          />
          <TextInput
            source="title"
            label="Page Title"
            validate={[required()]}
            fullWidth
          />
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Page Content</CardTitle>
        </CardHeader>
        <CardContent>
          <RichTextInput
            source="content"
            label="Content"
            validate={[required()]}
            fullWidth
          />
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TextInput
            source="metaTitle"
            label="Meta Title"
            fullWidth
          />
          <TextInput
            source="metaDescription"
            label="Meta Description"
            multiline
            rows={3}
            fullWidth
          />
        </CardContent>
      </Card>
    </SimpleForm>
  </Edit>
)