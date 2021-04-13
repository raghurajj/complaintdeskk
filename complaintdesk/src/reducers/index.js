import { combineReducers } from 'redux';
import auth from './auth';
import complaints from './complaint';

export default combineReducers({
    auth,
    complaints
});