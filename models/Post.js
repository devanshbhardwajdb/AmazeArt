import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    commentText: {
        type: String,
        required: true,
    },
    profilepic: {
        type: String,
        required: true,
    }
}, { timestamps: true });

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
    contentUrl: {
        type: String,
        default: ""
    },
    likes: [{
        type: String,
        default: [] // Array of usernames who liked the post
    }],
    comments: {
        type: [CommentSchema],
        default: []

    }, // Array of comment objects
    shares: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const Post = models.Post || model('Post', PostSchema);

export default Post;
