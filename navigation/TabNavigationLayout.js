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

  render() {
    let { manifest } = this.props;

    return (
      <TabNavigation
        tabBarColor={Colors.tabBar}
        tabBarHeight={56}
        initialTab="timePunchCard">
        <TabNavigationItem
          id="timePunchCard"
          renderIcon={isSelected => this._renderIcon('clock-o', isSelected)}>
          <StackNavigation initialRoute={Router.getRoute('timePunchCard')} />
        </TabNavigationItem>

        <TabNavigationItem
          id="home"
          renderIcon={isSelected => this._renderIcon('cog', isSelected)}>
          <StackNavigation initialRoute={Router.getRoute('home', {manifest})} />
        </TabNavigationItem>

        <TabNavigationItem
          id="links"
          renderIcon={isSelected => this._renderIcon('book', isSelected)}>
          <StackNavigation initialRoute={Router.getRoute('links')} />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _renderIcon(name, isSelected) {
    return (
      <FontAwesome
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}
