import { combineReducers } from 'redux';
import {reducer as form } from 'redux-form';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
form, /* es6 onject destructing =  form:form */
auth:authReducer /* could have been auth */




});

export default rootReducer;
