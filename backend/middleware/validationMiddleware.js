import { body, validationResult } from 'express-validator';

export const registrationValidationRules = [
  body('fullName')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Full name must be between 3 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Full name should only contain letters and spaces')
    .escape(),
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('mobileNumber')
    .trim()
    .matches(/^(\+234|0)[789]\d{9}$/)
    .withMessage('Please provide a valid Nigerian phone number'),
  
  body('fatherName')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Father's name must be between 3 and 100 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Father's name should only contain letters and spaces")
    .escape(),
  
  body('motherName')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Mother's name must be between 3 and 100 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Mother's name should only contain letters and spaces")
    .escape(),
  
  body('course')
    .trim()
    .notEmpty()
    .withMessage('Please select a course')
    .escape(),
  
  body('dateOfBirth')
    .isISO8601()
    .withMessage('Please provide a valid date of birth')
    .custom((value) => {
      const dob = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      
      let actualAge = age;
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        actualAge = age - 1;
      }
      
      if (actualAge < 16) {
        throw new Error('You must be at least 16 years old to register');
      }
      return true;
    }),
  
  body('gender')
    .isIn(['male', 'female', 'other'])
    .withMessage('Please select a valid gender'),
  
  body('address')
    .custom((value) => {
      if (typeof value === 'string') {
        try {
          return JSON.parse(value);
        } catch (e) {
          throw new Error('Invalid address format');
        }
      }
      return value;
    }),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  
  next();
};
