import {
    GET_COMPLAINTS_SUCCESS,
    GET_COMPLAINTS_FAIL,
    COMPLAINT_POST_SUCCESS,
    COMPLAINT_POST_FAIL,
    COMPLAINT_DELETE_SUCCESS,
    COMPLAINT_DELETE_FAIL,
} from '../actions/types';

const initialState = {
    complaints:[]
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_COMPLAINTS_SUCCESS:
            return {
                ...state,
                complaints: payload
            }
        case GET_COMPLAINTS_FAIL:
            return {
                ...state,
            }
        case COMPLAINT_POST_SUCCESS:
            return {
                ...state,
            }
        case COMPLAINT_POST_FAIL:
            return {
                ...state,
            }
        case COMPLAINT_DELETE_SUCCESS:
            return {
                ...state,
            }
        case COMPLAINT_DELETE_FAIL:
            return {
                ...state,
            }
        default:
            return state
    }
}