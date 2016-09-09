import {mainActionTypes} from './mainActionTypes';
import MainService from './MainService';

export const loadAssets = {
    request: () => { return { type: mainActionTypes.loadAssets.REQUEST }; },
    success: () => { return { type: mainActionTypes.loadAssets.SUCCESS }; },
    failure: (errors) => { return { type: mainActionTypes.loadAssets.FAILURE, payload: errors }; }
};

export function loadAndCacheAssets() {
  return async dispatch => {
    dispatch(loadAssets.request());
    try {
      let service = new MainService();
      await service.loadAndCacheAssetsAsync();
      dispatch(loadAssets.success());
    } catch(errors) {
      dispatch(loadAssets.failure({
        message: 'Failed to load needed assets!',
        errors: errors
      }));
    }
  };
}
