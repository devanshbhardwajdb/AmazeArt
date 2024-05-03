import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    reviewText: {
        type: String,
        required: true,
    },
    profilepic: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    productTitle: {
        type: String,
        required: true,
    },
    productType: {
        type: String,
        required: true,
    },
    profilepic: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: "",
        required: true
    },
    contentUrl: {
        type: String,
        default: ""
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    reviews: {
        type: [ReviewSchema],
        default: []
    },
    shares: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Product = models.Product || model('Product', ProductSchema);

export default Product;
