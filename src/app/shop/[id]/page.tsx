'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, ArrowLeft, Zap, Shield, TrendingUp, Package, Truck } from 'lucide-react';

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
    }
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
    }
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
    }
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
      power: "3420W",
      efficiency: "21.2 J/TH",
      algorithm: "SHA-256",
      temperature: "-20°C to 45°C",
      humidity: "5% - 95%",
      dimensions: "440 x 220 x 290mm",
      weight: "14.2kg"
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  }
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  
  const productId = parseInt(params.id as string);
  const product = staticProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produkt nebol nájdený</h1>
          <Button onClick={() => router.push('/shop')}>
            Späť do obchodu
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    console.log('Added to cart:', product.name, 'Quantity:', quantity);
    alert(`${product.name} (${quantity} ks) bol pridaný do košíka`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push('/shop')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Späť do obchodu
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-lg flex items-center justify-center">
                  <Package className="w-32 h-32 text-slate-400" />
                </div>
              </CardContent>
            </Card>

            {/* Product Badges */}
            <div className="flex flex-wrap gap-2">
              {product.featured && (
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500">
                  TOP
                </Badge>
              )}
              {product.new && (
                <Badge className="bg-green-500">
                  NOVINKA
                </Badge>
              )}
              {product.stock <= 10 && (
                <Badge variant="destructive">
                  Posledné {product.stock} ks
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
                {product.brand} {product.model}
              </p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                  <span className="ml-2 text-sm text-slate-600">
                    {product.rating} ({product.reviews} hodnotení)
                  </span>
                </div>
              </div>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl font-bold text-green-600">€{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-xl text-slate-400 line-through">
                      €{product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice > product.price && (
                    <Badge className="bg-red-500">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </Badge>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-medium">Množstvo:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </Button>
                  </div>
                  <span className="text-sm text-slate-600">
                    Na sklade: {product.stock} ks
                  </span>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  className="w-full"
                  size="lg"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Pridať do košíka
                </Button>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Zap className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">{product.hashRate}</div>
                  <div className="text-sm text-slate-600">
                    {product.algorithm === "Ethereum Classic" ? "MH/s" : 
                     product.algorithm === "Scrypt" ? "MH/s" : "TH/s"}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">€{product.profitability}</div>
                  <div className="text-sm text-slate-600"> mesačne</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                  <div className="text-2xl font-bold">{product.roi}%</div>
                  <div className="text-sm text-slate-600"> ROI</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Package className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                  <div className="text-2xl font-bold">{product.efficiency}</div>
                  <div className="text-sm text-slate-600">
                    {product.algorithm === "Ethereum Classic" ? "J/MH" : "J/TH"}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Detailed Specifications */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Technické špecifikácie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Hashrate:</span>
                  <span>{product.specs.hashrate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Spotreba:</span>
                  <span>{product.specs.power}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Efektivita:</span>
                  <span>{product.specs.efficiency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Algoritmus:</span>
                  <span>{product.specs.algorithm}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Teplotný rozsah:</span>
                  <span>{product.specs.temperature}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Vlhkosť:</span>
                  <span>{product.specs.humidity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Rozmery:</span>
                  <span>{product.specs.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Hmotnosť:</span>
                  <span>{product.specs.weight}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Truck className="w-8 h-8 mx-auto mb-3 text-blue-500" />
              <h3 className="font-semibold mb-2">Doprava zadarmo</h3>
              <p className="text-sm text-slate-600">
                Pri objednávke nad €500
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="w-8 h-8 mx-auto mb-3 text-green-500" />
              <h3 className="font-semibold mb-2">Záruka 24 mesiacov</h3>
              <p className="text-sm text-slate-600">
                Plná záruka a servis
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="w-8 h-8 mx-auto mb-3 text-purple-500" />
              <h3 className="font-semibold mb-2">Certifikovaný predajca</h3>
              <p className="text-sm text-slate-600">
                Oficiálny distribútor
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}