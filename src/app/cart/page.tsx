'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react'

// Mock cart data for now
const mockItems = [
  {
    id: '1',
    product: {
      id: '1',
      name: 'Antminer S21 Pro',
      price: 2499,
      images: ['/images/antminer-s21-pro.jpg'],
      slug: 'antminer-s21-pro'
    },
    quantity: 1
  }
]

export default function CartPage() {
  const [items, setItems] = useState(mockItems)
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
    setIsUpdating(productId)
    try {
      // Mock update
      console.log('Updating quantity:', productId, newQuantity)
    } catch (error) {
      console.error('Error updating quantity:', error)
    } finally {
      setIsUpdating(null)
    }
  }

  const handleRemoveItem = (productId: string, productName: string) => {
    setItems(items.filter(item => item.product.id !== productId))
    console.log('Removed item:', productName)
  }

  const handleClearCart = () => {
    setItems([])
    console.log('Cart cleared')
  }

  const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  const shipping = subtotal > 0 ? (subtotal > 1000 ? 0 : 50) : 0
  const tax = subtotal * 0.20 // 20% DPH
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Váš košík je prázdny</h1>
            <p className="text-gray-600 mb-8">
              Zatiaľ ste do košíka nepridali žiadne ťažobné zariadenia.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link href="/shop">
              <Button size="lg" className="w-full sm:w-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Pokračovať v nákupe
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Nákupný Košík</h1>
        <p className="text-gray-600">
          Skontrolujte si vybrané ťažobné zariadenia a pokračujte do pokladne
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Položky v košíku ({items.length})</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Vyčistiť košík
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 flex-shrink-0">
                      {item.product.images[0] ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="min-w-0">
                          <Link 
                            href={`/product/${item.product.slug}`}
                            className="text-lg font-semibold hover:text-blue-600 transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-gray-500">
                            €{item.product.price.toLocaleString()} za kus
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                          className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Množstvo:</span>
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isUpdating === item.product.id}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-12 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                            disabled={isUpdating === item.product.id}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <span className="text-sm font-semibold ml-auto">
                          €{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Súhrn Objednávky</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Medzisúčet</span>
                  <span className="font-medium">€{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Doprava</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'ZADARMO' : `€${shipping.toLocaleString()}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">DPH (20%)</span>
                  <span className="font-medium">€{tax.toFixed(2)}</span>
                </div>

                <div className="border-t pt-4"></div>

                <div className="flex justify-between text-lg font-bold">
                  <span>Celkom</span>
                  <span className="text-blue-600">€{total.toFixed(2)}</span>
                </div>

                {shipping === 0 && subtotal > 1000 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-700">
                      🎉 Zadarmo doprava pri objednávkach nad €1,000!
                    </p>
                  </div>
                )}

                <div className="space-y-2 pt-4">
                  <Link href="/checkout">
                    <Button size="lg" className="w-full">
                      Pokračovať do pokladne
                    </Button>
                  </Link>
                  
                  <Link href="/shop">
                    <Button variant="outline" size="lg" className="w-full">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Pokračovať v nákupe
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}