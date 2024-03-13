// pages/api/[username].js

import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Set up multer storage
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// Check file type
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const upload = multer({ storage, fileFilter });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    // Image uploaded successfully, return the URL
    const imageUrl = `/uploads/${req.file.filename}`;
    return res.status(200).json({ success: true, imageUrl });
  });
};

export default handler;
