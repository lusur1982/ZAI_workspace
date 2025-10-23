import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturedProducts } from '@/components/sections/FeaturedProducts'
import { NewProducts } from '@/components/sections/NewProducts'
import { WhyChooseSection } from '@/components/sections/WhyChooseSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
      <NewProducts />
      <WhyChooseSection />
    </div>
  )
}