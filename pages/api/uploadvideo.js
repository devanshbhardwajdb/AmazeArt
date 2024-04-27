import multer from 'multer';
import { storage } from '../../firebase.config'; // Import Firebase storage instance
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Initialize multer without diskStorage
const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    upload.single('video')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      // Check if file is uploaded
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Access the buffer containing the uploaded file
      const videoBuffer = req.file.buffer;

      // Generate a unique filename or use the original filename
      const uniqueFilename = req.file.originalname;

      // Create a reference to the Firebase Storage bucket and specify the filename
      const storageRef = ref(storage, uniqueFilename);

      // Upload the image file to Firebase Storage
      await uploadBytes(storageRef, videoBuffer);

      // Construct the URL of the uploaded image
      const videoUrl = await getDownloadURL(storageRef);

      // Return the URL of the uploaded image
      return res.status(200).json({ success: true, videoUrl });
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ error: 'Failed to upload image' });
  }
};

export default handler;
