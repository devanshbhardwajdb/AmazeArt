import User from "@models/User";
import GoogleUser from "@models/GoogleUser";
import connectDB from "@middleware/database";
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const { uid, displayName, email, photoURL } = req.body;
            let user = await GoogleUser.findOne({ uid: uid });

            if (!user) {
                let newUser = new GoogleUser({ uid, name: displayName, email, profilepic: photoURL });
                await newUser.save();
                res.status(200).json({ success: "User was added successfully" });
            } else {
                res.status(200).json({ success: false, error: "User with the same Email or Phone already exists" });
            }
        } else {
            res.status(400).json({ error: "This method is not defined" });
        }
    } catch (error) {
        console.error("User was not added to the database", error);
        res.status(500).json({ error: "An error occurred while adding the user" });
    }
}

export default connectDB(handler);
