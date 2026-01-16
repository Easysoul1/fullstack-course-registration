import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import registrationRoutes from './routes/registration.js';

// ES Module dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✓ Created uploads directory');
}

// Middleware
// Middleware
const allowedOrigins = [
  'http://localhost:5173', // Default Vite port
  'http://localhost:5174', // Fallback Vite port
  'http://localhost:5000', // Backend server
  'https://smartdesignhub.vercel.app', // Production
];

// Add FRONTEND_URL from env if it exists and isn't already in the list
if (process.env.FRONTEND_URL && !allowedOrigins.includes(process.env.FRONTEND_URL)) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically (optional, for viewing)
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api', registrationRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'SmartDesignHub Registration Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'SmartDesignHub Course Registration API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      register: 'POST /api/register',
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File size exceeds 5MB limit',
    });
  }
  
  if (err.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  
  // Generic error
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

// Start server
app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════════════╗');
  console.log('║  SmartDesignHub Course Registration Server        ║');
  console.log('╠════════════════════════════════════════════════════╣');
  console.log(`║  Server running on: http://localhost:${PORT}         ║`);
  console.log(`║  Environment: ${process.env.NODE_ENV || 'development'}                      ║`);
  console.log('╚════════════════════════════════════════════════════╝');
});

export default app;
