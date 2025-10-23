'use client'

import React from 'react'
import {
  Create,
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

export const UserCreate = () => (
  <Create>
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
            label="Password"
            validate={[required(), minLength(6)]}
          />
        </CardContent>
      </Card>
    </SimpleForm>
  </Create>
)