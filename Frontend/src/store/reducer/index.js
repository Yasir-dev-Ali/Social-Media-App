import combineReducers from 'redux';
import { postReducer } from './post.reducer';

const rootReducer = combineReducers({
    post: postReducer,
    // Add other reducers here as needed
});