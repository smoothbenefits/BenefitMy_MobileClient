/**
 * @providesModule Router
 */

import {
  createRouter,
} from '@exponent/ex-navigation';

import ConfigScreen from 'ConfigScreen';
import TimePunchCardScreen from 'TimePunchCardScreen';
import TabNavigationLayout from 'TabNavigationLayout';

export default createRouter(() => ({
  config: () => ConfigScreen,
  timePunchCard: () => TimePunchCardScreen,
  tabNavigationLayout: () => TabNavigationLayout
}));
