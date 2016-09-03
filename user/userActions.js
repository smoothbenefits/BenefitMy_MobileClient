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

export const userDataRefresh = {
  request: () => { return { type: userActionTypes.userDataRefresh.REQUEST }; },
  success: (userData) => { return { type: userActionTypes.userDataRefresh.SUCCESS, payload: userData }; },
  failure: (errors) => { return { type: userActionTypes.userDataRefresh.FAILURE, payload: errors }; }
};

export function userLogIn(userEmail, password) {
  return dispatch => {
    dispatch(logIn.request());
    var service = new UserService();
    return service.getUserDataAsync(userEmail, password)
      .then(
        (userData) => {
          dispatch(logIn.success(userData));
        }
      )
      .catch(
        (errors) => {
          dispatch(logIn.failure({
            message: 'User Login Failed!',
            errors: errors
          }));
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

export function refreshUserData(userEmail, password) {
  return dispatch => {
    dispatch(userDataRefresh.request());
    var service = new UserService();
    return service.getUserDataAsync(userEmail, password)
      .then(
        (userData) => {
          dispatch(userDataRefresh.success(userData));
        }
      )
      .catch(
        (errors) => {
          dispatch(userDataRefresh.failure({
            message: 'Failed to refresh user data!',
            errors: errors
          }));
        }
      );
  };
}
