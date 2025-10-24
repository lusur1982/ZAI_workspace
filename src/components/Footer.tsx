import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Github, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container-nordcraft section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">CM</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl gradient-text">CM Crypto Miners</span>
                <span className="text-xs text-muted-foreground">Professional Mining Solutions</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted partner for premium cryptocurrency mining hardware. 
              We offer the latest ASIC and GPU miners with expert support.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-accent">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-accent">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-accent">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-accent">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center group">
                  <span className="w-0 group-hover:w-4 h-px bg-primary transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?featured=true" className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center group">
                  <span className="w-0 group-hover:w-4 h-px bg-primary transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Featured Products
                </Link>
              </li>
              <li>
                <Link href="/profitability" className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center group">
                  <span className="w-0 group-hover:w-4 h-px bg-primary transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Profitability Calculator
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center group">
                  <span className="w-0 group-hover:w-4 h-px bg-primary transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center group">
                  <span className="w-0 group-hover:w-4 h-px bg-primary transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center group">
                  <span className="w-0 group-hover:w-4 h-px bg-primary transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center group">
                  <span className="w-0 group-hover:w-4 h-px bg-primary transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center group">
                  <span className="w-0 group-hover:w-4 h-px bg-primary transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Returns & Warranty
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center group">
                  <span className="w-0 group-hover:w-4 h-px bg-primary transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Technical Support
                </Link>
              </li>
              <li>
                <Link href="/payment" className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center group">
                  <span className="w-0 group-hover:w-4 h-px bg-primary transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Payment Options
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span className="text-muted-foreground text-sm">info@cmminers.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <span className="text-muted-foreground text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg mt-0.5">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="text-muted-foreground text-sm">
                  123 Mining Street<br />
                  Crypto City, CC 12345<br />
                  United States
                </span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="pt-6 border-t border-border">
              <h4 className="font-medium mb-3">Newsletter</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Subscribe for updates on new products and mining tips.
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors duration-200"
                />
                <button className="btn-primary text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 CM Crypto Miners. All rights reserved.
            </p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}