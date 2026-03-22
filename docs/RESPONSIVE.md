# 📱 Responzivní Design - Breakpoints & Optimalizace

## 🎯 Tailwind Breakpoints

Aplikace je optimalizována pro **všechny velikosti obrazovek** od malých mobilů až po 4K monitory.

### Breakpoints

```css
/* Tailwind CSS v4 breakpoints */
sm:  640px   /* Malé tablety */
md:  768px   /* Tablety */
lg:  1024px  /* Malé laptopy */
xl:  1280px  /* Desktopy */
2xl: 1536px  /* Velké desktopy */

/* Max-width kontejnery */
max-w-screen-sm:   640px
max-w-screen-md:   768px
max-w-screen-lg:   1024px
max-w-screen-xl:   1280px
max-w-screen-2xl:  1536px
```

---

## 📐 Responzivní Grid Layout

### Landing Page - Feature Cards

```tsx
grid-cols-1           /* Mobile: 1 sloupec */
sm:grid-cols-2        /* Tablet: 2 sloupce */
lg:grid-cols-3        /* Desktop: 3 sloupce */
xl:grid-cols-3        /* Large: 3 sloupce */
```

### Dashboard - Habit Cards

```tsx
grid-cols-1           /* Mobile: 1 sloupec */
sm:grid-cols-1        /* Small tablet: 1 sloupec (lepší čitelnost) */
md:grid-cols-2        /* Tablet: 2 sloupce */
lg:grid-cols-3        /* Desktop: 3 sloupce */
xl:grid-cols-4        /* Large Desktop: 4 sloupce */
2xl:grid-cols-4       /* 4K: 4 sloupce */
```

---

## 📏 Typography Scale

### Nadpisy (Headings)

**Landing Page Hero:**
```tsx
text-3xl              /* Mobile: 30px */
sm:text-4xl           /* Small: 36px */
md:text-5xl           /* Medium: 48px */
lg:text-6xl           /* Large: 60px */
xl:text-7xl           /* XL: 72px */
```

**Dashboard Title:**
```tsx
text-2xl              /* Mobile: 24px */
sm:text-3xl           /* Small: 30px */
md:text-4xl           /* Medium: 36px */
lg:text-5xl           /* Large: 48px */
```

**Habit Card Title:**
```tsx
text-sm               /* Mobile: 14px */
sm:text-base          /* Small: 16px */
lg:text-lg            /* Large: 18px */
```

### Body Text

**Popisky:**
```tsx
text-base             /* Mobile: 16px */
sm:text-lg            /* Small: 18px */
md:text-xl            /* Medium: 20px */
```

**Malý text:**
```tsx
text-xs               /* Mobile: 12px */
sm:text-sm            /* Small: 14px */
```

---

## 🎨 Spacing & Padding

### Container Padding

```tsx
px-4                  /* Mobile: 16px */
sm:px-6               /* Small: 24px */
lg:px-8               /* Large: 32px */
```

### Vertical Spacing

```tsx
py-4                  /* Mobile: 16px */
sm:py-6               /* Small: 24px */
md:py-8               /* Medium: 32px */
lg:py-10              /* Large: 40px */
```

### Gap Between Elements

```tsx
gap-3                 /* Mobile: 12px */
sm:gap-4              /* Small: 16px */
md:gap-5              /* Medium: 20px */
lg:gap-6              /* Large: 24px */
lg:gap-8              /* XL: 32px */
```

---

## 🖼️ Component Sizes

### Icons

**Hero Icon:**
```tsx
h-12 w-12             /* Mobile: 48px */
sm:h-16 sm:w-16       /* Small: 64px */
lg:h-20 lg:w-20       /* Large: 80px */
```

**Navbar Logo:**
```tsx
h-5 w-5               /* Mobile: 20px */
sm:h-6 sm:w-6         /* Small: 24px */
lg:h-7 lg:w-7         /* Large: 28px */
```

**Habit Card Icon:**
```tsx
h-10 w-10             /* Mobile: 40px */
sm:h-12 sm:w-12       /* Small: 48px */
```

### Buttons

**Primary CTA:**
```tsx
size="lg"             /* Large button preset */
w-full sm:w-auto      /* Full width mobile, auto desktop */
text-base             /* 16px font */
```

**Icon Buttons:**
```tsx
h-8 w-8               /* Mobile: 32px */
sm:h-9 sm:w-9         /* Small: 36px */
lg:h-10 lg:w-10       /* Large: 40px */
```

