import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Shield, TrendingUp, ShoppingCart, Star, Sparkles } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Static data - completely hardcoded
const featuredProducts = [
  {
    id: "1",
    name: "Antminer S19 Pro",
    slug: "antminer-s19-pro",
    price: 2999,
    description: "Most efficient Bitcoin miner with 110 TH/s hash rate",
    type: "ASIC",
    cooling: "Air Cooling",
  },
  {
    id: "2", 
    name: "Whatsminer M30S++",
    slug: "whatsminer-m30s-plus-plus",
    price: 3299,
    description: "High-performance miner with 112 TH/s hash rate",
    type: "ASIC",
    cooling: "Air Cooling", 
  },
  {
    id: "3",
    name: "AvalonMiner 1246",
    slug: "avalonminer-1246", 
    price: 2799,
    description: "Reliable miner with 90 TH/s hash rate",
    type: "ASIC",
    cooling: "Air Cooling",
  }
]

const newProducts = [
  {
    id: "4",
    name: "Antminer S19 XP",
    slug: "antminer-s19-xp",
    price: 4999,
    description: "Latest generation with 140 TH/s hash rate",
    type: "ASIC",
    cooling: "Liquid Cooling",
  },
  {
    id: "5",
    name: "Whatsminer M50",
    slug: "whatsminer-m50",
    price: 4599,
    description: "Next-gen miner with 126 TH/s hash rate",
    type: "ASIC", 
    cooling: "Liquid Cooling",
  },
  {
    id: "6",
    name: "Goldshell KD5",
    slug: "goldshell-kd5",
    price: 899,
    description: "Compact Kadena miner with 18.7 TH/s",
    type: "ASIC",
    cooling: "Fan Cooling",
  },
  {
    id: "7",
    name: "iPollo V1 Mini",
    slug: "ipollo-v1-mini",
    price: 599,
    description: "Efficient Ethereum miner with 285 MH/s",
    type: "GPU",
    cooling: "Fan Cooling", 
  }
]

export default function UltraFastHome() {
  return (
    <div className="min-h-screen">
      {/* Simple Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CM</span>
              </div>
              <span className="font-bold text-xl">CM Crypto Miners</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-blue-600">Home</Link>
              <Link href="/shop" className="text-sm font-medium hover:text-blue-600">Shop</Link>
              <Link href="/about" className="text-sm font-medium hover:text-blue-600">About</Link>
              <Link href="/contact" className="text-sm font-medium hover:text-blue-600">Contact</Link>
            </nav>
            
            <div className="flex items-center space-x-2">
              <Link href="/shop">
                <Button variant="outline" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Shop
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#60efff] to-[#0061ff] text-gray-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              CM Crypto Miners
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-800">
              Premium cryptocurrency mining hardware for maximum profitability
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                <Link href="/shop" className="flex items-center gap-2">
                  Shop Now <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg">
                <Link href="/shop">
                  View Products
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">High Performance</h3>
                <p className="text-gray-700">Latest generation mining hardware with optimal hash rates</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Warranty Protected</h3>
                <p className="text-gray-700">Full manufacturer warranty and technical support</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Profit Focused</h3>
                <p className="text-gray-700">Optimized for maximum mining profitability</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative h-64 overflow-hidden rounded-t-lg bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Product Image</span>
                    <Badge className="absolute top-4 left-4 bg-red-500">
                      Featured
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
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
                    <Button variant="outline" size="icon">
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
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
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative h-48 overflow-hidden rounded-t-lg bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Product Image</span>
                    <Badge className="absolute top-4 left-4 bg-green-500">
                      New
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
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
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ShoppingCart className="w-3 h-3" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose CM?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best crypto mining solutions with unmatched service and support
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality Guaranteed',
                description: 'All our miners are tested and certified for optimal performance and reliability.'
              },
              {
                title: 'Expert Support',
                description: '24/7 technical support from mining experts to help you maximize your profits.'
              },
              {
                title: 'Fast Shipping',
                description: 'Quick and secure delivery worldwide with full insurance coverage.'
              },
              {
                title: 'Warranty Protection',
                description: 'Comprehensive warranty on all products with hassle-free returns.'
              },
              {
                title: 'Best Prices',
                description: 'Competitive pricing with price match guarantee on all mining hardware.'
              },
              {
                title: 'Trusted by Thousands',
                description: 'Join thousands of satisfied customers who trust CM for their mining needs.'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CM</span>
                </div>
                <span className="font-bold text-xl">CM Crypto Miners</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for cryptocurrency mining hardware.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/shop" className="text-gray-400 hover:text-white">Shop</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Products</h3>
              <ul className="space-y-2">
                <li><Link href="/shop?category=asic" className="text-gray-400 hover:text-white">ASIC Miners</Link></li>
                <li><Link href="/shop?category=gpu" className="text-gray-400 hover:text-white">GPU Miners</Link></li>
                <li><Link href="/shop?category=accessories" className="text-gray-400 hover:text-white">Accessories</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                <li><Link href="/warranty" className="text-gray-400 hover:text-white">Warranty</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 CM Crypto Miners. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}