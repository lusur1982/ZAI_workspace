@echo off
echo Fixing PostgreSQL EPERM error...
echo.

REM Step 1: Stop ALL processes
echo Step 1: Stopping all processes...
taskkill /F /IM node.exe 2>NUL
taskkill /F /IM prisma.exe 2>NUL
taskkill /F /IM tsx.exe 2>NUL
taskkill /F /IM nodemon.exe 2>NUL

REM Step 2: Wait for processes to fully stop
echo Step 2: Waiting for processes to stop...
timeout /t 5 /nobreak

REM Step 3: Clean Prisma completely
echo Step 3: Cleaning Prisma completely...
rmdir /S /Q node_modules\.prisma 2>NUL
rmdir /S /Q node_modules\@prisma 2>NUL
rmdir /S /Q .next 2>NUL

REM Step 4: Clean npm cache
echo Step 4: Cleaning npm cache...
call npm cache clean --force

REM Step 5: Install dependencies
echo Step 5: Installing dependencies...
call npm install

REM Step 6: Install PostgreSQL dependencies specifically
echo Step 6: Installing PostgreSQL dependencies...
call npm install pg @types/pg --save

REM Step 7: Generate Prisma client for PostgreSQL
echo Step 7: Generating Prisma client for PostgreSQL...
call npx prisma generate

REM Step 8: Test database connection
echo Step 8: Testing database connection...
call npx prisma db pull

REM Step 9: Push schema to PostgreSQL
echo Step 9: Pushing schema to PostgreSQL...
call npx prisma db push

REM Step 10: Seed database
echo Step 10: Seeding database...
call npm run db:seed

REM Step 11: Final verification
echo Step 11: Final verification...
if exist node_modules\.prisma\client\query_engine-windows.dll.node (
    echo SUCCESS: PostgreSQL engine found!
) else (
    echo ERROR: PostgreSQL engine still missing!
    echo Trying alternative approach...
    call npx prisma generate --force
)

echo.
echo PostgreSQL EPERM fix completed!
echo You can now run: npm run dev
pause