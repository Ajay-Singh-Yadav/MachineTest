import axios from 'axios';
import { ImageResponse, UserData, ImageItem } from '../types';

const BASE_URL = 'http://dev3.xicomtechnologies.com/xttest';
const USE_DUMMY_DATA = true; // Set to false to use real API

// Dummy data for testing
const DUMMY_IMAGES: ImageItem[] = [
  {
    id: '1',
    image_url: 'https://picsum.photos/400/600',
    url: 'https://picsum.photos/400/600',
    width: 400,
    height: 600,
  },
  {
    id: '2',
    image_url: 'https://picsum.photos/800/400',
    url: 'https://picsum.photos/800/400',
    width: 800,
    height: 400,
  },
  {
    id: '3',
    image_url: 'https://picsum.photos/600/800',
    url: 'https://picsum.photos/600/800',
    width: 600,
    height: 800,
  },
  {
    id: '4',
    image_url: 'https://picsum.photos/500/500',
    url: 'https://picsum.photos/500/500',
    width: 500,
    height: 500,
  },
  {
    id: '5',
    image_url: 'https://picsum.photos/700/400',
    url: 'https://picsum.photos/700/400',
    width: 700,
    height: 400,
  },
  {
    id: '6',
    image_url: 'https://picsum.photos/400/700',
    url: 'https://picsum.photos/400/700',
    width: 400,
    height: 700,
  },
  {
    id: '7',
    image_url: 'https://picsum.photos/900/500',
    url: 'https://picsum.photos/900/500',
    width: 900,
    height: 500,
  },
  {
    id: '8',
    image_url: 'https://picsum.photos/500/900',
    url: 'https://picsum.photos/500/900',
    width: 500,
    height: 900,
  },
];

export const getImages = async (offset: number = 0): Promise<ImageResponse> => {
  if (USE_DUMMY_DATA) {
   
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const itemsPerPage = 4;
    const start = offset;
    const end = start + itemsPerPage;
    
    // Generate unique images by adding offset to IDs to avoid duplicate keys
    const images = DUMMY_IMAGES.slice(start % DUMMY_IMAGES.length, (start % DUMMY_IMAGES.length) + itemsPerPage)
      .map((img, idx) => ({
        ...img,
        id: `${Math.floor(start / DUMMY_IMAGES.length)}-${img.id}-${start + idx}`,
      }));
    
    // If we need more images, wrap around
    if (images.length < itemsPerPage && start < 20) {
      const remaining = itemsPerPage - images.length;
      const wrappedImages = DUMMY_IMAGES.slice(0, remaining).map((img, idx) => ({
        ...img,
        id: `${Math.floor((start + images.length) / DUMMY_IMAGES.length)}-${img.id}-${start + images.length + idx}`,
      }));
      images.push(...wrappedImages);
    }
    
    return {
      images,
      total: DUMMY_IMAGES.length,
    };
  }

  try {
    const formData = new FormData();
    formData.append('user_id', '108');
    formData.append('offset', offset.toString());
    formData.append('type', 'popular');

    const response = await axios.post(`${BASE_URL}/getdata.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformResponse: [(data) => {
        try {
          return JSON.parse(data);
        } catch (e) {
          return data;
        }
      }],
    });

   
    if (response.data && response.data.images) {
      response.data.images = response.data.images.map(img => ({
        ...img,
        width: parseFloat(img.width) || 1,
        height: parseFloat(img.height) || 1,
      }));
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export const saveUserData = async (userData: UserData): Promise<any> => {
  if (USE_DUMMY_DATA) {

    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Dummy save:', userData);
    return { success: true, message: 'Data saved successfully' };
  }

  try {
    const formData = new FormData();
    formData.append('first_name', userData.firstName);
    formData.append('last_name', userData.lastName);
    formData.append('email', userData.email);
    formData.append('phone', userData.phone);

    if (userData.image) {
      const imageUri = userData.image.uri;
      const filename = imageUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';

      formData.append('user_image', {
        uri: imageUri,
        name: filename,
        type,
      });
    }

    const response = await axios.post(`${BASE_URL}/savedata.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};
