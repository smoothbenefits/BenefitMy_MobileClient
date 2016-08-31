import { userActionTypes } from './userActionTypes';

export default function () {

    const initialState = {
      userEmail: null,
      password: null,
      isFetching: false,
      lastLoginErrors: null,

      // For detailed content format of userData, see
      // doc/sample_user_data.txt
      userData: null
    };

    return (state = initialState, { type, payload }) => {
        switch (type) {
          // Log-In
          case userActionTypes.logIn.REQUEST:
            return {
                ...state,
                isFetching: true,
                lastLoginErrors: null
            };
          case userActionTypes.logIn.SUCCESS:
            return {
              ...state,
              userData: payload,
              isFetching: false,
              lastLoginErrors: null
            };
          case userActionTypes.logIn.FAILURE:
            return {
                ...state,
                userData: null,
                isFetching: false,
                lastLoginErrors: payload
            };

          // Log-Out
          case userActionTypes.logOut.REQUEST:
            return {
                ...state,
                isFetching: true
            };
          case userActionTypes.logOut.SUCCESS:
            return {
              ...state,
              userData: null,
              isFetching: false,
              password: null
            };
          case userActionTypes.logOut.FAILURE:
            return {
              ...state,
              isFetching: false
            };

          // User Credentials Updates
          case userActionTypes.credentialsInputUpdate:
            return {
              ...state,
              userEmail: payload.userEmail,
              password: payload.password,
              lastLoginErrors: null
            };

          default:
            return state;
        }
    };
}
