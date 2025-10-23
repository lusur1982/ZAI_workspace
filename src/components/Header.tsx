'use client'

import Link from 'next/link'
import { ShoppingCart, User, Search } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CM</span>
            </div>
            <span className="font-bold text-xl text-gray-900">CM Crypto Miners</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Domov
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-blue-600 transition-colors">
              Obchod
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-blue-600 transition-colors">
              Košík
            </Link>
            <Link href="/profitability" className="text-gray-700 hover:text-blue-600 transition-colors">
              Ziskovosť
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/cart" className="p-2 text-gray-700 hover:text-blue-600 transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}