import React, {PropTypes} from 'react';
import * as Expo from 'expo';
import {
  StyleSheet,
  View,
} from 'react-native';
import Router from 'Router';
import {
  NavigationProvider,
  StackNavigation,
} from '@expo/ex-navigation';
import LoginScreen from 'LoginScreen';

class MainComponent extends React.Component {

  render() {
    if (!this.props.appIsLoaded) {
      return <Expo.AppLoading />;
    }

    let view;
    if (this.props.userLoggedIn) {
      view = (
        <NavigationProvider router={Router}>
          <StackNavigation
            id="root"
            initialRoute={Router.getRoute('tabNavigationLayout')}
          />
        </NavigationProvider>
      );
    } else {
      view = (
        <LoginScreen />
      );
    }

    return (
      <View style={styles.container}>
        {view}
      </View>
    );
  }
}

MainComponent.propTypes = {
  userLoggedIn: PropTypes.bool,
  appIsLoaded: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

export default MainComponent;
