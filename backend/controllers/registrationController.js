import { sendRegistrationEmail } from '../services/emailService.js';
import dotenv from 'dotenv';

dotenv.config();

export async function handleRegistration(req, res) {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Passport photograph is required',
      });
    }

    // Parse address if it's a string
    let address = req.body.address;
    if (typeof address === 'string') {
      try {
        address = JSON.parse(address);
      } catch (e) {
        return res.status(400).json({
          success: false,
          message: 'Invalid address format',
        });
      }
    }

    // Prepare registration data
    const registrationData = {
      fullName: req.body.fullName,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      fatherName: req.body.fatherName,
      motherName: req.body.motherName,
      course: req.body.course,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      address: address,
    };

    // Send email with registration details and passport photo
    await sendRegistrationEmail(registrationData, req.file.path);

    // Return success response with WhatsApp link
    res.status(200).json({
      success: true,
      message: 'Registration submitted successfully',
      whatsappLink: process.env.WHATSAPP_PAYMENT_LINK,
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process registration. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
