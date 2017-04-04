import {AUTH_USER,UNAUTH_USER,AUTH_ERR,AUTH_ERR_WIPE,FETCH_MESSAGE} from '../actions/types';

export default function (state={},action){
    switch(action.type){
        case AUTH_USER:
        return {...state,authenticated:true,error:''};
        case UNAUTH_USER:
        return {...state,authenticated:false};
        case AUTH_ERR:
        return {...state,error:action.payload};
        case AUTH_ERR_WIPE:
        return {...state,error:action.payload,error:''};
        case FETCH_MESSAGE:
        return {...state,message:action.payload };
    }
    return state;
}
