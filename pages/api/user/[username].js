import User from "@models/User";
import connectDB from "@middleware/database";



const handler = async (req, res) => {

    try {
        if (req.method === 'GET') {
          // console.log("Ye mai api mein hoon",req.query)

            let user = await User.findOne({ username: req.query.username });
           
            
            if (user ) {

              
                return res.status(200).json({ success: true, user });
            }
            else {
                return res.status(200).json({ success: false, error: "User not found" })
            }

        }
        else {
            return res.status(400).json({ error: "This method is not defined" })
        }

    } catch (error) {
        console.log("User not fetched properly", error);
        res.status(500).json({ error: "An error occurred" });


    }


}


export default connectDB(handler);




