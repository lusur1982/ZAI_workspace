'use client'

import { Zap, Shield, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#60efff] to-[#0061ff] text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              CM Crypto Miners
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Premium cryptocurrency mining hardware for maximum profitability
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/shop" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
              >
                Shop Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/profitability"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg rounded-lg inline-flex items-center justify-center transition-colors"
              >
                Calculate Profitability
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">High Performance</h3>
                <p className="text-gray-200">Latest generation mining hardware with optimal hash rates</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Warranty Protected</h3>
                <p className="text-gray-200">Full manufacturer warranty and technical support</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Profit Focused</h3>
                <p className="text-gray-200">Optimized for maximum mining profitability</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose CM Crypto Miners?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best crypto mining solutions with unmatched service and support
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality Guaranteed',
                description: 'All our miners are tested and certified for optimal performance and reliability.',
                icon: <Shield className="w-8 h-8" />
              },
              {
                title: 'Expert Support',
                description: '24/7 technical support from mining experts to help you maximize your profits.',
                icon: <Zap className="w-8 h-8" />
              },
              {
                title: 'Fast Shipping',
                description: 'Quick and secure delivery worldwide with full insurance coverage.',
                icon: <TrendingUp className="w-8 h-8" />
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-center">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/shop"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}