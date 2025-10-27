'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, Grid, List } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import { Suspense } from 'react'
import { ShopLoading } from './loading'

// Client-side product filtering
function useProductFilter(products: any[]) {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [coolingFilter, setCoolingFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = typeFilter === 'all' || product.type === typeFilter
      const matchesCooling = coolingFilter === 'all' || product.cooling === coolingFilter
      
      return matchesSearch && matchesType && matchesCooling
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchTerm, typeFilter, coolingFilter, sortBy])

  return {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    coolingFilter,
    setCoolingFilter,
    sortBy,
    setSortBy
  }
}

export default function ShopPage() {
  // This would be replaced with actual data fetching
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setProducts([
        {
          id: '1',
          name: 'Antminer S19 Pro',
          slug: 'antminer-s19-pro',
          description: 'Powerful Bitcoin miner',
          price: 2999.99,
          type: 'ASIC',
          cooling: 'Air Cooling',
          images: [''],
          featured: true,
          new: false,
          createdAt: new Date().toISOString()
        },
        // Add more products as needed
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    coolingFilter,
    setCoolingFilter,
    sortBy,
    setSortBy
  } = useProductFilter(products)

  if (loading) {
    return <ShopLoading />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Shop</h1>
        <p className="text-gray-600">Browse our selection of premium mining hardware</p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="ASIC">ASIC</SelectItem>
                <SelectItem value="GPU">GPU</SelectItem>
              </SelectContent>
            </Select>

            {/* Cooling Filter */}
            <Select value={coolingFilter} onValueChange={setCoolingFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Cooling" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cooling</SelectItem>
                <SelectItem value="Air Cooling">Air Cooling</SelectItem>
                <SelectItem value="Water Cooling">Water Cooling</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>

            {/* Results count */}
            <div className="flex items-center justify-center">
              <span className="text-sm text-gray-600">
                {filteredProducts.length} products found
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found matching your criteria.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchTerm('')
              setTypeFilter('all')
              setCoolingFilter('all')
              setSortBy('name')
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}