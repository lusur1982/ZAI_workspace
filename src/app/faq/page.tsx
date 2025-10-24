'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, Search, HelpCircle, MessageCircle, Mail, Phone } from 'lucide-react'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  // Sample FAQ data - in real app, this would come from API
  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'What is cryptocurrency mining?',
      answer: 'Cryptocurrency mining is the process of validating transactions and adding them to a blockchain ledger. Miners use specialized hardware to solve complex mathematical problems, and in return, they earn cryptocurrency rewards.',
      category: 'General',
      order: 1
    },
    {
      id: '2',
      question: 'Which miner should I buy as a beginner?',
      answer: 'For beginners, we recommend starting with an ASIC miner like the Antminer S19 or a GPU mining rig. ASIC miners are more efficient for specific cryptocurrencies, while GPUs offer more flexibility. Consider your budget, electricity costs, and the cryptocurrency you want to mine.',
      category: 'Getting Started',
      order: 2
    },
    {
      id: '3',
      question: 'How much electricity does mining consume?',
      answer: 'Electricity consumption varies by hardware. ASIC miners typically consume 3000-3500W, while GPU rigs use 1000-1500W. Always calculate your electricity costs before investing, as they significantly impact profitability.',
      category: 'Technical',
      order: 3
    },
    {
      id: '4',
      question: 'What is the ROI on mining hardware?',
      answer: 'ROI depends on multiple factors: hardware cost, electricity rates, cryptocurrency prices, and network difficulty. Generally, miners aim for 6-12 month ROI periods, but this can vary significantly based on market conditions.',
      category: 'Profitability',
      order: 4
    },
    {
      id: '5',
      question: 'Do you provide technical support?',
      answer: 'Yes, we offer 24/7 technical support for all our products. Our team can help with setup, optimization, troubleshooting, and maintenance. Premium support packages are available for large mining operations.',
      category: 'Support',
      order: 5
    },
    {
      id: '6',
      question: 'What warranty do your products have?',
      answer: 'All our products come with a manufacturer warranty ranging from 6 months to 2 years, depending on the product. We also offer extended warranty options for additional peace of mind.',
      category: 'Warranty',
      order: 6
    },
    {
      id: '7',
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 5-7 business days domestically and 10-15 business days internationally. Express shipping options are available at checkout. All shipments are fully insured.',
      category: 'Shipping',
      order: 7
    },
    {
      id: '8',
      question: 'Can I return or exchange a miner?',
      answer: 'We offer a 30-day return policy for unused items in original packaging. Used miners can be exchanged within 14 days if defective. All returns require prior approval and may be subject to restocking fees.',
      category: 'Returns',
      order: 8
    },
    {
      id: '9',
      question: 'What cryptocurrencies can I mine?',
      answer: 'The cryptocurrencies you can mine depend on your hardware. ASIC miners are typically designed for specific coins (Bitcoin, Litecoin, etc.), while GPUs can mine various altcoins. Check each product\'s specifications for compatible algorithms.',
      category: 'Technical',
      order: 9
    },
    {
      id: '10',
      question: 'How do I calculate mining profitability?',
      answer: 'Use our profitability calculator to estimate returns. Factor in hardware cost, electricity consumption, pool fees, and current market prices. Remember that profitability fluctuates with market conditions and network difficulty.',
      category: 'Profitability',
      order: 10
    },
    {
      id: '11',
      question: 'What cooling solutions do you recommend?',
      answer: 'Cooling is crucial for miner longevity. We recommend ambient temperatures below 25°C (77°F) with proper ventilation. For larger operations, consider industrial cooling solutions. All our miners specify their optimal temperature ranges.',
      category: 'Technical',
      order: 11
    },
    {
      id: '12',
      question: 'Do you offer bulk discounts?',
      answer: 'Yes, we offer competitive bulk pricing for orders of 10+ units. Contact our sales team for custom quotes on large orders. We also have special programs for mining farms and resellers.',
      category: 'Pricing',
      order: 12
    }
  ]

  const categories = [...new Set(faqs.map(faq => faq.category))]

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const expandAll = () => {
    setExpandedItems(new Set(filteredFaqs.map(faq => faq.id)))
  }

  const collapseAll = () => {
    setExpandedItems(new Set())
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-blue-100">
              Everything you need to know about crypto mining and our products
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-lg py-3"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={expandAll}>
                  Expand All
                </Button>
                <Button variant="outline" onClick={collapseAll}>
                  Collapse All
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !selectedCategory 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                All Categories
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No FAQs Found</h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map(faq => (
                  <Card key={faq.id} className="hover:shadow-md transition-shadow">
                    <CardHeader 
                      className="cursor-pointer"
                      onClick={() => toggleExpanded(faq.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <Badge variant="secondary">{faq.category}</Badge>
                          <CardTitle className="text-lg text-left">
                            {faq.question}
                          </CardTitle>
                        </div>
                        <div className="flex-shrink-0">
                          {expandedItems.has(faq.id) ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    {expandedItems.has(faq.id) && (
                      <CardContent className="pt-0">
                        <div className="prose prose-gray max-w-none">
                          <p className="text-gray-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Still Have Questions?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Our support team is here to help you with any questions about crypto mining
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                  <p className="text-gray-300 mb-4">Chat with our experts in real-time</p>
                  <Button className="w-full">Start Chat</Button>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Mail className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Email Support</h3>
                  <p className="text-gray-300 mb-4">Get detailed help via email</p>
                  <Button variant="outline" className="w-full">Send Email</Button>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Phone className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
                  <p className="text-gray-300 mb-4">Call us for immediate assistance</p>
                  <Button variant="outline" className="w-full">Call Now</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}