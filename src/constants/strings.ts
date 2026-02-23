// Centralized strings for the application
export const strings = {
  // Screen Titles
  machineTest: 'Machine Test',
  imageDetails: 'Image Details',

  // Form Labels
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  phoneNumber: "Phone Number",
  enterYourDetails: "Enter Your Details",

  // Placeholders
  enterFirstName: "Enter first name",
  enterLastName: "Enter last name",
  enterEmail: "Enter email address",
  enterPhone: "Enter phone number",

  // Buttons
  submit: "Submit",
  loadMore: "Click here to load more",
  selectImages: "Select Images",
  selectImage: "Select Image",
  changeImage: "Change Image",
  back: "Back",
  MachineTest: "Machine Test",

  // Messages
  noMoreImages: "No more images",
  imagesSelected: (count: number) => `${count} Image(s) Selected`,

  // Validation Errors
  firstNameRequired: "* First name is required (minimum 2 characters)",
  lastNameRequired: "* Last name is required (minimum 2 characters)",
  emailRequired: "* Valid email address is required",
  phoneRequired: "* Valid phone number is required",

  // Alerts
  permissionRequired: "Permission Required",
  permissionMessage: "Please grant camera roll permissions",
  imageRequired: "Image Required",
  imageRequiredMessage: "Please select at least one image to upload",
  success: "Success",
  successMessage: "Your details have been saved successfully!",
  error: "Error",
  errorMessage: "Failed to save data. Please try again.",
  loadImagesError: "Failed to load images. Please try again.",
  ok: "OK",

  // API Messages
  savingData: "Saving your data...",
  loadingImages: "Loading images...",
};
