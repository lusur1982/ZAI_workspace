#!/bin/bash

echo "🚀 Starting deployment process..."

# Check if we're in production environment
if [ "$NODE_ENV" = "production" ]; then
    echo "🐘 Setting up PostgreSQL database..."
    
    # Wait for database to be ready (if using Docker Compose)
    if [ "$DATABASE_URL" != "" ]; then
        echo "⏳ Waiting for database..."
        sleep 10
        
        # Run database migrations
        echo "🔄 Running database migrations..."
        npx prisma migrate deploy
        
        # Seed the database
        echo "🌱 Seeding database..."
        npm run db:seed
    fi
    
    echo "🏗️  Building application..."
    npm run build
    
    echo "🎯 Starting production server..."
    npm start
else
    echo "🔧 Development environment detected"
    echo "🗄️  Setting up local database..."
    npm run db:setup
    
    echo "🚀 Starting development server..."
    npm run dev
fi