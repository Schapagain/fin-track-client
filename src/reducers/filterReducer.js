import moment from 'moment';
import { SET_START_DATE, SET_END_DATE, SET_CATEGORY, SET_TYPE, SET_AGGREGATE } from '../actions/types';

const initState = {
    startDate:new Date(moment().startOf('months')),
    endDate:new Date(moment().endOf('months').add(5,'days').startOf('months')),
    category: "",
    type: "",
    aggregate:false,
}

export default (state=initState, action) => {
    switch (action.type) {
        case SET_END_DATE:
            return {
                ...state,
                endDate: action.payload
            }
        case SET_START_DATE:
            return {
                ...state,
                startDate: action.payload
            }
        case SET_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
        case SET_TYPE:
            return {
                ...state,
                type: action.payload
            }
        case SET_AGGREGATE:
            return {
                ...state,
                aggregate: action.payload
            }
        default:
            return {
                ...state
            };
    }
}