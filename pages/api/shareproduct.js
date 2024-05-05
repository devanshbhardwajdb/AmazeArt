import connectDB from '@middleware/database';
import Product from '@models/Product';

const handler = async (req, res) => {
    try {
        if (req.method === 'PUT') {
            const { postId } = req.body;

            // Find the post by ID
            const post = await Product.findById(postId);

            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            // Increment the share count
            post.shares += 1;

            // Save the updated post
            await post.save();

            res.status(200).json({ message: 'Post shared successfully' });
        } else {
            res.status(400).json({ error: 'Invalid request method' });
        }
    } catch (error) {
        console.error('Error sharing post:', error);
        res.status(500).json({ error: 'An error occurred while sharing post' });
    }
};

export default connectDB(handler);
