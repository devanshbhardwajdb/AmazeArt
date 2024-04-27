import multer from 'multer';
import { storage } from '../../firebase.config'; // Import Firebase storage instance
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import path from 'path';

// Initialize multer without diskStorage
const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      // Check if file is uploaded
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Access the buffer containing the uploaded file
      const imageBuffer = req.file.buffer;

      // Generate a unique filename with file extension
      const originalFilename = req.file.originalname;
      const fileExtension = path.extname(originalFilename);
      const uniqueFilename = `${Date.now()}${fileExtension}`;

      // Create a reference to the Firebase Storage bucket and specify the filename
      const storageRef = ref(storage, uniqueFilename);

      // Upload the image file to Firebase Storage
      await uploadBytes(storageRef, imageBuffer);

      // Construct the URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      // Return the URL of the uploaded image
      return res.status(200).json({ success: true, imageUrl });
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ error: 'Failed to upload image' });
  }
};

export default handler;
