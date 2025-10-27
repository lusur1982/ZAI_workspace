# Fix PostgreSQL Connection for CM Crypto Miners

## 🚨 Problem Identified
Your project is configured for SQLite but you're using PostgreSQL database.

## 🔧 Solution Steps

### 1. Update DATABASE_URL in .env file

Current .env shows SQLite connection:
```
DATABASE_URL=file:./db/custom.db
```

Change it to PostgreSQL format:
```
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

### 2. Common PostgreSQL Connection Formats

#### Local PostgreSQL:
```
DATABASE_URL="postgresql://postgres:admin@localhost:5432/cmminers"
```

#### Docker PostgreSQL:
```
DATABASE_URL="postgresql://postgres:docker@localhost:5433/cmminers"
```

#### Default PostgreSQL:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
```

### 3. Update Steps

1. **Edit .env file:**
   ```cmd
   notepad .env
   ```

2. **Replace DATABASE_URL line** with your PostgreSQL connection

3. **Run these commands:**
   ```cmd
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

### 4. Verify Connection

```cmd
# Test database connection
npx prisma db pull

# Check if tables exist
npx prisma db push
```

## 🎯 Quick Fix

1. **Edit .env file**
2. **Change DATABASE_URL to PostgreSQL format**
3. **Run:** `npx prisma generate && npx prisma db push && npm run db:seed`
4. **Start server:** `npm run dev`

## 🔍 Troubleshooting

### Error: "Connection refused"
- Check if PostgreSQL is running
- Verify port number (usually 5432)
- Check firewall settings

### Error: "Authentication failed"
- Verify username and password
- Check if user has database privileges

### Error: "Database does not exist"
- Create database: `CREATE DATABASE cmminers;`
- Use existing database name

## 📋 PostgreSQL Setup Checklist

- [ ] PostgreSQL server is running
- [ ] Database exists
- [ ] User has privileges
- [ ] .env has correct DATABASE_URL
- [ ] Prisma schema shows `provider = "postgresql"`
- [ ] `npx prisma generate` works
- [ ] `npx prisma db push` works
- [ ] Data is visible in web application

## 🚀 After Fix

Once connected, you should see:
- Products on shop page
- Users can login
- Admin panel shows data
- All seeded data is accessible