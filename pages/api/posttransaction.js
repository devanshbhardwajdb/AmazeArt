const Razorpay = require("razorpay");
const shortid = require("shortid");
const crypto = require("crypto");
import Order from "@models/Order";
import Product from "@models/Product";
import connectDB from "@middleware/database";

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_KEY,
    key_secret: process.env.NEXT_PUBLIC_SECRET,
});

const handler = async (req, res) => {
    // console.log(req.body.cart)

    let order;
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.NEXT_PUBLIC_SECRET)
            .update(body.toString())
            .digest("hex")

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            order = await Order.findOneAndUpdate({ orderId: razorpay_order_id }, { status: "Paid", paymentInfo: req.body , paymentId: razorpay_payment_id})
            let products = order.products;
            for(let slug in products){
                await Product.findOneAndUpdate({slug:slug},{$inc :{"availableQty": - products[slug].qty}})
            }

            res.redirect(`${process.env.NEXT_PUBLIC_HOST}/order?id=` + order._id +`&clearCart=1`, 200)
        }
        else {
            order = await Order.findOneAndUpdate({ orderId: razorpay_order_id }, { status: "Failed", paymentInfo: req.body })
            res.status(400).json({ success: false });
        }




    } catch (error) {
        console.error('Your Payment was not succesfull', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export default connectDB(handler);
