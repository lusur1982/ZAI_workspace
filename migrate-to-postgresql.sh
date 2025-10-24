#!/bin/bash

# =============================================================================
# MIGRATION SCRIPT: SQLite to PostgreSQL
# =============================================================================
# Tento skript kompletně migruje projekt z SQLite na PostgreSQL
# Autor: Claude Code Assistant
# Verzia: 1.0
# =============================================================================

set -e  # Zastaviť skript pri akejkoľvek chybe

# Farby pre výstup
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logovanie funkcie
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# =============================================================================
# KONFIGURAČNÁ SEKCIA
# =============================================================================

log_info "Spúšťam migračný skript SQLite → PostgreSQL..."

# Kontrola, či je node.js nainštalované
if ! command -v node &> /dev/null; then
    log_error "Node.js nie je nainštalované. Prosím nainštalujte Node.js najprv."
    exit 1
fi

# Kontrola, či je npm nainštalované
if ! command -v npm &> /dev/null; then
    log_error "NPM nie je nainštalované. Prosím nainštalujte NPM najprv."
    exit 1
fi

# =============================================================================
# BACKUP SEKCIA
# =============================================================================

log_info "Vytváram zálohu existujúcich súborov..."

# Vytvorenie záložného priečinka
BACKUP_DIR="./backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Záloha dôležitých súborov
if [ -f "prisma/schema.prisma" ]; then
    cp prisma/schema.prisma "$BACKUP_DIR/schema.prisma.backup"
    log_success "Záloha schema.prisma vytvorená"
fi

if [ -f ".env" ]; then
    cp .env "$BACKUP_DIR/.env.backup"
    log_success "Záloha .env súboru vytvorená"
fi

if [ -f "db.sqlite" ]; then
    cp db.sqlite "$BACKUP_DIR/db.sqlite.backup"
    log_success "Záloha SQLite databázy vytvorená"
fi

# =============================================================================
# POSTGRESQL BALÍČKY
# =============================================================================

log_info "Inštalujem PostgreSQL balíčky..."

# Inštalácia pg balíčka
npm install pg @types/pg --save

# Inštalácia Prisma PostgreSQL client
npm install @prisma/client --save-dev

log_success "PostgreSQL balíčky nainštalované"

# =============================================================================
# PRISMA SCHEMA AKTUALIZÁCIA
# =============================================================================

log_info "Aktualizujem Prisma schema pre PostgreSQL..."

# Vytvorenie novej PostgreSQL schema
cat > prisma/schema.prisma << 'EOF'
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  username      String?   @unique
  name          String?
  password      String?
  role          UserRole  @default(USER)
  phone         String?
  address       String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  accounts      Account[]
  sessions      Session[]
  
  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  
  @@unique([identifier, token])
  @@map("verification_tokens")
}

model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String
  price       Float
  type        String
  cooling     String
  images      String   // JSON string of image URLs
  featured    Boolean  @default(false)
  new         Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("products")
}

model Order {
  id                  String      @id @default(cuid())
  orderNumber         String      @unique
  customerFirstName   String
  customerLastName    String
  customerEmail       String
  customerPhone       String?
  customerAddress     String
  customerCity        String
  customerState       String
  customerZipCode     String
  customerCountry     String
  subtotal            Float
  shipping            Float
  tax                 Float
  total               Float
  status              OrderStatus @default(PENDING)
  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt
  
  // Relations
  orderItems          OrderItem[]
  
  @@map("orders")
}

model OrderItem {
  id            String  @id @default(cuid())
  orderId       String
  productId     String
  productName   String
  productPrice  Float
  quantity      Int
  total         Float
  
  // Relations
  order         Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  
  @@map("order_items")
}

model Blog {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     String
  excerpt     String?
  published   Boolean  @default(false)
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("blogs")
}

model PageContent {
  id          String   @id @default(cuid())
  page        String   @unique
  title       String
  content     String
  metaTitle   String?
  metaDescription String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("page_contents")
}

