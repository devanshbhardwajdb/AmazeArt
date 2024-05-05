const Razorpay = require("razorpay");
const shortid = require("shortid");
import Order from "@models/Order";
import Product from "@models/Product";
import connectDB from "@middleware/database";
import pincodes from "@/pincodes.json"

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_KEY,
    key_secret: process.env.NEXT_PUBLIC_SECRET,
});

const handler = async (req, res) => {
    // console.log(req.body)
    const { userData, subTotal } = req.body;


    try {

        if (req.method === 'POST') {


            let product, sumTotal = 0;
            let cart = req.body.cart
            for (let item in cart) {

                sumTotal += cart[item].price * cart[item].qty
                product = await Product.findOne({ _id: item })


                if (product.availableQty < cart[item].qty) {
                    return res.status(200).json({ success: false, error: "Some items in your cart went out of stock, try again after some time." });
                }
                if (product.price != cart[item].price) {
                    return res.status(200).json({ success: false, error: "The cart was tampered by you, so your order can not be placed" });
                }
            }



            if (subTotal <= 0) {
                return res.status(200).json({ success: false, error: "Your cart is empty! Please add items and then proceed" });
            }

            if (sumTotal !== subTotal) {
                return res.status(200).json({ success: false, error: "The cart was tampered by you, so you order can not be placed" });
            }

            const payment_capture = 1;
            const amount = parseInt(subTotal) * 100; // amount in paisa. In our case it's INR 1
            const currency = "INR";
            const options = {

                amount: amount.toString(),
                currency,
                receipt: shortid.generate(),
                payment_capture,
                notes: {
                    paymentFor: "AmazeArt",
                    username: userData.username,
                    userData: userData.email,
                    productId: Math.floor(Math.random() * Date.now()),
                }
            };



            const order = await razorpay.orders.create(options);
            let o = new Order({
                name: userData.name,
                username: userData.username,
                email: userData.email,
                orderId: order.id,
                products: cart,
                address: userData.address,
                city: userData.city,
                state: userData.state,
                pincode: userData.pincode,
                phone: userData.phone,
                amount: (order.amount) / 100
            })
            await o.save();


            res.status(200).json({ success: true, order });




        }
        else {
            res.status(400).json({ error: "This method is not defined" })
        }

    } catch (error) {

        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export default connectDB(handler);
