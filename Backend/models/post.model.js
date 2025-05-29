import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
    },
  imageurl: {
    type: String,
    required: true,
    },
  likes: {
    type: Number,
    default: 0,
    },
    comments: [
        {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        text: {
            type: String,
            required: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

}, {
    timestamps: true,
});
const Post = mongoose.model('Post', postSchema);
export default Post;
// This model defines the structure of a post in the database, including fields for title, content, image URL, likes, comments, and user reference.
// The `timestamps` option automatically adds `createdAt` and `updatedAt` fields to the schema.