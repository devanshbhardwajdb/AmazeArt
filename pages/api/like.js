// Import necessary modules
import connectDB from '@middleware/database';
// Remove the Post model from the require cache
// delete require.cache[require.resolve('@models/Post')];

// Reimport the Post model
import Post from '@models/Post';


const handler = async (req, res) => {
    // console.log(req.body)
    try {
        if (req.method === 'PUT') {
            const { postId } = req.query;
            const { username } = req.body;

            // Retrieve post data from the database
            const post = await Post.findById(postId);

            // console.log("ye rhi pst",post)

            // If post data doesn't exist, return an error
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            // Check if the user already liked the post
            const userIndex = post.likes.indexOf(username);
            if (userIndex !== -1) {
                // If user already liked, remove the username from the likes array
                post.likes.splice(userIndex, 1);
            } else {
                // If user didn't like, add the username to the likes array
                post.likes.push(username);
            }

            // Save the updated post
            await post.save();

            res.status(200).json({ success: true, message: 'Like toggled successfully' });
        } else {
            res.status(400).json({ error: 'This method is not defined' });
        }
    } catch (error) {
        console.error('Error toggling like:', error);
        res.status(500).json({ error: 'An error occurred while toggling like' });
    }
};

export default connectDB(handler);
