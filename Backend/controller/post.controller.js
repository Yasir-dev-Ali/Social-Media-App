import Post from "../models/post.model";

// Create a new post

export const createPost = async (req, res) => {
    try {
        const { title, content, imageurl } = req.body;
        const userId = req.user._id; // Assuming user is attached to req by auth middleware

        const newPost = new Post({
            title,
            content,
            imageurl,
            user: userId
        });

        await newPost.save();
        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Failed to create post", error: error.message });
    }
}
// Get all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "name email").sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Failed to fetch posts", error: error.message });
    }
}
// Get a single post by ID

export const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId).populate("user", "name email");

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ message: "Failed to fetch post", error: error.message });
    }
}
// Update a post by ID
export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, content, imageurl } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { title, content, imageurl },
            { new: true }
        ).populate("user", "name email");

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ message: "Failed to update post", error: error.message });
    }
}
// Delete a post by ID
export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;

        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Failed to delete post", error: error.message });
    }
}
// Like a post
export const likePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id; // Assuming user is attached to req by auth middleware

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user has already liked the post
        if (post.likes.includes(userId)) {
            return res.status(400).json({ message: "You have already liked this post" });
        }

        post.likes.push(userId);
        await post.save();

        res.status(200).json({ message: "Post liked successfully", likes: post.likes.length });
    } catch (error) {
        console.error("Error liking post:", error);
        res.status(500).json({ message: "Failed to like post", error: error.message });
    }
}
// Unlike a post
export const unlikePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id; // Assuming user is attached to req by auth middleware

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user has liked the post
        if (!post.likes.includes(userId)) {
            return res.status(400).json({ message: "You have not liked this post" });
        }

        post.likes = post.likes.filter(id => id.toString() !== userId.toString());
        await post.save();

        res.status(200).json({ message: "Post unliked successfully", likes: post.likes.length });
    } catch (error) {
        console.error("Error unliking post:", error);
        res.status(500).json({ message: "Failed to unlike post", error: error.message });
    }
}
// Add a comment to a post

export const addComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const { text } = req.body;
        const userId = req.user._id; // Assuming user is attached to req by auth middleware

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comment = {
            user: userId,
            text,
            createdAt: new Date()
        };

        post.comments.push(comment);
        await post.save();

        res.status(201).json({ message: "Comment added successfully", comment });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Failed to add comment", error: error.message });
    }
}
// Delete a comment from a post
export const deleteComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const commentId = req.params.commentId;
        const userId = req.user._id; // Assuming user is attached to req by auth middleware

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Find the comment
        const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId && comment.user.toString() === userId.toString());
        if (commentIndex === -1) {
            return res.status(404).json({ message: "Comment not found or you do not have permission to delete it" });
        }

        post.comments.splice(commentIndex, 1);
        await post.save();

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ message: "Failed to delete comment", error: error.message });
    }
}

// Export all controller functions
export default {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    addComment,
    deleteComment
};
