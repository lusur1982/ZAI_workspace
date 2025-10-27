@echo off
echo Seeding database with sample data...
echo.

REM Check if database exists
if not exist db\custom.db (
    echo Database not found. Creating database first...
    call npx prisma db push
)

REM Run the seed script
echo Running seed script...
call npm run db:seed

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Database seeded successfully!
    echo.
    echo 📊 Sample data created:
    echo    👤 Admin user: admin@cmminers.com / admin123
    echo    👤 Regular user: user@example.com / user123
    echo    📦 6 Products (ASIC and GPU miners)
    echo    📋 3 Sample orders
    echo    📝 3 Blog posts
    echo    📄 3 Page content entries
    echo    ❓ 8 FAQ items
    echo.
    echo You can now run: npm run dev
) else (
    echo.
    echo ❌ Error during database seeding!
    echo Please check the error messages above.
)

pause