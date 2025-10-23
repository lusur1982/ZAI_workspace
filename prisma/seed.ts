import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const cryptoMiners = [
  {
    name: 'Antminer S19 Pro',
    slug: 'antminer-s19-pro',
    description: 'The Antminer S19 Pro is one of the most powerful Bitcoin miners on the market, offering an impressive hashrate of 110 TH/s with excellent energy efficiency.',
    price: 2999.99,
    type: 'ASIC',
    cooling: 'Air Cooling',
    images: [
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop'
    ],
    featured: true,
    new: false
  },
  {
    name: 'WhatsMiner M30S++',
    slug: 'whatsminer-m30s-plus-plus',
    description: 'The WhatsMiner M30S++ delivers exceptional performance with 112 TH/s hashrate and improved power efficiency, making it ideal for large-scale mining operations.',
    price: 3199.99,
    type: 'ASIC',
    cooling: 'Air Cooling',
    images: [
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop'
    ],
    featured: true,
    new: false
  },
  {
    name: 'AvalonMiner 1246',
    slug: 'avalonminer-1246',
    description: 'The AvalonMiner 1246 offers reliable performance with 90 TH/s hashrate and robust build quality, perfect for both beginners and experienced miners.',
    price: 2499.99,
    type: 'ASIC',
    cooling: 'Air Cooling',
    images: [
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop'
    ],
    featured: false,
    new: false
  },
  {
    name: 'Innosilicon T3+',
    slug: 'innosilicon-t3-plus',
    description: 'The Innosilicon T3+ provides excellent value with 53 TH/s hashrate and low power consumption, making it energy-efficient for Bitcoin mining.',
    price: 1899.99,
    type: 'ASIC',
    cooling: 'Air Cooling',
    images: [
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop'
    ],
    featured: false,
    new: false
  },
  {
    name: 'Bitmain Antminer L7',
    slug: 'bitmain-antminer-l7',
    description: 'The Antminer L7 is specifically designed for Litecoin and Dogecoin mining, delivering 9050 MH/s hashrate with excellent efficiency.',
    price: 14999.99,
    type: 'ASIC',
    cooling: 'Air Cooling',
    images: [
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop'
    ],
    featured: true,
    new: true
  },
  {
    name: 'Goldshell KD5',
    slug: 'goldshell-kd5',
    description: 'The Goldshell KD5 is a compact and efficient Kadena miner with 18.7 TH/s hashrate, perfect for home mining operations.',
    price: 8999.99,
    type: 'ASIC',
    cooling: 'Air Cooling',
    images: [
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop'
    ],
    featured: false,
    new: true
  },
  {
    name: 'NVIDIA RTX 4090 Mining Rig',
    slug: 'nvidia-rtx-4090-mining-rig',
    description: 'Professional GPU mining rig featuring 8x NVIDIA RTX 4090 cards, optimized for Ethereum Classic and other GPU-mineable cryptocurrencies.',
    price: 15999.99,
    type: 'GPU',
    cooling: 'Water Cooling',
    images: [
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop'
    ],
    featured: true,
    new: true
  },
  {
    name: 'AMD RX 6800 XT Mining Rig',
    slug: 'amd-rx-6800-xt-mining-rig',
    description: 'Cost-effective GPU mining solution with 6x AMD RX 6800 XT cards, offering excellent performance for multiple cryptocurrencies.',
    price: 8999.99,
    type: 'GPU',
    cooling: 'Air Cooling',
    images: [
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop'
    ],
    featured: false,
    new: false
  },
  {
    name: 'Bitmain Antminer D9',
    slug: 'bitmain-antminer-d9',
    description: 'The Antminer D9 is optimized for Dash mining, delivering 2.4 TH/s hashrate with excellent power efficiency and reliability.',
    price: 4999.99,
    type: 'ASIC',
    cooling: 'Air Cooling',
    images: [
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop'
    ],
    featured: false,
    new: false
  },
  {
    name: 'MicroBT WhatsMiner M50',
    slug: 'microbt-whatsminer-m50',
    description: 'The WhatsMiner M50 is the latest generation miner with 126 TH/s hashrate and advanced cooling technology for optimal performance.',
    price: 4499.99,
    type: 'ASIC',
    cooling: 'Liquid Cooling',
    images: [
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop'
    ],
    featured: true,
    new: true
  }
]

