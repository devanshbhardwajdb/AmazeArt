import connectDB from '@middleware/database';
import Post from '@models/Post';

const handler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      // Fetch all posts from the database
      const posts = await Post.find();
      

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
