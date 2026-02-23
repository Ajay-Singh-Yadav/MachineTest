# Splash Screen Setup Guide

## ✅ Current Configuration

Your app is now configured with:
- **App Name**: "Machine Test" (shows under icon on home screen)
- **Splash Screen**: Configured and ready to customize

---

## 🎨 How to Change Splash Screen

### Simple Method (Just Replace Image):

1. **Create your splash screen image**
   - Recommended size: **1242x2436px** (iPhone X resolution)
   - Format: PNG with transparent background
   - Center your logo/content

2. **Replace the file**:
   ```
   assets/splash-icon.png
   ```
   Just replace this file with your new splash screen image!

3. **Restart Expo**:
   ```bash
   npx expo start -c
   ```

That's it! Your new splash screen will appear.

---

## 📐 Splash Screen Design Tips

### Recommended Sizes:
- **Minimum**: 1242x2436px (iPhone X)
- **Safe Area**: Keep important content in center 1170x2034px
- **Logo Size**: 200-400px centered

### Design Guidelines:
1. **Keep it simple**: Logo + background color
2. **Center your content**: Works on all screen sizes
3. **Use solid background**: Matches your app theme
4. **Avoid text**: Unless it's your brand name
5. **Test on different devices**: Portrait orientation

---

## 🎯 Current Configuration (app.json)

```json
{
  "splash": {
    "image": "./assets/splash-icon.png",
    "resizeMode": "contain",
    "backgroundColor": "#ffffff"
  }
}
```

### Configuration Options:

#### resizeMode:
- **"contain"** (default): Fits entire image, may show background
- **"cover"**: Fills screen, may crop image
- **"native"**: Uses native splash screen (iOS only)

#### backgroundColor:
- Change to match your brand color
- Examples: `"#007AFF"`, `"#000000"`, `"#ffffff"`

---

## 🔧 Customization Examples

### Example 1: Blue Background
```json
{
  "splash": {
    "image": "./assets/splash-icon.png",
    "resizeMode": "contain",
    "backgroundColor": "#007AFF"
  }
}
```

### Example 2: Dark Theme
```json
{
  "splash": {
    "image": "./assets/splash-icon.png",
    "resizeMode": "contain",
    "backgroundColor": "#000000"
  }
}
```

### Example 3: Full Screen Image
```json
{
  "splash": {
    "image": "./assets/splash-icon.png",
    "resizeMode": "cover",
    "backgroundColor": "#ffffff"
  }
}
```

---

## 🖼️ Creating Splash Screen Image

### Option 1: Use Figma (Free)
1. Create 1242x2436px canvas
2. Add background color
3. Center your logo (200-400px)
4. Export as PNG
5. Save as `assets/splash-icon.png`

### Option 2: Use Canva (Free)
1. Create custom size: 1242x2436px
2. Add background
3. Add logo/text centered
4. Download as PNG
5. Save as `assets/splash-icon.png`

### Option 3: Use Online Tool
1. Visit: https://www.appicon.co/
2. Upload your logo
3. Generate splash screens
4. Download and replace `assets/splash-icon.png`

---

## 📱 File Structure

```
assets/
├── icon.png              (1024x1024) - App icon
├── adaptive-icon.png     (1024x1024) - Android icon
├── splash-icon.png       (1242x2436) - Splash screen ← CHANGE THIS
└── favicon.png           (48x48)     - Web icon
```

---

## 🚀 Quick Change Process

### To Change Splash Screen:
1. Design new splash screen (1242x2436px)
2. Save as PNG
3. Replace `assets/splash-icon.png`
4. Run: `npx expo start -c`
5. Done!

### To Change Background Color:
1. Open `app.json`
2. Find `"backgroundColor": "#ffffff"`
3. Change to your color (e.g., `"#007AFF"`)
4. Save and restart

---

## 🎨 Design Templates

### Minimal Design:
```
- Background: Solid color (#007AFF)
- Logo: Centered, 300x300px
- No text
```

### Brand Design:
```
- Background: Brand color
- Logo: Centered, 250x250px
- App name: Below logo, 24px font
```

### Full Screen Design:
```
- Background image: 1242x2436px
- Logo: Overlay in center
- Use "resizeMode": "cover"
```

---

## ✅ Testing Your Splash Screen

### Development:
```bash
# Clear cache and restart
npx expo start -c
```

### Production:
```bash
# Build to see actual splash screen
eas build --platform android --profile preview
```

---

## 🔍 Troubleshooting

**Splash screen not showing?**
- Clear cache: `npx expo start -c`
- Check file name: `splash-icon.png` (exact match)
- Check file size: Should be reasonable (< 2MB)

**Splash screen looks stretched?**
- Use correct size: 1242x2436px
- Try `"resizeMode": "contain"`
- Keep content in safe area

**Background color not showing?**
- Check `backgroundColor` in app.json
- Use hex format: `"#ffffff"`
- Restart Expo after changes

---

## 📝 Summary

**Current Setup:**
- ✅ App Name: "Machine Test"
- ✅ Splash Screen: `assets/splash-icon.png`
- ✅ Background: White (#ffffff)
- ✅ Resize Mode: Contain

**To Customize:**
1. Replace `assets/splash-icon.png` with your image
2. (Optional) Change `backgroundColor` in app.json
3. Restart: `npx expo start -c`

That's it! Your splash screen is ready to customize.
