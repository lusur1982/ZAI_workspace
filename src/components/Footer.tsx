export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CM</span>
              </div>
              <span className="font-bold text-xl">CM Crypto Miners</span>
            </div>
            <p className="text-gray-400 mb-4">
              Premium cryptocurrency mining hardware for maximum profitability.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Rýchle odkazy</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Domov</a></li>
              <li><a href="/shop" className="text-gray-400 hover:text-white transition-colors">Obchod</a></li>
              <li><a href="/cart" className="text-gray-400 hover:text-white transition-colors">Košík</a></li>
              <li><a href="/profitability" className="text-gray-400 hover:text-white transition-colors">Ziskovosť</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">Produkty</h3>
            <ul className="space-y-2">
              <li><a href="/shop" className="text-gray-400 hover:text-white transition-colors">ASIC Miners</a></li>
              <li><a href="/shop" className="text-gray-400 hover:text-white transition-colors">GPU Miners</a></li>
              <li><a href="/shop" className="text-gray-400 hover:text-white transition-colors">Príslušenstvo</a></li>
              <li><a href="/shop" className="text-gray-400 hover:text-white transition-colors">Záruka</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@cmminers.sk</li>
              <li>Telefón: +421 900 123 456</li>
              <li>Adresa: Bratislava, Slovensko</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 CM Crypto Miners. Všetky práva vyhradené.</p>
        </div>
      </div>
    </footer>
  )
}