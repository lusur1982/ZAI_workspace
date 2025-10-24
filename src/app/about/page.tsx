import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Award, Globe, Zap, Shield, TrendingUp } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  const milestones = [
    { year: '2018', title: 'CM Founded', description: 'Started with a vision to make crypto mining accessible to everyone' },
    { year: '2019', title: 'First Partnership', description: 'Partnered with leading manufacturers to offer premium hardware' },
    { year: '2020', title: 'Expansion', description: 'Expanded to serve customers across 50+ countries' },
    { year: '2021', title: 'Innovation', description: 'Launched proprietary mining optimization software' },
    { year: '2022', title: 'Growth', description: 'Reached 10,000+ satisfied customers worldwide' },
    { year: '2023', title: 'Excellence', description: 'Awarded Best Mining Hardware Provider of the Year' }
  ]

  const team = [
    {
      name: 'Alex Chen',
      role: 'CEO & Founder',
      description: 'Blockchain enthusiast with 15+ years in tech and mining',
      image: '/team/alex.jpg'
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      description: 'Hardware expert specializing in mining optimization',
      image: '/team/sarah.jpg'
    },
    {
      name: 'Mike Williams',
      role: 'Head of Operations',
      description: 'Logistics and supply chain management expert',
      image: '/team/mike.jpg'
    },
    {
      name: 'Emily Davis',
      role: 'Customer Success Lead',
      description: 'Dedicated to ensuring customer satisfaction and support',
      image: '/team/emily.jpg'
    }
  ]

  const values = [
    {
      icon: Shield,
      title: 'Trust & Reliability',
      description: 'We stand behind every product with comprehensive warranties and dedicated support.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Continuously researching and offering the latest mining technology.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your success is our success. We\'re here to support your mining journey.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving miners worldwide with fast shipping and localized support.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Every product is tested and certified for optimal performance.'
    },
    {
      icon: TrendingUp,
      title: 'Profitability Focus',
      description: 'Helping you maximize returns with the most efficient hardware.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About CM Crypto Miners
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your trusted partner in cryptocurrency mining hardware since 2018
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-blue-100">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-blue-100">Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Story</h2>
            <div className="prose prose-lg mx-auto text-gray-300">
              <p className="mb-6">
                CM Crypto Miners was born from a simple observation: while cryptocurrency was revolutionizing finance, 
                the hardware needed to participate remained complex, expensive, and inaccessible to many.
              </p>
              <p className="mb-6">
                Founded in 2018 by a team of blockchain enthusiasts and hardware engineers, CM set out to bridge this gap. 
                We believed that everyone should have the opportunity to participate in the crypto revolution, 
                regardless of their technical expertise.
              </p>
              <p>
                Today, we're proud to be one of the world's leading providers of cryptocurrency mining hardware, 
                serving everyone from hobbyists to large-scale mining operations with the same commitment to quality, 
                reliability, and customer success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-purple-500/30"></div>
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 pr-8">
                    <Card className="p-6">
                      <Badge className="mb-2">{milestone.year}</Badge>
                      <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-gray-300">{milestone.description}</p>
                    </Card>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-slate-900 relative z-10 shadow-lg shadow-purple-500/50"></div>
                  <div className="w-1/2 pl-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="w-16 h-16 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                  <p className="text-gray-300 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Mining Journey?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of successful miners who trust CM for their hardware needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Browse Products
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}