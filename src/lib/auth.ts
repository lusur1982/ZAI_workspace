import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { db } from './db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  debug: process.env.NODE_ENV === 'development',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('Authorize attempt:', credentials?.email)
        
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials')
          return null
        }

        try {
          const user = await db.user.findUnique({
            where: {
              email: credentials.email
            }
          })

          console.log('User found:', user ? user.email : 'Not found')

          if (!user || !user.password) {
            console.log('User or password missing')
            return null
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          )

          console.log('Password match:', passwordMatch)

          if (!passwordMatch) {
            return null
          }

          const result = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt,
          }
          
          console.log('Authentication successful for:', result.email)
          return result
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          role: user.role,
          createdAt: user.createdAt,
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          role: token.role,
          createdAt: token.createdAt,
        }
      }
    }
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  }
}