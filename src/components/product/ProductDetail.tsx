'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ShoppingCart, 
  Star, 
  Truck, 
  Shield, 
  Zap,
  ArrowLeft,
  Plus,
  Minus
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types/product'
import { useCartStore } from '@/lib/cart'
import { toast } from '@/hooks/use-toast'

export function ProductDetail() {
  const params = useParams()
  const slug = params.slug as string
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCartStore()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${slug}`)
        if (response.ok) {
          const data = await response.json()
          // Ensure images is always an array
          const normalizedProduct = {
            ...data,
            images: Array.isArray(data.images) ? data.images : []
          }
          setProduct(normalizedProduct)
        }
      } catch (error) {
        console.error('Failed to fetch product:', error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchProduct()
    }
  }, [slug])

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product)
      }
      toast({
        title: "Added to cart!",
        description: `${quantity}x ${product.name} has been added to your cart.`,
      })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-12 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/shop">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-blue-600">Shop</Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-lg bg-gray-100">
            {product.images && product.images[selectedImage] ? (
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
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
          </div>
          
          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded border-2 overflow-hidden flex-shrink-0 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 text-lg">{product.description}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-500">(4.8 out of 5)</span>
            <span className="text-sm text-gray-400">|</span>
            <span className="text-sm text-gray-500">0 reviews</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-blue-600">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xl text-gray-400 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Product Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{product.type}</Badge>
            <Badge variant="outline">{product.cooling}</Badge>
            <Badge variant="outline">SHA-256</Badge>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-10 w-10 rounded-none"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <div className="w-12 text-center font-medium">{quantity}</div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="h-10 w-10 rounded-none"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              size="lg" 
              className="flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/checkout">
                Buy Now
              </Link>
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>2 Year Warranty</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>In Stock</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="specifications" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Performance</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hash Rate:</span>
                      <span className="font-medium">110 TH/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Power Consumption:</span>
                      <span className="font-medium">3250W</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Efficiency:</span>
                      <span className="font-medium">29.5 J/TH</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Physical</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dimensions:</span>
                      <span className="font-medium">195 x 290 x 370mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight:</span>
                      <span className="font-medium">12.8kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cooling:</span>
                      <span className="font-medium">{product.cooling}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="prose max-w-none">
                <p>{product.description}</p>
                <p className="mt-4">
                  This high-performance cryptocurrency miner is designed for maximum efficiency 
                  and profitability. With its advanced cooling system and optimized power consumption, 
                  it provides excellent hash rates while maintaining stable operation.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <Button>Write a Review</Button>
                </div>
                
                <p className="text-gray-500 text-center py-8">
                  No reviews yet. Be the first to review this product!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}