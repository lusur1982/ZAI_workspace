'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Star, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/lib/cart'
import { toast } from '@/hooks/use-toast'

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

interface StaticProductsShowcaseProps {
  featuredProducts: Product[]
  newProducts: Product[]
}

function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
      <span className="text-gray-400">Product Image</span>
    </div>
  )
}

function FeaturedProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    addItem(product)
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    })
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
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    addItem(product)
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    })
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

export function StaticProductsShowcase({ featuredProducts, newProducts }: StaticProductsShowcaseProps) {
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <FeaturedProductCard key={product.id} product={product} />
            ))}
          </div>
          
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <NewProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}