model FAQ {
  id          String   @id @default(cuid())
  question    String
  answer      String
  category    String?
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("faqs")
}

enum UserRole {
  USER
  ADMIN
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}
EOF

log_success "Prisma schema aktualizovaná pre PostgreSQL"

# =============================================================================
# ENVIRONMENT KONFIGURÁCIA
# =============================================================================

log_info "Vytváram .env súbor pre PostgreSQL..."

# Vytvorenie novej .env konfigurácie
cat > .env << 'EOF'
# Database Configuration
# Nahraďte s vašou PostgreSQL connection string
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Other Configuration
NODE_ENV="development"
EOF

log_warning "⚠️  VYŽADUJE SA MANUÁLNA ÚPRAVA:"
log_warning "Upravte .env súbor a nastavte vašu PostgreSQL DATABASE_URL"
log_warning "Príklad: postgresql://mojuser:mojeheslo@localhost:5432/mojadb"

# =============================================================================
# DATA MIGRATION SKRIPT
# =============================================================================

log_info "Vytváram data migration skript..."

mkdir -p scripts

cat > scripts/migrate-data.js << 'EOF'
const { PrismaClient } = require('@prisma/client');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

async function migrateData() {
  console.log('🔄 Spúšťam migráciu dát z SQLite do PostgreSQL...');
  
  // SQLite connection
  const sqliteDb = new sqlite3.Database('./db.sqlite');
  
  // PostgreSQL connection
  const prisma = new PrismaClient();
  
  try {
    // 1. Migrácia Userov
    console.log('📤 Migrácia užívateľov...');
    const users = await new Promise((resolve, reject) => {
      sqliteDb.all('SELECT * FROM users', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    for (const user of users) {
      await prisma.user.upsert({
        where: { email: user.email },
        update: user,
        create: user
      });
    }
    console.log(`✅ Migrovaných ${users.length} užívateľov`);
    
    // 2. Migrácia Produktov
    console.log('📦 Migrácia produktov...');
    const products = await new Promise((resolve, reject) => {
      sqliteDb.all('SELECT * FROM products', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    for (const product of products) {
      await prisma.product.create({
        data: product
      });
    }
    console.log(`✅ Migrovaných ${products.length} produktov`);
    
    // 3. Migrácia Objednávok
    console.log('🛒 Migrácia objednávok...');
    const orders = await new Promise((resolve, reject) => {
      sqliteDb.all('SELECT * FROM orders', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    for (const order of orders) {
      await prisma.order.create({
        data: order
      });
    }
    console.log(`✅ Migrovaných ${orders.length} objednávok`);
    
    // 4. Migrácia Order Items
    console.log('📋 Migrácia položiek objednávok...');
    const orderItems = await new Promise((resolve, reject) => {
      sqliteDb.all('SELECT * FROM order_items', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    for (const item of orderItems) {
      await prisma.orderItem.create({
        data: item
      });
    }
    console.log(`✅ Migrovaných ${orderItems.length} položiek objednávok`);
    
    // 5. Migrácia Blogov
    console.log('📝 Migrácia blogov...');
    const blogs = await new Promise((resolve, reject) => {
      sqliteDb.all('SELECT * FROM blogs', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    for (const blog of blogs) {
      await prisma.blog.create({
        data: blog
      });
    }
    console.log(`✅ Migrovaných ${blogs.length} blogov`);
    
    // 6. Migrácia FAQ
    console.log('❓ Migrácia FAQ...');
    const faqs = await new Promise((resolve, reject) => {
      sqliteDb.all('SELECT * FROM faqs', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    for (const faq of faqs) {
      await prisma.fAQ.create({
        data: faq
      });
    }
    console.log(`✅ Migrovaných ${faqs.length} FAQ`);
    
    // 7. Migrácia Page Content
    console.log('📄 Migrácia stránok...');
    const pageContents = await new Promise((resolve, reject) => {
      sqliteDb.all('SELECT * FROM page_contents', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    for (const page of pageContents) {
      await prisma.pageContent.create({
        data: page
      });
    }
    console.log(`✅ Migrovaných ${pageContents.length} stránok`);
    
    console.log('🎉 Migrácia dát úspešne dokončená!');
    
  } catch (error) {
    console.error('❌ Chyba pri migrácii dát:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
    sqliteDb.close();
  }
}

// Spustenie migrácie len ak je tento súbor spustený priamo
if (require.main === module) {
  migrateData().catch(console.error);
}

module.exports = { migrateData };
EOF

log_success "Data migration skript vytvorený"

# =============================================================================
# SEED SKRIPT
# =============================================================================

log_info "Vytváram seed skript s ukážkovými dátami..."

cat > prisma/seed.ts << 'EOF'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Spúšťam seed skript pre PostgreSQL...');

  // Vymazanie existujúcich dát
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.pageContent.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.product.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // Vytvorenie admin užívateľa
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@cmminers.com',
      username: 'admin',
      name: 'Admin User',
      password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq9w5GS', // password: admin123
      role: 'ADMIN',
    },
  });

  // Vytvorenie testovacieho užívateľa
  const testUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      username: 'testuser',
      name: 'Test User',
      password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq9w5GS', // password: admin123
      role: 'USER',
    },
  });

  // Vytvorenie produktov
  const products = [
    {
      name: 'Antminer S19 Pro',
      slug: 'antminer-s19-pro',
      description: 'The most powerful Bitcoin miner with 110 TH/s hashrate and 3250W power consumption.',
      price: 2999.99,
      type: 'ASIC',
      cooling: 'Air Cooling',
      images: '["/images/antminer-s19-pro-1.jpg", "/images/antminer-s19-pro-2.jpg"]',
      featured: true,
      new: false,
    },
    {
      name: 'WhatsMiner M30S++',
      slug: 'whatsminer-m30s-plus',
      description: 'High-performance Bitcoin miner with 112 TH/s hashrate and 3472W power consumption.',
      price: 3199.99,
      type: 'ASIC',
      cooling: 'Air Cooling',
      images: '["/images/whatsminer-m30s-1.jpg", "/images/whatsminer-m30s-2.jpg"]',
      featured: true,
      new: false,
    },
    {
      name: 'RTX 4090 Mining Rig',
      slug: 'rtx-4090-mining-rig',
      description: 'Professional GPU mining rig with 8x RTX 4090 for Ethereum and other altcoins.',
      price: 15999.99,
      type: 'GPU',
      cooling: 'Water Cooling',
      images: '["/images/rtx-4090-rig-1.jpg", "/images/rtx-4090-rig-2.jpg"]',
      featured: false,
      new: true,
    },
    {
      name: 'AvalonMiner 1246',
      slug: 'avalonminer-1246',
      description: 'Efficient Bitcoin miner with 90 TH/s hashrate and 3420W power consumption.',
      price: 2499.99,
      type: 'ASIC',
      cooling: 'Air Cooling',
      images: '["/images/avalonminer-1246-1.jpg", "/images/avalonminer-1246-2.jpg"]',
      featured: false,
      new: false,
    },
    {
      name: 'Innosilicon T3+',
      slug: 'innosilicon-t3-plus',
      description: 'Powerful Bitcoin miner with 53 TH/s hashrate and 2100W power consumption.',
      price: 1899.99,
      type: 'ASIC',
      cooling: 'Air Cooling',
      images: '["/images/innosilicon-t3-plus-1.jpg", "/images/innosilicon-t3-plus-2.jpg"]',
      featured: false,
      new: true,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  // Vytvorenie FAQ
  const faqs = [
    {
      question: 'What is cryptocurrency mining?',
      answer: 'Cryptocurrency mining is the process of validating transactions and adding them to a blockchain ledger.',
      category: 'General',
      order: 1,
    },
    {
      question: 'Which miner should I buy as a beginner?',
      answer: 'For beginners, we recommend starting with an ASIC miner like the Antminer S19 or a GPU mining rig.',
      category: 'Getting Started',
      order: 2,
    },
    {
      question: 'How much electricity does mining consume?',
      answer: 'Electricity consumption varies by hardware. ASIC miners typically consume 3000-3500W, while GPU rigs use 1000-1500W.',
      category: 'Technical',
      order: 3,
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq });
  }

  // Vytvorenie Page Content
  const pages = [
    {
      page: 'about',
      title: 'About CM Crypto Miners',
      content: 'Your trusted partner in cryptocurrency mining hardware since 2018.',
      metaTitle: 'About Us - CM Crypto Miners',
      metaDescription: 'Learn about CM Crypto Miners, your trusted partner in cryptocurrency mining hardware.',
    },
    {
      page: 'contact',
      title: 'Contact CM Crypto Miners',
      content: 'Get in touch with our team for expert support and guidance.',
      metaTitle: 'Contact Us - CM Crypto Miners',
      metaDescription: 'Contact CM Crypto Miners for expert support and guidance on cryptocurrency mining hardware.',
    },
  ];

  for (const page of pages) {
    await prisma.pageContent.create({ data: page });
  }

  // Vytvorenie blog posts
  const blogs = [
    {
      title: 'Complete Guide to Bitcoin Mining in 2024',
      slug: 'complete-guide-bitcoin-mining-2024',
      content: 'Learn everything you need to know about Bitcoin mining in 2024...',
      excerpt: 'Comprehensive guide to Bitcoin mining for beginners and experts.',
      published: true,
      featured: true,
    },
    {
      title: 'ASIC vs GPU Mining: Which is Better?',
      slug: 'asic-vs-gpu-mining-comparison',
      content: 'Detailed comparison between ASIC and GPU mining options...',
      excerpt: 'Compare ASIC and GPU mining to find the best option for you.',
      published: true,
      featured: false,
    },
  ];

  for (const blog of blogs) {
    await prisma.blog.create({ data: blog });
  }

  console.log('✅ Seed skript úspešne dokončený!');
  console.log(`👥 Vytvorení užívatelia: ${2}`);
  console.log(`📦 Vytvorené produkty: ${products.length}`);
  console.log(`❓ Vytvorené FAQ: ${faqs.length}`);
  console.log(`📄 Vytvorené stránky: ${pages.length}`);
  console.log(`📝 Vytvorené blogy: ${blogs.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Chyba v seed skripte:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
EOF

log_success "Seed skript vytvorený"

# =============================================================================
# PACKAGE.JSON AKTUALIZÁCIA
# =============================================================================

log_info "Aktualizujem package.json skripty..."

# Kontrola, či existuje package.json
if [ -f "package.json" ]; then
    # Pridanie PostgreSQL skriptov
    npm pkg set scripts.migrate:pg="node scripts/migrate-data.js"
    npm pkg set scripts.db:setup:pg="npx prisma db push"
    npm pkg set scripts.db:seed:pg="npx tsx prisma/seed.ts"
    npm pkg set scripts.db:reset:pg="npx prisma db push --force-reset && npm run db:seed:pg"
    
    log_success "Package.json skripty aktualizované"
else
    log_error "package.json nebol nájdený"
fi

# =============================================================================
# DOKONČENIE MIGRÁCIE
# =============================================================================

log_success "🎉 MIGRÁCIA DOKONČENÁ!"
log_info ""
log_info "📋 Ďalšie kroky:"
log_info "1. Upravte .env súbor s vašou PostgreSQL DATABASE_URL"
log_info "2. Vytvorte PostgreSQL databázu"
log_info "3. Spustite: npx prisma db push"
log_info "4. Spustite: npm run migrate:pg"
log_info "5. Spustite: npm run dev"
log_info ""
log_info "📁 Záloha súborov: $BACKUP_DIR"
log_info ""
log_success "✅ Projekt je pripravený na PostgreSQL!"

exit 0