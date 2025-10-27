# Fix Prisma MODULE_NOT_FOUND errors for Windows PowerShell
Write-Host "Fixing Prisma MODULE_NOT_FOUND errors..." -ForegroundColor Green
Write-Host ""

# Step 1: Stop any running processes
Write-Host "Step 1: Stopping any running Node.js processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process prisma -ErrorAction SilentlyContinue | Stop-Process -Force

# Step 2: Clean everything completely
Write-Host "Step 2: Cleaning all caches and modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
}
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
}
if (Test-Path ".prisma") {
    Remove-Item -Recurse -Force ".prisma"
}
if (Test-Path "package-lock.json") {
    Remove-Item -Force "package-lock.json"
}

# Step 3: Clear npm cache
Write-Host "Step 3: Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force

# Step 4: Install dependencies with verbose output
Write-Host "Step 4: Installing dependencies (this may take a few minutes)..." -ForegroundColor Yellow
npm install --verbose

# Step 5: Verify Prisma installation
Write-Host "Step 5: Verifying Prisma installation..." -ForegroundColor Yellow
if (Test-Path "node_modules\prisma") {
    Write-Host "Prisma module found!" -ForegroundColor Green
} else {
    Write-Host "ERROR: Prisma module not found after installation!" -ForegroundColor Red
    Write-Host "Trying alternative installation..." -ForegroundColor Yellow
    npm install prisma @prisma/client --save-dev
}

# Step 6: Generate Prisma client
Write-Host "Step 6: Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

# Step 7: Verify Prisma client generation
Write-Host "Step 7: Verifying Prisma client..." -ForegroundColor Yellow
if (Test-Path "node_modules\.prisma\client") {
    Write-Host "Prisma client generated successfully!" -ForegroundColor Green
} else {
    Write-Host "ERROR: Prisma client not found!" -ForegroundColor Red
    Write-Host "Trying to generate again..." -ForegroundColor Yellow
    npx prisma generate --force
}

# Step 8: Test Prisma commands
Write-Host "Step 8: Testing Prisma commands..." -ForegroundColor Yellow
npx prisma --version

# Step 9: Push database schema
Write-Host "Step 9: Pushing database schema..." -ForegroundColor Yellow
npx prisma db push

# Step 10: Final verification
Write-Host "Step 10: Final verification..." -ForegroundColor Yellow
if (Test-Path "node_modules\prisma\build\index.js") {
    Write-Host "SUCCESS: Prisma build module found!" -ForegroundColor Green
} else {
    Write-Host "ERROR: Prisma build module still missing!" -ForegroundColor Red
    Write-Host "Please check your Node.js and npm installation." -ForegroundColor Red
}

Write-Host ""
Write-Host "Prisma fix completed!" -ForegroundColor Green
Write-Host "You can now run: npm run dev" -ForegroundColor Cyan