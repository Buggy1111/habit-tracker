# PWA Icons Setup

PWA je nakonfigurováno, ale potřebujeme ikony! 🎨

## Potřebné ikony:

1. **icon-192.png** (192×192px) - Pro Android/Chrome
2. **icon-512.png** (512×512px) - Pro Android/Chrome (high-res)
3. **favicon.ico** - Browser favicon
4. **screenshot-wide.png** (1280×720px) - Pro PWA store listing
5. **screenshot-narrow.png** (750×1334px) - Pro PWA store listing (mobile)

## Kde je vzít?

### Rychlé řešení:

Použij https://realfavicongenerator.net/

- Upload logo/design
- Stáhni všechny ikony
- Zkopíruj do `/public`

### Design tips:

- Použij náš primary color: #6366F1 (Indigo)
- Jednoduchý, rozpoznatelný symbol (např. 🧠 nebo H v kruhu)
- High contrast (bude vidět na různých pozadích)
- Žádný text (malé ikony nemusí být čitelné)

## Current Status:

⚠️ **MISSING ICONS** - Aplikace funguje, ale nebude se správně instalovat bez ikon!

## Todo (před production):

- [ ] Vytvořit/stáhnout ikony
- [ ] Přidat do `/public`
- [ ] Testovat instalaci na iOS/Android
- [ ] Vygenerovat screenshots z aplikace
