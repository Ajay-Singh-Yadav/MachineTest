import axios from 'axios';
import { ImageResponse, UserData, ImageItem } from '../types';

const BASE_URL = 'https://dev3.xicomtechnologies.com/xttest';

export const getImages = async (offset: number = 0): Promise<ImageResponse> => {
  try {
    console.log('Fetching images with offset:', offset);
    
    // Use FormData for the API request
    const formData = new FormData();
    formData.append('user_id', '108');
    formData.append('offset', offset.toString());
    formData.append('type', 'popular');

    console.log('Sending request to:', `${BASE_URL}/getdata.php`);

    const response = await axios.post(`${BASE_URL}/getdata.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 15000,
    });

    console.log('API Response Status:', response.status);
    console.log('API Response Data:', response.data);

    // Handle the actual API response structure
    if (response.data && response.data.status === 'success' && response.data.images) {
      const processedImages = response.data.images.map((img: any) => ({
        id: img.id,
        xt_image: img.xt_image,
        image_url: img.xt_image,
        url: img.xt_image,
        width: 300,
        height: 400,
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

    // Add image to multipart form data
    if (userData.image) {
      const imageUri = userData.image.uri;
      const filename = imageUri.split('/').pop() || 'image.jpg';
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';

      console.log('Adding image to form data:', { uri: imageUri, name: filename, type });
      formData.append('user_image', {
        uri: imageUri,
        name: filename,
        type,
      } as any);
    } else {
      throw new Error('No image selected');
    }

    console.log('Sending multipart form data to server...');
    const response = await axios.post(`${BASE_URL}/savedata.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 15000,
    });

    console.log('Save response status:', response.status);
    console.log('Save response data:', response.data);

    // Check for successful response
    if (response.status === 200) {
      return {
        success: true,
        message: 'Data saved successfully',
        data: response.data
      };
    } else {
      throw new Error(`Server responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error saving user data:', error);
    if (axios.isAxiosError(error)) {
      console.error('Save error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      
      if (error.response?.status === 400) {
        throw new Error('Invalid data provided');
      } else if (error.response?.status === 500) {
        throw new Error('Server error occurred');
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout - please try again');
      }
    }
    throw error;
  }
};
