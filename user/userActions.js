import {userActionTypes} from './userActionTypes';
import UserService from './UserService';

export const logIn = {
    request: () => { return { type: userActionTypes.logIn.REQUEST }; },
    success: (userData) => { return { type: userActionTypes.logIn.SUCCESS, payload: userData }; },
    failure: (errors) => { return { type: userActionTypes.logIn.FAILURE, payload: errors }; }
};

export const logOut = {
    request: () => { return { type: userActionTypes.logOut.REQUEST }; },
    success: () => { return { type: userActionTypes.logOut.SUCCESS }; },
    failure: () => { return { type: userActionTypes.logOut.FAILURE }; }
};

export function userCredentialsUpdate(userEmail, password) {
  return { type: userActionTypes.credentialsInputUpdate, payload: { 'userEmail': userEmail, 'password': password } };
}

export function userLogIn(userEmail, password) {
  return dispatch => {
    dispatch(logIn.request());
    var service = new UserService();
    service.getUserDataAsync(userEmail, password)
      .then(
        (response) => {
          if (response.ok) {
            return response.json().then((jsonBody) => {
              var userData = jsonBody;
              dispatch(logIn.success(userData));
            });
          } else {
            dispatch(logIn.failure({
              message: 'User Login Failed!',
              originalResponse: response
            }));
          }
        },
        (errors) => {
          dispatch(logIn.failure(errors));
        }
      )
      .catch(
        (errors) => {
          dispatch(logIn.failure(errors));
        }
      );
  };
}

export function userLogOut() {
  return dispatch => {
    dispatch(logOut.request());
    dispatch(logOut.success());
  };
}