@echo off
echo Fixing Prisma PostgreSQL WASM error...
echo.

REM Stop any running processes
echo Step 1: Stopping any running Node.js processes...
taskkill /F /IM node.exe 2>NUL
taskkill /F /IM prisma.exe 2>NUL

REM Clean Prisma completely
echo Step 2: Cleaning Prisma completely...
rmdir /S /Q node_modules\.prisma 2>NUL
rmdir /S /Q node_modules\@prisma 2>NUL
del /Q /S node_modules\prisma\*.js 2>NUL
del /Q /S node_modules\prisma\*.d.ts 2>NUL

REM Clean Next.js cache
echo Step 3: Cleaning Next.js cache...
rmdir /S /Q .next 2>NUL

REM Reinstall all dependencies
echo Step 4: Reinstalling all dependencies...
call npm install

REM Generate Prisma client specifically for PostgreSQL
echo Step 5: Generating Prisma client for PostgreSQL...
call npx prisma generate

REM Reset database (WARNING: This will delete all data!)
echo Step 6: Resetting database...
call npx prisma db push --force-reset

REM Push database schema
echo Step 7: Pushing database schema...
call npx prisma db push

REM Seed database if seed file exists
echo Step 8: Seeding database...
if exist prisma\seed.js (
    call npx prisma db seed
) else (
    echo No seed file found, skipping seeding...
)

echo.
echo Prisma PostgreSQL fix completed!
echo You can now run: npm run dev
pause