import axios from 'axios';
import { getPrettyDate } from '../utils';
import { GET_TRANSACTIONS, ADD_TRANSACTION, TRANSACTIONS_LOADING, DELETE_TRANSACTION } from './types';
import {getTokenConfig} from './authActions';
import {getServerAddress} from './utils';

export const getTransactions = () => async (dispatch,getState) => {
    dispatch(setTransactionsLoading());
    const endpoint = getServerAddress() + '/api/transactions';
    const config = getTokenConfig(getState);
    const { startDate, endDate, category, type } = getState().filterReducer;
    config.params= {startDate, endDate, category, type};

    try{
        const result = await axios.get(endpoint,config);
        dispatch({
            type: GET_TRANSACTIONS,
            payload: result.data.transactions.map(transaction => getPrettyDate(transaction))
        })
    }
    catch(err){
        console.log(err);
    }
};

export const addTransaction = transaction => async (dispatch,getState) => {
    
    const endpoint = getServerAddress() + '/api/transactions';
    try{
        const result = await axios.post(endpoint,transaction,getTokenConfig(getState));
        dispatch({
            type: ADD_TRANSACTION,
            payload: getPrettyDate(result.data.transaction)
        })
    }
    catch(err){
        console.log(err);
    }

};

export const deleteTransaction = transactionId => async (dispatch,getState) => {
    const endpoint = getServerAddress() + `/api/transactions/${transactionId}`;
    console.log(endpoint)
    try{
        await axios.delete(endpoint,getTokenConfig(getState));
        dispatch({
            type: DELETE_TRANSACTION,
            payload: transactionId
        })
    }
    catch(err){
        console.log(err);
    }

};

export const setTransactionsLoading = () => {
    return {
        type: TRANSACTIONS_LOADING,
    };
};