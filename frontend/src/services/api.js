import emailjs from '@emailjs/browser';
import imageCompression from 'browser-image-compression';

// Initialize EmailJS
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const registrationAPI = {
  submitRegistration: async (formData) => {
    try {
      // 1. Extract data from FormData
      const data = {};
      const address = JSON.parse(formData.get('address'));
      
      data.to_name = "Admin"; // For email greeting
      data.fullName = formData.get('fullName');
      data.email = formData.get('email');
      data.mobileNumber = formData.get('mobileNumber');
      data.fatherName = formData.get('fatherName');
      data.motherName = formData.get('motherName');
      data.course = formData.get('course');
      data.dateOfBirth = formData.get('dateOfBirth');
      data.gender = formData.get('gender');
      
      // Flatten address for email template
      data.street = address.street;
      data.city = address.city;
      data.state = address.state;
      data.postalCode = address.postalCode;

      // 2. Handle Image Processing (Compression & Base64)
      const passportFile = formData.get('passportPhoto');
      if (passportFile && passportFile instanceof File) {
        console.log('Original file size:', passportFile.size / 1024 / 1024, 'MB');

        const options = {
          maxSizeMB: 0.05, // Compress to very small size (50KB) for email attachment
          maxWidthOrHeight: 600,
          useWebWorker: true,
        };

        try {
          const compressedFile = await imageCompression(passportFile, options);
          console.log('Compressed file size:', compressedFile.size / 1024 / 1024, 'MB');
          
          // Convert to Base64
          const base64 = await fileToBase64(compressedFile);
          data.passport_photo = base64; // Attach to email parameters
        } catch (error) {
          console.error("Image compression error:", error);
          // Continue without photo if compression fails, or throw error
        }
      }

      // 3. Send Email via EmailJS
      console.log("EmailJS Config Check:", { 
        serviceId: SERVICE_ID, 
        templateId: TEMPLATE_ID, 
        publicKey: PUBLIC_KEY ? `${PUBLIC_KEY.substring(0, 5)}...` : 'Missing' 
      });

      const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY);
      
      console.log('SUCCESS!', response.status, response.text);
      
      // Return success with hardcoded/env WhatsApp link since backend is gone
      return { 
        success: true, 
        whatsappLink: import.meta.env.VITE_WHATSAPP_LINK || 'https://wa.link/rxmy36'
      };

    } catch (error) {
      console.error('Registration failed specific error:', error);
      if (error.text) {
        console.error('EmailJS Error Text:', error.text);
      }
      throw new Error(`Registration failed: ${error.text || error.message || 'Please check your internet connection or keys.'}`);
    }
  },
};

// Helper: Convert File to Base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result); // Returns "data:image/jpeg;base64,..."
    reader.onerror = (error) => reject(error);
  });
};
