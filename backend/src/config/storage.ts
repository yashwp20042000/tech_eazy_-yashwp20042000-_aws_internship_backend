
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import ApiError from '../utils/apiError';

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create vendor-specific subdirectory if available
    const vendorDir = req.user?.vendorId 
      ? path.join(UPLOAD_DIR, req.user.vendorId.toString())
      : UPLOAD_DIR;
    
    if (!fs.existsSync(vendorDir)) {
      fs.mkdirSync(vendorDir);
    }
    cb(null, vendorDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedMimes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv'
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Invalid file type. Only Excel/CSV files are allowed'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 1
  }
});

export const deleteFile = (filePath: string) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error(`Error deleting file ${filePath}:`, err);
  });
};

export const cleanupOldFiles = async (days = 30) => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  // Implementation would vary based on actual storage system
  console.log(`File cleanup for files older than ${cutoff} would run here`);
};
