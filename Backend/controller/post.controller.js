import Post from "../models/post.model.js";

// Create a new post
export const createPost = async (req, res) => {
    const { title, content, image, tags } = req.body;
    
    const creator = req.user._id;

    try {
        const formattedTags = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());


        // const newPost = new Post({
        //     title,
        //     content,
        //     imageUrl,
        //     tags: formattedTags,
        //     creator,
        // });
        // const { title, content, image, tags } = req.body;
        // const creator = req.user._id;


        const newPost = new Post({
            title,
            content,
            imageUrl: image, // ✅ use image from frontend as imageUrl here
            tags: formattedTags,
            creator,
        });


        await newPost.save();
        res.status(201).json({ message: "Post created successfully", post: newPost });
        // const populatedPost = await newPost.populate("creator", "name email");
        // res.status(201).json({ message: "Post created successfully", post: populatedPost });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Failed to create post", error: error.message });
    }
};

// Get all posts
// export const getAllPosts = async (req, res) => {
//     try {
//         const posts = await Post.find()
//             .populate("creator", "name email")
//             .sort({ createdAt: -1 });

//         res.status(200).json({ message: "Posts fetched successfully", posts });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch posts", error: error.message });
//     }
// };
export const getAllPosts = async (req, res) => {
    try {
        // const posts = await Post.find().populate("user").populate("creater");
        const posts = await Post.find()
            .populate("creator", "name email") // Populate creator with name and email
            .populate("comments.user", "name") // Populate comments with user name
            .sort({ createdAt: -1 }); // Sort posts by creation date in descending order
        
        // .populate("creator", "name email")
        // .sort({ createdAt: -1 });


        // console.log('✅ Posts:', posts); // <== Add this
        res.status(200).json({ message: "Posts fetched successfully", posts });
    } catch (error) {
        console.error("❌ Error in getAllPosts:", error); // <== Add this
        res.status(500).json({ message: "Failed to fetch posts", error: error.message });
    }
};
  

// Get single post
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("creator", "name email")
            .populate("comments.user", "name");

        if (!post) return res.status(404).json({ message: "Post not found" });

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch post", error: error.message });
    }
};

// Update post
export const updatePost = async (req, res) => {
    try {
        const { title, content, imageUrl, tags } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                title,
                content,
                imageUrl,
                tags: Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())
            },
            { new: true }
        ).populate("creator", "name email");

        if (!updatedPost) return res.status(404).json({ message: "Post not found" });

        res.status(200).json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
        res.status(500).json({ message: "Failed to update post", error: error.message });
    }
};

// Delete post
export const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);

        if (!deletedPost) return res.status(404).json({ message: "Post not found" });

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete post", error: error.message });
    }
};

// Like post
export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (post.likes.includes(req.user._id)) {
            return res.status(400).json({ message: "Already liked" });
        }

        post.likes.push(req.user._id);
        await post.save();

        res.status(200).json({ message: "Liked successfully", likes: post.likes.length });
    } catch (error) {
        res.status(500).json({ message: "Like failed", error: error.message });
    }
};

// Unlike post
export const unlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        post.likes = post.likes.filter(userId => userId.toString() !== req.user._id.toString());
        await post.save();

        res.status(200).json({ message: "Unliked successfully", likes: post.likes.length });
    } catch (error) {
        res.status(500).json({ message: "Unlike failed", error: error.message });
    }
};

// Add comment
export const addComment = async (req, res) => {
    try {
        const { content } = req.body;

        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const comment = {
            user: req.user._id,
            content,
            createdAt: new Date()
        };

        post.comments.push(comment);
        await post.save();

        res.status(201).json({ message: "Comment added", comment });
    } catch (error) {
        res.status(500).json({ message: "Comment failed", error: error.message });
    }
};

// Delete comment
export const deleteComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const commentIndex = post.comments.findIndex(c =>
            c._id.toString() === req.params.commentId &&
            c.user.toString() === req.user._id.toString()
        );

        if (commentIndex === -1) {
            return res.status(403).json({ message: "You can't delete this comment" });
        }

        post.comments.splice(commentIndex, 1);
        await post.save();

        res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete comment", error: error.message });
    }
};


// latestPosts
export const latestPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 }) // Sort by creation date in descending order
            .limit(5) // Limit to the latest 5 posts
            .populate("creator", "name email") // Populate creator with name and email
            .populate("comments.user", "name"); // Populate comments with user name

        res.status(200).json({ message: "Latest posts fetched successfully", posts });
    } catch (error) {
        console.error("Error fetching latest posts:", error);
        res.status(500).json({ message: "Failed to fetch latest posts", error: error.message });
    }
}
// Export all functions
export default {
    createPost,
    getAllPosts,
    getPostById,

    updatePost,
    deletePost,
    likePost,
    unlikePost,
    addComment,
    deleteComment,
    latestPosts
};