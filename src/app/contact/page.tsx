'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Building } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: ['support@cmminers.com', 'sales@cmminers.com'],
      color: 'text-blue-600'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      color: 'text-green-600'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Mining Street', 'Crypto Valley, CA 90210', 'United States'],
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM', 'Sunday: Closed'],
      color: 'text-orange-600'
    }
  ]

  const departments = [
    {
      name: 'Sales',
      email: 'sales@cmminers.com',
      phone: '+1 (555) 123-4567',
      description: 'Product inquiries, bulk orders, pricing'
    },
    {
      name: 'Technical Support',
      email: 'support@cmminers.com',
      phone: '+1 (555) 987-6543',
      description: 'Hardware issues, setup help, troubleshooting'
    },
    {
      name: 'Customer Service',
      email: 'service@cmminers.com',
      phone: '+1 (555) 456-7890',
      description: 'Order status, returns, general inquiries'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact CM Crypto Miners
            </h1>
            <p className="text-xl text-blue-100">
              Get in touch with our team for expert support and guidance
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Form */}
            <div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <p className="text-gray-300">
                    Fill out the form below and we'll get back to you within 24 hours
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-200">Name *</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-200">Email *</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-200">Phone</label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-200">Subject *</label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="How can we help you?"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-200">Message *</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>
                    
                    {submitStatus === 'success' && (
                      <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                        Thank you for your message! We'll get back to you soon.
                      </div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                        Something went wrong. Please try again or contact us directly.
                      </div>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Quick Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0`}>
                          <info.icon className={`w-5 h-5 ${info.color}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2 text-white">{info.title}</h3>
                          {info.details.map((detail, i) => (
                            <p key={i} className="text-sm text-gray-300">{detail}</p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Departments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Departments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {departments.map((dept, index) => (
                    <div key={index} className="border-l-4 border-blue-600 pl-4">
                      <h4 className="font-semibold text-lg">{dept.name}</h4>
                      <p className="text-sm text-gray-300 mb-2">{dept.description}</p>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-300">
                          <span className="font-medium text-gray-200">Email:</span> {dept.email}
                        </p>
                        <p className="text-sm text-gray-300">
                          <span className="font-medium text-gray-200">Phone:</span> {dept.phone}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Live Chat */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Prefer Live Chat?</h3>
                  <p className="text-gray-300 mb-4">
                    Get instant answers from our support team
                  </p>
                  <Button className="w-full">
                    Start Live Chat
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Visit Our Office</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <Card className="h-full">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold mb-6 text-white">Our Location</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <p className="font-medium text-white">Headquarters</p>
                          <p className="text-gray-300">123 Mining Street</p>
                          <p className="text-gray-300">Crypto Valley, CA 90210</p>
                          <p className="text-gray-300">United States</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <p className="font-medium text-white">Office Hours</p>
                          <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                          <p className="text-gray-300">Saturday: 10:00 AM - 4:00 PM</p>
                          <p className="text-gray-300">Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <h4 className="font-semibold mb-4 text-white">Getting Here</h4>
                      <div className="space-y-2 text-sm text-gray-300">
                        <p>• Free parking available on-site</p>
                        <p>• Accessible by public transit</p>
                        <p>• Airport: 45 minutes from LAX</p>
                        <p>• Train station: 10 minutes walk</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="h-full">
                  <CardContent className="p-0 h-full min-h-[400px] bg-gray-100 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <MapPin className="w-16 h-16 mx-auto mb-4" />
                      <p className="text-lg font-medium text-white">Interactive Map</p>
                      <p className="text-sm text-gray-400">Map integration would go here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}