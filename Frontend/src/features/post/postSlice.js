// features/post/postSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../app/axiosInstance.js';
import { message } from 'antd';

// GET all posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, thunkAPI) => {
    try {
        const res = await API.get('/posts');
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

// CREATE post
export const createPost = createAsyncThunk('posts/createPost', async (data, thunkAPI) => {
    try {
        const res = await API.post('/createpost', data);
        console.log('Post created:', res.data.post);
        message.success('Post created');
        return res.data.post;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

// LIKE / UNLIKE
export const likePost = createAsyncThunk('posts/likePost', async (postId, thunkAPI) => {
    try {
        const res = await API.put(`/posts/${postId}/like`);
        return { postId, ...res.data };
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

// COMMENT
export const addComment = createAsyncThunk('posts/addComment', async ({ postId, text }, thunkAPI) => {
    try {
        const res = await API.post(`/posts/${postId}/comment`, { text });
        return { postId, comments: res.data.comments };
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
            })
            // .addCase(fetchPosts.fulfilled, (state, action) => {
            //     state.loading = false;
        //     state.posts = action.payload;
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload.posts; // ✅ instead of action.payload
            })
        
            
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.unshift(action.payload);
            })
            .addCase(likePost.fulfilled, (state, action) => {
                const post = state.posts.find((p) => p._id === action.payload.postId);
                if (post) {
                    if (post.likes.includes(action.meta.arg)) {
                        post.likes = post.likes.filter((id) => id !== action.meta.arg);
                    } else {
                        post.likes.push(action.meta.arg);
                    }
                }
            })
            .addCase(addComment.fulfilled, (state, action) => {
                const post = state.posts.find((p) => p._id === action.payload.postId);
                if (post) post.comments = action.payload.comments;
            });
    },
});

export default postSlice.reducer;
export const selectPosts = (state) => state.posts.posts;
export const selectPostById = (state, postId) => state.posts.posts.find((post) => post._id === postId);
export const selectPostLoading = (state) => state.posts.loading;
export const selectPostError = (state) => state.posts.error;
export const selectPostCount = (state) => state.posts.posts.length;
export const selectPostLikes = (state, postId) => {
    const post = state.posts.posts.find((p) => p._id === postId);
    return post ? post.likes.length : 0;
};