# Fix PostgreSQL EPERM Error for Windows

## 🚨 Error Description
```
Error: EPERM: operation not permitted, rename 'query_engine-windows.dll.node.tmpXXXX' -> 'query_engine-windows.dll.node'
```

This error occurs when Windows file permissions prevent Prisma from updating its query engine.

## 🔧 Solutions (try in order)

### Solution 1: Use PostgreSQL EPERM Fix Script (Recommended)
```cmd
# Run as Administrator
fix-postgresql-eperm.bat
```

### Solution 2: Use Complete Fix Script
```cmd
# Run as Administrator
fix-prisma-complete.bat
```

### Solution 3: Manual Fix Steps

#### Step A: Stop All Processes
```cmd
taskkill /F /IM node.exe
taskkill /F /IM prisma.exe
taskkill /F /IM tsx.exe
taskkill /F /IM nodemon.exe
```

#### Step B: Clean Everything
```cmd
rmdir /S /Q node_modules\.prisma
rmdir /S /Q node_modules\@prisma
rmdir /S /Q .next
npm cache clean --force
```

#### Step C: Fresh Install
```cmd
npm install
npx prisma generate
npx prisma db push
npm run db:seed
```

### Solution 4: Run as Different User
```cmd
# Open Command Prompt as different user
runas /user:Administrator cmd
# Then run the fix commands
```

### Solution 5: Change Folder Permissions
```cmd
# Take ownership of the folder
takeown /f "C:\EasyPHP-Devserver-17\eds-www\ZAI_workspace" /r /d y
# Grant full permissions
icacls "C:\EasyPHP-Devserver-17\eds-www\ZAI_workspace" /grant Everyone:F /t
```

### Solution 6: Move Project Location
If nothing works, move project to simpler path:
```
C:\project\ZAI_workspace
```
Instead of:
```
C:\EasyPHP-Devserver-17\eds-www\ZAI_workspace
```

## 🎯 Quick Fix Commands

```cmd
# 1. Run as Administrator
# 2. Execute these commands:

taskkill /F /IM node.exe /IM prisma.exe /IM tsx.exe
rmdir /S /Q node_modules\.prisma node_modules\@prisma .next
npm cache clean --force
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

## 🔍 Verification Steps

After fix, verify:

1. **Prisma client generated:**
   ```cmd
   dir node_modules\.prisma\client
   ```

2. **PostgreSQL engine exists:**
   ```cmd
   dir node_modules\.prisma\client\query_engine-windows.dll.node
   ```

3. **Database connection works:**
   ```cmd
   npx prisma db pull
   ```

4. **Data is accessible:**
   ```cmd
   npx prisma studio
   ```

## 🚨 Common Causes

1. **Antivirus software** blocking file operations
2. **Windows file permissions** on project folder
3. **EasyPHP Devserver** restrictions
4. **Long file paths** in Windows
5. **Node.js processes** still running

## 💡 Prevention Tips

1. **Add project folder to antivirus exclusions**
2. **Run Command Prompt as Administrator**
3. **Close all development tools before running fixes**
4. **Use shorter project paths**
5. **Stop all Node processes before maintenance**

## 🆘 If Nothing Works

1. **Restart computer** and try again
2. **Use different terminal** (PowerShell vs CMD)
3. **Try WSL2** (Windows Subsystem for Linux)
4. **Use Docker** for PostgreSQL
5. **Switch to SQLite** for development

## 🎉 Success Indicators

When fix works, you'll see:
- ✅ `Prisma client generated successfully`
- ✅ `Database schema pushed successfully`
- ✅ `Database seeded successfully`
- ✅ `Server running on http://localhost:3000`
- ✅ Data visible in web application