/**
 * @providesModule TimePunchCardScreen
 */

import React from 'react';

import moment from 'moment';

import BrandedNavigationTitle from 'BrandedNavigationTitle';

import {getStore} from '../app/rootStore';
import {loadCard, cardPunchIn, cardPunchOut} from './timePunchCardActions';
import TimePunchCardScreenComponent from './TimePunchCardScreenComponent';
import {DateFormatConstants} from '../common/constants';

const store = getStore();

class TimePunchCardScreen extends React.Component {
  static route = {
    navigationBar: {
      renderTitle: () => <BrandedNavigationTitle />,

      // Remark:
      // OMG these are really gems to find...
      // It seems that for whatever reason, the renderRight was
      // set to something to rendering a blank area, and hence
      // masking the right portion of the title bar...
      // It took a couple hours of digging around the web and
      // the ex-navigation code base to find these, and luckily
      // set them to null seems to do the trick of removing the
      // masking.
      renderRight: null,
      renderLeft: null
    },
  };

  constructor(props, context) {
    super(props, context);
    this.state = store.getState();

    this.unsubscribe = null;
  }

  componentDidMount() {
    if (!this.unsubscribe) {
      this.unsubscribe = store.subscribe(() => {
        this.setState(store.getState()); // eslint-disable-line react/no-set-state
      });
    }

    // Dispatch action to load card for user
    store.dispatch(loadCard(
      this.state.user.userData
    ));
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  _handleReload = () => {
    store.dispatch(loadCard(
      this.state.user.userData
    ));
  }

  _handlePunch = () => {
    this._isCurrentlyPunchedIn() ? this._punchOut() : this._punchIn();
  }

  _punchIn = () => {
    store.dispatch(cardPunchIn(
      this.state.user.userData
    ));
  }

  _punchOut = () => {
    store.dispatch(cardPunchOut(
      this.state.user.userData
    ));
  }

  _isCurrentlyPunchedIn = () => {
    return this.state.timePunchCard.currentCard
      && this.state.timePunchCard.currentCard.inProgress;
  }

  _lastPunchTime = () => {
    if (this.state.timePunchCard.currentCard) {
      return moment(this.state.timePunchCard.currentCard.updatedTimestamp).format(DateFormatConstants.FullDateFormat);
    }

    return null;
  }

  render() {
    return (
      <TimePunchCardScreenComponent
        handlePunch={this._handlePunch}
        handleReload={this._handleReload}
        lastPunchTime={this._lastPunchTime()}
        punchedIn={this._isCurrentlyPunchedIn()}
        requiresReload={this.state.timePunchCard.errors != null}
        showSpinner={this.state.timePunchCard.isFetching}
      />
    );
  }
}

export default TimePunchCardScreen;
