'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Star, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  description: string
  type: string
  cooling: string
  images: string[]
  featured?: boolean
  new?: boolean
}

interface ProductImageProps {
  src: string
  alt: string
}

function ProductImage({ src, alt }: ProductImageProps) {
  const [imageError, setImageError] = useState(false)

  // Check if src is valid and not empty
  const isValidSrc = src && src.trim() !== '' && (src.startsWith('/') || src.startsWith('http'))

  if (imageError || !isValidSrc) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <div className="text-center p-4">
          <div className="text-gray-400 text-sm">Product Image</div>
          <div className="text-gray-300 text-xs mt-1">Not available</div>
        </div>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-300"
      onError={() => setImageError(true)}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}

function FeaturedProductCard({ product }: { product: Product }) {
  const handleAddToCart = () => {
    // Mock add to cart
    console.log('Added to cart:', product.name)
    alert(`${product.name} has been added to your cart.`)
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative h-64 overflow-hidden rounded-t-lg">
          <ProductImage src={product.images[0]} alt={product.name} />
          <Badge className="absolute top-4 left-4 bg-red-500">
            Featured
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-2 line-clamp-2">{product.name}</CardTitle>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">{product.type}</Badge>
          <Badge variant="outline">{product.cooling}</Badge>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-sm text-gray-500">(4.8)</span>
        </div>
        <div className="text-2xl font-bold text-blue-600">
          ${product.price.toLocaleString()}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="flex gap-2 w-full">
          <Button className="flex-1">
            <Link href={`/product/${product.slug}`} className="flex items-center gap-2">
              View Details
            </Link>
          </Button>
          <Button variant="outline" size="icon" onClick={handleAddToCart}>
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

function NewProductCard({ product }: { product: Product }) {
  const handleAddToCart = () => {
    // Mock add to cart
    console.log('Added to cart:', product.name)
    alert(`${product.name} has been added to your cart.`)
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <ProductImage src={product.images[0]} alt={product.name} />
          <Badge className="absolute top-4 left-4 bg-green-500">
            New
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2 line-clamp-2">{product.name}</CardTitle>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          <Badge variant="secondary" className="text-xs">{product.type}</Badge>
          <Badge variant="outline" className="text-xs">{product.cooling}</Badge>
        </div>
        <div className="text-xl font-bold text-blue-600">
          ${product.price.toLocaleString()}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button className="flex-1 text-sm">
            <Link href={`/product/${product.slug}`}>
              View
            </Link>
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleAddToCart}>
            <ShoppingCart className="w-3 h-3" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

type PageVariant = 'ultra' | 'hybrid' | 'standard'

// Static data for ultra-fast variant
const staticData = {
  featured: [
    {
      id: "1",
      name: "Bitmain Antminer S19 Pro",
      slug: "antminer-s19-pro",
      price: 2499,
      description: "The most powerful Bitcoin miner with 110 TH/s hashrate and exceptional efficiency.",
      type: "ASIC",
      cooling: "Air Cooling",
      images: [],
      featured: true,
      new: false
    },
    {
      id: "2", 
      name: "MicroBT WhatsMiner M30S++",
      slug: "whatsminer-m30s-plus",
      price: 2299,
      description: "High-performance Bitcoin mining rig with 112 TH/s hashrate and advanced cooling.",
      type: "ASIC",
      cooling: "Air Cooling", 
      images: [],
      featured: true,
      new: false
    },
    {
      id: "3",
      name: "Canaan AvalonMiner 1246",
      slug: "avalonminer-1246", 
      price: 1899,
      description: "Reliable and efficient Bitcoin miner with 90 TH/s hashrate for professional mining.",
      type: "ASIC",
      cooling: "Air Cooling",
      images: [],
      featured: true,
      new: false
    }
  ],
  new: [
    {
      id: "4",
      name: "Bitmain Antminer S19 XP",
      slug: "antminer-s19-xp",
      price: 3299,
      description: "Next-generation Bitcoin miner with 140 TH/s hashrate and improved efficiency.",
      type: "ASIC",
      cooling: "Air Cooling",
      images: [],
      featured: false,
      new: true
    },
    {
      id: "5",
      name: "MicroBT WhatsMiner M50S",
      slug: "whatsminer-m50s",
      price: 2999,
      description: "Latest generation miner with 126 TH/s hashrate and optimized power consumption.",
      type: "ASIC", 
      cooling: "Air Cooling",
      images: [],
      featured: false,
      new: true
    },
    {
      id: "6",
      name: "Jasminer X4-1U",
      slug: "jasminer-x4-1u",
      price: 1599,
      description: "Compact and efficient Ethereum miner with high hashrate and low power consumption.",
      type: "ASIC",
      cooling: "Air Cooling",
      images: [],
      featured: false,
      new: true
    },
    {
      id: "7",
      name: "Goldshell KD6",
      slug: "goldshell-kd6",
      price: 899,
      description: "Compact Kadena miner with excellent performance and quiet operation.",
      type: "ASIC",
      cooling: "Air Cooling", 
      images: [],
      featured: false,
      new: true
    }
  ]
}

export function OptimizedHomeProducts({ variant = 'hybrid' }: { variant?: PageVariant }) {
  const [data, setData] = useState<{ featured: Product[], new: Product[] } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Ultra variant: use static data immediately
    if (variant === 'ultra') {
      setData(staticData)
      setLoading(false)
      return
    }

    // Hybrid and Standard variants: fetch from API
    const fetchHomeData = async () => {
      try {
        const endpoint = variant === 'hybrid' ? '/api/homepage-hybrid' : '/api/homepage'
        const response = await fetch(endpoint)
        const homeData = await response.json()
        setData(homeData)
      } catch (error) {
        console.error('Failed to fetch home data:', error)
        // Fallback to static data on error
        setData(staticData)
      } finally {
        setLoading(false)
      }
    }

    fetchHomeData()
  }, [variant])

  if (loading) {
    return (
      <div className="space-y-16">
        {/* Featured Products Skeleton */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* New Products Skeleton */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">New Arrivals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="space-y-16">
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-500">Failed to load products.</p>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="space-y-16">
      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our top-selling crypto miners with the best performance and reliability
            </p>
          </div>
          
          {data.featured.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No featured products available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.featured.map((product) => (
                <FeaturedProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              <Link href="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-yellow-500" />
              New Arrivals
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Latest crypto mining hardware with cutting-edge technology
            </p>
          </div>
          
          {data.new.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No new products available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.new.map((product) => (
                <NewProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}