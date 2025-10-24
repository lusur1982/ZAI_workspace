'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
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
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              <Link href="/shop" className="flex items-center gap-2">
                Shop Now <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg">
              <Link href="/profitability">
                Calculate Profitability
              </Link>
            </Button>
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
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Profit Focused</h3>
              <p className="text-gray-700">Optimized for maximum mining profitability</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}