import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const OrderSchema = new Schema({


    name: {
        type: String,
        required: true,

    },
    username: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,

    },
    phone: {
        type: String,
        required: true,

    },
    orderId: {
        type: String,
        required: true,

    },
    paymentId: {
        type: String,
        default: "Payment not done yet",


    },
    paymentInfo: {
        type: Object,


    },
    products: {
        type: Object,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        
    },
    state: {
        type: String,
        
    },
    pincode: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: 'Initiated',
        required: true,
    },
    deliveryStatus: {
        type: String,
        default: 'unshipped',
        required: true,
    },


}, { timestamps: true });

const Order = models.Order || model('Order', OrderSchema);

export default Order;