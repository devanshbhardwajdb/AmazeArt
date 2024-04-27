// pages/api/uploadImage.js

import multer from 'multer';

// Initialize multer without diskStorage
const upload = multer({ storage: multer.memoryStorage() });

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

    // Access the buffer containing the uploaded file
    const imageBuffer = req.file.buffer;

    try {
      // Use Vercel's File System (FS) API to write the file
      const { fileId } = await fetch('/_api/uploads', {
        method: 'POST',
        body: imageBuffer,
      }).then((res) => res.json());

      // Construct the URL of the uploaded image
      const imageUrl = `/_next/image?url=${encodeURIComponent(`/_next/static/${fileId}`)}&w=640&q=75`;

      // Return the URL of the uploaded image
      return res.status(200).json({ success: true, imageUrl });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to upload image' });
    }
  });
};

export default handler;
