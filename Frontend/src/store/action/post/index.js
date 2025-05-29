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
    

} from "../type.js"

import FetchApi from "../api.js"

export const fetchPosts = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_POSTS_REQUEST });

        try {
            const response = await FetchApi('/api/posts', 'GET');
            dispatch({ type: FETCH_POSTS_SUCCESS, payload: response });
        } catch (error) {
            dispatch({ type: FETCH_POSTS_FAILURE, payload: error.message });
        }
    };
}


export const createPost = (post) => {
    return async (dispatch) => {
        dispatch({ type: 'CREATE_POST_REQUEST' });

        try {
            const response = await FetchApi('/api/posts', 'POST', post);
            dispatch({ type: 'CREATE_POST_SUCCESS', payload: response });
        } catch (error) {
            dispatch({ type: 'CREATE_POST_FAILURE', payload: error.message });
        }
    };
};
export const updatePost = (postId, post) => {
    return async (dispatch) => {
        dispatch({ type: 'UPDATE_POST_REQUEST' });

        try {
            const response = await FetchApi(`/api/posts/${postId}`, 'PUT', post);
            dispatch({ type: 'UPDATE_POST_SUCCESS', payload: response });
        } catch (error) {
            dispatch({ type: 'UPDATE_POST_FAILURE', payload: error.message });
        }
    };
};
export const deletePost = (postId) => {
    return async (dispatch) => {
        dispatch({ type: 'DELETE_POST_REQUEST' });

        try {
            await FetchApi(`/api/posts/${postId}`, 'DELETE');
            dispatch({ type: 'DELETE_POST_SUCCESS', payload: postId });
        } catch (error) {
            dispatch({ type: 'DELETE_POST_FAILURE', payload: error.message });
        }
    };
};

