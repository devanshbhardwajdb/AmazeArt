// Backend API (/pages/api/updatetoken.js)
import jwt from 'jsonwebtoken';
import connectDB from '@middleware/database';
import User from '@models/User';

const handler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const { username, imageUrl } = req.body;

            // Retrieve user data from the database
            const userData = await User.findOne({ username });

            // Update user data with the new image URL
            userData.coverpic = imageUrl;
            await userData.save();

            // Generate a new JWT token with updated user data
            const token = jwt.sign(userData.toObject(), process.env.JWT_SECRET, {
                expiresIn: '2d',
            });

            res.status(200).json({ success: true, token });
        } else {
            res.status(400).json({ error: 'This method is not defined' });
        }
    } catch (error) {
        console.error('Error updating token:', error);
        res.status(500).json({ error: 'An error occurred while updating token' });
    }
};

export default connectDB(handler);
