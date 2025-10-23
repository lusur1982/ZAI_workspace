import UltraFastHome from './page-ultra'

export default function Home() {
  return <UltraFastHome />
}

export const dynamic = 'force-static'
export const revalidate = 3600 // Cache for 1 hour