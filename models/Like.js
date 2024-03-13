import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";


const LikeSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Like = models.Like || model('Like', LikeSchema);
