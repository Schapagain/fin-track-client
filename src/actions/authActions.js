import axios from 'axios';
import { getServerAddress } from './utils';
import {
    USER_LOADING,
    USER_LOADED ,
    AUTH_ERROR ,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
} from '../actions/types';
import {returnErrors} from './errorActions';

export const loadUser = () => async (dispatch,getState) => {

    dispatch({type: USER_LOADING});

    const endpoint = getServerAddress() + '/api/auth/user';
    try{
        const result = await axios.get(endpoint, getTokenConfig(getState));
        dispatch({
            type: USER_LOADED,
            payload: result.data
        })
    }catch(err){
        
        if(err.response) dispatch(returnErrors(err.response.data.error,err.response.status));
        dispatch({
            type: AUTH_ERROR
        })
    }
};

export const registerUser = ({ name, email, password}) => async dispatch => {
    dispatch({type: USER_LOADING});
    const config = {headers: {"Content-type":"application/json"}};
    const body = JSON.stringify({name, email, password});

    const endpoint = getServerAddress() + '/api/users'
    try{
        const result = await axios.post(endpoint,body,config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: result.data,
        })
    }catch(err){
        dispatch(returnErrors(err.response.data.error,err.response.status,'REGISTER_FAIL'));
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

export const loginUser = ({ email, password}) => async dispatch => {
    dispatch({type: USER_LOADING});
    const config = {headers: {"Content-type":"application/json"}};
    const body = JSON.stringify({email, password});
    const endpoint = getServerAddress() + '/api/auth'
    try{
        const result = await axios.post(endpoint,body,config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: result.data,
        })
    }catch(err){
        if (err.response) dispatch(returnErrors(err.response.data.error,err.response.status,'LOGIN_FAIL'));
        dispatch({
            type: LOGIN_FAIL
        })
    }
}


export const logoutUser = () => dispatch => {
    dispatch({
        type: LOGOUT_SUCCESS
    })
}

// Setup headers and token
export const getTokenConfig = getState => {
    // Add token to header if it exists in the state
    const config = {
    headers: {
        "Content-type": "application/json"
        }
    }
    const token = getState().authReducer.token;
    if (token) {
        config.headers['authorization'] = token;
    }
    return config;
}