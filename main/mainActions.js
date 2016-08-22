import {mainActionTypes} from './mainActionTypes';
import MainService from './MainService';

export const loadAssets = {
    request: () => { return { type: mainActionTypes.loadAssets.REQUEST }; },
    success: () => { return { type: mainActionTypes.loadAssets.SUCCESS }; },
    failure: (errors) => { return { type: mainActionTypes.loadAssets.FAILURE, payload: errors }; }
};

export function loadAndCacheAssets() {
  return dispatch => {
    dispatch(loadAssets.request());
    let service = new MainService();
    return service.loadAndCacheAssetsAsync(
    ).then(
      () => {
        dispatch(loadAssets.success());
      }
    )
    .catch((errors) => {
      dispatch(loadAssets.failure({
        message: 'Failed to load needed assets!',
        errors: errors
      }));
    });
  };
}
