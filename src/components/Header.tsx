'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, ShoppingCart, User, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/lib/cart'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/hooks/use-toast'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileSearchQuery, setMobileSearchQuery] = useState('')
  const { data: session, status } = useSession()
  const { getItemCount } = useCartStore()
  const itemCount = getItemCount()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' })
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      })
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "An error occurred. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleNavigation = (href: string) => {
    // Force navigation if Next.js router isn't working properly
    if (href.startsWith('/')) {
      window.location.href = href
    } else {
      window.open(href, '_blank')
    }
  }

  const handleSearch = (e: React.FormEvent, query: string) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Cart', href: '/cart' },
    { name: 'Checkout', href: '/checkout' },
    { name: 'Profitability', href: '/profitability' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' }
  ]

  // Role-based navigation
  const getRoleBasedNavigation = () => {
    if (session?.user?.role === 'ADMIN') {
      return [
        { name: 'Dashboard', href: '/admin' },
        { name: 'My Profile', href: '/dashboard/profile' }
      ]
    } else if (session) {
      return [
        { name: 'Dashboard', href: '/dashboard' }
      ]
    }
    return []
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CM</span>
              </div>
              <span className="font-bold text-xl">CM Crypto Miners</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-blue-600"
                onClick={(e) => {
                  // Fallback navigation if Next.js Link doesn't work
                  if (e.ctrlKey || e.metaKey) {
                    // Allow normal behavior for cmd/ctrl+click
                    return
                  }
                  // Small delay to allow Next.js router to work first
                  setTimeout(() => {
                    if (window.location.pathname === item.href) {
                      return // Already navigated
                    }
                    handleNavigation(item.href)
                  }, 100)
                }}
              >
                {item.name}
              </Link>
            ))}
            {/* Role-based navigation */}
            {getRoleBasedNavigation().map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-blue-600 bg-blue-50 px-3 py-1 rounded-md"
                onClick={(e) => {
                  if (e.ctrlKey || e.metaKey) {
                    return
                  }
                  setTimeout(() => {
                    if (window.location.pathname === item.href) {
                      return
                    }
                    handleNavigation(item.href)
                  }, 100)
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-2">
            <form onSubmit={(e) => handleSearch(e, searchQuery)} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Link href="/cart">
              <Button variant="outline" size="sm" className="hidden sm:flex relative">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {status === 'loading' ? (
              <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
            ) : session ? (
              <div className="flex items-center space-x-2">
                <Link href="/dashboard">
                  <Button variant="outline" size="sm" className="hidden sm:flex">
                    <User className="h-4 w-4 mr-2" />
                    {session.user?.name || 'Dashboard'}
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/auth/signin">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-3">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-sm font-medium transition-colors hover:text-blue-600 py-2"
                        onClick={() => {
                          setIsOpen(false)
                          // Fallback navigation
                          setTimeout(() => {
                            if (window.location.pathname === item.href) {
                              return
                            }
                            handleNavigation(item.href)
                          }, 100)
                        }}
                      >
                        {item.name}
                      </Link>
                    ))}
                    {/* Role-based mobile navigation */}
                    {getRoleBasedNavigation().map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-sm font-medium transition-colors hover:text-blue-600 py-2 bg-blue-50 px-3 py-2 rounded-md"
                        onClick={() => {
                          setIsOpen(false)
                          setTimeout(() => {
                            if (window.location.pathname === item.href) {
                              return
                            }
                            handleNavigation(item.href)
                          }, 100)
                        }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Search */}
                  <form onSubmit={(e) => handleSearch(e, mobileSearchQuery)} className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      value={mobileSearchQuery}
                      onChange={(e) => setMobileSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </form>

                  {/* Mobile Action Buttons */}
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    <Link href="/cart" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full relative">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Cart
                        {itemCount > 0 && (
                          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                            {itemCount}
                          </Badge>
                        )}
                      </Button>
                    </Link>
                    
                    {status === 'loading' ? (
                      <div className="w-full h-8 bg-gray-200 rounded animate-pulse"></div>
                    ) : session ? (
                      <>
                        <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full">
                            <User className="h-4 w-4 mr-2" />
                            {session.user?.name || 'Dashboard'}
                          </Button>
                        </Link>
                        <Button variant="outline" className="w-full" onClick={handleSignOut}>
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full">
                          <User className="h-4 w-4 mr-2" />
                          Login
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}