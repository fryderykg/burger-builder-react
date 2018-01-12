import axios from 'axios';
import * as actionTypes from './actionsTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
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
        dispatch(authSuccess(response.data.idToken, response.data.localId))
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error))
      })
  }
};
