/**
 * @providesModule Router
 */

import {
  createRouter,
} from '@exponent/ex-navigation';

import LoginScreen from 'LoginScreen';
import TimePunchCardScreen from 'TimePunchCardScreen';
import HelpScreen from 'HelpScreen';
import TabNavigationLayout from 'TabNavigationLayout';

const routers = createRouter(() => ({
  login: () => LoginScreen,
  timePunchCard: () => TimePunchCardScreen,
  help: () => HelpScreen,
  tabNavigationLayout: () => TabNavigationLayout
}));

export default routers;
