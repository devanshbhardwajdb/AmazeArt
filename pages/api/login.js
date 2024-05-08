import User from '@models/User';
import connectDB from '@middleware/database';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const { email } = req.body;

            let user = await User.findOne({ email });

            if (!user) {
                res.status(200).json({ success: false, error: 'No user found' });
                return;
            }

            // const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
            // const decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

            if (user) {
                const token = jwt.sign({
                    username: user.username,
                    email: user.email,
                    profilepic: user.profilepic,
                    name: user.name,
                    phone: user.phone,
                    address: user.address,
                    city: user.city,
                    state: user.state,
                    pincode: user.pincode,
                    bio: user.bio,
                    link: user.link,
                    posts: user.posts,
                    followers: user.followers,
                    following: user.following
                }, process.env.JWT_SECRET, {
                    expiresIn: '2d'
                });

                res.status(200).json({ success: true, token });
            } else {
                res.status(200).json({ success: false, error: 'Invalid credentials' });
            }
        } else {
            res.status(400).json({ error: 'This method is not defined' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

export default connectDB(handler);
