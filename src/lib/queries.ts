import { db } from '@/lib/db'
import { cache } from 'react'

// Cached database operations with optimized queries
export const getCachedProducts = cache(async () => {
  try {
    const products = await db.product.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        type: true,
        cooling: true,
        images: true,
        featured: true,
        new: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 20, // Reduced for better performance
    })
    
    // Parse images once
    return products.map(product => ({
      ...product,
      images: JSON.parse(product.images || '[]')
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
})

export const getCachedProductBySlug = cache(async (slug: string) => {
  try {
    const product = await db.product.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        type: true,
        cooling: true,
        images: true,
        featured: true,
        new: true,
        createdAt: true,
        updatedAt: true,
      }
    })
    
    if (!product) return null
    
    return {
      ...product,
      images: JSON.parse(product.images || '[]')
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
})

export const getCachedFeaturedProducts = cache(async () => {
  try {
    const products = await db.product.findMany({
      where: { featured: true },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        type: true,
        cooling: true,
        images: true,
        featured: true,
        new: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 6, // Reduced for better performance
    })
    
    return products.map(product => ({
      ...product,
      images: JSON.parse(product.images || '[]')
    }))
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
})

export const getCachedNewProducts = cache(async () => {
  try {
    const products = await db.product.findMany({
      where: { new: true },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        type: true,
        cooling: true,
        images: true,
        featured: true,
        new: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 6, // Reduced for better performance
    })
    
    return products.map(product => ({
      ...product,
      images: JSON.parse(product.images || '[]')
    }))
  } catch (error) {
    console.error('Error fetching new products:', error)
    return []
  }
})

export const getCachedBlogPosts = cache(async () => {
  try {
    const posts = await db.blog.findMany({
      where: { published: true },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        published: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 10, // Reduced for better performance
    })
    return posts
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
})

export const getCachedFAQs = cache(async () => {
  try {
    const faqs = await db.fAQ.findMany({
      select: {
        id: true,
        question: true,
        answer: true,
        order: true,
      },
      orderBy: { order: 'asc' },
    })
    return faqs
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }
})

export const getCachedPageContent = cache(async (page: string) => {
  try {
    const content = await db.pageContent.findUnique({
      where: { page },
      select: {
        id: true,
        page: true,
        title: true,
        content: true,
        metaTitle: true,
        metaDescription: true,
      }
    })
    return content
  } catch (error) {
    console.error('Error fetching page content:', error)
    return null
  }
})