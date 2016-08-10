import {userActionTypes} from './userActionTypes';

export const logIn = {
    request: () => { return { type: userActionTypes.logIn.REQUEST }; },
    success: () => { return { type: userActionTypes.logIn.SUCCESS }; },
    failure: () => { return { type: userActionTypes.logIn.FAILURE }; }
};

export const logOut = {
    request: () => { return { type: userActionTypes.logOut.REQUEST }; },
    success: () => { return { type: userActionTypes.logOut.SUCCESS }; },
    failure: () => { return { type: userActionTypes.logOut.FAILURE }; }
};

export function userLogIn() {
  return dispatch => {
    dispatch(logIn.request());
    dispatch(logIn.success());
  };
}

export function userLogOut() {
  return dispatch => {
    dispatch(logOut.request());
    dispatch(logOut.success());
  };
}
