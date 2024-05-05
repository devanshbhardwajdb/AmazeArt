import GoogleUser from "@models/User";
import connectDB from "@middleware/database";
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    // console.log(req.body.uid);
    try {
        if (req.method === 'POST') {
            let user = await GoogleUser.findOne({ uid: req.body.uid });

            if (user) {
                if (user.uid) {
                    var token = jwt.sign({  uid:user.uid, username: user.username, email: user.email, profilepic: user.profilepic, name: user.name, phone: user.phone, address: user.address, city: user.city, state: user.state, pincode: user.pincode, bio: user.bio, link: user.link, posts: user.posts, followers: user.followers, following: user.following }, process.env.JWT_SECRET, {
                        expiresIn: '2d'
                    })

                    res.status(200).json({ success: true, token });
                } else {
                    res.status(200).json({ success: false, error: "There was an error logging in through Google" });
                }
            } else {
                res.status(200).json({ success: false, error: "No user found" });
            }
        } else {
            res.status(400).json({ error: "This method is not defined" });
        }
    } catch (error) {
        console.error("Error occurred during login:", error);
        res.status(500).json({ error: "An error occurred" });
    }
}

export default connectDB(handler);
