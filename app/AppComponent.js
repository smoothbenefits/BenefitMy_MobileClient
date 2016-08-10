/**
 * @providesModule AppComponent
 */

import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';
import {Provider} from 'react-redux';
import configureStore from './rootStore';
import Router from 'Router';

const store = configureStore();

class AppComponent extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <NavigationProvider router={Router}>
            <StackNavigation
              id="root"
              initialRoute={Router.getRoute('tabNavigationLayout')}
            />
          </NavigationProvider>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'ios' ? 0 : 24,
  },
});

export default AppComponent;
