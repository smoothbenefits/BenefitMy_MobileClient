/**
 * @providesModule TabNavigationLayout
 */

import React, { PropTypes } from 'react';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@exponent/ex-navigation';
import {
  FontAwesome,
} from '@exponent/vector-icons';

import Colors from 'Colors';
import Router from 'Router';

export default class TabNavigationLayout extends React.Component {
  static propTypes = {
    manifest: PropTypes.object.isRequired,
  };

  _renderIcon(name, isSelected) {
    return (
      <FontAwesome
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
        name={name}
        size={32}
      />
    );
  }

  render() {
    let { manifest } = this.props;

    return (
      <TabNavigation
        initialTab="timePunchCard"
        tabBarColor={Colors.tabBar}
        tabBarHeight={56}
      >
        <TabNavigationItem
          id="timePunchCard"
          renderIcon={isSelected => this._renderIcon('clock-o', isSelected)}
        >
          <StackNavigation initialRoute={Router.getRoute('timePunchCard')} />
        </TabNavigationItem>

        <TabNavigationItem
          id="config"
          renderIcon={isSelected => this._renderIcon('cog', isSelected)}
        >
          <StackNavigation initialRoute={Router.getRoute('config', {manifest})} />
        </TabNavigationItem>
      </TabNavigation>
    );
  }
}
