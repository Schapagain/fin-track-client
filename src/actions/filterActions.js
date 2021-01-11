import { SET_START_DATE, SET_END_DATE, SET_CATEGORY, SET_TYPE, SET_AGGREGATE } from './types';
import moment from 'moment';

export const setStartDate = date => (dispatch,getState) => {
    dispatch({
        type: SET_START_DATE,
        payload: new Date(moment(date)),
    });
}

export const setEndDate = date => (dispatch,getState) => {
    dispatch({
        type: SET_END_DATE,
        payload: new Date(moment(date)),
    });
}

export const setCategory = category => dispatch => {
    dispatch({
        type: SET_CATEGORY,
        payload: category.toLowerCase(),
    })
}

export const setType = type => dispatch => {
    dispatch({
        type: SET_TYPE,
        payload: type.toLowerCase(),
    })
}

export const setAggregate = aggregate => dispatch => {
    dispatch({
        type: SET_AGGREGATE,
        payload: aggregate
    })
}