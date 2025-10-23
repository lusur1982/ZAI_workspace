'use client'

import React from 'react'
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  SelectInput,
  ReferenceInput,
  ImageInput,
  FileInput,
  required,
  minLength,
  regex,
} from 'react-admin'
import { RichTextInput } from 'ra-input-rich-text'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const productTypeChoices = [
  { id: 'ASIC', name: 'ASIC' },
  { id: 'GPU', name: 'GPU' },
]

const coolingChoices = [
  { id: 'Air Cooling', name: 'Air Cooling' },
  { id: 'Water Cooling', name: 'Water Cooling' },
  { id: 'Liquid Cooling', name: 'Liquid Cooling' },
]

export const ProductCreate = () => (
  <Create>
    <SimpleForm>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TextInput
              source="name"
              label="Product Name"
              validate={[required()]}
              fullWidth
            />
            <TextInput
              source="slug"
              label="Slug"
              validate={[required(), minLength(3), regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers, and hyphens allowed')]}
              fullWidth
            />
            <NumberInput
              source="price"
              label="Price ($)"
              validate={[required()]}
              fullWidth
            />
            <SelectInput
              source="type"
              label="Product Type"
              choices={productTypeChoices}
              validate={[required()]}
            />
            <SelectInput
              source="cooling"
              label="Cooling Type"
              choices={coolingChoices}
              validate={[required()]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status & Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <BooleanInput source="featured" label="Featured Product" />
            <BooleanInput source="new" label="New Product" />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Product Description</CardTitle>
        </CardHeader>
        <CardContent>
          <RichTextInput
            source="description"
            label="Description"
            validate={[required()]}
            fullWidth
          />
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageInput
            source="images"
            label="Product Images"
            multiple
            accept="image/*"
          >
            <img
              src=""
              alt="Product preview"
              className="w-32 h-32 object-cover"
            />
          </ImageInput>
        </CardContent>
      </Card>
    </SimpleForm>
  </Create>
)