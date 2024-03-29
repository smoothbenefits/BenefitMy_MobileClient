import {timePunchCardActionTypes} from './timePunchCardActionTypes';
import TimePunchCardService from 'TimePunchCardService';
import {refreshUserData} from '../user/userActions';

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
  return async dispatch => {
    dispatch(load.request());
    try {
      var service = new TimePunchCardService();
      let punchCard = await service.fetchMostRecentInProgessCardAsync(userData);
      dispatch(load.success(punchCard));
    } catch(errors) {
      // [TODO]: This might not be the right place to alert,
      //         revisit this later on for cleanup
      alert('Failed to load punch card data!');

      dispatch(load.failure({
        message: 'Failed to load punch card!',
        errors: errors
      }));
    }
  };
}

export function cardPunchIn(
  userData,
  project
) {
  return async (dispatch, getState) => {
    // First dispatch the action to reload the user card
    // This is to ensure that we are looking at the latest
    // card to operate on, and avoid possible inconsistency
    // resulted from receiving inputs from multiple sources
    // E.g. mobile and web, or even multiple devices
    try {
      await dispatch(loadCard(userData));
      let cardInProgress = getState().timePunchCard.currentCard;
      if (cardInProgress) {
        // If there is already a card in progress, alert and do nothing
        alert('Detected a card already checked in! The card has been loaded into the view.');
        return;
      }
      dispatch(punchIn.request());
      var service = new TimePunchCardService();
      let createdCard = await service.createPunchCardAsync(userData,project);
      dispatch(punchIn.success(createdCard));
    } catch(errors) {
      // [TODO]: This might not be the right place to alert,
      //         revisit this later on for cleanup
      let message = 'Failed to Check-in!!';
      if (errors.doNotMaskMessage && errors.message) {
        message = errors.message;
      }
      alert(message);

      dispatch(punchIn.failure({
        message: 'Failed to create punch card!',
        errors: errors
      }));
    }
  };
}

export function cardPunchOut(
  userData
) {
  return async (dispatch, getState) => {
    // First dispatch the action to reload the user card
    // This is to ensure that we are looking at the latest
    // card to operate on, and avoid possible inconsistency
    // resulted from receiving inputs from multiple sources
    // E.g. mobile and web, or even multiple devices
    try {
      await dispatch(loadCard(userData));
      let cardToPunchOut = getState().timePunchCard.currentCard;
      if (!cardToPunchOut) {
        // If no in-progress card is found, alert and do nothing
        alert('The card has already been checked out, maybe from another device.');
        return;
      }
      // Now do punch out
      dispatch(punchOut.request());
      var service = new TimePunchCardService();
      let punchCard = await service.markPunchCardComplete(cardToPunchOut);
      dispatch(punchOut.success(punchCard));
    } catch(errors) {
      // [TODO]: This might not be the right place to alert,
      //         revisit this later on for cleanup
      alert('Failed to Check-out!');

      dispatch(punchOut.failure({
        message: 'Failed to update punch card!',
        errors: errors
      }));
    }

    // For now, upon checking out, also dispatch the action to
    // refresh user data to prepare for the next check in
    let user = getState().user;
    dispatch(refreshUserData(user.userEmail, user.password));
  };
}
