import { getCachedProducts, getCachedFeaturedProducts, getCachedNewProducts } from '@/lib/queries'
import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Truck, Shield, Headphones, Zap } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

// Loading component with better performance
function ProductCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <div className="h-48 bg-gray-200 rounded-t-lg"></div>
      <CardContent className="p-4">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </CardContent>
    </Card>
  )
}

// Optimized loading grid
function ProductsLoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Async component for products with error boundary
async function FeaturedProducts() {
  try {
    const products = await getCachedFeaturedProducts()
    
    if (products.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-600">No featured products available.</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )
  } catch (error) {
    console.error('Error loading featured products:', error)
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Unable to load featured products. Please try again later.</p>
      </div>
    )
  }
}

// Async component for new products with error boundary
async function NewProducts() {
  try {
    const products = await getCachedNewProducts()
    
    if (products.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-600">No new products available.</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )
  } catch (error) {
    console.error('Error loading new products:', error)
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Unable to load new products. Please try again later.</p>
      </div>
    )
  }
}

// Optimized hero section with better performance
function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Premium Cryptocurrency Mining Hardware
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Shop the best ASIC miners and GPU rigs at competitive prices. 
            Expert support and fast shipping worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button size="lg" className="w-full sm:w-auto">
                Shop Now
              </Button>
            </Link>
            <Link href="/profitability">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Calculate Profitability
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// Optimized features section
function FeaturesSection() {
  const features = [
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Express delivery worldwide"
    },
    {
      icon: Shield,
      title: "Warranty Protection",
      description: "12-month manufacturer warranty"
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "24/7 technical assistance"
    },
    {
      icon: Zap,
      title: "Best Prices",
      description: "Competitive pricing guaranteed"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      
      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600">Our most popular mining hardware</p>
          </div>
          <Suspense fallback={<ProductsLoadingGrid />}>
            <FeaturedProducts />
          </Suspense>
          <div className="text-center mt-8">
            <Link href="/shop">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">New Arrivals</h2>
            <p className="text-lg text-gray-600">Latest mining hardware in stock</p>
          </div>
          <Suspense fallback={<ProductsLoadingGrid />}>
            <NewProducts />
          </Suspense>
          <div className="text-center mt-8">
            <Link href="/shop?filter=new">
              <Button variant="outline">View All New Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Mining?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of successful miners using our hardware
          </p>
          <Link href="/shop">
            <Button size="lg" variant="secondary">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}