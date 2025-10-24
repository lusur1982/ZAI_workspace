'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative bg-white text-gray-900">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900">
            CM Crypto Miners
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-2xl mx-auto">
            Premium cryptocurrency mining hardware for maximum profitability
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg">
              <Link href="/shop" className="flex items-center gap-2">
                Shop Now <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-8 py-4 text-lg">
              <Link href="/profitability">
                Calculate Profitability
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">High Performance</h3>
              <p className="text-gray-600">Latest generation mining hardware with optimal hash rates</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Warranty Protected</h3>
              <p className="text-gray-600">Full manufacturer warranty and technical support</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Profit Focused</h3>
              <p className="text-gray-600">Optimized for maximum mining profitability</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}