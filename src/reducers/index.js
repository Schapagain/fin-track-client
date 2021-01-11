import { combineReducers } from 'redux';
import transactionReducer from './transactionReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import filterReducer from './filterReducer';

export default combineReducers({
    transactionReducer: transactionReducer,
    authReducer: authReducer,
    errorReducer: errorReducer,
    filterReducer: filterReducer,
})