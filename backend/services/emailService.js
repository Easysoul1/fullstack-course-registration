import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { generateEmailHTML } from '../utils/emailTemplate.js';

dotenv.config();

// Create transporter with Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter verification failed:', error);
  } else {
    console.log('✓ Email service is ready to send messages');
  }
});

export async function sendRegistrationEmail(registrationData, photoPath) {
  try {
    const emailHTML = generateEmailHTML(registrationData);
    
    const mailOptions = {
      from: {
        name: 'SmartDesignHub Registration',
        address: process.env.EMAIL_USER,
      },
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Course Registration - ${registrationData.fullName}`,
      html: emailHTML,
      attachments: [
        {
          filename: `passport_${registrationData.fullName.replace(/\s+/g, '_')}.jpg`,
          path: photoPath,
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✓ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('✗ Email sending failed:', error);
    throw new Error('Failed to send registration email: ' + error.message);
  }
}
