'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import { useCartStore } from '@/lib/cart'
import { useNotificationStore } from '@/lib/notifications'

// Static product data - same as in shop page
const staticProducts = [
  {
    id: 1,
    name: "Antminer S21 Pro",
    brand: "Bitmain",
    model: "S21 Pro",
    price: 5999,
    originalPrice: 6999,
    hashRate: 234,
    powerConsumption: 3500,
    efficiency: 15.0,
    algorithm: "SHA-256",
    profitability: 825.50,
    roi: 11.8,
    rating: 4.8,
    reviews: 1247,
    stock: 15,
    featured: true,
    new: true,
    description: "Najvýkonnejší SHA-256 miner na trhu s vynikajúcou efektivitou",
    images: ["/images/antminer-s21-pro.jpg"],
    specs: {
      hashrate: "234 TH/s",
      power: "3500W",
      efficiency: "15.0 J/TH",
      algorithm: "SHA-256",
      temperature: "-20°C to 45°C",
      humidity: "5% - 95%",
      dimensions: "430 x 195.5 x 290mm",
      weight: "16.5kg"
    },
    type: "ASIC",
    cooling: "Air Cooling",
    slug: "antminer-s21-pro"
  },
  {
    id: 2,
    name: "WhatsMiner M60S",
    brand: "MicroBT",
    model: "M60S",
    price: 4499,
    originalPrice: 5299,
    hashRate: 186,
    powerConsumption: 3420,
    efficiency: 18.4,
    algorithm: "SHA-256",
    profitability: 658.30,
    roi: 9.2,
    rating: 4.6,
    reviews: 892,
    stock: 23,
    featured: true,
    new: false,
    description: "Spoľahlivý miner s vynikajúcim pomerom výkon/cena",
    images: ["/images/whatsminer-m60s.jpg"],
    specs: {
      hashrate: "186 TH/s",
      power: "3420W",
      efficiency: "18.4 J/TH",
      algorithm: "SHA-256",
      temperature: "-20°C to 45°C",
      humidity: "5% - 95%",
      dimensions: "430 x 195 x 290mm",
      weight: "15.5kg"
    },
    type: "ASIC",
    cooling: "Air Cooling",
    slug: "whatsminer-m60s"
  },
  {
    id: 3,
    name: "Avalon A1366",
    brand: "Canaan",
    model: "A1366",
    price: 3299,
    originalPrice: 3899,
    hashRate: 130,
    powerConsumption: 2600,
    efficiency: 20.0,
    algorithm: "SHA-256",
    profitability: 460.20,
    roi: 8.1,
    rating: 4.5,
    reviews: 623,
    stock: 8,
    featured: false,
    new: false,
    description: "Ekonomický miner s nízkou spotrebou",
    images: ["/images/avalon-a1366.jpg"],
    specs: {
      hashrate: "130 TH/s",
      power: "2600W",
      efficiency: "20.0 J/TH",
      algorithm: "SHA-256",
      temperature: "-20°C to 45°C",
      humidity: "5% - 95%",
      dimensions: "370 x 135 x 208mm",
      weight: "12.8kg"
    },
    type: "ASIC",
    cooling: "Air Cooling",
    slug: "avalon-a1366"
  },
  {
    id: 4,
    name: "Innosilicon T3H+",
    brand: "Innosilicon",
    model: "T3H+",
    price: 2899,
    originalPrice: 3499,
    hashRate: 113,
    powerConsumption: 2400,
    efficiency: 21.2,
    algorithm: "SHA-256",
    profitability: 400.15,
    roi: 7.8,
    rating: 4.4,
    reviews: 445,
    stock: 31,
    featured: false,
    new: false,
    description: "Tichý a efektívny miner pre domáce použitie",
    images: ["/images/innosilicon-t3h-plus.jpg"],
    specs: {
      hashrate: "113 TH/s",
      power: "2400W",
      efficiency: "21.2 J/TH",
      algorithm: "SHA-256",
      temperature: "-20°C to 45°C",
      humidity: "5% - 95%",
      dimensions: "440 x 220 x 290mm",
      weight: "14.2kg"
    },
    type: "ASIC",
    cooling: "Air Cooling",
    slug: "innosilicon-t3h-plus"
  },
  {
    id: 5,
    name: "Antminer S19 XP",
    brand: "Bitmain",
    model: "S19 XP",
    price: 3899,
    originalPrice: 4499,
    hashRate: 141,
    powerConsumption: 3010,
    efficiency: 21.3,
    algorithm: "SHA-256",
    profitability: 500.80,
    roi: 8.9,
    rating: 4.7,
    reviews: 1567,
    stock: 12,
    featured: true,
    new: false,
    description: "Overený model s vynikajúcou spoľahlivosťou",
    images: ["/images/antminer-s19-xp.jpg"],
    specs: {
      hashrate: "141 TH/s",
      power: "3010W",
      efficiency: "21.3 J/TH",
      algorithm: "SHA-256",
      temperature: "-20°C to 45°C",
      humidity: "5% - 95%",
      dimensions: "370 x 195 x 290mm",
      weight: "14.5kg"
    },
    type: "ASIC",
    cooling: "Air Cooling",
    slug: "antminer-s19-xp"
  },
  {
    id: 6,
    name: "Goldshell KD6",
    brand: "Goldshell",
    model: "KD6",
    price: 1599,
    originalPrice: 1899,
    hashRate: 29.2,
    powerConsumption: 830,
    efficiency: 28.4,
    algorithm: "Kadena",
    profitability: 220.45,
    roi: 6.8,
    rating: 4.3,
    reviews: 234,
    stock: 45,
    featured: false,
    new: true,
    description: "Kompaktný Kadena miner s nízkou spotrebou",
    images: ["/images/goldshell-kd6.jpg"],
    specs: {
      hashrate: "29.2 TH/s",
      power: "830W",
      efficiency: "28.4 J/TH",
      algorithm: "Kadena",
      temperature: "-20°C to 45°C",
      humidity: "5% - 95%",
      dimensions: "264 x 200 x 290mm",
      weight: "8.5kg"
    },
    type: "ASIC",
    cooling: "Air Cooling",
    slug: "goldshell-kd6"
  },
  {
    id: 7,
    name: "Jasminer X4",
    brand: "Jasminer",
    model: "X4",
    price: 2199,
    originalPrice: 2599,
    hashRate: 520,
    powerConsumption: 480,
    efficiency: 0.92,
    algorithm: "Ethereum Classic",
    profitability: 180.30,
    roi: 5.9,
    rating: 4.2,
    reviews: 156,
    stock: 19,
    featured: false,
    new: true,
    description: "Ultra-efektívny ETCHash miner s minimálnou spotrebou",
    images: ["/images/jasminer-x4.jpg"],
    specs: {
      hashrate: "520 MH/s",
      power: "480W",
      efficiency: "0.92 J/MH",
      algorithm: "ETCHash",
      temperature: "-20°C to 45°C",
      humidity: "5% - 95%",
      dimensions: "360 x 136 x 282mm",
      weight: "7.2kg"
    },
    type: "ASIC",
    cooling: "Air Cooling",
    slug: "jasminer-x4"
  },
  {
    id: 8,
    name: "Antminer L7",
    brand: "Bitmain",
    model: "L7",
    price: 8999,
    originalPrice: 9999,
    hashRate: 9500,
    powerConsumption: 3425,
    efficiency: 0.36,
    algorithm: "Scrypt",
    profitability: 1120.60,
    roi: 10.2,
    rating: 4.9,
    reviews: 892,
    stock: 6,
    featured: true,
    new: false,
    description: "Najvýkonnejší Scrypt miner na trhu",
    images: ["/images/antminer-l7.jpg"],
    specs: {
      hashrate: "9500 MH/s",
      power: "3425W",
      efficiency: "0.36 J/MH",
      algorithm: "Scrypt",
      temperature: "-20°C to 45°C",
      humidity: "5% - 95%",
      dimensions: "370 x 195 x 290mm",
      weight: "15.0kg"
    },
    type: "ASIC",
    cooling: "Air Cooling",
    slug: "antminer-l7"
  },
  {
    id: 9,
    name: "iBeLink BM-K1",
    brand: "iBeLink",
    model: "BM-K1",
    price: 1299,
    originalPrice: 1599,
    hashRate: 5.6,
    powerConsumption: 2250,
    efficiency: 401.8,
    algorithm: "Kadena",
    profitability: 142.80,
    roi: 7.2,
    rating: 4.1,
    reviews: 98,
    stock: 27,
    featured: false,
    new: false,
    description: "Prístupný Kadena miner pre začiatočníkov",
    images: ["/images/ibelink-bm-k1.jpg"],
    specs: {
      hashrate: "5.6 TH/s",
      power: "2250W",
      efficiency: "401.8 J/TH",
      algorithm: "Kadena",
      temperature: "-20°C to 45°C",
      humidity: "5% - 95%",
      dimensions: "440 x 220 x 290mm",
      weight: "13.8kg"
    },
    type: "ASIC",
    cooling: "Air Cooling",
    slug: "ibelink-bm-k1"
  }
]

