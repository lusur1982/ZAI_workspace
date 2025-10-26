# Windows Setup Instructions

## CSS Visual Issues Fix

If you're experiencing CSS visual issues on Windows localhost, follow these steps:

### Option 1: Clean Install
```bash
# Stop all processes
taskkill /F /IM node.exe

# Clean cache
rmdir /S /Q .next
del /Q /S node_modules\.prisma

# Reinstall
npm install
npm run dev
```

### Option 2: Manual CSS Check
1. Open browser developer tools (F12)
2. Check Console for CSS errors
3. Check Network tab for failed CSS requests
4. Verify `src/app/globals.css` is loaded

## Prisma EPERM Error Fix

The EPERM error occurs due to Windows file permission issues. Use one of the following solutions:

### Solution 1: Run PowerShell Script (Recommended)
```powershell
# Run as Administrator
.\fix-prisma-windows.ps1
```

### Solution 2: Run Batch File
```cmd
# Double-click or run in Command Prompt
fix-prisma-windows.bat
```

### Solution 3: Manual Steps
```cmd
# 1. Stop all Node processes
taskkill /F /IM node.exe

# 2. Clean Prisma cache
rmdir /S /Q node_modules\.prisma
del /Q /S node_modules\@prisma\client\*.js
del /Q /S node_modules\@prisma\client\*.d.ts

# 3. Clean Next.js cache
rmdir /S /Q .next

# 4. Reinstall dependencies
npm install

# 5. Regenerate Prisma client
npx prisma generate

# 6. Push database schema
npx prisma db push
```

### Solution 4: Run as Administrator
If the above doesn't work, try running Command Prompt as Administrator and execute the manual steps.

## Additional Windows Tips

### 1. Antivirus Issues
Some antivirus software blocks file operations. Add your project folder to antivirus exclusions.

### 2. Long Path Names
Windows has a 260 character path limit. Move your project closer to root directory (e.g., `C:\project`).

### 3. Node.js Version
Ensure you're using Node.js 18+:
```cmd
node --version
```

### 4. Environment Variables
Make sure your `.env` file has correct line endings (Windows CRLF).

## Troubleshooting

### CSS Not Loading
1. Check browser console for errors
2. Verify `globals.css` exists in `src/app/`
3. Check Tailwind CSS configuration
4. Ensure `@import "tailwindcss"` is in globals.css

### Database Connection Issues
1. Verify `.env` file has correct `DATABASE_URL`
2. Check if SQLite file exists in `db/` folder
3. Ensure Prisma schema is valid

### Performance Issues
1. Close unnecessary applications
2. Use SSD instead of HDD
3. Increase Node.js memory limit:
   ```cmd
   set NODE_OPTIONS=--max-old-space-size=4096
   npm run dev
   ```

## Development Workflow

1. **Initial Setup**: Run `fix-prisma-windows.ps1` once
2. **Daily Development**: `npm run dev`
3. **Database Changes**: `npx prisma db push`
4. **CSS Issues**: Clean `.next` folder and restart dev server

## Support

If issues persist:
1. Check Windows Event Viewer for detailed error logs
2. Try running in a different terminal (PowerShell vs CMD)
3. Verify Windows user has full permissions for project folder
4. Consider using WSL2 for better Node.js compatibility