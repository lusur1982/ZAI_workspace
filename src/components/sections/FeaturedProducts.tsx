'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Star } from 'lucide-react'
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
  featured: boolean
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

export function FeaturedProducts() {
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
        const response = await fetch('/api/products?featured=true')
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
      <section className="section-padding bg-muted/30">
        <div className="container-nordcraft">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our top-selling crypto miners with the best performance and reliability
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="card-nordcraft">
                  <div className="h-64 bg-muted rounded-t-xl mb-4"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-8 bg-muted rounded w-1/3"></div>
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
    <section className="section-padding bg-muted/30">
      <div className="container-nordcraft">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our top-selling crypto miners with the best performance and reliability
          </p>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No featured products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="card-nordcraft group hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <div className="relative h-64 overflow-hidden rounded-t-xl bg-muted">
                    {product.images[0] ? (
                      <ProductImage src={product.images[0]} alt={product.name} />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">No image</span>
                      </div>
                    )}
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button variant="secondary" size="sm" onClick={() => handleAddToCart(product)}>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold line-clamp-2 flex-1 mr-2">{product.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>4.8</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs">{product.type}</Badge>
                    <Badge variant="outline" className="text-xs">{product.cooling}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        ${product.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Free shipping</div>
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
        
        <div className="text-center mt-16">
          <Link href="/shop">
            <Button variant="ghost" className="btn-secondary text-lg px-8 py-3">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}