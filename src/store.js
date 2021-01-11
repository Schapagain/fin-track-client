import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initState = {};
const middlewares = [thunk];
const store = createStore(rootReducer, initState, compose(
    applyMiddleware(...middlewares)
));

export default store;