export function ProductDetail() {
  const params = useParams()
  const slug = params.slug as string
  
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCartStore()
  const { addNotification } = useNotificationStore()

  useEffect(() => {
    // Find product in static data
    const foundProduct = staticProducts.find(p => p.slug === slug)
    setProduct(foundProduct || null)
    setLoading(false)
    
    // Log for debugging
    if (!foundProduct) {
      console.log('Product not found for slug:', slug)
      console.log('Available slugs:', staticProducts.map(p => p.slug))
    }
  }, [slug])

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        slug: product.slug,
        hashRate: product.hashRate,
        powerConsumption: product.powerConsumption,
        efficiency: product.efficiency
      }, quantity)
      addNotification({
        type: 'success',
        title: 'Pridané do košíka',
        message: `${quantity}x ${product.name} bol pridaný do košíka.`
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
          <h1 className="text-2xl font-bold mb-4">Produkt nebol nájdený</h1>
          <p className="text-gray-600 mb-6">Produkt so slugom "{slug}" neexistuje.</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Dostupné produkty:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {staticProducts.map((p) => (
                <Link 
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h4 className="font-medium">{p.name}</h4>
                  <p className="text-sm text-gray-600">€{p.price.toLocaleString()}</p>
                  <p className="text-xs text-blue-600 mt-1">/product/{p.slug}</p>
                </Link>
              ))}
            </div>
          </div>
          
          <Button asChild>
            <Link href="/shop">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Späť do obchodu
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
        <Link href="/" className="hover:text-blue-600">Domov</Link>
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
                <span className="text-gray-400">Žiadny obrázok k dispozícii</span>
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.featured && (
                <Badge className="bg-red-500 hover:bg-red-600">TOP</Badge>
              )}
              {product.new && (
                <Badge className="bg-green-500 hover:bg-green-600">NOVINKA</Badge>
              )}
            </div>
          </div>
          
          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image: string, index: number) => (
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
            <span className="text-sm text-gray-500">({product.rating} z 5)</span>
            <span className="text-sm text-gray-400">|</span>
            <span className="text-sm text-gray-500">{product.reviews} hodnotení</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-blue-600">
              €{product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xl text-gray-400 line-through">
                €{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Product Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{product.type}</Badge>
            <Badge variant="outline">{product.cooling}</Badge>
            <Badge variant="outline">{product.algorithm}</Badge>
          </div>

          {/* Mining Specs */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Ťažobné špecifikácie</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Hashrate:</span>
                <span className="font-medium ml-2">
                  {product.hashRate} {product.algorithm === 'Ethereum Classic' ? 'MH/s' : 'TH/s'}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Spotreba:</span>
                <span className="font-medium ml-2">{product.powerConsumption}W</span>
              </div>
              <div>
                <span className="text-gray-600">Efektivita:</span>
                <span className="font-medium ml-2">
                  {product.efficiency} {product.algorithm === 'Ethereum Classic' ? 'J/MH' : 'J/TH'}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Zisk/mesiac:</span>
                <span className="font-medium ml-2 text-green-600">€{product.profitability}</span>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="font-medium">Množstvo:</span>
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
            {product.stock <= 10 && (
              <Badge variant="destructive">
                Posledné {product.stock} ks
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              size="lg" 
              className="flex-1"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {product.stock === 0 ? 'Vypredané' : 'Do košíka'}
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/checkout">
                Rýchlo pokračovať
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Product Details Sections */}
      <div className="space-y-8">
        {/* Description */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Popis produktu</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </CardContent>
        </Card>

        {/* Specifications */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Technické špecifikácie</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b">
                  <span className="text-gray-600 capitalize">
                    {key === 'hashrate' ? 'Hashrate' :
                     key === 'power' ? 'Spotreba' :
                     key === 'efficiency' ? 'Efektivita' :
                     key === 'algorithm' ? 'Algoritmus' :
                     key === 'temperature' ? 'Teplota' :
                     key === 'humidity' ? 'Vlhkosť' :
                     key === 'dimensions' ? 'Rozmery' :
                     key === 'weight' ? 'Hmotnosť' : key}
                  </span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Shipping & Warranty */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Doprava a záruka</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Truck className="w-8 h-8 text-blue-500" />
                <div>
                  <h4 className="font-medium">Rýchla doprava</h4>
                  <p className="text-sm text-gray-600">Dodanie do 2-3 pracovných dní</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-500" />
                <div>
                  <h4 className="font-medium">24 mesačná záruka</h4>
                  <p className="text-sm text-gray-600">Plná záruka a podpora</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-yellow-500" />
                <div>
                  <h4 className="font-medium">Technická podpora</h4>
                  <p className="text-sm text-gray-600">Poradenstvo a pomoc s inštaláciou</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Zákaznícke recenzie</h3>
                <Button>Napísať recenziu</Button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{product.rating}</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">{product.reviews} hodnotení</div>
                </div>
                
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-2 mb-1">
                      <span className="text-sm w-3">{rating}</span>
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full" 
                          style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : 5}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500 w-8">
                        {rating === 5 ? '70%' : rating === 4 ? '20%' : '5%'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-500 text-center py-8">
                Zatiaľ žiadne recenzie. Buďte prvý, kto ohodnotí tento produkt!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}