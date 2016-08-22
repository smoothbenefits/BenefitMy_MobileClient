import React from 'react';
import {getStore} from '../app/rootStore';
import MainComponent from './MainComponent';
import {loadAndCacheAssets} from './mainActions';

const store = getStore();

class MainContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = store.getState();

    this.unsubscribe = null;
  }

  componentWillMount() {
    // Cache important assets like fonts and logo images
    store.dispatch(loadAndCacheAssets());
  }

  componentDidMount() {
    if (!this.unsubscribe) {
      this.unsubscribe = store.subscribe(() => {
        this.setState(store.getState()); // eslint-disable-line react/no-set-state
      });
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  _appIsLoaded() {
    return this.state.main.assetsLoaded;
  }

  render() {
    return (
      <MainComponent
        appIsLoaded={this._appIsLoaded()}
        userLoggedIn={this.state.user.userData != null}
      />
    );
  }
}

export default MainContainer;
