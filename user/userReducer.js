import { userActionTypes } from './userActionTypes';

export default function () {

    const initialState = {
      isFetching: false,
      isLoggedIn: false
    };

    return (state = initialState, { type, payload }) => {
        switch (type) {
          // Log-In
          case userActionTypes.logIn.REQUEST:
            return {
                ...state,
                isFetching: true
            };
          case userActionTypes.logIn.SUCCESS:
            return {
              ...state,
              isLoggedIn: true,
              isFetching: false
            };
          case userActionTypes.logIn.FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                isFetching: false
            };

          // Punch-Out
          case userActionTypes.logOut.REQUEST:
            return {
                ...state,
                isFetching: true
            };
          case userActionTypes.logOut.SUCCESS:
            return {
              ...state,
              isLoggedIn: false,
              isFetching: false
            };
          case userActionTypes.logOut.FAILURE:
            return {
                ...state,
                isFetching: false
            };

          default:
            return state;
        }
    };
}
