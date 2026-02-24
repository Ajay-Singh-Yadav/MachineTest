export interface ImageItem {
  id: string;
  xt_image: string;
  image_url?: string;
  url?: string;
  width?: number;
  height?: number;
}

export interface ImageResponse {
  images: ImageItem[];
  total?: number;
}

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface UserData extends UserFormData {
  image: {
    uri: string;
    name?: string;
    type?: string | null;
  } | null;
}

export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}
