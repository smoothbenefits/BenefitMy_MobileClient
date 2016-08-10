/**
 * @providesModule TimePunchCardScreen
 */

import React from 'react';

import BrandedNavigationTitle from 'BrandedNavigationTitle';

import {getStore} from '../app/rootStore';
import {cardPunchIn, cardPunchOut} from './timePunchCardActions';
import TimePunchCardScreenComponent from './TimePunchCardScreenComponent';

const store = getStore();

class TimePunchCardScreen extends React.Component {
  static route = {
    navigationBar: {
      renderTitle: () => <BrandedNavigationTitle />,
    },
  };

  constructor(props, context) {
    super(props, context);
    this.state = store.getState();

    store.subscribe(() => {
      this.setState(store.getState()); // eslint-disable-line react/no-set-state
    });
  }

  _handlePunch = () => {
    this.state.timePunchCard.punchedIn ? this._punchOut() : this._punchIn();
  }

  _punchIn = () => {
    store.dispatch(cardPunchIn());
  }

  _punchOut = () => {
    store.dispatch(cardPunchOut());
    alert('Punched Out!');
  }

  render() {
    return (
      <TimePunchCardScreenComponent
        handlePunch={this._handlePunch}
        lastPunchTime={this.state.timePunchCard.lastPunchTime}
        punchedIn={this.state.timePunchCard.punchedIn}
      />
    );
  }
}

export default TimePunchCardScreen;
