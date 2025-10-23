'use client'

import React from 'react'
import { Admin, Resource, ListGuesser, EditGuesser, CreateGuesser } from 'react-admin'
import { dataProvider } from './dataProvider'
import { authProvider } from './authProvider'
import { ProductList, ProductEdit, ProductCreate } from './products'
import { OrderList, OrderEdit } from './orders'
import { UserList, UserEdit, UserCreate } from './users'
import { PageContentList, PageContentEdit, PageContentCreate } from './pageContents'
import { BlogList, BlogEdit, BlogCreate } from './blogs'
import { Dashboard } from './dashboard'
import {
  ShoppingCart,
  Users,
  Package,
  FileText,
  Article,
  Dashboard as DashboardIcon,
} from 'lucide-react'

const App = () => (
  <Admin
    dashboard={Dashboard}
    dataProvider={dataProvider}
    authProvider={authProvider}
    title="CM Crypto Miners Admin"
    requireLogin={false}
    loginPage={false}
  >
    <Resource
      name="products"
      list={ProductList}
      edit={ProductEdit}
      create={ProductCreate}
      icon={Package}
    />
    <Resource
      name="orders"
      list={OrderList}
      edit={OrderEdit}
      icon={ShoppingCart}
    />
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
      icon={Users}
    />
    <Resource
      name="page-contents"
      list={PageContentList}
      edit={PageContentEdit}
      create={PageContentCreate}
      icon={FileText}
    />
    <Resource
      name="blogs"
      list={BlogList}
      edit={BlogEdit}
      create={BlogCreate}
      icon={Article}
    />
  </Admin>
)

export default App