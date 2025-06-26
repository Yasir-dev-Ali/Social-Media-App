// const initialState = {
//     posts: [],
//     loading: false,
//     error: null,
// };

// export const postReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'FETCH_POSTS_REQUEST':
//             return {
//                 ...state,
//                 loading: true,
//                 error: null,
//             };
//         case 'FETCH_POSTS_SUCCESS':
//             return {
//                 ...state,
//                 loading: false,
//                 posts: action.payload,
//             };
//         case 'FETCH_POSTS_FAILURE':
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//             };
//         case 'CREATE_POST_REQUEST':
//             return {
//                 ...state,
//                 loading: true,
//                 error: null,
//             };
//         case 'CREATE_POST_SUCCESS':
//             return {
//                 ...state,
//                 loading: false,
//                 posts: [...state.posts, action.payload],
//             };
//         case 'CREATE_POST_FAILURE':
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//             };
//         case 'UPDATE_POST_REQUEST':
//             return {
//                 ...state,
//                 loading: true,
//                 error: null,
//             };
//         case 'UPDATE_POST_SUCCESS':
//             return {
//                 ...state,
//                 loading: false,
//                 posts: state.posts.map(post =>
//                     post.id === action.payload.id ? action.payload : post
//                 ),
//             };
//         case 'UPDATE_POST_FAILURE':
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//             };
//         case 'DELETE_POST_REQUEST':
//             return {
//                 ...state,
//                 loading: true,
//                 error: null,
//             };
//         case 'DELETE_POST_SUCCESS':
//             return {
//                 ...state,
//                 loading: false,
//                 posts: state.posts.filter(post => post.id !== action.payload),
//             };
//         case 'DELETE_POST_FAILURE':
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//             };
//         default:
//             return state;
//     }
// };

const initialState = {
    posts: [],
    loading: false,
    error: null
};

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_POSTS_REQUEST':
        case 'CREATE_POST_REQUEST':
        case 'UPDATE_POST_REQUEST':
        case 'DELETE_POST_REQUEST':
            return { ...state, loading: true, error: null };

        case 'FETCH_POSTS_SUCCESS':
            return { ...state, loading: false, posts: action.payload };

        case 'FETCH_POSTS_FAILURE':
        case 'CREATE_POST_FAILURE':
        case 'UPDATE_POST_FAILURE':
        case 'DELETE_POST_FAILURE':
            return { ...state, loading: false, error: action.payload };

        case 'CREATE_POST_SUCCESS':
            return {
                ...state,
                loading: false,
                posts: [action.payload, ...state.posts]
            };

        case 'UPDATE_POST_SUCCESS':
            return {
                ...state,
                loading: false,
                posts: state.posts.map(post =>
                    post._id === action.payload._id ? action.payload : post
                )
            };

        case 'DELETE_POST_SUCCESS':
            return {
                ...state,
                loading: false,
                posts: state.posts.filter(post => post._id !== action.payload)
            };

        default:
            return state;
    }
};

export default postReducer;

  
  
// This reducer handles the state for states in a social media application.
// It manages fetching, creating, updating, and deleting states.
// The initial state includes an empty posts array, a loading flag, and an error message.
// The reducer updates the state based on the action type, ensuring that the UI reflects the current state of posts.
// The reducer is designed to be used with Redux, allowing for centralized state management in a React application.
// This reducer is part of a larger Redux setup, where actions are dispatched to modify the state.
// It can be combined with other reducers to create a root reducer for the Redux store.
// This reducer is essential for managing the posts feature in a social media application.
// It allows for asynchronous operations like fetching posts from an API and updating the UI accordingly.
// This reducer is part of a larger Redux setup, where actions are dispatched to modify the state.
// It can be combined with other reducers to create a root reducer for the Redux store.
// This reducer is essential for managing the posts feature in a social media application.


