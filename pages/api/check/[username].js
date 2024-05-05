import User from "@models/User";
import connectDB from "@middleware/database";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const { username } = req.query;
            // console.log(username);

            // Find the user asynchronously
            let user = await User.findOne({ username: username });

            if (user) {
                console.log("User found");
                res.status(200).json({ success: true });
            } else {
                console.log("User not found");
                res.status(200).json({ success: false, error: "User with the same username does not exist" });
            }
        } else {
            res.status(400).json({ error: "This method is not defined" });
        }
    } catch (error) {
        console.error("Error occurred while processing request:", error);
        res.status(500).json({ error: "An error occurred" });
    }
}

export default connectDB(handler);
