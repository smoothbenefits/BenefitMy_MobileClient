import {timePunchCardActionTypes} from './timePunchCardActionTypes';
import TimePunchCardService from 'TimePunchCardService';

export const load = {
    request: () => { return { type: timePunchCardActionTypes.load.REQUEST }; },
    success: () => { return { type: timePunchCardActionTypes.load.SUCCESS }; },
    failure: () => { return { type: timePunchCardActionTypes.load.FAILURE }; }
};

export const punchIn = {
    request: () => { return { type: timePunchCardActionTypes.punchIn.REQUEST }; },
    success: () => { return { type: timePunchCardActionTypes.punchIn.SUCCESS }; },
    failure: (errors) => { return { type: timePunchCardActionTypes.punchIn.FAILURE, payload: errors }; }
};

export const punchOut = {
    request: () => { return { type: timePunchCardActionTypes.punchOut.REQUEST }; },
    success: () => { return { type: timePunchCardActionTypes.punchOut.SUCCESS }; },
    failure: () => { return { type: timePunchCardActionTypes.punchOut.FAILURE }; }
};

export function cardPunchIn() {
  return dispatch => {
    dispatch(punchIn.request());
    var service = new TimePunchCardService();
    service.createPunchCardAsync()
      .then((response) => {
        if (response.ok) {
          dispatch(punchIn.success());
        } else {
          dispatch(punchIn.failure({
            message: 'Failed to create punch card!',
            originalResponse: response
          }));
        }
      })
      .catch((errors) => {
        dispatch(punchIn.failure(errors));
      });
  };
}

export function cardPunchOut() {
  return dispatch => {
    dispatch(punchOut.request());
    dispatch(punchOut.success());
  };
}
