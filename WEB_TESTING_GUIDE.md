# Web Testing Guide - iPhone Screen Simulation

## Start Web Development Server

Run the following command to start the web server:

```bash
npx expo start --web
```

Or simply:

```bash
npm run web
```

## Test with iPhone Screen Size

Once the web app opens in your browser, you can simulate iPhone screen:

### Chrome DevTools (Recommended)
1. Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
2. Click the "Toggle device toolbar" icon (or press `Ctrl+Shift+M` / `Cmd+Shift+M`)
3. Select iPhone model from the dropdown:
   - iPhone SE (375 x 667)
   - iPhone 12/13 Pro (390 x 844)
   - iPhone 14 Pro Max (430 x 932)

### Firefox DevTools
1. Press `F12` or `Ctrl+Shift+I`
2. Click "Responsive Design Mode" icon (or press `Ctrl+Shift+M`)
3. Select iPhone from device list

### Safari DevTools (Mac)
1. Press `Cmd+Option+I`
2. Click "Responsive Design Mode" icon
3. Select iPhone model

## Testing Features

When testing on web, note that some features may behave differently:

### Working Features:
- ✅ Image list display
- ✅ Navigation between screens
- ✅ Form inputs and validation
- ✅ Responsive design
- ✅ Theme switching (dark/light)
- ✅ Animations and transitions

### Limited Features:
- ⚠️ Image picker (will use browser file picker instead of native gallery)
- ⚠️ Camera access (requires HTTPS in production)
- ⚠️ Some native animations may differ

## Quick Start

```bash
# Start web server
npx expo start --web

# Or if you have the script in package.json
npm run web
```

The app will automatically open in your default browser at `http://localhost:8081` or similar.

## Tips

1. **Refresh**: Press `Ctrl+R` or `Cmd+R` to reload
2. **Clear Cache**: Use `Ctrl+Shift+R` or `Cmd+Shift+R` for hard refresh
3. **Console Logs**: Check browser console for any errors
4. **Network Tab**: Monitor API calls in DevTools Network tab

## Production Build

To create a production web build:

```bash
npx expo export --platform web
```

The output will be in the `dist` folder.
