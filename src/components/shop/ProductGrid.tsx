'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Eye, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types/product'
import { useCartStore } from '@/lib/cart'
import { toast } from '@/hooks/use-toast'

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const { addItem } = useCartStore()

  const handleAddToCart = (product: Product) => {
    addItem(product)
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    })
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative h-64 overflow-hidden">
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.featured && (
                  <Badge className="bg-red-500 hover:bg-red-600">Featured</Badge>
                )}
                {product.new && (
                  <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
                )}
              </div>
              
              {/* Quick Actions */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex flex-col gap-2">
                  <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="mb-3">
              <h3 className="text-lg font-semibold line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                <Link href={`/product/${product.slug}`}>
                  {product.name}
                </Link>
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                {product.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="text-xs">
                {product.type}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {product.cooling}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-500">(4.8)</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-blue-600">
                ${product.price.toLocaleString()}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="p-6 pt-0">
            <div className="flex gap-2 w-full">
              <Button className="flex-1" variant="outline">
                <Link href={`/product/${product.slug}`} className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Details
                </Link>
              </Button>
              <Button className="flex-1" onClick={() => handleAddToCart(product)}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}