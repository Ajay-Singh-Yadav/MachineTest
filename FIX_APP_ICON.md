# Fix App Icon - Complete Guide

## ❌ Don't Do This:
- Don't manually place icons in `android/res` folder
- Expo manages this automatically

## ✅ Correct Way for Expo Apps:

### Step 1: Replace Icon Files in `assets` Folder

Replace these files with your app icon:

```
assets/
├── icon.png              (1024x1024px) - Your app icon
├── adaptive-icon.png     (1024x1024px) - Your app icon
```

### Step 2: Clear Cache and Restart

```bash
# Stop the current server (Ctrl+C)

# Clear cache and restart
npx expo start -c
```

### Step 3: Rebuild the App

The icon won't change in development mode. You need to rebuild:

#### Option A: Using Expo Go (Development)
```bash
# Close the app completely on your phone
# Clear Expo Go cache:
# - Android: Settings > Apps > Expo Go > Clear Cache
# - iOS: Delete and reinstall Expo Go

# Then restart
npx expo start -c
```

#### Option B: Build Standalone APK (Production)
```bash
# This will show your actual icon
eas build --platform android --profile preview
```

---

## 🔧 If Icon Still Not Showing:

### Method 1: Delete android folder (if it exists)
```bash
# If you have an android folder, delete it
rm -rf android

# Expo will regenerate it with correct icons
npx expo prebuild --clean
```

### Method 2: Force Rebuild
```bash
# Clear all caches
npx expo start -c --clear

# Or
rm -rf node_modules
npm install
npx expo start -c
```

---

## 📱 Important Notes:

### For Development (Expo Go):
- Icon changes may not show immediately
- Expo Go uses its own icon
- Your custom icon only shows in standalone builds

### For Production (Standalone APK):
- Build APK to see actual icon
- Icon will show on device home screen
- This is the real app icon users will see

---

## 🎯 Quick Fix Steps:

1. **Replace files**:
   ```
   assets/icon.png (1024x1024px)
   assets/adaptive-icon.png (1024x1024px)
   ```

2. **Verify app.json**:
   ```json
   {
     "expo": {
       "icon": "./assets/icon.png",
       "android": {
         "adaptiveIcon": {
           "foregroundImage": "./assets/adaptive-icon.png",
           "backgroundColor": "#ffffff"
         }
       }
     }
   }
   ```

3. **Build APK**:
   ```bash
   eas build --platform android --profile preview
   ```

4. **Install APK** on your device to see the icon

---

## 🚀 Fastest Way to See Your Icon:

### Build and Install APK:

```bash
# 1. Install EAS CLI (if not installed)
npm install -g eas-cli

# 2. Login
eas login

# 3. Build APK
eas build --platform android --profile preview

# 4. Download and install APK on your phone
# Your icon will show on home screen!
```

---

## 📋 Checklist:

- [ ] Icon files are 1024x1024px PNG
- [ ] Files are named exactly: `icon.png` and `adaptive-icon.png`
- [ ] Files are in `assets` folder (not android/res)
- [ ] app.json points to correct files
- [ ] Built standalone APK (not using Expo Go)
- [ ] Installed APK on device

---

## 🔍 Troubleshooting:

**Icon not showing in Expo Go?**
- Normal! Expo Go uses its own icon
- Build standalone APK to see your icon

**Icon not showing after build?**
- Check file size: Should be 1024x1024px
- Check file format: Must be PNG
- Check file names: Exact match required
- Rebuild: `eas build --platform android --clear-cache`

**Still showing default icon?**
- Delete old app from device
- Install fresh APK
- Restart device

---

## ✅ Summary:

**For Expo Apps:**
1. Place icons in `assets` folder (NOT android/res)
2. Update app.json (already done)
3. Build APK: `eas build --platform android`
4. Install APK to see icon

**Don't:**
- Don't manually edit android/res folder
- Don't expect icon to show in Expo Go
- Don't forget to rebuild after changing icon

Your icon will show correctly in the standalone APK!
