import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const PostSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    username: {
        type: String,
        required: true,
        

    },
    profilepic: {
        type: String,
        default: ""

    },
    caption: {
        type: String,
        default: ""

    },
    content: {
        type: String,
        default: ""

    },
    likes: [{
        type: Schema.Types.ObjectId, ref: 'Like'
    }],
    comments: [{
        type: Schema.Types.ObjectId, ref: 'Comment'
    }],
    

    shares: {
        type: Number,
        default:0,

    },
    
   



}, { timestamps: true });

const Post = models.Post || model('Post', PostSchema);

export default Post;