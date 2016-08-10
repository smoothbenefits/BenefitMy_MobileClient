/**
 * @providesModule RootContainer
 */

import React from 'react';

import {Provider} from 'react-redux';
import configureStore from './rootStore';
import MainContainer from './MainContainer';

const store = configureStore();

class AppComponent extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainContainer />
      </Provider>
    );
  }
}

export default AppComponent;
