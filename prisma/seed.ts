import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  try {
    // 1. Create Admin User
    console.log('📝 Creating admin user...')
    const hashedPassword = await bcrypt.hash('admin123', 10)
    
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@cmminers.com' },
      update: {},
      create: {
        email: 'admin@cmminers.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN',
        phone: '+421900123456',
        address: 'Bratislava, Slovakia',
      },
    })

    console.log('✅ Admin user created:', adminUser.email)

    // 2. Create Regular User
    console.log('📝 Creating regular user...')
    const userPassword = await bcrypt.hash('user123', 10)
    
    const regularUser = await prisma.user.upsert({
      where: { email: 'user@example.com' },
      update: {},
      create: {
        email: 'user@example.com',
        name: 'John Doe',
        password: userPassword,
        role: 'USER',
        phone: '+421900123457',
        address: 'Košice, Slovakia',
      },
    })

    console.log('✅ Regular user created:', regularUser.email)

    // 3. Create Products
    console.log('📦 Creating products...')
    const products = [
      {
        name: 'Antminer S19 Pro',
        slug: 'antminer-s19-pro',
        description: 'The Antminer S19 Pro is the most powerful Bitcoin miner from Bitmain. With a hashrate of 110 TH/s and power consumption of 3250W, it offers excellent efficiency for serious miners.',
        price: 2999.99,
        type: 'ASIC',
        cooling: 'Air Cooling',
        images: '["/images/products/antminer-s19-pro-1.jpg", "/images/products/antminer-s19-pro-2.jpg"]',
        featured: true,
        new: false,
      },
      {
        name: 'WhatsMiner M30S++',
        slug: 'whatsminer-m30s-plus',
        description: 'WhatsMiner M30S++ delivers 112 TH/s hashrate with 3472W power consumption. Built with advanced cooling technology for optimal performance.',
        price: 2799.99,
        type: 'ASIC',
        cooling: 'Air Cooling',
        images: '["/images/products/whatsminer-m30s-plus-1.jpg", "/images/products/whatsminer-m30s-plus-2.jpg"]',
        featured: true,
        new: true,
      },
      {
        name: 'AvalonMiner 1246',
        slug: 'avalonminer-1246',
        description: 'Canaan AvalonMiner 1246 offers 90 TH/s hashrate with 3420W power consumption. Reliable and efficient mining solution.',
        price: 1899.99,
        type: 'ASIC',
        cooling: 'Air Cooling',
        images: '["/images/products/avalonminer-1246-1.jpg", "/images/products/avalonminer-1246-2.jpg"]',
        featured: false,
        new: true,
      },
      {
        name: 'RTX 4090 Mining Rig',
        slug: 'rtx-4090-mining-rig',
        description: 'Complete mining rig with 8x RTX 4090 GPUs. Perfect for Ethereum Classic and other GPU-minable cryptocurrencies.',
        price: 15999.99,
        type: 'GPU',
        cooling: 'Water Cooling',
        images: '["/images/products/rtx-4090-rig-1.jpg", "/images/products/rtx-4090-rig-2.jpg"]',
        featured: true,
        new: false,
      },
      {
        name: 'RX 6800 XT Mining Rig',
        slug: 'rx-6800-xt-mining-rig',
        description: 'Budget-friendly mining rig with 6x RX 6800 XT GPUs. Great for mining altcoins with excellent efficiency.',
        price: 8999.99,
        type: 'GPU',
        cooling: 'Air Cooling',
        images: '["/images/products/rx-6800-xt-rig-1.jpg", "/images/products/rx-6800-xt-rig-2.jpg"]',
        featured: false,
        new: true,
      },
      {
        name: 'Innosilicon T3+',
        slug: 'innosilicon-t3-plus',
        description: 'Innosilicon T3+ delivers 53 TH/s with 3300W power consumption. Compact and efficient Bitcoin miner.',
        price: 1299.99,
        type: 'ASIC',
        cooling: 'Air Cooling',
        images: '["/images/products/innosilicon-t3-plus-1.jpg", "/images/products/innosilicon-t3-plus-2.jpg"]',
        featured: false,
        new: false,
      },
    ]

    for (const product of products) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: product,
        create: product,
      })
    }

    console.log(`✅ Created ${products.length} products`)

    // 4. Create Sample Orders
    console.log('📋 Creating sample orders...')
    const createdProducts = await prisma.product.findMany()
    
    const sampleOrders = [
      {
        orderNumber: 'ORD-2024-001',
        customerFirstName: 'John',
        customerLastName: 'Smith',
        customerEmail: 'john.smith@email.com',
        customerPhone: '+421900123456',
        customerAddress: 'Hlavná 1, 811 01 Bratislava',
        customerCity: 'Bratislava',
        customerState: 'Bratislava',
        customerZipCode: '81101',
        customerCountry: 'Slovakia',
        subtotal: 2999.99,
        shipping: 29.99,
        tax: 599.99,
        total: 3629.97,
        status: 'DELIVERED',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20'),
      },
      {
        orderNumber: 'ORD-2024-002',
        customerFirstName: 'Maria',
        customerLastName: 'Nováková',
        customerEmail: 'maria.novakova@email.com',
        customerPhone: '+421900123457',
        customerAddress: 'Košická 15, 040 01 Košice',
        customerCity: 'Košice',
        customerState: 'Košický kraj',
        customerZipCode: '04001',
        customerCountry: 'Slovakia',
        subtotal: 2799.99,
        shipping: 29.99,
        tax: 559.99,
        total: 3389.97,
        status: 'PROCESSING',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-02'),
      },
      {
        orderNumber: 'ORD-2024-003',
        customerFirstName: 'Peter',
        customerLastName: 'Kováč',
        customerEmail: 'peter.kovac@email.com',
        customerPhone: '+421900123458',
        customerAddress: 'Námestie Slobody 1, 960 01 Zvolen',
        customerCity: 'Zvolen',
        customerState: 'Banskobystrický kraj',
        customerZipCode: '96001',
        customerCountry: 'Slovakia',
        subtotal: 1899.99,
        shipping: 29.99,
        tax: 379.99,
        total: 2309.97,
        status: 'PENDING',
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date('2024-02-10'),
      },
    ]

    for (const orderData of sampleOrders) {
      const order = await prisma.order.create({
        data: orderData,
      })

      // Create order items for each order
      const randomProduct = createdProducts[Math.floor(Math.random() * createdProducts.length)]
      
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: randomProduct.id,
          productName: randomProduct.name,
          productPrice: randomProduct.price,
          quantity: 1,
          total: randomProduct.price,
        },
      })
    }

    console.log(`✅ Created ${sampleOrders.length} sample orders`)

    // 5. Create Blog Posts
    console.log('📝 Creating blog posts...')
    const blogPosts = [
      {
        title: 'Bitcoin Mining in 2024: Complete Guide',
        slug: 'bitcoin-mining-2024-complete-guide',
        content: `# Bitcoin Mining in 2024: Complete Guide

Bitcoin mining continues to be one of the most profitable ways to earn cryptocurrency. In this comprehensive guide, we'll cover everything you need to know about mining Bitcoin in 2024.

## What is Bitcoin Mining?

Bitcoin mining is the process of validating transactions and adding them to the Bitcoin blockchain. Miners use specialized hardware to solve complex mathematical problems, and in return, they receive newly minted Bitcoin and transaction fees.

## Mining Hardware Options

### ASIC Miners
- **Antminer S19 Pro**: 110 TH/s, 3250W
- **WhatsMiner M30S++**: 112 TH/s, 3472W
- **AvalonMiner 1246**: 90 TH/s, 3420W

### GPU Mining
While not as profitable for Bitcoin, GPUs can still be used for mining other cryptocurrencies.

## Profitability Analysis

To calculate mining profitability, consider:
- Hardware cost
- Electricity consumption
- Mining difficulty
- Bitcoin price

## Getting Started

1. Choose your mining hardware
2. Set up a mining wallet
3. Join a mining pool
4. Configure your mining software
5. Monitor your performance

## Conclusion

Bitcoin mining remains a viable investment in 2024 for those with access to cheap electricity and the right hardware.`,
        excerpt: 'Complete guide to Bitcoin mining in 2024. Learn about hardware options, profitability, and how to get started.',
        published: true,
        featured: true,
      },
      {
        title: 'ASIC vs GPU Mining: Which is Better?',
        slug: 'asic-vs-gpu-mining-comparison',
        content: `# ASIC vs GPU Mining: Which is Better?

When it comes to cryptocurrency mining, one of the biggest decisions you'll face is whether to use ASIC miners or GPUs. Let's break down the pros and cons of each.

## ASIC Mining

### Pros
- Higher hash rates for specific algorithms
- More energy efficient
- Purpose-built for mining
- Lower maintenance

### Cons
- Limited to specific cryptocurrencies
- Higher initial cost
- Can't be used for other tasks
- Rapid obsolescence

## GPU Mining

### Pros
- Versatile - can mine different coins
- Can be used for gaming/other tasks
- Better resale value
- More flexible

### Cons
- Lower hash rates
- Higher power consumption
- More maintenance required
- Shorter lifespan for mining

## Which Should You Choose?

**Choose ASIC if:**
- You want to mine Bitcoin specifically
- You have access to cheap electricity
- You're planning long-term mining

**Choose GPU if:**
- You want flexibility in coin selection
- You might use GPUs for other purposes
- You're just starting out

## Conclusion

Both ASIC and GPU mining have their place in the mining ecosystem. Your choice depends on your specific goals, budget, and technical expertise.`,
        excerpt: 'Compare ASIC and GPU mining options. Find out which is better for your mining needs in 2024.',
        published: true,
        featured: false,
      },
      {
        title: 'How to Calculate Mining Profitability',
        slug: 'how-to-calculate-mining-profitability',
        content: `# How to Calculate Mining Profitability

Understanding mining profitability is crucial for making informed investment decisions. Here's how to calculate it accurately.

## Key Factors

### 1. Hash Rate
Your mining hardware's processing power, measured in TH/s for ASICs or MH/s for GPUs.

### 2. Power Consumption
The amount of electricity your hardware uses, measured in watts.

### 3. Electricity Cost
Your local electricity rate, typically $/kWh.

### 4. Mining Difficulty
Network difficulty affects how many coins you can mine.

### 5. Block Reward
The amount of cryptocurrency received for mining a block.

## Profitability Formula

Daily Revenue = (Hash Rate × Block Reward × 24) ÷ Network Difficulty

Daily Cost = Power Consumption × 24 × Electricity Cost ÷ 1000

Daily Profit = Daily Revenue - Daily Cost

## Example Calculation

Let's calculate profitability for an Antminer S19 Pro:

- Hash Rate: 110 TH/s
- Power: 3250W
- Electricity: $0.10/kWh
- Bitcoin Price: $45,000

Daily Revenue: ~$45
Daily Cost: $7.80
Daily Profit: $37.20

## Tools for Calculation

- WhatToMine
- NiceHash Calculator
- CryptoCompare Calculator

## Conclusion

Always calculate profitability before investing in mining hardware. Consider both short-term and long-term factors.`,
        excerpt: 'Learn how to accurately calculate cryptocurrency mining profitability with our comprehensive guide.',
        published: true,
        featured: false,
      },
    ]

    for (const blog of blogPosts) {
      await prisma.blog.upsert({
        where: { slug: blog.slug },
        update: blog,
        create: blog,
      })
    }

    console.log(`✅ Created ${blogPosts.length} blog posts`)

    // 6. Create Page Content
    console.log('📄 Creating page content...')
    const pageContents = [
      {
        page: 'home',
        title: 'CM Crypto Miners - Premium Cryptocurrency Mining Hardware',
        content: `Welcome to CM Crypto Miners, your trusted partner for premium cryptocurrency mining hardware. We offer the latest ASIC and GPU miners with expert support and competitive pricing.`,
        metaTitle: 'CM Crypto Miners | Premium Mining Hardware',
        metaDescription: 'Shop the best cryptocurrency mining hardware at CM. ASIC miners, GPU rigs, and expert support for profitable mining.',
      },
      {
        page: 'about',
        title: 'About CM Crypto Miners',
        content: `CM Crypto Miners has been a leading supplier of cryptocurrency mining hardware since 2017. We specialize in providing high-quality ASIC miners, GPU rigs, and complete mining solutions to customers worldwide.

Our mission is to make cryptocurrency mining accessible to everyone, from hobbyists to large-scale operations. We work directly with manufacturers to ensure authentic products at competitive prices.

With years of experience in the industry, our team provides expert guidance and support to help you maximize your mining profitability.`,
        metaTitle: 'About CM Crypto Miners | Our Story',
        metaDescription: 'Learn about CM Crypto Miners, your trusted partner for cryptocurrency mining hardware since 2017.',
      },
      {
        page: 'contact',
        title: 'Contact CM Crypto Miners',
        content: `Get in touch with our team for expert advice on cryptocurrency mining hardware. We're here to help you find the perfect mining solution for your needs.

**Address:**
Hlavná 123
811 01 Bratislava
Slovakia

**Phone:**
+421 900 123 456

**Email:**
info@cmminers.com

**Business Hours:**
Monday - Friday: 9:00 AM - 6:00 PM
Saturday: 10:00 AM - 2:00 PM
Sunday: Closed

For technical support and product inquiries, our expert team is ready to assist you.`,
        metaTitle: 'Contact CM Crypto Miners | Get in Touch',
        metaDescription: 'Contact CM Crypto Miners for expert advice on cryptocurrency mining hardware. Visit our showroom or call us today.',
      },
    ]

    for (const pageContent of pageContents) {
      await prisma.pageContent.upsert({
        where: { page: pageContent.page },
        update: pageContent,
        create: pageContent,
      })
    }

    console.log(`✅ Created ${pageContents.length} page content entries`)

    // 7. Create FAQ Items
    console.log('❓ Creating FAQ items...')
    const faqItems = [
      {
        question: 'What is cryptocurrency mining?',
        answer: 'Cryptocurrency mining is the process of validating transactions and adding them to a blockchain ledger. Miners use specialized hardware to solve complex mathematical problems and are rewarded with newly minted cryptocurrency.',
        category: 'General',
        order: 1,
      },
      {
        question: 'How profitable is Bitcoin mining?',
        answer: 'Bitcoin mining profitability depends on several factors including hardware efficiency, electricity costs, mining difficulty, and Bitcoin price. With current conditions and cheap electricity, Bitcoin mining can be very profitable.',
        category: 'Profitability',
        order: 2,
      },
      {
        question: 'What hardware do I need to start mining?',
        answer: 'For Bitcoin mining, you need an ASIC miner. For other cryptocurrencies, you can use GPUs. You\'ll also need a power supply, cooling system, and a mining wallet to receive rewards.',
        category: 'Hardware',
        order: 3,
      },
      {
        question: 'How much electricity does mining use?',
        answer: 'Electricity consumption varies by hardware. ASIC miners typically use 3000-3500W, while GPU rigs use 200-400W per GPU. It\'s important to factor electricity costs into your profitability calculations.',
        category: 'Hardware',
        order: 4,
      },
      {
        question: 'Do you offer international shipping?',
        answer: 'Yes, we ship worldwide! Shipping costs and delivery times vary by location. We offer express shipping to most European countries and standard shipping to other regions.',
        category: 'Shipping',
        order: 5,
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept bank transfers, credit/debit cards, PayPal, and cryptocurrency payments (Bitcoin, Ethereum, and USDT). All cryptocurrency payments receive a 2% discount.',
        category: 'Payment',
        order: 6,
      },
      {
        question: 'Do you provide technical support?',
        answer: 'Yes, we provide comprehensive technical support for all our products. Our team can help with setup, configuration, optimization, and troubleshooting. Support is available via phone, email, and remote desktop.',
        category: 'Support',
        order: 7,
      },
      {
        question: 'What is your warranty policy?',
        answer: 'All new products come with a 12-month manufacturer warranty. We also offer extended warranty options up to 36 months. Warranty covers manufacturing defects and hardware failures under normal use.',
        category: 'Warranty',
        order: 8,
      },
    ]

    for (const faq of faqItems) {
      await prisma.fAQ.upsert({
        where: { id: randomUUID() },
        update: faq,
        create: {
          ...faq,
          id: randomUUID(),
        },
      })
    }

    console.log(`✅ Created ${faqItems.length} FAQ items`)

    console.log('\n🎉 Database seeding completed successfully!')
    console.log('\n📊 Summary:')
    console.log('   👤 Admin user: admin@cmminers.com / admin123')
    console.log('   👤 Regular user: user@example.com / user123')
    console.log(`   📦 Products: ${products.length}`)
    console.log(`   📋 Orders: ${sampleOrders.length}`)
    console.log(`   📝 Blog posts: ${blogPosts.length}`)
    console.log(`   📄 Page contents: ${pageContents.length}`)
    console.log(`   ❓ FAQ items: ${faqItems.length}`)

  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })