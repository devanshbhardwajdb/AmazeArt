// Import necessary modules
import connectDB from '@middleware/database';
import Post from '@models/Post';

const handler = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const { username } = req.query;

            // Retrieve posts liked by the specified user from the database
            const likedPosts = await Post.find({ likes: username });

            res.status(200).json({ success: true, likedPosts });
        } else {
            res.status(400).json({ error: 'This method is not defined' });
        }
    } catch (error) {
        console.error('Error fetching liked posts:', error);
        res.status(500).json({ error: 'An error occurred while fetching liked posts' });
    }
};

export default connectDB(handler);
