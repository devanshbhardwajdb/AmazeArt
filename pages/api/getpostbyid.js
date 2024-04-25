import connectDB from '@middleware/database';
import Post from '@models/Post';

const handler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      // Extract the post ID from the request query parameters
      const postId = req.query.id;

      // Fetch the post from the database by ID
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      res.status(200).json(post); // Return the post as JSON response
    } else {
      res.status(400).json({ error: 'Invalid request method' });
    }
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    res.status(500).json({ error: 'An error occurred while fetching post by ID' });
  }
};

export default connectDB(handler);
