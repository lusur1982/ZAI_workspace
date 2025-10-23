import { HeroSection } from '@/components/sections/HeroSection'
import { OptimizedHomeProducts } from '@/components/sections/OptimizedHomeProducts'
import { WhyChooseSection } from '@/components/sections/WhyChooseSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <OptimizedHomeProducts />
      <WhyChooseSection />
    </div>
  )
}