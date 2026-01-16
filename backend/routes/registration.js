import express from 'express';
import { upload, optimizeImage } from '../middleware/uploadMiddleware.js';
import { registrationValidationRules, validate } from '../middleware/validationMiddleware.js';
import { handleRegistration } from '../controllers/registrationController.js';

const router = express.Router();

// POST /api/register - Handle course registration
router.post(
  '/register',
  upload.single('passportPhoto'),
  optimizeImage,
  registrationValidationRules,
  validate,
  handleRegistration
);

export default router;
