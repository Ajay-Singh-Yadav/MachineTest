import axios from 'axios';
import { ImageResponse, UserData, ImageItem } from '../types';
import { Platform } from 'react-native';

const BASE_URL = 'https://dev3.xicomtechnologies.com/xttest';

export const getImages = async (offset: number = 0): Promise<ImageResponse> => {
  try {
    console.log('Fetching images with offset:', offset, 'Platform:', Platform.OS);
    
    // Use FormData for all platforms - the API expects form-data
    const formData = new FormData();
    formData.append('user_id', '108');
    formData.append('offset', offset.toString());
    formData.append('type', 'popular');

    console.log('Sending request to:', `${BASE_URL}/getdata.php`);
    console.log('FormData created with user_id=108, offset=' + offset + ', type=popular');

    const response = await axios.post(`${BASE_URL}/getdata.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 10000, // 10 second timeout
    });

    console.log('API Response Status:', response.status);
    console.log('API Response Data:', response.data);

    // Handle the actual API response structure
    if (response.data && response.data.status === 'success' && response.data.images) {
      const processedImages = response.data.images.map((img: any) => ({
        id: img.id,
        xt_image: img.xt_image,
        image_url: img.xt_image, // Map xt_image to image_url for compatibility
        url: img.xt_image, // Map xt_image to url for compatibility
        width: 300, // Default width for shoe images
        height: 400, // Default height for shoe images (3:4 ratio)
      }));

      console.log('Processed images:', processedImages.length);
      return {
        images: processedImages,
        total: processedImages.length,
      };
    }

    console.log('No valid images in response');
    return { images: [], total: 0 };
  } catch (error) {
    console.error('Error fetching images:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
      });
    }
    throw error;
  }
};

export const saveUserData = async (userData: UserData): Promise<any> => {
  try {
    console.log('Saving user data:', userData);
    
    const formData = new FormData();
    formData.append('first_name', userData.firstName);
    formData.append('last_name', userData.lastName);
    formData.append('email', userData.email);
    formData.append('phone', userData.phone);

    if (userData.image) {
      if (Platform.OS === 'web') {
        // For web, we need to fetch the image and create a blob
        try {
          const imageResponse = await fetch(userData.image.uri);
          const blob = await imageResponse.blob();
          formData.append('user_image', blob, userData.image.name || 'image.jpg');
        } catch (imageError) {
          console.warn('Could not fetch image for web upload:', imageError);
        }
      } else {
        // For mobile, use the standard format
        const imageUri = userData.image.uri;
        const filename = imageUri.split('/').pop() || 'image.jpg';
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image/jpeg';

        formData.append('user_image', {
          uri: imageUri,
          name: filename,
          type,
        } as any);
      }
    }

    const response = await axios.post(`${BASE_URL}/savedata.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 10000,
    });

    console.log('Save response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error saving user data:', error);
    if (axios.isAxiosError(error)) {
      console.error('Save error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    throw error;
  }
};
