# How to Set App Icon

## Quick Steps:

### 1. Prepare Your Icon
- Create a **1024x1024px** PNG image
- Use transparent background (optional)
- Make sure it looks good when scaled down

### 2. Replace Files in `assets` Folder

Replace these files with your icon:

```
assets/
├── icon.png              (1024x1024px) - Main app icon
├── adaptive-icon.png     (1024x1024px) - Android adaptive icon
├── splash-icon.png       (1242x2436px) - Splash screen
└── favicon.png           (48x48px)     - Web favicon
```

### 3. That's It!
Your app icon is now set. When you build the app, Expo will automatically generate all required sizes.

---

## Detailed Instructions:

### Option 1: Use Online Tool (Easiest)

1. **Go to**: https://www.appicon.co/
2. **Upload** your 1024x1024px image
3. **Download** the generated icons
4. **Replace** files in `assets` folder

### Option 2: Manual Creation

#### For icon.png (1024x1024px):
```bash
# Your main app icon
# Place at: assets/icon.png
```

#### For adaptive-icon.png (1024x1024px):
```bash
# Android adaptive icon (with safe area)
# Place at: assets/adaptive-icon.png
# Note: Keep important content in center 66% of image
```

#### For splash-icon.png:
```bash
# Splash screen image
# Place at: assets/splash-icon.png
# Recommended: 1242x2436px
```

---

## Current Configuration (app.json):

Your app is already configured:

```json
{
  "expo": {
    "icon": "./assets/icon.png",
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    }
  }
}
```

---

## Testing Your Icon:

### Development:
```bash
# Restart Expo
npx expo start -c
```

### Production Build:
```bash
# Build APK to see actual icon
eas build --platform android --profile preview
```

---

## Icon Design Tips:

1. **Keep it simple**: Icons look small on devices
2. **Use bold shapes**: Thin lines may not be visible
3. **Avoid text**: Text is hard to read at small sizes
4. **Test on dark/light backgrounds**: Ensure visibility
5. **Safe area**: Keep important content in center 75%

---

## Recommended Tools:

1. **Figma** (Free): https://www.figma.com/
2. **Canva** (Free): https://www.canva.com/
3. **App Icon Generator**: https://www.appicon.co/
4. **Icon Kitchen**: https://icon.kitchen/
5. **Remove Background**: https://www.remove.bg/

---

## Icon Sizes Reference:

| Platform | Size | File |
|----------|------|------|
| iOS | 1024x1024 | icon.png |
| Android | 1024x1024 | adaptive-icon.png |
| Splash | 1242x2436 | splash-icon.png |
| Web | 48x48 | favicon.png |

---

## Quick Example:

If you have a logo called `my-logo.png`:

1. Resize it to 1024x1024px
2. Copy to `assets/icon.png`
3. Copy to `assets/adaptive-icon.png`
4. Run: `npx expo start -c`

Done! Your icon is set.

---

## Troubleshooting:

**Icon not showing?**
- Clear cache: `npx expo start -c`
- Rebuild app: `eas build --platform android`
- Check file names match exactly

**Icon looks blurry?**
- Use 1024x1024px minimum
- Save as PNG (not JPG)
- Don't use compressed images

**Android icon looks cut off?**
- Use adaptive-icon.png
- Keep content in center 66% (safe area)
- Test with different shapes (circle, square, rounded)
