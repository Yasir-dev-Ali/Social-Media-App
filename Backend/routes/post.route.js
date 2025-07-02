import { Router } from 'express';
import { addComment, createPost, deletePost, getAllPosts, getPostById, getPostsByUser, likePost, updatePost } from '../controller/post.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
// import upload from '../middleware/multer.middleware.js';



const router = Router();

// Create a new post
// router.post('/createpost', createPost);
router.post('/createpost',authMiddleware, createPost); // Assuming you want to use the same controller for creating posts
// Get all posts
router.get('/posts', getAllPosts);
router.get('/posts/myposts', authMiddleware, getPostsByUser); // Assuming you want to get posts by the authenticated user
// Get single post
router.get('/posts/:id', getPostById);
// Update post
// router.put('/posts/:id', authMiddleware, upload.single('image'), updatePost); // Assuming you want to use the same controller for updating posts
// Delete post
router.delete('/posts/:id', authMiddleware, deletePost); // Assuming you have a deletePost controller
// Like post
router.put('/posts/:id/like', authMiddleware, likePost); // Assuming you have a likePost controller

// Comment on post
router.post('/posts/:id/comment', authMiddleware, addComment); // Assuming you have an addComment controller
// Export the router



export default router;