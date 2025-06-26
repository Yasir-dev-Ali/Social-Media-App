import { Router } from 'express';
import { createPost, getAllPosts }  from '../controller/post.controller.js';


const router = Router();
// Create a new post
router.post('/createpost', createPost);
// Get all posts
router.get('/posts',getAllPosts);


export default router;