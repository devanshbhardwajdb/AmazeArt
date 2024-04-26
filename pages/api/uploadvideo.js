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
  if (file.mimetype.startsWith('video/')) {
    cb(null, true);
    console.log("idhar se guzar gaya")
  } else {
    cb(new Error('Only videos are allowed'));
  }
};

const upload = multer({ storage, fileFilter });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  upload.single('video')(req, res, async (err) => {
    if (err) {
        console.log("erroe mein hu")
      return res.status(400).json({ error: err.message });
    }

    // Video uploaded successfully, return the URL
    const videoUrl = `/uploads/${req.file.filename}`;
    return res.status(200).json({ success: true, videoUrl });
  });
};

export default handler;
