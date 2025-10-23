import { CheckCircle, Headphones, Truck, Shield, Award, Users } from 'lucide-react'

export function WhyChooseSection() {
  const features = [
    {
      icon: CheckCircle,
      title: 'Quality Guaranteed',
      description: 'All our miners are tested and certified for optimal performance and reliability.'
    },
    {
      icon: Headphones,
      title: 'Expert Support',
      description: '24/7 technical support from mining experts to help you maximize your profits.'
    },
    {
      icon: Truck,
      title: 'Fast Shipping',
      description: 'Quick and secure delivery worldwide with full insurance coverage.'
    },
    {
      icon: Shield,
      title: 'Warranty Protection',
      description: 'Comprehensive warranty on all products with hassle-free returns.'
    },
    {
      icon: Award,
      title: 'Best Prices',
      description: 'Competitive pricing with price match guarantee on all mining hardware.'
    },
    {
      icon: Users,
      title: 'Trusted by Thousands',
      description: 'Join thousands of satisfied customers who trust CM for their mining needs.'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose CM?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best crypto mining solutions with unmatched service and support
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-700 transition-colors">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Mining?</h3>
            <p className="text-gray-600 mb-6">
              Join thousands of successful miners who trust CM for their hardware needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10,000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">99.9%</div>
                <div className="text-gray-600">Uptime Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">24/7</div>
                <div className="text-gray-600">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}