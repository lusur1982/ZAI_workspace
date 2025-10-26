# Fix Prisma EPERM error for Windows PowerShell
Write-Host "Fixing Prisma EPERM error for Windows..." -ForegroundColor Green
Write-Host ""

# Step 1: Stop any running processes
Write-Host "Step 1: Stopping any running Node.js processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process prisma -ErrorAction SilentlyContinue | Stop-Process -Force

# Step 2: Clean Prisma cache
Write-Host "Step 2: Cleaning Prisma cache..." -ForegroundColor Yellow
if (Test-Path "node_modules\.prisma") {
    Remove-Item -Recurse -Force "node_modules\.prisma"
}
if (Test-Path "node_modules\@prisma\client") {
    Get-ChildItem "node_modules\@prisma\client" -Filter "*.js" -Recurse | Remove-Item -Force
    Get-ChildItem "node_modules\@prisma\client" -Filter "*.d.ts" -Recurse | Remove-Item -Force
}

# Step 3: Clean Next.js cache
Write-Host "Step 3: Cleaning Next.js cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
}

# Step 4: Reinstall dependencies
Write-Host "Step 4: Reinstalling dependencies..." -ForegroundColor Yellow
npm install

# Step 5: Regenerate Prisma client
Write-Host "Step 5: Regenerating Prisma client..." -ForegroundColor Yellow
npx prisma generate

# Step 6: Push database schema
Write-Host "Step 6: Pushing database schema..." -ForegroundColor Yellow
npx prisma db push

Write-Host ""
Write-Host "Prisma EPERM fix completed!" -ForegroundColor Green
Write-Host "You can now run: npm run dev" -ForegroundColor Cyan