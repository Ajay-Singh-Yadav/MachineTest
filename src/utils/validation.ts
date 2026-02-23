import { UserFormData, ValidationErrors, ValidationResult } from '../types';
import { strings } from '../constants/strings';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10,15}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const validateForm = (formData: UserFormData): ValidationResult => {
  const errors: ValidationErrors = {};

  if (!validateName(formData.firstName)) {
    errors.firstName = strings.firstNameRequired;
  }

  if (!validateName(formData.lastName)) {
    errors.lastName = strings.lastNameRequired;
  }

  if (!validateEmail(formData.email)) {
    errors.email = strings.emailRequired;
  }

  if (!validatePhone(formData.phone)) {
    errors.phone = strings.phoneRequired;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
