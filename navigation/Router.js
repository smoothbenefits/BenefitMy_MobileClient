/**
 * @providesModule Router
 */

import {
  createRouter,
} from '@exponent/ex-navigation';

import LoginScreen from 'LoginScreen';
import TimePunchCardScreen from 'TimePunchCardScreen';
import TabNavigationLayout from 'TabNavigationLayout';

const routers = createRouter(() => ({
  login: () => LoginScreen,
  timePunchCard: () => TimePunchCardScreen,
  tabNavigationLayout: () => TabNavigationLayout
}));

export default routers;
