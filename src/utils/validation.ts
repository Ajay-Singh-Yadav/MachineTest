import { UserFormData, ValidationErrors, ValidationResult } from '../types';
import { strings } from '../constants/strings';

export const validateEmail = (email: string): boolean => {
  if (!email || email.trim().length === 0) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};

export const validatePhone = (phone: string): boolean => {
  if (!phone || phone.trim().length === 0) return false;
  // Remove spaces, dashes, parentheses, and plus signs
  const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, '');
  // Check if it's 10-15 digits
  const phoneRegex = /^[0-9]{10,15}$/;
  return phoneRegex.test(cleanPhone);
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const validateForm = (formData: UserFormData): ValidationResult => {
  const errors: ValidationErrors = {};

  if (!validateName(formData.firstName)) {
    errors.firstName = 'First name must be at least 2 characters long';
  }

  if (!validateName(formData.lastName)) {
    errors.lastName = 'Last name must be at least 2 characters long';
  }

  if (!formData.email || formData.email.trim().length === 0) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.phone || formData.phone.trim().length === 0) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(formData.phone)) {
    errors.phone = 'Phone number must be 10-15 digits';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
