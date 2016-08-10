import createRequestActionTypes from '../common/createRequestActionTypes';

export const userActionTypes = {
    logIn: createRequestActionTypes('LOGIN'),
    logOut: createRequestActionTypes('LOGOUT')
};
