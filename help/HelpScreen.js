/**
 * @providesModule HelpScreen
 */
import React from 'react';

import BrandedNavigationTitle from 'BrandedNavigationTitle';

import {getStore} from '../app/rootStore';
import {locationServiceInstruction} from './helpActions';
import HelpScreenComponent from './HelpScreenComponent';

const store = getStore();

class HelpScreen extends React.Component {
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
      renderRight: () => null,
      renderLeft: () => null
    },
  };

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

  _setLocationServiceInstructionModalVisible(visible) {
    visible
      ? store.dispatch(locationServiceInstruction.show())
      : store.dispatch(locationServiceInstruction.hide());
  }

  render() {
    return (
      <HelpScreenComponent
        locationServiceInstructionModalVisible={this.state.help.locationServiceInstructionVisible}
        setLocationServiceInstructionModalVisible={this._setLocationServiceInstructionModalVisible}
      />
    );
  }
}

export default HelpScreen;
