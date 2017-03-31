import axios from 'axios';
import {browserHistory} from 'react-router';
import {AUTH_USER,AUTH_ERR,UNAUTH_USER} from './types';

const ROOT_URL='http://localhost:3090';

export function signoutUser(){
    localStorage.removeItem('token');
    return {type:UNAUTH_USER};
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
        .then(response=>{
            console.log('response from server signup is:\n ',response);
            // if request is good ..

            // -update state to indicate user is authenticates
            dispatch({type:AUTH_USER});

            // -save the jwt token
            localStorage.setItem('token',response.data.token);

            // -redirect to route '/feature
            //browserHistory.push('/feature');
        })
        .catch((response)=>{
            // if request is bad ..
            // -show an error to the user
                    console.log('response from server signup is:\n ',response.data);
            dispatch(authError('bad signup info'));
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
            //browserHistory.push('/feature');
        })
        .catch(()=>{
            // if request is bad ..
            // -show an error to the user
            dispatch(authError('bad login info'));
        });
    }
}
export function authError(error){
    return {type:AUTH_ERR,payload:error};
}
