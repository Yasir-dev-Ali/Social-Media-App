import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE,
    UPDATE_POST_REQUEST,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAILURE,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE

    

} from "../type.js"

import FetchApi from "../api.js"


export const fetchPosts = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_POSTS_REQUEST });

        try {
            // 
            const response = await FetchApi.get("/posts");
            console.log("Fetching posts...");
            const data = response.data; // Assuming the API returns an object with a 'data' property
            console.log("Fetched posts:", data);
            dispatch({ type: FETCH_POSTS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: FETCH_POSTS_FAILURE, payload: error.message });
        }
    };
};
export const createPost = (post) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_POST_REQUEST });

        try {
            const response = await FetchApi.post("/createpost", post);
            console.log("Creating post:", post);
            const data = response.data; // Assuming the API returns an object with a 'data' property
            console.log("Created post:", data);
            dispatch({ type: CREATE_POST_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: CREATE_POST_FAILURE, payload: error.message });
        }
    };
};
export const updatePost = (postId, updatedPost) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_POST_REQUEST });

        try {
            const response = await FetchApi.put(`/posts/${postId}`, updatedPost);
            const data = response.data; // Assuming the API returns an object with a 'data' property
            console.log("Updated post:", data);
            dispatch({ type: UPDATE_POST_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: UPDATE_POST_FAILURE, payload: error.message });
        }
    };
};
export const deletePost = (postId) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_POST_REQUEST });

        try {
            const response = await FetchApi.delete(`/posts/${postId}`);
            const data = response.data; // Assuming the API returns an object with a 'data' property
            console.log("Deleted post:", data);
            dispatch({ type: DELETE_POST_SUCCESS, payload: postId });
        } catch (error) {
            dispatch({ type: DELETE_POST_FAILURE, payload: error.message });
        }
    };
};
// Add more actions as needed for liking posts, commenting, etc.
// export const likePost = (postId) => {