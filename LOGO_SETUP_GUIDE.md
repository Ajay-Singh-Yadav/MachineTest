# App Logo Setup Guide

## 1. App Icon (Launcher Icon - Shows on Home Screen)

### Required Files:
Place your logo images in the `assets` folder:

- **icon.png** - 1024x1024px (iOS and Android app icon)
- **adaptive-icon.png** - 1024x1024px (Android adaptive icon)
- **favicon.png** - 48x48px (Web favicon)

### Steps:
1. Create your logo in 1024x1024px size
2. Save as PNG with transparent background
3. Replace `assets/icon.png` with your logo
4. Replace `assets/adaptive-icon.png` with your logo
5. Replace `assets/favicon.png` with smaller version

### Quick Tool:
Use https://www.appicon.co/ to generate all sizes from one image

---

## 2. Splash Screen Logo

### File:
- **splash-icon.png** - Recommended: 1242x2436px

### Steps:
1. Create splash screen with your logo centered
2. Replace `assets/splash-icon.png`
3. Update `app.json` if needed:

```json
"splash": {
  "image": "./assets/splash-icon.png",
  "resizeMode": "contain",
  "backgroundColor": "#ffffff"
}
```

---

## 3. Header Logo (In App Navigation)

### Option A: Replace "Image Gallery" text with logo

Add to `src/screens/ImageListScreen.tsx`:

```tsx
import { Image } from 'react-native';

// In header:
<Image 
  source={require('../../assets/logo-header.png')} 
  style={{ width: 120, height: 40 }}
  resizeMode="contain"
/>
```

### Option B: Add logo next to title

```tsx
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <Image 
    source={require('../../assets/logo-small.png')} 
    style={{ width: 32, height: 32, marginRight: 8 }}
  />
  <Text style={styles.headerTitle}>Image Gallery</Text>
</View>
```

---

## 4. Login/Welcome Screen Logo

If you want a logo on a welcome screen:

```tsx
<View style={styles.logoContainer}>
  <Image 
    source={require('../assets/logo.png')} 
    style={{ width: 200, height: 200 }}
    resizeMode="contain"
  />
</View>
```

---

## Recommended Logo Sizes:

| Location | Size | Format |
|----------|------|--------|
| App Icon | 1024x1024px | PNG |
| Splash Screen | 1242x2436px | PNG |
| Header Logo | 120x40px | PNG |
| Small Icon | 32x32px | PNG |

---

## Tools to Create Icons:

1. **App Icon Generator**: https://www.appicon.co/
2. **Figma**: https://www.figma.com/ (Free design tool)
3. **Canva**: https://www.canva.com/ (Easy logo maker)
4. **Remove Background**: https://www.remove.bg/

---

## After Adding Logo:

1. Clear cache: `npx expo start -c`
2. For app icon changes, rebuild the app
3. Test on both iOS and Android devices

---

## Current Files to Replace:

```
assets/
├── icon.png              (1024x1024) - App icon
├── adaptive-icon.png     (1024x1024) - Android adaptive icon
├── splash-icon.png       (1242x2436) - Splash screen
└── favicon.png           (48x48)     - Web favicon
```

Just replace these files with your logo!
