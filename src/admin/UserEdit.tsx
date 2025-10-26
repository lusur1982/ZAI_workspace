'use client'

import React from 'react'
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  PasswordInput,
  required,
  minLength,
} from 'react-admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const userRoleChoices = [
  { id: 'USER', name: 'User' },
  { id: 'ADMIN', name: 'Admin' },
]

const UserTitle = ({ record }: { record?: any }) => {
  return <span>Edit User: {record ? record.name || record.email : ''}</span>
}

export const UserEdit = () => (
  <Edit title={<UserTitle />}>
    <SimpleForm>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TextInput
              source="username"
              label="Username"
              validate={[required(), minLength(3)]}
            />
            <TextInput
              source="name"
              label="Full Name"
              validate={[required()]}
            />
            <TextInput
              source="email"
              label="Email"
              type="email"
              validate={[required()]}
            />
            <SelectInput
              source="role"
              label="User Role"
              choices={userRoleChoices}
              validate={[required()]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TextInput source="phone" label="Phone Number" />
            <TextInput source="address" label="Address" multiline rows={3} />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <PasswordInput
            source="password"
            label="New Password (leave blank to keep current)"
            validate={[minLength(6)]}
          />
        </CardContent>
      </Card>
    </SimpleForm>
  </Edit>
)