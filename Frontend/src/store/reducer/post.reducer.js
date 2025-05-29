const initialState = {
    posts: [],
    loading: false,
    error: null,
};

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_POSTS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'FETCH_POSTS_SUCCESS':
            return {
                ...state,
                loading: false,
                posts: action.payload,
            };
        case 'FETCH_POSTS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
export const fetchPostsRequest = () => ({
    type: 'FETCH_POSTS_REQUEST',
});
export const fetchPostsSuccess = (posts) => ({
    type: 'FETCH_POSTS_SUCCESS',
    payload: posts,
});
export const fetchPostsFailure = (error) => ({
    type: 'FETCH_POSTS_FAILURE',
    payload: error,
});

