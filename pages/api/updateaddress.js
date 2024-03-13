import User from "@models/User";
import connectDB from "@middleware/database";

const handler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const { username, address, city, state, pincode } = req.body;

            // Find the user by username
            let user = await User.findOne({ username });

            // Check if the user exists
            if (!user) {
                return res.status(404).json({ success: false, error: "User not found" });
            }

            // Update the user's address, city, state, and pincode
            user.address = address;
            user.city = city;
            user.state = state;
            user.pincode = pincode;

            // Save the updated user object
            await user.save();

            return res.status(200).json({ success: true, message: "User address updated successfully" });
        } else {
            return res.status(400).json({ error: "This method is not defined" });
        }
    } catch (error) {
        console.error("Error updating user address:", error);
        return res.status(500).json({ error: "An error occurred while updating user address" });
    }
}

export default connectDB(handler);
