import * as types from '../actions/actionTypes';  
import initialState from './initialState';  
import {browserHistory} from 'react-router';

export default function sessionReducer(state = initialState.session, action) {  
  switch(action.type) {
    case types.LOG_IN_SUCCESS:
      //this.props.history.push('/')
      return !!sessionStorage.access_token
    default: 
      return state;
  }
}