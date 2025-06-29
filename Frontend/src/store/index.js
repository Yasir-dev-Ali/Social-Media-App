import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { postReducer } from './reducer/post.reducer';
// Import your reducers here

const rootReducer = combineReducers({
  // Add your reducers here
  postReducer: postReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
export { rootReducer, composeEnhancers, store };
