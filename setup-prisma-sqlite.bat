@echo off
echo Fixing Prisma SQLite setup...
echo.

REM Stop any running processes
echo Step 1: Stopping any running Node.js processes...
taskkill /F /IM node.exe 2>NUL
taskkill /F /IM prisma.exe 2>NUL

REM Clean Prisma completely
echo Step 2: Cleaning Prisma completely...
rmdir /S /Q node_modules\.prisma 2>NUL
rmdir /S /Q node_modules\@prisma 2>NUL

REM Clean Next.js cache
echo Step 3: Cleaning Next.js cache...
rmdir /S /Q .next 2>NUL

REM Reinstall dependencies
echo Step 4: Reinstalling dependencies...
call npm install

REM Generate Prisma client for SQLite
echo Step 5: Generating Prisma client for SQLite...
call npx prisma generate

REM Create database directory if it doesn't exist
echo Step 6: Creating database directory...
if not exist db mkdir db

REM Push database schema
echo Step 7: Pushing database schema to SQLite...
call npx prisma db push

REM Verify database was created
echo Step 8: Verifying database...
if exist db\custom.db (
    echo Database created successfully: db\custom.db
) else (
    echo Warning: Database file not found!
)

echo.
echo Prisma SQLite setup completed!
echo You can now run: npm run dev
pause