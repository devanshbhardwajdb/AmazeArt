import jwt from 'jsonwebtoken';
import connectDB from '@middleware/database';
import User from '@models/User';

const handler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const { username, address, city, state, pincode, bio, creatorTag,link } = req.body;

            // Retrieve user data from the database
            let userData = await User.findOne({ username });

            // console.log(req.body)

            // Update user data with the new profile information
            
            
            
            userData.address = address;
            userData.city = city;
            userData.state = state;
            userData.pincode = pincode;
            userData.bio = bio;
            userData.link = link;
            userData.creatorTag = creatorTag.value;

            // Save the updated user data
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
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'An error occurred while updating profile' });
    }
};

export default connectDB(handler);
