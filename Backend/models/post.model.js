// import mongoose from "mongoose";
// const postSchema = new mongoose.Schema({
//   creater: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     default: null,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   imageurl: {
//     type: String,
//     required: false,
//   },
//   tage: {
//     type: [String],
//     required: false,
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     default: null,
//   },
//   likes: {
//     type: [mongoose.Schema.Types.ObjectId],
//     ref: "User",
//     default: [],
//   },
//   comments: [
//     {
//       user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//       },
//       content: {
//         type: String,
//         required: true,
//       },
//       createdAt: {
//         type: Date,
//         default:  Date.now,
//       },
//     },
//   ],
  
// },{timestamps:true});
// const Post = mongoose.model("Post", postSchema);
// export default Post;

// import mongoose from 'mongoose';

// const postSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   content: String,
//   imageUrl: String,
//   tags: [String],
//   creator: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // <-- THIS IS REQUIRED
//     required: true
//   },
//   likes: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }],
//   comments: [
//     {
//       user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//       },
//       content: String,
//       createdAt: {
//         type: Date,
//         default: Date.now
//       }
//     }
//   ],
  

// }, { timestamps: true });

// export default mongoose.model('Post', postSchema);


import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  },
  tags: {
    type: [String],
    required: false
  },
  creator: { // ✅ Correct name used here
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      content: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, { timestamps: true });

export default mongoose.model('Post', postSchema);
