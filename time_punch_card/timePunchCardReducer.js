import { timePunchCardActionTypes } from './timePunchCardActionTypes';

export default function () {

    const initialState = {
      isFetching: false,
      errors: null,
      data: null
    };

    return (state = initialState, { type, payload }) => {
        switch (type) {
          // Load Card
          case timePunchCardActionTypes.load.REQUEST:
            return {
                ...state,
                errors: null,
                isFetching: true
            };
          case timePunchCardActionTypes.load.SUCCESS:
            return {
                ...state,
                errors: null,
                isFetching: false,
                data: payload
            };
          case timePunchCardActionTypes.load.FAILURE:
            return {
                ...state,
                errors: payload,
                isFetching: false
            };

          // Punch-In
          case timePunchCardActionTypes.punchIn.REQUEST:
            return {
                ...state,
                errors: null,
                isFetching: true
            };
          case timePunchCardActionTypes.punchIn.SUCCESS:
            return {
              ...state,
              punchedIn: true,
              lastPunchTime: new Date().toLocaleString(),
              errors: null,
              isFetching: false,
              data: payload
            };
          case timePunchCardActionTypes.punchIn.FAILURE:
            return {
                ...state,
                errors: payload,
                isFetching: false
            };

          // Punch-Out
          case timePunchCardActionTypes.punchOut.REQUEST:
            return {
                ...state,
                errors: null,
                isFetching: true
            };
          case timePunchCardActionTypes.punchOut.SUCCESS:
            return {
              ...state,
              punchedIn: false,
              lastPunchTime: new Date().toLocaleString(),
              errors: null,
              isFetching: false,
              data: payload
            };
          case timePunchCardActionTypes.punchOut.FAILURE:
            return {
                ...state,
                errors: payload,
                isFetching: false
            };

          default:
            return state;
        }
    };
}