---

## 🎯 Optimalizace pro různé displeje

### 📱 Mobile (320px - 639px)
- ✅ Full-width buttony
- ✅ 1 sloupec grid
- ✅ Větší touch targets (min 44px)
- ✅ Kompaktní spacing
- ✅ Truncate dlouhé texty

### 📱 Tablet (640px - 1023px)
- ✅ 2 sloupce grid
- ✅ Flex-row layouty
- ✅ Větší typography
- ✅ Hover efekty

### 💻 Desktop (1024px - 1535px)
- ✅ 3-4 sloupce grid
- ✅ Optimální řádková délka (max 750px)
- ✅ Hover shadows
- ✅ Větší ikony

### 🖥️ 4K & Ultra-wide (1536px+)
- ✅ 4 sloupce grid
- ✅ Max-width container (1536px)
- ✅ Větší typography scale
- ✅ Dostatek white space
- ✅ Optimální čitelnost

---

## 🛠️ Implementované Utility Classes

### Truncate & Line Clamp

```tsx
truncate              /* Ořízne 1 řádek s ... */
line-clamp-2          /* Max 2 řádky s ... */
```

### Min-width & Flex

```tsx
min-w-0               /* Povolí flexbox shrink */
flex-1                /* Zabere dostupný prostor */
flex-shrink-0         /* Nezmenšovat */
```

### Responsive Visibility

```tsx
hidden sm:block       /* Skrýt na mobile, zobrazit na tablet+ */
block sm:hidden       /* Zobrazit na mobile, skrýt na tablet+ */
```

---

## 📊 Testované Rozlišení

| Zařízení | Rozlišení | Status |
|----------|-----------|--------|
| **iPhone SE** | 375x667 | ✅ Optimalizováno |
| **iPhone 12/13** | 390x844 | ✅ Optimalizováno |
| **iPhone 14 Pro Max** | 430x932 | ✅ Optimalizováno |
| **iPad Mini** | 768x1024 | ✅ Optimalizováno |
| **iPad Pro** | 1024x1366 | ✅ Optimalizováno |
| **Laptop 13"** | 1280x800 | ✅ Optimalizováno |
| **Desktop Full HD** | 1920x1080 | ✅ Optimalizováno |
| **Desktop 2K** | 2560x1440 | ✅ Optimalizováno |
| **Desktop 4K** | 3840x2160 | ✅ Optimalizováno |

---

## 🎨 Design Tokens

### Spacing Scale

```
0.5 → 2px
1   → 4px
2   → 8px
3   → 12px
4   → 16px
6   → 24px
8   → 32px
10  → 40px
12  → 48px
```

### Font Sizes

```
xs   → 12px / 16px (line-height)
sm   → 14px / 20px
base → 16px / 24px
lg   → 18px / 28px
xl   → 20px / 28px
2xl  → 24px / 32px
3xl  → 30px / 36px
4xl  → 36px / 40px
5xl  → 48px / 1
6xl  → 60px / 1
7xl  → 72px / 1
```

---

## ✨ Extra Features

### Hover Effects

```tsx
hover:shadow-lg       /* Zvýraznění karty při hoveru */
transition-shadow     /* Plynulá animace */
hover:scale-110       /* Lehké zvětšení */
```

### Backdrop Blur (Navbar)

```tsx
backdrop-blur                           /* Rozmazání pozadí */
bg-background/95                        /* 95% opacity */
supports-[backdrop-filter]:bg-background/60  /* Fallback */
```

---

## 📝 Best Practices

1. **Mobile-first approach** - Vždy začínej s mobile styly, pak přidávej breakpointy
2. **Container max-width** - Použij `max-w-screen-2xl` pro omezení šířky na velkých monitorech
3. **Responsive padding** - `px-4 sm:px-6 lg:px-8` pro konzistentní spacing
4. **Touch targets** - Min 44x44px pro mobilní tlačítka
5. **Line length** - Max 750px pro optimální čitelnost textu
6. **Flexible images** - Použij responsive ikony (h-5 sm:h-6 lg:h-7)
7. **Grid adaptability** - 1 → 2 → 3 → 4 sloupce dle velikosti

---

**Status:** ✅ Plně responzivní od 320px do 4K
**Testováno:** Chrome DevTools + reálná zařízení
**Framework:** Tailwind CSS v4 + Next.js 15
