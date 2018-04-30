import * as types from './actionTypes';  
import sessionApi from '../api/sessionApi';

export function loginSuccess() {  
  return {type: types.LOG_IN_SUCCESS}
}

export function logInUser(credentials) {  
  return function(dispatch) {
    return sessionApi.login(credentials).then(response => {
    	console.log( response.access_token)
      sessionStorage.setItem('token', response.access_token);
      dispatch(loginSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}