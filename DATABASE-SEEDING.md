# Database Seeding Guide

## 🌱 How to Seed Your Database

After creating your database with tables, you need to populate it with sample data. Here's how:

### Method 1: Use the Seed Script (Recommended)

#### Windows Batch File:
```cmd
# Run as normal user (no admin needed)
seed-database.bat
```

#### Windows PowerShell:
```powershell
.\seed-database.ps1
```

#### Manual Command:
```cmd
npm run db:seed
```

### Method 2: Manual Seeding

```cmd
# 1. Generate Prisma client
npx prisma generate

# 2. Run seed script
npx tsx prisma/seed.ts
```

## 📊 What Data Gets Seeded?

### Users (2 records)
- **Admin**: admin@cmminers.com / admin123
- **Regular User**: user@example.com / user123

### Products (6 records)
- Antminer S19 Pro (ASIC, $2999.99)
- WhatsMiner M30S++ (ASIC, $2799.99)
- AvalonMiner 1246 (ASIC, $1899.99)
- RTX 4090 Mining Rig (GPU, $15999.99)
- RX 6800 XT Mining Rig (GPU, $8999.99)
- Innosilicon T3+ (ASIC, $1299.99)

### Orders (3 sample orders)
- Order #ORD-2024-001 (Delivered)
- Order #ORD-2024-002 (Processing)
- Order #ORD-2024-003 (Pending)

### Blog Posts (3 posts)
- Bitcoin Mining in 2024: Complete Guide
- ASIC vs GPU Mining: Which is Better?
- How to Calculate Mining Profitability

### Page Content (3 pages)
- Home page content
- About page content
- Contact page content

### FAQ Items (8 items)
- General questions
- Profitability questions
- Hardware questions
- Shipping questions
- Payment questions
- Support questions
- Warranty questions

## 🔧 Troubleshooting

### Error: "Cannot find module 'bcryptjs'"
```cmd
npm install bcryptjs
npm run db:seed
```

### Error: "Database not found"
```cmd
npx prisma db push
npm run db:seed
```

### Error: "Prisma Client not generated"
```cmd
npx prisma generate
npm run db:seed
```

### Error: "Permission denied"
- Run Command Prompt as Administrator
- Or use PowerShell as Administrator

## 🧪 Testing the Data

After seeding, you can test the data:

### 1. Check Database File
```cmd
dir db\custom.db
```

### 2. Test Admin Login
- Go to http://localhost:3000/auth/signin
- Email: admin@cmminers.com
- Password: admin123

### 3. Test User Login
- Go to http://localhost:3000/auth/signin
- Email: user@example.com
- Password: user123

### 4. Check Products
- Go to http://localhost:3000/shop
- You should see 6 products

### 5. Check Admin Panel
- Login as admin
- Go to http://localhost:3000/admin
- You should see all data in the admin interface

## 🔄 Resetting Database

If you want to start fresh:

```cmd
# Delete database
del db\custom.db

# Recreate and seed
npx prisma db push
npm run db:seed
```

## 📝 Customizing Seed Data

To modify the seed data:

1. Edit `prisma/seed.ts`
2. Add/remove products, users, orders, etc.
3. Run `npm run db:seed` again

## 🚀 Next Steps

After seeding:
1. Start development server: `npm run dev`
2. Login as admin: admin@cmminers.com / admin123
3. Explore the admin panel
4. Test the shop functionality
5. Modify data as needed