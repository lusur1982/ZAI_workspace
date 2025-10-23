'use client'

import { useState, useEffect } from 'react'
import { ProductGridOptimized } from '@/components/shop/ProductGrid-optimized'
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
    description: 'Okamžité načítanie, statické dáta',
    speed: '~0.1s',
    dataFreshness: 'Statické',
    icon: <Zap className="w-5 h-5" />,
    badge: 'Najrýchlejšia',
    badgeColor: 'bg-green-500'
  },
  {
    id: 'hybrid',
    name: 'Hybridná',
    description: 'Rýchla verzia s cache',
    speed: '~0.3s',
    dataFreshness: '5 minút',
    icon: <RefreshCw className="w-5 h-5" />,
    badge: 'Odporúčaná',
    badgeColor: 'bg-blue-500'
  },
  {
    id: 'standard',
    name: 'Standardná',
    description: 'Plnohodnotná verzia',
    speed: '~1s',
    dataFreshness: 'Reálny čas',
    icon: <Shield className="w-5 h-5" />,
    badge: 'Najnovšie dáta',
    badgeColor: 'bg-purple-500'
  }
]

// Comprehensive static data for ultra-fast variant
const staticProducts: Product[] = [
  {
    id: "1",
    name: "Bitmain Antminer S19 Pro",
    slug: "antminer-s19-pro",
    price: 2499,
    description: "The most powerful Bitcoin miner with 110 TH/s hashrate and exceptional efficiency for professional mining operations.",
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
    description: "High-performance Bitcoin mining rig with 112 TH/s hashrate and advanced cooling system for optimal performance.",
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
    description: "Reliable and efficient Bitcoin miner with 90 TH/s hashrate, perfect for professional mining setups.",
    type: "ASIC",
    cooling: "Air Cooling",
    images: [],
    featured: false,
    new: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "4",
    name: "Bitmain Antminer S19 XP",
    slug: "antminer-s19-xp",
    price: 3299,
    description: "Next-generation Bitcoin miner with 140 TH/s hashrate and improved energy efficiency for maximum profitability.",
    type: "ASIC",
    cooling: "Air Cooling",
    images: [],
    featured: true,
    new: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "5",
    name: "MicroBT WhatsMiner M50S",
    slug: "whatsminer-m50s",
    price: 2999,
    description: "Latest generation miner with 126 TH/s hashrate and optimized power consumption for better ROI.",
    type: "ASIC",
    cooling: "Air Cooling",
    images: [],
    featured: false,
    new: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "6",
    name: "Jasminer X4-1U",
    slug: "jasminer-x4-1u",
    price: 1599,
    description: "Compact and efficient Ethereum miner with high hashrate and low power consumption for home mining.",
    type: "ASIC",
    cooling: "Air Cooling",
    images: [],
    featured: false,
    new: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "7",
    name: "Goldshell KD6",
    slug: "goldshell-kd6",
    price: 899,
    description: "Compact Kadena miner with excellent performance and quiet operation, perfect for home or office mining.",
    type: "ASIC",
    cooling: "Air Cooling",
    images: [],
    featured: false,
    new: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "8",
    name: "Bitmain Antminer T19",
    slug: "antminer-t19",
    price: 1799,
    description: "Efficient Bitcoin miner with 84 TH/s hashrate, offering great performance for its price point.",
    type: "ASIC",
    cooling: "Air Cooling",
    images: [],
    featured: false,
    new: false,
    createdAt: new Date().toISOString()
  },
  {
    id: "9",
    name: "Innosilicon T3+",
    slug: "innosilicon-t3-plus",
    price: 1399,
    description: "Power-efficient Bitcoin miner with 53 TH/s hashrate, ideal for operations with high electricity costs.",
    type: "ASIC",
    cooling: "Air Cooling",
    images: [],
    featured: false,
    new: false,
    createdAt: new Date().toISOString()
  }
]

export default function ShopPageOptimized() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<PageVariant>('ultra')
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
    // Ultra-fast: use static data immediately
    if (selectedVariant === 'ultra') {
      setProducts(staticProducts)
      setFilteredProducts(staticProducts)
      setLoading(false)
      return
    }

    // Hybrid and Standard: fetch from API
    const fetchProducts = async () => {
      setLoading(true)
      try {
        let endpoint = selectedVariant === 'hybrid' ? '/api/products-fast' : '/api/products'
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
            ))}
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
          {selectedVariant !== 'ultra' && (
            <ProductFilters 
              filters={filters} 
              onFiltersChange={setFilters}
              products={products}
            />
          )}
          {selectedVariant === 'ultra' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Search</label>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="">All Types</option>
                    <option value="ASIC">ASIC</option>
                    <option value="GPU">GPU</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Max Price</label>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
                    className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="lg:col-span-3">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products?.length || 0} products
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <ProductGridOptimized 
              products={filteredProducts} 
              isStatic={selectedVariant === 'ultra'}
            />
          )}
          
          {filteredProducts.length === 0 && !loading && (
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