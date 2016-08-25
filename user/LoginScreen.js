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
      renderRight: null,
      renderLeft: null
    },
  }

  constructor(props, context) {
    super(props, context);
    this.state = store.getState();

    this.unsubscribe = null;

    // TODO: This is a cumbersome solution to workaround a race
    //       condition issue with unsubscribing to the store.
    //       It seems that after calling the unsubscriber, there
    //       still could be execution land in the listener function
    //       and causing the warning about setState on a component
    //       not mounted.
    //       The real solution seems to be using react-redux to do
    //       the wiring instead of manually controlling the subscription
    //       But as documented in the wiki, there is a problem with
    //       Exponent's construct, and makes react-redux unusable.
    //       We should revisit react-redux later on, now that Exponent
    //       has newer releases, and we should see if the problem has
    //       been fixed now.
    this.unsubscribing = false;
  }

  componentDidMount() {
    if (!this.unsubscribe) {
      this.unsubscribing = false;
      this.unsubscribe = store.subscribe(() => {
        if (!this.unsubscribing) {
          this.setState(store.getState()); // eslint-disable-line react/no-set-state
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribing = true;
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  _handleUserEmailUpdate = (userEmail) => {
    store.dispatch(userCredentialsUpdate(userEmail.trim(), this.state.user.password));
  }

  _handlePasswordUpdate = (password) => {
    store.dispatch(userCredentialsUpdate(this.state.user.userEmail, password.trim()));
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
        currentUserEmail={this.state.user.userEmail}
        handleLogIn={this._handleLogin}
        handleLogOut={this._handleLogout}
        handlePasswordUpdate={this._handlePasswordUpdate}
        handleUserEmailUpdate={this._handleUserEmailUpdate}
        lastLoginFailed={this.state.user.lastLoginErrors != null}
        showSpinner={this.state.user.isFetching}
        userData={this.state.user.userData}
      />
    );
  }
}

export default LoginScreen;
