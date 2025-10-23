'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowUpDown, Search, TrendingUp, Zap, DollarSign, Activity, ChevronDown } from 'lucide-react'
import { Product } from '@/types/product'

interface ProfitabilityData extends Product {
  dailyRevenue: number
  monthlyRevenue: number
  yearlyRevenue: number
  electricityCost: number
  netProfit: number
  roi: number
}

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
    description: 'Maximálna rýchlosť, predpočítané hodnoty',
    speed: '~0.3s',
    dataFreshness: '15 minút',
    icon: <Zap className="w-5 h-5" />,
    badge: 'Najrýchlejšia',
    badgeColor: 'bg-green-500'
  },
  {
    id: 'hybrid',
    name: 'Hybridná',
    description: 'Rýchla verzia s cache',
    speed: '~0.5s',
    dataFreshness: '5 minút',
    icon: <TrendingUp className="w-5 h-5" />,
    badge: 'Odporúčaná',
    badgeColor: 'bg-blue-500'
  },
  {
    id: 'standard',
    name: 'Standardná',
    description: 'Plnohodnotná verzia s aktuálnymi dátami',
    speed: '~1-2s',
    dataFreshness: 'Reálny čas',
    icon: <Activity className="w-5 h-5" />,
    badge: 'Najpresnejšia',
    badgeColor: 'bg-purple-500'
  }
]

// Static profitability data for ultra-fast variant
const staticProfitabilityData: ProfitabilityData[] = [
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
    createdAt: new Date().toISOString(),
    dailyRevenue: 12.50,
    monthlyRevenue: 375.00,
    yearlyRevenue: 4562.50,
    electricityCost: 234.00,
    netProfit: 141.00,
    roi: 67.7
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
    createdAt: new Date().toISOString(),
    dailyRevenue: 12.75,
    monthlyRevenue: 382.50,
    yearlyRevenue: 4643.75,
    electricityCost: 234.00,
    netProfit: 148.50,
    roi: 77.5
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
    createdAt: new Date().toISOString(),
    dailyRevenue: 10.25,
    monthlyRevenue: 307.50,
    yearlyRevenue: 3741.25,
    electricityCost: 198.00,
    netProfit: 109.50,
    roi: 69.2
  }
]

export default function ProfitabilityPage() {
  const [products, setProducts] = useState<ProfitabilityData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<keyof ProfitabilityData>('netProfit')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [electricityRate, setElectricityRate] = useState(0.10)
  const [filterType, setFilterType] = useState('')
  const [selectedVariant, setSelectedVariant] = useState<PageVariant>('hybrid')
  const [showSelector, setShowSelector] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('profitabilityVariant') as PageVariant
    if (saved && ['ultra', 'hybrid', 'standard'].includes(saved)) {
      setSelectedVariant(saved)
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('profitabilityVariant', selectedVariant)
    }
  }, [selectedVariant, isClient])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (selectedVariant === 'ultra') {
          // Use static data immediately
          setProducts(staticProfitabilityData)
          setLoading(false)
          return
        }

        let endpoint = selectedVariant === 'hybrid' ? '/api/products-fast' : '/api/products'
        const response = await fetch(endpoint)
        const data = await response.json()
        
        let productsArray: Product[] = []
        if (data.products && Array.isArray(data.products)) {
          productsArray = data.products
        } else if (Array.isArray(data)) {
          productsArray = data
        }
        
        // Calculate profitability metrics
        const profitabilityData = productsArray.map(product => {
          const hashrate = getHashrateByType(product.type)
          const powerConsumption = getPowerConsumptionByType(product.type)
          
          const dailyRevenue = (hashrate * 0.00000001 * 144 * 30)
          const monthlyRevenue = dailyRevenue * 30
          const yearlyRevenue = dailyRevenue * 365
          const dailyElectricityCost = (powerConsumption * 24 * electricityRate) / 1000
          const monthlyElectricityCost = dailyElectricityCost * 30
          const netProfit = monthlyRevenue - monthlyElectricityCost
          const roi = (netProfit * 12) / product.price * 100

          return {
            ...product,
            dailyRevenue,
            monthlyRevenue,
            yearlyRevenue,
            electricityCost: monthlyElectricityCost,
            netProfit,
            roi
          }
        })

        setProducts(profitabilityData)
      } catch (error) {
        console.error('Failed to fetch products:', error)
        // Fallback to static data
        setProducts(staticProfitabilityData)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [selectedVariant, electricityRate])

  const getHashrateByType = (type: string): number => {
    const hashrates: { [key: string]: number } = {
      'ASIC': 100,
      'GPU': 50,
      'FPGA': 75,
      'CPU': 10
    }
    return hashrates[type] || 50
  }

  const getPowerConsumptionByType = (type: string): number => {
    const powerConsumption: { [key: string]: number } = {
      'ASIC': 3250,
      'GPU': 1200,
      'FPGA': 800,
      'CPU': 200
    }
    return powerConsumption[type] || 1000
  }

  const handleSort = (field: keyof ProfitabilityData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const filteredAndSortedProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.type.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = !filterType || product.type === filterType
      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      return 0
    })

  const currentVariant = variants.find(v => v.id === selectedVariant)!

  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded-lg"></div>
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
              <span className="text-sm font-medium">Profitability variant:</span>
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

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Miner Profitability Calculator</h1>
        <p className="text-gray-600">
          Compare mining profitability across different crypto miners with real-time calculations
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Miners</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Monthly Profit</p>
                <p className="text-2xl font-bold">
                  ${products.length > 0 
                    ? Math.round(products.reduce((sum, p) => sum + p.netProfit, 0) / products.length)
                    : 0}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Best ROI</p>
                <p className="text-2xl font-bold">
                  {products.length > 0 
                    ? Math.round(Math.max(...products.map(p => p.roi)))
                    : 0}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Electricity Rate</p>
                <p className="text-2xl font-bold">${electricityRate.toFixed(2)}</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search miners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterType || "all"} onValueChange={(value) => setFilterType(value === "all" ? "" : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="ASIC">ASIC</SelectItem>
                <SelectItem value="GPU">GPU</SelectItem>
                <SelectItem value="FPGA">FPGA</SelectItem>
                <SelectItem value="CPU">CPU</SelectItem>
              </SelectContent>
            </Select>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Electricity Rate ($/kWh)</label>
              <Input
                type="number"
                step="0.01"
                value={electricityRate}
                onChange={(e) => setElectricityRate(parseFloat(e.target.value) || 0)}
                placeholder="0.10"
              />
            </div>
            
            <Button className="mt-6">
              Calculate Profitability
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profitability Table */}
      <Card>
        <CardHeader>
          <CardTitle>Profitability Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Miner</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('monthlyRevenue')}
                  >
                    <div className="flex items-center gap-2">
                      Monthly Revenue
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead>Electricity Cost</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('netProfit')}
                  >
                    <div className="flex items-center gap-2">
                      Net Profit
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('roi')}
                  >
                    <div className="flex items-center gap-2">
                      ROI
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.cooling}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.type}</Badge>
                    </TableCell>
                    <TableCell>${product.price.toLocaleString()}</TableCell>
                    <TableCell className="font-medium text-green-600">
                      ${product.monthlyRevenue.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-red-600">
                      ${product.electricityCost.toFixed(2)}
                    </TableCell>
                    <TableCell className={`font-medium ${product.netProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${product.netProfit.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.roi > 0 ? 'default' : 'destructive'}>
                        {product.roi.toFixed(1)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}