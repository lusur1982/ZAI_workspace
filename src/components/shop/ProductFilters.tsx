'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Search, Filter, X } from 'lucide-react'
import { Product } from '@/types/product'

interface ProductFiltersProps {
  filters: {
    search: string
    category: string
    minPrice: number
    maxPrice: number
    type: string
    cooling: string
  }
  onFiltersChange: (filters: any) => void
  products: Product[]
}

export function ProductFilters({ filters, onFiltersChange, products }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([filters.minPrice, filters.maxPrice])

  // Ensure products is always an array
  const safeProducts = Array.isArray(products) ? products : []
  
  const types = [...new Set(safeProducts.map(p => p.type))]
  const coolingTypes = [...new Set(safeProducts.map(p => p.cooling))]

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
    onFiltersChange({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1]
    })
  }

  const clearFilters = () => {
    const defaultFilters = {
      search: '',
      category: '',
      minPrice: 0,
      maxPrice: 10000,
      type: '',
      cooling: ''
    }
    setPriceRange([0, 10000])
    onFiltersChange(defaultFilters)
  }

  const hasActiveFilters = filters.search || filters.category || filters.type || filters.cooling || 
    filters.minPrice > 0 || filters.maxPrice < 10000

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <label className="text-sm font-medium mb-2 block">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        {/* Type Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Type</label>
          <div className="space-y-2">
            {types.map((type) => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  checked={filters.type === type}
                  onChange={() => onFiltersChange({ ...filters, type })}
                  className="text-blue-600"
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                checked={!filters.type}
                onChange={() => onFiltersChange({ ...filters, type: '' })}
                className="text-blue-600"
              />
              <span className="text-sm">All Types</span>
            </label>
          </div>
        </div>

        {/* Cooling Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Cooling</label>
          <div className="space-y-2">
            {coolingTypes.map((cooling) => (
              <label key={cooling} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="cooling"
                  checked={filters.cooling === cooling}
                  onChange={() => onFiltersChange({ ...filters, cooling })}
                  className="text-blue-600"
                />
                <span className="text-sm">{cooling}</span>
              </label>
            ))}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="cooling"
                checked={!filters.cooling}
                onChange={() => onFiltersChange({ ...filters, cooling: '' })}
                className="text-blue-600"
              />
              <span className="text-sm">All Cooling Types</span>
            </label>
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            max={10000}
            min={0}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$0</span>
            <span>$10,000</span>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div>
            <label className="text-sm font-medium mb-2 block">Active Filters</label>
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <Badge variant="secondary" className="text-xs">
                  Search: {filters.search}
                </Badge>
              )}
              {filters.type && (
                <Badge variant="secondary" className="text-xs">
                  Type: {filters.type}
                </Badge>
              )}
              {filters.cooling && (
                <Badge variant="secondary" className="text-xs">
                  Cooling: {filters.cooling}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}