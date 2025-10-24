'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowUpDown, Search, TrendingUp, Zap, DollarSign, Activity } from 'lucide-react'
import { Product } from '@/types/product'

interface ProfitabilityData extends Product {
  dailyRevenue: number
  monthlyRevenue: number
  yearlyRevenue: number
  electricityCost: number
  netProfit: number
  roi: number
}

export default function ProfitabilityPage() {
  const [products, setProducts] = useState<ProfitabilityData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<keyof ProfitabilityData>('netProfit')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [electricityRate, setElectricityRate] = useState(0.10) // $0.10 per kWh
  const [filterType, setFilterType] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        
        // Handle the new API response format { products: [...] }
        let productsArray: Product[] = []
        if (data.products && Array.isArray(data.products)) {
          productsArray = data.products
        } else if (Array.isArray(data)) {
          // Handle old format for backward compatibility
          productsArray = data
        }
        
        // Calculate profitability metrics
        const profitabilityData = productsArray.map(product => {
          const hashrate = getHashrateByType(product.type)
          const powerConsumption = getPowerConsumptionByType(product.type)
          
          const dailyRevenue = (hashrate * 0.00000001 * 144 * 30) // Simplified calculation
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
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [electricityRate])

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