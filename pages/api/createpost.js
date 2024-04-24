import connectDB from '@middleware/database';
import Post from '@models/Post';

const handler = async (req, res) => {

  // console.log(req.body)
  try {
    if (req.method === 'POST') {
      const {
        name,
        username,
        profilepic,
        caption,
        contentUrl,
        shares,
      } = req.body;

      // Create a new post object
      const newPost = new Post({
        name,
        username,
        profilepic,
        caption,
        contentUrl,
        shares,
      });

      // Save the new post to the database
      const savedPost = await newPost.save();

      res.status(201).json({ success: true, savedPost });; // Return the saved post as JSON response
    } else {
      res.status(400).json({ error: 'Invalid request method' });
    }
  } catch (error) {
    console.error('Error adding post:', error);
    res.status(500).json({ error: 'An error occurred while adding the post' });
  }
};

export default connectDB(handler);
