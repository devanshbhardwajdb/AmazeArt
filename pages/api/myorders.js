import Order from "@models/Order";
import connectDB from "@middleware/database";

const jwt = require('jsonwebtoken');



const handler = async (req, res) => {
    
    

    try {

        let order = await Order.find({email:req.body.userData.email,status:"Paid"})

        res.status(200).json({ success: "Order Fetched", order });

    } catch (error) {
        
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export default connectDB(handler);
