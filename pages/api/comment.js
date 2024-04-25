// Import necessary modules
import connectDB from '@middleware/database';
import Post from '@models/Post';

const handler = async (req, res) => {
    try {
        if (req.method === 'PUT') {
            
            const { username, commentText, postId ,profilepic} = req.body;
            // console.log(username, commentText, postId)

            // Retrieve post data from the database
            const post = await Post.findById(postId);
            // console.log(post)

            // If post data doesn't exist, return an error
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            // Add the new comment to the comments array
            post.comments.push({ username, commentText, profilepic });

            // Save the updated post
            await post.save();

            res.status(200).json({ success: true, message: 'Comment added successfully',post });
        } else {
            
            res.status(400).json({ error: 'This method is not defined' });
        }
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'An error occurred while adding comment' });
    }
};

export default connectDB(handler);
