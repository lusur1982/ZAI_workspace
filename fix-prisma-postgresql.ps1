# Fix Prisma PostgreSQL WASM error for Windows PowerShell
Write-Host "Fixing Prisma PostgreSQL WASM error..." -ForegroundColor Green
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
if (Test-Path "node_modules\prisma") {
    Get-ChildItem "node_modules\prisma" -Filter "*.js" -Recurse | Remove-Item -Force
    Get-ChildItem "node_modules\prisma" -Filter "*.d.ts" -Recurse | Remove-Item -Force
}

# Step 3: Clean Next.js cache
Write-Host "Step 3: Cleaning Next.js cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
}

# Step 4: Reinstall all dependencies
Write-Host "Step 4: Reinstalling all dependencies..." -ForegroundColor Yellow
npm install

# Step 5: Generate Prisma client specifically for PostgreSQL
Write-Host "Step 5: Generating Prisma client for PostgreSQL..." -ForegroundColor Yellow
npx prisma generate

# Step 6: Reset database (WARNING: This will delete all data!)
Write-Host "Step 6: Resetting database..." -ForegroundColor Yellow
npx prisma db push --force-reset

# Step 7: Push database schema
Write-Host "Step 7: Pushing database schema..." -ForegroundColor Yellow
npx prisma db push

# Step 8: Seed database if seed file exists
Write-Host "Step 8: Seeding database..." -ForegroundColor Yellow
if (Test-Path "prisma\seed.js") {
    npx prisma db seed
} else {
    Write-Host "No seed file found, skipping seeding..." -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Prisma PostgreSQL fix completed!" -ForegroundColor Green
Write-Host "You can now run: npm run dev" -ForegroundColor Cyan