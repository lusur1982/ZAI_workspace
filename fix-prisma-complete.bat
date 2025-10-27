@echo off
echo Fixing Prisma MODULE_NOT_FOUND errors...
echo.

REM Step 1: Stop any running processes
echo Step 1: Stopping any running Node.js processes...
taskkill /F /IM node.exe 2>NUL
taskkill /F /IM prisma.exe 2>NUL

REM Step 2: Clean everything completely
echo Step 2: Cleaning all caches and modules...
rmdir /S /Q node_modules 2>NUL
rmdir /S /Q .next 2>NUL
rmdir /S /Q .prisma 2>NUL
del /Q package-lock.json 2>NUL

REM Step 3: Clear npm cache
echo Step 3: Clearing npm cache...
call npm cache clean --force

REM Step 4: Install dependencies with verbose output
echo Step 4: Installing dependencies (this may take a few minutes)...
call npm install --verbose

REM Step 5: Verify Prisma installation
echo Step 5: Verifying Prisma installation...
if exist node_modules\prisma (
    echo Prisma module found!
) else (
    echo ERROR: Prisma module not found after installation!
    echo Trying alternative installation...
    call npm install prisma @prisma/client --save-dev
)

REM Step 6: Generate Prisma client
echo Step 6: Generating Prisma client...
call npx prisma generate

REM Step 7: Verify Prisma client generation
echo Step 7: Verifying Prisma client...
if exist node_modules\.prisma\client (
    echo Prisma client generated successfully!
) else (
    echo ERROR: Prisma client not found!
    echo Trying to generate again...
    call npx prisma generate --force
)

REM Step 8: Test Prisma commands
echo Step 8: Testing Prisma commands...
call npx prisma --version

REM Step 9: Push database schema
echo Step 9: Pushing database schema...
call npx prisma db push

REM Step 10: Final verification
echo Step 10: Final verification...
if exist node_modules\prisma\build\index.js (
    echo SUCCESS: Prisma build module found!
) else (
    echo ERROR: Prisma build module still missing!
    echo Please check your Node.js and npm installation.
)

echo.
echo Prisma fix completed!
echo You can now run: npm run dev
pause