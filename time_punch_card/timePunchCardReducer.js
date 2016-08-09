import { timePunchCardActionTypes } from './timePunchCardActionTypes';

export default function () {

    const initialState = {
      isFetching: false,
      errors: null,
      data: null
    };

    return (state = initialState, { type, payload }) => {
        switch (type) {
          case timePunchCardActionTypes.load.REQUEST:
          case timePunchCardActionTypes.punchIn.REQUEST:
          case timePunchCardActionTypes.punchOut.REQUEST:
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
          case timePunchCardActionTypes.punchOut.SUCCESS:
            return {
              ...state,
              punchedIn: false,
              lastPunchTime: new Date().toLocaleString(),
              errors: null,
              isFetching: false,
              data: payload
            };
          case timePunchCardActionTypes.load.SUCCESS:
            return {
                ...state,
                errors: null,
                isFetching: false,
                data: payload
            };

          case timePunchCardActionTypes.load.FAILURE:
          case timePunchCardActionTypes.punchIn.FAILURE:
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
