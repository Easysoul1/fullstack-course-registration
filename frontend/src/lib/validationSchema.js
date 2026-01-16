import { z } from 'zod';

// List of available courses from the image
export const AVAILABLE_COURSES = [
  'Product Design (UI/UX)',
  'Data Analysis',
  'Cybersecurity',
  'Frontend Development',
  'Backend Development',
  'DevOps Engineering',
  'Project Management',
  'Digital Marketing',
  'Virtual Assistance',
  'Artificial Intelligence',
];

export const registrationSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Full name must be at least 3 characters')
    .max(100, 'Full name is too long')
    .regex(/^[a-zA-Z\s]+$/, 'Full name should only contain letters and spaces'),
  
  mobileNumber: z
    .string()
    .regex(/^(\+234|0)[789]\d{9}$/, 'Please enter a valid Nigerian phone number (e.g., 08012345678 or +2348012345678)'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase(),
  
  fatherName: z
    .string()
    .min(3, "Father's name must be at least 3 characters")
    .max(100, "Father's name is too long")
    .regex(/^[a-zA-Z\s]+$/, "Father's name should only contain letters and spaces"),
  
  motherName: z
    .string()
    .min(3, "Mother's name must be at least 3 characters")
    .max(100, "Mother's name is too long")
    .regex(/^[a-zA-Z\s]+$/, "Mother's name should only contain letters and spaces"),
  
  course: z
    .string()
    .min(1, 'Please select a course'),
  
  dateOfBirth: z
    .string()
    .refine((date) => {
      const dob = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        return age - 1 >= 16;
      }
      return age >= 16;
    }, 'You must be at least 16 years old to register'),
  
  gender: z
    .enum(['male', 'female', 'other'], {
      required_error: 'Please select your gender',
    }),
  
  passportPhoto: z
    .instanceof(File, { message: 'Please upload your passport photograph' })
    .refine((file) => file.size <= 5 * 1024 * 1024, 'File size should be less than 5MB')
    .refine(
      (file) => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type),
      'Only JPEG and PNG formats are supported'
    ),
  
  address: z.object({
    street: z
      .string()
      .min(5, 'Street address must be at least 5 characters')
      .max(200, 'Street address is too long'),
    
    city: z
      .string()
      .min(2, 'City must be at least 2 characters')
      .max(100, 'City name is too long'),
    
    state: z
      .string()
      .min(2, 'State must be at least 2 characters')
      .max(100, 'State name is too long'),
    
    postalCode: z
      .string()
      .regex(/^\d{6}$/, 'Postal code must be 6 digits'),
  }),
});
