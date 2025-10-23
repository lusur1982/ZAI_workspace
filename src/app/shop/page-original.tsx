'use client'

import { useState, useEffect } from 'react'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { ProductFilters } from '@/components/shop/ProductFilters'
import { Product } from '@/types/product'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Zap, Shield, RefreshCw, ChevronDown } from 'lucide-react'

type PageVariant = 'ultra' | 'hybrid' | 'standard'

interface VariantConfig {
  id: PageVariant
  name: string
  description: string
  speed: string
  dataFreshness: string
  icon: React.ReactNode
  badge: string
  badgeColor: string
}

const variants: VariantConfig[] = [
  {
    id: 'ultra',
    name: 'Ultra Rýchla',
    description: 'Maximálna rýchlosť, základné dáta',
    speed: '~0.3s',
    dataFreshness: '15 minút',
    icon: <Zap className="w-5 h-5" />,
    badge: 'Najrýchlejšia',
    badgeColor: 'bg-green-500'
  },
  {
    id: 'hybrid',
    name: 'Hybridná',
    description: 'Rýchla verzia s občasným obnovovaním',
    speed: '~0.5s',
    dataFreshness: '5 minút',
    icon: <RefreshCw className="w-5 h-5" />,
    badge: 'Odporúčaná',
    badgeColor: 'bg-blue-500'
  },
  {
    id: 'standard',
    name: 'Standardná',
    description: 'Plnohodnotná verzia s najnovšími dátami',
    speed: '~1-2s',
    dataFreshness: 'Reálny čas',
    icon: <Shield className="w-5 h-5" />,
    badge: 'Najnovšie dáta',
    badgeColor: 'bg-purple-500'
  }
]

// Static data for ultra-fast variant
const staticProducts: Product[] = [
  {
    id: "1",
    name: "Bitmain Antminer S19 Pro",
    slug: "antminer-s19-pro",
    price: 2499,
    description: "The most powerful Bitcoin miner with 110 TH/s hashrate",
    type: "ASIC",
    cooling: "Air Cooling",
    images: [],
    featured: true,
    new: false,
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "MicroBT WhatsMiner M30S++",
    slug: "whatsminer-m30s-plus",
    price: 2299,
    description: "High-performance Bitcoin mining rig with 112 TH/s",
    type: "ASIC",
    cooling: "Air Cooling",
    images: [],
    featured: true,
    new: false,
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    name: "Canaan AvalonMiner 1246",
    slug: "avalonminer-1246",
    price: 1899,
    description: "Reliable Bitcoin miner with 90 TH/s hashrate",
    type: "ASIC",
    cooling: "Air Cooling",
    images: [],
    featured: false,
    new: true,
    createdAt: new Date().toISOString()
  }
]

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState<PageVariant>('hybrid')
  const [showSelector, setShowSelector] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: 10000,
    type: '',
    cooling: ''
  })

  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('shopVariant') as PageVariant
    if (saved && ['ultra', 'hybrid', 'standard'].includes(saved)) {
      setSelectedVariant(saved)
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('shopVariant', selectedVariant)
    }
  }, [selectedVariant, isClient])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let endpoint = '/api/products'
        
        if (selectedVariant === 'ultra') {
          // Use static data immediately
          setProducts(staticProducts)
          setFilteredProducts(staticProducts)
          setLoading(false)
          return
        } else if (selectedVariant === 'hybrid') {
          endpoint = '/api/products-fast'
        }

        const response = await fetch(endpoint)
        const data = await response.json()
        
        let productsArray = []
        if (data.products && Array.isArray(data.products)) {
          productsArray = data.products
        } else if (Array.isArray(data)) {
          productsArray = data
        }
        
        setProducts(productsArray)
        setFilteredProducts(productsArray)
      } catch (error) {
        console.error('Failed to fetch products:', error)
        // Fallback to static data
        setProducts(staticProducts)
        setFilteredProducts(staticProducts)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [selectedVariant])

  useEffect(() => {
    let filtered = products || []

    if (filters.search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.category) {
      filtered = filtered.filter(product => product.type === filters.category)
    }

    if (filters.type) {
      filtered = filtered.filter(product => product.type === filters.type)
    }

    if (filters.cooling) {
      filtered = filtered.filter(product => product.cooling === filters.cooling)
    }

    filtered = filtered.filter(product =>
      product.price >= filters.minPrice && product.price <= filters.maxPrice
    )

    setFilteredProducts(filtered)
  }, [filters, products])

  const currentVariant = variants.find(v => v.id === selectedVariant)!

  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 h-80 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 h-80 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Prepínač varianty */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b mb-6">
        <div className="py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Shop variant:</span>
              <Badge className={`${currentVariant.badgeColor} text-white`}>
                {currentVariant.icon}
                <span className="ml-1">{currentVariant.badge}</span>
              </Badge>
              <span className="text-sm text-muted-foreground">
                {currentVariant.name} ({currentVariant.speed})
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSelector(!showSelector)}
            >
              Zmeniť variantu
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showSelector ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {showSelector && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {variants.map((variant) => (
                <Card 
                  key={variant.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedVariant === variant.id 
                      ? 'ring-2 ring-primary border-primary' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => {
                    setSelectedVariant(variant.id)
                    setShowSelector(false)
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm flex items-center gap-2">
                        {variant.icon}
                        {variant.name}
                      </CardTitle>
                      <Badge 
                        variant="secondary" 
                        className={`${variant.badgeColor} text-white text-xs`}
                      >
                        {variant.badge}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">
                      {variant.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Rýchlosť:</span>
                      <span className="font-medium">{variant.speed}</span>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-muted-foreground">Aktuálnosť:</span>
                      <span className="font-medium">{variant.dataFreshness}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Shop Crypto Miners</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ProductFilters 
            filters={filters} 
            onFiltersChange={setFilters}
            products={products}
          />
        </div>
        
        <div className="lg:col-span-3">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products?.length || 0} products
            </p>
          </div>
          
          <ProductGrid products={filteredProducts} />
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <button 
                onClick={() => setFilters({
                  search: '',
                  category: '',
                  minPrice: 0,
                  maxPrice: 10000,
                  type: '',
                  cooling: ''
                })}
                className="mt-4 text-blue-600 hover:text-blue-700 underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}