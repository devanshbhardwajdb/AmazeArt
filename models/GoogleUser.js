import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        // required: true,

    },
    uid: {
        type: String,
        required: true,
        unique:true

    },
    username: {
        type: String,
        // required: true,
        unique: true

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
        // required: true,
        // unique: true,

    },
    password: {
        type: String,
        // required: true,

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
    followers: {
        type: Number,
        default: 0

    },
    following: {
        type: Number,
        default: 0

    },
    creatorTag: {
        type: String,
        default: ""

    },



}, { timestamps: true });

const GoogleUser = models.GoogleUser || model('GoogleUser', UserSchema);

export default GoogleUser;