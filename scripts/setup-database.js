#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up database configuration...');

// Check if we're in production environment
const isProduction = process.env.NODE_ENV === 'production';
const hasPostgresEnv = process.env.POSTGRES_URL || (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgresql://'));

console.log(`📍 Environment: ${isProduction ? 'Production' : 'Development'}`);
console.log(`📍 PostgreSQL available: ${hasPostgresEnv ? 'Yes' : 'No'}`);

// Read current schema
const schemaPath = path.join(process.cwd(), 'prisma/schema.prisma');
let schemaContent = fs.readFileSync(schemaPath, 'utf8');

// Set appropriate database configuration
if (isProduction || hasPostgresEnv) {
  console.log('🐘 Configuring for PostgreSQL...');
  
  // Update schema to use PostgreSQL
  schemaContent = schemaContent.replace(
    /provider = "sqlite"/,
    'provider = "postgresql"'
  );
  
  // For production, use PostgreSQL
  if (!process.env.DATABASE_URL && process.env.POSTGRES_URL) {
    process.env.DATABASE_URL = process.env.POSTGRES_URL;
  }
  
  try {
    // Write updated schema
    fs.writeFileSync(schemaPath, schemaContent);
    
    console.log('📦 Installing PostgreSQL dependencies...');
    execSync('npm install pg @types/pg', { stdio: 'inherit' });
    
    console.log('🔄 Running database migrations...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    
    console.log('🌱 Seeding database...');
    execSync('npm run db:seed', { stdio: 'inherit' });
    
  } catch (error) {
    console.error('❌ PostgreSQL setup failed:', error.message);
    console.log('💡 Falling back to SQLite...');
    setupSQLite(schemaContent);
  }
} else {
  console.log('🗄️  Configuring for SQLite...');
  setupSQLite(schemaContent);
}

function setupSQLite(schemaContent) {
  try {
    // Update schema to use SQLite
    schemaContent = schemaContent.replace(
      /provider = "postgresql"/,
      'provider = "sqlite"'
    );
    
    // Write updated schema
    fs.writeFileSync(schemaPath, schemaContent);
    
    // Ensure SQLite database directory exists
    const dbDir = path.join(process.cwd(), 'db');
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    
    console.log('🔄 Running database setup for SQLite...');
    execSync('npx prisma db push', { stdio: 'inherit' });
    
    console.log('🌱 Seeding database...');
    execSync('npm run db:seed', { stdio: 'inherit' });
    
    console.log('✅ SQLite setup completed successfully!');
    
  } catch (error) {
    console.error('❌ SQLite setup failed:', error.message);
    process.exit(1);
  }
}

console.log('🎉 Database setup completed!');