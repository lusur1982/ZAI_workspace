# WhiteDizajn - Čistý biely dizajn pre CM Crypto Miners

Tento branch obsahuje biely dizajn pre CM Crypto Miners projekt, ktorý je elegantný a moderný.

## 🎨 Charakteristika dizajnu

- **Hlavné farby**: Biela, svetlo sivá, tmavo sivá
- **Akcenty**: Tmavo sivé (gray-900) tlačidlá a elementy
- **Pozadie**: Čisté biele s jemnými sivými odtieňmi
- **Typografia**: Čisté, dobre čitateľné písmo
- **Rámce**: Jemné sivé rámce (border-gray-200)

## 🔄 Zmeny oproti Nordcraft dizajnu

### Farebná schéma
- **Z predchádzajúceho**: Modrá, fialová, tmavá téma
- **Na nové**: Biela, sivá, svetlá téma

### Komponenty
- **HeroSection**: Čisté biele pozadie s jemným gradientom
- **FeaturedProducts**: Biele karty so sivými rámčekmi
- **NewProducts**: Svetlo sivé pozadie pre vizuálny kontrast
- **WhyChooseSection**: Biele pozadie so sivými kartami
- **Header**: Biela navigácia s tmavo sivým logom
- **Footer**: Svetlo sivý pozadie s bielym obsahom

### Tlačidlá a interaktívne elementy
- Hlavné tlačidlá: `bg-gray-900 hover:bg-gray-800 text-white`
- Vedľajšie tlačidlá: `border-gray-300 text-gray-700 hover:bg-gray-50`
- Karty: `bg-white border-gray-200`

## 🚀 Ako použiť tento dizajn

1. **Checkout branch**:
   ```bash
   git checkout WhiteDizajn
   ```

2. **Inštalácia závislostí**:
   ```bash
   npm install
   ```

3. **Spustenie vývojového servera**:
   ```bash
   npm run dev
   ```

4. **Zobrazenie aplikácie**:
   Otvorte `http://localhost:3000` v prehliadači

## 📱 Responzívny dizajn

Dizajn je plne responzívny a optimalizovaný pre:
- **Mobilné zariadenia** (320px+)
- **Tablety** (768px+)
- **Desktopy** (1024px+)
- **Veľké obrazovky** (1280px+)

## 🎯 Cieľ dizajnu

Vytvoriť čistý, profesionálny a dôveryhodný vzhľad pre:
- **E-shopy** s kryptomenovým hardvérom
- **B2B klientov** (firmy)
- **Profesionálnych minerov**
- **Investorov** do kryptomien

## 📂 Štruktúra zmien

```
src/
├── components/
│   ├── Header.tsx          # Biela navigácia
│   ├── Footer.tsx          # Svetlo sivý footer
│   └── sections/
│       ├── HeroSection.tsx         # Biela hero sekcia
│       ├── FeaturedProducts.tsx    # Biele produktové karty
│       ├── NewProducts.tsx         # Svetlo sivé nové produkty
│       └── WhyChooseSection.tsx    # Bénéfity v bielych kartách
└── app/
    └── globals.css        # Light theme CSS variables
```

## 🔧 Konfigurácia

Dizajn používa Tailwind CSS s nasledujúcimi premennými:
- `--background`: `oklch(1 0 0)` (biela)
- `--foreground`: `oklch(0.145 0 0)` (tmavo sivá)
- `--card`: `oklch(1 0 0)` (biela)
- `--border`: `oklch(0.922 0 0)` (svetlo sivá)
- `--primary`: `oklch(0.205 0 0)` (tmavo sivá)

## 🌐 Browser podpora

Dizajn je kompatibilný s modernými prehliadačmi:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

**Vytvorené s ❤️ pre CM Crypto Miners**