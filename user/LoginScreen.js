/**
 * @providesModule LoginScreen
 */

import React from 'react';

import BrandedNavigationTitle from 'BrandedNavigationTitle';
import LoginScreenComponent from './LoginScreenComponent';

import {getStore} from '../app/rootStore';
import {userLogIn, userLogOut, userCredentialsUpdate} from './userActions';

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

    this.unsubscribe = null;
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState()); // eslint-disable-line react/no-set-state
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  _handleUserEmailUpdate = (userEmail) => {
    store.dispatch(userCredentialsUpdate(userEmail, this.state.user.password));
  }

  _handlePasswordUpdate = (password) => {
    store.dispatch(userCredentialsUpdate(this.state.user.userEmail, password));
  }

  _handleLogin = () => {
    store.dispatch(userLogIn(this.state.user.userEmail, this.state.user.password));
  }

  _handleLogout = () => {
     store.dispatch(userLogOut());
  }

  render() {
    return (
      <LoginScreenComponent
        handleLogIn={this._handleLogin}
        handleLogOut={this._handleLogout}
        handlePasswordUpdate={this._handlePasswordUpdate}
        handleUserEmailUpdate={this._handleUserEmailUpdate}
        lastLoginFailed={this.state.user.lastLoginErrors != null}
        userData={this.state.user.userData}
      />
    );
  }
}

export default LoginScreen;
