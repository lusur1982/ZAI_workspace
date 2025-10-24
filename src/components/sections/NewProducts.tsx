'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Sparkles } from 'lucide-react'
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
  new: boolean
}

interface ProductImageProps {
  src: string
  alt: string
}

function ProductImage({ src, alt }: ProductImageProps) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400">No image</span>
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
    />
  )
}

export function NewProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCartStore()

  const handleAddToCart = (product: Product) => {
    addItem(product)
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    })
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?new=true')
        const data = await response.json()
        
        // Handle the new API response format { products: [...] }
        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products)
        } else if (Array.isArray(data)) {
          // Handle old format for backward compatibility
          setProducts(data)
        } else {
          console.error('API returned unexpected data format:', data)
          setProducts([])
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-nordcraft">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" />
              New Arrivals
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Latest crypto mining hardware with cutting-edge technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="card-nordcraft">
                  <div className="h-48 bg-muted rounded-t-xl mb-4"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-6 bg-muted rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding">
      <div className="container-nordcraft">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-primary" />
            New Arrivals
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Latest crypto mining hardware with cutting-edge technology
          </p>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No new products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="card-nordcraft group hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <div className="relative h-48 overflow-hidden rounded-t-xl bg-muted">
                    {product.images[0] ? (
                      <ProductImage src={product.images[0]} alt={product.name} />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">No image</span>
                      </div>
                    )}
                    <Badge className="absolute top-4 left-4 bg-green-600 text-white">
                      New
                    </Badge>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button variant="secondary" size="sm" onClick={() => handleAddToCart(product)}>
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    <Badge variant="secondary" className="text-xs">{product.type}</Badge>
                    <Badge variant="outline" className="text-xs">{product.cooling}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-foreground">
                      ${product.price.toLocaleString()}
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/product/${product.slug}`}>
                        <Button variant="ghost" size="sm" className="hover:bg-accent">
                          View
                        </Button>
                      </Link>
                      <Button size="sm" onClick={() => handleAddToCart(product)} className="btn-primary">
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}