'use client'

import { useState, useEffect } from 'react'
import { Zap, Shield, RefreshCw, ChevronDown } from 'lucide-react'

type PageVariant = 'ultra' | 'hybrid' | 'standard'

interface VariantConfig {
  id: PageVariant
  name: string
  description: string
  speed: string
  dataFreshness: string
  icon: React.ReactNode
  badge: string
  badgeColor: string
}

const variants: VariantConfig[] = [
  {
    id: 'ultra',
    name: 'Ultra Rýchla Verzia',
    description: 'Maximálna rýchlosť, statické dáta bez API volaní',
    speed: '~0.1s',
    dataFreshness: 'Predpočítané',
    icon: <Zap className="w-5 h-5" />,
    badge: 'Najrýchlejšia',
    badgeColor: 'bg-green-500'
  },
  {
    id: 'hybrid',
    name: 'Hybridná Verzia',
    description: 'Rýchla verzia s občasným obnovovaním dát',
    speed: '~0.3s',
    dataFreshness: '5 minút',
    icon: <RefreshCw className="w-5 h-5" />,
    badge: 'Vyvážená',
    badgeColor: 'bg-blue-500'
  },
  {
    id: 'standard',
    name: 'Standardná Verzia',
    description: 'Plnohodnotná verzia s najnovšími dátami v reálnom čase',
    speed: '~1-2s',
    dataFreshness: 'Reálny čas',
    icon: <Shield className="w-5 h-5" />,
    badge: 'Plná funkčnosť',
    badgeColor: 'bg-purple-500'
  }
]

export default function Home() {
  const [selectedVariant, setSelectedVariant] = useState<PageVariant>('ultra')
  const [showSelector, setShowSelector] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('pageVariant') as PageVariant
    if (saved && ['ultra', 'hybrid', 'standard'].includes(saved)) {
      setSelectedVariant(saved)
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('pageVariant', selectedVariant)
    }
  }, [selectedVariant, isClient])

  const currentVariant = variants.find(v => v.id === selectedVariant)!

  if (!isClient) {
    return (
      <div className="min-h-screen">
        <section className="relative bg-gradient-to-br from-[#60efff] to-[#0061ff] text-gray-900">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 py-24 lg:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                CM Crypto Miners
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-800">
                Premium cryptocurrency mining hardware for maximum profitability
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <a 
                  href="/shop" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-lg inline-flex items-center justify-center gap-2"
                >
                  Shop Now <ChevronDown className="w-5 h-5 rotate-90" />
                </a>
                <a 
                  href="/profitability"
                  className="border border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg rounded-lg inline-flex items-center justify-center"
                >
                  Calculate Profitability
                </a>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">High Performance</h3>
                  <p className="text-gray-700">Latest generation mining hardware with optimal hash rates</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Warranty Protected</h3>
                  <p className="text-gray-700">Full manufacturer warranty and technical support</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                    <RefreshCw className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Profit Focused</h3>
                  <p className="text-gray-700">Optimized for maximum mining profitability</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-[#60efff] to-[#0061ff] text-gray-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              CM Crypto Miners
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-800">
              Premium cryptocurrency mining hardware for maximum profitability
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a 
                href="/shop" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-lg inline-flex items-center justify-center gap-2"
              >
                Shop Now <ChevronDown className="w-5 h-5 rotate-90" />
              </a>
              <a 
                href="/profitability"
                className="border border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg rounded-lg inline-flex items-center justify-center"
              >
                Calculate Profitability
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">High Performance</h3>
                <p className="text-gray-700">Latest generation mining hardware with optimal hash rates</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Warranty Protected</h3>
                <p className="text-gray-700">Full manufacturer warranty and technical support</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <RefreshCw className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Profit Focused</h3>
                <p className="text-gray-700">Optimized for maximum mining profitability</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}