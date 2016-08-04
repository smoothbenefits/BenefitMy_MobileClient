/**
 * @providesModule Router
 */

import {
  createRouter,
} from '@exponent/ex-navigation';

import ConfigScreen from 'ConfigScreen';
import LinksScreen from 'LinksScreen';
import TimePunchCardScreen from 'TimePunchCardScreen';
import TabNavigationLayout from 'TabNavigationLayout';

export default createRouter(() => ({
  home: () => ConfigScreen,
  links: () => LinksScreen,
  timePunchCard: () => TimePunchCardScreen,
  tabNavigationLayout: () => TabNavigationLayout
}));
