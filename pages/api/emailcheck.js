import User from '@models/User';
import connectDB from '@middleware/database';
import CryptoJS from 'crypto-js';

const handler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const { username, email, phone } = req.body;

            let user = await User.findOne({ phone: phone });
            let user2 = await User.findOne({ email: email });

            if (!user && !user2) {
                
                res.status(200).json({ success: true, message: 'User was added successfully' });
            } else if(user){
                res.status(200).json({ success: false, error: 'User with same Phone already exists' });
            }
            else if(user2){
                res.status(200).json({ success: false, error: 'User with same Email already exists' });
            }
            else{
                res.status(200).json({ success: false, error: 'User with same Email and Phone already exists' });
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
