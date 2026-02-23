# Build Release APK Instructions

## Method 1: EAS Build (Recommended - Cloud Build)

### Step 1: Install EAS CLI
```bash
npm install -g eas-cli
```

### Step 2: Login to Expo
```bash
eas login
```
(Create a free account at https://expo.dev if you don't have one)

### Step 3: Configure the project
```bash
eas build:configure
```

### Step 4: Build APK
```bash
# For preview/testing APK
eas build --platform android --profile preview

# For production APK
eas build --platform android --profile production
```

### Step 5: Download APK
- After build completes, you'll get a download link
- Or check your builds at: https://expo.dev/accounts/[your-account]/projects/react-native-image-app/builds

---

## Method 2: Local Build (Without EAS)

### Step 1: Install Expo CLI
```bash
npm install -g expo-cli
```

### Step 2: Prebuild (Generate Native Code)
```bash
npx expo prebuild --platform android
```

### Step 3: Build APK Locally
```bash
cd android
./gradlew assembleRelease
```

### Step 4: Find APK
The APK will be at:
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## Method 3: Using Expo's Classic Build (Deprecated but still works)

```bash
expo build:android -t apk
```

---

## Important Notes:

1. **Update app.json** before building:
   - Set proper `version` and `versionCode`
   - Add `package` name (e.g., "com.yourcompany.imageapp")

2. **For Production Builds**, you'll need:
   - A keystore file (EAS can generate one for you)
   - Or create your own: `keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000`

3. **Test the APK** on a real device before distributing

4. **File Size**: First build may take 10-20 minutes

---

## Quick Start (Easiest Method):

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build APK
eas build --platform android --profile preview
```

That's it! EAS will build in the cloud and give you a download link.

---

## Troubleshooting:

- If build fails, check `eas build --platform android --profile preview --clear-cache`
- For local builds, ensure you have Android Studio and Java JDK installed
- Check logs at: https://expo.dev for cloud builds
