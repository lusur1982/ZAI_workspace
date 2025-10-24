'use client'

import { useState, useEffect } from 'react'
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
  const [itemCount, setItemCount] = useState(0)
  const [mounted, setMounted] = useState(false)
  const { data: session, status } = useSession()
  const { getItemCount } = useCartStore()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    setItemCount(getItemCount())
  }, [getItemCount])

  useEffect(() => {
    if (mounted) {
      setItemCount(getItemCount())
    }
  }, [mounted, getItemCount])

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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-nordcraft">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg">
                <span className="text-primary-foreground font-bold text-lg">CM</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl gradient-text">CM Crypto Miners</span>
                <span className="text-xs text-muted-foreground">Professional Mining Solutions</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.slice(0, 5).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link text-sm"
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
            <div className="h-6 w-px bg-border"></div>
            {navigation.slice(5).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link text-sm"
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
            {/* Role-based navigation */}
            {getRoleBasedNavigation().map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link-active text-sm bg-primary/10 px-3 py-1.5 rounded-md border border-primary/20"
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
          <div className="hidden xl:flex items-center space-x-3">
            <form onSubmit={(e) => handleSearch(e, searchQuery)} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80 bg-muted/50 border-border focus:border-primary transition-all duration-200"
              />
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="hidden sm:flex relative hover:bg-accent">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {mounted && itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {status === 'loading' ? (
              <div className="w-20 h-8 bg-muted rounded animate-pulse"></div>
            ) : session ? (
              <div className="flex items-center space-x-2">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="hidden sm:flex hover:bg-accent">
                    <User className="h-4 w-4 mr-2" />
                    {session.user?.name || 'Dashboard'}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="hover:bg-accent">
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/auth/signin">
                <Button className="btn-primary">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="sm" className="hover:bg-accent">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[350px] bg-background border-border">
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-2">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Main Navigation</div>
                    {navigation.slice(0, 5).map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="nav-link py-3 px-4 rounded-lg hover:bg-accent transition-colors duration-200"
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
                    <div className="h-px bg-border my-2"></div>
                    {navigation.slice(5).map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="nav-link py-3 px-4 rounded-lg hover:bg-accent transition-colors duration-200"
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
                    {/* Role-based mobile navigation */}
                    {getRoleBasedNavigation().map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="nav-link-active py-3 px-4 rounded-lg bg-primary/10 border border-primary/20"
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
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Search</div>
                    <form onSubmit={(e) => handleSearch(e, mobileSearchQuery)} className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search products..."
                        value={mobileSearchQuery}
                        onChange={(e) => setMobileSearchQuery(e.target.value)}
                        className="pl-10 bg-muted/50 border-border focus:border-primary"
                      />
                    </form>
                  </div>

                  {/* Mobile Action Buttons */}
                  <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Account</div>
                    <Link href="/cart" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start relative hover:bg-accent">
                        <ShoppingCart className="h-4 w-4 mr-3" />
                        Cart
                        {mounted && itemCount > 0 && (
                          <Badge className="absolute right-3 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
                            {itemCount}
                          </Badge>
                        )}
                      </Button>
                    </Link>
                    
                    {status === 'loading' ? (
                      <div className="w-full h-10 bg-muted rounded animate-pulse"></div>
                    ) : session ? (
                      <>
                        <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start hover:bg-accent">
                            <User className="h-4 w-4 mr-3" />
                            {session.user?.name || 'Dashboard'}
                          </Button>
                        </Link>
                        <Button variant="ghost" className="w-full justify-start hover:bg-accent" onClick={handleSignOut}>
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                        <Button className="w-full btn-primary">
                          <User className="h-4 w-4 mr-3" />
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