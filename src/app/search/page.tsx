'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, ArrowLeft, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/lib/cart'
import { toast } from '@/hooks/use-toast'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  type: string
  cooling: string
  images: string
  featured: boolean
  new: boolean
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const { addItem } = useCartStore()

  const searchProducts = async (searchQuery: string) => {
    if (!searchQuery.trim()) return
    
    setLoading(true)
    setSearched(true)
    
    try {
      const response = await fetch(`/api/products?search=${encodeURIComponent(searchQuery)}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || [])
      } else {
        console.error('Search failed')
        setProducts([])
      }
    } catch (error) {
      console.error('Error searching products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialQuery) {
      searchProducts(initialQuery)
    }
  }, [initialQuery])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // Update URL without page reload
      const newUrl = `${window.location.pathname}?q=${encodeURIComponent(query)}`
      window.history.pushState({}, '', newUrl)
      searchProducts(query)
    }
  }

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images ? JSON.parse(product.images)[0] : '/placeholder.jpg',
      quantity: 1
    })
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const parseImages = (imagesString: string) => {
    try {
      return JSON.parse(imagesString)
    } catch {
      return ['/placeholder.jpg']
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back to Shop */}
      <Link href="/shop" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Shop
      </Link>

      {/* Search Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Search Products</h1>
        <p className="text-gray-600 mb-6">Find the perfect crypto miner for your needs</p>
        
        {/* Search Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search products by name, type, or description..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-20 h-12 text-lg"
            />
            <Button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </form>
      </div>

      {/* Search Results */}
      {searched && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {loading ? 'Searching...' : 
             products.length > 0 ? `Found ${products.length} product${products.length !== 1 ? 's' : ''}` : 
             'No products found'}
          </h2>
        </div>
      )}

      {/* Products Grid */}
      {products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={parseImages(product.images)[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  {product.new && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      New
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-sm text-gray-600 mb-4">
                  {product.type} • {product.cooling}
                </CardDescription>
                <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price.toLocaleString()}
                  </span>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No Results */}
      {searched && !loading && products.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">
            Try searching with different keywords or browse our shop.
          </p>
          <Link href="/shop">
            <Button>Browse All Products</Button>
          </Link>
        </div>
      )}
    </div>
  )
}