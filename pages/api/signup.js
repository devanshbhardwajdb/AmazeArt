import User from "@models/User";
import connectDB from "@middleware/database";
var CryptoJS = require("crypto-js")



const handler = async (req, res) => {

    try {
        if (req.method === 'POST') {

            const { username, name, email, phone } = req.body;


            let user = await User.findOne({ phone: phone });
            let user2 = await User.findOne({ email: email });

            if (!user && !user2) {

                let u = new User({ username, name, email, phone, password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString() })
                await u.save();
                res.status(200).json({ success: "User was added successfully" })
            }
            else {
                res.status(200).json({ success: false, error: "User with same Email or Phone already exists" })
            }

        }
        else {
            res.status(400).json({ error: "This method is not defined" })
        }

    } catch (error) {
        console.log("user was not added to database", error);
        res.status(500).json({ error: "An error occurred" });


    }


}


export default connectDB(handler);



