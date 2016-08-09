import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './rootReducer';

let rootStore = null;

export default function configureStore() {
  rootStore = createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware // lets us dispatch() functions
    )
  );
  return rootStore;
}

/**
  It's really bothersome that we can't use the react-redux standard
  way to inject dispatcher and action binding via "connect", due to
  that the Exponent Navigator overrides the injected "props.dispatch"
  somewhere on the way. So unless we give up on using exponent navigation
  we have to tolorate this by going back to the traditional, more manual
  use of redux, and can't use react-redux...
*/
export function getStore() {
  if (!rootStore) {
    configureStore();
  }
  return rootStore;
}
