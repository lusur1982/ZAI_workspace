'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Shield, TrendingUp, Cpu, Power } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/20"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-primary/5 rounded-full blur-xl animate-pulse delay-2000"></div>
      
      <div className="relative container-nordcraft section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
                <Power className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-primary">Professional Mining Solutions</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="gradient-text">Premium Crypto</span>
                <br />
                <span className="text-foreground">Mining Hardware</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Unlock maximum profitability with cutting-edge cryptocurrency mining equipment. 
                Engineered for performance, reliability, and optimal returns.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link href="/shop">
                  <Button className="btn-primary text-lg px-8 py-4">
                    Shop Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/profitability">
                  <Button variant="ghost" className="text-lg px-8 py-4 hover:bg-accent">
                    Calculate Profitability
                  </Button>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-foreground">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-foreground">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-foreground">2Y+</div>
                  <div className="text-sm text-muted-foreground">Warranty</div>
                </div>
              </div>
            </motion.div>
            
            {/* Right content - Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                {/* Main card */}
                <div className="card-nordcraft p-8 relative">
                  <div className="flex items-center justify-center mb-6">
                    <div className="p-4 bg-primary/10 rounded-2xl">
                      <Cpu className="w-12 h-12 text-primary" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-center mb-4">Next-Gen Mining</h3>
                  <p className="text-muted-foreground text-center mb-6">
                    Experience the power of professional-grade mining hardware
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-lg font-semibold text-primary">TH/s</div>
                      <div className="text-sm text-muted-foreground">Hash Rate</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-lg font-semibold text-primary">W</div>
                      <div className="text-sm text-muted-foreground">Power Eff.</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating cards */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 card-nordcraft p-4 w-32"
                >
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm font-semibold">Fast</div>
                      <div className="text-xs text-muted-foreground">Delivery</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-4 -left-4 card-nordcraft p-4 w-32"
                >
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm font-semibold">Secure</div>
                      <div className="text-xs text-muted-foreground">Payment</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Features */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
          >
            <div className="card-nordcraft text-center group hover:scale-105 transition-transform duration-200">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-200">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">High Performance</h3>
              <p className="text-muted-foreground">Latest generation mining hardware with optimal hash rates and efficiency</p>
            </div>
            
            <div className="card-nordcraft text-center group hover:scale-105 transition-transform duration-200">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-200">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Warranty Protected</h3>
              <p className="text-muted-foreground">Full manufacturer warranty and comprehensive technical support</p>
            </div>
            
            <div className="card-nordcraft text-center group hover:scale-105 transition-transform duration-200">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-200">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Profit Focused</h3>
              <p className="text-muted-foreground">Optimized for maximum mining profitability and ROI</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}