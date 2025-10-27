@echo off
echo Fixing PostgreSQL connection for CM Crypto Miners...
echo.

echo Step 1: Checking current DATABASE_URL...
findstr "DATABASE_URL" .env

echo.
echo Step 2: Please update your DATABASE_URL in .env file
echo Your current .env file shows SQLite connection
echo.
echo PostgreSQL connection format examples:
echo   postgresql://username:password@localhost:5432/database_name
echo   postgresql://postgres:admin@localhost:5432/cmminers
echo.
echo Step 3: After updating .env, run these commands:
echo   npx prisma generate
echo   npx prisma db push
echo   npm run db:seed
echo.

echo Current .env content:
type .env

echo.
echo Please edit .env file with your PostgreSQL connection details
pause