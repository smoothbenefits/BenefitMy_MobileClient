import {timePunchCardActionTypes} from './timePunchCardActionTypes';
import TimePunchCardService from 'TimePunchCardService';

export const load = {
    request: () => { return { type: timePunchCardActionTypes.load.REQUEST }; },
    success: (punchCard) => { return { type: timePunchCardActionTypes.load.SUCCESS, payload: punchCard }; },
    failure: (errors) => { return { type: timePunchCardActionTypes.load.FAILURE, payload: errors }; }
};

export const punchIn = {
    request: () => { return { type: timePunchCardActionTypes.punchIn.REQUEST }; },
    success: (punchCard) => { return { type: timePunchCardActionTypes.punchIn.SUCCESS, payload: punchCard }; },
    failure: (errors) => { return { type: timePunchCardActionTypes.punchIn.FAILURE, payload: errors }; }
};

export const punchOut = {
    request: () => { return { type: timePunchCardActionTypes.punchOut.REQUEST }; },
    success: (punchCard) => { return { type: timePunchCardActionTypes.punchOut.SUCCESS, payload: punchCard }; },
    failure: (errors) => { return { type: timePunchCardActionTypes.punchOut.FAILURE, payload: errors }; }
};

export function loadCard(
  userData
) {
  return dispatch => {
    dispatch(load.request());
    var service = new TimePunchCardService();
    return service.fetchMostRecentInProgessCardAsync(
      userData
    ).then(
      (punchCard) => {
        dispatch(load.success(punchCard));
      }
    )
    .catch((errors) => {
      // [TODO]: This might not be the right place to alert,
      //         revisit this later on for cleanup
      alert('Failed to load punch card data!');

      dispatch(load.failure({
        message: 'Failed to load punch card!',
        errors: errors
      }));
    });
  };
}

export function cardPunchIn(
  userData
) {
  return dispatch => {
    dispatch(punchIn.request());
    var service = new TimePunchCardService();
    return service.createPunchCardAsync(
      userData
    ).then(
      (createdCard) => {
        dispatch(punchIn.success(createdCard));
      }
    )
    .catch((errors) => {
      // [TODO]: This might not be the right place to alert,
      //         revisit this later on for cleanup
      alert('Failed to Check-in!');

      dispatch(punchIn.failure({
        message: 'Failed to create punch card!',
        errors: errors
      }));
    });
  };
}

export function cardPunchOut(
  userData
) {
  return (dispatch, getState) => {
    // First dispatch the action to reload the user card
    // This is to ensure that we are looking at the latest
    // card to operate on, and avoid possible inconsistency
    // resulted from receiving inputs from multiple sources
    // E.g. mobile and web, or even multiple devices
    dispatch(loadCard(userData)).then(() => {
      let cardToPunchOut = getState().timePunchCard.currentCard;
      if (!cardToPunchOut) {
        // If no in-progress card is found, we don't have anything
        // to do here.a;
      }

      // Now do punch out
      dispatch(punchOut.request());
      var service = new TimePunchCardService();
      return service.markPunchCardComplete(
        cardToPunchOut
      ).then(
        (punchCard) => {
          dispatch(punchOut.success(punchCard));
        }
      )
      .catch((errors) => {
        // [TODO]: This might not be the right place to alert,
        //         revisit this later on for cleanup
        alert('Failed to Check-out!');

        dispatch(punchOut.failure({
          message: 'Failed to update punch card!',
          errors: errors
        }));
      });
    })
    .catch((errors) => {
      // [TODO]: This might not be the right place to alert,
      //         revisit this later on for cleanup
      alert('Failed to Check-out!');

      dispatch(punchOut.failure({
        message: 'Failed to update punch card!',
        errors: errors
      }));
    });
  };
}
