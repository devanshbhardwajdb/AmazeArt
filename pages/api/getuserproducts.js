import connectDB from '@middleware/database';
import Product from '@models/Product';

const handler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const { username } = req.query;

      // Fetch posts where post.username is similar to the provided username
      const posts = await Product.find({ username: { $regex: new RegExp(username, 'i') } });
      
      res.status(200).json(posts); // Return the posts as JSON response
    } else {
      res.status(400).json({ error: 'Invalid request method' });
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching posts' });
  }
};

export default connectDB(handler);
