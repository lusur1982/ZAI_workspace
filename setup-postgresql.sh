#!/bin/bash

# =============================================================================
# POSTGRESQL SETUP SCRIPT - LOCAL DEVELOPMENT
# =============================================================================
# Rýchly setup skript pre lokálny development s PostgreSQL
# =============================================================================

set -e

# Farby
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

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
# KONTROLA PREREQUISITES
# =============================================================================

log_info "Kontrolujem prerequisites..."

if ! command -v psql &> /dev/null; then
    log_error "PostgreSQL nie je nainštalované. Prosím nainštalujte PostgreSQL."
    log_info "Ubuntu/Debian: sudo apt-get install postgresql postgresql-contrib"
    log_info "macOS: brew install postgresql"
    log_info "Windows: Stiahnite z https://www.postgresql.org/download/windows/"
    exit 1
fi

if ! command -v node &> /dev/null; then
    log_error "Node.js nie je nainštalované."
    exit 1
fi

log_success "Prerequisites OK!"

# =============================================================================
# KONFIGURÁCIA
# =============================================================================

log_info "Konfigurujem PostgreSQL setup..."

# Default hodnoty
DB_NAME="cm_miners_db"
DB_USER="cm_miners_user"
DB_PASSWORD="cm_miners_password"
DB_HOST="localhost"
DB_PORT="5432"

# Požiadanie na potvrdenie alebo zmenu
echo -e "${YELLOW}Databázová konfigurácia:${NC}"
echo "Database name: $DB_NAME"
echo "User: $DB_USER"
echo "Password: $DB_PASSWORD"
echo "Host: $DB_HOST"
echo "Port: $DB_PORT"
echo ""

read -p "Chcete použiť tieto hodnoty? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    read -p "Zadajte názov databázy [$DB_NAME]: " new_db_name
    DB_NAME=${new_db_name:-$DB_NAME}
    
    read -p "Zadajte používateľa [$DB_USER]: " new_db_user
    DB_USER=${new_db_user:-$DB_USER}
    
    read -s -p "Zadajte heslo: " new_db_password
    echo
    if [ -n "$new_db_password" ]; then
        DB_PASSWORD=$new_db_password
    fi
fi

# =============================================================================
# POSTGRESQL SETUP
# =============================================================================

log_info "Vytváram PostgreSQL databázu a používateľa..."

# Spustenie PostgreSQL service (ak je potrebné)
if command -v systemctl &> /dev/null; then
    sudo systemctl start postgresql || log_warning "Nepodarilo sa spustiť PostgreSQL service"
fi

# Vytvorenie databázy a používateľa
sudo -u postgres psql << EOF
-- Vytvorenie používateľa
DO
\$do\$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = '$DB_USER') THEN

      CREATE ROLE $DB_USER LOGIN PASSWORD '$DB_PASSWORD';
   END IF
END
\$do\$;

-- Vytvorenie databázy
CREATE DATABASE $DB_NAME OWNER $DB_USER;

-- Udelenie práv
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;

-- Pripojenie sa k databáze a nastavenie práv
\c $DB_NAME;

-- Udelenie práv na schéme
GRANT ALL ON SCHEMA public TO $DB_USER;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $DB_USER;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $DB_USER;

-- Default práva pre budúce tabuľky
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO $DB_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO $DB_USER;

EOF

if [ $? -eq 0 ]; then
    log_success "PostgreSQL databáza a používateľ vytvorený!"
else
    log_error "Chyba pri vytváraní PostgreSQL databázy"
    exit 1
fi

# =============================================================================
# PROJECT SETUP
# =============================================================================

log_info "Aktualizujem projekt pre PostgreSQL..."

# Inštalácia PostgreSQL balíčkov
npm install pg @types/pg --save

# Vytvorenie .env súboru
cat > .env << EOF
# PostgreSQL Database Configuration
DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="cm-miners-secret-key-$(date +%s)"

# Development
NODE_ENV="development"
EOF

log_success ".env súbor vytvorený"

