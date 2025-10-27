export interface CartItem {
  id: string
  product: {
    id: string
    name: string
    price: number
    images: string[]
    slug: string
  }
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

export interface CartStore {
  items: CartItem[]
  addItem: (product: any, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}