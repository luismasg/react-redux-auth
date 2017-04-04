import axios from 'axios';
import {browserHistory} from 'react-router';
import {AUTH_USER,AUTH_ERR,UNAUTH_USER,AUTH_ERR_WIPE,FETCH_MESSAGE} from './types';

const ROOT_URL='http://localhost:3090';

export function signoutUser(){
    localStorage.removeItem('token');
    return {type:UNAUTH_USER};
}
export function wipeError(){
    return {type:AUTH_ERR_WIPE};
}
export function userIsSignedIn(){
    browserHistory.push('/feature');
    return {type:AUTH_USER}
}

//user sign UP
export function signUpUser({email,password}){
    return function (dispatch){
        // submit email/password to server
        axios.post(`${ROOT_URL}/signup`,{email,password})
        .then(({data})=>{
            dispatch({type:AUTH_USER});
            localStorage.setItem('token',data.token);
            browserHistory.push('/feature');
        })
        .catch(({response})=>{
            dispatch(authError(response.data.error));
        });
    }
}
export function signinUser({email,password}){
    return function (dispatch){
        // submit email/password to server
        axios.post(`${ROOT_URL}/signin`,{email,password})
        .then(response=>{
            // console.log('response from server is: ',response);
            // if request is good ..

            // -update state to indicate user is authenticates
            dispatch({type:AUTH_USER});

            // -save the jwt token
            localStorage.setItem('token',response.data.token);

            // -redirect to route '/feature
            browserHistory.push('/feature');
        })
        .catch(()=>{
            // if request is bad ..
            // -show an error to the user
            console.log('big error');
                dispatch(authError('bad login info'));
        });
    }
}
export function authError(error){
    return {type:AUTH_ERR,payload:error};
}
export function fetchMessage(){
    return function (dispatch){
        axios.get(ROOT_URL,{
            headers:{authorization:localStorage.getItem('token')}
        }).then((response)=>{
            // console.log(response.data.message);
            dispatch({type:FETCH_MESSAGE,payload:response.data.message});
        });
    }
}