# =============================================================================
# PRISMA SETUP
# =============================================================================

log_info "Aktualizujem Prisma schema..."

# Aktualizácia Prisma schema
cat > prisma/schema.prisma << 'EOF'
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

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

# =============================================================================
# PRISMA INITIALIZÁCIA
# =============================================================================

log_info "Inicializujem Prisma..."

# Vygenerovanie Prisma client
npx prisma generate

# Vytvorenie tabuliek v PostgreSQL
npx prisma db push

if [ $? -eq 0 ]; then
    log_success "Prisma inicializácia dokončená!"
else
    log_error "Chyba pri Prisma inicializácii"
    exit 1
fi

# =============================================================================
# SEED DATA
# =============================================================================

log_info "Vytváram seed data..."

# Vytvorenie seed skriptu
cat > prisma/seed.ts << 'EOF'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Creating seed data...');

  // Admin user
  await prisma.user.upsert({
    where: { email: 'admin@cmminers.com' },
    update: {},
    create: {
      email: 'admin@cmminers.com',
      username: 'admin',
      name: 'Admin User',
      password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq9w5GS', // admin123
      role: 'ADMIN',
    },
  });

  // Products
  const products = [
    {
      name: 'Antminer S19 Pro',
      slug: 'antminer-s19-pro',
      description: 'The most powerful Bitcoin miner with 110 TH/s hashrate and 3250W power consumption.',
      price: 2999.99,
      type: 'ASIC',
      cooling: 'Air Cooling',
      images: '["/images/products/antminer-s19-pro.jpg"]',
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
      images: '["/images/products/whatsminer-m30s.jpg"]',
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
      images: '["/images/products/rtx-4090-rig.jpg"]',
      featured: false,
      new: true,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  // FAQ
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
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq });
  }

  console.log('✅ Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
EOF

# Spustenie seed skriptu
npx tsx prisma/seed.ts

if [ $? -eq 0 ]; then
    log_success "Seed data vytvorené!"
else
    log_warning "Seed data sa nepodarilo vytvoriť, môžete to urobiť neskôr s: npx tsx prisma/seed.ts"
fi

# =============================================================================
# PACKAGE.JSON SKRIPTY
# =============================================================================

log_info "Aktualizujem package.json skripty..."

npm pkg set scripts.db:setup="npx prisma db push"
npm pkg set scripts.db:seed="npx tsx prisma/seed.ts"
npm pkg set scripts.db:reset="npx prisma db push --force-reset && npm run db:seed"

# =============================================================================
# TEST SPOJENIA
# =============================================================================

log_info "Testujem spojenie s databázou..."

# Testovací skript
cat > test-db-connection.js << 'EOF'
const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  const prisma = new PrismaClient();
  
  try {
    await prisma.$connect();
    console.log('✅ PostgreSQL connection successful!');
    
    // Test query
    const userCount = await prisma.user.count();
    const productCount = await prisma.product.count();
    
    console.log(`👥 Users: ${userCount}`);
    console.log(`📦 Products: ${productCount}`);
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
EOF

node test-db-connection.js

if [ $? -eq 0 ]; then
    log_success "Databázové spojenie funguje!"
    rm test-db-connection.js
else
    log_error "Databázové spojenie zlyhalo"
    exit 1
fi

# =============================================================================
# DOKONČENIE
# =============================================================================

log_success "🎉 POSTGRESQL SETUP DOKONČENÝ!"
echo ""
log_info "📋 Zhrnutie:"
echo "🗄️  Database: $DB_NAME"
echo "👤 User: $DB_USER"
echo "🔗 Host: $DB_HOST:$DB_PORT"
echo ""
log_info "🚀 Spustenie projektu:"
echo "npm run dev"
echo ""
log_info "📊 Dostupné skripty:"
echo "npm run db:setup    - Nastavenie databázy"
echo "npm run db:seed     - Seed data"
echo "npm run db:reset    - Reset a seed"
echo ""
log_success "✅ Projekt je pripravený na PostgreSQL!"

exit 0