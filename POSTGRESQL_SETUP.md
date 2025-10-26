# PostgreSQL Setup - CM Crypto Miners

## 🚀 Dva spôsoby migrácie na PostgreSQL

### 📁 **Súbory, ktoré máte k dispozícii:**

1. **`migrate-to-postgresql.sh`** - Kompletná migrácia zo SQLite
2. **`setup-postgresql.sh`** - Čistá inštalácia pre PostgreSQL

---

## 🎯 **Odporúčaný spôsob: Čistá inštalácia**

### Pre lokálny development použite:

```bash
# 1. Spustenie setup skriptu
bash setup-postgresql.sh

# 2. Spustenie projektu
npm run dev
```

### Čo robí setup skript:
- ✅ Kontrola PostgreSQL inštalácie
- ✅ Vytvorenie databázy a používateľa
- ✅ Konfigurácia .env súboru
- ✅ Aktualizácia Prisma schema
- ✅ Vytvorenie tabuliek
- ✅ Seed data s produktmi a užívateľmi

---

## 🔄 **Migrácia zo SQLite (ak chcete zachovať dáta)**

```bash
# 1. Spustenie migračného skriptu
bash migrate-to-postgresql.sh

# 2. Manuálna úprava .env
# 3. Vytvorenie PostgreSQL databázy
# 4. Migrácia dát
```

---

## 📋 **Požiadavky**

### PostgreSQL inštalácia:
- **Ubuntu/Debian:** `sudo apt-get install postgresql postgresql-contrib`
- **macOS:** `brew install postgresql`
- **Windows:** Stiahnuť z [postgresql.org](https://www.postgresql.org/download/windows/)

### Node.js:
- Potrebné verzie 18+ 
- `node -v` pre kontrolu

---

## 🗄️ **Databázová štruktúra**

### Tabuľky:
- `users` - Užívatelia a admini
- `products` - Produkty (minery)
- `orders` - Objednávky
- `order_items` - Položky objednávok
- `blogs` - Blog príspevky
- `faqs` - FAQ sekcia
- `page_contents` - Obsah stránok

### Seed data:
- **Admin užívateľ:** `admin@cmminers.com` / `admin123`
- **Test užívateľ:** `test@example.com` / `admin123`
- **Produkty:** 5 ukážkových minerov
- **FAQ:** 3 ukážkové otázky

---

## 🛠️ **Dostupné skripty**

```bash
# Nastavenie databázy
npm run db:setup

# Seed data
npm run db:seed

# Reset databázy
npm run db:reset
```

---

## 🔧 **Manuálna konfigurácia**

Ak skripty nefungujú, môžete všetko urobiť manuálne:

### 1. Vytvorenie databázy:
```sql
CREATE DATABASE cm_miners_db;
CREATE USER cm_miners_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE cm_miners_db TO cm_miners_user;
```

### 2. .env súbor:
```env
DATABASE_URL="postgresql://cm_miners_user:your_password@localhost:5432/cm_miners_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

### 3. Prisma setup:
```bash
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
```

---

## 🚨 **Riešenie problémov**

### Chyba pripojenia:
```bash
# Skontrolujte PostgreSQL status
sudo systemctl status postgresql

# Spustenie service
sudo systemctl start postgresql
```

### Práva problémy:
```bash
# Pridanie práv pre skripty
chmod +x setup-postgresql.sh
chmod +x migrate-to-postgresql.sh
```

### Chyby Prisma:
```bash
# Regenerácia client
npx prisma generate

# Reset databázy
npx prisma db push --force-reset
```

---

## 📞 **Testovanie**

Po setup-e spustite test:
```bash
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.\$connect().then(() => {
  console.log('✅ PostgreSQL connection successful!');
  return prisma.\$disconnect();
}).catch(console.error);
"
```

---

## 🎉 **Hotovo!**

Po úspešnom setup-e:
1. Projekt používa PostgreSQL
2. Máte seed data s produktmi
3. Admin účet je pripravený
4. Všetko funguje ako na production

**Spustenie projektu:** `npm run dev`

---

*Autor: Claude Code Assistant*  
*Verzia: 1.0*