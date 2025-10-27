# Fix Prisma SQLite setup for Windows PowerShell
Write-Host "Fixing Prisma SQLite setup..." -ForegroundColor Green
Write-Host ""

# Step 1: Stop any running processes
Write-Host "Step 1: Stopping any running Node.js processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process prisma -ErrorAction SilentlyContinue | Stop-Process -Force

# Step 2: Clean Prisma completely
Write-Host "Step 2: Cleaning Prisma completely..." -ForegroundColor Yellow
if (Test-Path "node_modules\.prisma") {
    Remove-Item -Recurse -Force "node_modules\.prisma"
}
if (Test-Path "node_modules\@prisma") {
    Remove-Item -Recurse -Force "node_modules\@prisma"
}

# Step 3: Clean Next.js cache
Write-Host "Step 3: Cleaning Next.js cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
}

# Step 4: Reinstall dependencies
Write-Host "Step 4: Reinstalling dependencies..." -ForegroundColor Yellow
npm install

# Step 5: Generate Prisma client for SQLite
Write-Host "Step 5: Generating Prisma client for SQLite..." -ForegroundColor Yellow
npx prisma generate

# Step 6: Create database directory if it doesn't exist
Write-Host "Step 6: Creating database directory..." -ForegroundColor Yellow
if (!(Test-Path "db")) {
    New-Item -ItemType Directory -Path "db"
}

# Step 7: Push database schema
Write-Host "Step 7: Pushing database schema to SQLite..." -ForegroundColor Yellow
npx prisma db push

# Step 8: Verify database was created
Write-Host "Step 8: Verifying database..." -ForegroundColor Yellow
if (Test-Path "db\custom.db") {
    Write-Host "Database created successfully: db\custom.db" -ForegroundColor Green
} else {
    Write-Host "Warning: Database file not found!" -ForegroundColor Red
}

Write-Host ""
Write-Host "Prisma SQLite setup completed!" -ForegroundColor Green
Write-Host "You can now run: npm run dev" -ForegroundColor Cyan