import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// 1. Use MemoryStorage to access file buffer for processing
const storage = multer.memoryStorage();

// 2. File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG and PNG images are allowed.'), false);
  }
};

// 3. Configure multer
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Allow up to 10MB input (we will compress it)
  },
  fileFilter: fileFilter,
});

// 4. Image Optimization Middleware
export const optimizeImage = async (req, res, next) => {
  if (!req.file) return next();

  try {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `passport-${uniqueSuffix}.jpeg`;
    const filepath = path.join(uploadsDir, filename);

    // Process image with Sharp
    // - Resize to max 800x800px (good for passports)
    // - Convert to JPEG
    // - Compress to 80% quality
    await sharp(req.file.buffer)
      .resize(800, 800, { 
        fit: 'inside', 
        withoutEnlargement: true 
      })
      .toFormat('jpeg')
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(filepath);

    // Update req.file properties to match what diskStorage would have produced
    // This ensures compatibility with the controller
    req.file.path = filepath;
    req.file.filename = filename;
    req.file.destination = uploadsDir;
    req.file.mimetype = 'image/jpeg';
    
    // Clear buffer to free memory
    delete req.file.buffer;

    next();
  } catch (error) {
    console.error('Image optimization failed:', error);
    next(new Error('Failed to process image upload'));
  }
};
