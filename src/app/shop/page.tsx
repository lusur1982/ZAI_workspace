'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Star, ShoppingCart, Zap, Shield, TrendingUp, Package } from 'lucide-react';

// Complete static product data - no API calls
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
      power: "2400W",
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

export default function ShopPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('featured');

  // Mock cart functions
  const handleAddToCart = (product: any) => {
    console.log('Added to cart:', product.name);
    alert(`${product.name} bol pridaný do košíka`);
  };

  const handleProductClick = (productId: number) => {
    router.push(`/shop/${productId}`);
  };

  // Static filtering - no API calls
  const filteredProducts = useMemo(() => {
    let filtered = staticProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
      const matchesAlgorithm = selectedAlgorithm === 'all' || product.algorithm === selectedAlgorithm;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesBrand && matchesAlgorithm && matchesPrice;
    });

    // Static sorting - no API calls
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'hashrate':
        filtered.sort((a, b) => b.hashRate - a.hashRate);
        break;
      case 'efficiency':
        filtered.sort((a, b) => a.efficiency - b.efficiency);
        break;
      case 'profitability':
        filtered.sort((a, b) => b.profitability - a.profitability);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.profitability - a.profitability;
        });
        break;
    }

    return filtered;
  }, [searchTerm, selectedBrand, selectedAlgorithm, priceRange, sortBy]);

  const brands = ['all', ...Array.from(new Set(staticProducts.map(p => p.brand)))];
  const algorithms = ['all', ...Array.from(new Set(staticProducts.map(p => p.algorithm)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Obchod s Ťažobnými Zariadeniami
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Najširšia ponuka ťažobných zariadení na slovenskom trhu. Tisíce spokojných zákazníkov.
          </p>
        </div>

        {/* Performance Indicator */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-300">
            <Zap className="w-5 h-5" />
            <span className="font-semibold">Ultra-Rýchly Režim</span>
            <span className="text-sm">• Načítanie: &lt;0.1s • Žiadne API volania</span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Hľadať</label>
              <Input
                placeholder="Hľadať produkt..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Značka</label>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand}>
                      {brand === 'all' ? 'Všetky značky' : brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Algoritmus</label>
              <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {algorithms.map(algorithm => (
                    <SelectItem key={algorithm} value={algorithm}>
                      {algorithm === 'all' ? 'Všetky algoritmy' : algorithm}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Cena: €{priceRange[0]} - €{priceRange[1]}
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={10000}
                step={100}
                className="mt-4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Zoradiť podľa</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Odporúčané</SelectItem>
                  <SelectItem value="price-low">Cena: najnižšia</SelectItem>
                  <SelectItem value="price-high">Cena: najvyššia</SelectItem>
                  <SelectItem value="hashrate">Hashrate</SelectItem>
                  <SelectItem value="efficiency">Efektivita</SelectItem>
                  <SelectItem value="profitability">Ziskovosť</SelectItem>
                  <SelectItem value="rating">Hodnotenie</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-slate-600 dark:text-slate-300">
            Nájdených <span className="font-semibold">{filteredProducts.length}</span> produktov
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                    <Package className="w-16 h-16 text-slate-400" />
                  </div>
                  {product.featured && (
                    <Badge className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-purple-500">
                      TOP
                    </Badge>
                  )}
                  {product.new && (
                    <Badge className="absolute top-2 right-2 bg-green-500">
                      NOVINKA
                    </Badge>
                  )}
                  {product.stock <= 10 && (
                    <Badge variant="destructive" className="absolute bottom-2 left-2">
                      Posledné {product.stock} ks
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="mb-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 
                        className="font-semibold text-lg group-hover:text-blue-600 transition-colors cursor-pointer hover:underline"
                        onClick={() => handleProductClick(product.id)}
                      >
                        {product.name}
                      </h3>
                      <p className="text-sm text-slate-500">{product.brand} {product.model}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">€{product.price}</p>
                      {product.originalPrice > product.price && (
                        <p className="text-sm text-slate-500 line-through">€{product.originalPrice}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm ml-1">{product.rating}</span>
                    </div>
                    <span className="text-slate-400">•</span>
                    <span className="text-sm text-slate-500">{product.reviews} hodnotení</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Hashrate:</span>
                    <span className="font-medium">{product.hashRate} {product.algorithm === 'Ethereum Classic' ? 'MH/s' : 'TH/s'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Spotreba:</span>
                    <span className="font-medium">{product.powerConsumption}W</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Efektivita:</span>
                    <span className="font-medium">{product.efficiency} {product.algorithm === 'Ethereum Classic' ? 'J/MH' : 'J/TH'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Zisk/mesiac:</span>
                    <span className="font-medium text-green-600">€{product.profitability}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">ROI:</span>
                    <span className="font-medium text-blue-600">{product.roi} mesiacov</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.stock === 0 ? 'Vypredané' : 'Do košíka'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Žiadne produkty nenájdené</h3>
            <p className="text-slate-500">Skúte upraviť filtre alebo hľadaný výraz</p>
          </div>
        )}
      </div>
    </div>
  );
}