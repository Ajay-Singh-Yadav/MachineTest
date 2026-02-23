# React Native Image Gallery App

A React Native application built with Expo that displays a gallery of images with dynamic aspect ratios and allows users to submit their details with an image.

## Features

- Image listing with dynamic height based on aspect ratio
- Pagination with "Load More" functionality
- Image detail screen with form
- Form validation (First Name, Last Name, Email, Phone)
- Image picker for user image upload
- Multipart form data submission

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your device:
- Scan the QR code with Expo Go app (iOS/Android)
- Press `a` for Android emulator
- Press `i` for iOS simulator (macOS only)
- Press `w` for web browser

## Project Structure

```
src/
├── components/
│   ├── ImageCard.js       # Reusable image card component
│   └── InputField.js      # Reusable input field with validation
├── screens/
│   ├── ImageListScreen.js # Main gallery screen
│   └── ImageDetailScreen.js # Detail form screen
├── services/
│   └── api.js            # API service functions
└── utils/
    └── validation.js     # Form validation utilities
```

## API Endpoints

- GET Images: `http://dev3.xicomtechnologies.com/xttest/getdata.php`
- POST User Data: `http://dev3.xicomtechnologies.com/xttest/savedata.php`

## Best Practices Implemented

- Component-based architecture
- Separation of concerns (services, utils, components, screens)
- Proper error handling
- Form validation
- Loading states
- Responsive design
- Clean code structure
