'use client'

import React from 'react'
import {
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  required,
  minLength,
} from 'react-admin'
import { RichTextInput } from 'ra-input-rich-text'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const BlogTitle = ({ record }: { record?: any }) => {
  return <span>Edit Blog: {record ? record.title : ''}</span>
}

export const BlogEdit = () => (
  <Edit title={<BlogTitle />}>
    <SimpleForm>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TextInput
              source="title"
              label="Blog Title"
              validate={[required()]}
              fullWidth
            />
            <TextInput
              source="slug"
              label="URL Slug"
              validate={[required(), minLength(3)]}
              fullWidth
            />
            <TextInput
              source="excerpt"
              label="Excerpt"
              multiline
              rows={3}
              fullWidth
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status & Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <BooleanInput source="published" label="Published" />
            <BooleanInput source="featured" label="Featured" />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Blog Content</CardTitle>
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
    </SimpleForm>
  </Edit>
)