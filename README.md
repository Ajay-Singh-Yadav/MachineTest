# React Native Image App - Machine Test

A React Native app built with Expo that fetches images from an API, displays them in a list with pagination, and allows users to submit forms with image data.

## Features

- **Image Listing**: Displays images fetched from API with dynamic height and preserved aspect ratio
- **Pagination**: "Load More" button to fetch additional images using offset parameter
- **Image Detail Form**: Form with validation for First Name, Last Name, Email, and Phone Number
- **API Integration**: 
  - GET images from `https://dev3.xicomtechnologies.com/xttest/getdata.php`
  - POST user data to `https://dev3.xicomtechnologies.com/xttest/savedata.php`
- **Form Validation**: Proper validation for all form fields
- **Cross-platform**: Works on iOS, Android, and Web

## API Endpoints

### Get Images
- **URL**: `https://dev3.xicomtechnologies.com/xttest/getdata.php`
- **Method**: POST
- **Body**: Form data
  ```
  user_id: "108"
  offset: "0" (for pagination)
  type: "popular"
  ```

### Save User Data
- **URL**: `https://dev3.xicomtechnologies.com/xttest/savedata.php`
- **Method**: POST
- **Body**: Multipart form data
  ```
  first_name: string
  last_name: string
  email: string
  phone: string
  user_image: file (selected API image)
  ```

## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **For Web development** (to handle CORS):
   ```bash
   # Install proxy server dependencies
   npm install express http-proxy-middleware cors
   
   # Start proxy server (in separate terminal)
   node proxy-server.js
   ```

3. **Start the app**:
   ```bash
   # For mobile development
   npm start
   
   # For web development (after starting proxy server)
   npm run web
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components
├── services/           # API services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions (validation)
├── theme/              # Theme configuration
├── constants/          # App constants and strings
└── hooks/              # Custom React hooks
```

## Key Components

- **ImageListScreen**: Main screen displaying image grid with pagination
- **ImageDetailScreen**: Detail screen with form for user data entry
- **API Service**: Handles all API calls with proper error handling
- **Validation**: Form validation with proper error messages
- **Responsive Design**: Adapts to different screen sizes and orientations

## Technical Requirements Met

✅ Dynamic image height with preserved aspect ratio  
✅ Pagination using offset parameter  
✅ Form validation for all fields  
✅ API integration for both GET and POST requests  
✅ Image selection from API (not gallery)  
✅ Multipart form data submission  
✅ Cross-platform compatibility (iOS, Android, Web)  
✅ Proper error handling and loading states  

## Development Notes

- Uses Expo for cross-platform development
- TypeScript for type safety
- React Navigation for screen navigation
- Axios for HTTP requests
- Form validation with custom validation utilities
- Responsive design with theme system