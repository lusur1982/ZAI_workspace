@echo off
echo Fixing Prisma EPERM error for Windows...
echo.

REM Stop any running processes
echo Step 1: Stopping any running Node.js processes...
taskkill /F /IM node.exe 2>NUL
taskkill /F /IM prisma.exe 2>NUL

REM Clean Prisma cache
echo Step 2: Cleaning Prisma cache...
rmdir /S /Q node_modules\.prisma 2>NUL
del /Q /S node_modules\@prisma\client\*.js 2>NUL
del /Q /S node_modules\@prisma\client\*.d.ts 2>NUL

REM Clean Next.js cache
echo Step 3: Cleaning Next.js cache...
rmdir /S /Q .next 2>NUL

REM Reinstall dependencies
echo Step 4: Reinstalling dependencies...
call npm install

REM Regenerate Prisma client
echo Step 5: Regenerating Prisma client...
call npx prisma generate

REM Push database schema
echo Step 6: Pushing database schema...
call npx prisma db push

echo.
echo Prisma EPERM fix completed!
echo You can now run: npm run dev
pause