const faqs = [
  {
    question: 'What is cryptocurrency mining?',
    answer: 'Cryptocurrency mining is the process of validating transactions and adding them to a blockchain ledger. Miners use specialized hardware to solve complex mathematical problems, and in return, they earn cryptocurrency rewards.',
    category: 'General',
    order: 1
  },
  {
    question: 'Which miner should I buy as a beginner?',
    answer: 'For beginners, we recommend starting with an ASIC miner like the Antminer S19 Pro or a GPU mining rig. ASIC miners are more efficient for specific cryptocurrencies, while GPUs offer more flexibility.',
    category: 'Getting Started',
    order: 2
  },
  {
    question: 'How much electricity does mining consume?',
    answer: 'Electricity consumption varies by hardware. ASIC miners typically consume 3000-3500W, while GPU rigs use 1000-1500W. Always calculate your electricity costs before investing.',
    category: 'Technical',
    order: 3
  },
  {
    question: 'What is the ROI on mining hardware?',
    answer: 'ROI depends on multiple factors: hardware cost, electricity rates, cryptocurrency prices, and network difficulty. Generally, miners aim for 6-12 month ROI periods.',
    category: 'Profitability',
    order: 4
  },
  {
    question: 'Do you provide technical support?',
    answer: 'Yes, we offer 24/7 technical support for all our products. Our team can help with setup, optimization, troubleshooting, and maintenance.',
    category: 'Support',
    order: 5
  }
]

const pageContents = [
  {
    page: 'home',
    title: 'CM Crypto Miners - Premium Cryptocurrency Mining Hardware',
    content: 'Your trusted partner for cryptocurrency mining hardware. We offer the latest ASIC and GPU miners with expert support and competitive pricing.',
    metaTitle: 'CM Crypto Miners | Premium Mining Hardware',
    metaDescription: 'Shop the best cryptocurrency mining hardware at CM. ASIC miners, GPU rigs, and expert support for profitable mining.'
  },
  {
    page: 'about',
    title: 'About CM Crypto Miners',
    content: 'Learn about our journey to become one of the most trusted crypto mining hardware providers in the industry.',
    metaTitle: 'About CM | Our Story and Mission',
    metaDescription: 'Discover CM Crypto Miners - our history, team, and commitment to providing the best mining hardware and support.'
  },
  {
    page: 'contact',
    title: 'Contact CM Crypto Miners',
    content: 'Get in touch with our expert team for product inquiries, technical support, or sales assistance.',
    metaTitle: 'Contact CM | Get Support and Sales Help',
    metaDescription: 'Contact CM Crypto Miners for expert support, product inquiries, and sales assistance. Available 24/7.'
  }
]

async function main() {
  console.log('Start seeding...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@cmminers.com' },
    update: {},
    create: {
      email: 'admin@cmminers.com',
      username: 'admin',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN'
    }
  })

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 12)
  const regularUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      username: 'testuser',
      name: 'Test User',
      password: userPassword,
      role: 'USER'
    }
  })

  console.log('Created users:', { adminUser, regularUser })

  // Create products
  for (const miner of cryptoMiners) {
    await prisma.product.upsert({
      where: { slug: miner.slug },
      update: {
        ...miner,
        images: JSON.stringify(miner.images)
      },
      create: {
        ...miner,
        images: JSON.stringify(miner.images)
      }
    })
  }

  console.log('Created products:', cryptoMiners.length)

  // Create FAQs
  for (const faq of faqs) {
    await prisma.fAQ.create({
      data: faq
    })
  }

  console.log('Created FAQs:', faqs.length)

  // Create page contents
  for (const pageContent of pageContents) {
    await prisma.pageContent.upsert({
      where: { page: pageContent.page },
      update: pageContent,
      create: pageContent
    })
  }

  console.log('Created page contents:', pageContents.length)

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })