import { mainActionTypes } from './mainActionTypes';

export default function () {

    const initialState = {
      assetsLoaded: false,
      isFetching: false,
      errors: null
    };

    return (state = initialState, { type, payload }) => {
        switch (type) {
          // Load Assets
          case mainActionTypes.loadAssets.REQUEST:
            return {
                ...state,
                isFetching: true,
                errors: null,
                assetsLoaded: false
            };
          case mainActionTypes.loadAssets.SUCCESS:
            return {
              ...state,
              isFetching: false,
              errors: null,
              assetsLoaded: true
            };
          case mainActionTypes.loadAssets.FAILURE:
            return {
              ...state,
              isFetching: false,
              errors: payload,
              assetsLoaded: false
            };

          default:
            return state;
        }
    };
}
