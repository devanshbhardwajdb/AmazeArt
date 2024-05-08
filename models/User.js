import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        // required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    profilepic: {
        type: String,
        default: ""
    },
    coverpic: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    pincode: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    link: {
        type: String,
        default: ""
    },
    posts: {
        type: Number,
        default: 0
    },
    products: {
        type: Number,
        default: 0
    },
    followers: {
        type: [String], // Array of usernames
        default: []
    },
    following: {
        type: [String], // Array of usernames
        default: []
    },
    creatorTag: {
        type: String,
        default: ""
    },
}, { timestamps: true });

const User = models.User || model('User', UserSchema);

export default User;
