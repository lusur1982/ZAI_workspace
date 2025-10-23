import { HeroSection } from '@/components/sections/HeroSection'
import { HybridHomeProducts } from '@/components/sections/HybridHomeProducts'
import { WhyChooseSection } from '@/components/sections/WhyChooseSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HybridHomeProducts />
      <WhyChooseSection />
    </div>
  )
}

export const dynamic = 'force-dynamic'
export const revalidate = 300 // Revalidate every 5 minutes