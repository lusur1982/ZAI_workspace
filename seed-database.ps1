# Seed database with sample data for Windows PowerShell
Write-Host "Seeding database with sample data..." -ForegroundColor Green
Write-Host ""

# Check if database exists
if (!(Test-Path "db\custom.db")) {
    Write-Host "Database not found. Creating database first..." -ForegroundColor Yellow
    npx prisma db push
}

# Run the seed script
Write-Host "Running seed script..." -ForegroundColor Yellow
npm run db:seed

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Database seeded successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Sample data created:" -ForegroundColor Cyan
    Write-Host "   👤 Admin user: admin@cmminers.com / admin123"
    Write-Host "   👤 Regular user: user@example.com / user123"
    Write-Host "   📦 6 Products (ASIC and GPU miners)"
    Write-Host "   📋 3 Sample orders"
    Write-Host "   📝 3 Blog posts"
    Write-Host "   📄 3 Page content entries"
    Write-Host "   ❓ 8 FAQ items"
    Write-Host ""
    Write-Host "You can now run: npm run dev" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ Error during database seeding!" -ForegroundColor Red
    Write-Host "Please check the error messages above." -ForegroundColor Red
}

Read-Host "Press Enter to exit"