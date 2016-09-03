import createRequestActionTypes from '../common/createRequestActionTypes';

export const userActionTypes = {
    logIn: createRequestActionTypes('LOGIN'),
    logOut: createRequestActionTypes('LOGOUT'),
    credentialsInputUpdate: 'USER_CREDENTIALS_INPUT_UPDATE',
    userDataRefresh: createRequestActionTypes('USER_DATA_REFRESH')
};
