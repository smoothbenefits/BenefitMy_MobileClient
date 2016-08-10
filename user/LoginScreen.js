/**
 * @providesModule LoginScreen
 */

import React from 'react';

import BrandedNavigationTitle from 'BrandedNavigationTitle';
import LoginScreenComponent from './LoginScreenComponent';

import {getStore} from '../app/rootStore';
import {userLogIn, userLogOut} from './userActions';

const store = getStore();

class LoginScreen extends React.Component {
  static route = {
    navigationBar: {
      renderTitle: () => <BrandedNavigationTitle />,
    },
  }

  constructor(props, context) {
    super(props, context);
    this.state = store.getState();

    store.subscribe(() => {
      this.setState(store.getState()); // eslint-disable-line react/no-set-state
    });
  }

  _handleLogin = () => {
    store.dispatch(userLogIn());
  }

  _handleLogout = () => {
     store.dispatch(userLogOut());
  }

  render() {
    return (
      <LoginScreenComponent
        handleLogIn={this._handleLogin}
        handleLogOut={this._handleLogout}
        isLoggedIn={this.state.user.isLoggedIn}
      />
    );
  }
}

export default LoginScreen;
