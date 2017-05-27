/**
 * @providesModule TabNavigationLayout
 */

import React from 'react';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@expo/ex-navigation';
import {
  FontAwesome,
} from '@expo/vector-icons';

import Router from 'Router';

class TabNavigationLayout extends React.Component {
  _renderIcon(name, isSelected) {
    return (
      <FontAwesome
        color={isSelected ? colors.tabIconSelected : colors.tabIconDefault}
        name={name}
        size={32}
      />
    );
  }

  render() {
    return (
      <TabNavigation
        initialTab="timePunchCard"
        tabBarColor={colors.tabBar}
        tabBarHeight={56}
      >
        <TabNavigationItem
          id="timePunchCard"
          renderIcon={isSelected => this._renderIcon('clock-o', isSelected)}
        >
          <StackNavigation initialRoute={Router.getRoute('timePunchCard')} />
        </TabNavigationItem>

        <TabNavigationItem
          id="help"
          renderIcon={isSelected => this._renderIcon('question-circle-o', isSelected)}
        >
          <StackNavigation initialRoute={Router.getRoute('help')} />
        </TabNavigationItem>
      </TabNavigation>
    );
  }
}

const colors = {
  tabIconDefault: '#888',
  tabIconSelected: '#2f95dc',
  tabBar: '#fefefe',
};

export default TabNavigationLayout;
