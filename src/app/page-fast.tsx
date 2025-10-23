import { HeroSection } from '@/components/sections/HeroSection'
import { WhyChooseSection } from '@/components/sections/WhyChooseSection'
import { StaticProductsShowcase } from '@/components/sections/StaticProductsShowcase'

// Static data - no API calls
const featuredProducts = [
  {
    id: "1",
    name: "Antminer S19 Pro",
    slug: "antminer-s19-pro",
    price: 2999,
    description: "Most efficient Bitcoin miner with 110 TH/s hash rate",
    type: "ASIC",
    cooling: "Air Cooling",
    images: ["/images/products/antminer-s19-pro.jpg"],
    featured: true
  },
  {
    id: "2", 
    name: "Whatsminer M30S++",
    slug: "whatsminer-m30s-plus-plus",
    price: 3299,
    description: "High-performance miner with 112 TH/s hash rate",
    type: "ASIC",
    cooling: "Air Cooling", 
    images: ["/images/products/whatsminer-m30s.jpg"],
    featured: true
  },
  {
    id: "3",
    name: "AvalonMiner 1246",
    slug: "avalonminer-1246", 
    price: 2799,
    description: "Reliable miner with 90 TH/s hash rate",
    type: "ASIC",
    cooling: "Air Cooling",
    images: ["/images/products/avalonminer-1246.jpg"],
    featured: true
  }
]

const newProducts = [
  {
    id: "4",
    name: "Antminer S19 XP",
    slug: "antminer-s19-xp",
    price: 4999,
    description: "Latest generation with 140 TH/s hash rate",
    type: "ASIC",
    cooling: "Liquid Cooling",
    images: ["/images/products/antminer-s19-xp.jpg"],
    new: true
  },
  {
    id: "5",
    name: "Whatsminer M50",
    slug: "whatsminer-m50",
    price: 4599,
    description: "Next-gen miner with 126 TH/s hash rate",
    type: "ASIC", 
    cooling: "Liquid Cooling",
    images: ["/images/products/whatsminer-m50.jpg"],
    new: true
  },
  {
    id: "6",
    name: "Goldshell KD5",
    slug: "goldshell-kd5",
    price: 899,
    description: "Compact Kadena miner with 18.7 TH/s",
    type: "ASIC",
    cooling: "Fan Cooling",
    images: ["/images/products/goldshell-kd5.jpg"],
    new: true
  },
  {
    id: "7",
    name: "iPollo V1 Mini",
    slug: "ipollo-v1-mini",
    price: 599,
    description: "Efficient Ethereum miner with 285 MH/s",
    type: "GPU",
    cooling: "Fan Cooling", 
    images: ["/images/products/ipollo-v1-mini.jpg"],
    new: true
  }
]

export default function FastHome() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StaticProductsShowcase 
        featuredProducts={featuredProducts}
        newProducts={newProducts}
      />
      <WhyChooseSection />
    </div>
  )
}