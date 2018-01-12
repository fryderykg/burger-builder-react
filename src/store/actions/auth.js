import thunk from 'redux-thunk';
import axios from 'axios';
import * as actionTypes from './actionsTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  }
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    let URL = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBD6Txb1Ro4AqMQgtLSSYpBYXFY3aN9XBI";

    if(isSignup){
      URL = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBD6Txb1Ro4AqMQgtLSSYpBYXFY3aN9XBI";
    }

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    dispatch(authStart());
    axios.post(URL, authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data))
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error))
      })
  }
};
