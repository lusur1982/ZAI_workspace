'use client'

import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  EmailField,
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
  Users,
  Mail,
  Shield,
  Calendar,
  Crown,
  User,
} from 'lucide-react'

const userRoleChoices = [
  { id: 'USER', name: 'User' },
  { id: 'ADMIN', name: 'Admin' },
]

const UserFilters = () => (
  <Card className="w-64 mr-4">
    <CardContent className="p-4">
      <FilterList label="User Role" icon={<Shield className="w-4 h-4" />}>
        {userRoleChoices.map((role) => (
          <FilterListItem
            key={role.id}
            label={role.name}
            value={{ role: role.id }}
          />
        ))}
      </FilterList>
    </CardContent>
  </Card>
)

const RoleField = ({ source }: { source: string }) => {
  const record = useRecordContext()
  if (!record) return null

  const isAdmin = record[source] === 'ADMIN'

  return (
    <Badge className={isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}>
      {isAdmin ? (
        <div className="flex items-center space-x-1">
          <Crown className="w-3 h-3" />
          <span>Admin</span>
        </div>
      ) : (
        <div className="flex items-center space-x-1">
          <User className="w-3 h-3" />
          <span>User</span>
        </div>
      )}
    </Badge>
  )
}

const ContactInfoField = ({ source }: { source: string }) => {
  const record = useRecordContext()
  if (!record) return null

  return (
    <div className="space-y-1">
      <div className="font-medium">{record.name}</div>
      <div className="text-sm text-gray-600">{record.email}</div>
      {record.phone && <div className="text-sm text-gray-600">{record.phone}</div>}
      {record.address && <div className="text-sm text-gray-600">{record.address}</div>}
    </div>
  )
}

export const UserList = () => (
  <div className="flex">
    <UserFilters />
    <List>
      <Datagrid rowClick="edit">
        <TextField source="username" label="Username" />
        <ContactInfoField source="name" label="Contact Info" />
        <RoleField source="role" />
        <DateField source="createdAt" label="Created" />
        <DateField source="updatedAt" label="Updated" />
        <EditButton />
      </Datagrid>
    </List>
  </div>
)